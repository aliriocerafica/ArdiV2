export interface HRKnowledgeEntry {
  id: string;
  title: string;
  category: string; // e.g., Employment, Movement, Recruitment FAQ, General HR FAQ
  content: string;
  tableContent?: string;
  keywords: string[];
  triggers: string[];
  priority?: 'low' | 'medium' | 'high';
  lastUpdated?: string;
}

export const hrKnowledge: HRKnowledgeEntry[] = [
  {
    id: 'employment-status-types',
    title: 'Employment Status Types',
    category: 'Employment',
    content: `### Employment Status Types (Internal Only)

#### a) Regular or Permanent Employment
This status is given to an employee who has satisfactorily passed the probationary period of six (6) months. Managers, by virtue of their positions, may be hired as regular or permanent employees.

#### b) Probationary Employment
This status is given to newly hired employees. The standard probationary period is six (6) months. Probationary employees may be terminated at any time for valid reasons as stipulated in the employment contract and in accordance with the Labor Code.

#### c) Temporary, Fixed-term, or Contractual Employment
Given to those hired for occasional or seasonal work covering a limited period of time, or those employed as a replacement for regular employees who are on leave, or for specific projects with a definite or indefinite term.

#### d) Project Employment
Any of the above employees (regular, permanent, probationary, temporary, fixed-term, or contractual) who are hired for specific projects or accounts. Even if they become regular employees, their status as project employees is coterminous with their corresponding projects.

#### e) Confidential Employment
This status is given to an employee who, by the nature of their position or occupation, has access to confidential information that is typically not available to other employees (e.g., trade secrets, financial data, strategic plans, or employee records). They are expected to maintain a high level of confidentiality and discretion.
`,
    tableContent: `## HR: Employment Status Types

| Type | Description |
|------|-------------|
| Regular/Permanent | Granted after a 6-month probation; managers may be hired directly as regular |
| Probationary | Standard 6 months; may be terminated for valid reasons per contract and Labor Code |
| Temporary/Fixed-term/Contractual | For seasonal/occasional work, replacements, or specific projects |
| Project Employment | Tied to specific projects; status is coterminous with project duration |
| Confidential Employment | Access to sensitive company information; requires strict discretion |
`,
    keywords: ['hr', 'employment status', 'probationary', 'regular', 'confidential', 'project', 'contract'],
    triggers: [
      'employment status', 'types of employment', 'probationary period', 'regular employee',
      'confidential employee', 'project employment', 'contractual employment', 'what is employment status',
      'employment status definition', 'define employment status'
    ],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'personnel-movement',
    title: 'Personnel Movement',
    category: 'Movement',
    content: `### Personnel Movement

The Company places employees where they can contribute most effectively. Movements include:

#### a) Promotion
Movement to a higher position or level; based on efficiency, education, experience, and seniority.

#### b) Transfer
Movement from one job to another within or outside the department without change in level and salary.

#### c) Suspension
Temporary cessation of employment due to disciplinary action per Company Code of Conduct and Discipline.

#### d) Separation
Permanent cessation of employment; may be due to resignation, permanent/total disability (with physician certification), unsatisfactory performance during probation, retirement, death, or termination for cause.

#### e) Resignation
Requires at least thirty (30) working days' prior notice to allow time to find a replacement.
`,
    tableContent: `## HR: Personnel Movement

| Movement | Summary |
|----------|---------|
| Promotion | Higher role based on merit (efficiency, education, experience, seniority) |
| Transfer | Lateral move, no change in level or salary |
| Suspension | Temporary cessation as disciplinary action |
| Separation | Permanent cessation (resignation, disability, probation failure, retirement, death, termination for cause) |
| Resignation | 30 working days prior notice required |
`,
    keywords: ['hr', 'promotion', 'transfer', 'suspension', 'separation', 'resignation', 'movement'],
    triggers: ['personnel movement', 'promotion policy', 'transfer policy', 'resignation notice', 'separation policy', 'what is personnel movement', 'personnel movement definition', 'define personnel movement'],
    priority: 'medium',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'recruitment-faq',
    title: 'Recruitment FAQ',
    category: 'Recruitment',
    content: `### Recruitment FAQ

1) Status of referral: 2–3 weeks deliberation (initial interview, final interview, client interview optional).
2) How to refer: Use the referral Google Form.
3) Openings: Posted on social media, hiring platforms, and Slack announcements.
`,
    tableContent: `## HR: Recruitment FAQ

| Question | Answer |
|----------|--------|
| Status of my referral | 2–3 weeks (initial, final, client interview optional) |
| How to refer | Submit via referral Google Form |
| How to know openings | Posted on social media, hiring platforms, and Slack |
`,
    keywords: ['hr', 'recruitment', 'referral', 'opening', 'hiring'],
    triggers: ['recruitment faq', 'referral status', 'how to refer', 'job openings'],
    priority: 'low',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'general-hr-faq',
    title: 'General HR FAQ',
    category: 'General',
    content: `### General HR FAQ

1) Office hours: 8 hours/day, 1 hour unpaid meal break, two short breaks not exceeding 30 minutes, 5-day week.
2) Leave request: Submit via HRIS, 3 working days in advance; emergencies inform TL and HR ASAP.
3) Leave entitlement: Paid leaves accrued monthly (vacation and sick). Check current office order.
4) Probationary period: 6 months with evaluation before regularization.
5) Cutoff and payout: Bi-monthly; cutoffs on 15th and 30th, payouts on 5th and 20th.
6) Late/absent: Notify TL via approved channels; documentation may be required.
7) Multiple lates/absences: Attendance Policy applies; may affect WFH or trigger discipline.
8) WFH eligibility: Usually at 3rd month; based on performance, attendance, behavior; see policy.
9) Concerns/complaints: Use Feedback & Complaints Form or contact HR; handled confidentially.
10) Disciplinary grounds: Tardiness, poor performance, misconduct, policy violations; progressive discipline per Handbook.
11) Equipment requests: Email HR admin with justification; subject to approval.
12) COE request: Email ardent.hr@ardentparalegal.com or use HR Request Form; 3–5 business days.
13) Regular employee benefits: SSS, PhilHealth, Pag-IBIG, paid leaves, HMO, bonuses, training.
14) Promotions/transfers: Based on performance, qualifications, openings; internal applications allowed.
15) Company activities & recognition: Watch internal announcements for programs and events.
16) HMO timing: Usually 3rd or 4th month.
17) HMO coverage: Outpatient/inpatient, emergency, diagnostics/therapeutics, APE, dental, group life; certain exclusions; coverage up to Php 90,000.
18) HMO beneficiaries: Not covered currently.
19) ICARE core values: Integrity, Compassion, Accountability, Reliability, Ethical.
`,
    tableContent: `## HR: Quick Reference

| Topic | Summary |
|------|---------|
| Office Hours | 8 hrs/day, 1 hr meal break, 2 short breaks, 5 days/week |
| Leave Filing | HRIS; 3 days prior (planned), ASAP for emergencies |
| Leave Entitlement | Paid VL/SL accrued monthly; see office order |
| Probationary | 6 months; evaluation before regularization |
| Payroll | Cutoffs 15th/30th; payouts 5th/20th |
| Tardiness/Absences | Notify TL; Attendance Policy applies |
| WFH | Usually at 3rd month; performance/attendance/behavior based |
| Complaints | Feedback & Complaints Form or contact HR |
| Disciplinary | Progressive discipline; see Handbook |
| Equipment | Email HR admin; subject to approval |
| COE | Email ardent.hr@ardentparalegal.com; 3–5 business days |
| Benefits | SSS, PhilHealth, Pag-IBIG, paid leaves, HMO, bonuses, training |
| Promotions/Transfers | Performance + qualifications + openings |
| Activities | Internal announcements; monthly recognition, wellness, activities |
| HMO Timing | 3rd/4th month |
| HMO Coverage | Medical/dental, diagnostics, APE, group life; exclusions; up to Php 90,000 |
| HMO Beneficiaries | Not covered |
| ICARE | Integrity, Compassion, Accountability, Reliability, Ethical |
`,
    keywords: ['hr', 'faq', 'office hours', 'leave', 'probationary', 'payroll', 'wfh', 'hmo', 'coe', 'benefits', 'discipline', 'icare'],
    triggers: [
      'general hr faq', 'office hours', 'file a leave', 'how many leaves', 'probationary period', 'payroll cutoff', 'payday', 'late or absent',
      'wfh eligibility', 'raise a concern', 'disciplinary action', 'request equipment', 'request coe', 'employee benefits', 'promotion process',
      'company activities', 'when hmo', 'hmo coverage', 'hmo beneficiaries', 'what is icare', 'can i get hmo', 'get hmo', 'hmo eligibility',
      'when can i get hmo', 'hmo benefits', 'health insurance', 'medical insurance', 'hmo info', 'health insurance info', 'medical insurance info', 'hmo benefits info', 'hmo coverage info',
      'health insurance info', 'medical insurance info', 'hmo details', 'health insurance details', 'medical insurance details',
      'hmo information', 'health insurance information', 'medical insurance information', 'hmo benefits details',
      'hmo coverage details', 'health insurance details', 'medical insurance details', 'hmo information details',
      'hmo benefits information', 'hmo coverage information', 'health insurance information', 'medical insurance information'
    ],
    priority: 'high',
    lastUpdated: '2025-01-01'
  },
  {
    id: 'hmo-details',
    title: 'HMO Benefits and Coverage',
    category: 'Benefits',
    content: `### HMO Benefits and Coverage

#### When can I get HMO?
You can get your HMO upon the 3rd or 4th month of employment.

#### What is the coverage of our HMO?
Our HMO coverage includes:
- Outpatient and inpatient care
- Emergency services
- Diagnostic and therapeutic procedures
- Annual check-ups
- Dental care
- Group life insurance
- Coverage up to Php 90,000

#### Specific treatments covered:
- Eye laser therapy
- Chemotherapy
- Physical therapy

#### Exclusions:
- Cosmetic procedures
- Maternity beyond prenatal/postnatal care
- Weight loss treatments
- Treatment for epidemic diseases

#### Does the HMO cover beneficiaries?
No, the current HMO coverage does not include beneficiaries.
`,
    tableContent: `## HR: HMO Benefits Summary

| Aspect | Details |
|--------|---------|
| Eligibility | 3rd or 4th month of employment |
| Coverage Limit | Up to Php 90,000 |
| Medical Services | Outpatient/inpatient, emergency, diagnostics, APE, dental |
| Life Insurance | Group life insurance included |
| Specific Treatments | Eye laser therapy, chemotherapy, physical therapy |
| Exclusions | Cosmetic procedures, maternity beyond prenatal/postnatal, weight loss, epidemic diseases |
| Beneficiaries | Not covered currently |
`,
    keywords: ['hr', 'hmo', 'health insurance', 'medical benefits', 'coverage', 'beneficiaries', 'health insurance', 'medical insurance', 'hmo benefits', 'hmo coverage', 'hmo eligibility'],
    triggers: [
      'hmo', 'health insurance', 'medical insurance', 'can i get hmo', 'get hmo', 'hmo eligibility',
      'when can i get hmo', 'hmo coverage', 'hmo benefits', 'medical benefits', 'health benefits',
      'hmo info', 'health insurance info', 'medical insurance info', 'hmo benefits info', 'hmo coverage info',
      'health insurance info', 'medical insurance info', 'hmo details', 'health insurance details', 'medical insurance details',
      'hmo information', 'health insurance information', 'medical insurance information', 'hmo benefits details',
      'hmo coverage details', 'health insurance details', 'medical insurance details', 'hmo information details',
      'hmo benefits information', 'hmo coverage information', 'health insurance information', 'medical insurance information'
    ],
    priority: 'high',
    lastUpdated: '2025-01-01'
  }
];

export function findHRKnowledge(userMessage: string): HRKnowledgeEntry | null {
  const message = userMessage.toLowerCase();

  for (const entry of hrKnowledge) {
    for (const trigger of entry.triggers) {
      if (message.includes(trigger.toLowerCase())) {
        return entry;
      }
    }
  }

  return null;
}

