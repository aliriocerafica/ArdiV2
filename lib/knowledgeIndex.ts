// Main Knowledge Index - Combines all knowledge sources
import { findGranularKnowledge } from './granularKnowledge';
import { findIdentityKnowledge, ardiIdentityKnowledge } from './ardiIdentity';
import { findPersonalInjuryKnowledge, personalInjuryKnowledge } from './personalInjuryKnowledge';
import { findCaseManagementKnowledge, caseManagementKnowledge } from './caseManagementKnowledge';
import { findInsuranceKnowledge, insuranceKnowledge } from './insuranceKnowledge';
import { findIntakeProcessKnowledge, intakeProcessKnowledge } from './intakeProcessKnowledge';
import { findHRKnowledge, hrKnowledge } from './hrKnowledge';
import { findComprehensiveCaseManagementKnowledge, comprehensiveCaseManagementKnowledge } from './comprehensiveCaseManagementKnowledge';
import { findIntakeAndInitialActionItemsKnowledge, intakeAndInitialActionItemsKnowledge } from './intakeAndInitialActionItemsKnowledge';
import { findLegalTreatmentKnowledge, legalTreatmentKnowledge } from './legalTreatmentKnowledge';
import { findITTroubleshootingKnowledge, itTroubleshootingKnowledge } from './itTroubleshootingKnowledge';
import { findArdentCompanyKnowledge, ardentCompanyKnowledge } from './ardentCompanyKnowledge';
import { findMedicalRecordsKnowledge, medicalRecordsKnowledge } from './medicalRecordsKnowledge';

export interface KnowledgeResult {
  content: string;
  tableContent?: string;
  source: string;
  category: string;
}

export function findKnowledge(userMessage: string): KnowledgeResult | null {
  // PRIORITY 1: Check granular knowledge first for specific, targeted answers
  const granularResult = findGranularKnowledge(userMessage);
  if (granularResult) {
    return {
      content: granularResult.shortAnswer,
      tableContent: undefined, // Granular responses are already formatted
      source: 'Granular Knowledge',
      category: granularResult.category
    };
  }

  // PRIORITY 2: Check each knowledge domain in order of priority
  const identityResult = findIdentityKnowledge(userMessage);
  if (identityResult) {
    return {
      content: identityResult.content,
      tableContent: (identityResult as any).tableContent,
      source: 'Ardi Identity',
      category: 'Core Knowledge'
    };
  }

  const comprehensiveResult = findComprehensiveCaseManagementKnowledge(userMessage);
  if (comprehensiveResult) {
    return {
      content: comprehensiveResult.content,
      tableContent: comprehensiveResult.tableContent,
      source: 'Comprehensive Case Management',
      category: comprehensiveResult.category
    };
  }

  const intakeAndInitialActionItemsResult = findIntakeAndInitialActionItemsKnowledge(userMessage);
  if (intakeAndInitialActionItemsResult) {
    return {
      content: intakeAndInitialActionItemsResult.content,
      tableContent: intakeAndInitialActionItemsResult.tableContent,
      source: 'Intake & Initial Action Items',
      category: intakeAndInitialActionItemsResult.category
    };
  }

  const legalTreatmentResult = findLegalTreatmentKnowledge(userMessage);
  if (legalTreatmentResult) {
    return {
      content: legalTreatmentResult.content,
      tableContent: legalTreatmentResult.tableContent,
      source: 'Legal Treatment',
      category: legalTreatmentResult.category
    };
  }

  const itTroubleshootingResult = findITTroubleshootingKnowledge(userMessage);
  if (itTroubleshootingResult) {
    return {
      content: itTroubleshootingResult.content,
      tableContent: itTroubleshootingResult.tableContent,
      source: 'IT Troubleshooting',
      category: itTroubleshootingResult.category
    };
  }

  const ardentCompanyResult = findArdentCompanyKnowledge(userMessage);
  if (ardentCompanyResult) {
    return {
      content: ardentCompanyResult.content,
      tableContent: ardentCompanyResult.tableContent,
      source: 'Ardent Company',
      category: ardentCompanyResult.category
    };
  }

  const personalInjuryResult = findPersonalInjuryKnowledge(userMessage);
  if (personalInjuryResult) {
    return {
      content: personalInjuryResult.content,
      tableContent: personalInjuryResult.tableContent,
      source: 'Personal Injury',
      category: personalInjuryResult.category
    };
  }

  const caseManagementResult = findCaseManagementKnowledge(userMessage);
  if (caseManagementResult) {
    return {
      content: caseManagementResult.content,
      tableContent: (caseManagementResult as any).tableContent,
      source: 'Case Management',
      category: caseManagementResult.category
    };
  }

  const insuranceResult = findInsuranceKnowledge(userMessage);
  if (insuranceResult) {
    return {
      content: insuranceResult.content,
      tableContent: (insuranceResult as any).tableContent,
      source: 'Insurance',
      category: insuranceResult.category
    };
  }

  const intakeProcessResult = findIntakeProcessKnowledge(userMessage);
  if (intakeProcessResult) {
    return {
      content: intakeProcessResult.content,
      tableContent: (intakeProcessResult as any).tableContent,
      source: 'Intake Process',
      category: intakeProcessResult.category
    };
  }

  const hrResult = findHRKnowledge(userMessage);
  if (hrResult) {
    return {
      content: hrResult.content,
      tableContent: hrResult.tableContent,
      source: 'HR',
      category: hrResult.category
    };
  }

  const medicalRecordsResult = findMedicalRecordsKnowledge(userMessage);
  if (medicalRecordsResult) {
    return {
      content: medicalRecordsResult.content,
      tableContent: medicalRecordsResult.tableContent,
      source: 'Medical Records Management',
      category: medicalRecordsResult.category
    };
  }

  // Fallback: enhanced keyword/synonym-based scoring across all knowledge
  const enhanced = enhancedFallbackKnowledge(userMessage);
  if (enhanced) {
    return enhanced;
  }

  return null;
}

