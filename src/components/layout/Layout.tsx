import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    MessageSquare,
    Users,
    BarChart3,
    BookOpen,
    Plug,
    Settings as SettingsIcon,
    UserCircle,
    Target,
    DollarSign,
    CheckSquare,
    FolderOpen,
    ChevronDown
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
    name: string;
    path: string;
    icon: any;
    section?: 'main' | 'crm' | 'analytics' | 'settings';
}

const navigation: NavItem[] = [
    // Main Section
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, section: 'main' },
    { name: 'Conversations', path: '/conversations', icon: MessageSquare, section: 'main' },

    // CRM Section
    { name: 'Leads', path: '/leads', icon: Target, section: 'crm' },
    { name: 'Contacts', path: '/contacts', icon: Users, section: 'crm' },
    { name: 'Deals', path: '/deals', icon: DollarSign, section: 'crm' },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare, section: 'crm' },
    { name: 'Documents', path: '/documents', icon: FolderOpen, section: 'crm' },

    // Analytics Section
    { name: 'Analytics', path: '/analytics', icon: BarChart3, section: 'analytics' },
    { name: 'Knowledge Base', path: '/knowledge-base', icon: BookOpen, section: 'analytics' },

    // Settings Section
    { name: 'Integrations', path: '/integrations', icon: Plug, section: 'settings' },
    { name: 'Settings', path: '/settings', icon: SettingsIcon, section: 'settings' },
];

export function Layout() {
    const location = useLocation();
    const [crmExpanded, setCrmExpanded] = useState(true);

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-900">ChatBot AI</h1>
                            <p className="text-xs text-slate-500">Workspace</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    {/* Main Section */}
                    <div className="mb-6">
                        <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            MAIN
                        </h3>
                        <div className="space-y-1">
                            {navigation
                                .filter(item => item.section === 'main')
                                .map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>

                    {/* CRM Section */}
                    <div className="mb-6">
                        <button
                            onClick={() => setCrmExpanded(!crmExpanded)}
                            className="flex items-center justify-between w-full px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-700 transition-colors"
                        >
                            <span>CRM MODULES</span>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${crmExpanded ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        {crmExpanded && (
                            <div className="space-y-1">
                                {navigation
                                    .filter(item => item.section === 'crm')
                                    .map((item) => {
                                        const Icon = item.icon;
                                        const isActive = location.pathname === item.path;
                                        return (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                            </div>
                        )}
                    </div>

                    {/* Analytics Section */}
                    <div className="mb-6">
                        <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            ANALYTICS
                        </h3>
                        <div className="space-y-1">
                            {navigation
                                .filter(item => item.section === 'analytics')
                                .map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Settings Section */}
                    <div className="mb-6">
                        <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            SETTINGS
                        </h3>
                        <div className="space-y-1">
                            {navigation
                                .filter(item => item.section === 'settings')
                                .map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                            JD
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">John Doe</p>
                            <p className="text-xs text-slate-500">john@acme.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}
