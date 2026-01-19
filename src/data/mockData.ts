// B2C CRM Mock Data - Consistent UUIDs across modules
// This file contains interconnected mock data for testing

import type {
    Customer,
    Lead,
    Deal,
    Order,
    Task,
    Campaign,
    AgentInteraction,
    CampaignTouch,
} from '@/types/crm.types';

// ============================================
// SHARED UUID CONSTANTS
// ============================================

const TENANT_ID = '550e8400-e29b-41d4-a716-446655440000';

// Customer IDs
const CUSTOMER_IDS = {
    rahul_sharma: 'cust-001-8400-e29b-41d4-a716446655aa',
    priya_patel: 'cust-002-8400-e29b-41d4-a716446655bb',
    amit_kumar: 'cust-003-8400-e29b-41d4-a716446655cc',
    sneha_reddy: 'cust-004-8400-e29b-41d4-a716446655dd',
    vikram_singh: 'cust-005-8400-e29b-41d4-a716446655ee',
};

// Lead IDs
const LEAD_IDS = {
    anjali_verma: 'lead-001-8400-e29b-41d4-a716446655aa',
    rajesh_kumar: 'lead-002-8400-e29b-41d4-a716446655bb',
    meera_shah: 'lead-003-8400-e29b-41d4-a716446655cc',
};

// Deal IDs
const DEAL_IDS = {
    rahul_premium: 'deal-001-8400-e29b-41d4-a716446655aa',
    priya_basic: 'deal-002-8400-e29b-41d4-a716446655bb',
    sneha_gold: 'deal-003-8400-e29b-41d4-a716446655cc',
};

// Order IDs
const ORDER_IDS = {
    ord_001: 'ordr-001-8400-e29b-41d4-a716446655aa',
    ord_002: 'ordr-002-8400-e29b-41d4-a716446655bb',
    ord_003: 'ordr-003-8400-e29b-41d4-a716446655cc',
};

// ============================================
// MOCK CUSTOMERS
// ============================================

