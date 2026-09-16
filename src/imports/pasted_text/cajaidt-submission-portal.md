Continue designing the CAJAIDT academic journal website and now create the internal submission and editorial platform UX.

Project:
Central Asian Journal of Artificial Intelligence and Digital Transformation
Abbreviation: CAJAIDT

Important:
This is no longer only the public website. Now design the internal platform where authors submit manuscripts, editors manage submissions, and reviewers complete peer review.

Use the same visual identity from the existing CAJAIDT website:
- Deep navy, academic gold, white, and light gray palette
- Clean academic typography
- Professional cards and tables
- Same logo symbol
- Same button styles
- Same credible scholarly publishing feel

However, the internal platform should be more functional and dashboard-oriented. It must feel like a serious manuscript management system similar to OJS, ScholarOne, Editorial Manager, or professional academic submission portals, but cleaner and easier to use.

Do not make it look like a startup SaaS dashboard. It should look scholarly, structured, and trustworthy.

Create the following platform pages:

1. Login / Register Page
2. Author Dashboard
3. New Submission Flow
4. Submission Details Page
5. Editor Dashboard
6. Reviewer Dashboard
7. Review Form Page
8. Copyediting and Production Status Page

GENERAL PLATFORM UX REQUIREMENTS

- Clear role-based navigation: Author, Reviewer, Editor
- Clean dashboard layout
- Tables must be readable
- Status badges should be clear
- Important actions must be visible
- Avoid clutter
- Use clear progress indicators
- Use helpful empty states
- Use accessible font sizes
- Mobile responsive where possible, but optimize primarily for desktop/tablet
- Do not use fake real manuscript IDs that look final; use sample IDs like CAJAIDT-2027-001
- Do not claim real DOI, ISSN, indexing, or publication approval
- Use placeholder data clearly marked as sample

PAGE 1: LOGIN / REGISTER PAGE

Page title:
CAJAIDT Submission Portal

Subtitle:
Submit manuscripts, track editorial decisions, complete peer reviews, and manage journal workflows.

Layout:
Create a clean split-screen layout.

Left side:
- Journal symbol/logo
- Journal name:
  Central Asian Journal of Artificial Intelligence and Digital Transformation
- Short text:
  Online manuscript submission and editorial management system.
- Trust badges:
  Open Access
  Double-Blind Peer Review
  Ethics-Based Publishing
  DOI-ready Workflow

Right side:
Login card with:
- Email address
- Password
- Remember me
- Forgot password?
- Login button
- Create account link

Registration card or tab:
Fields:
- Full name
- Email address
- Password
- Confirm password
- Affiliation
- Country
- ORCID ID, optional
- Role selection:
  Author
  Reviewer
  Editor invitation code
- Create Account button

Add note:
Editor accounts are created or approved by the journal administrator.

PAGE 2: AUTHOR DASHBOARD

Page title:
Author Dashboard

Top dashboard greeting:
Welcome back, Author Name

Primary CTA:
Start New Submission

Dashboard summary cards:
- Active Submissions: 2
- Revisions Required: 1
- Accepted Manuscripts: 0
- Published Articles: 0

Main table:
My Submissions

Columns:
- Manuscript ID
- Title
- Article Type
- Submitted Date
- Current Status
- Last Updated
- Action

Sample rows:

CAJAIDT-2027-001
Responsible Artificial Intelligence for Digital Transformation in Emerging Economies
Research Article
Submitted: 12 Jan 2027
Status: Under Technical Check
Action: View Details

CAJAIDT-2027-002
Human-Centered AI and UX Analytics in Digital Learning Platforms
Review Article
Submitted: 20 Jan 2027
Status: Revision Required
Action: Submit Revision

CAJAIDT-2027-003
A Prototype Framework for AI-Enabled Research Data Management
Technical Note
Submitted: Draft
Status: Draft
Action: Continue Submission

Status badges:
- Draft
- Submitted
- Technical Check
- Editor Screening
- Under Review
- Revision Required
- Accepted
- Rejected
- In Production
- Published

Left sidebar navigation:
- Dashboard
- New Submission
- My Submissions
- Revisions
- Messages
- Profile
- Help

Right sidebar:
Author Resources
- Author Guidelines
- Manuscript Template
- Submission Checklist
- Publication Ethics
- AI Use Policy

PAGE 3: NEW SUBMISSION FLOW

Page title:
New Manuscript Submission

Important:
Design this as a multi-step wizard with progress indicator.

Progress steps:
1. Start
2. Manuscript Details
3. Upload Files
4. Authors & Affiliations
5. Metadata
6. Ethics & Declarations
7. Review & Submit

Step 1: Start

Fields:
- Select article type
Dropdown options:
  Original Research Article
  Review Article
  Systematic Literature Review
  Case Study
  Technical Note
  Short Communication
  Perspective / Policy Paper

