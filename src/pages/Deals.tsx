import { useState } from 'react';
import {
    DollarSign, Plus, Filter, Search, Grid, List, MoreVertical,
    Calendar, User, Building2, X, RefreshCw, Download,
    ChevronDown, Eye, Edit, Trash2, ArrowUpDown, Target
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface Deal {
    id: string;
    dealName: string;
    accountName: string;
    contactName?: string;
    amount: number;
    closingDate: string;
    stage: DealStage;
    probability: number;
    expectedRevenue: number;
    dealOwner: string;
    type?: string;
    leadSource?: string;
    nextStep?: string;
    description?: string;
}

type DealStage =
    | 'Qualification'
    | 'Needs Analysis'
    | 'Value Proposition'
    | 'Identify Decision Makers'
    | 'Proposal/Price Quote'
    | 'Negotiation/Review'
    | 'Closed Won'
    | 'Closed Lost'
    | 'Closed Lost to Competition';

const mockDeals: Deal[] = [
    {
        id: '1',
        dealName: 'Benton',
        accountName: 'Benton (Sample)',
        contactName: 'John Butt (Sample)',
        amount: 250000,
        closingDate: '2026-01-28',
        stage: 'Qualification',
        probability: 10,
        expectedRevenue: 25000,
        dealOwner: 'Pranav A',
        nextStep: 'Initial discovery call'
    },
    {
        id: '2',
        dealName: 'Chanay',
        accountName: 'Chanay (Sample)',
        contactName: 'Josephine Darakjy (Sample)',
        amount: 55000,
        closingDate: '2026-02-15',
        stage: 'Needs Analysis',
        probability: 20,
        expectedRevenue: 11000,
        dealOwner: 'Pranav A',
        nextStep: 'Requirements gathering'
    },
    {
        id: '3',
        dealName: 'Chemel',
        accountName: 'Chemel (Sample)',
        contactName: 'James Venere (Sample)',
        amount: 70000,
        closingDate: '2026-02-28',
        stage: 'Value Proposition',
        probability: 40,
        expectedRevenue: 28000,
        dealOwner: 'Pranav A',
        nextStep: 'Present value proposition'
    },
    {
        id: '4',
        dealName: 'King',
        accountName: 'King (Sample)',
        contactName: 'Kris Marrier (Sample)',
        amount: 105000,
        closingDate: '2026-01-30',
        stage: 'Identify Decision Makers',
        probability: 60,
        expectedRevenue: 63000,
        dealOwner: 'Pranav A',
        nextStep: 'Schedule stakeholder meeting'
    },
    {
        id: '5',
        dealName: 'Feltz Printing Service',
        accountName: 'Feltz Printing Service',
        contactName: 'Capla Paprocki (Sample)',
        amount: 45000,
        closingDate: '2026-03-15',
        stage: 'Proposal/Price Quote',
        probability: 70,
        expectedRevenue: 31500,
        dealOwner: 'Pranav A',
        nextStep: 'Send final proposal'
    }
];

const stages: DealStage[] = [
    'Qualification',
    'Needs Analysis',
    'Value Proposition',
    'Identify Decision Makers',
    'Proposal/Price Quote',
    'Negotiation/Review',
    'Closed Won',
    'Closed Lost',
    'Closed Lost to Competition'
];

const dealTypes = ['New Business', 'Existing Business', 'Renewal'];
const leadSources = ['Social Media', 'Advertisement', 'Referral', 'Website', 'Trade Show', 'Cold Call'];

export default function Deals() {
    const [viewMode, setViewMode] = useState<'stage' | 'list'>('stage');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [deals, setDeals] = useState<Deal[]>(mockDeals);
    const [selectedDeals, setSelectedDeals] = useState<string[]>([]);

    const [filters, setFilters] = useState({
        stage: 'all',
        owner: 'all',
        accountName: '',
        minAmount: 0
    });

    const getStageColor = (stage: DealStage) => {
        const stageColors: Record<DealStage, string> = {
            'Qualification': 'bg-slate-100 text-slate-700',
            'Needs Analysis': 'bg-blue-100 text-blue-700',
            'Value Proposition': 'bg-indigo-100 text-indigo-700',
            'Identify Decision Makers': 'bg-purple-100 text-purple-700',
            'Proposal/Price Quote': 'bg-pink-100 text-pink-700',
            'Negotiation/Review': 'bg-orange-100 text-orange-700',
            'Closed Won': 'bg-green-100 text-green-700',
            'Closed Lost': 'bg-red-100 text-red-700',
            'Closed Lost to Competition': 'bg-red-100 text-red-700'
        };
        return stageColors[stage];
    };

    const getStagePercentage = (stage: DealStage): number => {
        const percentages: Record<DealStage, number> = {
            'Qualification': 10,
            'Needs Analysis': 20,
            'Value Proposition': 40,
            'Identify Decision Makers': 60,
            'Proposal/Price Quote': 70,
            'Negotiation/Review': 80,
            'Closed Won': 100,
            'Closed Lost': 0,
            'Closed Lost to Competition': 0
        };
        return percentages[stage];
    };

    const filteredDeals = deals.filter(deal => {
        const matchesSearch =
            deal.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deal.accountName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStage = filters.stage === 'all' || deal.stage === filters.stage;
        const matchesAmount = deal.amount >= filters.minAmount;

        return matchesSearch && matchesStage && matchesAmount;
    });

    const dealsByStage = stages.reduce((acc, stage) => {
        acc[stage] = filteredDeals.filter(deal => deal.stage === stage);
        return acc;
    }, {} as Record<DealStage, Deal[]>);

    const calculateStageTotal = (stage: DealStage) => {
        return dealsByStage[stage].reduce((sum, deal) => sum + deal.amount, 0);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedDeals(filteredDeals.map(d => d.id));
        } else {
            setSelectedDeals([]);
        }
    };

    const handleSelectDeal = (dealId: string, checked: boolean) => {
        if (checked) {
            setSelectedDeals([...selectedDeals, dealId]);
        } else {
            setSelectedDeals(selectedDeals.filter(id => id !== dealId));
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                                <DollarSign className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Deals</h1>
                                <p className="text-sm text-slate-600">{filteredDeals.length} opportunities • {formatCurrency(filteredDeals.reduce((sum, d) => sum + d.amount, 0))} total value</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilterPanel(!showFilterPanel)}
                                className="gap-2"
                            >
                                <Filter className="w-4 h-4" />
                                Filter
                                {Object.values(filters).some(
                                    v => (typeof v === "string" && v !== "all" && v !== "") ||
                                        (typeof v === "number" && v !== 0)
                                ) && (
                                        <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                            !
                                        </Badge>
                                    )}
                            </Button>

                            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                                <Button
                                    variant={viewMode === 'stage' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('stage')}
                                    className="h-8 px-3 gap-2"
                                >
                                    <Grid className="w-4 h-4" />
                                    STAGEVIEW
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="h-8 px-3 gap-2"
                                >
                                    <List className="w-4 h-4" />
                                    List
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
                                    <DropdownMenuItem>Forecast Report</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button
                                size="sm"
                                onClick={() => setShowCreateDialog(true)}
                                className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30"
                            >
                                <Plus className="w-4 h-4" />
                                Create Deal
                            </Button>
                        </div>
                    </div>

                    {/* Quick Filters */}
                    <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
                        <Button variant="outline" size="sm" className="whitespace-nowrap bg-blue-50 border-blue-300 text-blue-700">
                            <Target className="w-4 h-4 mr-2" />
                            All Locked Deals
                        </Button>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                            All Deals
                        </Button>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                            Closing Next Month
                        </Button>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                            Closing This Month
                        </Button>
                        <Button variant="outline" size="sm" className="whitespace-nowrap">
                            My Deals
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="Search deals by name, account..."
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
                    {selectedDeals.length > 0 && (
                        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-green-900">
                                {selectedDeals.length} deal{selectedDeals.length > 1 ? 's' : ''} selected
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
                                    onClick={() => setSelectedDeals([])}
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
                                <h2 className="text-lg font-semibold text-slate-900">Filter Deals by</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setFilters({
                                        stage: 'all',
                                        owner: 'all',
                                        accountName: '',
                                        minAmount: 0
                                    })}
                                    className="text-green-600"
                                >
                                    Clear All
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {/* System Filters */}
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 mb-3">System Defined Filters</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Touched Records</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Untouched Records</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Record Action</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Related Records Action</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Locked</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Latest Email Status</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Activities</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Cadences</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Filter by Fields */}
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 mb-3">Filter By Fields</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">Account Name</Label>
                                            <Input
                                                placeholder="Search account..."
                                                value={filters.accountName}
                                                onChange={(e) => setFilters({ ...filters, accountName: e.target.value })}
                                                className="text-sm"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">Stage</Label>
                                            <Select
                                                value={filters.stage}
                                                onValueChange={(value) => setFilters({ ...filters, stage: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Stages</SelectItem>
                                                    {stages.map(stage => (
                                                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">
                                                Minimum Amount: {formatCurrency(filters.minAmount)}
                                            </Label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="500000"
                                                step="10000"
                                                value={filters.minAmount}
                                                onChange={(e) => setFilters({ ...filters, minAmount: parseInt(e.target.value) })}
                                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                            />
                                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                                <span>$0</span>
                                                <span>$250K</span>
                                                <span>$500K</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {viewMode === 'stage' ? (
                        <div className="flex gap-4 h-full overflow-x-auto pb-4">
                            {stages.slice(0, 7).map((stage) => {
                                const stageDeals = dealsByStage[stage];
                                const stageTotal = calculateStageTotal(stage);
                                const percentage = getStagePercentage(stage);

                                return (
                                    <div
                                        key={stage}
                                        className="flex-shrink-0 w-80 bg-slate-50 rounded-xl border border-slate-200"
                                    >
                                        <div className="p-4 border-b border-slate-200 bg-white rounded-t-xl">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">{stage}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="secondary" className="rounded-full">
                                                            {stageDeals.length}
                                                        </Badge>
                                                        <span className="text-xs text-slate-600">{percentage}%</span>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <div className="text-lg font-bold text-green-600">
                                                {formatCurrency(stageTotal)}
                                            </div>
                                        </div>

                                        <div className="p-3 space-y-3 max-h-[calc(100vh-350px)] overflow-y-auto">
                                            {stageDeals.length === 0 && (
                                                <div className="text-center py-8 text-slate-400 text-sm">
                                                    No deals in this stage
                                                </div>
                                            )}

                                            {stageDeals.map((deal) => (
                                                <div
                                                    key={deal.id}
                                                    className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-lg hover:border-green-300 transition-all duration-200 cursor-pointer group"
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <Checkbox
                                                            checked={selectedDeals.includes(deal.id)}
                                                            onCheckedChange={(checked) => handleSelectDeal(deal.id, checked as boolean)}
                                                        />
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                                                                    <MoreVertical className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                                <DropdownMenuItem>Clone</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>

                                                    <h4 className="font-semibold text-slate-900 mb-1">{deal.dealName}</h4>
                                                    <p className="text-sm text-slate-600 mb-3">{deal.accountName}</p>

                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-slate-600">Amount</span>
                                                            <span className="font-semibold text-green-600">{formatCurrency(deal.amount)}</span>
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <span className="text-slate-600">Probability</span>
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                                                                        style={{ width: `${deal.probability}%` }}
                                                                    />
                                                                </div>
                                                                <span className="text-xs font-medium">{deal.probability}%</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{new Date(deal.closingDate).toLocaleDateString()}</span>
                                                        </div>

                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <User className="w-4 h-4" />
                                                            <span className="truncate">{deal.dealOwner}</span>
                                                        </div>
                                                    </div>

                                                    {deal.nextStep && (
                                                        <div className="mt-3 pt-3 border-t border-slate-100">
                                                            <div className="text-xs text-slate-500">Next Step</div>
                                                            <div className="text-sm text-slate-700 truncate">{deal.nextStep}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-6 py-4 text-left">
                                                <Checkbox
                                                    checked={selectedDeals.length === filteredDeals.length && filteredDeals.length > 0}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors">
                                                    Deal Name
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Account
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors">
                                                    Amount
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors">
                                                    Closing Date
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Stage
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Probability
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Owner
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {filteredDeals.map((deal) => (
                                            <tr
                                                key={deal.id}
                                                className="hover:bg-green-50/50 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <Checkbox
                                                        checked={selectedDeals.includes(deal.id)}
                                                        onCheckedChange={(checked) => handleSelectDeal(deal.id, checked as boolean)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-900">{deal.dealName}</div>
                                                    {deal.nextStep && (
                                                        <div className="text-sm text-slate-500 mt-1">Next: {deal.nextStep}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-4 h-4 text-slate-400" />
                                                        <span className="text-slate-900">{deal.accountName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="font-semibold text-green-600">{formatCurrency(deal.amount)}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {new Date(deal.closingDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge className={getStageColor(deal.stage)}>
                                                        {deal.stage}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                                                                style={{ width: `${deal.probability}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-700">{deal.probability}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {deal.dealOwner}
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
                                                                <DropdownMenuItem>Clone Deal</DropdownMenuItem>
                                                                <DropdownMenuItem>Create Task</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
                    )}

                    {filteredDeals.length === 0 && (
                        <div className="text-center py-12">
                            <DollarSign className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No deals found</h3>
                            <p className="text-slate-600 mb-4">
                                {searchQuery || Object.values(filters).some(
                                    v => (typeof v === "string" && v !== "all" && v !== "") ||
                                        (typeof v === "number" && v !== 0)
                                )
                                    ? 'Try adjusting your search or filters'
                                    : 'Get started by creating your first deal'}
                            </p>
                            <Button onClick={() => setShowCreateDialog(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Deal
                            </Button>
                        </div>
                    )}
                </main>
            </div>

            {/* Create Deal Dialog */}
            <CreateDealDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onSuccess={(newDeal) => {
                    setDeals([...deals, newDeal]);
                    setShowCreateDialog(false);
                }}
            />
        </div>
    );
}

// Create Deal Dialog Component
function CreateDealDialog({
    open,
    onOpenChange,
    onSuccess
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (deal: Deal) => void;
}) {
    const [formData, setFormData] = useState({
        dealName: '',
        accountName: '',
        contactName: '',
        amount: '',
        closingDate: '',
        stage: 'Qualification' as DealStage,
        type: '',
        leadSource: '',
        nextStep: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const amount = parseFloat(formData.amount) || 0;
        const probability = getStagePercentage(formData.stage);

        const newDeal: Deal = {
            id: String(Date.now()),
            ...formData,
            amount,
            probability,
            expectedRevenue: amount * (probability / 100),
            dealOwner: 'Pranav A'
        };

        onSuccess(newDeal);

        // Reset form
        setFormData({
            dealName: '',
            accountName: '',
            contactName: '',
            amount: '',
            closingDate: '',
            stage: 'Qualification',
            type: '',
            leadSource: '',
            nextStep: '',
            description: ''
        });
    };

    const getStagePercentage = (stage: DealStage): number => {
        const percentages: Record<DealStage, number> = {
            'Qualification': 10,
            'Needs Analysis': 20,
            'Value Proposition': 40,
            'Identify Decision Makers': 60,
            'Proposal/Price Quote': 70,
            'Negotiation/Review': 80,
            'Closed Won': 100,
            'Closed Lost': 0,
            'Closed Lost to Competition': 0
        };
        return percentages[stage];
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                            <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        Create Deal
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Deal Information */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Deal Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Label htmlFor="dealName">Deal Name *</Label>
                                <Input
                                    id="dealName"
                                    value={formData.dealName}
                                    onChange={(e) => setFormData({ ...formData, dealName: e.target.value })}
                                    required
                                    placeholder="Enter deal name..."
                                />
                            </div>

                            <div>
                                <Label htmlFor="accountName">Account Name *</Label>
                                <Input
                                    id="accountName"
                                    value={formData.accountName}
                                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="contactName">Contact Name</Label>
                                <Input
                                    id="contactName"
                                    value={formData.contactName}
                                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dealTypes.map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="leadSource">Lead Source</Label>
                                <Select
                                    value={formData.leadSource}
                                    onValueChange={(value) => setFormData({ ...formData, leadSource: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select source" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {leadSources.map(source => (
                                            <SelectItem key={source} value={source}>{source}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="nextStep">Next Step</Label>
                                <Input
                                    id="nextStep"
                                    value={formData.nextStep}
                                    onChange={(e) => setFormData({ ...formData, nextStep: e.target.value })}
                                    placeholder="What's the next action?"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Revenue & Forecast */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Revenue & Forecast</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="amount">Amount *</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    required
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <Label htmlFor="closingDate">Closing Date *</Label>
                                <Input
                                    id="closingDate"
                                    type="date"
                                    value={formData.closingDate}
                                    onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="stage">Stage *</Label>
                                <Select
                                    value={formData.stage}
                                    onValueChange={(value: DealStage) => setFormData({ ...formData, stage: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {stages.map(stage => (
                                            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Probability</Label>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all"
                                            style={{ width: `${getStagePercentage(formData.stage)}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700 min-w-[3rem]">
                                        {getStagePercentage(formData.stage)}%
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <Label>Expected Revenue</Label>
                                <div className="mt-2 text-2xl font-bold text-green-600">
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0
                                    }).format((parseFloat(formData.amount) || 0) * (getStagePercentage(formData.stage) / 100))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            placeholder="Enter deal description..."
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={(e) => {
                                handleSubmit(e as any);
                                setFormData({
                                    dealName: '',
                                    accountName: '',
                                    contactName: '',
                                    amount: '',
                                    closingDate: '',
                                    stage: 'Qualification',
                                    type: '',
                                    leadSource: '',
                                    nextStep: '',
                                    description: ''
                                });
                            }}
                        >
                            Save and New
                        </Button>
                        <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