export const mockCustomers: Customer[] = [
    {
        id: CUSTOMER_IDS.rahul_sharma,
        tenant_id: TENANT_ID,
        customer_name: 'Rahul Sharma',
        phone: '+919876543210',
        email: 'rahul.sharma@gmail.com',
        whatsapp_contact_id: 'wa_001',
        preferred_language: 'hi',
        customer_source: 'WhatsApp',
        customer_status: 'VIP',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'IN',
        pincode: '400001',
        total_orders: 12,
        total_revenue: 450000, // ₹4500 in paise
        average_order_value: 37500,
        last_order_date: '2026-01-15',
        days_since_last_order: 4,
        message_frequency: 45,
        response_latency_minutes: 5,
        buying_intent_score: 92,
        churn_risk: 'Low',
        customer_tone: 'Friendly',
        tags: ['Premium', 'Frequent Buyer', 'Hindi Preferred'],
        customer_owner: 'Pranav A',
        notes: 'VIP customer, prefers Hindi communication. Very responsive.',
        created_at: '2025-11-10T10:30:00',
        updated_at: '2026-01-18T14:20:00',
        last_contacted_at: '2026-01-17T14:20:00',
    },
    {
        id: CUSTOMER_IDS.priya_patel,
        tenant_id: TENANT_ID,
        customer_name: 'Priya Patel',
        phone: '+919988776655',
        email: 'priya.p@yahoo.com',
        preferred_language: 'en',
        customer_source: 'Instagram',
        customer_status: 'Active',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'IN',
        pincode: '380001',
        total_orders: 5,
        total_revenue: 125000, // ₹1250
        average_order_value: 25000,
        last_order_date: '2025-12-28',
        days_since_last_order: 22,
        message_frequency: 15,
        response_latency_minutes: 30,
        buying_intent_score: 68,
        churn_risk: 'Low',
        customer_tone: 'Friendly',
        tags: ['Social Media', 'Instagram'],
        customer_owner: 'Pranav A',
        created_at: '2025-10-05T09:15:00',
        updated_at: '2026-01-10T11:30:00',
        last_contacted_at: '2026-01-10T11:30:00',
    },
    {
        id: CUSTOMER_IDS.amit_kumar,
        tenant_id: TENANT_ID,
        customer_name: 'Amit Kumar',
        phone: '+918877665544',
        email: 'amit.k@hotmail.com',
        preferred_language: 'en',
        customer_source: 'Website',
        customer_status: 'Inactive',
        city: 'Delhi',
        state: 'Delhi',
        country: 'IN',
        pincode: '110001',
        total_orders: 2,
        total_revenue: 35000, // ₹350
        average_order_value: 17500,
        last_order_date: '2025-09-15',
        days_since_last_order: 126,
        message_frequency: 3,
        response_latency_minutes: 120,
        buying_intent_score: 35,
        churn_risk: 'High',
        customer_tone: 'Neutral',
        tags: ['At Risk', 'Slow Responder'],
        customer_owner: 'Pranav A',
        notes: 'Customer has gone silent. Need re-engagement campaign.',
        created_at: '2025-07-20T12:00:00',
        updated_at: '2025-12-15T09:30:00',
        last_contacted_at: '2025-12-15T09:30:00',
    },
    {
        id: CUSTOMER_IDS.sneha_reddy,
        tenant_id: TENANT_ID,
        customer_name: 'Sneha Reddy',
        phone: '+917766554433',
        email: 'sneha.reddy@outlook.com',
        preferred_language: 'en',
        customer_source: 'Google Ads',
        customer_status: 'Active',
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'IN',
        pincode: '500001',
        total_orders: 8,
        total_revenue: 280000, // ₹2800
        average_order_value: 35000,
        last_order_date: '2026-01-10',
        days_since_last_order: 9,
        message_frequency: 25,
        response_latency_minutes: 15,
        buying_intent_score: 78,
        churn_risk: 'Low',
        customer_tone: 'Friendly',
        tags: ['Google Ads', 'Regular Buyer'],
        customer_owner: 'Pranav A',
        created_at: '2025-08-15T11:00:00',
        updated_at: '2026-01-12T10:00:00',
        last_contacted_at: '2026-01-12T10:00:00',
    },
    {
        id: CUSTOMER_IDS.vikram_singh,
        tenant_id: TENANT_ID,
        customer_name: 'Vikram Singh',
        phone: '+916655443322',
        email: 'vikram.singh@gmail.com',
        preferred_language: 'hi',
        customer_source: 'Referral',
        customer_status: 'New',
        city: 'Jaipur',
        state: 'Rajasthan',
        country: 'IN',
        pincode: '302001',
        total_orders: 1,
        total_revenue: 45000, // ₹450
        average_order_value: 45000,
        last_order_date: '2026-01-18',
        days_since_last_order: 1,
        message_frequency: 8,
        response_latency_minutes: 10,
        buying_intent_score: 55,
        churn_risk: 'Medium',
        customer_tone: 'Neutral',
        tags: ['New Customer', 'Referral'],
        customer_owner: 'Pranav A',
        created_at: '2026-01-15T15:00:00',
        updated_at: '2026-01-18T16:00:00',
        last_contacted_at: '2026-01-18T12:00:00',
    },
];

// ============================================
// MOCK LEADS
// ============================================

