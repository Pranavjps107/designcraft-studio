import { useState } from 'react';
import {
    Package, Plus, Filter, Download, Search, Grid, List,
    MoreVertical, Phone, Mail, MapPin, TrendingUp,
    Edit, Trash2, Eye, X, ChevronDown,
    ArrowUpDown, RefreshCw, DollarSign, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// B2C Order Interface (aligned with crm.orders schema)
interface Order {
    id: string;
    order_number: string;
    customer_id: string;
    customer_name: string;
    deal_id?: string;
    product_names: string[];
    total_amount: number;
    payment_status: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
    order_status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    delivery_address?: string;
    delivery_city?: string;
    delivery_state?: string;
    delivery_pincode?: string;
    created_at: string;
    delivered_at?: string;
}

const mockOrders: Order[] = [
    {
        id: '1',
        order_number: 'ORD-2026-001',
        customer_id: 'cust_001',
        customer_name: 'Anjali Sharma',
        deal_id: 'deal_001',
        product_names: ['Premium Package', 'Gold Membership'],
        total_amount: 4500,
        payment_status: 'Paid',
        order_status: 'Delivered',
        delivery_address: '123 MG Road',
        delivery_city: 'Bangalore',
        delivery_state: 'Karnataka',
        delivery_pincode: '560001',
        created_at: '2026-01-10T10:30:00',
        delivered_at: '2026-01-15T14:20:00'
    },
    {
        id: '2',
        order_number: 'ORD-2026-002',
        customer_id: 'cust_002',
        customer_name: 'Rajesh Kumar',
        product_names: ['Basic Package'],
        total_amount: 1500,
        payment_status: 'Paid',
        order_status: 'Shipped',
        delivery_address: '456 Park Street',
        delivery_city: 'Mumbai',
        delivery_state: 'Maharashtra',
        delivery_pincode: '400001',
        created_at: '2026-01-12T14:20:00'
    },
    {
        id: '3',
        order_number: 'ORD-2026-003',
        customer_id: 'cust_003',
        customer_name: 'Priya Patel',
        product_names: ['Premium Package', 'Add-ons'],
        total_amount: 5200,
        payment_status: 'Pending',
        order_status: 'Processing',
        delivery_address: '789 FC Road',
        delivery_city: 'Pune',
        delivery_state: 'Maharashtra',
        delivery_pincode: '411005',
        created_at: '2026-01-17T09:15:00'
    },
    {
        id: '4',
        order_number: 'ORD-2026-004',
        customer_id: 'cust_004',
        customer_name: 'Amit Singh',
        product_names: ['Standard Package'],
        total_amount: 2800,
        payment_status: 'Failed',
        order_status: 'Cancelled',
        delivery_city: 'Delhi',
        delivery_state: 'Delhi',
        created_at: '2026-01-16T11:00:00'
    }
];

const paymentStatuses: Order['payment_status'][] = ['Pending', 'Paid', 'Failed', 'Refunded'];
const orderStatuses: Order['order_status'][] = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function Orders() {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [orders] = useState<Order[]>(mockOrders);

    const [filters, setFilters] = useState({
        paymentStatus: 'all',
        orderStatus: 'all',
        minAmount: 0
    });

    const getPaymentStatusColor = (status: Order['payment_status']) => {
        const colors: Record<Order['payment_status'], string> = {
            'Pending': 'bg-yellow-100 text-yellow-700',
            'Paid': 'bg-green-100 text-green-700',
            'Failed': 'bg-red-100 text-red-700',
            'Refunded': 'bg-orange-100 text-orange-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getOrderStatusColor = (status: Order['order_status']) => {
        const colors: Record<Order['order_status'], string> = {
            'Processing': 'bg-blue-100 text-blue-700',
            'Shipped': 'bg-purple-100 text-purple-700',
            'Delivered': 'bg-green-100 text-green-700',
            'Cancelled': 'bg-red-100 text-red-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedOrders(filteredOrders.map(o => o.id));
        } else {
            setSelectedOrders([]);
        }
    };

    const handleSelectOrder = (orderId: string, checked: boolean) => {
        if (checked) {
            setSelectedOrders([...selectedOrders, orderId]);
        } else {
            setSelectedOrders(selectedOrders.filter(id => id !== orderId));
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.product_names.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesPaymentStatus = filters.paymentStatus === 'all' || order.payment_status === filters.paymentStatus;
        const matchesOrderStatus = filters.orderStatus === 'all' || order.order_status === filters.orderStatus;
        const matchesAmount = order.total_amount >= filters.minAmount;

        return matchesSearch && matchesPaymentStatus && matchesOrderStatus && matchesAmount;
    });

    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total_amount, 0);
    const paidOrders = filteredOrders.filter(o => o.payment_status === 'Paid').length;
    const deliveredOrders = filteredOrders.filter(o => o.order_status === 'Delivered').length;

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
                                <p className="text-sm text-slate-600">{filteredOrders.length} total orders • ₹{totalRevenue.toLocaleString()} revenue</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Stats */}
                            <div className="flex items-center gap-4 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                                <div className="text-center">
                                    <div className="text-xs text-green-600 font-medium">Paid</div>
                                    <div className="text-lg font-bold text-green-700">{paidOrders}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-emerald-600 font-medium">Delivered</div>
                                    <div className="text-lg font-bold text-emerald-700">{deliveredOrders}</div>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilterPanel(!showFilterPanel)}
                                className="gap-2"
                            >
                                <Filter className="w-4 h-4" />
                                Filters
                                {Object.values(filters).some(v => v !== 'all' && v !== 0) && (
                                    <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                        !
                                    </Badge>
                                )}
                            </Button>

                            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="h-8 w-8 p-0"
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className="h-8 w-8 p-0"
                                >
                                    <Grid className="w-4 h-4" />
                                </Button>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Download className="w-4 h-4" />
                                        Export
                                        <ChevronDown className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                    <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                                    <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="Search orders by number, customer, or product..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </Button>
                    </div>

                    {/* Selected Actions Bar */}
                    {selectedOrders.length > 0 && (
                        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-green-900">
                                {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
                            </span>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Edit className="w-4 h-4" />
                                    Bulk Edit
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedOrders([])}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Filter Panel */}
                {showFilterPanel && (
                    <aside className="w-80 bg-white border-r border-slate-200 overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setFilters({
                                        paymentStatus: 'all',
                                        orderStatus: 'all',
                                        minAmount: 0
                                    })}
                                    className="text-green-600"
                                >
                                    Clear All
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {/* Payment Status */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">Payment Status</Label>
                                    <Select
                                        value={filters.paymentStatus}
                                        onValueChange={(value: string) => setFilters({ ...filters, paymentStatus: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            {paymentStatuses.map(status => (
                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Order Status */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">Order Status</Label>
                                    <Select
                                        value={filters.orderStatus}
                                        onValueChange={(value: string) => setFilters({ ...filters, orderStatus: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            {orderStatuses.map(status => (
                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Minimum Amount */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">
                                        Minimum Amount: ₹{filters.minAmount}
                                    </Label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        step="500"
                                        value={filters.minAmount}
                                        onChange={(e) => setFilters({ ...filters, minAmount: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>₹0</span>
                                        <span>₹5,000</span>
                                        <span>₹10,000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {viewMode === 'list' ? (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-6 py-4 text-left">
                                                <Checkbox
                                                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Order #</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Products</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Payment</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Created</th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {filteredOrders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="hover:bg-green-50/50 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <Checkbox
                                                        checked={selectedOrders.includes(order.id)}
                                                        onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-900">{order.order_number}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-900">{order.customer_name}</div>
                                                    {order.delivery_city && (
                                                        <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {order.delivery_city}, {order.delivery_state}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-slate-600">
                                                        {order.product_names.join(', ')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1 font-semibold text-slate-900">
                                                        <DollarSign className="w-4 h-4" />
                                                        ₹{order.total_amount.toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge className={getPaymentStatusColor(order.payment_status)}>
                                                        {order.payment_status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge className={getOrderStatusColor(order.order_status)}>
                                                        {order.order_status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                    <MoreVertical className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                                <DropdownMenuItem>Track Shipment</DropdownMenuItem>
                                                                <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="font-semibold text-slate-900">{order.order_number}</div>
                                            <div className="text-sm text-slate-600">{order.customer_name}</div>
                                        </div>
                                        <Badge className={getOrderStatusColor(order.order_status)}>
                                            {order.order_status}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="text-sm text-slate-600">
                                            {order.product_names.join(', ')}
                                        </div>
                                        <div className="flex items-center gap-2 text-lg font-bold text-green-600">
                                            <DollarSign className="w-5 h-5" />
                                            ₹{order.total_amount.toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <Badge className={getPaymentStatusColor(order.payment_status)} variant="secondary">
                                            {order.payment_status}
                                        </Badge>
                                        <div className="text-xs text-slate-500">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No orders found</h3>
                            <p className="text-slate-600">
                                {searchQuery || Object.values(filters).some(v => v !== 'all' && v !== 0)
                                    ? 'Try adjusting your search or filters'
                                    : 'Orders will appear here once customers make purchases'}
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
