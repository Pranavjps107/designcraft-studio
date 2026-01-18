# CRM Modules - Quick Field Reference

## 📋 Complete Field Mapping

### 1️⃣ LEADS MODULE

#### Create Form Fields (11 Sections)

**Section 1: Lead Identity**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Lead Image | Image | ❌ | Optional upload |
| Lead Owner | User Lookup | ✅ | Sales agent/owner |
| First Name | Text | ❌ | Optional |
| Last Name | Text | ✅ | Mandatory |
| Company | Text | ✅ | Mandatory |
| Title | Text | ❌ | Job title |

**Section 2: Communication Details**
| Field | Type | Required |
|-------|------|----------|
| Phone | Phone | ❌ |
| Mobile | Phone | ❌ |
| Email | Email | ❌ |

**Section 3: Lead Source**
| Field | Type | Options |
|-------|------|---------|
| Lead Source | Picklist | Social Media, WhatsApp, Facebook, Instagram, Advertisement, Cold Call, Referral, Offline Store, Manual Upload, Sales Email Alias, Live Chat, Online Store |
| Lead Sub-Source | Picklist | (Optional, based on parent source) |

**Section 4: Lead Status**
| Field | Type | Options |
|-------|------|---------|
| Lead Status | Picklist | Attempted to Contact, Contact in Future, Contacted, Not Contacted, Pre-Qualified, Qualified, Not Qualified, Junk Lead, Lost Lead |

**Section 5: Lead Ranking** (Business Outcome)
| Field | Type | Options |
|-------|------|---------|
| Ranking | Picklist | Acquired, Active, Market Failed, Project Cancelled, Shut Down |

**Section 6: Lead Tone/Behaviour**
| Field | Type | Options |
|-------|------|---------|
| Tone | Picklist | Cool, Eager, Interested, Anger |

**Section 7: Lead Signals** (AI-Ready)
| Field | Type | Notes |
|-------|------|-------|
| Message Frequency | Numeric | Count of messages |
| Buying Intent Keywords | Multi-select/Text | Keywords detected |
| Response Latency | Time | Mins/hours |
| Lead Signal Score | Calculated | Auto +/- |

**Section 8: Lead Score**
| Field | Type | Notes |
|-------|------|-------|
| Lead Score | Number | Auto-calculated, 0-100 |

**Section 9: Company & Business Info**
| Field | Type | Required |
|-------|------|----------|
| Industry | Picklist | ❌ |
| Annual Revenue | Currency | ❌ |
| No. of Employees | Number | ❌ |
| Rating | Picklist | ❌ |

**Section 10: Address Information**
| Field | Type | Required |
|-------|------|----------|
| Country/Region | Picklist | ❌ |
| Flat/House/Building | Text | ❌ |
| Street Address | Text | ❌ |
| City | Text | ❌ |
| State/Province | Picklist | ❌ |
| Zip/Postal Code | Text | ❌ |

**Section 11: Description**
| Field | Type | Required |
|-------|------|----------|
| Description | Long Text | ❌ |

#### List View Columns
✅ Checkbox
✅ Lead Name (First + Last)
✅ Company
✅ Phone
✅ Email
✅ Lead Source
✅ Lead Status
✅ Lead Score
✅ Lead Owner
✅ Created Time

#### Filters
**System Filters:**
- Touched Records
- Untouched Records
- Record Action
- Related Records Action
- Locked

**Field Filters:**
- Lead Source
- Lead Status
- Ranking
- Lead Score (slider)
- Industry
- City/Country
- Created Time
- Owner

#### Related Tabs (Ready to implement)
- Activities (Tasks/Calls/Meetings)
- Emails
- Campaigns
- Notes
- Attachments
- Social
- Timeline

---

### 2️⃣ CONTACTS MODULE

#### Create Form Fields (6 Sections)

**Section 1: Contact Identity**
| Field | Type | Required |
|-------|------|----------|
| Contact Image | Image | ❌ |
| Contact Owner | User | ✅ |
| First Name | Text | ✅ |
| Last Name | Text | ✅ |
| Account Name | Lookup (Account) | ❌ |
| Vendor Name | Lookup | ❌ |