// Get all available knowledge categories
export function getKnowledgeCategories(): string[] {
  return [
    'Ardi Identity',
    'Comprehensive Case Management',
    'Intake & Initial Action Items',
    'Legal Treatment',
    'IT Troubleshooting',
    'Ardent Company',
    'Personal Injury',
    'Case Management', 
    'Insurance',
    'Intake Process',
    'HR',
    'Medical Records Management'
  ];
} 

// --- Enhanced fallback matching (non-breaking) ---

type CombinedEntry = {
  content: string;
  tableContent?: string;
  category: string;
  source: string;
  triggers: string[];
  keywords: string[];
  priority?: 'high' | 'medium' | 'low';
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOP_WORDS = new Set([
  'the','a','an','and','or','of','in','on','to','for','with','about','what','how','why','when','where','is','are','do','does','can','you','i','we','it','me','my','your','our'
]);

function tokenize(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter(t => t && !STOP_WORDS.has(t));
}

function pluralStem(token: string): string {
  // very light stemming to align simple plural/singular
  if (token.endsWith('ies')) return token.slice(0, -3) + 'y';
  if (token.endsWith('s') && token.length > 3) return token.slice(0, -1);
  return token;
}

function expandQuery(userMessage: string): { expandedPhrases: string[]; expandedTokens: string[] } {
  const msg = normalize(userMessage);
  const tokens = tokenize(msg);

  const phrases: string[] = [];
  const addPhrase = (p: string) => { if (!phrases.includes(p)) phrases.push(p); };

  // Domain synonyms and abbreviations
  const includes = (p: string) => msg.includes(p);

  if (includes('sol') || includes('statute of limitations')) {
    addPhrase('statute of limitations');
    addPhrase('time limit');
    addPhrase('filing deadline');
  }
  if (includes('hmo') || includes('health insurance') || includes('medical insurance')) {
    addPhrase('hmo');
    addPhrase('health insurance');
    addPhrase('medical insurance');
  }
  if (includes('um') || includes('uninsured motorist')) {
    addPhrase('uninsured motorist');
    addPhrase('um');
  }
  if (includes('uim') || includes('underinsured motorist')) {
    addPhrase('underinsured motorist');
    addPhrase('uim');
  }
  if (includes('pd') || includes('property damage')) {
    addPhrase('property damage');
    addPhrase('property damage claim');
  }
  if (includes('tcr') || includes('traffic collision report') || includes('police report')) {
    addPhrase('traffic collision report');
    addPhrase('tcr');
    addPhrase('police report');
  }
  if (includes('lor') || includes('letters of representation') || includes('letter of representation')) {
    addPhrase('letters of representation');
    addPhrase('lor');
  }
  if (includes('emc2') || includes('e mc2') || includes('e=mc2') || includes('emc') || includes('emc squared')) {
    addPhrase('e=mc2');
    addPhrase('emc2');
    addPhrase('emc');
    addPhrase('emc squared');
  }
  if (includes('ardi')) {
    addPhrase('ardi');
    addPhrase('who are you');
    addPhrase('what is ardi');
  }

  const expandedTokens = Array.from(new Set([
    ...tokens,
    ...tokens.map(pluralStem)
  ]));

  return { expandedPhrases: phrases, expandedTokens };
}

function collectAllEntries(): CombinedEntry[] {
  const from = (
    entries: any[] | undefined,
    source: string
  ): CombinedEntry[] => {
    if (!entries) return [];
    return entries.map((e: any) => ({
      content: e.content,
      tableContent: e.tableContent,
      category: e.category ?? 'General',
      source,
      triggers: Array.isArray(e.triggers) ? e.triggers.map((t: string) => t.toLowerCase()) : [],
      keywords: Array.isArray(e.keywords) ? e.keywords.map((k: string) => k.toLowerCase()) : [],
      priority: e.priority
    }));
  };

  return [
    ...from(ardiIdentityKnowledge as any, 'Ardi Identity'),
    ...from(comprehensiveCaseManagementKnowledge as any, 'Comprehensive Case Management'),
    ...from(intakeAndInitialActionItemsKnowledge as any, 'Intake & Initial Action Items'),
    ...from(legalTreatmentKnowledge as any, 'Legal Treatment'),
    ...from(itTroubleshootingKnowledge as any, 'IT Troubleshooting'),
    ...from(ardentCompanyKnowledge as any, 'Ardent Company'),
    ...from(personalInjuryKnowledge as any, 'Personal Injury'),
    ...from(caseManagementKnowledge as any, 'Case Management'),
    ...from(insuranceKnowledge as any, 'Insurance'),
    ...from(intakeProcessKnowledge as any, 'Intake Process'),
    ...from(hrKnowledge as any, 'HR'),
    ...from(medicalRecordsKnowledge as any, 'Medical Records Management')
  ];
}

function scoreEntry(
  entry: CombinedEntry,
  userMessage: string,
  expandedPhrases: string[],
  expandedTokens: string[]
): number {
  const msgNorm = normalize(userMessage);
  let score = 0;

  // Exact trigger phrase contained
  for (const trig of entry.triggers) {
    if (trig && msgNorm.includes(trig)) score += 5;
  }

  // Keyword phrase contained
  for (const kw of entry.keywords) {
    if (kw && msgNorm.includes(kw)) score += 2;
  }

  // Synonym/phrase expansions
  for (const p of expandedPhrases) {
    if (p && (entry.triggers.includes(p) || entry.keywords.includes(p))) score += 2;
  }

  // Token overlap with triggers/keywords tokens
  const entryTokens = new Set<string>([
    ...entry.keywords.flatMap(k => tokenize(k).map(pluralStem)),
    ...entry.triggers.flatMap(t => tokenize(t).map(pluralStem))
  ]);
  let overlap = 0;
  for (const t of expandedTokens) {
    if (entryTokens.has(pluralStem(t))) overlap++;
  }
  if (overlap > 0) {
    // Normalize overlap contribution
    score += Math.min(4, overlap * 0.75);
  }

  // Priority bonus
  if (entry.priority === 'high') score += 1.5;
  if (entry.priority === 'low') score -= 0.25;

  return score;
}

function enhancedFallbackKnowledge(userMessage: string): KnowledgeResult | null {
  const entries = collectAllEntries();
  if (entries.length === 0) return null;

  const { expandedPhrases, expandedTokens } = expandQuery(userMessage);

  let best: { entry: CombinedEntry; score: number } | null = null;
  for (const e of entries) {
    const s = scoreEntry(e, userMessage, expandedPhrases, expandedTokens);
    if (!best || s > best.score) {
      best = { entry: e, score: s };
    }
  }

  // Threshold to avoid mismatches; adjust conservatively
  if (best && best.score >= 4) {
    return {
      content: best.entry.content,
      tableContent: best.entry.tableContent,
      source: best.entry.source,
      category: best.entry.category
    };
  }

  return null;
}