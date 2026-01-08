import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  Zap,
  Clock,
  Calendar,
  ChevronDown,
  ArrowRight,
  Plus,
  UserPlus,
  UsersRound,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const chartData = [
  { name: "Mon", conversations: 240, users: 120 },
  { name: "Tue", conversations: 320, users: 150 },
  { name: "Wed", conversations: 280, users: 140 },
  { name: "Thu", conversations: 400, users: 200 },
  { name: "Fri", conversations: 380, users: 180 },
  { name: "Sat", conversations: 280, users: 120 },
  { name: "Sun", conversations: 200, users: 100 },
];

const activityData = [
  { hour: "6am", count: 20 },
  { hour: "9am", count: 80 },
  { hour: "12pm", count: 120 },
  { hour: "3pm", count: 100 },
  { hour: "6pm", count: 60 },
  { hour: "9pm", count: 40 },
];

const recentConversations = [
  {
    id: 1,
    name: "Sarah Anderson",
    initials: "SA",
    message: "I need help with my recent order...",
    status: "active" as const,
    time: "2 min ago",
  },
  {
    id: 2,
    name: "Michael Johnson",
    initials: "MJ",
    message: "Thank you for the support!",
    status: "resolved" as const,
    time: "15 min ago",
  },
  {
    id: 3,
    name: "Emily Wilson",
    initials: "EW",
    message: "When will my order arrive?",
    status: "pending" as const,
    time: "1 hour ago",
  },
  {
    id: 4,
    name: "David Brown",
    initials: "DB",
    message: "Can I change my shipping address?",
    status: "active" as const,
    time: "2 hours ago",
  },
];

const quickActions = [
  { icon: Plus, label: "Create Campaign", href: "/campaigns/new" },
  { icon: UserPlus, label: "Add Contact", href: "/contacts/new" },
  { icon: UsersRound, label: "Create Audience", href: "/audiences/new" },
  { icon: CheckCircle, label: "Verify Emails", href: "/verify" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <span className="text-2xl">📊</span> Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your conversations today
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 7 days
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className="flex items-center gap-3 p-4 bg-accent/50 hover:bg-accent rounded-xl border border-border transition-colors"
            >
              <action.icon className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Conversations"
            value="2,847"
            change="12.5%"
            changeType="positive"
            icon={<MessageSquare className="h-5 w-5 text-primary" />}
            iconBg="green"
          />
          <KPICard
            title="Active Users"
            value="1,284"
            change="8.2%"
            changeType="positive"
            icon={<Users className="h-5 w-5 text-info" />}
            iconBg="blue"
          />
          <KPICard
            title="Response Rate"
            value="94.2%"
            change="2.1%"
            changeType="positive"
            icon={<Zap className="h-5 w-5 text-purple-600" />}
            iconBg="purple"
          />
          <KPICard
            title="Avg Response Time"
            value="2.4m"
            change="15.3%"
            changeType="negative"
            icon={<Clock className="h-5 w-5 text-orange-600" />}
            iconBg="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Conversation Volume Chart */}
          <div className="col-span-2 bg-card rounded-xl p-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Daily Email Volume
                </h3>
                <p className="text-sm text-muted-foreground">0 Emails sent in last 7 days</p>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm">7D</Button>
                <Button variant="outline" size="sm">30D</Button>
                <Button variant="outline" size="sm">90D</Button>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="conversations"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#colorConversations)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Sent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm text-muted-foreground">Bounced</span>
              </div>
            </div>
          </div>

          {/* Credits & Pricing */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Credits & Pricing
            </h3>
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">Email Credits</p>
              <p className="text-4xl font-bold text-foreground">0</p>
            </div>
            <Button variant="outline" className="w-full mb-6 text-primary border-primary hover:bg-primary/10">
              ⚡ Top up
            </Button>
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Sending pricing</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">SMTP/API</span>
                <span className="text-foreground">1 credit/email</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Campaigns</span>
                <span className="text-foreground">2 credits/email</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Verifications</span>
                <span className="text-foreground">5 credits/email</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Recent Campaigns */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-border">
              <h3 className="font-semibold text-foreground">Recent Campaigns</h3>
              <Link
                to="/campaigns"
                className="text-sm font-medium text-primary hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="p-8 text-center text-muted-foreground">
              No recent campaigns
            </div>
          </div>

          {/* Recent Emails */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-border">
              <h3 className="font-semibold text-foreground">Recent Emails</h3>
              <Link
                to="/emails"
                className="text-sm font-medium text-primary hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="p-8 text-center text-muted-foreground">
              No recent emails
            </div>
          </div>

          {/* Sending Limits */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-foreground">Sending Limits ⓘ</h3>
              <Link
                to="/settings"
                className="text-sm font-medium text-primary hover:underline"
              >
                Request Increase
              </Link>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-foreground">Emails per Second</p>
                  <p className="text-sm text-muted-foreground">Maximum sending rate</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground">per second</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-foreground">Emails per Day</p>
                  <p className="text-sm text-muted-foreground">Daily quota limit</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">5,000</p>
                  <p className="text-xs text-muted-foreground">per day</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                0 sent today • 5,000 remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
