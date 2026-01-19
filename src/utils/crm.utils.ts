// B2C CRM Utility Functions
// Currency, date, and formatting helpers

/**
 * Convert smallest currency unit (paise/cents) to display format
 * @param amount Amount in smallest unit (e.g., 10000 paise = ₹100)
 * @param currency Currency code (default: INR)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
    const divisor = currency === 'INR' ? 100 : 100; // paise or cents
    const displayAmount = amount / divisor;

    const currencySymbols: Record<string, string> = {
        INR: '₹',
        USD: '$',
        EUR: '€',
        GBP: '£',
    };

    const symbol = currencySymbols[currency] || currency;

    return `${symbol}${displayAmount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};

/**
 * Convert display currency to smallest unit
 * @param amount Display amount (e.g., 100.50)
 * @param currency Currency code (default: INR)
 * @returns Amount in smallest unit
 */
export const toSmallestUnit = (amount: number, currency: string = 'INR'): number => {
    const multiplier = currency === 'INR' ? 100 : 100;
    return Math.round(amount * multiplier);
};

/**
 * Format date to display format
 * @param isoDate ISO date string
 * @param format Format type: 'short', 'long', 'relative'
 * @returns Formatted date string
 */
export const formatDate = (isoDate: string, format: 'short' | 'long' | 'relative' = 'short'): string => {
    const date = new Date(isoDate);
    const now = new Date();

    if (format === 'relative') {
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }

    if (format === 'long') {
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    // Short format
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

/**
 * Calculate days between two dates
 * @param date1 First date (ISO string)
 * @param date2 Second date (ISO string), defaults to now
 * @returns Number of days
 */
export const daysBetween = (date1: string, date2?: string): number => {
    const d1 = new Date(date1);
    const d2 = date2 ? new Date(date2) : new Date();
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
};

/**
 * Check if a date is overdue
 * @param dueDate Due date (ISO string)
 * @returns True if overdue
 */
export const isOverdue = (dueDate: string): boolean => {
    return new Date(dueDate) < new Date();
};

/**
 * Get status badge color based on status type
 * @param status Status value
 * @param type Type of status
 * @returns Tailwind color class
 */
export const getStatusColor = (
    status: string,
    type: 'customer' | 'lead' | 'deal' | 'order' | 'payment' | 'task' | 'campaign' | 'priority'
): string => {
    // Handle priority separately
    if (type === 'priority') {
        const priorityColors: Record<string, string> = {
            High: 'bg-red-100 text-red-800',
            Normal: 'bg-blue-100 text-blue-800',
            Low: 'bg-gray-100 text-gray-800',
        };
        return priorityColors[status] || 'bg-gray-100 text-gray-800';
    }

    const colorMap: Record<string, string> = {
        // Customer Status
        New: 'bg-blue-100 text-blue-800',
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-gray-100 text-gray-800',
        Churned: 'bg-red-100 text-red-800',
        VIP: 'bg-purple-100 text-purple-800',

        // Lead Status
        Contacted: 'bg-blue-100 text-blue-800',
        Qualified: 'bg-green-100 text-green-800',
        'Not Interested': 'bg-orange-100 text-orange-800',
        Converted: 'bg-green-100 text-green-800',
        Junk: 'bg-red-100 text-red-800',

        // Deal Stages
        'Product Inquiry': 'bg-blue-100 text-blue-800',
        'Price Discussion': 'bg-purple-100 text-purple-800',
        'Ready to Buy': 'bg-green-100 text-green-800',
        'Payment Pending': 'bg-yellow-100 text-yellow-800',
        'Order Placed': 'bg-green-100 text-green-800',
        'Closed Won': 'bg-green-100 text-green-800',
        'Closed Lost': 'bg-red-100 text-red-800',
        'Closed Lost - Price': 'bg-orange-100 text-orange-800',

        // Order Status
        Processing: 'bg-blue-100 text-blue-800',
        Packed: 'bg-purple-100 text-purple-800',
        Shipped: 'bg-indigo-100 text-indigo-800',
        'Out for Delivery': 'bg-cyan-100 text-cyan-800',
        Delivered: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
        Returned: 'bg-orange-100 text-orange-800',

        // Payment Status
        Pending: 'bg-yellow-100 text-yellow-800',
        Paid: 'bg-green-100 text-green-800',
        Failed: 'bg-red-100 text-red-800',
        Refunded: 'bg-orange-100 text-orange-800',
        'Partially Refunded': 'bg-amber-100 text-amber-800',

        // Task Status
        Open: 'bg-gray-100 text-gray-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        Done: 'bg-green-100 text-green-800',

        // Campaign Status
        Draft: 'bg-gray-100 text-gray-800',
        Paused: 'bg-orange-100 text-orange-800',
        Completed: 'bg-blue-100 text-blue-800',
    };

    return colorMap[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Get priority badge color
 * @param priority Priority level
 * @returns Tailwind color class
 */
export const getPriorityColor = (priority: string): string => {
    const colorMap: Record<string, string> = {
        High: 'bg-red-100 text-red-800',
        Normal: 'bg-blue-100 text-blue-800',
        Low: 'bg-gray-100 text-gray-800',
    };

    return colorMap[priority] || 'bg-gray-100 text-gray-800';
};

/**
 * Get churn risk badge color
 * @param risk Churn risk level
 * @returns Tailwind color class
 */
export const getChurnRiskColor = (risk: string): string => {
    const colorMap: Record<string, string> = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-red-100 text-red-800',
    };

    return colorMap[risk] || 'bg-gray-100 text-gray-800';
};

/**
 * Format phone number to display format
 * @param phone Phone number (E.164 format)
 * @returns Formatted phone string
 */
export const formatPhoneNumber = (phone: string): string => {
    // Remove + prefix if present
    const cleaned = phone.replace(/^\+/, '');

    // Indian numbers (10 digits after country code)
    if (cleaned.startsWith('91') && cleaned.length === 12) {
        return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }

    // Default: just add + if not present
    return phone.startsWith('+') ? phone : `+${phone}`;
};

/**
 * Calculate average order value
 * @param totalRevenue Total revenue in smallest unit
 * @param totalOrders Total number of orders
 * @returns Average order value in smallest unit
 */
export const calculateAOV = (totalRevenue: number, totalOrders: number): number => {
    if (totalOrders === 0) return 0;
    return Math.round(totalRevenue / totalOrders);
};

/**
 * Get initials from name
 * @param name Full name
 * @returns Two-letter initials
 */
export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

/**
 * Truncate text with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @returns Truncated text
 */
export const truncate = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
};

/**
 * Format large numbers with K/M suffix
 * @param num Number to format
 * @returns Formatted string
 */
export const formatNumber = (num: number): string => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`; // Crores (Indian)
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`; // Lakhs (Indian)
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
};

/**
 * Calculate percentage change
 * @param current Current value
 * @param previous Previous value
 * @returns Percentage change
 */
export const percentageChange = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
};

/**
 * Generate random UUID (for mock data)
 * @returns UUID string
 */
export const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
