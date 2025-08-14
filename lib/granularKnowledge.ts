// Granular Knowledge System - Specific, targeted answers for precise questions
export interface GranularKnowledgeEntry {
  id: string;
  question: string;
  shortAnswer: string; // Brief, specific answer
  category: string;
  triggers: string[];
  exactMatches: string[]; // Exact phrase matches
  relatedTerms: string[];
  priority: 'high' | 'medium' | 'low';
}

export const granularKnowledge: GranularKnowledgeEntry[] = [
  // Legal Terms and Definitions
  {
    id: 'prop-213',
    question: 'What is Prop 213?',
    shortAnswer: '🏛️ **Proposition 213** is a California law that limits compensation for pain and suffering for uninsured drivers in motor vehicle accidents. If you were driving without insurance when injured, you cannot recover non-economic damages like pain and suffering, but you can still recover economic damages like medical bills and lost wages.',
    category: 'Legal Terms',
    triggers: ['prop 213', 'proposition 213', 'prop213', 'what is prop 213', 'what is proposition 213'],
    exactMatches: ['prop 213', 'proposition 213'],
    relatedTerms: ['uninsured driver', 'pain and suffering', 'economic damages', 'california law'],
    priority: 'high'
  },
  {
    id: 'lien-definition',
    question: 'What is a lien?',
    shortAnswer: '💰 **A lien** is a legal claim against your personal injury settlement or judgment. Common types include medical liens (healthcare providers), attorney liens (your lawyer), and insurance liens (your insurance company seeking reimbursement). Liens must be paid from your settlement before you receive your portion.',
    category: 'Legal Terms',
    triggers: ['lien', 'what is a lien', 'what is lien', 'lien definition', 'define lien', 'medical lien'],
    exactMatches: ['lien', 'what is a lien'],
    relatedTerms: ['medical lien', 'attorney lien', 'insurance lien', 'settlement', 'reimbursement'],
    priority: 'high'
  },
  {
    id: 'um-definition',
    question: 'What is UM?',
    shortAnswer: '🚗 **UM (Uninsured Motorist)** coverage protects you when you\'re injured by a driver who has no insurance. This coverage pays for your medical bills, lost wages, and pain and suffering when the at-fault driver cannot pay because they lack insurance.',
    category: 'Insurance Terms',
    triggers: ['um', 'uninsured motorist', 'what is um', 'um coverage', 'uninsured motorist coverage'],
    exactMatches: ['um', 'what is um'],
    relatedTerms: ['uninsured driver', 'motorist coverage', 'insurance coverage', 'medical bills', 'lost wages'],
    priority: 'high'
  },
  {
    id: 'uim-definition',
    question: 'What is UIM?',
    shortAnswer: '🚗 **UIM (Underinsured Motorist)** coverage protects you when you\'re injured by a driver whose insurance limits are too low to cover your damages. This coverage pays the difference between the at-fault driver\'s policy limits and your actual damages.',
    category: 'Insurance Terms',
    triggers: ['uim', 'underinsured motorist', 'what is uim', 'uim coverage', 'underinsured motorist coverage'],
    exactMatches: ['uim', 'what is uim'],
    relatedTerms: ['underinsured driver', 'policy limits', 'insurance coverage', 'damages'],
    priority: 'high'
  },
  {
    id: 'um-vs-uim',
    question: 'What is the difference between UM and UIM?',
    shortAnswer: '🔍 **UM vs UIM Difference:**\n\n• **UM (Uninsured Motorist)** - Covers you when the at-fault driver has NO insurance\n• **UIM (Underinsured Motorist)** - Covers you when the at-fault driver has SOME insurance, but not enough to cover your damages\n\nBoth protect you from drivers who cannot adequately compensate you for your injuries.',
    category: 'Insurance Terms',
    triggers: ['um vs uim', 'uim vs um', 'difference between um and uim', 'um and uim difference', 'uninsured vs underinsured'],
    exactMatches: ['difference between um and uim', 'um vs uim'],
    relatedTerms: ['insurance comparison', 'coverage types', 'motorist insurance'],
    priority: 'high'
  },
  {
    id: 'case-manager-definition',
    question: 'What is a Case Manager?',
    shortAnswer: '👨‍💼 **A Case Manager (CM)** is a professional who coordinates and oversees your personal injury case. They manage deadlines, communicate with parties, organize documents, track medical treatment, and ensure your case progresses smoothly from start to finish.',
    category: 'Case Management',
    triggers: ['what is a case manager', 'cm', 'what is cm', 'case manager definition'],
    exactMatches: ['what is a case manager', 'cm'],
    relatedTerms: ['coordination', 'oversight', 'deadlines', 'medical treatment', 'documentation'],
    priority: 'high'
  },
  {
    id: 'cm-definition',
    question: 'What is a CM?',
    shortAnswer: '👨‍💼 **CM** stands for **Case Manager** - a professional who coordinates and oversees your personal injury case, managing deadlines, communications, documents, and ensuring smooth case progression.',
    category: 'Case Management',
    triggers: ['cm', 'what is cm', 'what does cm stand for', 'cm meaning', 'cm definition'],
    exactMatches: ['cm', 'what is cm'],
    relatedTerms: ['coordination', 'abbreviation'],
    priority: 'high'
  },

  // HR and Company Information
  {
    id: 'how-to-file-leave',
    question: 'How to file a leave?',
    shortAnswer: '📋 **To file a leave request:**\n\n1. **Contact HR Department** - Email or call HR with your request\n2. **Submit Leave Form** - Complete the appropriate leave request form\n3. **Provide Documentation** - Include medical certificates or supporting documents if required\n4. **Get Approval** - Wait for HR approval before taking leave\n5. **Follow Up** - Confirm your leave has been processed\n\nContact HR for specific forms and procedures.',
    category: 'HR Procedures',
    triggers: ['how to file leave', 'file leave', 'leave request', 'how to request leave', 'leave process', 'filing leave'],
    exactMatches: ['how to file leave', 'how to file a leave'],
    relatedTerms: ['hr department', 'leave form', 'medical leave', 'vacation request', 'time off'],
    priority: 'high'
  },
  {
    id: 'hr-info',
    question: 'HR info',
    shortAnswer: '🏢 **HR Department Information:**\n\n• **Purpose:** Human Resources management and employee support\n• **Services:** Leave requests, benefits, payroll, employee relations\n• **Contact:** Through internal HR channels\n• **Hours:** Standard business hours\n• **Support:** Employee handbook, policies, and procedures\n\nFor specific HR needs, contact your HR representative directly.',
    category: 'HR Information',
    triggers: ['hr info', 'hr information', 'hr department', 'human resources', 'hr contact', 'hr services'],
    exactMatches: ['hr info', 'hr information'],
    relatedTerms: ['human resources', 'employee services', 'benefits', 'payroll', 'policies'],
    priority: 'medium'
  },
  {
    id: 'when-ardent-started',
    question: 'When did Ardent start?',
    shortAnswer: '🏢 **Ardent Paralegal Business Solutions Inc** was established to revolutionize legal operations through intelligent case management and comprehensive paralegal support. For specific founding date information, please contact our administrative team.',
    category: 'Company History',
    triggers: ['when ardent started', 'when did ardent start', 'ardent founding', 'ardent established', 'ardent history'],
    exactMatches: ['when ardent started', 'when did ardent start'],
    relatedTerms: ['company history', 'founding date', 'establishment', 'business solutions'],
    priority: 'medium'
  },
  {
    id: 'how-ardent-started',
    question: 'How did Ardent start?',
    shortAnswer: '🚀 **How Ardent Started:**\n\nArdent Paralegal Business Solutions Inc was founded with a mission to transform legal operations through:\n\n• **Intelligent Technology** - AI-powered case management solutions\n• **Expert Paralegal Services** - Certified professional support\n• **Operational Excellence** - Streamlined legal workflows\n• **Client Focus** - Enhanced service delivery and efficiency\n\nThe company emerged from recognizing the need for smarter, more efficient legal operations.',
    category: 'Company History',
    triggers: ['how ardent started', 'how did ardent start', 'ardent origin', 'ardent founding story', 'ardent beginning'],
    exactMatches: ['how ardent started', 'how did ardent start'],
    relatedTerms: ['company origin', 'founding story', 'mission', 'legal technology', 'paralegal services'],
    priority: 'medium'
  },
  {
    id: 'when-ardent-started',
    question: 'When did Ardent start?',
    shortAnswer: '🏢 **When Ardent Started:**\n\nArdent Paralegal Business Solutions began as a **small team of 5-10 close friends** who decided to start their own company. The founders **Iran Salvado and Dominic Narag** started with:\n\n• **One Client** - Humble beginning with a single client\n• **Small Office** - Minimal resources and simple setup\n• **Big Vision** - Commitment to excellence and employee well-being\n• **Family Culture** - Personal relationships and mutual support\n\nFrom these modest beginnings, Ardent has grown to over 100 employees today.',
    category: 'Company History',
    triggers: ['when did ardent start', 'when ardent started', 'ardent founding date', 'when was ardent founded', 'ardent start date'],
    exactMatches: ['when did ardent start', 'when ardent started'],
    relatedTerms: ['founding date', 'company start', 'beginning', 'early days', 'origin'],
    priority: 'high'
  },
  {
    id: 'ardent-founders',
    question: 'Who are the founders of Ardent?',
    shortAnswer: '👥 **Ardent Founders:**\n\nArdent Paralegal Business Solutions was founded by **Iran Salvado and Dominic Narag**, two visionary leaders who shared a common vision of creating a workplace that valued both excellent service and employee well-being.\n\n• **Iran Salvado** - Co-founder and leader\n• **Dominic Narag** - Co-founder and leader\n\n**Their Vision:**\n• Quality-focused legal support services\n• Family-like company culture\n• Employee satisfaction and growth\n• Personal relationships and collaboration\n\nThey continue to guide Ardent today with the same vision and values.',
    category: 'Company History',
    triggers: ['who are the founders', 'ardent founders', 'who founded ardent', 'iran salvado', 'dominic narag', 'who started ardent'],
    exactMatches: ['who are the founders', 'ardent founders'],
    relatedTerms: ['founders', 'iran salvado', 'dominic narag', 'leadership', 'company owners'],
    priority: 'high'
  },

  // Additional Legal Terms
  {
    id: 'statute-limitations',
    question: 'What is statute of limitations?',
    shortAnswer: '⏰ **Statute of Limitations** is the legal time limit to file a lawsuit. In California personal injury cases, you generally have 2 years from the injury date to file. Missing this deadline typically means you lose your right to sue, so it\'s crucial to act promptly.',
    category: 'Legal Terms',
    triggers: ['statute of limitations', 'sol', 'time limit', 'deadline to sue', 'filing deadline'],
    exactMatches: ['statute of limitations', 'sol'],
    relatedTerms: ['filing deadline', 'time limit', 'lawsuit deadline', '2 years', 'legal deadline'],
    priority: 'high'
  },
  {
    id: 'settlement-definition',
    question: 'What is a settlement?',
    shortAnswer: '🤝 **A settlement** is an agreement between you and the at-fault party (usually their insurance company) to resolve your case without going to trial. You agree to accept a specific amount of money in exchange for dropping your legal claim.',
    category: 'Legal Terms',
    triggers: ['settlement', 'what is settlement', 'settlement definition', 'case settlement'],
    exactMatches: ['settlement', 'what is settlement'],
    relatedTerms: ['agreement', 'compensation', 'insurance company', 'trial', 'legal claim'],
    priority: 'high'
  },
  {
    id: 'deposition-definition',
    question: 'What is a deposition?',
    shortAnswer: '📝 **A deposition** is sworn testimony taken outside of court where you answer questions under oath from the opposing attorney. It\'s recorded and can be used as evidence in your case. Your attorney will be present to protect your interests.',
    category: 'Legal Process',
    triggers: ['deposition', 'what is deposition', 'deposition definition', 'sworn testimony'],
    exactMatches: ['deposition', 'what is deposition'],
    relatedTerms: ['testimony', 'under oath', 'opposing attorney', 'evidence', 'court'],
    priority: 'high'
  },
  {
    id: 'demand-letter',
    question: 'What is a demand letter?',
    shortAnswer: '📄 **A demand letter** is a formal document sent to the at-fault party\'s insurance company outlining your case, injuries, damages, and requesting a specific settlement amount. It\'s often the first step in settlement negotiations.',
    category: 'Legal Process',
    triggers: ['demand letter', 'what is demand letter', 'demand letter definition', 'settlement demand'],
    exactMatches: ['demand letter', 'what is demand letter'],
    relatedTerms: ['settlement negotiation', 'insurance company', 'damages', 'formal document'],
    priority: 'high'
  },

  // Additional Legal Terms
  {
    id: 'tcr-definition',
    question: 'What is TCR?',
    shortAnswer: '🚔 **TCR (Traffic Collision Report)** is the official police report documenting a car accident. It contains details about the incident, parties involved, witness statements, and the officer\'s assessment of fault. This report is crucial evidence for your personal injury case.',
    category: 'Legal Terms',
    triggers: ['tcr', 'traffic collision report', 'what is tcr', 'police report', 'accident report'],
    exactMatches: ['tcr', 'what is tcr'],
    relatedTerms: ['police report', 'accident report', 'collision report', 'incident report'],
    priority: 'high'
  },
  {
    id: 'med-pay-definition',
    question: 'What is Med Pay?',
    shortAnswer: '🏥 **Med Pay (Medical Payments Coverage)** is insurance that pays for medical expenses regardless of who caused the accident. It provides immediate coverage for medical bills, often without deductibles, and doesn\'t affect fault determination.',
    category: 'Insurance Terms',
    triggers: ['med pay', 'medical payments', 'what is med pay', 'medical payments coverage'],
    exactMatches: ['med pay', 'what is med pay'],
    relatedTerms: ['medical coverage', 'medical insurance', 'medical bills', 'no fault coverage'],
    priority: 'high'
  },
  {
    id: 'pip-definition',
    question: 'What is PIP?',
    shortAnswer: '🏥 **PIP (Personal Injury Protection)** is no-fault insurance coverage that pays for medical expenses, lost wages, and other benefits regardless of who caused the accident. It provides immediate coverage without waiting for fault determination.',
    category: 'Insurance Terms',
    triggers: ['pip', 'personal injury protection', 'what is pip', 'pip coverage'],
    exactMatches: ['pip', 'what is pip'],
    relatedTerms: ['no fault insurance', 'medical coverage', 'lost wages', 'immediate coverage'],
    priority: 'high'
  },
  {
    id: 'bodily-injury-definition',
    question: 'What is bodily injury?',
    shortAnswer: '🤕 **Bodily injury** refers to physical harm or damage to a person\'s body caused by an accident or incident. It includes injuries like broken bones, cuts, bruises, sprains, and other physical trauma that may require medical treatment.',
    category: 'Legal Terms',
    triggers: ['bodily injury', 'what is bodily injury', 'bodily injury definition', 'physical injury'],
    exactMatches: ['bodily injury', 'what is bodily injury'],
    relatedTerms: ['physical harm', 'physical damage', 'injury', 'medical treatment', 'trauma'],
    priority: 'high'
  },
  {
    id: 'property-damage-definition',
    question: 'What is property damage?',
    shortAnswer: '🚗 **Property damage** refers to harm caused to physical property, such as vehicle damage in a car accident. This includes repairs, replacement costs, diminished value, and rental car expenses while your vehicle is being repaired.',
    category: 'Legal Terms',
    triggers: ['property damage', 'what is property damage', 'pd', 'vehicle damage', 'car damage'],
    exactMatches: ['property damage', 'what is property damage', 'pd'],
    relatedTerms: ['vehicle damage', 'car damage', 'repair costs', 'replacement costs', 'rental car'],
    priority: 'high'
  },
  {
    id: 'pain-suffering-definition',
    question: 'What is pain and suffering?',
    shortAnswer: '😔 **Pain and suffering** refers to the physical pain and emotional distress you experience due to your injuries. This includes ongoing pain, discomfort, anxiety, depression, loss of enjoyment of life, and mental anguish. It\'s a type of non-economic damage.',
    category: 'Legal Terms',
    triggers: ['pain and suffering', 'what is pain and suffering', 'pain suffering', 'emotional distress'],
    exactMatches: ['pain and suffering', 'what is pain and suffering'],
    relatedTerms: ['emotional distress', 'mental anguish', 'non-economic damages', 'physical pain', 'suffering'],
    priority: 'high'
  },
  {
    id: 'negligence-definition',
    question: 'What is negligence?',
    shortAnswer: '⚖️ **Negligence** is the failure to exercise reasonable care that a prudent person would use in similar circumstances. It requires proving: 1) Duty of care, 2) Breach of duty, 3) Causation, and 4) Damages. It\'s the foundation of most personal injury cases.',
    category: 'Legal Terms',
    triggers: ['negligence', 'what is negligence', 'negligence definition', 'duty of care'],
    exactMatches: ['negligence', 'what is negligence'],
    relatedTerms: ['duty of care', 'breach of duty', 'causation', 'damages', 'reasonable care'],
    priority: 'high'
  },
  {
    id: 'liability-definition',
    question: 'What is liability?',
    shortAnswer: '📋 **Liability** is legal responsibility for causing harm or damage to another person. In personal injury cases, establishing liability means proving that someone else\'s actions or negligence caused your injuries and they should compensate you.',
    category: 'Legal Terms',
    triggers: ['liability', 'what is liability', 'liability definition', 'legal responsibility'],
    exactMatches: ['liability', 'what is liability'],
    relatedTerms: ['legal responsibility', 'fault', 'responsibility', 'compensation', 'at-fault'],
    priority: 'high'
  },

  // Insurance Specific Terms
  {
    id: 'adjuster-definition',
    question: 'What is an adjuster?',
    shortAnswer: '🔍 **An adjuster** is a person who investigates insurance claims. They examine evidence, interview parties, review damages, and determine how much the insurance company should pay for a claim.',
    category: 'Insurance Terms',
    triggers: ['adjuster', 'what is adjuster', 'insurance adjuster', 'adjuster definition', 'claims adjuster'],
    exactMatches: ['adjuster', 'what is adjuster'],
    relatedTerms: ['insurance adjuster', 'claims adjuster', 'claim investigation', 'insurance investigation'],
    priority: 'high'
  },
  {
    id: 'first-party-insurance',
    question: 'What is 1st party insurance?',
    shortAnswer: '🛡️ **1st Party insurance** is YOUR insurance company - the insurance carrier that covers you (the plaintiff). This includes your auto insurance, health insurance, and other policies that protect you.',
    category: 'Insurance Terms',
    triggers: ['1st party', 'first party', 'what is 1st party', 'first party insurance', '1st party insurance'],
    exactMatches: ['1st party', 'first party', 'what is 1st party'],
    relatedTerms: ['your insurance', 'plaintiff insurance', 'own insurance', 'insurance carrier'],
    priority: 'high'
  },
  {
    id: 'third-party-insurance',
    question: 'What is 3rd party insurance?',
    shortAnswer: '🏢 **3rd Party insurance** is the OTHER person\'s insurance company - the insurance carrier of the defendant (at-fault party). This is the insurance that typically pays for your damages when someone else causes your injury.',
    category: 'Insurance Terms',
    triggers: ['3rd party', 'third party', 'what is 3rd party', 'third party insurance', '3rd party insurance'],
    exactMatches: ['3rd party', 'third party', 'what is 3rd party'],
    relatedTerms: ['defendant insurance', 'other party insurance', 'at-fault insurance', 'liable party insurance'],
    priority: 'high'
  },
  {
    id: 'dec-page-definition',
    question: 'What is a Dec Page?',
    shortAnswer: '📋 **Dec Page (Declaration Page)** is the first page of an insurance policy that summarizes essential coverage information including policy limits, deductibles, covered vehicles, and premium amounts.',
    category: 'Insurance Terms',
    triggers: ['dec page', 'declaration page', 'what is dec page', 'what is declaration page', 'insurance dec page'],
    exactMatches: ['dec page', 'declaration page', 'what is dec page'],
    relatedTerms: ['insurance policy', 'policy summary', 'coverage summary', 'policy limits'],
    priority: 'high'
  },
  {
    id: 'policy-limits-definition',
    question: 'What are policy limits?',
    shortAnswer: '💰 **Policy limits** are the maximum amounts an insurance company will pay for covered losses. For example, if someone has "25/50/25" limits, they have $25k per person for bodily injury, $50k total per accident, and $25k for property damage.',
    category: 'Insurance Terms',
    triggers: ['policy limits', 'insurance limits', 'what are policy limits', 'coverage limits', 'liability limits'],
    exactMatches: ['policy limits', 'what are policy limits'],
    relatedTerms: ['insurance limits', 'coverage limits', 'liability limits', 'maximum coverage'],
    priority: 'high'
  },

  // HR and Employment Terms
  {
    id: 'probationary-period',
    question: 'What is probationary period?',
    shortAnswer: '⏱️ **Probationary period** is the initial 6 months of employment for newly hired employees. During this time, employees can be terminated for valid reasons as stipulated in the employment contract and Labor Code.',
    category: 'HR Terms',
    triggers: ['probationary period', 'probation', 'what is probationary period', 'probationary employment', '6 months probation'],
    exactMatches: ['probationary period', 'probation', 'what is probationary period'],
    relatedTerms: ['new employee', 'employment period', 'trial period', 'evaluation period'],
    priority: 'high'
  },
  {
    id: 'regular-employee',
    question: 'What is a regular employee?',
    shortAnswer: '✅ **A regular employee** is someone who has satisfactorily passed the 6-month probationary period. They have permanent employment status and enhanced job security compared to probationary employees.',
    category: 'HR Terms',
    triggers: ['regular employee', 'permanent employee', 'what is regular employee', 'regular employment', 'permanent employment'],
    exactMatches: ['regular employee', 'permanent employee', 'what is regular employee'],
    relatedTerms: ['permanent employment', 'job security', 'employment status', 'full-time employee'],
    priority: 'high'
  },
  {
    id: 'resignation-notice',
    question: 'How much notice for resignation?',
    shortAnswer: '📅 **Resignation requires 30 working days notice** to allow the company time to find a replacement. This advance notice helps ensure smooth transition and proper handover of responsibilities.',
    category: 'HR Procedures',
    triggers: ['resignation notice', 'how much notice', 'resignation period', '30 days notice', 'notice period'],
    exactMatches: ['resignation notice', 'how much notice', 'notice period'],
    relatedTerms: ['resignation', 'notice period', 'working days', 'transition period'],
    priority: 'high'
  },

  // Medical and Healthcare Terms
  {
    id: 'medical-authorization',
    question: 'What is medical authorization?',
    shortAnswer: '📋 **Medical authorization** is a signed form (often HIPAA authorization) that allows your attorney to request and receive your medical records from healthcare providers. It\'s required by law to access protected health information.',
    category: 'Medical Terms',
    triggers: ['medical authorization', 'hipaa authorization', 'what is medical authorization', 'medical records authorization'],
    exactMatches: ['medical authorization', 'hipaa authorization', 'what is medical authorization'],
    relatedTerms: ['hipaa', 'medical records', 'authorization form', 'health information'],
    priority: 'high'
  },
  {
    id: 'medical-records-clerk',
    question: 'What is a Medical Records Clerk?',
    shortAnswer: '👩‍⚕️ **Medical Records Clerk** is a healthcare professional who manages, organizes, and maintains patient medical records in healthcare facilities. They handle filing, data entry, record retrieval, HIPAA compliance, and patient registration. This is different from legal "Medical Records Clark" process used in personal injury cases.',
    category: 'Medical Terms',
    triggers: ['medical records clerk', 'what is medical records clerk', 'medical records clerk job', 'healthcare records clerk', 'medical records clerk profession'],
    exactMatches: ['medical records clerk', 'what is medical records clerk'],
    relatedTerms: ['healthcare professional', 'patient records', 'hipaa compliance', 'medical administration', 'healthcare clerk'],
    priority: 'high'
  },
  {
    id: 'medical-records',
    question: 'What are Medical Records?',
    shortAnswer: '📋 **Medical Records** are comprehensive documents that detail a patient\'s medical history, treatment, and care. In personal injury cases, they include hospital records, physician notes, diagnostic reports, treatment records, and pharmacy records. They serve as crucial evidence for establishing injuries, treatment necessity, and damages.',
    category: 'Medical Terms',
    triggers: ['medical records', 'what are medical records', 'medical documentation', 'patient records', 'medical files'],
    exactMatches: ['medical records', 'what are medical records'],
    relatedTerms: ['hospital records', 'physician records', 'diagnostic records', 'treatment records', 'medical documentation'],
    priority: 'high'
  },
  {
    id: 'medical-records-handling',
    question: 'What is Medical Records Handling?',
    shortAnswer: '📋 **Medical Records Handling** is the systematic process of collecting, organizing, managing, and analyzing medical documentation in personal injury cases. It includes record collection, chronological organization, provider categorization, damage assessment, and ensuring HIPAA compliance throughout the case.',
    category: 'Medical Terms',
    triggers: ['medical records handling', 'medical record handling', 'handling medical records', 'medical records management', 'medical records process'],
    exactMatches: ['medical records handling', 'what is medical records handling'],
    relatedTerms: ['record collection', 'medical organization', 'hipaa compliance', 'damage assessment', 'case management'],
    priority: 'high'
  },
  {
    id: 'medical-lien-definition',
    question: 'What is a medical lien?',
    shortAnswer: '🏥 **A medical lien** is a legal claim by healthcare providers against your personal injury settlement to recover unpaid medical bills. The provider agrees to wait for payment until your case settles, then gets paid from the settlement proceeds.',
    category: 'Medical Terms',
    triggers: ['medical lien', 'what is medical lien', 'hospital lien', 'doctor lien', 'healthcare lien'],
    exactMatches: ['medical lien', 'what is medical lien'],
    relatedTerms: ['healthcare lien', 'hospital lien', 'medical bills', 'treatment lien'],
    priority: 'high'
  },
  {
    id: 'mri-definition',
    question: 'What is an MRI?',
    shortAnswer: '🔬 **MRI (Magnetic Resonance Imaging)** is a diagnostic test that uses magnetic fields and radio waves to create detailed images of organs and tissues inside your body. It\'s commonly used to diagnose soft tissue injuries in personal injury cases.',
    category: 'Medical Terms',
    triggers: ['mri', 'what is mri', 'magnetic resonance imaging', 'mri scan', 'what is an mri'],
    exactMatches: ['mri', 'what is mri', 'what is an mri'],
    relatedTerms: ['magnetic resonance imaging', 'diagnostic test', 'medical imaging', 'scan'],
    priority: 'high'
  },

  // Case Management and Legal Process
  {
    id: 'discovery-definition',
    question: 'What is discovery?',
    shortAnswer: '📊 **Discovery** is the legal process where both parties exchange information and evidence before trial. This includes depositions, document requests, interrogatories (written questions), and medical examinations.',
    category: 'Legal Process',
    triggers: ['discovery', 'what is discovery', 'discovery process', 'legal discovery'],
    exactMatches: ['discovery', 'what is discovery'],
    relatedTerms: ['depositions', 'interrogatories', 'document requests', 'evidence exchange'],
    priority: 'high'
  },
  {
    id: 'mediation-definition',
    question: 'What is mediation?',
    shortAnswer: '🤝 **Mediation** is a voluntary settlement process where a neutral third party (mediator) helps both sides negotiate a resolution to your case. It\'s less formal than court and often leads to faster settlements.',
    category: 'Legal Process',
    triggers: ['mediation', 'what is mediation', 'mediation process', 'mediator'],
    exactMatches: ['mediation', 'what is mediation'],
    relatedTerms: ['mediator', 'settlement conference', 'negotiation', 'alternative dispute resolution'],
    priority: 'high'
  },
  {
    id: 'arbitration-definition',
    question: 'What is arbitration?',
    shortAnswer: '⚖️ **Arbitration** is a binding dispute resolution process where a neutral arbitrator (like a private judge) hears both sides and makes a final decision. Unlike mediation, the arbitrator\'s decision is usually final and enforceable.',
    category: 'Legal Process',
    triggers: ['arbitration', 'what is arbitration', 'arbitration process', 'arbitrator'],
    exactMatches: ['arbitration', 'what is arbitration'],
    relatedTerms: ['arbitrator', 'binding decision', 'dispute resolution', 'private judge'],
    priority: 'high'
  },

  // Common Abbreviations and Acronyms
  {
    id: 'lor-definition',
    question: 'What is LOR?',
    shortAnswer: '📄 **LOR (Letter of Representation)** is a formal document sent to insurance companies and other parties notifying them that you have legal representation. It directs all communications to go through your attorney.',
    category: 'Legal Terms',
    triggers: ['lor', 'letter of representation', 'what is lor', 'letters of representation'],
    exactMatches: ['lor', 'what is lor'],
    relatedTerms: ['letter of representation', 'legal representation', 'attorney notification'],
    priority: 'high'
  },
  {
    id: 'emc2-definition',
    question: 'What is EMC2?',
    shortAnswer: '💻 **EMC2** is a case management software system used by law firms to organize cases, track deadlines, manage documents, and coordinate client communications. It helps streamline legal practice operations.',
    category: 'Legal Technology',
    triggers: ['emc2', 'emc', 'what is emc2', 'emc squared', 'case management software'],
    exactMatches: ['emc2', 'emc', 'what is emc2'],
    relatedTerms: ['case management software', 'legal software', 'practice management', 'legal technology'],
    priority: 'medium'
  }
];

