import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageSquare,
  Users,
  Zap,
  Clock,
  Calendar,
  ChevronDown,
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
} from "recharts";
import api, { AnalyticsOverview, CreditBalance, SendingLimits, ChartDataPoint } from "@/lib/api";
import { toast } from "sonner";

const quickActions = [
  { icon: Plus, label: "Create Campaign", href: "/campaigns/new" },
  { icon: UserPlus, label: "Add Contact", href: "/contacts" },
  { icon: UsersRound, label: "Create Audience", href: "/audiences/new" },
  { icon: CheckCircle, label: "Send Message", href: "/verify" },
];

export default function Dashboard() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [credits, setCredits] = useState<CreditBalance | null>(null);
  const [limits, setLimits] = useState<SendingLimits | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    loadDashboardData();
  }, [period]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [overviewData, creditsData, limitsData, chartResponse, campaignsData, messagesData] = await Promise.all([
        api.getAnalyticsOverview(period).catch(() => null),
        api.getCreditBalance().catch(() => null),
        api.getSendingLimits().catch(() => null),
        api.getChartData(period).catch(() => ({ daily_volume: [] })),
        api.getRecentCampaigns(5).catch(() => ({ campaigns: [], total: 0 })),
        api.getRecentEmails(5).catch(() => ({ emails: [], total: 0 })),
      ]);

      setOverview(overviewData);
      setCredits(creditsData);
      setLimits(limitsData);
      setChartData(chartResponse.daily_volume);
      setRecentCampaigns(campaignsData.campaigns);
      setRecentMessages(messagesData.emails);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopUp = async () => {
    try {
      await api.topUpCredits(10000);
      toast.success("Credits topped up successfully!");
      loadDashboardData();
    } catch (error: any) {
      toast.error(error.message || "Failed to top up credits");
    }
  };

  const formatChartData = () => {
    if (chartData.length === 0) {
      return [
        { name: "Mon", conversations: 0 },
        { name: "Tue", conversations: 0 },
        { name: "Wed", conversations: 0 },
        { name: "Thu", conversations: 0 },
        { name: "Fri", conversations: 0 },
        { name: "Sat", conversations: 0 },
        { name: "Sun", conversations: 0 },
      ];
    }
    return chartData.map((d) => ({
      name: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
      conversations: d.sent,
      bounced: d.bounced,
    }));
  };

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
            Last {period === "7d" ? "7" : period === "30d" ? "30" : "90"} days
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
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-xl p-5 border border-border">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))
          ) : (
            <>
              <KPICard
                title="Total Conversations"
                value={overview?.total_conversations.toLocaleString() || "0"}
                change={`${overview?.conversation_growth_percent || 0}%`}
                changeType={(overview?.conversation_growth_percent || 0) >= 0 ? "positive" : "negative"}
                icon={<MessageSquare className="h-5 w-5 text-primary" />}
                iconBg="green"
              />
              <KPICard
                title="Total Messages"
                value={overview?.total_messages.toLocaleString() || "0"}
                change={`${overview?.inbound_messages || 0} inbound`}
                changeType="positive"
                icon={<Users className="h-5 w-5 text-info" />}
                iconBg="blue"
              />
              <KPICard
                title="Inbound Messages"
                value={overview?.inbound_messages.toLocaleString() || "0"}
                change={`+${(overview?.inbound_messages || 0) > 0 ? "↑" : "↓"}`}
                changeType={overview?.inbound_messages || 0 > 0 ? "positive" : "negative"}
                icon={<Zap className="h-5 w-5 text-purple-600" />}
                iconBg="purple"
              />
              <KPICard
                title="Avg Response Time"
                value={`${Math.round((overview?.average_response_time_seconds || 0) / 60)}m`}
                change={`${overview?.average_response_time_seconds || 0}s`}
                changeType="neutral"
                icon={<Clock className="h-5 w-5 text-orange-600" />}
                iconBg="orange"
              />
            </>
          )}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Conversation Volume Chart */}
          <div className="col-span-2 bg-card rounded-xl p-6 border border-border">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Daily Message Volume
                </h3>
                <p className="text-sm text-muted-foreground">
                  {chartData.reduce((sum, d) => sum + d.sent, 0)} Messages sent in last {period === "7d" ? "7" : period === "30d" ? "30" : "90"} days
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant={period === "7d" ? "default" : "outline"} size="sm" onClick={() => setPeriod("7d")}>7D</Button>
                <Button variant={period === "30d" ? "default" : "outline"} size="sm" onClick={() => setPeriod("30d")}>30D</Button>
                <Button variant={period === "90d" ? "default" : "outline"} size="sm" onClick={() => setPeriod("90d")}>90D</Button>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formatChartData()}>
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
              <p className="text-sm text-muted-foreground">Message Credits</p>
              {isLoading ? (
                <Skeleton className="h-10 w-16 mx-auto" />
              ) : (
                <p className="text-4xl font-bold text-foreground">{credits?.email_credits || 0}</p>
                <p className="text-xs text-muted-foreground mt-1">Message Credits Available</p>
              )}
            </div>
            <Button 
              variant="outline" 
              className="w-full mb-6 text-primary border-primary hover:bg-primary/10"
              onClick={handleTopUp}
            >
              ⚡ Top up
            </Button>
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">Sending pricing</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">SMTP/API</span>
                <span className="text-foreground">{credits?.pricing.smtp_api || 1} credit/message</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Campaigns</span>
                <span className="text-foreground">{credits?.pricing.campaigns || 2} credits/message</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Verifications</span>
                <span className="text-foreground">{credits?.pricing.verifications || 5} credits/message</span>
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
            {recentCampaigns.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No recent campaigns
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4">
                    <p className="font-medium text-foreground">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">{campaign.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Messages */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-border">
              <h3 className="font-semibold text-foreground">Recent Messages</h3>
              <Link
                to="/messages"
                className="text-sm font-medium text-primary hover:underline"
              >
                View All
              </Link>
            </div>
            {recentMessages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No recent messages
              </div>
            ) : (
              <div className="divide-y divide-border">
                {recentMessages.map((message) => (
                  <div key={message.id} className="p-4">
                    <p className="font-medium text-foreground truncate">{message.subject || message.recipient}</p>
                    <p className="text-sm text-muted-foreground">{message.status}</p>
                  </div>
                ))}
              </div>
            )}
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
                  <p className="font-medium text-foreground">Messages per Second</p>
                  <p className="text-sm text-muted-foreground">Maximum sending rate</p>
                </div>
                <div className="text-right">
                  {isLoading ? (
                    <Skeleton className="h-8 w-8" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-foreground">{limits?.emails_per_second || 2}</p>
                      <p className="text-xs text-muted-foreground mt-1">Messages/sec</p>
                      <p className="text-xs text-muted-foreground">per second</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-foreground">Messages per Day</p>
                  <p className="text-sm text-muted-foreground">Daily quota limit</p>
                </div>
                <div className="text-right">
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-foreground">{limits?.emails_per_day?.toLocaleString() || "5,000"}</p>
                      <p className="text-xs text-muted-foreground mt-1">Messages/day</p>
                      <p className="text-xs text-muted-foreground">per day</p>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {limits?.sent_today || 0} sent today • {limits?.remaining?.toLocaleString() || "5,000"} remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