- Select language
Dropdown options:
  English
  Uzbek
  Russian

Required confirmations:
Checkboxes:
- My manuscript fits the journal’s aims and scope.
- The manuscript is original and has not been published elsewhere.
- The manuscript is not under consideration by another journal.
- I have read the Author Guidelines.
- I understand that the manuscript will undergo editorial screening and double-blind peer review.

Buttons:
Save Draft
Continue

Step 2: Manuscript Details

Fields:
- Manuscript title
- Running title
- Abstract
- Keywords
- Subject area
- Suggested section editor, optional
- Cover letter text box

Note:
For Uzbek and Russian manuscripts, English title, English abstract, and English keywords are required.

Step 3: Upload Files

Create upload cards:
Required:
- Anonymized manuscript file
- Title page

Optional:
- Cover letter file
- Figures
- Tables
- Supplementary files
- Ethics approval document
- Dataset or code documentation

Each upload card should show:
- Accepted format
- Upload button
- Replace file
- Remove file
- File status

Step 4: Authors & Affiliations

Fields:
- Add author
- Full name
- Email
- ORCID ID
- Affiliation
- Department
- Country
- Author order
- Corresponding author checkbox

Add button:
Add Co-author

Note:
All authors must approve the submission and be responsible for the accuracy and integrity of the manuscript.

Step 5: Metadata

Fields:
- English title
- English abstract
- English keywords
- References box
- Funding information
- Data availability statement
- Subject classifications

Step 6: Ethics & Declarations

Create declaration cards with checkboxes/text fields:

Originality Declaration:
I confirm that this manuscript is original and does not contain plagiarized material.

Conflict of Interest:
Dropdown:
- No conflict of interest
- Conflict of interest declared
Text field if declared

Funding Statement:
Dropdown:
- No funding
- Funding declared
Text field if declared

Data Availability:
Dropdown:
- Data available upon reasonable request
- Data available in repository
- Data not publicly available
- Not applicable

AI Use Disclosure:
Dropdown:
- No AI tools were used beyond basic grammar/spelling correction
- AI tools were used and disclosed
Text field:
Tool name, purpose, and manuscript sections affected

Ethics Approval:
Dropdown:
- Not applicable
- Ethics approval obtained
- Ethics approval required but pending
Text field for approval details

Step 7: Review & Submit

Show summary:
- Article type
- Language
- Title
- Authors
- Files uploaded
- Metadata completed
- Declarations completed

Warnings:
- Missing required fields should be clearly shown.
- Submission can only be completed after all required items are checked.

Buttons:
Back
Save Draft
Submit Manuscript

After submit confirmation modal:
Your manuscript has been submitted successfully.
Manuscript ID: CAJAIDT-2027-XXX
The editorial office will conduct a technical check before editorial screening.

PAGE 4: SUBMISSION DETAILS PAGE

Page title:
Submission Details

Use sample:
Manuscript ID:
CAJAIDT-2027-001

Title:
Responsible Artificial Intelligence for Digital Transformation in Emerging Economies

Article Type:
Research Article

Language:
English

Status:
Under Technical Check

Layout:
Top status timeline:
Submitted → Technical Check → Editor Screening → Under Review → Decision → Copyediting → Production → Published

Main tabs:
- Overview
- Files
- Metadata
- Review
- Decisions
- Messages
- History

Overview tab:
Show:
- Manuscript title
- Authors
- Corresponding author
- Article type
- Language
- Submitted date
- Current status
- Last updated
- Assigned editor: To be assigned
- DOI: To be assigned

Files tab:
- Anonymized manuscript
- Title page
- Cover letter
- Supplementary files

Metadata tab:
- Abstract
- Keywords
- Subject area
- Funding
- Conflict of interest
- Data availability
- AI use disclosure

Review tab:
If under review:
Show message:
The manuscript is currently under editorial or peer review. Reviewer identities are confidential.

If revision required:
Show:
- Decision letter
- Reviewer comments
- Submit revision button
- Response to reviewers upload

Messages tab:
Conversation between author and editorial office.

History tab:
Chronological activity log:
- Submission created
- Files uploaded
- Technical check started
- Editor assigned
- Reviewers invited
- Decision sent

PAGE 5: EDITOR DASHBOARD

Page title:
Editor Dashboard

Role:
Editor / Section Editor

Dashboard summary cards:
- New Submissions: 8
- Awaiting Technical Check: 3
- Under Review: 12
- Revisions Pending: 5
- Accepted: 2
- Production Queue: 4

Main sections:

1. New Submissions Table
Columns:
- Manuscript ID
- Title
- Article Type
- Submitted Date
- Author Country
- Status
- Action

Actions:
- View
- Assign Section Editor
- Desk Reject
- Send to Review