export const mockLeads: Lead[] = [
    {
        id: LEAD_IDS.anjali_verma,
        tenant_id: TENANT_ID,
        name: 'Anjali Verma',
        phone: '+919988776611',
        email: 'anjali.v@gmail.com',
        lead_source: 'WhatsApp Bot',
        utm_source: 'whatsapp',
        utm_campaign: 'summer_sale_2026',
        lead_status: 'Qualified',
        lead_score: 85,
        buying_intent_keywords: ['buy now', 'interested', 'price'],
        interested_in_products: ['Premium Package', 'Gold Membership'],
        budget_range: '₹2000+',
        converted: false,
        city: 'Bangalore',
        state: 'Karnataka',
        lead_owner: 'Pranav A',
        notes: 'High intent lead from WhatsApp campaign. Ready to buy.',
        created_at: '2026-01-15T10:30:00',
        updated_at: '2026-01-17T14:20:00',
        last_contacted_at: '2026-01-17T14:20:00',
    },
    {
        id: LEAD_IDS.rajesh_kumar,
        tenant_id: TENANT_ID,
        name: 'Rajesh Kumar',
        phone: '+918877665522',
        email: 'rajesh.k@yahoo.com',
        lead_source: 'Instagram DM',
        utm_source: 'instagram',
        utm_medium: 'social',
        lead_status: 'Contacted',
        lead_score: 72,
        buying_intent_keywords: ['looking for', 'options'],
        interested_in_products: ['Basic Package'],
        budget_range: '₹1000-2000',
        converted: false,
        city: 'Mumbai',
        state: 'Maharashtra',
        lead_owner: 'Pranav A',
        created_at: '2026-01-16T14:20:00',
        updated_at: '2026-01-16T15:00:00',
        last_contacted_at: '2026-01-16T15:00:00',
    },
    {
        id: LEAD_IDS.meera_shah,
        tenant_id: TENANT_ID,
        name: 'Meera Shah',
        phone: '+917766554411',
        email: 'meera.shah@outlook.com',
        lead_source: 'Referral Code',
        referral_code: 'REF2026JAN',
        lead_status: 'Converted',
        lead_score: 91,
        buying_intent_keywords: ['ready to buy', 'payment', 'delivery'],
        interested_in_products: ['Premium Package', 'Add-ons'],
        budget_range: '₹2000+',
        converted: true,
        converted_at: '2026-01-17T16:30:00',
        converted_customer_id: CUSTOMER_IDS.sneha_reddy,
        converted_deal_id: DEAL_IDS.sneha_gold,
        city: 'Pune',
        state: 'Maharashtra',
        lead_owner: 'Pranav A',
        notes: 'Converted successfully via referral campaign.',
        created_at: '2026-01-17T09:15:00',
        updated_at: '2026-01-17T16:30:00',
        last_contacted_at: '2026-01-17T16:00:00',
    },
];

// ============================================
// MOCK DEALS
// ============================================

export const mockDeals: Deal[] = [
    {
        id: DEAL_IDS.rahul_premium,
        tenant_id: TENANT_ID,
        deal_name: 'Rahul - Premium Package Renewal',
        deal_owner: 'Pranav A',
        customer_id: CUSTOMER_IDS.rahul_sharma,
        product_names: ['Premium Package', 'Gold Membership'],
        product_ids: ['prod-premium-001', 'prod-gold-002'],
        amount: 500000, // ₹5000
        discount_applied: 50000, // ₹500 discount
        final_amount: 450000, // ₹4500
        stage: 'Payment Pending',
        probability: 90,
        expected_close_date: '2026-01-25',
        whatsapp_session_id: 'ws_session_001',
        last_agent_interaction: 'Sales',
        agent_recommendations: {
            suggestion: 'Offer expedited delivery to close deal faster',
            confidence: 0.85,
        },
        objections: ['Price concern', 'Delivery time'],
        next_step: 'Send payment link via WhatsApp',
        next_task_id: 'task-001',
        notes: 'VIP customer renewal - high priority',
        created_at: '2026-01-10T10:00:00',
        updated_at: '2026-01-18T14:00:00',
        stage_changed_at: '2026-01-18T14:00:00',
    },
    {
        id: DEAL_IDS.priya_basic,
        tenant_id: TENANT_ID,
        deal_name: 'Priya - Basic Package',
        deal_owner: 'Pranav A',
        customer_id: CUSTOMER_IDS.priya_patel,
        product_names: ['Basic Package'],
        product_ids: ['prod-basic-001'],
        amount: 150000, // ₹1500
        discount_applied: 0,
        final_amount: 150000,
        stage: 'Price Discussion',
        probability: 60,
        expected_close_date: '2026-01-28',
        last_agent_interaction: 'PreSales',
        objections: ['Comparing with competitors'],
        next_step: 'Share comparison document',
        notes: 'Instagram lead - needs more nurturing',
        created_at: '2026-01-12T14:20:00',
        updated_at: '2026-01-16T11:00:00',
        stage_changed_at: '2026-01-16T11:00:00',
    },
    {
        id: DEAL_IDS.sneha_gold,
        tenant_id: TENANT_ID,
        deal_name: 'Sneha - Gold Membership',
        deal_owner: 'Pranav A',
        customer_id: CUSTOMER_IDS.sneha_reddy,
        product_names: ['Gold Membership', 'Add-ons Package'],
        product_ids: ['prod-gold-002', 'prod-addon-003'],
        amount: 350000, // ₹3500
        discount_applied: 35000, // ₹350 (10% discount)
        final_amount: 315000, // ₹3150
        stage: 'Closed Won',
        probability: 100,
        expected_close_date: '2026-01-17',
        last_agent_interaction: 'Sales',
        next_step: 'Process order and send confirmation',
        notes: 'Closed successfully via referral campaign',
        created_at: '2026-01-17T09:15:00',
        updated_at: '2026-01-17T16:30:00',
        stage_changed_at: '2026-01-17T16:30:00',
        closed_at: '2026-01-17T16:30:00',
    },
];