// Function to find granular knowledge with exact matching
export function findGranularKnowledge(userMessage: string): GranularKnowledgeEntry | null {
  const normalizedMessage = userMessage.toLowerCase().trim();
  
  // First, try exact matches for highest accuracy
  for (const entry of granularKnowledge) {
    for (const exactMatch of entry.exactMatches) {
      if (normalizedMessage === exactMatch.toLowerCase()) {
        return entry;
      }
    }
  }
  
  // Then try trigger matching - sort by specificity (longer triggers first)
  const sortedEntries = [...granularKnowledge].sort((a, b) => {
    const maxTriggerLengthA = Math.max(...a.triggers.map(t => t.length));
    const maxTriggerLengthB = Math.max(...b.triggers.map(t => t.length));
    return maxTriggerLengthB - maxTriggerLengthA;
  });
  
  for (const entry of sortedEntries) {
    for (const trigger of entry.triggers) {
      if (normalizedMessage.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  
  // Finally, try related terms matching
  for (const entry of granularKnowledge) {
    for (const term of entry.relatedTerms) {
      if (normalizedMessage.includes(term.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
}

// Get all available granular categories
export function getGranularCategories(): string[] {
  const categories = new Set(granularKnowledge.map(entry => entry.category));
  return Array.from(categories).sort();
}

// Search granular knowledge by category
export function findGranularByCategory(category: string): GranularKnowledgeEntry[] {
  return granularKnowledge.filter(entry => 
    entry.category.toLowerCase() === category.toLowerCase()
  );
}

// Get high priority granular knowledge
export function getHighPriorityGranular(): GranularKnowledgeEntry[] {
  return granularKnowledge.filter(entry => entry.priority === 'high');
}
