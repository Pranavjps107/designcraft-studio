# B2C CRM UI Update Summary

## Overview
This document tracks the progress of updating the DesignCraft Studio CRM UI to align with the new B2C CRM database schema.

## Database Schema Changes

The new B2C CRM schema focuses on direct-to-consumer sales with the following key tables:

### Core Tables
1. **crm.customers** - Individual customers (merged Contact + Account for B2C)
2. **crm.leads** - Prospects who haven't made first purchase yet  
3. **crm.deals** - Active purchase conversations (B2C sales journey)
4. **crm.orders** - Confirmed purchases after payment
5. **crm.tasks** - Agent action items
6. **crm.campaigns** - Marketing campaigns
7. **crm.campaign_touches** - Campaign engagement tracking
8. **crm.agent_interactions** - Multi-agent system logs

### Key B2C Differentiators
- **WhatsApp Integration**: Native WhatsApp contact linking
- **Customer Behavior Metrics**: total_orders, total_revenue, churn_risk, buying_intent_score
- **Simplified Address**: No complex B2B hierarchies (just city, state, country, pincode)
- **B2C Lead Sources**: WhatsApp Bot, Instagram DM, Facebook Message, Referral Code, etc.
- **B2C Deal Stages**: Product Inquiry → Price Discussion → Ready to Buy → Payment Pending → Order Placed
- **Conversion Tracking**: Lead → Customer conversion on first order
- **UTM Tracking**: Campaign attribution (utm_source, utm_medium, utm_campaign)

---

## UI Update Progress

### ✅ COMPLETED

#### 1. **Customers Page (NEW)** - `src/pages/Customers.tsx`
**Status**: **CREATED** ✅

Replaced the old B2B "Contacts" page with a new B2C "Customers" page.

**Features Implemented**:
- ✅ Customer interface aligned with `crm.customers` schema
- ✅ WhatsApp integration fields (whatsapp_contact_id, preferred_language)
- ✅ Customer behavior metrics display (total_orders, total_revenue, AOV)
- ✅ Churn risk tracking with visual indicators (Low/Medium/High)
- ✅ Customer status badges (New, Active, Inactive, Churned, VIP)
- ✅ VIP customer highlighting with star icon
- ✅ B2C customer sources (WhatsApp, Instagram, Website, etc.)
- ✅ Revenue analytics dashboard cards
- ✅ At-risk customers tracking
- ✅ Tags system for customer segmentation
- ✅ Simplified location display (city, state)
- ✅ Days since last order tracking
- ✅ List and Grid view modes
- ✅ Comprehensive filtering:
  - Customer Source
  - Customer Status  
  - Churn Risk
  - Minimum Orders (slider)
  - Minimum Revenue (slider)
  - City search
- ✅ Search by name, phone, email
- ✅ Bulk actions (message, edit, delete)
- ✅ Quick actions dropdown (View Orders, Send WhatsApp, Create Deal, Create Task)

**Mock Data**: 3 sample customers with realistic B2C data

---

#### 2. **Leads Page** - `src/pages/Leads.tsx`
**Status**: **SCHEMA UPDATED** (Needs UI/Logic fixes) ⚠️

**Completed**:
- ✅ Lead interface updated to match `crm.leads` schema
- ✅ Added conversion tracking fields (converted, converted_at, converted_customer_id, converted_deal_id)
- ✅ Added UTM tracking fields (utm_source, utm_medium, utm_campaign, referral_code)
- ✅ Updated lead sources to B2C-specific sources
- ✅ Updated lead statuses (New, Contacted, Qualified, Not Interested, Converted, Junk)
- ✅ Added buying_intent_keywords (AI-driven)
- ✅ Added interested_in_products and budget_range fields
- ✅ Mock data updated with 3 B2C leads (including 1 converted lead)

**Known Issues** (NEEDS FIXING):
- ❌ ~50+ lint errors due to field name changes:
  - Old: `firstName`, `lastName`, `company`, `title`, `leadStatus`, `leadSource`, `leadScore`, `leadOwner`, `createdTime`
  - New: `name`, `lead_status`, `lead_source`, `lead_score`, `lead_owner`, `created_at`
- ❌ Filter logic still references old fields (ranking, industry)
- ❌ Display components use old field names
- ❌ Create Lead Dialog not updated

**Next Steps for Leads**:
1. Update all references from `firstName`/`lastName` → `name`
2. Update all snake_case field references (`lead_status`, `lead_source`, etc.)
3. Remove B2B-specific filters (ranking, industry)  
4. Add B2C-specific filters (budget_range, converted status, UTM campaign)
5. Update table columns to show:
   - Conversion status badge
   - Buying intent keywords
   - Interested products
   - Budget range
   - UTM campaign (if any)