// ============================================
// MOCK ORDERS
// ============================================

export const mockOrders: Order[] = [
    {
        id: ORDER_IDS.ord_001,
        tenant_id: TENANT_ID,
        order_number: 'ORD-2026-001',
        customer_id: CUSTOMER_IDS.rahul_sharma,
        deal_id: DEAL_IDS.rahul_premium,
        product_names: ['Premium Package', 'Gold Membership'],
        product_ids: ['prod-premium-001', 'prod-gold-002'],
        quantity: 2,
        subtotal: 450000, // ₹4500
        discount: 50000, // ₹500
        shipping_charges: 5000, // ₹50
        total_amount: 405000, // ₹4050
        payment_method: 'UPI',
        payment_status: 'Paid',
        order_status: 'Delivered',
        tracking_number: 'TRK123456789',
        courier_name: 'Delhivery',
        delivery_address: '123 MG Road',
        delivery_city: 'Mumbai',
        delivery_state: 'Maharashtra',
        delivery_pincode: '400001',
        ordered_at: '2026-01-10T10:30:00',
        shipped_at: '2026-01-12T09:00:00',
        delivered_at: '2026-01-15T14:20:00',
        has_issue: false,
        notes: 'VIP customer - expedited delivery',
    },
    {
        id: ORDER_IDS.ord_002,
        tenant_id: TENANT_ID,
        order_number: 'ORD-2026-002',
        customer_id: CUSTOMER_IDS.priya_patel,
        product_names: ['Basic Package'],
        product_ids: ['prod-basic-001'],
        quantity: 1,
        subtotal: 150000, // ₹1500
        discount: 0,
        shipping_charges: 5000, // ₹50
        total_amount: 155000, // ₹1550
        payment_method: 'COD',
        payment_status: 'Pending',
        order_status: 'Out for Delivery',
        tracking_number: 'TRK987654321',
        courier_name: 'Blue Dart',
        delivery_address: '456 Park Street',
        delivery_city: 'Ahmedabad',
        delivery_state: 'Gujarat',
        delivery_pincode: '380001',
        ordered_at: '2026-01-12T14:20:00',
        shipped_at: '2026-01-14T10:00:00',
        has_issue: false,
    },
    {
        id: ORDER_IDS.ord_003,
        tenant_id: TENANT_ID,
        order_number: 'ORD-2026-003',
        customer_id: CUSTOMER_IDS.sneha_reddy,
        deal_id: DEAL_IDS.sneha_gold,
        product_names: ['Gold Membership', 'Add-ons Package'],
        product_ids: ['prod-gold-002', 'prod-addon-003'],
        quantity: 2,
        subtotal: 350000, // ₹3500
        discount: 35000, // ₹350
        shipping_charges: 0, // Free shipping
        total_amount: 315000, // ₹3150
        payment_method: 'Card',
        payment_status: 'Paid',
        order_status: 'Packed',
        tracking_number: 'TRK456789123',
        courier_name: 'DTDC',
        delivery_address: '789 FC Road',
        delivery_city: 'Hyderabad',
        delivery_state: 'Telangana',
        delivery_pincode: '500001',
        ordered_at: '2026-01-17T16:30:00',
        shipped_at: undefined,
        has_issue: false,
        notes: 'Referral customer - free shipping applied',
    },
];

