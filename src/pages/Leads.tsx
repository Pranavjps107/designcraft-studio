import { useState } from 'react';
import {
    Users, Plus, Filter, Download, Upload, Search, Grid, List,
    MoreVertical, Phone, Mail, Building2, Calendar, TrendingUp,
    Star, Edit, Trash2, Eye, MessageSquare, X, ChevronDown,
    ArrowUpDown, RefreshCw
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

interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    company: string;
    title: string;
    phone: string;
    mobile: string;
    email: string;
    leadSource: string;
    leadSubSource?: string;
    leadStatus: string;
    leadScore: number;
    ranking?: string;
    tone?: string;
    industry?: string;
    annualRevenue?: number;
    employees?: number;
    rating?: number;
    country?: string;
    city?: string;
    leadOwner: string;
    createdTime: string;
    imageUrl?: string;
    description?: string;
}

const mockLeads: Lead[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        company: 'Tech Corp',
        title: 'CTO',
        phone: '+1234567890',
        mobile: '+1234567891',
        email: 'john.doe@techcorp.com',
        leadSource: 'Social Media',
        leadSubSource: 'LinkedIn',
        leadStatus: 'Qualified',
        leadScore: 85,
        ranking: 'Active',
        tone: 'Interested',
        industry: 'Technology',
        annualRevenue: 5000000,
        employees: 50,
        rating: 4,
        country: 'USA',
        city: 'San Francisco',
        leadOwner: 'Pranav A',
        createdTime: '2026-01-15T10:30:00',
        imageUrl: '/avatars/john.jpg'
    },
    {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        company: 'Marketing Plus',
        title: 'Marketing Director',
        phone: '+1234567892',
        mobile: '+1234567893',
        email: 'sarah.j@marketingplus.com',
        leadSource: 'Advertisement',
        leadStatus: 'Pre-Qualified',
        leadScore: 72,
        tone: 'Eager',
        industry: 'Marketing',
        country: 'USA',
        city: 'New York',
        leadOwner: 'Pranav A',
        createdTime: '2026-01-16T14:20:00'
    },
    {
        id: '3',
        firstName: 'Michael',
        lastName: 'Chen',
        company: 'Global Ventures',
        title: 'VP Sales',
        phone: '+1234567894',
        mobile: '+1234567895',
        email: 'mchen@globalventures.com',
        leadSource: 'Referral',
        leadStatus: 'Contacted',
        leadScore: 91,
        ranking: 'Acquired',
        tone: 'Cool',
        industry: 'Finance',
        country: 'Singapore',
        city: 'Singapore',
        leadOwner: 'Pranav A',
        createdTime: '2026-01-17T09:15:00'
    }
];

const leadSources = [
    'Social Media', 'WhatsApp', 'Facebook', 'Instagram',
    'Advertisement', 'Cold Call', 'Referral', 'Offline Store',
    'Manual Upload', 'Sales Email Alias', 'Live Chat', 'Online Store'
];

const leadStatuses = [
    'Attempted to Contact', 'Contact in Future', 'Contacted',
    'Not Contacted', 'Pre-Qualified', 'Qualified', 'Not Qualified',
    'Junk Lead', 'Lost Lead'
];

const rankings = ['Acquired', 'Active', 'Market Failed', 'Project Cancelled', 'Shut Down'];
const tones = ['Cool', 'Eager', 'Interested', 'Anger'];
const industries = ['Technology', 'Marketing', 'Finance', 'Healthcare', 'Manufacturing', 'Retail'];

