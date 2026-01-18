import { useState, useEffect } from "react";
import { MessageSquare, Users, Clock, TrendingUp, ArrowUp, ArrowDown, Bot, UserCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import api, { AnalyticsOverview, ConversationTrend, DeviceBreakdown, PerformanceData } from "@/lib/api";
import { cn } from "@/lib/utils";

// Mock data
const mockOverview: AnalyticsOverview = {
  total_messages: 48200,
  total_conversations: 12847,
  inbound_messages: 28000,
  outbound_messages: 20200,
  average_response_time_seconds: 108,
  conversation_growth_percent: 12.5
};

const mockTrends: ConversationTrend[] = [
  { date: "Week 1", conversations: 2400, users: 1200 },
  { date: "Week 2", conversations: 3200, users: 1500 },
  { date: "Week 3", conversations: 2800, users: 1400 },
  { date: "Week 4", conversations: 3800, users: 1900 },
];

const mockDevices: DeviceBreakdown[] = [
  { name: "Mobile", value: 45, color: "hsl(var(--primary))" },
  { name: "Desktop", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Tablet", value: 25, color: "hsl(var(--chart-3))" },
];

const mockPerformance: PerformanceData = {
  resolution_rate: 92,
  customer_satisfaction: 4.7,
  comparison: {
    metrics: [
      { name: "Avg Response Time", bot: "0.8 seconds", agent: "2.4 minutes", winner: "bot", comparison: "Bot 180x faster" },
      { name: "Resolution Rate", bot: "87.3%", agent: "94.8%", winner: "agent", comparison: "Agent +7.5%" },
      { name: "Cost per Conversation", bot: "$0.02", agent: "$3.50", winner: "bot", comparison: "Bot 175x cheaper" },
      { name: "24/7 Availability", bot: "Yes", agent: "No", winner: "bot", comparison: "Bot always available" },
    ]
  }
};

export default function Analytics() {
  const [period, setPeriod] = useState("30d");
  const [overview, setOverview] = useState<AnalyticsOverview>(mockOverview);
  const [trends, setTrends] = useState<ConversationTrend[]>(mockTrends);
  const [devices, setDevices] = useState<DeviceBreakdown[]>(mockDevices);
  const [performance, setPerformance] = useState<PerformanceData>(mockPerformance);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, [period]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const [overviewData, trendsData, devicesData, performanceData] = await Promise.all([
        api.getAnalyticsOverview(period),
        api.getConversationTrends(period),
        api.getDeviceBreakdown(),
        api.getPerformanceData()
      ]);
      
      if (overviewData) setOverview(overviewData);
      if (trendsData?.conversation_trends) setTrends(trendsData.conversation_trends);
      if (devicesData?.devices) setDevices(devicesData.devices);
      if (performanceData) setPerformance(performanceData);
    } catch (error) {
      console.log("Using mock analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    return `${(seconds / 60).toFixed(1)}m`;
  };

  const kpiCards = [
    {
      title: "Total Conversations",
      value: formatNumber(overview.total_conversations),
      change: overview.conversation_growth_percent,
      icon: MessageSquare,
      trend: overview.conversation_growth_percent >= 0 ? "up" : "down"
    },
    {
      title: "Message Volume",
      value: formatNumber(overview.total_messages),
      change: 8.9,
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Avg Response Time",
      value: formatTime(overview.average_response_time_seconds),
      change: -18.3,
      icon: Clock,
      trend: "down"
    },
    {
      title: "Active Users",
      value: formatNumber(3284),
      change: 15.2,
      icon: Users,
      trend: "up"
    },
  ];

  return (
    <div className="h-full bg-accent/20 p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Track your chatbot performance and insights</p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpiCards.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <kpi.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        kpi.trend === "up" ? "text-green-600" : "text-red-600"
                      )}>
                        {kpi.trend === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                        {Math.abs(kpi.change)}%
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                      <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversation Trends */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Conversation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end gap-4 px-4">
                    {trends.map((trend, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex gap-1 items-end h-48">
                          <div
                            className="flex-1 bg-primary rounded-t"
                            style={{ height: `${(trend.conversations / 4000) * 100}%` }}
                          />
                          <div
                            className="flex-1 bg-primary/40 rounded-t"
                            style={{ height: `${(trend.users / 2000) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{trend.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-primary" />
                      <span className="text-sm text-muted-foreground">Conversations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-primary/40" />
                      <span className="text-sm text-muted-foreground">Users</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Device Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {devices.map((device, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-foreground">{device.name}</span>
                          <span className="text-sm font-medium text-foreground">{device.value}%</span>
                        </div>
                        <div className="h-2 bg-accent rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${device.value}%`, opacity: 1 - index * 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Message Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <ArrowDown className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">{formatNumber(overview.inbound_messages)}</p>
                      <p className="text-sm text-muted-foreground">Inbound</p>
                    </div>
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <ArrowUp className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-foreground">{formatNumber(overview.outbound_messages)}</p>
                      <p className="text-sm text-muted-foreground">Outbound</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Time Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { range: "0-30s", count: 450, percentage: 50 },
                      { range: "30s-1m", count: 280, percentage: 31 },
                      { range: "1-2m", count: 120, percentage: 13 },
                      { range: "2m+", count: 50, percentage: 6 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-16">{item.range}</span>
                        <div className="flex-1 h-6 bg-accent rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${item.percentage}%` }}
                          >
                            <span className="text-xs text-primary-foreground font-medium">{item.count}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resolution Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="hsl(var(--accent))"
                          strokeWidth="12"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="12"
                          strokeDasharray={`${performance.resolution_rate * 4.4} 440`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-foreground">{performance.resolution_rate}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-5xl font-bold text-foreground mb-2">{performance.customer_satisfaction}</p>
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={cn(
                            "text-2xl",
                            star <= Math.round(performance.customer_satisfaction) ? "text-yellow-400" : "text-gray-200"
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Based on customer feedback</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bot vs Agent Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Bot vs Agent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Metric</th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                          <div className="flex items-center justify-center gap-2">
                            <Bot className="h-4 w-4" />
                            Bot
                          </div>
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                          <div className="flex items-center justify-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            Agent
                          </div>
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Comparison</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performance.comparison.metrics.map((metric, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="py-4 px-4 text-sm text-foreground">{metric.name}</td>
                          <td className={cn(
                            "py-4 px-4 text-sm text-center font-medium",
                            metric.winner === "bot" ? "text-green-600" : "text-foreground"
                          )}>
                            {metric.bot}
                          </td>
                          <td className={cn(
                            "py-4 px-4 text-sm text-center font-medium",
                            metric.winner === "agent" ? "text-green-600" : "text-foreground"
                          )}>
                            {metric.agent}
                          </td>
                          <td className="py-4 px-4 text-sm text-muted-foreground">{metric.comparison}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}