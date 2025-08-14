// Input validation and sanitization utilities

import { ValidationRule, ValidationResult, ValidationError } from '../../types';

export class ValidationEngine {
  /**
   * Validate object against rules
   */
  validate(data: any, rules: ValidationRule[]): ValidationResult {
    const errors: ValidationError[] = [];
    
    for (const rule of rules) {
      const value = this.getNestedValue(data, rule.field);
      const error = this.validateField(rule.field, value, rule);
      
      if (error) {
        errors.push(error);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate single field against rule
   */
  private validateField(field: string, value: any, rule: ValidationRule): ValidationError | null {
    // Check required
    if (rule.required && (value === undefined || value === null || value === '')) {
      return {
        field,
        message: `${field} is required`,
        code: 'REQUIRED',
        value
      };
    }
    
    // Skip validation for optional empty values
    if (!rule.required && (value === undefined || value === null || value === '')) {
      return null;
    }
    
    // Type validation
    const typeError = this.validateType(field, value, rule.type);
    if (typeError) return typeError;
    
    // Length validation for strings
    if (rule.type === 'string' && typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        return {
          field,
          message: `${field} must be at least ${rule.minLength} characters`,
          code: 'MIN_LENGTH',
          value
        };
      }
      
      if (rule.maxLength && value.length > rule.maxLength) {
        return {
          field,
          message: `${field} must be no more than ${rule.maxLength} characters`,
          code: 'MAX_LENGTH',
          value
        };
      }
    }
    
    // Pattern validation
    if (rule.pattern && typeof value === 'string') {
      if (!rule.pattern.test(value)) {
        return {
          field,
          message: `${field} format is invalid`,
          code: 'PATTERN',
          value
        };
      }
    }
    
    // Custom validation
    if (rule.custom) {
      const customResult = rule.custom(value);
      if (customResult !== true) {
        return {
          field,
          message: typeof customResult === 'string' ? customResult : `${field} is invalid`,
          code: 'CUSTOM',
          value
        };
      }
    }
    
    return null;
  }

  /**
   * Validate type
   */
  private validateType(field: string, value: any, expectedType: string): ValidationError | null {
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    
    if (expectedType === 'array' && !Array.isArray(value)) {
      return {
        field,
        message: `${field} must be an array`,
        code: 'TYPE_ARRAY',
        value
      };
    }
    
    if (expectedType !== 'array' && actualType !== expectedType) {
      return {
        field,
        message: `${field} must be of type ${expectedType}`,
        code: 'TYPE_MISMATCH',
        value
      };
    }
    
    return null;
  }

  /**
   * Get nested value from object using dot notation
   */
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Sanitize input string
   */
  sanitizeString(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potentially dangerous characters
      .replace(/\s+/g, ' ') // Normalize whitespace
      .substring(0, 10000); // Limit length
  }

  /**
   * Validate and sanitize chat message
   */
  validateChatMessage(message: string): { isValid: boolean; sanitized: string; errors: string[] } {
    const errors: string[] = [];
    
    if (!message || typeof message !== 'string') {
      errors.push('Message must be a non-empty string');
      return { isValid: false, sanitized: '', errors };
    }
    
    const sanitized = this.sanitizeString(message);
    
    if (sanitized.length === 0) {
      errors.push('Message cannot be empty after sanitization');
    }
    
    if (sanitized.length < 1) {
      errors.push('Message too short');
    }
    
    if (sanitized.length > 5000) {
      errors.push('Message too long (max 5000 characters)');
    }
    
    // Check for spam patterns
    if (this.isSpam(sanitized)) {
      errors.push('Message appears to be spam');
    }
    
    return {
      isValid: errors.length === 0,
      sanitized,
      errors
    };
  }

  /**
   * Basic spam detection
   */
  private isSpam(message: string): boolean {
    const spamPatterns = [
      /(.)\1{10,}/, // Repeated characters
      /https?:\/\/[^\s]+/gi, // URLs (might want to allow these)
      /\b(buy now|click here|free money|urgent|limited time)\b/gi, // Common spam phrases
    ];
    
    return spamPatterns.some(pattern => pattern.test(message));
  }
}

// Common validation rules
export const commonRules = {
  chatMessage: [
    {
      field: 'message',
      type: 'string' as const,
      required: true,
      minLength: 1,
      maxLength: 5000
    }
  ],
  
  enhancedChatRequest: [
    {
      field: 'message',
      type: 'string' as const,
      required: true,
      minLength: 1,
      maxLength: 5000
    },
    {
      field: 'conversationId',
      type: 'string' as const,
      required: false,
      pattern: /^[a-zA-Z0-9_-]+$/
    },
    {
      field: 'context',
      type: 'array' as const,
      required: false
    }
  ]
};

// Singleton instance
export const validator = new ValidationEngine();