6. Update Create Lead Dialog with new fields

---

### 🚧 IN PROGRESS / TODO

#### 3. **Deals Page** - `src/pages/Deals.tsx`
**Status**: **NOT STARTED** ❌

**Needs**:
- Update Deal interface to match `crm.deals` schema
- Change deal stages to B2C journey:
  ```
  Old B2B: Qualification → Needs Analysis → Proposal → Negotiation → Closed Won/Lost
  New B2C: Product Inquiry → Price Discussion → Ready to Buy → Payment Pending → Order Placed → Closed Won/Lost
  ```
- Add product context fields (product_names, product_ids)
- Add WhatsApp session linkage
- Add agent context (last_agent_interaction, agent_recommendations)
- Add objections tracking
- Simplify from B2B complexity to B2C simplicity
- Remove B2B-specific fields (account_name, lead_source type specifics)
- Update mock data to B2C scenarios

**Current State**: Still uses old B2B deal structure

---

#### 4. **Orders Page** - `src/pages/Orders.tsx`
**Status**: **NOT CREATED** ❌

**Needs** (NEW PAGE):
Create complete orders management UI aligned with `crm.orders` schema:

**Features Required**:
- Order list/grid view with order_number display
- Customer linking
- Product details display (product_names, product_ids, quantity)
- Pricing breakdown:
  - Subtotal
  - Discount
  - Shipping charges
  - Total amount
- Payment tracking:
  - Payment method (UPI, COD, Card, Wallet, EMI)
  - Payment status (Pending, Paid, Failed, Refunded, Partially Refunded)
- Fulfillment tracking:
  - Order status (Processing, Packed, Shipped, Out for Delivery, Delivered, Cancelled, Returned)
  - Tracking number display
  - Courier name
  - Timeline visualization
- Delivery address display
- Issue tracking (has_issue flag, issue_type)
- Filters:
  - Order status
  - Payment status
  - Date range
  - Customer search
  - Issue flagged orders
- Quick actions:
  - View order details
  - Update status
  - Process refund
  - Download invoice
  - Send tracking link

**Mock Data Needed**: 5-10 sample orders with various statuses

---

#### 5. **Campaigns Page** - `src/pages/Campaigns.tsx  `
**Status**: **NOT CREATED** ❌

**Needs** (NEW PAGE):
Create marketing campaigns management UI aligned with `crm.campaigns` schema:

**Features Required**:
- Campaign list with campaign_name, campaign_type
- Campaign types:
  - Lead Generation
  - Nurture
  - Re-engagement
  - Win-Back
  - Promotional
- Target segment management (customer/lead segmentation)
- Message template preview
- Offer details and discount code management
- Campaign scheduling (start_date, end_date)
- Campaign status (Draft, Active, Paused, Completed)
- Performance metrics:
  - Total sent
  - Total delivered
  - Total replied
  - Total conversions
  - Conversion rate visualization
- Filters:
  - Campaign type
  - Status
  - Date range
- Quick actions:
  - Launch campaign
  - Pause/Resume
  - View analytics
  - Clone campaign
  - View touches (engagement details)

**Integration**: Link to `crm.campaign_touches` for detailed engagement tracking

**Mock Data Needed**: 3-5 sample campaigns

---

#### 6. **Tasks Page** - `src/pages/Tasks.tsx`
**Status**: **NEEDS UPDATE** ⚠️

**Current State**: Already exists but needs schema alignment

**Needs**:
- Update Task interface to match `crm.tasks` schema
- Update assigned_to_agent field with B2C agent types:
  - Sales, Marketing, PreSales, Finance, CustomerSuccess, Support, RefundPolicy
- Add auto_created flag display
- Add customer_id, lead_id, deal_id, order_id linking
- Update filters to show agent assignments
- Add reminder_at scheduling

---

#### 7. **Analytics/Dashboard** - `src/pages/Dashboard.tsx` or `Analytics.tsx`
**Status**: **NEEDS B2C VIEWS** ⚠️

**Needs**:
Implement visualizations for the B2C analytics views:

1. **Customer Lifetime Value View** (`crm.v_customer_lifetime_value`)
   - Customer segmentation by activity (Very Active, Active, At Risk, Churned)
   - CLV distribution chart
   - Churn risk breakdown

2. **Deal Pipeline View** (`crm.v_deal_pipeline_b2c`)
   - B2C sales funnel visualization
   - Deal count and value by stage
   - Average days in stage

