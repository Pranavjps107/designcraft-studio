import { useState } from 'react';
import {
    Users, Plus, Filter, Download, Search, Grid, List,
    MoreVertical, Phone, Mail, Building2, MapPin,
    X, Edit, Trash2, Eye, MessageSquare, ChevronDown,
    ArrowUpDown, RefreshCw, Send
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

interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    accountName?: string;
    email: string;
    secondaryEmail?: string;
    phone: string;
    mobile?: string;
    otherPhone?: string;
    title?: string;
    department?: string;
    reportingTo?: string;
    leadSource?: string;
    dateOfBirth?: string;
    mailingAddress?: Address;
    otherAddress?: Address;
    contactOwner: string;
    createdTime: string;
    imageUrl?: string;
    description?: string;
}

interface Address {
    country?: string;
    building?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
}

const mockContacts: Contact[] = [
    {
        id: '1',
        firstName: 'Kris',
        lastName: 'Marrier',
        accountName: 'King (Sample)',
        email: 'kris@king.com',
        phone: '+1234567890',
        mobile: '+1234567891',
        title: 'VP Sales',
        department: 'Sales',
        leadSource: 'Referral',
        contactOwner: 'Pranav A',
        createdTime: '2026-01-10T10:30:00',
        mailingAddress: {
            city: 'San Francisco',
            state: 'California',
            country: 'USA'
        }
    },
    {
        id: '2',
        firstName: 'Mitsue',
        lastName: 'Tollner',
        accountName: 'Morlong Associates',
        email: 'mitsue@morlong.com',
        phone: '+9876543210',
        mobile: '+9876543211',
        title: 'Marketing Manager',
        department: 'Marketing',
        leadSource: 'Social Media',
        contactOwner: 'Pranav A',
        createdTime: '2026-01-12T14:20:00',
        mailingAddress: {
            city: 'New York',
            state: 'New York',
            country: 'USA'
        }
    },
    {
        id: '3',
        firstName: 'Leota',
        lastName: 'Dilliard',
        accountName: 'Commercial Press',
        email: 'leota@commercialpress.com',
        phone: '+5551234567',
        title: 'Sales Director',
        department: 'Sales',
        leadSource: 'Cold Call',
        contactOwner: 'Pranav A',
        createdTime: '2026-01-14T09:15:00',
        mailingAddress: {
            city: 'Boston',
            state: 'Massachusetts',
            country: 'USA'
        }
    },
    {
        id: '4',
        firstName: 'Josephine',
        lastName: 'Darakjy',
        accountName: 'Chanay (Sample)',
        email: 'josephine@chanay.com',
        secondaryEmail: 'j.darakjy@example.com',
        phone: '+4441234567',
        mobile: '+4441234568',
        title: 'CEO',
        department: 'Executive',
        leadSource: 'Advertisement',
        contactOwner: 'Pranav A',
        createdTime: '2026-01-11T11:00:00',
        mailingAddress: {
            city: 'London',
            country: 'UK'
        }
    },
    {
        id: '5',
        firstName: 'Capla',
        lastName: 'Paprocki',
        accountName: 'Feltz Printing Service',
        email: 'capla@feltzprinting.com',
        phone: '+3331234567',
        title: 'Operations Manager',
        department: 'Operations',
        leadSource: 'Website',
        contactOwner: 'Pranav A',
        createdTime: '2026-01-13T15:45:00',
        mailingAddress: {
            city: 'Chicago',
            state: 'Illinois',
            country: 'USA'
        }
    }
];

const leadSources = ['Social Media', 'Advertisement', 'Referral', 'Website', 'Cold Call', 'Trade Show'];
const departments = ['Sales', 'Marketing', 'Operations', 'Finance', 'Executive', 'Support'];