export default function Leads() {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
    const [leads, setLeads] = useState<Lead[]>(mockLeads);

    // Filter states
    const [filters, setFilters] = useState({
        leadSource: 'all',
        leadStatus: 'all',
        ranking: 'all',
        industry: 'all',
        minScore: 0,
        touched: false,
        untouched: false
    });

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            'Qualified': 'bg-green-100 text-green-700',
            'Pre-Qualified': 'bg-blue-100 text-blue-700',
            'Contacted': 'bg-purple-100 text-purple-700',
            'Not Contacted': 'bg-gray-100 text-gray-700',
            'Lost Lead': 'bg-red-100 text-red-700',
            'Junk Lead': 'bg-orange-100 text-orange-700'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-700';
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 bg-green-50';
        if (score >= 60) return 'text-blue-600 bg-blue-50';
        if (score >= 40) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedLeads(leads.map(l => l.id));
        } else {
            setSelectedLeads([]);
        }
    };

    const handleSelectLead = (leadId: string, checked: boolean) => {
        if (checked) {
            setSelectedLeads([...selectedLeads, leadId]);
        } else {
            setSelectedLeads(selectedLeads.filter(id => id !== leadId));
        }
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSource = filters.leadSource === 'all' || lead.leadSource === filters.leadSource;
        const matchesStatus = filters.leadStatus === 'all' || lead.leadStatus === filters.leadStatus;
        const matchesRanking = filters.ranking === 'all' || lead.ranking === filters.ranking;
        const matchesIndustry = filters.industry === 'all' || lead.industry === filters.industry;
        const matchesScore = lead.leadScore >= filters.minScore;

        return matchesSearch && matchesSource && matchesStatus && matchesRanking && matchesIndustry && matchesScore;
    });

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
                                <p className="text-sm text-slate-600">{filteredLeads.length} total leads</p>
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
                                Filters
                                {Object.values(filters).some(v => v !== 'all' && v !== 0 && v !== false) && (
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

                            <Button
                                size="sm"
                                onClick={() => setShowCreateDialog(true)}
                                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30"
                            >
                                <Plus className="w-4 h-4" />
                                Create Lead
                            </Button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="Search leads by name, company, email..."
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
                    {selectedLeads.length > 0 && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-900">
                                {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
                            </span>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Send Email
                                </Button>
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
                                    onClick={() => setSelectedLeads([])}
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
                                        leadSource: 'all',
                                        leadStatus: 'all',
                                        ranking: 'all',
                                        industry: 'all',
                                        minScore: 0,
                                        touched: false,
                                        untouched: false
                                    })}
                                    className="text-blue-600"
                                >
                                    Clear All
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {/* System Filters */}
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 mb-3">System Filters</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={filters.touched}
                                                onCheckedChange={(checked) =>
                                                    setFilters({ ...filters, touched: checked as boolean })
                                                }
                                            />
                                            <span className="text-sm text-slate-600">Touched Records</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                checked={filters.untouched}
                                                onCheckedChange={(checked) =>
                                                    setFilters({ ...filters, untouched: checked as boolean })
                                                }
                                            />
                                            <span className="text-sm text-slate-600">Untouched Records</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Lead Source */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">Lead Source</Label>
                                    <Select
                                        value={filters.leadSource}
                                        onValueChange={(value) => setFilters({ ...filters, leadSource: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Sources</SelectItem>
                                            {leadSources.map(source => (
                                                <SelectItem key={source} value={source}>{source}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Lead Status */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">Lead Status</Label>
                                    <Select
                                        value={filters.leadStatus}
                                        onValueChange={(value) => setFilters({ ...filters, leadStatus: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            {leadStatuses.map(status => (
                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Ranking */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">Ranking</Label>
                                    <Select
                                        value={filters.ranking}
                                        onValueChange={(value) => setFilters({ ...filters, ranking: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Rankings</SelectItem>
                                            {rankings.map(rank => (
                                                <SelectItem key={rank} value={rank}>{rank}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Industry */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">Industry</Label>
                                    <Select
                                        value={filters.industry}
                                        onValueChange={(value) => setFilters({ ...filters, industry: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Industries</SelectItem>
                                            {industries.map(industry => (
                                                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Lead Score */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">
                                        Minimum Lead Score: {filters.minScore}
                                    </Label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={filters.minScore}
                                        onChange={(e) => setFilters({ ...filters, minScore: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>0</span>
                                        <span>50</span>
                                        <span>100</span>
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
                                                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors">
                                                    Lead Name
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors">
                                                    Company
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Contact
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Lead Source
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors">
                                                    Score
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Owner
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Created
                                            </th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        {filteredLeads.map((lead) => (
                                            <tr
                                                key={lead.id}
                                                className="hover:bg-blue-50/50 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <Checkbox
                                                        checked={selectedLeads.includes(lead.id)}
                                                        onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                                            {lead.firstName[0]}{lead.lastName[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-slate-900">
                                                                {lead.firstName} {lead.lastName}
                                                            </div>
                                                            <div className="text-sm text-slate-500">{lead.title}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-4 h-4 text-slate-400" />
                                                        <span className="font-medium text-slate-900">{lead.company}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <Phone className="w-3 h-3" />
                                                            {lead.phone}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <Mail className="w-3 h-3" />
                                                            {lead.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge variant="outline" className="font-normal">
                                                        {lead.leadSource}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge className={getStatusColor(lead.leadStatus)}>
                                                        {lead.leadStatus}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg font-semibold ${getScoreColor(lead.leadScore)}`}>
                                                        <TrendingUp className="w-4 h-4" />
                                                        {lead.leadScore}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {lead.leadOwner}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {new Date(lead.createdTime).toLocaleDateString()}
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
                                                                <DropdownMenuItem>Convert to Contact</DropdownMenuItem>
                                                                <DropdownMenuItem>Send Email</DropdownMenuItem>
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
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredLeads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <Checkbox
                                            checked={selectedLeads.includes(lead.id)}
                                            onCheckedChange={(checked) => handleSelectLead(lead.id, checked as boolean)}
                                        />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Convert</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="text-center mb-4">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-3">
                                            {lead.firstName[0]}{lead.lastName[0]}
                                        </div>
                                        <h3 className="font-semibold text-slate-900 text-lg">
                                            {lead.firstName} {lead.lastName}
                                        </h3>
                                        <p className="text-sm text-slate-600">{lead.title}</p>
                                        <p className="text-sm text-slate-500 mt-1">{lead.company}</p>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            <span className="truncate">{lead.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <span>{lead.phone}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-3">
                                        <Badge className={getStatusColor(lead.leadStatus)} variant="secondary">
                                            {lead.leadStatus}
                                        </Badge>
                                        <div className={`px-2 py-1 rounded-lg font-semibold text-sm ${getScoreColor(lead.leadScore)}`}>
                                            {lead.leadScore}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <MessageSquare className="w-4 h-4 mr-1" />
                                            Contact
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredLeads.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No leads found</h3>
                            <p className="text-slate-600 mb-4">
                                {searchQuery || Object.values(filters).some(v => v !== 'all' && v !== 0 && v !== false)
                                    ? 'Try adjusting your search or filters'
                                    : 'Get started by creating your first lead'}
                            </p>
                            <Button onClick={() => setShowCreateDialog(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Lead
                            </Button>
                        </div>
                    )}
                </main>
            </div>

            {/* Create Lead Dialog */}
            <CreateLeadDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onSuccess={(newLead) => {
                    setLeads([...leads, newLead]);
                    setShowCreateDialog(false);
                }}
            />
        </div>
    );
}

// Create Lead Dialog Component
function CreateLeadDialog({
    open,
    onOpenChange,
    onSuccess
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (lead: Lead) => void;
}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        title: '',
        phone: '',
        mobile: '',
        email: '',
        leadSource: '',
        leadStatus: 'Not Contacted',
        industry: '',
        country: '',
        city: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newLead: Lead = {
            id: String(Date.now()),
            ...formData,
            leadScore: Math.floor(Math.random() * 40) + 60,
            leadOwner: 'Pranav A',
            createdTime: new Date().toISOString()
        };

        onSuccess(newLead);

        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            company: '',
            title: '',
            phone: '',
            mobile: '',
            email: '',
            leadSource: '',
            leadStatus: 'Not Contacted',
            industry: '',
            country: '',
            city: '',
            description: ''
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        Create New Lead
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Lead Identity */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Lead Identity</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name *</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="company">Company *</Label>
                                <Input
                                    id="company"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Communication Details */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Communication</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="mobile">Mobile</Label>
                                <Input
                                    id="mobile"
                                    type="tel"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Lead Details */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Lead Details</h3>
                        <div className="grid grid-cols-2 gap-4">
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
                            <div>
                                <Label htmlFor="leadStatus">Lead Status</Label>
                                <Select
                                    value={formData.leadStatus}
                                    onValueChange={(value) => setFormData({ ...formData, leadStatus: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {leadStatuses.map(status => (
                                            <SelectItem key={status} value={status}>{status}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="industry">Industry</Label>
                                <Select
                                    value={formData.industry}
                                    onValueChange={(value) => setFormData({ ...formData, industry: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {industries.map(industry => (
                                            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Address Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
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
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                            Create Lead
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
