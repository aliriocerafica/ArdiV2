// Intake & Initial Action Items Knowledge
// Classification: Internal-Only

export interface IntakeAndInitialActionItemsEntry {
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

export const intakeAndInitialActionItemsKnowledge: IntakeAndInitialActionItemsEntry[] = [
  {
    id: 'intake-stage',
    category: 'Intake Process',
    title: 'Intake Stage',
    content: `## 📞 Intake Stage

**What is the intake stage?**

This is the very start of a case. A potential client will call the attorney office with a new potential case.

### Process:
- The firm either accepts or rejects the case
- If the case is accepted, we begin the Intake Process
- This consists of gathering pieces of information about the client and the case

### Information Collected:
- **Personal Information** - Client's personal details
- **Insurance Information** - Policy details and coverage
- **Incident Information** - Details about the accident/incident
- **Treatment Physicians/Hospitals** - Medical providers involved
- **Defendant's Information** - At-fault party details

### Purpose:
This initial stage is critical for case evaluation and proper documentation setup.`,
    keywords: ['intake stage', 'intake process', 'case acceptance', 'client information', 'case evaluation'],
    triggers: ['intake stage', 'what is intake stage', 'intake process', 'case acceptance', 'client information gathering', 'intake definition'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'initial-action-items',
    category: 'Action Items',
    title: 'Initial Action Items',
    content: `## ✅ Initial Action Items

**What are initial action items?**

These are initial list of tasks to be done within **24-48 hours** from the day a case has been assigned.

### Timeline:
**24-48 hours** from case assignment is critical for proper case setup and client communication.

### Important Notes:
- Initial action items vary depending upon the type of Personal Injury Case
- These tasks must be completed promptly to establish proper case foundation
- Each task serves a specific purpose in case development

### Key Objectives:
- **Client Communication** - Establish professional relationship
- **Insurance Notification** - Properly notify all parties involved
- **Evidence Preservation** - Ensure all relevant evidence is collected
- **Case Documentation** - Establish comprehensive case file`,
    keywords: ['initial action items', '24-48 hours', 'case assignment', 'action items', 'case setup'],
    triggers: ['initial action items', 'what are initial action items', 'action items', '24-48 hours', 'case assignment tasks'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'welcome-letter',
    category: 'Client Communication',
    title: 'Send Welcome Letter',
    content: `## 📝 Send Welcome Letter

**What is a welcome letter?**

This is a letter we initially send to **ALL new clients**, simply to welcome them.

### Purpose:
- Establish professional relationship with client
- Provide initial communication and reassurance
- Set expectations for case process
- Demonstrate firm's commitment to client

### Timing:
- Sent within 24-48 hours of case assignment
- First official communication from firm to client

### Key Elements:
- Professional welcome and introduction
- Brief overview of next steps
- Contact information for questions
- Reassurance about case handling`,
    keywords: ['welcome letter', 'client communication', 'initial letter', 'client welcome'],
    triggers: ['welcome letter', 'send welcome letter', 'client welcome letter', 'initial client letter'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'letters-of-representation',
    category: 'Insurance Communication',
    title: 'Send Letters of Representation (LOR)',
    content: `## 📋 Send Letters of Representation (LOR)

**What are Letters of Representation?**

This is a letter we send to **ALL insurance carriers involved** in the case, making them aware that a client is represented by an attorney.

### Purpose:
- Notify insurance carriers of legal representation
- Establish attorney-client relationship
- Prevent direct communication with client
- Set professional boundaries

### Key Requirements:
- Send to ALL insurance carriers involved
- Must be sent within 24-48 hours of case assignment
- Use proper legal language and format
- Include all necessary case information

### Important Notes:
- Upon receipt of LOR, insurance adjusters are prohibited to contact our client directly
- Every state has different law imposed by the government
- Use proper language/LOR template based on the state where the accident happened`,
    keywords: ['letters of representation', 'LOR', 'insurance carriers', 'legal representation', 'attorney notification'],
    triggers: ['letters of representation', 'LOR', 'send LOR', 'insurance carriers notification', 'legal representation letter', 'lor', 'what is lor', 'lor definition', 'define lor'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'file-claim-process',
    category: 'Claims Process',
    title: 'How to File a Claim',
    content: `## 📞 How to File a Claim

**How to file a claim?**

### Steps to File a Claim:

1. **Call the claims department** of the insurance carrier involved

2. **Find phone number:**
   - Dropbox/Filevine/Box
   - Google "[Insurance Carrier Name] Phone Number"

3. **Provide required information:**
   - Name of our client
   - Date of birth
   - Address
   - Date of Incident
   - Policy Number
   - Brief description of what happened
   - Description of injuries and treatment

### ⚠️ Important:
- **NEVER provide** our client's social security number
- Be general and use qualifying terms
- Be prepared to give the adjuster a little something about the injuries, so he can set his reserves

### Things to ask for when filing a claim:
- **Claim Number**
- **Adjuster's Information:**
  - Name
  - Direct phone number and/or extension number
  - Fax number
  - Mailing address
  - Email

### LOR to Auto Insurance Carriers:
- First, verify if there is already a claim filed. If none, you have to file a claim
- **Things to remember in filing a claim:**
  - Be as general as possible, especially on the description of the accident and treatment
  - NEVER provide the client's Social Security Number (SSN)
  - Once there is already a claim number, get the insurance adjuster's information in order to send LOR

This process ensures proper claim initiation while protecting client privacy.`,
    keywords: ['file claim', 'insurance claim', 'claims department', 'policy number', 'claim process'],
    triggers: ['how to file a claim', 'file claim', 'insurance claim process', 'claims department', 'how do you file a claim'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'preservation-letters',
    category: 'Evidence Preservation',
    title: 'Send Preservation Letters',
    content: `## 🔒 Send Preservation Letters

**What are preservation letters?**

Preservation letters are sent to ensure evidence is maintained and to request insurance information.

### Types of Preservation Letters:

#### 1. LOR to Premise Insurance Carriers
- Letter sent to ensure they maintain video footage related to the accident
- Request their insurance information

#### 2. Premise Preservation Letter
- **Important:** Send this letter immediately as premises often just save video surveillance footages within 30 days
- Sending this letter also preserves any incident reports available

#### 3. Trucking Preservation Letter
- For auto cases where a truck is involved in the accident
- Preservation letter is sent because most trucks do have dashcam

#### 4. Preservation Letter to Non-Party
- Mostly for hit and run cases
- Or for cases with dispute liability
- Sent to premises near the location of the collision

### Key Objectives:
- **Evidence Preservation** - Ensure all relevant evidence is maintained
- **Video Footage** - Preserve surveillance recordings
- **Incident Reports** - Maintain official documentation
- **Timely Action** - Act quickly before evidence is lost

### Critical Timeline:
- Send immediately upon case assignment
- Video surveillance often deleted after 30 days
- Act quickly to preserve evidence`,
    keywords: ['preservation letters', 'preservation letter','evidence preservation', 'video footage', 'surveillance', 'trucking preservation', 'premise preservation'],
    triggers: ['preservation letters', 'send preservation letter', 'evidence preservation', 'video footage preservation', 'trucking preservation'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'traffic-collision-report',
    category: 'Reports',
    title: 'Request Traffic Collision Report (TCR)',
    content: `## 🚔 Request Traffic Collision Report (TCR)

**What is a Traffic Collision Report (TCR)?**

TCR is a report of a car accident made by a police department or a highway patrol. It contains facts of the accidents and all parties' index, vehicle and auto insurance information, drivers' and witnesses' tale of events, and names out which party is at-fault and the law they violated.

### How to Request TCR:

#### Online Request (Preferred):
- Most TCR can be requested online via:
  - LexisNexis
  - TxDocs
  - CrashDocs
  - Other online platforms

#### Manual Request:
If TCR is not available online, contact the Police Department directly and ask how to request the report through mail.

### What you need to draft a Traffic Collision Report Request:
1. **Client/Defendant's Name and Car Information**
2. **Incident Date**
3. **Location of the incident**
4. **Report/Incident Number**
5. **Payment**

### How to send a Traffic Collision Report Request Manually:
1. **Identify and call** which policing entity made the report:
   - California Highway Patrol
   - Police Department
   - Sheriff's Department

2. **Ask the representative:**
   - Where to send the request
   - How much the request will be
   - To whom should the check be named to

3. **Draft traffic collision report request**

### Report Contents:
- Facts of the accident
- All parties' information
- Vehicle and auto insurance information
- Drivers' and witnesses' accounts
- Determination of fault
- Laws violated`,
    keywords: ['traffic collision report', 'TCR', 'police report', 'accident report', 'collision report'],
    triggers: ['traffic collision report', 'TCR', 'request TCR', 'police report', 'accident report', 'collision report'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'animal-control-report',
    category: 'Reports',
    title: 'Animal Control Request Report',
    content: `## 🐕 Animal Control Request Report

**What is an Animal Control Report?**

This is for animal attack cases. The Department of Animal Services investigates cases of reported animal abuse or neglect.

### Purpose:
- Request report to determine if the animal related to the case has ever made previous attacks
- Investigate animal's history and behavior
- Establish liability in animal attack cases

### How to Request:

#### Process:
1. **First, identify** where the accident happened
2. **Then, contact** the Dept. of Animal Services and ask how to get a copy of their report
3. **Lastly, download** and attach necessary forms in the request

#### Important Notes:
- The way of requesting this report varies depending upon the Jurisdiction
- If the animal owner resides in a different state where the accident happened, contact the Dept. of Animal Services in both Jurisdictions

### Report Information:
- Animal's history and behavior
- Previous incidents or attacks
- Owner information and liability
- Investigation findings

### Use Cases:
- Dog bite cases
- Animal attack incidents
- Liability determination
- Previous attack history`,
    keywords: ['animal control report', 'animal attack', 'dog bite', 'animal services', 'animal investigation'],
    triggers: ['animal control report', 'animal attack report', 'dog bite report', 'animal services report'],
    priority: 'medium',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'health-insurance-notice',
    category: 'Insurance Communication',
    title: 'Send Notice to Health Insurance',
    content: `## 🏥 Send Notice to Health Insurance

**What is a Health Insurance Notice?**

This is done to notify the health insurance company that the client is involved in an accident.

### Purpose:
- Notify health insurance company of accident involvement
- Obtain the amount of their lien
- Establish subrogation rights

### Process:
The process of sending a notice varies depending on the type of Health Insurance.

**First, identify which subrogation Department handles the lien**

### Types of Health Insurance:

#### a. Medicaid
- A joint federal and state program that helps cover medical costs for low-income adults, children, pregnant women, elderly adults and people with disabilities
- Notice can be sent online or through correspondence, depending on the State

#### b. Medicare
- A federal health insurance for people 65 years or older
- And for people under 65 years old:
  - With Social Security Disability Insurance (SSDI) for at least 2 years
  - Diagnosed with End-Stage Renal Disease (ESRD)

#### c. Medi-Cal
- If a private health insurance company did pay some medical bills (typically ER bills) relating to a client's injury, the health insurance company will automatically have a lien on the settlement

#### d. Private Health Insurance
- Private health insurance companies may have paid for medical care relating to the client's injuries primarily the ambulance, emergency room, primary care physician or the urgent care treatment
- If a private health insurance company did pay some medical bills (typically ER bills) relating to a client's injury, the health insurance company will automatically have a lien on the settlement

### Key Objectives:
- **Lien Identification** - Determine potential liens
- **Subrogation Rights** - Establish insurance company rights
- **Settlement Impact** - Understand lien impact on settlement`,
    keywords: ['health insurance notice', 'medicaid', 'medicare', 'medi-cal', 'private health insurance', 'subrogation'],
    triggers: ['health insurance notice', 'send notice to health insurance', 'medicaid notice', 'medicare notice', 'health insurance lien'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'lien-definition',
    category: 'Liens',
    title: 'What is a Lien',
    content: `## 💰 What is a Lien

**What is a lien?**

- **LIEN** refers to a legal claim or legal right which is made against the assets that are held as collaterals for satisfying a debt
- A medical lien is any demand for repayment for medical services that can be placed against the settlement money paid out in a personal injury case

### Health Insurance Company's Position:
The health insurance company's stance is that if someone else is at fault for your injuries and you receive compensation from that negligent party, they, as your health insurer, should be reimbursed for the portion of the medical expenses they covered originally.

### Impact:
- **Reduces settlement amount** available to client
- **Requires negotiation** with medical providers
- **Must be resolved** before final disbursement
- **Affects client recovery** significantly

### Liens Providers:
- Doctors specialized in personal injury
- Already affiliated with the firm

### Key Considerations:
- Liens must be identified early in case process
- Negotiation may be required to reduce lien amounts
- Liens affect final client recovery amount`,
    keywords: ['lien', 'medical lien', 'repayment', 'settlement', 'medical expenses', 'health insurance lien'],
    triggers: ['what is a lien', 'lien', 'medical lien', 'lien definition', 'define lien', 'health insurance lien'],
    priority: 'medium',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'subrogation-definition',
    category: 'Subrogation',
    title: 'What is Subrogation',
    content: `## 🔄 What is Subrogation

**What is subrogation?**

Subrogation is when the client's health insurance company seeks reimbursement for the payment they made on behalf of the client's medical expenses incurred by hospitals, doctors, and therapists.

### Process:
If our client got treatment through an Ambulance, in an emergency room, urgent care or through his primary care physician, the health insurance pays for the charges.

### Key Concepts:
- **Insurance Payment** - Health insurance pays for medical expenses
- **Reimbursement** - Insurance company seeks repayment from settlement
- **Medical Expenses** - Covers hospitals, doctors, and therapists
- **Treatment Types** - Ambulance, emergency room, urgent care, primary care

### Common Scenarios:
- **Emergency Room Treatment** - Insurance covers ER bills
- **Ambulance Services** - Transportation costs covered
- **Urgent Care** - Immediate medical attention
- **Primary Care** - Ongoing medical treatment

### Impact on Cases:
- **Lien Creation** - Insurance company creates lien against settlement
- **Settlement Reduction** - Lien amount reduces client's recovery
- **Negotiation Required** - May need to negotiate lien amounts
- **Final Disbursement** - Liens must be resolved before client payment

### Key Objectives:
- **Early Identification** - Identify potential liens early
- **Proper Notification** - Notify insurance companies promptly
- **Lien Management** - Handle liens throughout case process
- **Client Communication** - Explain lien impact to clients`,
    keywords: ['subrogation', 'health insurance reimbursement', 'medical expenses', 'insurance payment', 'lien creation'],
    triggers: ['what is subrogation', 'subrogation', 'health insurance reimbursement', 'insurance payment', 'medical expenses reimbursement'],
    priority: 'medium',
    lastUpdated: '2025-01-01'
  }
];

export function findIntakeAndInitialActionItemsKnowledge(userMessage: string): IntakeAndInitialActionItemsEntry | null {
  const message = userMessage.toLowerCase();
  
  for (const entry of intakeAndInitialActionItemsKnowledge) {
    for (const trigger of entry.triggers) {
      if (message.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
} 