**Section 2: Communication**
| Field | Type | Required |
|-------|------|----------|
| Email | Email | ✅ |
| Secondary Email | Email | ❌ |
| Phone | Phone | ✅ |
| Other Phone | Phone | ❌ |
| Mobile | Phone | ❌ |
| Assistant | Text | ❌ |

**Section 3: Professional Details**
| Field | Type | Required |
|-------|------|----------|
| Title | Text | ❌ |
| Department | Text | ❌ |
| Lead Source | Picklist | ❌ |
| Reporting To | Lookup (Contact) | ❌ |

**Section 4: Personal Info**
| Field | Type | Required |
|-------|------|----------|
| Date of Birth | Date | ❌ |

**Section 5: Address Information**

**Mailing Address:**
| Field | Type | Required |
|-------|------|----------|
| Country/Region | Picklist | ❌ |
| Flat/House/Building | Text | ❌ |
| Street | Text | ❌ |
| City | Text | ❌ |
| State/Province | Picklist | ❌ |
| Zip | Text | ❌ |
| Latitude | Number | ❌ |
| Longitude | Number | ❌ |

**Other Address:** (Same fields as Mailing)

**Section 6: Description**
| Field | Type | Required |
|-------|------|----------|
| Description | Long Text | ❌ |

#### List View Columns
✅ Checkbox
✅ Contact Name
✅ Account Name
✅ Email
✅ Phone
✅ Department
✅ Location
✅ Owner
✅ Created Time

#### Filters
**System Filters:**
- Touched/Untouched
- Locked
- Activities
- Campaigns
- Cadences
- Email Status

**Field Filters:**
- Account Name
- City/Country
- Created Time
- Department
- Lead Source

#### Related Tabs (Ready to implement)
- Deals
- Activities
- Emails
- Campaigns
- Quotes
- Sales Orders
- Invoices
- Notes
- Attachments

---

### 3️⃣ DEALS (POTENTIALS) MODULE

#### Deal Stages (Pipeline)
| Stage | Probability | Color |
|-------|-------------|-------|
| Qualification | 10% | Slate |
| Needs Analysis | 20% | Blue |
| Value Proposition | 40% | Indigo |
| Identify Decision Makers | 60% | Purple |
| Proposal/Price Quote | 70% | Pink |
| Negotiation/Review | 80% | Orange |
| Closed Won | 100% | Green |
| Closed Lost | 0% | Red |
| Closed Lost to Competition | 0% | Red |

#### Create Form Fields (3 Sections)

**Section 1: Deal Information**
| Field | Type | Required |
|-------|------|----------|
| Deal Owner | User | ✅ |
| Deal Name | Text | ✅ |
| Account Name | Lookup | ✅ |
| Contact Name | Lookup | ❌ |
| Type | Picklist | ❌ |
| Lead Source | Picklist | ❌ |
| Campaign Source | Lookup | ❌ |
| Next Step | Text | ❌ |

**Section 2: Revenue & Forecast**
| Field | Type | Required | Auto-Calculated |
|-------|------|----------|-----------------|
| Amount | Currency | ✅ | ❌ |
| Closing Date | Date | ✅ | ❌ |
| Stage | Picklist | ✅ | ❌ |
| Probability (%) | Number | ✅ | ✅ (from stage) |
| Expected Revenue | Currency | ❌ | ✅ (Amount × Probability) |

**Section 3: Description**
| Field | Type | Required |
|-------|------|----------|
| Description | Long Text | ❌ |

#### Deal Logic
🔹 **Deal progress = Task completion**
- Stage change triggered by task completion
- Next Step = next task subject
- Probability auto-updates by stage

#### List View Columns
✅ Checkbox
✅ Deal Name
✅ Account
✅ Amount
✅ Closing Date
✅ Stage
✅ Probability
✅ Owner
✅ Next Step

#### View Types
- **List View** - Traditional table
- **Stage View (Kanban)** - Visual pipeline
- **Forecast View** - (Can be added) Revenue forecast

#### Filters
**System Filters:**
- Touched/Untouched Records
- Record Action
- Related Records Action
- Locked
- Latest Email Status
- Activities
- Cadences

**Field Filters:**
- Account Name
- Stage
- Amount (slider)
- Closing Date range

