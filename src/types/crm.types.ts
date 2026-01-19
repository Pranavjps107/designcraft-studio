// B2C CRM Shared Type Definitions
// Version: 2.0.1 - Aligned with database schema

// ============================================
// ENUM TYPES
// ============================================

export type CustomerSource =
    | 'WhatsApp'
    | 'Instagram'
    | 'Facebook'
    | 'Google Ads'
    | 'Referral'
    | 'Website'
    | 'Offline Store'
    | 'Marketplace';

export type CustomerStatus = 'New' | 'Active' | 'Inactive' | 'Churned' | 'VIP';

export type ChurnRisk = 'Low' | 'Medium' | 'High';

export type CustomerTone = 'Friendly' | 'Neutral' | 'Frustrated' | 'Angry';

export type PreferredLanguage = 'en' | 'hi' | 'es' | 'fr' | 'de';

export type LeadSource =
    | 'WhatsApp Bot'
    | 'Instagram DM'
    | 'Facebook Message'
    | 'Google Ads'
    | 'Referral Code'
    | 'Website Chat'
    | 'Marketplace Inquiry'
    | 'Offline Event';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Not Interested' | 'Converted' | 'Junk';

export type DealStage =
    | 'Product Inquiry'
    | 'Price Discussion'
    | 'Ready to Buy'
    | 'Payment Pending'
    | 'Order Placed'
    | 'Closed Won'
    | 'Closed Lost'
    | 'Closed Lost - Price';

export type AgentType =
    | 'Sales'
    | 'Marketing'
    | 'PreSales'
    | 'Finance'
    | 'CustomerSuccess'
    | 'Support'
    | 'RefundPolicy'
    | 'Analytics';

export type PaymentMethod = 'UPI' | 'COD' | 'Card' | 'Wallet' | 'EMI';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Partially Refunded';

export type OrderStatus =
    | 'Processing'
    | 'Packed'
    | 'Shipped'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Cancelled'
    | 'Returned';

export type IssueType = 'Delayed' | 'Damaged' | 'Wrong Product' | 'Not Received' | 'Quality Issue';

export type TaskStatus = 'Open' | 'In Progress' | 'Done' | 'Cancelled';

export type TaskPriority = 'High' | 'Normal' | 'Low';

export type CampaignType = 'Lead Generation' | 'Nurture' | 'Re-engagement' | 'Win-Back' | 'Promotional';

export type CampaignStatus = 'Draft' | 'Active' | 'Paused' | 'Completed';

export type UserRole = 'owner' | 'admin' | 'user' | 'viewer';

export type ActivitySegment = 'Very Active' | 'Active' | 'At Risk' | 'Churned';

// ============================================
// MAIN INTERFACES
// ============================================

export interface Customer {
    id: string;
    tenant_id: string;

    // Customer Identity
    customer_name: string;
    customer_owner?: string;
    phone: string;
    email?: string;

    // WhatsApp Integration
    whatsapp_contact_id?: string;
    preferred_language: PreferredLanguage;

    // Customer Classification
    customer_source?: CustomerSource;
    customer_status: CustomerStatus;

    // Demographics
    city?: string;
    state?: string;
    country: string;
    pincode?: string;

    // Customer Behavior
    total_orders: number;
    total_revenue: number; // In smallest currency unit
    average_order_value?: number;
    last_order_date?: string;
    days_since_last_order?: number;

    // Engagement Signals
    message_frequency: number;
    response_latency_minutes?: number;
    buying_intent_score: number; // 0-100
    churn_risk: ChurnRisk;

    // Customer Tone
    customer_tone?: CustomerTone;

    // Segmentation
    tags?: string[];

    // Metadata
    notes?: string;
    custom_fields?: Record<string, any>;

    // Timestamps
    created_at: string;
    updated_at: string;
    last_contacted_at?: string;
}

export interface Lead {
    id: string;
    tenant_id: string;

    // Lead Identity
    lead_owner?: string;
    name: string;
    phone: string;
    email?: string;

    // Source Tracking
    lead_source?: LeadSource;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    referral_code?: string;

    // Lead Status
    lead_status: LeadStatus;

    // Lead Quality (AI-Driven)
    lead_score: number; // 0-100
    buying_intent_keywords?: string[];

    // Product Interest
    interested_in_products?: string[];
    budget_range?: string;

    // Conversion Tracking
    converted: boolean;
    converted_at?: string;
    converted_customer_id?: string;
    converted_deal_id?: string;

    // Location
    city?: string;
    state?: string;

    // Metadata
    notes?: string;
    custom_fields?: Record<string, any>;

    // Timestamps
    created_at: string;
    updated_at: string;
    last_contacted_at?: string;
}

export interface Deal {
    id: string;
    tenant_id: string;

    // Deal Identity
    deal_owner?: string;
    deal_name: string;
    customer_id?: string;

    // Product Context
    product_names?: string[];
    product_ids?: string[];

    // Deal Value
    amount?: number;
    discount_applied: number;
    final_amount?: number; // Auto-calculated

    // Deal Stage
    stage: DealStage;
    probability?: number; // 0-100

    // Timeline
    expected_close_date?: string;

    // WhatsApp Integration
    whatsapp_session_id?: string;

    // Agent Context
    last_agent_interaction?: AgentType;
    agent_recommendations?: Record<string, any>;

