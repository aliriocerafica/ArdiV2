"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">
  

        {/* Success State */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-3">
            <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ backgroundColor: 'rgba(34, 197, 94, 0.8)' }}></div>
            <div className="absolute top-3/4 right-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" style={{ backgroundColor: 'rgba(193, 28, 33, 0.8)' }}></div>
          </div>
          
          <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 relative z-10 text-center">
            {/* Success Icon */}
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-6 mx-auto" style={{ backgroundColor: '#22C55E' }}>
              <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-3" style={{ color: '#2D2D2D' }}>
                Check your email
              </h1>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-normal leading-relaxed">
                We&apos;ve sent a password reset link to <br />
                <span className="font-medium" style={{ color: '#2D2D2D' }}>{email}</span>
              </p>
              <p className="text-gray-500 text-sm font-normal">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="w-full text-white py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-normal transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:ring-4 focus:outline-none text-sm sm:text-base"
                style={{ 
                  backgroundColor: '#C11C21',
                  boxShadow: '0 4px 15px 0 rgba(193, 28, 33, 0.3)'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#A8171C';
                  target.style.boxShadow = '0 8px 25px 0 rgba(193, 28, 33, 0.4)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#C11C21';
                  target.style.boxShadow = '0 4px 15px 0 rgba(193, 28, 33, 0.3)';
                }}
              >
                Try Again
              </button>

              <Link 
                href="/"
                className="block w-full text-center py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-normal transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base border-2"
                style={{ 
                  borderColor: '#E5E7EB',
                  color: '#6B7280'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.borderColor = '#C11C21';
                  target.style.color = '#C11C21';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.borderColor = '#E5E7EB';
                  target.style.color = '#6B7280';
                }}
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - AI Branding (same as login) */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: '#C11C21' }}>
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
            <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-white/10 rounded-full animate-pulse animation-delay-1000"></div>
            <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/8 rounded-full animate-pulse animation-delay-3000"></div>
          </div>
          
          <div className="text-center relative z-10">
            {/* Logo Container */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="animate-pulse">
                  <Image
                    src="/img/logoArdiWhite.svg"
                    alt="Ardi Logo"
                    width={180}
                    height={180}
                    className="opacity-90 hover:opacity-100 transition-opacity duration-1000"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="text-white space-y-4">
              <h2 className="text-3xl font-normal">Secure Recovery</h2>
              <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed font-normal">
                Your account security is our priority. Check your email for reset instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">

      
      {/* Left side - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ backgroundColor: 'rgba(212, 185, 99, 0.8)' }}></div>
          <div className="absolute top-3/4 right-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" style={{ backgroundColor: 'rgba(193, 28, 33, 0.8)' }}></div>
        </div>
        
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 relative z-10">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-4 sm:mb-6" style={{ backgroundColor: '#C11C21' }}>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-2 sm:mb-3" style={{ color: '#2D2D2D' }}>
              Forgot password?
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-normal">
              No worries, we&apos;ll send you reset instructions
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-lg border border-red-200 bg-red-50">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            </div>
          )}

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-normal" style={{ color: '#2D2D2D' }}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border-2 rounded-xl sm:rounded-2xl outline-none transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
                  style={{ 
                    borderColor: focusedField === 'email' ? '#C11C21' : '#E5E7EB',
                    color: '#2D2D2D',
                    ...(focusedField === 'email' && {
                      boxShadow: '0 10px 25px -5px rgba(193, 28, 33, 0.2)',
                      backgroundColor: '#FEF9F9'
                    })
                  }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-normal transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:ring-4 focus:outline-none text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ 
                backgroundColor: '#C11C21',
                boxShadow: '0 4px 15px 0 rgba(193, 28, 33, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#A8171C';
                  target.style.boxShadow = '0 8px 25px 0 rgba(193, 28, 33, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#C11C21';
                  target.style.boxShadow = '0 4px 15px 0 rgba(193, 28, 33, 0.3)';
                }
              }}
            >
              <span className="flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center">
            <Link 
              href="/"
              className="inline-flex items-center text-sm font-normal transition-colors hover:underline space-x-2" 
              style={{ color: '#C11C21' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Sign In</span>
            </Link>
          </div>

          {/* Support Links */}
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm pt-4">
            <a 
              href="#" 
              className="text-center text-gray-600 font-normal hover:underline transition-colors hover:text-red-600"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#C11C21';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#6B7280';
              }}
            >
              IT Support
            </a>
            <a 
              href="#" 
              className="text-center text-gray-600 font-normal hover:underline transition-colors hover:text-red-600"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#C11C21';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#6B7280';
              }}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Right side - AI Branding (same as login) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: '#C11C21' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-white/10 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/8 rounded-full animate-pulse animation-delay-3000"></div>
        </div>
        
        <div className="text-center relative z-10">
          {/* Logo Container */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="animate-pulse">
                <Image
                  src="/img/logoArdiWhite.svg"
                  alt="Ardi Logo"
                  width={180}
                  height={180}
                  className="opacity-90 hover:opacity-100 transition-opacity duration-1000"
                  style={{
                    animation: 'fadeGlow 3s ease-in-out infinite alternate'
                  }}
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="text-white space-y-4">
            <h2 className="text-3xl font-normal">Account Recovery</h2>
            <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed font-normal">
              Secure and simple password recovery to get you back to your AI assistant quickly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}