// Intake Process Domain Knowledge
export interface IntakeProcessKnowledgeEntry {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
  triggers: string[];
  priority: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

export const intakeProcessKnowledge: IntakeProcessKnowledgeEntry[] = [
  {
    id: 'intake-stage',
    category: 'Initial Stage',
    title: 'Intake Stage',
    content: `## 📞 Intake Stage

**What is the intake stage?**

The intake stage is the very start of a case when a potential client calls the attorney's office with a new potential case. The firm either accepts or rejects the case.

### If Accepted:
The **Intake Process** begins, gathering information about the client and case, including:

- **Personal information**
- **Insurance information**
- **Incident information**
- **Treatment physicians/hospitals**
- **Defendant information**

This initial stage is critical for case evaluation and proper documentation setup.`,
    keywords: ['intake', 'initial stage', 'case acceptance', 'client information'],
    triggers: ['what is the intake stage', 'intake stage', 'intake process', 'what is intake', 'intake definition', 'define intake'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'intake-detailed',
    category: 'Process Details',
    title: 'Intake Process Details',
    content: `## 📋 Intake Process Details

**What happens during intake?**

### Intake Process:
**Intake** - Gather client information, evaluate case details, and determine if the firm will take the case.

### Key Activities:
- **Client Information Gathering** - Personal details, contact information, employment status
- **Case Evaluation** - Assess the merits and potential value of the case
- **Documentation Setup** - Create case file and initial documentation
- **Conflict Check** - Ensure no conflicts of interest exist
- **Fee Agreement** - Discuss and document fee structure and terms

### Information Collected:
- **Personal Information** - Name, address, phone, email, employment
- **Insurance Information** - Policy details, coverage limits, claim numbers
- **Incident Information** - Date, time, location, circumstances of the accident
- **Treatment Information** - Physicians, hospitals, medical providers involved
- **Defendant Information** - At-fault party details, insurance information

### Decision Factors:
- **Case Merit** - Strength of liability and damages
- **Statute of Limitations** - Time remaining to file suit
- **Insurance Coverage** - Available coverage for recovery
- **Client Cooperation** - Willingness to participate in case development`,
    keywords: ['intake process', 'intake details', 'case evaluation', 'client information', 'intake procedure', 'intake workflow'],
    triggers: ['intake process details', 'intake procedure', 'intake workflow', 'intake details', 'what happens during intake', 'intake process steps', 'intake procedure details'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'initial-action-items',
    category: 'Action Items',
    title: 'Initial Action Items',
    content: `## ✅ Initial Action Items

**What are initial action items?**

Initial action items are tasks to be completed within **24-48 hours** from case assignment. These vary depending on the type of Personal Injury Case but typically include:

### Required Actions:
- Sending welcome letters
- Sending letters of representation (LOR) to all insurance carriers involved
- Sending preservation letters when applicable
- Requesting traffic collision reports
- Requesting animal control reports if needed
- Sending notices to health insurance providers

### Timeline:
**24-48 hours** from case assignment is critical for proper case setup and client communication.`,
    keywords: ['action items', '24-48 hours', 'case assignment', 'welcome letters', 'LOR'],
    triggers: ['what are initial action items', 'initial action items', 'action items', 'what are action items', 'action items definition', 'define action items'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'treatment-nai',
    category: 'Treatment & NAI',
    title: 'Treatment & NAI Process',
    content: `## 🏥 Treatment & NAI Process

**What is Treatment & NAI?**

**Treatment & NAI's** - Ensure the client receives necessary medical care and complete initial case tasks (e.g., sending letters, filing claims).

### Treatment Phase:
- **Medical Care Coordination** - Ensure client receives appropriate medical treatment
- **Treatment Planning** - Develop comprehensive treatment plan with healthcare providers
- **Medical Documentation** - Collect and organize all medical records and bills
- **Treatment Monitoring** - Track progress and ensure treatment compliance

### NAI (Next Action Items) Phase:
- **Letters of Representation** - Send to all insurance carriers involved
- **Preservation Letters** - When applicable to preserve evidence
- **Traffic Reports** - Request collision reports from law enforcement
- **Animal Control Reports** - If applicable to the case
- **Health Insurance Notices** - Notify health insurance providers
- **Initial Claims Filing** - File claims with appropriate insurance companies

### Key Objectives:
- **Client Care** - Ensure optimal medical treatment and recovery
- **Case Development** - Build strong foundation for successful resolution
- **Documentation** - Establish comprehensive case file
- **Communication** - Maintain clear client and provider communication`,
    keywords: ['treatment', 'nai', 'next action items', 'medical care', 'treatment planning', 'case tasks', 'medical documentation'],
    triggers: ['treatment and nai', 'treatment nai', 'what is treatment and nai', 'treatment process', 'nai process', 'next action items', 'treatment planning', 'medical care coordination', 'what is nai', 'nai', 'what is nai?', 'what does nai mean', 'nai definition', 'define nai'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'file-claim',
    category: 'Claims',
    title: 'How to File a Claim',
    content: `## 📋 How to File a Claim

**How do you file a claim?**

### Steps to File a Claim:

1. **Call the claims department** of the insurance carrier involved
2. **Find phone number** in Dropbox/Filevine/Box or by Googling "[Insurance Carrier Name] Phone Number"
3. **Provide required information:**
   - Client's name
   - Date of birth
   - Address
   - Date of incident
   - Policy number
   - Brief description of what happened
   - Injury/treatment description

### ⚠️ Important:
- **NEVER provide** the client's social security number
- Be general and use qualifying terms
- Be prepared to give the adjuster some information about injuries to set reserves

This process ensures proper claim initiation while protecting client privacy.`,
    keywords: ['file claim', 'insurance claim', 'claims department', 'policy number'],
    triggers: ['how do you file a claim', 'file a claim', 'filing claim'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'lien-definition',
    category: 'Liens',
    title: 'What is a Lien',
    content: `## 💰 What is a Lien

**What is a lien?**

A **LIEN** refers to a legal claim or legal right made against assets held as collateral for satisfying a debt.

### In Personal Injury Cases:
A medical lien is any demand for repayment for medical services that can be placed against the settlement money.

### Health Insurance Company's Position:
If someone else is at fault for injuries and the client receives compensation from that negligent party, they should be reimbursed for the portion of medical expenses they covered originally.

### Impact:
- **Reduces settlement amount** available to client
- **Requires negotiation** with medical providers
- **Must be resolved** before final disbursement
- **Affects client recovery** significantly`,
    keywords: ['lien', 'medical lien', 'repayment', 'settlement', 'medical expenses'],
    triggers: ['what is a lien', 'lien', 'medical lien', 'lien definition', 'define lien'],
    priority: 'medium',
    lastUpdated: '2025-01-01'
  }
];

export function findIntakeProcessKnowledge(userMessage: string): IntakeProcessKnowledgeEntry | null {
  const message = userMessage.toLowerCase();
  
  for (const entry of intakeProcessKnowledge) {
    for (const trigger of entry.triggers) {
      if (message.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
} 