3. **Lead Conversion View** (`crm.v_lead_conversion_b2c`)
   - Conversion rates by lead source
   - Lead status breakdown
   - Lead score distribution

**Charts Needed**:
- Funnel chart for deal pipeline
- Bar chart for lead source performance
- Pie chart for customer segments
- Line chart for revenue trends
- Gauge for conversion rates

---

#### 8. **Router/Navigation Updates** - `src/App.tsx` or routing file
**Status**: **NEEDS UPDATE** ⚠️

**Needs**:
- Replace "Contacts" route with "Customers"
- Add "Orders" route
- Add "Campaigns" route
- Update navigation menu/sidebar
- Update breadcrumbs

---

## Implementation Priority

### Phase 1: Fix Existing Pages (HIGH PRIORITY)
1. **Fix Leads Page** - Resolve ~50 lint errors, update all field references
2. **Update Deals Page** - Align with B2C deal stages
3. **Update Tasks Page** - Add agent assignments

### Phase 2: Create New Pages (MEDIUM PRIORITY)
4. **Create Orders Page** - Essential for B2C operations
5. **Create Campaigns Page** - Marketing automation

### Phase 3: Analytics & Polish (LOWER PRIORITY)
6. **Update Dashboard** - Add B2C analytics views
7. **Router Updates** - Navigation and routes
8. **Documentation** - User guides

---

## Field Mapping Reference

### Leads: Old (B2B) → New (B2C)

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `firstName` + `lastName` | `name` | Combined single field |
| `company` | _removed_ | B2C doesn't track companies |
| `title` | _removed_ | Not relevant for consumers |
| `leadSource` | `lead_source` | Snake case, B2C sources |
| `leadStatus` | `lead_status` | Snake case, simplified statuses |
| `leadScore` | `lead_score` | Snake case |
| `leadOwner` | `lead_owner` | Snake case |
| `createdTime` | `created_at` | Snake case, timestamptz |
| `ranking` | _removed_ | B2B concept |
| `tone` | _removed_ | Moved to customers |
| `industry` | _removed_ | B2C doesn't track |
| `annualRevenue` | _removed_ | B2B metric |
| `employees` | _removed_ | B2B metric |
| `rating` | _removed_ | Different in B2C |
| `mobile` | _removed_ | Merged into `phone` |
| _new_ | `utm_source` | Campaign tracking |
| _new_ | `utm_medium` | Campaign tracking |
| _new_ | `utm_campaign` | Campaign tracking |
| _new_ | `referral_code` | Referral tracking |
| _new_ | `buying_intent_keywords` | AI-driven |
| _new_ | `interested_in_products` | Product interest |
| _new_ | `budget_range` | Price sensitivity |
| _new_ | `converted` | Conversion flag |
| _new_ | `converted_at` | Conversion timestamp |
| _new_ | `converted_customer_id` | Link to customer |
| _new_ | `converted_deal_id` | Link to deal |

### Customers (Contacts): Old (B2B) → New (B2C)

| Old Field (Contact) | New Field (Customer) | Notes |
|---------------------|----------------------|-------|
| `firstName` + `lastName` | `customer_name` | Combined |
| `accountName` | _removed_ | No B2B accounts |
| `email` | `email` | Same |
| `phone` + `mobile` | `phone` | Single field |
| `contactOwner` | `customer_owner` | Renamed |
| `createdTime` | `created_at` | Snake case |
| `mailingAddress` | `city`, `state`, `country`, `pincode` | Simplified |
| `department` | _removed_ | B2B concept |
| `reportingTo` | _removed_ | B2B hierarchy |
| `leadSource` | `customer_source` | B2C sources |
| _new_ | `customer_status` | New, Active, Inactive, Churned, VIP |
| _new_ | `whatsapp_contact_id` | WhatsApp integration |
| _new_ | `preferred_language` | Multilingual support |
| _new_ | `total_orders` | Behavior metric |
| _new_ | `total_revenue` | Behavior metric |
| _new_ | `average_order_value` | Calculated metric |
| _new_ | `last_order_date` | Recency tracking |
| _new_ | `days_since_last_order` | Calculated |
| _new_ | `message_frequency` | Engagement |
| _new_ | `buying_intent_score` | AI-driven score |
| _new_ | `churn_risk` | Low/Medium/High |
| _new_ | `customer_tone` | Interaction sentiment |
| _new_ | `tags` | Segmentation |

