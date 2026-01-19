import { useState } from 'react';
import {
    CheckSquare, Plus, Filter, Calendar, User, Search, List,
    Grid, MoreVertical, Clock, AlertCircle, Flag, X, Repeat,
    Bell, RefreshCw, Download, ChevronDown, Eye, Edit, Trash2,
    Users as UsersIcon, Building2, DollarSign, ArrowUpDown
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

interface Task {
    id: string;
    subject: string;
    dueDate: string;
    status: 'Not Started' | 'In Progress' | 'Completed' | 'Waiting for Input' | 'Deferred';
    priority: 'Highest' | 'High' | 'Normal' | 'Low' | 'Lowest';
    taskOwner: string;
    relatedTo?: {
        type: 'Lead' | 'Contact' | 'Account' | 'Deal';
        name: string;
    };
    reminder: boolean;
    repeat: boolean;
    description?: string;
}

const mockTasks: Task[] = [
    {
        id: '1',
        subject: 'Register for upcoming CRM Webinar',
        dueDate: '2026-01-20T10:00:00',
        status: 'Not Started',
        priority: 'Low',
        taskOwner: 'Pranav A',
        relatedTo: { type: 'Contact', name: 'Kris Marrier (Sample)' },
        reminder: true,
        repeat: false,
        description: 'Register and attend the CRM webinar on advanced features'
    },
    {
        id: '2',
        subject: 'Competitor Comparison Document',
        dueDate: '2026-01-22T15:00:00',
        status: 'Not Started',
        priority: 'Highest',
        taskOwner: 'Pranav A',
        relatedTo: { type: 'Deal', name: 'Capla Paprocki (Sample)' },
        reminder: true,
        repeat: false
    },
    {
        id: '3',
        subject: 'Get Approval from Manager',
        dueDate: '2026-01-25T14:00:00',
        status: 'Not Started',
        priority: 'Low',
        taskOwner: 'Pranav A',
        reminder: false,
        repeat: false
    },
    {
        id: '4',
        subject: 'Refer CRM Videos',
        dueDate: '2026-01-21T12:00:00',
        status: 'In Progress',
        priority: 'Normal',
        taskOwner: 'Pranav A',
        relatedTo: { type: 'Contact', name: 'Mitsue Tollner (Sample)' },
        reminder: true,
        repeat: false
    },
    {
        id: '5',
        subject: 'Get Approval from Manager',
        dueDate: '2026-01-23T16:00:00',
        status: 'In Progress',
        priority: 'Normal',
        taskOwner: 'Pranav A',
        relatedTo: { type: 'Contact', name: 'Leota Dilliard (Sample)' },
        reminder: false,
        repeat: false
    },
    {
        id: '6',
        subject: 'Get Approval from Manager',
        dueDate: '2026-01-24T10:00:00',
        status: 'In Progress',
        priority: 'High',
        taskOwner: 'Pranav A',
        relatedTo: { type: 'Contact', name: 'Kris Marrier (Sample)' },
        reminder: false,
        repeat: false
    }
];

const statuses = ['Not Started', 'In Progress', 'Completed', 'Waiting for Input', 'Deferred'] as const;
const priorities = ['Highest', 'High', 'Normal', 'Low', 'Lowest'] as const;

export default function Tasks() {
    const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

    const [filters, setFilters] = useState({
        status: 'all',
        priority: 'all',
        dueDate: 'all',
        owner: 'all'
    });

    const getPriorityColor = (priority: string) => {
        const priorityColors: Record<string, string> = {
            'Highest': 'bg-red-100 text-red-700 border-red-300',
            'High': 'bg-orange-100 text-orange-700 border-orange-300',
            'Normal': 'bg-blue-100 text-blue-700 border-blue-300',
            'Low': 'bg-slate-100 text-slate-700 border-slate-300',
            'Lowest': 'bg-gray-100 text-gray-600 border-gray-300'
        };
        return priorityColors[priority] || 'bg-gray-100 text-gray-700';
    };

    const getPriorityIcon = (priority: string) => {
        if (priority === 'Highest' || priority === 'High') {
            return <Flag className="w-3 h-3" />;
        }
        return null;
    };

    const getStatusColor = (status: string) => {
        const statusColors: Record<string, string> = {
            'Not Started': 'bg-slate-100 text-slate-700',
            'In Progress': 'bg-blue-100 text-blue-700',
            'Completed': 'bg-green-100 text-green-700',
            'Waiting for Input': 'bg-yellow-100 text-yellow-700',
            'Deferred': 'bg-orange-100 text-orange-700'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-700';
    };

    const isOverdue = (dueDate: string) => {
        return new Date(dueDate) < new Date();
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.subject.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filters.status === 'all' || task.status === filters.status;
        const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const tasksByStatus = statuses.reduce((acc, status) => {
        acc[status] = filteredTasks.filter(task => task.status === status);
        return acc;
    }, {} as Record<typeof statuses[number], Task[]>);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedTasks(filteredTasks.map(t => t.id));
        } else {
            setSelectedTasks([]);
        }
    };

    const handleSelectTask = (taskId: string, checked: boolean) => {
        if (checked) {
            setSelectedTasks([...selectedTasks, taskId]);
        } else {
            setSelectedTasks(selectedTasks.filter(id => id !== taskId));
        }
    };

    return (
        <div className="h-screen flex flex-col bg-background">
            {/* Header */}
            <header className="bg-card border-b border-border">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                                <CheckSquare className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-foreground">Tasks</h1>
                                <p className="text-sm text-muted-foreground">{filteredTasks.length} total tasks</p>
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
                                {Object.values(filters).some(
                                    v => (typeof v === "string" && v !== "all") ||
                                        (typeof v === "number" && v !== 0)
                                ) && (
                                        <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                            !
                                        </Badge>
                                    )}
                            </Button>

                            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
                                <Button
                                    variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('kanban')}
                                    className="h-8 px-3 gap-2"
                                >
                                    <Grid className="w-4 h-4" />
                                    Kanban
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
                                    <DropdownMenuItem>Export to Calendar</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button
                                size="sm"
                                onClick={() => setShowCreateDialog(true)}
                                className="gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Create Task
                            </Button>
                        </div>
                    </div>

                    {/* Quick Filters Tabs */}
                    <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
                        <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
                            <Clock className="w-4 h-4" />
                            All Tasks
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
                            <CheckSquare className="w-4 h-4" />
                            All Locked Tasks
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
                            <Calendar className="w-4 h-4" />
                            Closed Tasks
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 whitespace-nowrap">
                            <User className="w-4 h-4" />
                            My Closed Tasks
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-blue-50 border-blue-300 text-blue-700">
                            <AlertCircle className="w-4 h-4" />
                            My Next 7 Days + Overdue Tasks
                        </Button>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="Search tasks..."
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
                    {selectedTasks.length > 0 && (
                        <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-purple-900">
                                {selectedTasks.length} task{selectedTasks.length > 1 ? 's' : ''} selected
                            </span>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <CheckSquare className="w-4 h-4" />
                                    Mark Complete
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
                                    onClick={() => setSelectedTasks([])}
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
                                <h2 className="text-lg font-semibold text-slate-900">Filter Tasks by</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setFilters({
                                        status: 'all',
                                        priority: 'all',
                                        dueDate: 'all',
                                        owner: 'all'
                                    })}
                                    className="text-purple-600"
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
                                    </div>
                                </div>

                                {/* Filter by Fields */}
                                <div>
                                    <h3 className="text-sm font-medium text-slate-700 mb-3">Filter By Fields</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">Status</Label>
                                            <Select
                                                value={filters.status}
                                                onValueChange={(value) => setFilters({ ...filters, status: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Statuses</SelectItem>
                                                    {statuses.map(status => (
                                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">Priority</Label>
                                            <Select
                                                value={filters.priority}
                                                onValueChange={(value) => setFilters({ ...filters, priority: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Priorities</SelectItem>
                                                    {priorities.map(priority => (
                                                        <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">Closed Time</Label>
                                            <Select
                                                value={filters.dueDate}
                                                onValueChange={(value) => setFilters({ ...filters, dueDate: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select time range" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Time</SelectItem>
                                                    <SelectItem value="today">Today</SelectItem>
                                                    <SelectItem value="week">This Week</SelectItem>
                                                    <SelectItem value="month">This Month</SelectItem>
                                                    <SelectItem value="overdue">Overdue</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">Contact Name</Label>
                                            <Input placeholder="Search contact..." className="text-sm" />
                                        </div>

                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">Created By</Label>
                                            <Input placeholder="Search creator..." className="text-sm" />
                                        </div>

                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">Created Time</Label>
                                            <Input type="date" className="text-sm" />
                                        </div>

                                        <div>
                                            <Label className="text-sm text-slate-600 mb-2 block">Due Date</Label>
                                            <Input type="date" className="text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {viewMode === 'kanban' ? (
                        <div className="flex gap-4 h-full overflow-x-auto pb-4">
                            {statuses.map((status) => {
                                const statusTasks = tasksByStatus[status];
                                const statusCount = statusTasks.length;

                                return (
                                    <div
                                        key={status}
                                        className="flex-shrink-0 w-80 bg-slate-50 rounded-xl border border-slate-200"
                                    >
                                        <div className="p-4 border-b border-slate-200 bg-white rounded-t-xl">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-slate-900">{status}</h3>
                                                    <Badge variant="secondary" className="rounded-full">
                                                        {statusCount}
                                                    </Badge>
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                                            {statusTasks.length === 0 && (
                                                <div className="text-center py-8 text-slate-400 text-sm">
                                                    No tasks found
                                                </div>
                                            )}

                                            {statusTasks.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-lg hover:border-purple-300 transition-all duration-200 cursor-pointer group"
                                                >
                                                    <div className="flex items-start justify-between mb-3">
                                                        <Checkbox
                                                            checked={selectedTasks.includes(task.id)}
                                                            onCheckedChange={(checked) => handleSelectTask(task.id, checked as boolean)}
                                                        />
                                                        <div className="flex items-center gap-1">
                                                            {task.reminder && (
                                                                <Bell className="w-4 h-4 text-blue-500" />
                                                            )}
                                                            {task.repeat && (
                                                                <Repeat className="w-4 h-4 text-green-500" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <h4 className="font-medium text-slate-900 mb-2 line-clamp-2">
                                                        {task.subject}
                                                    </h4>

                                                    <div className="flex items-center gap-2 mb-3">
                                                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                                            {getPriorityIcon(task.priority)}
                                                            {task.priority}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2 text-sm">
                                                        <div className={`flex items-center gap-2 ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-slate-600'}`}>
                                                            <Calendar className="w-4 h-4" />
                                                            <span>
                                                                {new Date(task.dueDate).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </span>
                                                            {isOverdue(task.dueDate) && (
                                                                <Badge variant="destructive" className="ml-auto text-xs">
                                                                    Overdue
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <User className="w-4 h-4" />
                                                            <span>{task.taskOwner}</span>
                                                        </div>

                                                        {task.relatedTo && (
                                                            <div className="flex items-center gap-2 text-slate-600">
                                                                {task.relatedTo.type === 'Contact' && <UsersIcon className="w-4 h-4" />}
                                                                {task.relatedTo.type === 'Account' && <Building2 className="w-4 h-4" />}
                                                                {task.relatedTo.type === 'Deal' && <DollarSign className="w-4 h-4" />}
                                                                <span className="text-xs truncate">{task.relatedTo.name}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" size="sm" className="h-7 flex-1 text-xs">
                                                            <Eye className="w-3 h-3 mr-1" />
                                                            View
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-7 flex-1 text-xs">
                                                            <Edit className="w-3 h-3 mr-1" />
                                                            Edit
                                                        </Button>
                                                    </div>
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
                                                    checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                                                    onCheckedChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors">
                                                    Subject
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left">
                                                <button className="flex items-center gap-2 text-xs font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors">
                                                    Due Date
                                                    <ArrowUpDown className="w-3 h-3" />
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Priority
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                                Related To
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
                                        {filteredTasks.map((task) => (
                                            <tr
                                                key={task.id}
                                                className="hover:bg-purple-50/50 transition-colors group"
                                            >
                                                <td className="px-6 py-4">
                                                    <Checkbox
                                                        checked={selectedTasks.includes(task.id)}
                                                        onCheckedChange={(checked) => handleSelectTask(task.id, checked as boolean)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-start gap-2">
                                                        <div>
                                                            <div className="font-medium text-slate-900">{task.subject}</div>
                                                            {task.description && (
                                                                <div className="text-sm text-slate-500 line-clamp-1 mt-1">
                                                                    {task.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`flex items-center gap-2 text-sm ${isOverdue(task.dueDate) ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(task.dueDate).toLocaleDateString()}
                                                        {isOverdue(task.dueDate) && (
                                                            <Badge variant="destructive" className="ml-1">Overdue</Badge>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge className={getStatusColor(task.status)}>
                                                        {task.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                                        {getPriorityIcon(task.priority)}
                                                        {task.priority}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {task.relatedTo && (
                                                        <div className="flex items-center gap-2">
                                                            {task.relatedTo.type === 'Contact' && <UsersIcon className="w-4 h-4 text-slate-400" />}
                                                            {task.relatedTo.type === 'Account' && <Building2 className="w-4 h-4 text-slate-400" />}
                                                            {task.relatedTo.type === 'Deal' && <DollarSign className="w-4 h-4 text-slate-400" />}
                                                            <div>
                                                                <div className="text-sm text-slate-900">{task.relatedTo.name}</div>
                                                                <div className="text-xs text-slate-500">{task.relatedTo.type}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {task.taskOwner}
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
                                                                <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                                                                <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                                                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
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

                    {filteredTasks.length === 0 && (
                        <div className="text-center py-12">
                            <CheckSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No tasks found</h3>
                            <p className="text-slate-600 mb-4">
                                {searchQuery || Object.values(filters).some(
                                    v => (typeof v === "string" && v !== "all") ||
                                        (typeof v === "number" && v !== 0)
                                )
                                    ? 'Try adjusting your search or filters'
                                    : 'Get started by creating your first task'}
                            </p>
                            <Button onClick={() => setShowCreateDialog(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Create Task
                            </Button>
                        </div>
                    )}
                </main>
            </div>

            {/* Create Task Dialog */}
            <CreateTaskDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onSuccess={(newTask) => {
                    setTasks([...tasks, newTask]);
                    setShowCreateDialog(false);
                }}
            />
        </div>
    );
}

// Create Task Dialog Component
function CreateTaskDialog({
    open,
    onOpenChange,
    onSuccess
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: (task: Task) => void;
}) {
    const [formData, setFormData] = useState({
        subject: '',
        dueDate: '',
        status: 'Not Started' as Task['status'],
        priority: 'Normal' as Task['priority'],
        taskOwner: 'Pranav A',
        reminder: false,
        repeat: false,
        description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTask: Task = {
            id: String(Date.now()),
            ...formData
        };

        onSuccess(newTask);

        // Reset form
        setFormData({
            subject: '',
            dueDate: '',
            status: 'Not Started',
            priority: 'Normal',
            taskOwner: 'Pranav A',
            reminder: false,
            repeat: false,
            description: ''
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
                            <CheckSquare className="w-5 h-5 text-white" />
                        </div>
                        Create Task
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Task Information */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Task Information</h3>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="taskOwner">Task Owner</Label>
                                <Input
                                    id="taskOwner"
                                    value={formData.taskOwner}
                                    onChange={(e) => setFormData({ ...formData, taskOwner: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="subject">Subject *</Label>
                                <Input
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                    placeholder="Enter task subject..."
                                />
                            </div>

                            <div>
                                <Label htmlFor="dueDate">Due Date *</Label>
                                <Input
                                    id="dueDate"
                                    type="datetime-local"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value: Task['status']) => setFormData({ ...formData, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statuses.map(status => (
                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="priority">Priority</Label>
                                    <Select
                                        value={formData.priority}
                                        onValueChange={(value: Task['priority']) => setFormData({ ...formData, priority: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {priorities.map(priority => (
                                                <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        checked={formData.reminder}
                                        onCheckedChange={(checked) =>
                                            setFormData({ ...formData, reminder: checked as boolean })
                                        }
                                    />
                                    <span className="text-sm text-slate-700">Reminder</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <Checkbox
                                        checked={formData.repeat}
                                        onCheckedChange={(checked) =>
                                            setFormData({ ...formData, repeat: checked as boolean })
                                        }
                                    />
                                    <span className="text-sm text-slate-700">Repeat</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">Description Information</h3>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                placeholder="Enter task description..."
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600">
                            Save Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