// ============================================
// MOCK TASKS
// ============================================

export const mockTasks: Task[] = [
    {
        id: 'task-001-8400-e29b-41d4-a716446655aa',
        tenant_id: TENANT_ID,
        subject: 'Send payment link to Rahul Sharma',
        task_owner: 'Pranav A',
        assigned_to_agent: 'Sales',
        due_date: '2026-01-20T10:00:00',
        status: 'Open',
        priority: 'High',
        customer_id: CUSTOMER_IDS.rahul_sharma,
        deal_id: DEAL_IDS.rahul_premium,
        auto_created: true,
        reminder_at: '2026-01-20T09:00:00',
        notes: 'Auto-created from deal - send WhatsApp payment link',
        created_at: '2026-01-18T14:00:00',
        updated_at: '2026-01-18T14:00:00',
    },
    {
        id: 'task-002-8400-e29b-41d4-a716446655bb',
        tenant_id: TENANT_ID,
        subject: 'Follow up with Priya - share comparison document',
        task_owner: 'Pranav A',
        assigned_to_agent: 'PreSales',
        due_date: '2026-01-22T15:00:00',
        status: 'In Progress',
        priority: 'Normal',
        customer_id: CUSTOMER_IDS.priya_patel,
        deal_id: DEAL_IDS.priya_basic,
        auto_created: false,
        notes: 'Customer requested competitor comparison',
        created_at: '2026-01-16T11:00:00',
        updated_at: '2026-01-18T10:00:00',
    },
    {
        id: 'task-003-8400-e29b-41d4-a716446655cc',
        tenant_id: TENANT_ID,
        subject: 'Re-engagement campaign for Amit Kumar',
        task_owner: 'Pranav A',
        assigned_to_agent: 'Marketing',
        due_date: '2026-01-25T14:00:00',
        status: 'Open',
        priority: 'Normal',
        customer_id: CUSTOMER_IDS.amit_kumar,
        auto_created: true,
        notes: 'Inactive customer - trigger win-back campaign',
        created_at: '2026-01-18T09:00:00',
        updated_at: '2026-01-18T09:00:00',
    },
    {
        id: 'task-004-8400-e29b-41d4-a716446655dd',
        tenant_id: TENANT_ID,
        subject: 'Process refund request',
        task_owner: 'Pranav A',
        assigned_to_agent: 'Support',
        due_date: '2026-01-21T12:00:00',
        status: 'Done',
        priority: 'High',
        customer_id: CUSTOMER_IDS.vikram_singh,
        order_id: ORDER_IDS.ord_001,
        auto_created: false,
        notes: 'Customer requested partial refund for damaged item',
        created_at: '2026-01-16T10:00:00',
        updated_at: '2026-01-17T14:00:00',
        completed_at: '2026-01-17T14:00:00',
    },
];

// ============================================
// MOCK CAMPAIGNS
// ============================================

