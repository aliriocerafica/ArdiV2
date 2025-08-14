// Legal Treatment in Personal Injury Cases Knowledge
// Classification: Internal-Only

export interface LegalTreatmentEntry {
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

export const legalTreatmentKnowledge: LegalTreatmentEntry[] = [
  {
    id: 'treatment-importance',
    category: 'Treatment Overview',
    title: 'Why Treatment is Important',
    content: `## 🏥 Why Treatment is Important

**Why is treatment important in personal injury cases?**

The treatment stage in a personal injury case is vital for several reasons:

### Key Reasons:

- **Health and Recovery:** Prioritizes the injured individual's health and recovery, preventing further complications and facilitating a faster recovery process.

- **Documentation:** Generates crucial documentation of the injuries, establishing causation and quantifying damages sought in the claim.

- **Legal Strategy:** Informs legal strategy, aiding negotiation with the at-fault party's insurance company or preparation for trial if necessary.

### Key Point:
The most important thing an injury victim can do is to seek medical care as soon as possible after the injury occurs. Delaying medical treatment can give insurance claims adjusters a pretext to deny a claim or minimize the payout.

### Treatment Plan = Case Strategy:
Personal Injury Lawyers' goal is to get the maximum amount or the full policy limits of the defendant's insurance coverage. As case managers, we strategize to maximize the value of a case to reach that goal.`,
    keywords: ['treatment importance', 'medical care', 'health recovery', 'documentation', 'legal strategy', 'case strategy'],
    triggers: ['why treatment is important', 'treatment importance', 'why is treatment important', 'medical care importance', 'treatment strategy'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'case-strategy-building',
    category: 'Case Strategy',
    title: 'Building a Case Strategy',
    content: `## 🎯 Building a Case Strategy

**How do you build a case strategy?**

In a Personal Injury case, Case Managers (CMs) tailor their approach depending on the category the case falls under:

### Case Categories:

#### 1. Fast Turn Case
- **Quick Settlements:** Often occurring in cases where the client's injuries clearly exceed the insurance policy limits of the at-fault party.
- **Evidence:** Pictures alone can suffice.

#### 2. MIST Case (Minor Impact Soft Tissue)
- **Low-Speed Impacts:** Resulting in minor property damage but soft-tissue injuries.
- **Insurance Adjuster View:** Often seen as low value, which may be reflected in their settlement offer.

#### 3. A-Case
- **Significant Injuries:** Involving serious injuries such as brain or spinal cord injuries, leading to high medical bills.
- **High Damages:** Categorized as "high damages" cases, with policy limits typically being $100,000.00 or more.

### Key Principle:
You can classify a case and identify its category, using the E=MC² equation.

### Strategy Development:
- **Case Classification** - Determine case type using E=MC²
- **Treatment Planning** - Tailor treatment to case category
- **Value Maximization** - Strategize to reach full policy limits
- **Documentation** - Build strong case through proper documentation`,
    keywords: ['case strategy', 'fast turn case', 'mist case', 'a-case', 'case categories', 'building case strategy'],
    triggers: ['building case strategy', 'case strategy', 'how to build case strategy', 'case categories', 'fast turn case', 'mist case', 'a-case'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'emc2-equation',
    category: 'Case Analysis',
    title: 'E=MC² in Personal Injury Cases',
    content: `## ⚡ E=MC² in Personal Injury Cases

**What is E=MC² in personal injury cases?**

E=MC² represents key factors that determine case value and strategy:

### E=MC² Components:

#### 1. **1st Party**
Client's Uninsured Motorist (UM) or Underinsured Motorist (UIM) coverage.

#### 2. **3rd Party**
Defendant's Policy Limit.

#### 3. **PD (Property Damage)**
Severity of vehicle damage, categorized as:
- Minor
- Moderate
- Major
- Total loss

#### 4. **Injury**
Injuries sustained in the accident, categorized by:
- **Subjective Complaints:** Symptoms reported by the injured party
- **Objective Findings:** Medical conditions diagnosed by a doctor

#### 5. **Liability**
Negligence responsibility for the injury, categorized as:
- Clear
- Disputed
- Denied

### Application:
This equation helps classify cases and determine appropriate treatment strategies and settlement approaches.`,
    keywords: ['emc2', 'e=mc2', 'case analysis', '1st party', '3rd party', 'property damage', 'injury', 'liability'],
    triggers: ['emc2', 'e=mc2', 'case equation', 'case analysis formula', '1st party 3rd party', 'property damage injury liability'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'formula-simple',
    category: 'Formula',
    title: 'What is the Formula?',
    content: `## ⚡ What is the Formula?

**What is the formula?**

The formula is **E=MC²** - a simple way to analyze personal injury cases.

### The Formula Breakdown:

**E = MC²**

Where:
- **E** = Case Evaluation
- **M** = Medical (Injury severity)
- **C** = Coverage (Insurance limits)
- **²** = Squared (Impact multiplier)

### Simple Explanation:
This formula helps determine case value by looking at:
1. **Medical** - How bad are the injuries?
2. **Coverage** - How much insurance is available?
3. **Impact** - How much does this affect the case?

### Quick Reference:
- **High Medical + High Coverage = High Value Case**
- **Low Medical + Low Coverage = Quick Settlement**
- **High Medical + Low Coverage = Policy Limits Case

### Usage:
Use this formula to quickly assess case value and determine the best strategy for settlement or trial.`,
    keywords: ['formula', 'what is the formula', 'emc2', 'case formula', 'simple formula', 'emc squared'],
    triggers: ['what is the formula', 'formula', 'the formula', 'what formula', 'case formula', 'simple formula', 'emc formula', 'EMC²', 'EMC2', 'what is EMC²', 'what is EMC2', 'EMC² definition', 'EMC2 definition', 'define EMC²', 'define EMC2', 'emc squared', 'what is emc squared'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'what-is-emc',
    category: 'Formula',
    title: 'What is EMC?',
    content: `## ⚡ What is EMC?

**What is EMC?**

**EMC** refers to the **E=MC²** formula used in personal injury case analysis.

### EMC Breakdown:

**E = MC²**

Where:
- **E** = Case Evaluation
- **M** = Medical (Injury severity)
- **C** = Coverage (Insurance limits)
- **²** = Squared (Impact multiplier)

### What EMC Means:
**EMC** is a shorthand way to refer to the **E=MC²** formula that helps analyze personal injury cases by evaluating:
- **Medical** conditions and injury severity
- **Coverage** limits and insurance availability
- **Impact** of these factors on case value

### Usage:
When someone asks "What is EMC?" they're asking about the **E=MC²** formula used to evaluate personal injury cases.`,
    keywords: ['emc', 'what is emc', 'emc formula', 'case analysis'],
    triggers: ['what is emc', 'emc', 'what is emc?', 'emc meaning', 'define emc', 'emc definition'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'emc-squared',
    category: 'Formula',
    title: 'What is EMC Squared?',
    content: `## ⚡ What is EMC Squared?

**What is EMC squared?**

**EMC squared** refers to **E=MC²** - the formula used in personal injury case analysis.

### EMC² Breakdown:

**E = MC²**

Where:
- **E** = Case Evaluation
- **M** = Medical (Injury severity)
- **C** = Coverage (Insurance limits)
- **²** = Squared (Impact multiplier)

### What the Squared Means:
The **²** (squared) in E=MC² represents the **impact multiplier** - how much these factors amplify the case value.

### EMC² Components:
1. **E** - Case Evaluation (overall assessment)
2. **M** - Medical (injury severity and treatment)
3. **C** - Coverage (insurance limits available)
4. **²** - Squared (impact multiplier effect)

### Why Squared?
The squared (²) indicates that the combination of Medical and Coverage factors has an exponential impact on case value, not just a simple addition.

### Usage:
"EMC squared" is another way to refer to the **E=MC²** formula used for personal injury case analysis.`,
    keywords: ['emc squared', 'emc2', 'what is emc squared', 'squared formula', 'impact multiplier'],
    triggers: ['what is emc squared', 'emc squared', 'emc2', 'what is emc squared?', 'emc squared meaning', 'define emc squared'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'compensatory-damages',
    category: 'Damages',
    title: 'Types of Compensatory Damages',
    content: `## 💰 Types of Compensatory Damages

**What are compensatory damages?**

### Special / Economic Damages:
1. **Medical Treatment/Expenses** - All medical costs related to the injury
2. **Lost Income** - Wages lost due to inability to work
3. **Property Loss/Damage** - Damage to personal property

### General / Non-Economic Damages:
1. **Pain and Suffering** - Physical and emotional pain endured
2. **Emotional Distress** - Psychological impact of the injury
3. **Loss of Enjoyment** - Inability to enjoy life activities
4. **Loss of Consortium** - Impact on relationships and family life

### Key Distinctions:
- **Economic Damages** - Tangible, calculable losses
- **Non-Economic Damages** - Subjective, quality-of-life impacts
- **Documentation** - Economic damages require detailed documentation
- **Calculation** - Non-economic damages often calculated using multipliers

### Importance:
Understanding these damage types helps in building comprehensive settlement demands and case strategies.`,
    keywords: ['compensatory damages', 'economic damages', 'non-economic damages', 'pain and suffering', 'medical expenses', 'lost income'],
    triggers: ['compensatory damages', 'types of damages', 'economic damages', 'non-economic damages', 'pain and suffering', 'medical expenses'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'emc2-examples',
    category: 'Case Examples',
    title: 'E=MC² Examples',
    content: `## 📋 E=MC² Examples

**How do you apply E=MC² to real cases?**

### 1. Fast Turn Case Example:
- **1st Party:** $30,000.00 / $60,000.00
- **3rd Party:** $50,000.00 / $100,000.00
- **PD:** Total wrecked
- **Injury:** Fatal
- **Liability:** Clear (rear-end collision)
- **Summary:** Low policy limits. Fatality is clearly worth more than the limit of the defendant's insurance policy. Quick settlement.

### 2. MIST Case Example:
- **1st Party:** $15,000.00 / $30,000.00
- **3rd Party:** $10,000.00 / $20,000.00
- **PD:** Minor (no visible damage)
- **Injury:** Neck & back pain
- **Liability:** Clear
- **Summary:** Minor property damage. Minor/Soft Tissue Injury. Low Policy Limits.

### 3. A-Case Example:
- **1st Party:** N/A
- **3rd Party:** $5,000,000.00 or more
- **PD:** N/A
- **Injury:** Fractured ankle & dislocated wrist
- **Liability:** Clear (visible wet floor)
- **Summary:** Major injury that can result in surgical treatment, High policy limits, and clear liability

### Key Insights:
- **Fast Turn:** Quick settlement due to clear liability and limited coverage
- **MIST:** Lower value due to minor damage and soft tissue injuries
- **A-Case:** High value due to serious injuries and substantial coverage`,
    keywords: ['emc2 examples', 'fast turn case example', 'mist case example', 'a-case example', 'case examples'],
    triggers: ['emc2 examples', 'case examples', 'fast turn example', 'mist example', 'a-case example'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'fast-turn-treatment',
    category: 'Treatment Process',
    title: 'Fast Turn Case Treatment',
    content: `## ⚡ Fast Turn Case Treatment

**How do you treat Fast Turn cases?**

### Fast Turn Case Treatment:

**No treatment from lien providers needed**, the case can be settled just based on the facts and photos. The plaintiff will only treat with non-lien providers.

### Key Characteristics:
- **Quick Settlement** - Based on facts and photos alone
- **Non-Lien Providers** - Only treatment with non-lien providers
- **Limited Treatment** - Minimal medical intervention required
- **Documentation Focus** - Emphasize documentation over treatment

### Important Reminder:
Hospital or Emergency Rooms may have a separate billing for emergency surgery treatment called **TRAUMA** or **SURGERY BILL**.

### Treatment Strategy:
- **Immediate Documentation** - Photos and medical records
- **Non-Lien Care** - Emergency room, urgent care, primary care
- **Quick Resolution** - Settle before extensive treatment needed
- **Cost Efficiency** - Minimize treatment costs

### Case Management Focus:
- **Rapid Processing** - Expedite case through system
- **Documentation** - Ensure all facts and photos are preserved
- **Settlement Preparation** - Prepare for quick settlement
- **Client Communication** - Keep client informed of quick timeline`,
    keywords: ['fast turn treatment', 'fast turn case', 'quick settlement', 'non-lien providers', 'trauma bill', 'surgery bill'],
    triggers: ['fast turn treatment', 'fast turn case treatment', 'quick settlement treatment', 'non-lien providers'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'mist-case-treatment',
    category: 'Treatment Process',
    title: 'MIST Case Treatment',
    content: `## 🔄 MIST Case Treatment Flowchart

**How do you treat MIST cases?**

### MIST Case Treatment Flow:

#### 1. **First Treatment after accident**
- Emergency Room/Urgent Care/PCP

#### 2. **Specialist Evaluation**
- Orthopedic or Pain Management (1st appointment)
- Assessment results in two parallel paths:

#### 3. **Therapy Path**
- Chiropractic or Physical Therapy (8 or more sessions)

#### 4. **Imaging Path**
- Initial X-rays

#### 5. **Follow-up (2nd Appointment)**
- Review of progress
- Review of initial imaging
- Recommendations for continued treatment

#### 6. **Additional Treatment**
- More Physical Therapy or Chiropractic sessions
- Advanced imaging (X-ray/MRI/CT Scan)

#### 7. **Final Evaluation (3rd Appointment)**
- Review of all treatment and imaging
- Procedure recommendations if needed

### Initial Treatment:
Ideally, the first treatment would be provided by **non-lien providers**, such as:
- Ambulance services
- Emergency room/hospital visit
- Urgent care
- Visiting their primary care physician (PCP)

These initial providers offer immediate medical attention and assessment of injuries sustained from the personal injury accident.

### Treatment Progression:
- **First Lien Provider Appointment:** Orthopedic doctor or pain management specialist
- **Second Lien Provider Appointment:** Chiropractic treatment or physical therapy
- **Imaging:** X-rays, CT scans, or MRI scans as recommended
- **Follow-up Evaluation:** Review progress and recommend continued treatment

### Key Objectives:
- **Immediate Care** - Non-lien providers for initial treatment
- **Specialist Evaluation** - Orthopedic or pain management assessment
- **Therapy Integration** - Chiropractic or physical therapy sessions
- **Imaging Studies** - Diagnostic imaging to evaluate injuries
- **Progress Monitoring** - Regular follow-up evaluations`,
    keywords: ['mist case treatment', 'mist treatment flowchart', 'orthopedic evaluation', 'physical therapy', 'chiropractic', 'imaging studies'],
    triggers: ['mist case treatment', 'mist treatment', 'mist treatment flowchart', 'orthopedic evaluation', 'physical therapy treatment'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'a-case-treatment',
    category: 'Treatment Process',
    title: 'A-Case Treatment',
    content: `## 🏥 A-Case Treatment Flowchart

**How do you treat A-Cases?**

### A-Case Treatment Flow:

#### 1. **Emergency Room**
- Initial treatment and stabilization

#### 2. **Specialist Care Pathway**
- Orthopedic or Pain Management specialist
- Series of appointments (1st through 6th)
- Each appointment evaluates progress and adjusts treatment plan

#### 3. **Concurrent Therapy**
- Extensive Physical Therapy or Chiropractic care
- Multiple session blocks (8 or more sessions per block)

#### 4. **Progressive Imaging**
- Initial: X-rays
- Secondary: MRI/CT Scans
- Advanced: Discogram and specialized imaging

#### 5. **Pain Management Interventions**
- Series of injections as needed

#### 6. **Specialist Consultation**
- Neurosurgeon/Orthopedic Surgeon evaluation

#### 7. **Surgical Path** (if necessary)
- Surgical consultation
- Possible multiple surgeries (1st Surgery → 2nd Surgery)

### Treatment in A-Cases:

A-Cases refer to cases where the injuries sustained by the client are more severe and require extensive medical treatment. The treatment process involves several stages and coordination with various healthcare providers.

### Step-by-Step Breakdown:

#### 1. **Initial Medical Evaluation**
- **Emergency Room (ER) Visit:** Immediately after the accident for initial evaluation and treatment
- **Primary Care Physician (PCP) Visit:** Follow-up for comprehensive evaluation and ongoing treatment needs

#### 2. **Specialist Referrals**
- **Orthopedic Specialist:** For bone fractures, joint injuries, or musculoskeletal issues
- **Neurologist:** For head injuries, concussions, or nerve damage
- **Pain Management:** Medications and treatments for pain and inflammation

#### 3. **Diagnostic Testing**
- **Imaging Studies:** X-rays, MRIs, or CT scans to diagnose injury extent

#### 4. **Ongoing Medical Treatment**
- **Surgical Interventions:** Fracture repair, joint reconstruction, or spinal surgery
- **Chiropractic Care:** Spinal adjustments and manual therapies
- **Physical Therapy:** Continued sessions to improve strength and mobility

#### 5. **Follow-Up Appointments**
- **Regular Check-Ups:** Monitor progress and adjust treatment plans
- **Specialist Consultations:** Address complications or new symptoms

### Key Characteristics:
- **Extensive Treatment** - Multiple specialists and therapies
- **Surgical Options** - May require surgical intervention
- **Long-term Care** - Extended treatment timeline
- **High Value** - Significant damages and policy limits`,
    keywords: ['a-case treatment', 'a-case treatment flowchart', 'surgical intervention', 'extensive treatment', 'specialist care', 'multiple surgeries'],
    triggers: ['a-case treatment', 'a-case treatment flowchart', 'surgical treatment', 'extensive medical treatment', 'specialist care pathway'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  }
];

export function findLegalTreatmentKnowledge(userMessage: string): LegalTreatmentEntry | null {
  const message = userMessage.toLowerCase();
  
  for (const entry of legalTreatmentKnowledge) {
    for (const trigger of entry.triggers) {
      if (message.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
} 