#### Related Tabs (Ready to implement)
- Tasks
- Calls
- Meetings
- Products
- Quotes
- Emails
- Notes
- Attachments
- Stage History

---

### 4️⃣ TASKS MODULE

#### Task Ownership Roles
- Sales Agent
- Support
- Finance
- Refund
- Operations
- Custom Teams

#### Create Form Fields (2 Sections)

**Section 1: Task Information**
| Field | Type | Required |
|-------|------|----------|
| Task Owner | User | ✅ |
| Subject | Text | ✅ |
| Due Date | Date | ✅ |

**Relation Fields:**
| Field | Type | Link To |
|-------|------|---------|
| Lead | Lookup | Leads |
| Contact | Lookup | Contacts |
| Account | Lookup | Accounts |
| Deal | Lookup | Deals |

**Status:**
| Field | Type | Options |
|-------|------|---------|
| Status | Picklist | Not Started, In Progress, Completed, Waiting for Input, Deferred |

**Priority:**
| Field | Type | Options | Color |
|-------|------|---------|-------|
| Priority | Picklist | Highest, High, Normal, Low, Lowest | Red, Orange, Blue, Gray, Light Gray |

**Reminder & Repeat:**
| Field | Type | Required |
|-------|------|----------|
| Reminder | Toggle | ❌ |
| Repeat | Toggle | ❌ |

**Section 2: Description Information**
| Field | Type | Required |
|-------|------|----------|
| Description | Long Text | ❌ |

#### Task Views
- **List View** - Table format
- **Status Board View** - Kanban by status
- **Overdue View** - Overdue tasks only
- **My Tasks** - Current user's tasks
- **Next 7 Days** - Upcoming this week

#### Filters
**System Filters:**
- Touched/Untouched Records
- Record Action
- Related Records Action
- Locked

**Field Filters:**
- Status
- Priority
- Closed Time
- Contact Name
- Created By
- Created Time
- Due Date

---

### 5️⃣ DOCUMENTS MODULE

#### Document Types
| Type | Icon | Color | Extensions |
|------|------|-------|------------|
| Folders | 📁 | Blue | - |
| Documents | 📄 | Indigo | DOC, DOCX |
| Spreadsheets | 📊 | Green | XLS, XLSX |
| Presentations | 📽️ | Orange | PPT, PPTX |
| PDFs | 📕 | Red | PDF |
| Images | 🖼️ | Purple | JPG, PNG, GIF |
| Audio | 🎵 | Pink | MP3, WAV |
| Videos | 🎬 | Cyan | MP4, AVI |
| Links | 🔗 | Teal | URL |

#### Document Fields
| Field | Type | Required | System |
|-------|------|----------|--------|
| Document Name | Text | ✅ | ❌ |
| Owner | User | ✅ | ❌ |
| Folder | Folder | ❌ | ❌ |
| File Type | System | ✅ | ✅ |
| Version | System | ❌ | ✅ |
| Status | Picklist | ✅ | ❌ |
| Modified Time | DateTime | ✅ | ✅ |
| Description | Text | ❌ | ❌ |

**Status Options:**
- Draft
- Approved
- Processing
- Ready

#### Folder Structure
- Sales Materials
- Documentation
- Support
- Legal
- Reports
- Marketing
- Templates

#### Document Actions
- Upload
- Download
- Share
- Lock/Unlock
- Version History
- Attach to (Leads/Deals/Contacts)

#### Filters
**File Type Filter:**
- All
- Folders
- Documents
- Spreadsheets
- Presentations
- PDFs
- Images
- Audio
- Videos
- Links

**Other Filters:**
- Owner
- Modified Date
- Folder
- Shared With Me
- Status

---

## 🎨 Color Coding Guide

### Status Colors
| Status | Background | Text |
|--------|------------|------|
| Qualified | `bg-green-100` | `text-green-700` |
| Pre-Qualified | `bg-blue-100` | `text-blue-700` |
| Contacted | `bg-purple-100` | `text-purple-700` |
| Not Contacted | `bg-gray-100` | `text-gray-700` |
| Lost Lead | `bg-red-100` | `text-red-700` |
| Junk Lead | `bg-orange-100` | `text-orange-700` |