    // Objections Tracking
    objections?: string[];

    // Next Steps
    next_step?: string;
    next_task_id?: string;

    // Metadata
    notes?: string;
    custom_fields?: Record<string, any>;

    // Timestamps
    created_at: string;
    updated_at: string;
    stage_changed_at?: string;
    closed_at?: string;
}

export interface Order {
    id: string;
    tenant_id: string;

    // Order Identity
    order_number: string;
    customer_id: string; // Required
    deal_id?: string;

    // Order Details
    product_names?: string[];
    product_ids?: string[];
    quantity: number;

    // Pricing
    subtotal: number;
    discount: number;
    shipping_charges: number;
    total_amount: number;

    // Payment
    payment_method?: PaymentMethod;
    payment_status: PaymentStatus;

    // Fulfillment
    order_status: OrderStatus;
    tracking_number?: string;
    courier_name?: string;

    // Delivery Address
    delivery_address?: string;
    delivery_city?: string;
    delivery_state?: string;
    delivery_pincode?: string;

    // Timestamps
    ordered_at: string;
    shipped_at?: string;
    delivered_at?: string;

    // Issues
    has_issue: boolean;
    issue_type?: IssueType;

    // Metadata
    notes?: string;
    custom_fields?: Record<string, any>;
}

export interface Task {
    id: string;
    tenant_id: string;

    // Task Ownership
    task_owner?: string;
    assigned_to_agent?: AgentType;

    // Task Details
    subject: string;
    due_date?: string;
    status: TaskStatus;
    priority: TaskPriority;

    // Relations
    customer_id?: string;
    lead_id?: string;
    deal_id?: string;
    order_id?: string;

    // Automation
    auto_created: boolean;
    reminder_at?: string;

    // Metadata
    notes?: string;

    // Timestamps
    created_at: string;
    updated_at: string;
    completed_at?: string;
}

export interface Campaign {
    id: string;
    tenant_id: string;

    // Campaign Identity
    campaign_name: string;
    campaign_type: CampaignType;

    // Targeting
    target_segment?: string[];
    target_customer_ids?: string[];

    // Message
    message_template?: string;
    offer_details?: string;
    discount_code?: string;

    // Timeline
    start_date?: string;
    end_date?: string;
    status: CampaignStatus;

    // Metrics
    total_sent: number;
    total_delivered: number;
    total_replied: number;
    total_conversions: number;

    // Timestamps
    created_at: string;
    updated_at: string;
}

export interface AgentInteraction {
    id: string;
    tenant_id: string;

    agent_name: AgentType;
    message_id?: string;
    customer_id?: string;
    deal_id?: string;

    action_taken: string;
    recommendations?: Record<string, any>;
    confidence_score?: number; // 0.00 to 1.00

    // LLM Tracking
    llm_provider?: string;
    input_tokens?: number;
    output_tokens?: number;
    total_cost_credits?: number;

    created_at: string;
}

export interface CampaignTouch {
    id: string;
    tenant_id: string;

    campaign_id: string;
    customer_id?: string;
    lead_id?: string;

    message_id?: string;
    sent_at: string;
    delivered_at?: string;
    replied_at?: string;

    converted: boolean;
    conversion_deal_id?: string;
}

// ============================================
// ANALYTICS INTERFACES
// ============================================

export interface AnalyticsOverview {
    // Messaging Metrics
    total_messages: number;
    total_conversations: number;
    inbound_messages: number;
    outbound_messages: number;
    average_response_time_seconds: number;
    conversation_growth_percent: number;

    // B2C Metrics
    total_customers: number;
    active_customers: number;
    churned_customers: number;
    total_revenue: number;
    total_orders: number;
}

export interface ConversationTrend {
    date: string;
    conversations: number;
    users: number;
}

export interface DeviceBreakdown {
    device: string;
    percentage: number;
    sessions: number;
}

export interface PerformanceData {
    metric: string;
    value: number;
    change: number;
}

export interface CustomerLifetimeValue {
    customer_id: string;
    customer_name: string;
    phone: string;
    total_orders: number;
    total_revenue: number;
    average_order_value: number;
    days_since_last_order?: number;
    churn_risk: ChurnRisk;
    customer_status: string;
    calculated_aov?: number;
    activity_segment: ActivitySegment;
}

export interface DealPipeline {
    tenant_id: string;
    stage: string;
    deal_count: number;
    total_value: number;
    avg_deal_value: number;
    oldest_deal: string;
    newest_deal: string;
    avg_days_in_stage: number;
}

export interface LeadConversionMetrics {
    tenant_id: string;
    lead_source: string;
    total_leads: number;
    converted_leads: number;
    conversion_rate: number; // Percentage
    avg_lead_score: number;
    new_leads: number;
    contacted_leads: number;
    qualified_leads: number;
    not_interested_leads: number;
    junk_leads: number;
}

// ============================================
// SETTINGS INTERFACES
// ============================================

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
    role: UserRole;
    tenant: {
        id: string;
        name: string;
    };
    created_at: string;
}

export interface NotificationPreferences {
    email_enabled: boolean;
    new_conversations: boolean;
    unread_messages: boolean;
    weekly_reports: boolean;
}

export interface TeamMember {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    created_at: string;
    last_active: string;
}
