// Case Management Domain Knowledge
export interface CaseManagementKnowledgeEntry {
  id: string;
  category: string;
  title: string;
  content: string;
  tableContent?: string;
  keywords: string[];
  triggers: string[];
  priority: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

export const caseManagementKnowledge: CaseManagementKnowledgeEntry[] = [
  {
    id: 'case-management-work',
    category: 'Process Overview',
    title: 'How Case Management Works',
    content: `## 📊 Case Management Process

**How does case management work?**

**Case Managers (CMs)** facilitate client's care by:
- Assessing their needs
- Evaluating treatment options
- Creating treatment plans
- Coordinating care to improve the client's well-being

### Role in Legal Process:
Attorneys rely on CMs to execute agreed upon strategies. CMs help attorneys' clients get fully compensated and recover from injuries sustained from an accident by guiding the clients through all the details and processes related to their cases.

### Key Responsibilities:
- **Client guidance** through complex processes
- **Case coordination** with all parties involved
- **Treatment planning** and monitoring
- **Recovery optimization** for maximum compensation`,
    keywords: ['case management', 'case manager', 'coordination', 'treatment', 'recovery', 'cm', 'case management work', 'case manager work'],
    triggers: ['how does case management work', 'case management', 'what is case management', 'case management work', 'cm work', 'case manager work', 'what is case management', 'case management definition', 'how case management works', 'case management process', 'define case management', 'case management meaning', 'CM', 'what is CM', 'CM definition', 'define CM', 'case manager role overview', 'case manager role', 'role overview'],
    priority: 'high',
    lastUpdated: '2025-01-01',
    tableContent: `## 📊 Case Management Overview

| **Aspect** | **Description** |
|-------------|----------------|
| **Role** | Case Managers (CMs) facilitate client care |
| **Core Functions** | Assess needs, evaluate treatment, create plans, coordinate care |
| **Legal Support** | Execute attorney strategies for maximum compensation |
| **Client Focus** | Guide clients through complex legal processes |
| **Key Responsibilities** | Client guidance, case coordination, treatment planning, recovery optimization |
| **Goal** | Help clients get fully compensated and recover from injuries |
| **Process** | End-to-end case management from intake to resolution |
| **Outcome** | Improved client well-being and maximum recovery |`
  },
  {
    id: 'case-manager-role-detailed',
    category: 'Role Definition',
    title: 'What Case Managers Do',
    content: `## 👥 Case Manager Responsibilities

**What do Case Managers do?**

### Primary Functions:
1. **Case Managers (CMs)** facilitate client's care by assessing their needs, evaluating treatment options, creating treatment plans, coordinating care to improve client's well-being.

2. **Attorneys rely on CMs** to execute agreed upon strategies.

3. **CMs help attorneys' clients** get fully compensated and recover from injuries sustained from an accident by guiding the clients through all the details and processes related to their cases.

### Key Responsibilities:
- **Client guidance** through complex legal processes
- **Case coordination** with all parties involved
- **Treatment planning** and monitoring
- **Recovery optimization** for maximum compensation
- **Strategy execution** as directed by attorneys`,
    keywords: ['case manager', 'case manager role', 'case manager responsibilities', 'what case managers do', 'cm role', 'case manager do', 'cm responsibilities'],
    triggers: ['what do case managers do', 'case manager role', 'case manager responsibilities', 'what case managers do', 'cm role', 'case manager do', 'cm responsibilities', 'what case managers do', 'case manager job', 'cm job', 'case manager work', 'cm work', 'case manager duties', 'cm duties', 'what is a case manager', 'what is case manager', 'case manager definition', 'define case manager', 'CM', 'what is CM', 'CM definition', 'define CM'],
    priority: 'high',
    lastUpdated: '2025-01-01',
    tableContent: `## 👥 Case Manager Role Overview

| **Function** | **Description** | **Impact** |
|--------------|----------------|------------|
| **Client Care Facilitation** | Assess needs, evaluate treatment, create plans, coordinate care | Improved client well-being |
| **Attorney Support** | Execute agreed upon strategies | Enhanced legal outcomes |
| **Client Guidance** | Guide through all case details and processes | Full compensation and recovery |
| **Case Coordination** | Coordinate with all parties involved | Streamlined case management |
| **Treatment Planning** | Plan and monitor treatment options | Optimal recovery outcomes |
| **Recovery Optimization** | Maximize compensation and recovery | Best possible client outcomes |

### 🎯 Core Mission:
**Help clients get fully compensated and recover from injuries** by providing expert guidance through all case processes and details.`
  },
  {
    id: 'case-lifecycle',
    category: 'Case Lifecycle',
    title: 'Life of a Personal Injury Case',
    content: `## 🔄 Life of a Personal Injury Case

**What is the life of a personal injury case?**

The life of a personal injury case refers to the process and stages a personal injury lawsuit goes through from the initial incident until a resolution, either through settlement or trial.

### Case Stages:

1. **Intake** - Initial case evaluation and acceptance
2. **Treatment** - Medical care and documentation
3. **Demand Drafting** - Preparation of settlement demand
4. **Settlement Negotiation** - Back-and-forth with insurance
5. **Settlement Confirmation** - Finalizing agreement terms
6. **Lien Negotiation** - Resolving medical liens
7. **Case Closure/Disbursement** - Final distribution of funds

Each stage requires careful coordination and documentation for optimal case outcomes.`,
    keywords: ['case life', 'stages', 'intake', 'treatment', 'settlement', 'closure', 'case lifecycle', 'case stages', 'life of case', 'case life cycle'],
    triggers: ['what is the life of a personal injury case', 'case lifecycle', 'case stages', 'life of case', 'case life cycle', 'case life', 'personal injury case life', 'case stages', 'case lifecycle', 'life of personal injury case', 'case life cycle', 'case stages process'],
    priority: 'high',
    lastUpdated: '2025-01-01',
    tableContent: `## 🔄 Personal Injury Case Lifecycle

| **Stage** | **Description** | **Key Activities** |
|-----------|----------------|-------------------|
| **1. Intake** | Initial case evaluation and acceptance | • Gather client information\n• Evaluate case details\n• Determine case acceptance |
| **2. Treatment & NAI's** | Medical care and initial tasks | • Ensure medical care\n• Send letters of representation\n• File initial claims |
| **3. Demand Drafting** | Prepare settlement demand | • Outline client damages\n• Specify desired compensation\n• Formal letter to insurance |
| **4. Settlement Negotiation** | Negotiate with insurance | • Discuss settlement terms\n• Reach fair agreement\n• Back-and-forth negotiations |
| **5. Settlement Confirmation** | Finalize settlement terms | • Legally binding document\n• Agreed-upon terms\n• Formal confirmation |
| **6. Lien Negotiation** | Resolve medical liens | • Negotiate with healthcare providers\n• Resolve outstanding bills\n• Use settlement funds |
| **7. Case Closure/Disbursement** | Final distribution and closure | • Distribute remaining funds\n• Close case officially\n• Complete documentation |

### 🎯 Process Goal:
**Resolution through settlement or trial** - From initial incident to final resolution with optimal case outcomes.`
  },
  {
    id: 'detailed-case-stages',
    category: 'Detailed Process',
    title: 'Detailed Case Management Stages',
    content: `## 📋 Detailed Case Management Stages

### Intake
Gather client information, evaluate case details, and determine if the firm will take the case.

### Treatment & NAI's
Ensure the client receives necessary medical care and complete initial case tasks (e.g., sending letters, filing claims).

### Demand Drafting
Prepare a formal letter outlining the client's damages and desired compensation from the at-fault party's insurance.

### Settlement Negotiation
Engage in discussions with the insurance company to reach a fair settlement agreement.

### Settlement Confirmation
Formalize the agreed-upon settlement terms in a legally binding document.

### Lien Negotiation
Negotiate with healthcare providers and lienholders to resolve outstanding medical bills using the settlement funds.

### Case Closure/Disbursement
Distribute the remaining settlement funds to the client and officially close the case.`,
    tableContent: `## 📋 Detailed Case Management Process

**Intake** - Case evaluation and acceptance  
• Gather client information  
• Evaluate case details  
• Determine firm acceptance  

**Treatment & NAI's** - Medical care and initial tasks  
• Ensure medical care  
• Send letters of representation  
• File initial claims  

**Demand Drafting** - Prepare settlement demand  
• Outline client damages  
• Specify desired compensation  
• Formal letter to insurance  

**Settlement Negotiation** - Negotiate with insurance  
• Discuss settlement terms  
• Reach fair agreement  
• Back-and-forth negotiations  

**Settlement Confirmation** - Finalize settlement terms  
• Legally binding document  
• Agreed-upon terms  
• Formal confirmation  

**Lien Negotiation** - Resolve medical liens  
• Negotiate with healthcare providers  
• Resolve outstanding bills  
• Use settlement funds  

**Case Closure/Disbursement** - Final distribution and closure  
• Distribute remaining funds  
• Close case officially  
• Complete documentation  

### 🎯 Case Manager Role:
**Facilitate client care** by assessing needs, evaluating treatment options, creating treatment plans, and coordinating care to improve client well-being. Attorneys rely on CMs to execute agreed upon strategies and help clients get fully compensated.`,
    keywords: ['detailed case stages', 'intake', 'treatment', 'demand drafting', 'settlement', 'lien negotiation', 'case closure', 'case management stages', 'detailed stages', 'case process stages'],
    triggers: ['detailed case management stages', 'case stages', 'intake process', 'treatment and nai', 'demand drafting process', 'settlement negotiation', 'lien negotiation', 'case closure disbursement', 'detailed stages', 'case management stages', 'case process stages', 'detailed case stages', 'case stages detailed', 'intake treatment demand settlement lien closure'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'case-manager-role',
    category: 'Role Definition',
    title: 'What Case Managers Do',
    content: `## 👥 Case Manager Responsibilities

**What do Case Managers do?**

### Primary Functions:
1. **Case Managers (CMs)** facilitate client's care by assessing their needs, evaluating treatment options, creating treatment plans, coordinating care to improve client's well-being.

2. **Attorneys rely on CMs** to execute agreed upon strategies.

3. **CMs help attorneys' clients** get fully compensated and recover from injuries sustained from an accident by guiding the clients through all the details and processes related to their cases.

### Key Responsibilities:
- **Client guidance** through complex legal processes
- **Case coordination** with all parties involved
- **Treatment planning** and monitoring
- **Recovery optimization** for maximum compensation
- **Strategy execution** as directed by attorneys`,
    tableContent: `## 👥 Case Manager Role Overview

| **Function** | **Description** | **Impact** |
|--------------|----------------|------------|
| **Client Care Facilitation** | Assess needs, evaluate treatment, create plans, coordinate care | Improved client well-being |
| **Attorney Support** | Execute agreed upon strategies | Enhanced legal outcomes |
| **Client Guidance** | Guide through all case details and processes | Full compensation and recovery |
| **Case Coordination** | Coordinate with all parties involved | Streamlined case management |
| **Treatment Planning** | Plan and monitor treatment options | Optimal recovery outcomes |
| **Recovery Optimization** | Maximize compensation and recovery | Best possible client outcomes |

### 🎯 Core Mission:
**Help clients get fully compensated and recover from injuries** by providing expert guidance through all case processes and details.`,
    keywords: ['case manager', 'case manager role', 'case manager responsibilities', 'what case managers do', 'cm role', 'case manager do', 'cm responsibilities'],
    triggers: ['what do case managers do', 'case manager role', 'case manager responsibilities', 'what case managers do', 'cm role', 'case manager do', 'cm responsibilities', 'what case managers do', 'case manager job', 'cm job', 'case manager work', 'cm work', 'case manager duties', 'cm duties', 'what is a case manager', 'what is case manager', 'case manager definition', 'define case manager', 'CM', 'what is CM', 'CM definition', 'define CM'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'demand-drafting',
    category: 'Settlement Process',
    title: 'Demand Drafting',
    content: `## 📝 Demand Drafting

**What is demand drafting?**

**Demand Drafting** - Prepare a formal letter outlining the client's damages and desired compensation from the at-fault party's insurance.

### Purpose:
- **Formal Settlement Request** - Present comprehensive demand to insurance company
- **Damage Documentation** - Outline all injuries, medical treatment, and losses
- **Compensation Request** - Specify desired settlement amount
- **Legal Foundation** - Establish basis for settlement negotiations

### Key Components:
- **Client Information** - Personal details and case background
- **Incident Description** - Detailed account of the accident
- **Medical Treatment** - Comprehensive medical history and ongoing care
- **Damages Calculation** - Medical bills, lost wages, pain and suffering
- **Settlement Demand** - Specific amount requested for resolution

### Process:
1. **Gather Documentation** - Collect all medical records, bills, and evidence
2. **Calculate Damages** - Total medical expenses, lost wages, future care needs
3. **Draft Demand Letter** - Comprehensive presentation of case and damages
4. **Review and Finalize** - Ensure accuracy and completeness
5. **Submit to Insurance** - Send formal demand to at-fault party's insurance

### Objectives:
- **Maximum Recovery** - Present strongest case for highest settlement
- **Professional Presentation** - Demonstrate thorough case preparation
- **Negotiation Foundation** - Establish starting point for settlement talks`,
    keywords: ['demand drafting', 'demand letter', 'settlement demand', 'damages calculation', 'settlement request'],
    triggers: ['demand drafting', 'demand letter', 'settlement demand', 'what is demand drafting', 'demand drafting process', 'how to draft demand', 'demand letter process'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'settlement-negotiation',
    category: 'Settlement Process',
    title: 'Settlement Negotiation',
    content: `## 🤝 Settlement Negotiation

**What is settlement negotiation?**

**Settlement Negotiation** - Engage in discussions with the insurance company to reach a fair settlement agreement.

### Process:
- **Initial Response** - Insurance company responds to demand letter
- **Counteroffers** - Back-and-forth negotiation of settlement amount
- **Evidence Exchange** - Share additional documentation as needed
- **Compromise Discussion** - Find middle ground acceptable to both parties

### Key Elements:
- **Strong Case Presentation** - Emphasize liability and damages
- **Evidence Support** - Medical records, bills, witness statements
- **Professional Communication** - Maintain professional tone throughout
- **Strategic Timing** - Know when to hold firm or compromise

### Negotiation Strategies:
- **Start High** - Begin with strong demand to leave room for compromise
- **Document Everything** - Keep detailed records of all communications
- **Stay Professional** - Maintain courteous but firm approach
- **Know Your Bottom Line** - Determine minimum acceptable settlement
- **Be Patient** - Negotiation can take time, don't rush

### Success Factors:
- **Thorough Preparation** - Complete case documentation and evidence
- **Clear Communication** - Articulate client's position effectively
- **Flexibility** - Willing to compromise while protecting client interests
- **Persistence** - Continue negotiations until fair resolution reached`,
    keywords: ['settlement negotiation', 'insurance negotiation', 'settlement talks', 'negotiation process', 'settlement agreement'],
    triggers: ['settlement negotiation', 'insurance negotiation', 'settlement talks', 'what is settlement negotiation', 'negotiation process', 'how to negotiate settlement'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'settlement-confirmation',
    category: 'Settlement Process',
    title: 'Settlement Confirmation',
    content: `## ✅ Settlement Confirmation

**What is settlement confirmation?**

**Settlement Confirmation** - Formalize the agreed-upon settlement terms in a legally binding document.

### Process:
- **Agreement Reached** - Both parties agree on settlement amount and terms
- **Document Preparation** - Draft formal settlement agreement
- **Client Review** - Client reviews and approves settlement terms
- **Document Execution** - All parties sign the settlement agreement
- **Payment Processing** - Insurance company processes settlement payment

### Key Components:
- **Settlement Amount** - Agreed-upon compensation amount
- **Release of Claims** - Client releases all claims against at-fault party
- **Payment Terms** - How and when payment will be made
- **Confidentiality** - Any confidentiality provisions
- **Finality** - Agreement that this resolves all claims

### Important Considerations:
- **Client Understanding** - Ensure client fully understands settlement terms
- **Legal Review** - Attorney reviews all settlement documents
- **Tax Implications** - Consider tax consequences of settlement
- **Future Medical Care** - Address ongoing medical treatment needs
- **Lien Resolution** - Ensure medical liens are properly addressed

### Final Steps:
- **Document Execution** - All parties sign settlement agreement
- **Payment Processing** - Insurance company issues settlement check
- **Case Closure** - Begin process of closing case file
- **Client Communication** - Explain next steps and timeline`,
    keywords: ['settlement confirmation', 'settlement agreement', 'settlement document', 'final settlement', 'settlement execution'],
    triggers: ['settlement confirmation', 'settlement agreement', 'what is settlement confirmation', 'settlement document', 'final settlement', 'settlement execution'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'lien-negotiation',
    category: 'Settlement Process',
    title: 'Lien Negotiation',
    content: `## 💰 Lien Negotiation

**What is lien negotiation?**

**Lien Negotiation** - Negotiate with healthcare providers and lienholders to resolve outstanding medical bills using the settlement funds.

### Purpose:
- **Medical Bill Resolution** - Settle outstanding medical expenses
- **Maximize Client Recovery** - Reduce amount owed to medical providers
- **Fair Settlement** - Ensure reasonable payment for medical services
- **Case Closure** - Resolve all outstanding financial obligations

### Process:
1. **Identify All Liens** - Locate all medical providers with potential liens
2. **Contact Providers** - Reach out to discuss lien amounts
3. **Negotiate Reductions** - Request reductions in lien amounts
4. **Document Agreements** - Get written confirmation of reduced amounts
5. **Coordinate Payments** - Ensure proper payment distribution

### Negotiation Strategies:
- **Start Early** - Begin lien negotiations before settlement
- **Request Reductions** - Ask for significant reductions in lien amounts
- **Provide Documentation** - Share settlement details and client circumstances
- **Be Persistent** - Continue negotiations until reasonable resolution
- **Get Everything in Writing** - Document all agreements and payments

### Common Lien Types:
- **Health Insurance** - Subrogation claims for medical payments
- **Medical Providers** - Outstanding bills from doctors, hospitals, clinics
- **Medicare/Medicaid** - Government healthcare program liens
- **Workers Compensation** - If case involves work-related injury

### Success Factors:
- **Thorough Documentation** - Complete records of all medical expenses
- **Professional Communication** - Maintain professional relationships with providers
- **Fair Negotiation** - Reasonable approach to lien reduction
- **Timely Resolution** - Resolve liens promptly to close case`,
    keywords: ['lien negotiation', 'medical liens', 'healthcare liens', 'lien reduction', 'medical bill negotiation'],
    triggers: ['lien negotiation', 'medical liens', 'what is lien negotiation', 'lien reduction', 'medical bill negotiation', 'healthcare liens'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'nai-overview',
    category: 'Case Process',
    title: 'What is NAI (Next Action Items)',
    content: `## 📋 NAI (Next Action Items)

**What is NAI?**

**NAI** stands for **Next Action Items** - the essential tasks that must be completed during the Treatment & NAI phase of case management.

### NAI Components:

**Letters of Representation** - Send to all insurance carriers involved
**Preservation Letters** - When applicable to preserve evidence  
**Traffic Reports** - Request collision reports from law enforcement
**Animal Control Reports** - If applicable to the case
**Health Insurance Notices** - Notify health insurance providers
**Initial Claims Filing** - File claims with appropriate insurance companies

### Purpose:
- **Case Foundation** - Establish comprehensive case documentation
- **Evidence Preservation** - Ensure all relevant evidence is collected
- **Insurance Notification** - Properly notify all parties involved
- **Claim Initiation** - Begin formal claims process with carriers

### Key Objectives:
- **Client Care** - Ensure optimal medical treatment and recovery
- **Case Development** - Build strong foundation for successful resolution
- **Documentation** - Establish comprehensive case file
- **Communication** - Maintain clear client and provider communication`,
    keywords: ['nai', 'next action items', 'case tasks', 'initial tasks', 'case process', 'treatment phase'],
    triggers: ['what is nai', 'nai', 'what is nai?', 'what does nai mean', 'nai definition', 'define nai', 'next action items', 'what are nai', 'nai process', 'NAI', 'what is NAI', 'NAI definition', 'define NAI'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'case-closure',
    category: 'Case Closure',
    title: 'Case Closure/Disbursement',
    content: `## 🎯 Case Closure/Disbursement

**What is case closure and disbursement?**

**Case Closure/Disbursement** - Distribute the remaining settlement funds to the client and officially close the case.

### Process:
1. **Final Accounting** - Calculate all expenses and deductions
2. **Client Distribution** - Determine final amount for client
3. **Payment Processing** - Issue final payment to client
4. **Case Documentation** - Complete all final case documentation
5. **File Closure** - Officially close the case file

### Key Steps:
- **Settlement Check Processing** - Deposit and clear settlement payment
- **Expense Deduction** - Subtract attorney fees, costs, and liens
- **Client Payment** - Calculate and distribute client's portion
- **Final Documentation** - Complete all required case documentation
- **Case File Closure** - Organize and close case file

### Important Considerations:
- **Accurate Accounting** - Ensure all amounts are correctly calculated
- **Client Communication** - Explain final distribution clearly
- **Documentation** - Complete all required case documentation
- **Timeline** - Process disbursement promptly after settlement
- **Tax Considerations** - Address any tax implications for client

### Final Deliverables:
- **Client Payment** - Final settlement check to client
- **Case Summary** - Complete case summary and documentation
- **Tax Documentation** - Any required tax forms or information
- **Case Closure Letter** - Formal notification of case closure

### Post-Closure:
- **File Retention** - Maintain case files according to firm policy
- **Client Follow-up** - Check in with client after case closure
- **Lessons Learned** - Document any important case insights
- **Process Improvement** - Identify areas for future improvement`,
    keywords: ['case closure', 'disbursement', 'final payment', 'case completion', 'settlement distribution'],
    triggers: ['case closure', 'disbursement', 'what is case closure', 'final payment', 'case completion', 'settlement distribution'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  }
];

export function findCaseManagementKnowledge(userMessage: string): CaseManagementKnowledgeEntry | null {
  const message = userMessage.toLowerCase();
  
  for (const entry of caseManagementKnowledge) {
    for (const trigger of entry.triggers) {
      if (message.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
} 