### Priority Colors
| Priority | Background | Text | Border |
|----------|------------|------|--------|
| Highest | `bg-red-100` | `text-red-700` | `border-red-300` |
| High | `bg-orange-100` | `text-orange-700` | `border-orange-300` |
| Normal | `bg-blue-100` | `text-blue-700` | `border-blue-300` |
| Low | `bg-slate-100` | `text-slate-700` | `border-slate-300` |
| Lowest | `bg-gray-100` | `text-gray-600` | `border-gray-300` |

### Lead Score Colors
| Score Range | Background | Text |
|-------------|------------|------|
| 80-100 | `bg-green-50` | `text-green-600` |
| 60-79 | `bg-blue-50` | `text-blue-600` |
| 40-59 | `bg-yellow-50` | `text-yellow-600` |
| 0-39 | `bg-red-50` | `text-red-600` |

---

## 📊 Data Type Reference

### Field Types Used
| Type | Description | Example |
|------|-------------|---------|
| **Text** | Single line text | "John Doe" |
| **Long Text** | Multi-line text | "This is a description..." |
| **Email** | Email address | "user@example.com" |
| **Phone** | Phone number | "+1234567890" |
| **Number** | Numeric value | 42 |
| **Currency** | Money amount | $250,000.00 |
| **Date** | Date only | "2026-01-18" |
| **DateTime** | Date and time | "2026-01-18T10:30:00" |
| **Picklist** | Dropdown select | "Qualified" |
| **Multi-select** | Multiple selections | ["Tag1", "Tag2"] |
| **Lookup** | Foreign key reference | Contact → Account |
| **User** | System user | "Pranav A" |
| **Boolean** | True/false | true, false |
| **Toggle** | Switch on/off | ✓ or ✗ |
| **Image** | File upload | Avatar, Logo |

---

## 🔗 Relationship Mapping

### Lead → Contact Conversion
```
Lead {
  firstName → Contact.firstName
  lastName → Contact.lastName
  company → Account.accountName
  email → Contact.email
  phone → Contact.phone
  leadSource → Contact.leadSource
  ...
} + Create Deal
```

### Module Relationships
```
Contact (1) ──── (N) Deals
Contact (1) ──── (N) Tasks
Contact (1) ──── (1) Account
Deal (1) ──── (N) Tasks
Deal (1) ──── (N) Products
Deal (1) ──── (N) Quotes
All Modules (N) ──── (N) Documents
All Modules (N) ──── (N) Activities
```

---

## ⚡ Validation Rules

### Lead Validation
- ✅ Last Name is required
- ✅ Company is required
- ✅ Email must be valid email format
- ✅ Phone must be valid phone format
- ✅ Lead Score must be 0-100

### Contact Validation
- ✅ First Name is required
- ✅ Last Name is required
- ✅ Email is required and must be valid
- ✅ Phone is required
- ✅ Email must be unique per account

### Deal Validation
- ✅ Deal Name is required
- ✅ Account Name is required
- ✅ Amount is required and must be > 0
- ✅ Closing Date is required
- ✅ Closing Date must be in the future
- ✅ Stage is required

### Task Validation
- ✅ Subject is required
- ✅ Due Date is required
- ✅ Task Owner is required
- ✅ At least one relation (Lead/Contact/Account/Deal) should be set

### Document Validation
- ✅ Document Name is required
- ✅ File is required for upload
- ✅ File size must be < 50MB
- ✅ Supported file types only

---

## 🎯 Quick Integration Checklist

### For Each Module:

#### 1. Basic Setup
- [ ] Import the page component
- [ ] Add route to router
- [ ] Add navigation link
- [ ] Test basic rendering

#### 2. API Integration
- [ ] Replace mock data with API endpoints
- [ ] Implement create/read/update/delete
- [ ] Add loading states
- [ ] Add error handling
- [ ] Implement pagination

#### 3. Advanced Features
- [ ] Connect related modules
- [ ] Implement file uploads (Documents)
- [ ] Add real-time updates
- [ ] Implement search backend
- [ ] Add analytics tracking

#### 4. Polish
- [ ] Add confirmation dialogs
- [ ] Implement toast notifications
- [ ] Add keyboard shortcuts
- [ ] Test all workflows
- [ ] Performance optimization

---

*Quick Reference Guide - Last Updated: 2026-01-18*
