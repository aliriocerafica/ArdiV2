// Comprehensive Case Management Knowledge
// Classification: Internal-Only

export interface ComprehensiveKnowledgeEntry {
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

export const comprehensiveCaseManagementKnowledge: ComprehensiveKnowledgeEntry[] = [
  {
    id: 'life-of-personal-injury-case',
    category: 'Case Lifecycle',
    title: 'Life of a Personal Injury Case',
    content: `## 🔄 Life of a Personal Injury Case

**What is the life of a personal injury case?**

Refers to the process and stages a personal injury lawsuit goes through from the initial incident until a resolution, either through settlement or trial.

### Case Stages:

1. **Intake** - Gather client information, evaluate case details, and determine if the firm will take the case
2. **Treatment & NAI's** - Ensure the client receives necessary medical care and complete initial case tasks (e.g., sending letters, filing claims)
3. **Demand Drafting** - Prepare a formal letter outlining the client's damages and desired compensation from the at-fault party's insurance
4. **Settlement Negotiation** - Engage in discussions with the insurance company to reach a fair settlement agreement
5. **Settlement Confirmation** - Formalize the agreed-upon settlement terms in a legally binding document
6. **Lien Negotiation** - Negotiate with healthcare providers and lienholders to resolve outstanding medical bills using the settlement funds
7. **Case Closure/Disbursement** - Distribute the remaining settlement funds to the client and officially close the case

Each stage requires careful coordination and documentation for optimal case outcomes.`,
    keywords: ['life of personal injury case', 'case lifecycle', 'case stages', 'personal injury process', 'case resolution', 'settlement trial'],
    triggers: ['life of personal injury case', 'personal injury case life', 'case lifecycle', 'case stages', 'personal injury process', 'case resolution', 'what is the life of a personal injury case', 'case life cycle', 'personal injury case stages'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'insurance-definition',
    category: 'Insurance Basics',
    title: 'Definition of Insurance',
    content: `## 🛡️ Definition of Insurance

**What is insurance?**

A practice or arrangement by which a company or government agency provides a guarantee of compensation for specified loss, damage, illness, or death in return for payment of a premium.

### Key Concepts:
- **Guarantee of Compensation** - Insurance provides financial protection
- **Specified Losses** - Covers specific types of losses or damages
- **Premium Payment** - Policyholders pay premiums for coverage
- **Risk Transfer** - Transfers financial risk from individual to insurance company

### Purpose:
Insurance serves as a financial safety net, protecting individuals and businesses from unexpected losses and providing peace of mind.`,
    keywords: ['insurance definition', 'what is insurance', 'insurance basics', 'insurance concept', 'insurance purpose'],
    triggers: ['what is insurance', 'insurance definition', 'define insurance', 'insurance basics', 'insurance concept', 'insurance purpose'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'insurance-terminologies',
    category: 'Insurance Terms',
    title: 'Insurance Terminologies',
    content: `## 🏛️ Insurance Terminologies

**What are insurance terminologies?**

Refers to the specific terms and jargon used in the insurance industry to describe various aspects of policies, coverage, claims, and processes. Understanding these terms can help individuals navigate insurance policies and procedures more effectively.

### Essential Insurance Terms:

1. **Claim** - A formal request to the insurance provider for reimbursement against losses covered under the insurance policy.

2. **Adjuster** - A person who investigates an insurance claim to determine if the insurer should pay for damage or injuries, and if so, how much they should pay.

3. **1st Party** - The insurance carrier of the Plaintiff (Client).

4. **3rd Party** - The insurance carrier of the Defendant.

5. **Dec Page** - The first page of the Insurance Policy Agreement that summarizes the information essential to your insurance coverage.

6. **Coverage** - The sum that provides financial protection to the insured, or their family in case of adversities, such as death, accident, illness or disability.

### Importance:
Understanding these terms is crucial for effective communication with insurance companies and case management.`,
    keywords: ['insurance terminologies', 'insurance terms', 'claim', 'adjuster', '1st party', '3rd party', 'dec page', 'coverage', 'insurance jargon'],
    triggers: ['insurance terminologies', 'insurance terms', 'what are insurance terms', 'insurance terminology', 'insurance jargon', 'insurance terms definition', 'define insurance terms'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'types-of-insurance',
    category: 'Insurance Types',
    title: 'Types of Insurance',
    content: `## 🛡️ Types of Insurance

**What are the types of insurance?**

### 1. Automobile Insurance
Protects people against financial loss if they are involved in an accident and pay any losses as defined in the policy.

### 2. Premise or Property Insurance
Composed of those exposures to loss that fall outside the defined "products-completed operations hazard," it includes liability for injury or damage arising out of the insured's premises or out of the insured's business operations while such operations are in progress.

### 3. Health Insurance
Covers the whole or a part of the risk of a person incurring medical expenses, spreading the risk over many persons.

### 4. Umbrella Insurance
This type of insurance provides additional liability coverage beyond the limits of your primary insurance policies (such as auto or home insurance). It acts as a safety net, protecting you from large claims or lawsuits that exceed your primary coverage.

### 5. Product Liability Insurance
Product liability insurance is a type of insurance that protects manufacturers, distributors, and retailers from claims of injury or damage caused by their products. This insurance can cover legal fees, medical expenses, and settlements or judgments awarded to the injured party.

### 6. Worker's Compensation Insurance
This is a type of insurance that employers are required to carry in most states. It provides benefits to employees who are injured or become ill due to their job. These benefits can include medical expenses, lost wages, and disability payments.

### Purpose:
Understanding these different types helps in identifying all potential sources of recovery for clients.`,
    keywords: ['types of insurance', 'automobile insurance', 'property insurance', 'health insurance', 'umbrella insurance', 'product liability insurance', 'workers compensation insurance'],
    triggers: ['types of insurance', 'what are the types of insurance', 'insurance types', 'different types of insurance', 'kinds of insurance', 'insurance categories'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'types-of-insurance-claims',
    category: 'Insurance Claims',
    title: 'Types of Insurance Claims',
    content: `## 📋 Types of Insurance Claims

**What are the different types of insurance claims?**

### 1. Motor Vehicle Claims
- **Bodily Injury Claim** - Car insurance companies provide bodily injury liability car insurance in order to provide drivers with compensation for injuries they sustain in an accident. It's important to note that your liability insurance pays for the other driver's injuries when you are at fault.
- **Property Damage Claim** - Property damage liability insurance covers the cost of damages to someone else's property after an accident you cause. Most commonly, your property damage will pay out when you are at fault for an accident that causes damage to someone else's car.

### 2. Premises Liability Claims
Holds property owners and residents liable for accidents and injuries that occur on that property. The kinds of incidents that may result in premises liability claims can range from a slip and fall on a public sidewalk to an injury suffered on an amusement park ride.

### 3. Government Claims
If the case involves a county, city or other local governmental entity or employee, the claim should be filed directly with the local city or county's governing board.

### Coverage Terminologies:

1. **Bodily Injury Liability/Policy Limits (PL)** - If you are responsible for a car accident, bodily injury liability coverage pays for the medical costs of the people who are injured (not including yourself).

2. **Uninsured Motorist (UM)** - A coverage that helps you pay for damages caused by a driver who doesn't have car insurance.

3. **Underinsured Motorist (UIM)** - A coverage that protects you if you're hit by a driver who doesn't have enough coverage to pay for the damages or injuries they caused.

4. **Medical Payments (MedPay)** - An additional coverage option for auto insurance policies in most states. In the event of a car accident, this coverage can help pay for medical expenses for you or your passengers, even if you're at fault.

5. **Collision** - A coverage that helps pay to repair or replace your vehicle if it's damaged or destroyed in an accident with another car, regardless of who is at fault.

6. **Comprehensive** - Covers any damage to a car except for damage from a collision.

### Key Focus:
Identify all potential recovery sources for clients through comprehensive claims analysis.`,
    keywords: ['types of insurance claims', 'motor vehicle claims', 'premises liability claims', 'government claims', 'bodily injury claim', 'property damage claim', 'coverage terminologies'],
    triggers: ['types of insurance claims', 'insurance claims', 'motor vehicle claims', 'premises liability claims', 'government claims', 'what types of claims', 'different types of claims'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'property-damage-claim-steps',
    category: 'Claims Process',
    title: 'Steps to Start a Property Damage Claim',
    content: `## 🔧 Steps to Start a Property Damage Claim

**How to start a property damage claim?**

### Steps to Start a Property Damage Claim:

1. **Notify the At-Fault Party's Auto Insurance** - Contact the auto insurance company of the at-fault party to initiate the property damage claim process.

2. **Provide Vehicle Location** - Inform the insurance company where the damaged vehicle is located, whether it's at a repair shop, tow yard, or our client's home.

3. **Limit Communication** - Advise the insurance company that they can only communicate with our client to schedule inspections or appraisals and discuss the property damage claim.

4. **Gather Documentation** - Obtain estimates for repairs, photos from inspections or appraisals, and any property damage checks provided.

### Things to Remember When Starting Property Damage Claim:

1. **Locate the Client's Vehicle** - Ensure the damaged vehicle is located and secure, as it may be accruing additional costs if stored in a tow yard.

2. **Prompt Action** - Initiate the claim process as soon as possible after the accident to avoid delays in getting the vehicle repaired or replaced.

3. **Follow-Up** - Stay informed about the progress of the claim and follow up with the insurance company as needed to expedite the process and address any concerns or issues.

4. **Claim Loss of Use if possible** - Don't forget to claim loss of use damages when applicable.

### Process Goal:
Efficient property damage claim resolution with minimal delays and maximum recovery.`,
    keywords: ['property damage claim', 'how to start property damage claim', 'property damage claim steps', 'vehicle damage claim', 'claim process'],
    triggers: ['how to start property damage claim', 'property damage claim steps', 'property damage claim process', 'start property damage claim', 'vehicle damage claim'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'case-stages-detailed',
    category: 'Case Process',
    title: 'Detailed Case Management Stages',
    content: `## 📋 Detailed Case Management Stages

### 1. Intake
Gather client information, evaluate case details, and determine if the firm will take the case.

### 2. Treatment & NAI's
Ensure the client receives necessary medical care and complete initial case tasks (e.g., sending letters, filing claims).

### 3. Demand Drafting
Prepare a formal letter outlining the client's damages and desired compensation from the at-fault party's insurance.

### 4. Settlement Negotiation
Engage in discussions with the insurance company to reach a fair settlement agreement.

### 5. Settlement Confirmation
Formalize the agreed-upon settlement terms in a legally binding document.

### 6. Lien Negotiation
Negotiate with healthcare providers and lienholders to resolve outstanding medical bills using the settlement funds.

### 7. Case Closure/Disbursement
Distribute the remaining settlement funds to the client and officially close the case.

### Key Objectives:
- **Client Care** - Ensure optimal medical treatment and recovery
- **Case Development** - Build strong foundation for successful resolution
- **Documentation** - Establish comprehensive case file
- **Communication** - Maintain clear client and provider communication`,
    keywords: ['case stages', 'intake', 'treatment nai', 'demand drafting', 'settlement negotiation', 'settlement confirmation', 'lien negotiation', 'case closure'],
    triggers: ['case stages', 'detailed case stages', 'case management stages', 'case process stages', 'intake treatment demand settlement lien closure'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'case-manager-role',
    category: 'Role Definition',
    title: 'What Case Managers Do',
    content: `## 👥 What Case Managers Do

**What do Case Managers do?**

### Case Manager Responsibilities:

1. **Case Managers (CMs)** facilitate client's care by assessing their needs, evaluating treatment options, creating treatment plans, coordinating care to improve client's well-being.

2. **Attorneys rely on CMs** to execute agreed upon strategies.

3. **CMs help attorneys' clients** get fully compensated and recover from injuries sustained from an accident by guiding the clients through all the details and processes related to their cases.

### Key Functions:
- **Client Care Facilitation** - Assess needs, evaluate treatment, create plans, coordinate care
- **Attorney Support** - Execute agreed upon strategies
- **Client Guidance** - Guide through all case details and processes
- **Case Coordination** - Coordinate with all parties involved
- **Treatment Planning** - Plan and monitor treatment options
- **Recovery Optimization** - Maximize compensation and recovery

### Core Mission:
**Help clients get fully compensated and recover from injuries** by providing expert guidance through all case processes and details.`,
    keywords: ['case manager', 'what case managers do', 'case manager role', 'case manager responsibilities', 'cm role'],
    triggers: ['what do case managers do', 'case manager role', 'case manager responsibilities', 'what case managers do', 'cm role', 'case manager job'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  }
];

export function findComprehensiveCaseManagementKnowledge(userMessage: string): ComprehensiveKnowledgeEntry | null {
  const message = userMessage.toLowerCase();
  
  for (const entry of comprehensiveCaseManagementKnowledge) {
    for (const trigger of entry.triggers) {
      if (message.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
} 