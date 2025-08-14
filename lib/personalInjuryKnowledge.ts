// Personal Injury Domain Knowledge
export interface PersonalInjuryKnowledgeEntry {
  id: string;
  category: string;
  title: string;
  content: string;
  tableContent?: string; // New field for table format
  keywords: string[];
  triggers: string[];
  priority: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

export const personalInjuryKnowledge: PersonalInjuryKnowledgeEntry[] = [
  {
    id: 'pi-law-definition',
    category: 'Legal Fundamentals',
    title: 'What is Personal Injury Law',
    content: `## ⚖️ Personal Injury Law

**What is personal injury law?**

Personal injury is an area of law that protects individuals from injury that results from another person or party's negligence, malpractice, or any act of wrong doing. When an accident happens, victims don't immediately settle with the liable party. They look for an attorney to help them get better compensation for injuries, both mental and physical.

### Key Concepts:
- **Protection for injured individuals** from negligent parties
- **Compensation for injuries** - both mental and physical
- **Legal representation** to maximize recovery
- **Negligence-based claims** against responsible parties`,
    tableContent: `## 📊 Personal Injury Law Overview

| **Aspect** | **Description** |
|:-----------|:---------------|
| **Definition** | Area of law protecting individuals from injury due to negligence, malpractice, or wrongdoing |
| **Purpose** | Provide compensation for injuries (mental and physical) |
| **Process** | Victims seek legal representation instead of immediate settlement |
| **Key Focus** | Maximizing recovery through proper legal channels |
| **Basis** | Negligence-based claims against responsible parties |

### 🎯 Key Benefits:
- ✅ **Protection** for injured individuals
- ✅ **Compensation** for all types of injuries  
- ✅ **Legal expertise** to maximize recovery
- ✅ **Structured process** for fair resolution`,
    keywords: ['personal injury', 'law', 'negligence', 'compensation', 'accident', 'pi', 'personal injury law', 'injury law'],
    triggers: ['what is personal injury law', 'personal injury law', 'what is personal injury', 'personal injury', 'injury law', 'pi law', 'what is pi', 'personal injury definition', 'injury definition', 'define personal injury', 'personal injury meaning'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'pi-process',
    category: 'Legal Process',
    title: 'Personal Injury Process',
    content: `## 📋 Personal Injury Process

**What is the personal injury process?**

The personal injury process involves these key steps:

### 1. Initial Contact
Victim seeks help from a Personal Injury Lawyer

### 2. Legal Representation
Lawyer evaluates and accepts the case

### 3. Case Processing
Either pre-litigation (attempting to settle) or litigation (proceeding with formal lawsuit)

### 4. Ardent Support
Provides specialized paralegal assistance

### 5. External Interactions
Dealing with government entities, insurance companies, and medical providers

This structured approach ensures comprehensive case handling from initial contact through resolution.`,
    tableContent: `## 📋 Personal Injury Process Flow

| **Step** | **Description** | **Key Actions** |
|:---------|:---------------|:---------------|
| **1. Initial Contact** | Victim seeks legal help | • Contact personal injury lawyer\n• Initial case evaluation |
| **2. Legal Representation** | Lawyer accepts case | • Case assessment\n• Client agreement signing |
| **3. Case Processing** | Pre-litigation or litigation | • Settlement attempts (pre-litigation)\n• Formal lawsuit filing (litigation) |
| **4. Ardent Support** | Specialized assistance | • Paralegal support\n• Case management |
| **5. External Interactions** | Stakeholder coordination | • Government entities\n• Insurance companies\n• Medical providers |

### 🔄 Process Flow:
Initial Contact → Legal Representation → Case Processing → Ardent Support → External Interactions → Resolution`,
    keywords: ['process', 'steps', 'litigation', 'settlement', 'paralegal', 'personal injury process', 'pi process', 'injury process', 'case process'],
    triggers: ['what is the personal injury process', 'personal injury process', 'how does personal injury work', 'pi process', 'injury process', 'case process', 'personal injury steps', 'pi steps', 'injury steps', 'how personal injury works', 'personal injury workflow'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'negligence-elements',
    category: 'Legal Elements',
    title: 'Elements of Negligence',
    content: `## ⚖️ Elements of Negligence

**What are elements of negligence?**

The elements of **NEGLIGENCE** in a Personal Injury Case are:

### A) Duty of Care
The defendant had a legal responsibility to prevent foreseeable harm

### B) Breach of Duty
The defendant failed to uphold their duty of care

### C) Causation
The defendant's breach directly caused the plaintiff's injuries

### D) Damages
The actual harm suffered by the injured person as a direct result of the defendant's negligence

All four elements must be proven to establish negligence in a personal injury case.`,
    tableContent: `## ⚖️ Elements of Negligence

| **Element** | **Definition** | **Key Requirement** |
|-------------|----------------|-------------------|
| **A) Duty of Care** | Legal responsibility to prevent foreseeable harm | Defendant must have owed a duty to the plaintiff |
| **B) Breach of Duty** | Failure to uphold duty of care | Defendant's actions fell below the standard of care |
| **C) Causation** | Direct cause of injuries | Defendant's breach directly caused the injuries |
| **D) Damages** | Actual harm suffered | Plaintiff must have suffered actual damages |

### ✅ All Four Elements Must Be Proven:
1. **Duty** - Defendant owed a legal duty
2. **Breach** - Defendant violated that duty  
3. **Causation** - Breach caused the injury
4. **Damages** - Plaintiff suffered actual harm

### 🎯 Legal Standard:
**All four elements must be established** to prove negligence in a personal injury case.`,
    keywords: ['negligence', 'duty', 'breach', 'causation', 'damages', 'elements', 'negligence elements', 'elements of negligence', 'duty of care', 'breach of duty'],
    triggers: ['what are elements of negligence', 'elements of negligence', 'negligence elements', 'negligence', 'duty of care', 'breach of duty', 'causation', 'damages', 'what is negligence', 'negligence definition', 'elements negligence', 'negligence elements', 'duty breach causation damages', 'define negligence', 'negligence meaning'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'statute-limitations',
    category: 'Legal Deadlines',
    title: 'Statute of Limitations',
    content: `## ⏰ Statute of Limitations

**What is statute of limitations?**

A **Statute of Limitations (SOL)** is a law that sets the maximum amount of time parties in a dispute have to initiate legal proceedings. The length of time allowed varies depending upon the type of Personal Injury Case.

### Examples:
- **California and Texas**: Most motor vehicle accidents have a **2-year statute of limitations**
- **Other jurisdictions**: May have different timeframes depending on case type

### Importance:
- **Critical deadline** that cannot be missed
- **Case dismissal** if filed after SOL expires
- **Varies by state** and case type
- **Must be tracked** carefully for each case`,
    tableContent: `## ⏰ Statute of Limitations by Case Type

| **Type of Personal Injury Case** | **California** | **Texas** |
|:----------------------------------|:---------------|:----------|
| **Motor Vehicle Accident** | 2 years | 2 Years |
| **Pedestrian Accident** | 2 years | 2 Years |
| **Government Cases** | 6 months + 6 months from acknowledgement letter | 45 Days (Austin City), 90 Days (Houston City), 6 months + 6 months from acknowledgement letter |
| **Slip & Fall or Premise Liability** | 2 Years | 2 Years |
| **Animal Attacks** | 2 Years | 2 Years |
| **Wrongful Death** | 2 Years | 2 Years |
| **Food Poisoning** | 2 Years | 2 Years |
| **Medical Malpractice** | 1 Year | 1 Year |
| **Product Liability** | 2 Years | 2 Years |
| **Assault** | 2 Years | 2 Years |
| **UM & UIM (Uninsured/Underinsured Motorist)** | 2 Years | 4 Years |
| **Maritime Claims** | 3 Years | 3 Years |
| **Asbestos & Silica Claims** | 1 year upon discovery | 2 Years after death |
| **Sexual Assault** | 5 Years | 5 Years |
| **Minors** | 2-year period starts when they turn 18 | 2-year period starts when they turn 18 |

**Note:** The length of time allowed varies depending upon the type of Personal Injury Case.`,
    keywords: ['statute of limitations', 'deadline', 'time limit', 'filing deadline', 'sol', 'statute limitations', 'time limit', 'deadline', 'filing deadline', 'limitations'],
    triggers: ['what is statute of limitations', 'statute of limitations', 'time limit for filing', 'sol', 'statute limitations', 'limitations', 'time limit', 'deadline', 'filing deadline', 'what is sol', 'statute of limitations definition', 'time limits', 'filing deadlines', 'statute limitations', 'limitations statute', 'define statute of limitations', 'statute of limitations meaning', 'SOL', 'what is SOL', 'SOL definition', 'define SOL'],
    priority: 'high',
    lastUpdated: '2025-01-01'
  }
];

export function findPersonalInjuryKnowledge(userMessage: string): PersonalInjuryKnowledgeEntry | null {
  const message = userMessage.toLowerCase();
  
  for (const entry of personalInjuryKnowledge) {
    for (const trigger of entry.triggers) {
      if (message.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }
  
  return null;
} 