### Deals: Old (B2B) → New (B2C)

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `dealName` | `deal_name` | Same concept |
| `accountName` | _removed_ | No accounts in B2C |
| `contactName` | `customer_id` | Reference to customer |
| `amount` | `amount` | Same |
| `stage` | `stage` | Different stages (B2C journey) |
| `closingDate` | `expected_close_date` | Renamed |
| `dealOwner` | `deal_owner` | Snake case |
| `type` | _removed_ | Not used in B2C |
| `leadSource` | _removed_ | Tracked in lead/customer |
| _new_ | `product_names` | Product context |
| _new_ | `product_ids` | Product linkage |
| _new_ | `discount_applied` | Discount amount |
| _new_ | `final_amount` | After discount |
| _new_ | `whatsapp_session_id` | Chat linkage |
| _new_ | `last_agent_interaction` | Multi-agent tracking |
| _new_ | `agent_recommendations` | AI suggestions |
| _new_ | `objections` | Sales objections |
| _new_ | `next_task_id` | Task linkage |

---

## Testing Checklist

### Customers Page
- [ ] Customer list loads correctly
- [ ] Stats cards show accurate totals
- [ ] Filters work (source, status, churn risk, orders, revenue, city)
- [ ] Search works (name, phone, email)
- [ ] List/Grid view toggle works
- [ ] Bulk select and actions work
- [ ] VIP badge displays for VIP customers
- [ ] Tags display correctly
- [ ] Churn risk colors are correct
- [ ] Quick actions menu works

### Leads Page (After fixes)
- [ ] Lead list loads
- [ ] Converted leads show badge
- [ ] UTM campaign data displays
- [ ] Buying intent keywords show
- [ ] Budget range displays
- [ ] Lead source filter works with new sources
- [ ] Lead status filter updated
- [ ] Search works
- [ ] Create lead dialog accepts new fields

### Deals Page (After update)
- [ ] Deal stages reflect B2C journey
- [ ] Product names display
- [ ] Discount calculation works
- [ ] WhatsApp session linkage works
- [ ] Agent recommendations show
- [ ] Objections track correctly
- [ ] Pipeline view shows B2C stages

### Orders Page (After creation)
- [ ] Order list loads
- [ ] Payment status displays correctly
- [ ] Order status tracking works
- [ ] Delivery address shows
- [ ] Issue flagging works
- [ ] Tracking number displays
- [ ] Filter by status works
- [ ] Customer linking works

### Campaigns Page (After creation)
- [ ] Campaign list loads
- [ ] Performance metrics display
- [ ] Target segment shows
- [ ] Message template preview works
- [ ] Status management works
- [ ] Date scheduling works

---

## Database Triggers & Auto-Calculations

The database handles these automatically (UI just displays):

1. **Customer Metrics** (`crm.update_customer_on_order` trigger):
   - Increments `total_orders` on new order
   - Updates `total_revenue`
   - Sets `last_order_date`
   - Resets `days_since_last_order` to 0
   - Calculates `average_order_value`
   - Updates status to 'Active'

2. **Churn Risk** (`crm.update_customer_churn_risk` trigger):
   - Auto-calculates `days_since_last_order`
   - Sets churn_risk based on days:
     - Low: < 45 days
     - Medium: 45-90 days
     - High: > 90 days

3. **Deal Final Amount** (`crm.calculate_deal_final_amount` trigger):
   - Auto-calculates: `final_amount = amount - discount_applied`

4. **Lead Score** (`crm.calculate_lead_score_b2c` trigger):
   - Scores based on lead_source (WhatsApp: +20, Referral: +30, etc.)
   - Adds points for buying_intent_keywords (+10 per keyword)
   - Adds points for budget_range (2000+: +25, etc.)
   - Caps at 100

---

## Next Steps

1. **Immediate**: Fix Leads page lint errors (update all field references)
2. **High Priority**: Update Deals page to B2C schema
3. **Medium Priority**: Create Orders page (essential for B2C)
4. **Medium Priority**: Create Campaigns page
5. **Lower Priority**: Add analytics dashboards
6. **Polish**: Update routing and navigation

---

## Questions / Decisions Needed

1. Should "Contacts" page be deprecated or kept for legacy data?
2. Do we need a customer import tool for WhatsApp contacts?
3. Should we add a "Send WhatsApp Message" integration button?
4. Analytics page: separate page or dashboard integration?
5. Real-time updates: WebSocket for live order tracking?

---

## Resources

- **Database Schema**: See main SQL file with complete B2C CRM schema
- **Conversation History**: [B2C CRM Migration Implementation](conversation_id: 02077fe3-c4ba-4ba0-9bb7-4c17711d272a)
- **Implementation Guide**: See backend agent implementation docs

---

*Last Updated: 2026-01-18*
*Status: Phase 1 - Customers page completed, Leads schema updated*
