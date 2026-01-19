import { LayoutDashboard, TrendingUp, Users, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
    const stats = [
        { label: 'Total Conversations', value: '1,234', change: '+12.5%', icon: MessageSquare },
        { label: 'Active Contacts', value: '567', change: '+8.2%', icon: Users },
        { label: 'Active Leads', value: '89', change: '+15.1%', icon: TrendingUp },
        { label: 'Open Deals', value: '23', change: '+5.7%', icon: LayoutDashboard },
    ];

    return (
        <div className="h-full bg-background overflow-y-auto">
            {/* Header */}
            <div className="border-b border-border px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-sm text-muted-foreground mb-1">Your Workspace</p>
                    <h1 className="text-2xl font-semibold text-foreground">Good afternoon</h1>
                </div>
            </div>

            <div className="px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-0 border-b border-border mb-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className="py-6 pr-8 border-r border-border last:border-r-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                                        <span className="text-xs text-success font-medium">{stat.change}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Welcome Card */}
                    <div className="card-clean p-8 mb-6">
                        <h2 className="text-xl font-semibold text-foreground mb-2">
                            Welcome to DesignCraft Studio
                        </h2>
                        <p className="text-muted-foreground mb-6 max-w-2xl">
                            Manage your leads, contacts, deals, and tasks all in one place. Experience the power of AI-driven CRM with beautiful analytics and seamless integrations.
                        </p>
                        <div className="flex gap-3">
                            <Button className="gap-2">
                                View Leads
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="gap-2">
                                View Deals
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Activity Chart Placeholder */}
                    <div className="card-clean p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Activity Overview</h3>
                        <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
                            Chart visualization goes here
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
