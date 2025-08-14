// Insurance Domain Knowledge
export interface InsuranceKnowledgeEntry {
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

export const insuranceKnowledge: InsuranceKnowledgeEntry[] = [
  {
    id: 'insurance-overview',
    category: 'Overview',
    title: 'Insurance Overview',
    content: `## 🛡️ Insurance Overview

**What is insurance?**

Insurance is a financial protection mechanism that provides coverage against various risks and losses. In personal injury cases, understanding insurance is crucial for maximizing client recovery.

### Key Insurance Concepts:

**1. Claims** - Formal requests to insurance providers for reimbursement against losses
**2. Adjusters** - Professionals who investigate and evaluate claims
**3. Coverage** - The financial protection provided by insurance policies
**4. Policy Limits** - Maximum amounts insurance will pay for covered losses

### Types of Insurance in Personal Injury:

**Automobile Insurance** - Covers vehicle-related accidents and damages
**Health Insurance** - Covers medical expenses and treatment costs
**Umbrella Insurance** - Provides additional liability coverage beyond primary policies
**Property Insurance** - Covers premises liability and property damage
**Workers Compensation** - Covers workplace injuries and benefits

### Insurance Parties:

**1st Party** - The insurance carrier of the Plaintiff (your client)
**3rd Party** - The insurance carrier of the Defendant (at-fault party)

### Key Objectives:
- **Identify all potential insurance sources** for maximum recovery
- **Understand coverage limits** and policy terms
- **Navigate claims processes** effectively
- **Maximize client compensation** through comprehensive insurance analysis`,
    keywords: ['insurance', 'overview', 'insurance overview', 'insurance basics', 'insurance concepts', 'insurance types', 'insurance claims'],
    triggers: ['insurance', 'what is insurance', 'insurance overview', 'insurance basics', 'insurance concepts', 'insurance information', 'insurance guide', 'insurance help'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'insurance-terminology',
    category: 'Terminology',
    title: 'Insurance Terminologies',
    content: `## 🏛️ Key Insurance Terminologies

**What insurance terminologies should I know?**

### Essential Terms:

1. **Claim** - A formal request to the insurance provider for reimbursement against losses

2. **Adjuster** - A person who investigates claims

3. **1st Party** - The insurance carrier of the Plaintiff

4. **3rd Party** - The insurance carrier of the Defendant

5. **Dec Page** - The first page of the Insurance Policy Agreement summarizing essential coverage

6. **Coverage** - The financial protection provided to the insured

Understanding these terms is crucial for effective communication with insurance companies and case management.`,
    keywords: ['insurance', 'terminology', 'claim', 'adjuster', 'coverage', 'dec page', 'insurance terms', 'insurance terminology', 'insurance terminologies'],
    triggers: ['what insurance terminologies should I know', 'insurance terms', 'insurance terminology', 'insurance terminologies', 'insurance terms', 'what insurance terms', 'insurance terminology', 'insurance terms to know', 'insurance terminology guide', 'insurance terms guide', 'what are insurance terms', 'insurance terms definition', 'define insurance terms', 'insurance terminology', 'insurance terms', 'terminology', 'insurance terms guide'],
    priority: 'medium',
    lastUpdated: '2025-01-01',
    tableContent: `## 🏛️ Insurance Terminology Guide

| **Term** | **Definition** |
|----------|----------------|
| **Claim** | Formal request to insurance provider for reimbursement against losses |
| **Adjuster** | Person who investigates claims |
| **1st Party** | Insurance carrier of the Plaintiff |
| **3rd Party** | Insurance carrier of the Defendant |
| **Dec Page** | First page of Insurance Policy Agreement summarizing essential coverage |
| **Coverage** | Financial protection provided to the insured |
| **Purpose** | Effective communication with insurance companies and case management |
| **Importance** | Crucial for understanding insurance processes and maximizing recovery |`
  },
  {
    id: 'insurance-types',
    category: 'Types',
    title: 'Types of Insurance',
    content: `## 🛡️ Types of Insurance

**What are the types of insurance?**

### 1. Automobile Insurance
Protects against financial loss in accidents

### 2. Premise/Property Insurance
Covers liability outside the "products-completed operations hazard"

### 3. Health Insurance
Covers medical expenses risk

### 4. Umbrella Insurance
Provides additional liability coverage beyond primary policies

### 5. Product Liability Insurance
Protects manufacturers/distributors/retailers from claims of product-caused injury/damage

### 6. Worker's Compensation Insurance
Provides benefits to injured employees

Understanding these different types helps in identifying all potential sources of recovery for clients.`,
    keywords: ['types of insurance', 'automobile', 'health', 'umbrella', 'product liability', 'workers comp', 'insurance types', 'types insurance', 'insurance coverage types'],
    triggers: ['what are the types of insurance', 'types of insurance', 'insurance types', 'types insurance', 'insurance coverage types', 'what insurance types', 'insurance coverage', 'types of insurance coverage', 'insurance types list', 'what types of insurance', 'define insurance types', 'insurance types definition'],
    priority: 'medium',
    lastUpdated: '2025-01-01',
    tableContent: `## 🛡️ Types of Insurance Coverage

| **Insurance Type** | **Coverage** | **Purpose** |
|-------------------|--------------|-------------|
| **Automobile Insurance** | Financial loss in accidents | Protects against vehicle-related damages |
| **Premise/Property Insurance** | Liability outside "products-completed operations hazard" | Covers property-related incidents |
| **Health Insurance** | Medical expenses risk | Covers healthcare costs |
| **Umbrella Insurance** | Additional liability beyond primary policies | Extra protection layer |
| **Product Liability Insurance** | Product-caused injury/damage claims | Protects manufacturers/distributors/retailers |
| **Worker's Compensation Insurance** | Benefits for injured employees | Workplace injury coverage |
| **Goal** | Identify all potential recovery sources for clients | Maximize client compensation |
| **Strategy** | Comprehensive coverage analysis | Multiple insurance source identification |`
  },
  {
    id: 'insurance-claims-types',
    category: 'Claims',
    title: 'Types of Insurance Claims',
    content: `## 📋 Types of Insurance Claims

**What are the different types of insurance claims?**

### 1. Motor Vehicle Claims
- **Bodily Injury Claim** - Car insurance companies provide bodily injury liability car insurance to provide drivers with compensation for injuries they sustain in an accident. It's important to note that your liability insurance pays for the other driver's injuries when you are at fault.
- **Property Damage Claim** - Property damage liability insurance covers the cost of damages to someone else's property after an accident you cause. Most commonly, your property damage will pay out when you are at fault for an accident that causes damage to someone else's car.

### 2. Premises Liability Claims
Holds property owners and residents liable for accidents and injuries that occur on that property. The kinds of incidents that may result in premises liability claims can range from a slip and fall on a public sidewalk to an injury suffered on an amusement park ride.

### 3. Government Claims
If the case involves a county, city or other local governmental entity or employee, the claim should be filed directly with the local city or county's governing board.

### 4. Coverage Terminologies
- **Bodily Injury Liability/Policy Limits (PL)** - If you are responsible for a car accident, bodily injury liability coverage pays for the medical costs of the people who are injured (not including yourself).
- **Uninsured Motorist (UM)** - A coverage that helps you pay for damages caused by a driver who doesn't have car insurance.
- **Underinsured Motorist (UIM)** - A coverage that protects you if you're hit by a driver who doesn't have enough coverage to pay for the damages or injuries they caused.
- **Medical Payments (MedPay)** - An additional coverage option for auto insurance policies in most states. In the event of a car accident, this coverage can help pay for medical expenses for you or your passengers, even if you're at fault.
- **Collision** - A coverage that helps pay to repair or replace your vehicle if it's damaged or destroyed in an accident with another car, regardless of who is at fault.
- **Comprehensive** - Covers any damage to a car except for damage from a collision.`,
    tableContent: `## 📋 Insurance Claims Overview

| **Claim Type** | **Description** | **Coverage Details** |
|----------------|----------------|---------------------|
| **Motor Vehicle Claims** | Auto accident related claims | • Bodily Injury Claim\n• Property Damage Claim |
| **Premises Liability Claims** | Property-related accidents | • Slip and fall incidents\n• Property owner liability |
| **Government Claims** | Government entity claims | • County/city claims\n• Government employee claims |
| **Bodily Injury Liability** | Medical costs for injured parties | • Other driver's injuries when at fault\n• Not including yourself |
| **Property Damage Liability** | Damage to someone else's property | • Other person's car damage\n• When you are at fault |

### 🛡️ Coverage Terminologies:
| **Coverage Type** | **Purpose** |
|-------------------|-------------|
| **Uninsured Motorist (UM)** | Pay for damages from uninsured drivers |
| **Underinsured Motorist (UIM)** | Protection from underinsured drivers |
| **Medical Payments (MedPay)** | Medical expenses for you/passengers |
| **Collision** | Repair/replace vehicle after accident |
| **Comprehensive** | Damage except collision |

### 🎯 Key Focus:
**Identify all potential recovery sources** for clients through comprehensive claims analysis.`,
    keywords: ['insurance claims', 'motor vehicle claims', 'premises liability', 'government claims', 'coverage terminologies', 'claims types', 'insurance claim types', 'types of claims', 'um', 'uim', 'uninsured motorist', 'underinsured motorist'],
    triggers: ['types of insurance claims', 'insurance claims', 'motor vehicle claims', 'premises liability claims', 'government claims', 'coverage terminologies', 'claims types', 'insurance claim types', 'types of claims', 'what types of claims', 'insurance claims types', 'claims insurance', 'motor vehicle claims', 'premises liability claims', 'government claims', 'UM', 'UIM', 'what is UM', 'what is UIM', 'UM definition', 'UIM definition', 'define UM', 'define UIM', 'uninsured motorist', 'underinsured motorist'],
    priority: 'medium',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'property-damage-claims',
    category: 'Claims Process',
    title: 'Property Damage Claims Process',
    content: `## 🔧 Property Damage Claims Process

**How to start a property damage claim?**

### Steps to Start a Property Damage Claim:

1. **Notify the At-Fault Party's Auto Insurance** - Contact the auto insurance company of the at-fault party to initiate the property damage claim process.

2. **Provide Vehicle Location** - Inform the insurance company where the damaged vehicle is located, whether it's at a repair shop, tow yard, or our client's home.

3. **Limit Communication** - Advise the insurance company that they can only communicate with our client to schedule inspections or appraisals and discuss the property damage claim.

4. **Gather Documentation** - Obtain estimates for repairs, photos from inspections or appraisals, and any property damage checks provided.

### Things to Remember:

1. **Locate the Client's Vehicle** - Ensure the damaged vehicle is located and secure, as it may be accruing additional costs if stored in a tow yard.

2. **Prompt Action** - Initiate the claim process as soon as possible after the accident to avoid delays in getting the vehicle repaired or replaced.

3. **Follow-Up** - Stay informed about the progress of the claim and follow up with the insurance company as needed to expedite the process and address any concerns or issues.

4. **Claim Loss of Use if possible** - Don't forget to claim loss of use damages when applicable.`,
    tableContent: `## 🔧 Property Damage Claims Process

| **Step** | **Action** | **Key Details** |
|----------|------------|-----------------|
| **1. Notify Insurance** | Contact at-fault party's auto insurance | • Initiate claim process\n• Provide initial information |
| **2. Provide Vehicle Location** | Inform where damaged vehicle is located | • Repair shop\n• Tow yard\n• Client's home |
| **3. Limit Communication** | Advise insurance company restrictions | • Only communicate with client\n• Schedule inspections/appraisals\n• Discuss property damage claim |
| **4. Gather Documentation** | Obtain all necessary documents | • Repair estimates\n• Inspection photos\n• Property damage checks |

### ⚠️ Important Reminders:
| **Reminder** | **Action Required** |
|--------------|-------------------|
| **Locate Client's Vehicle** | Ensure vehicle is secure (avoid tow yard costs) |
| **Prompt Action** | Initiate claim immediately to avoid delays |
| **Follow-Up** | Stay informed and follow up with insurance |
| **Claim Loss of Use** | Don't forget to claim when applicable |

### 🎯 Process Goal:
**Efficient property damage claim resolution** with minimal delays and maximum recovery.`,
    keywords: ['property damage claim', 'claim process', 'vehicle damage', 'insurance claim', 'damage claim', 'property damage', 'damage claim process', 'vehicle damage claim'],
    triggers: ['how to start property damage claim', 'property damage claim process', 'start property damage claim', 'property damage claims', 'property damage claim', 'how to file property damage claim', 'property damage claim process', 'start property damage claim', 'property damage claim steps', 'vehicle damage claim', 'damage claim process'],
    priority: 'medium',
    lastUpdated: '2025-01-01'
  }
];

export function findInsuranceKnowledge(userMessage: string): InsuranceKnowledgeEntry | null {
  const message = userMessage.toLowerCase();
  
  for (const entry of insuranceKnowledge) {
    for (const trigger of entry.triggers) {
      if (message.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
} 