export default function Contacts() {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    const [contacts, setContacts] = useState<Contact[]>(mockContacts);

    const [filters, setFilters] = useState({
        leadSource: 'all',
        department: 'all',
        city: '',
        touched: false,
        untouched: false
    });

    const filteredContacts = contacts.filter(contact => {
        const matchesSearch =
            contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (contact.accountName && contact.accountName.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesSource = filters.leadSource === 'all' || contact.leadSource === filters.leadSource;
        const matchesDepartment = filters.department === 'all' || contact.department === filters.department;
        const matchesCity = !filters.city ||
            (contact.mailingAddress?.city && contact.mailingAddress.city.toLowerCase().includes(filters.city.toLowerCase()));

        return matchesSearch && matchesSource && matchesDepartment && matchesCity;
    });

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedContacts(filteredContacts.map(c => c.id));
        } else {
            setSelectedContacts([]);
        }
    };

    const handleSelectContact = (contactId: string, checked: boolean) => {
        if (checked) {
            setSelectedContacts([...selectedContacts, contactId]);
        } else {
            setSelectedContacts(selectedContacts.filter(id => id !== contactId));
        }
    };

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 shadow-sm">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
                                <p className="text-sm text-slate-600">{filteredContacts.length} total contacts</p>
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
                                {Object.values(filters).some(v => v !== 'all' && v !== '' && v !== false) && (
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
                                    <DropdownMenuItem>Export as vCard</DropdownMenuItem>
                                    <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button
                                size="sm"
                                onClick={() => setShowCreateDialog(true)}
                                className="gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/30"
                            >
                                <Plus className="w-4 h-4" />
                                Create Contact
                            </Button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="Search contacts by name, email, account..."
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
                    {selectedContacts.length > 0 && (
                        <div className="mt-3 bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-cyan-900">
                                {selectedContacts.length} contact{selectedContacts.length > 1 ? 's' : ''} selected
                            </span>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Send className="w-4 h-4" />
                                    Send Email
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Send Message
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
                                    onClick={() => setSelectedContacts([])}
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
                                        department: 'all',
                                        city: '',
                                        touched: false,
                                        untouched: false
                                    })}
                                    className="text-cyan-600"
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
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Locked</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Activities</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Campaigns</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Cadences</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <Checkbox />
                                            <span className="text-sm text-slate-600">Email Status</span>
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

                                {/* Department */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">Department</Label>
                                    <Select
                                        value={filters.department}
                                        onValueChange={(value) => setFilters({ ...filters, department: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Departments</SelectItem>
                                            {departments.map(dept => (
                                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* City */}
                                <div>
                                    <Label className="text-sm font-medium text-slate-700 mb-2 block">City</Label>
                                    <Input
                                        placeholder="Filter by city..."
                                        value={filters.city}
                                        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                    />
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
                                                    checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors">
                                                    Contact Name
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Account
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Contact Info
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Department
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Location
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
                                        {filteredContacts.map((contact) => (
                                            <tr
                                                key={contact.id}
                                                className="hover:bg-cyan-50/50 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <Checkbox
                                                        checked={selectedContacts.includes(contact.id)}
                                                        onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                                                            {getInitials(contact.firstName, contact.lastName)}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-slate-900">
                                                                {contact.firstName} {contact.lastName}
                                                            </div>
                                                            {contact.title && (
                                                                <div className="text-sm text-slate-500">{contact.title}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {contact.accountName && (
                                                        <div className="flex items-center gap-2">
                                                            <Building2 className="w-4 h-4 text-slate-400" />
                                                            <span className="text-slate-900">{contact.accountName}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <Mail className="w-3 h-3" />
                                                            {contact.email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <Phone className="w-3 h-3" />
                                                            {contact.phone}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {contact.department && (
                                                        <Badge variant="outline">{contact.department}</Badge>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {contact.mailingAddress && (
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <MapPin className="w-4 h-4 text-slate-400" />
                                                            <span>
                                                                {contact.mailingAddress.city}
                                                                {contact.mailingAddress.country && `, ${contact.mailingAddress.country}`}
                                                            </span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {contact.contactOwner}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {new Date(contact.createdTime).toLocaleDateString()}
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
                                                                <DropdownMenuItem>Send Email</DropdownMenuItem>
                                                                <DropdownMenuItem>Call Contact</DropdownMenuItem>
                                                                <DropdownMenuItem>Create Deal</DropdownMenuItem>
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
                            {filteredContacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <Checkbox
                                            checked={selectedContacts.includes(contact.id)}
                                            onCheckedChange={(checked) => handleSelectContact(contact.id, checked as boolean)}
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
                                                <DropdownMenuItem>Send Email</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="text-center mb-4">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-3">
                                            {getInitials(contact.firstName, contact.lastName)}
                                        </div>
                                        <h3 className="font-semibold text-slate-900 text-lg">
                                            {contact.firstName} {contact.lastName}
                                        </h3>
                                        {contact.title && (
                                            <p className="text-sm text-slate-600">{contact.title}</p>
                                        )}
                                        {contact.accountName && (
                                            <p className="text-sm text-slate-500 mt-1">{contact.accountName}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            <span className="truncate">{contact.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <span>{contact.phone}</span>
                                        </div>
                                        {contact.mailingAddress && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                <span className="truncate">
                                                    {contact.mailingAddress.city}
                                                    {contact.mailingAddress.country && `, ${contact.mailingAddress.country}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {contact.department && (
                                        <div className="mb-3">
                                            <Badge variant="outline" className="w-full justify-center">
                                                {contact.department}
                                            </Badge>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <MessageSquare className="w-4 h-4 mr-1" />
                                            Message
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

                    {filteredContacts.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No contacts found</h3>
                            <p className="text-slate-600 mb-4">
                                {searchQuery || Object.values(filters).some(v => v !== 'all' && v !== '' && v !== false)
                                    ? 'Try adjusting your search or filters'
                                    : 'Get started by creating your first contact'}
                            </p>
                            <Button onClick={() => setShowCreateDialog(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Contact
                            </Button>
                        </div>
                    )}
                </main>
            </div>

            {/* Create Contact Dialog */}
            <CreateContactDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onSuccess={(newContact) => {
                    setContacts([...contacts, newContact]);
                    setShowCreateDialog(false);
                }}
            />
        </div>
    );
}

// Create Contact Dialog Component
function CreateContactDialog({
    open,
    onOpenChange,
    onSuccess
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (contact: Contact) => void;
}) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        accountName: '',
        email: '',
        secondaryEmail: '',
        phone: '',
        mobile: '',
        title: '',
        department: '',
        leadSource: '',
        city: '',
        state: '',
        country: '',
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newContact: Contact = {
            id: String(Date.now()),
            firstName: formData.firstName,
            lastName: formData.lastName,
            accountName: formData.accountName || undefined,
            email: formData.email,
            secondaryEmail: formData.secondaryEmail || undefined,
            phone: formData.phone,
            mobile: formData.mobile || undefined,
            title: formData.title || undefined,
            department: formData.department || undefined,
            leadSource: formData.leadSource || undefined,
            mailingAddress: {
                city: formData.city || undefined,
                state: formData.state || undefined,
                country: formData.country || undefined
            },
            contactOwner: 'Pranav A',
            createdTime: new Date().toISOString(),
            description: formData.description || undefined
        };

        onSuccess(newContact);

        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            accountName: '',
            email: '',
            secondaryEmail: '',
            phone: '',
            mobile: '',
            title: '',
            department: '',
            leadSource: '',
            city: '',
            state: '',
            country: '',
            description: ''
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                            <UserPlus className="w-5 h-5 text-white" />
                        </div>
                        Create Contact
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Contact Identity */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Contact Identity</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">First Name *</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
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
                                <Label htmlFor="accountName">Account Name</Label>
                                <Input
                                    id="accountName"
                                    value={formData.accountName}
                                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
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

                    {/* Communication */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Communication</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="secondaryEmail">Secondary Email</Label>
                                <Input
                                    id="secondaryEmail"
                                    type="email"
                                    value={formData.secondaryEmail}
                                    onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
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
                        </div>
                    </div>

                    {/* Professional Details */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Professional Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="department">Department</Label>
                                <Select
                                    value={formData.department}
                                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map(dept => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
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
                        </div>
                    </div>

                    {/* Address Information */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Mailing Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="state">State/Province</Label>
                                <Input
                                    id="state"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <Label htmlFor="country">Country/Region</Label>
                                <Input
                                    id="country"
                                    value={formData.country}
                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                        <Button type="submit" className="bg-gradient-to-r from-cyan-600 to-blue-600">
                            Create Contact
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