export const mockCampaigns: Campaign[] = [
    {
        id: 'camp-001-8400-e29b-41d4-a716446655aa',
        tenant_id: TENANT_ID,
        campaign_name: 'Summer Sale 2026 - WhatsApp',
        campaign_type: 'Promotional',
        target_segment: ['VIP', 'Active'],
        target_customer_ids: [CUSTOMER_IDS.rahul_sharma, CUSTOMER_IDS.priya_patel],
        message_template: 'Hi {name}! 🌞 Summer Sale is here! Get up to 30% off on Premium Packages. Use code: SUMMER30. Shop now: {link}',
        offer_details: '30% discount on all premium packages',
        discount_code: 'SUMMER30',
        start_date: '2026-01-15',
        end_date: '2026-01-31',
        status: 'Active',
        total_sent: 1250,
        total_delivered: 1180,
        total_replied: 340,
        total_conversions: 28,
        created_at: '2026-01-10T09:00:00',
        updated_at: '2026-01-18T12:00:00',
    },
    {
        id: 'camp-002-8400-e29b-41d4-a716446655bb',
        tenant_id: TENANT_ID,
        campaign_name: 'Win-Back Inactive Customers',
        campaign_type: 'Win-Back',
        target_segment: ['Inactive', 'At Risk'],
        target_customer_ids: [CUSTOMER_IDS.amit_kumar],
        message_template: 'Hey {name}, we miss you! 😊 Come back and get 20% off your next purchase. Code: COMEBACK20',
        offer_details: '20% discount for inactive customers',
        discount_code: 'COMEBACK20',
        start_date: '2026-01-12',
        end_date: '2026-02-12',
        status: 'Active',
        total_sent: 450,
        total_delivered: 425,
        total_replied: 85,
        total_conversions: 12,
        created_at: '2026-01-08T10:00:00',
        updated_at: '2026-01-18T11:00:00',
    },
];

// ============================================
// MOCK AGENT INTERACTIONS
// ============================================

export const mockAgentInteractions: AgentInteraction[] = [
    {
        id: 'aint-001-8400-e29b-41d4-a716446655aa',
        tenant_id: TENANT_ID,
        agent_name: 'Sales',
        customer_id: CUSTOMER_IDS.rahul_sharma,
        deal_id: DEAL_IDS.rahul_premium,
        action_taken: 'Recommended premium package with 10% discount to overcome price objection',
        recommendations: {
            discount: '10%',
            delivery: 'Express (2 days)',
            reason: 'VIP customer with high intent',
        },
        confidence_score: 0.92,
        llm_provider: 'openai-gpt4',
        input_tokens: 1250,
        output_tokens: 380,
        total_cost_credits: 42,
        created_at: '2026-01-18T14:00:00',
    },
    {
        id: 'aint-002-8400-e29b-41d4-a716446655bb',
        tenant_id: TENANT_ID,
        agent_name: 'PreSales',
        customer_id: CUSTOMER_IDS.priya_patel,
        deal_id: DEAL_IDS.priya_basic,
        action_taken: 'Provided detailed feature comparison document to address competitor concerns',
        confidence_score: 0.78,
        llm_provider: 'openai-gpt4',
        input_tokens: 980,
        output_tokens: 520,
        total_cost_credits: 35,
        created_at: '2026-01-16T11:00:00',
    },
];

// ============================================
// MOCK CAMPAIGN TOUCHES
// ============================================

export const mockCampaignTouches: CampaignTouch[] = [
    {
        id: 'touc-001-8400-e29b-41d4-a716446655aa',
        tenant_id: TENANT_ID,
        campaign_id: 'camp-001-8400-e29b-41d4-a716446655aa',
        customer_id: CUSTOMER_IDS.rahul_sharma,
        message_id: 'msg-wa-001',
        sent_at: '2026-01-15T10:00:00',
        delivered_at: '2026-01-15T10:01:00',
        replied_at: '2026-01-15T10:15:00',
        converted: true,
        conversion_deal_id: DEAL_IDS.rahul_premium,
    },
    {
        id: 'touc-002-8400-e29b-41d4-a716446655bb',
        tenant_id: TENANT_ID,
        campaign_id: 'camp-001-8400-e29b-41d4-a716446655aa',
        customer_id: CUSTOMER_IDS.priya_patel,
        message_id: 'msg-wa-002',
        sent_at: '2026-01-15T10:05:00',
        delivered_at: '2026-01-15T10:06:00',
        replied_at: '2026-01-15T11:30:00',
        converted: false,
    },
    {
        id: 'touc-003-8400-e29b-41d4-a716446655cc',
        tenant_id: TENANT_ID,
        campaign_id: 'camp-002-8400-e29b-41d4-a716446655bb',
        customer_id: CUSTOMER_IDS.amit_kumar,
        message_id: 'msg-wa-003',
        sent_at: '2026-01-12T14:00:00',
        delivered_at: '2026-01-12T14:01:00',
        replied_at: undefined,
        converted: false,
    },
];