2. Reviewer Assignment Panel
For selected manuscript:
- Search reviewer
- Suggested reviewers
- Reviewer expertise
- Conflict check
- Invite reviewer button
- Reviewer deadline

3. Editorial Decision Panel
Decision options:
- Accept
- Minor Revision
- Major Revision
- Reject and Resubmit
- Reject

Decision letter editor:
- Message to author
- Confidential editor note
- Attach reviewer comments

4. Editorial Workflow Board
Kanban columns:
- Technical Check
- Editor Screening
- Reviewer Invitation
- Under Review
- Revision
- Final Decision
- Copyediting
- Production
- Published

Left sidebar:
- Dashboard
- Submissions
- Reviewer Assignments
- Decisions
- Production Queue
- Issues
- Messages
- Editorial Board
- Reports

PAGE 6: REVIEWER DASHBOARD

Page title:
Reviewer Dashboard

Greeting:
Welcome, Reviewer Name

Summary cards:
- Pending Invitations: 2
- Active Reviews: 1
- Completed Reviews: 5
- Overdue Reviews: 0

Main table:
Review Assignments

Columns:
- Manuscript ID
- Title
- Article Type
- Invitation Date
- Review Due Date
- Status
- Action

Sample rows:
CAJAIDT-2027-004
Machine Learning-Based Decision Support Systems for Smart Public Services
Research Article
Invitation Date: 15 Jan 2027
Due Date: 5 Feb 2027
Status: Invitation Pending
Actions: Accept / Decline

CAJAIDT-2027-005
Digital Transformation Readiness in Higher Education Institutions
Case Study
Status: Review in Progress
Action: Continue Review

Reviewer resources:
- Reviewer Guidelines
- Peer Review Policy
- Conflict of Interest Policy
- AI Use Policy

PAGE 7: REVIEW FORM PAGE

Page title:
Peer Review Form

Manuscript:
CAJAIDT-2027-004
Machine Learning-Based Decision Support Systems for Smart Public Services

Important:
Show that this is double-blind review. Do not show author names.

Top info:
- Article type
- Abstract
- Keywords
- Review due date
- Download manuscript button
- Download supplementary files button

Review form sections:

Section 1: Conflict of Interest
Question:
Do you have any conflict of interest with this manuscript?
Options:
- No conflict of interest
- Potential conflict of interest
- I cannot review this manuscript

Section 2: Evaluation Criteria
Use rating scale:
Excellent / Good / Fair / Poor / Not applicable

Criteria:
- Relevance to journal scope
- Originality and contribution
- Literature review quality
- Methodological rigor
- Results validity
- Discussion quality
- Ethical compliance
- Reference quality
- Writing clarity
- Overall scholarly merit

Section 3: Comments to Authors
Large text box:
Provide constructive comments that can be shared with the authors.

Section 4: Confidential Comments to Editor
Large text box:
Provide confidential comments for the editor only.

Section 5: Recommendation
Dropdown:
- Accept
- Minor Revision
- Major Revision
- Reject and Resubmit
- Reject

Section 6: Upload Review File
Optional file upload.

Buttons:
Save Draft
Submit Review

Confirmation modal:
Your review has been submitted successfully. Thank you for contributing to the CAJAIDT peer-review process.

PAGE 8: COPYEDITING AND PRODUCTION STATUS PAGE

Page title:
Copyediting and Production

Purpose:
Show how accepted manuscripts move toward publication.

Use sample manuscript:
CAJAIDT-2027-002
Human-Centered AI and UX Analytics in Digital Learning Platforms

Status:
Accepted / In Copyediting

Workflow timeline:
Accepted → Copyediting → Author Proof Review → Layout Production → DOI Assignment → Issue Assignment → Published

Production checklist:
- Final manuscript received
- Copyediting completed
- Author proof sent
- Author corrections received
- Final PDF prepared
- HTML version prepared
- DOI metadata prepared
- License added
- Article page created
- Issue assigned
- Published online

Files section:
- Copyedited manuscript
- Author proof
- Final PDF
- HTML galley
- Supplementary files

Metadata section:
- Final title
- Authors
- Affiliations
- Abstract
- Keywords
- DOI placeholder
- Pages placeholder
- License placeholder

Editor actions:
- Send proof to author
- Mark copyediting complete
- Assign DOI
- Assign to issue
- Publish article

DESIGN REQUIREMENTS

- Internal dashboards should use a clean left sidebar plus main content layout.
- Keep the journal brand but make the UX efficient.
- Use tables, status badges, progress bars, step indicators, and clear action buttons.
- Make forms easy to complete.
- Avoid unnecessary decoration.
- Use professional academic terminology.
- Do not display fake real authors, real reviewer names, fake DOIs, fake ISSNs, or fake indexing claims.
- Use sample placeholders where needed.
- Make the platform feel compatible with future OJS/custom implementation.
- The Submit Manuscript flow must be especially polished and easy to understand.