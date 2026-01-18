import { LayoutDashboard, TrendingUp, Users, MessageSquare } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
                    <p className="text-slate-600">Welcome back! Here's your overview.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <MessageSquare className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                +12.5%
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">1,234</h3>
                        <p className="text-sm text-slate-600">Total Conversations</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-green-50 rounded-lg">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                +8.2%
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">567</h3>
                        <p className="text-sm text-slate-600">Active Contacts</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                +15.1%
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">89</h3>
                        <p className="text-sm text-slate-600">Active Leads</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-amber-50 rounded-lg">
                                <LayoutDashboard className="w-6 h-6 text-amber-600" />
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                +5.7%
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">23</h3>
                        <p className="text-sm text-slate-600">Open Deals</p>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
                    <h2 className="text-2xl font-bold mb-2">Welcome to ChatBot AI CRM</h2>
                    <p className="text-blue-100 mb-4">
                        Manage your leads, contacts, deals, and tasks all in one place.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="/leads"
                            className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                        >
                            View Leads
                        </a>
                        <a
                            href="/deals"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors"
                        >
                            View Deals
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
