import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Calendar, ChevronDown } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import api, { AnalyticsOverview, ConversationTrend, DeviceBreakdown, TopicDistribution, PerformanceData } from "@/lib/api";
import { toast } from "sonner";

const tabs = ["Overview", "Performance", "User Insights", "AI Metrics"];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [period, setPeriod] = useState("30d");
  const [isLoading, setIsLoading] = useState(true);
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [trends, setTrends] = useState<ConversationTrend[]>([]);
  const [devices, setDevices] = useState<DeviceBreakdown[]>([]);
  const [topics, setTopics] = useState<TopicDistribution[]>([]);
  const [responseBreakdown, setResponseBreakdown] = useState<Array<{ range: string; count: number }>>([]);
  const [performance, setPerformance] = useState<PerformanceData | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, [period, activeTab]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      if (activeTab === "Overview") {
        const [overviewData, trendsData, devicesData, topicsData, responseData] = await Promise.all([
          api.getAnalyticsOverview(period).catch(() => null),
          api.getConversationTrends(period).catch(() => ({ conversation_trends: [] })),
          api.getDeviceBreakdown().catch(() => ({ devices: [] })),
          api.getTopicDistribution().catch(() => ({ topics: [] })),
          api.getResponseTimeBreakdown().catch(() => ({ breakdown: [] })),
        ]);
        setOverview(overviewData);
        setTrends(trendsData.conversation_trends);
        setDevices(devicesData.devices);
        setTopics(topicsData.topics);
        setResponseBreakdown(responseData.breakdown);
      } else if (activeTab === "Performance") {
        const perfData = await api.getPerformanceData().catch(() => null);
        setPerformance(perfData);
      }
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  };

  const kpiData = overview?.kpis ? [
    { title: "Total Conversations", value: overview.kpis.total_conversations.value.toLocaleString(), change: `${overview.kpis.total_conversations.change}%`, up: overview.kpis.total_conversations.trend === "up" },
    { title: "Conversion Rate", value: `${overview.kpis.conversion_rate.value}%`, change: `${overview.kpis.conversion_rate.change}%`, up: overview.kpis.conversion_rate.trend === "up" },
    { title: "Avg Response Time", value: overview.kpis.avg_response_time.value, change: `${overview.kpis.avg_response_time.change}%`, up: overview.kpis.avg_response_time.trend === "down" },
    { title: "Message Volume", value: overview.kpis.message_volume.value, change: `${overview.kpis.message_volume.change}%`, up: overview.kpis.message_volume.trend === "up" },
    { title: "Active Users", value: overview.kpis.active_users.value.toLocaleString(), change: `${overview.kpis.active_users.change}%`, up: overview.kpis.active_users.trend === "up" },
    { title: "Bot Accuracy", value: `${overview.kpis.bot_accuracy.value}%`, change: `${overview.kpis.bot_accuracy.change}%`, up: overview.kpis.bot_accuracy.trend === "up" },
  ] : [];

  const comparisonData = performance?.comparison.metrics || [];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track and analyze your chatbot performance</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />Last {period === "7d" ? "7" : period === "30d" ? "30" : "90"} days<ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors", activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>{tab}</button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <>
            <div className="grid grid-cols-6 gap-4 mb-8">
              {isLoading ? Array(6).fill(0).map((_, i) => (<div key={i} className="bg-card rounded-xl p-5 border border-border"><Skeleton className="h-4 w-24 mb-3" /><Skeleton className="h-8 w-16 mb-2" /><Skeleton className="h-4 w-20" /></div>)) : kpiData.map((kpi) => (
                <div key={kpi.title} className="bg-card rounded-xl p-5 border border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-3">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground mb-2">{kpi.value}</p>
                  <div className="flex items-center gap-1 text-xs"><span className={kpi.up ? "text-primary" : "text-destructive"}>{kpi.up ? "↑" : "↓"} {kpi.change}</span><span className="text-muted-foreground">vs last period</span></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2 bg-card rounded-xl p-6 border border-border">
                <div className="flex justify-between items-center mb-6">
                  <div><h3 className="text-lg font-semibold text-foreground">Conversation Trends</h3><p className="text-sm text-muted-foreground">Monthly conversation volume</p></div>
                  <div className="flex gap-2">
                    <Button size="sm" variant={period === "7d" ? "default" : "outline"} onClick={() => setPeriod("7d")}>7D</Button>
                    <Button size="sm" variant={period === "30d" ? "default" : "outline"} onClick={() => setPeriod("30d")}>30D</Button>
                    <Button size="sm" variant={period === "90d" ? "default" : "outline"} onClick={() => setPeriod("90d")}>90D</Button>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trends.length > 0 ? trends : [{ date: "Week 1", conversations: 0, users: 0 }]}>
                      <defs><linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                      <Area type="monotone" dataKey="conversations" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#colorConv)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Device Breakdown</h3>
                <div className="h-44 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={devices.length > 0 ? devices : [{ name: "No data", value: 100, color: "hsl(var(--muted))" }]} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">{(devices.length > 0 ? devices : [{ name: "No data", value: 100, color: "hsl(var(--muted))" }]).map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-4">{devices.map((device) => (<div key={device.name} className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} /><span className="text-sm text-muted-foreground">{device.name}</span></div><span className="font-semibold text-foreground">{device.value}%</span></div>))}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Top Conversation Topics</h3>
                <div className="space-y-4">{topics.map((topic) => (<div key={topic.name}><div className="flex justify-between mb-1"><span className="text-sm text-foreground">{topic.name}</span><span className="text-sm font-medium text-foreground">{topic.percentage}%</span></div><div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${topic.percentage}%` }} /></div></div>))}</div>
              </div>
              <div className="col-span-2 bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Response Time Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={responseBreakdown.length > 0 ? responseBreakdown : [{ range: "0-30s", count: 0 }]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "Performance" && (
          <>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-card rounded-xl p-6 border border-border"><h3 className="text-lg font-semibold text-foreground mb-6">Resolution Rate</h3><div className="flex flex-col items-center"><div className="relative w-40 h-40"><svg className="w-full h-full transform -rotate-90"><circle cx="80" cy="80" r="70" stroke="hsl(var(--muted))" strokeWidth="12" fill="none" /><circle cx="80" cy="80" r="70" stroke="hsl(var(--primary))" strokeWidth="12" fill="none" strokeDasharray={`${(performance?.resolution_rate || 0) * 4.4} ${100 * 4.4}`} strokeLinecap="round" /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-4xl font-bold text-foreground">{performance?.resolution_rate || 0}%</span><span className="text-sm text-muted-foreground">Resolved</span></div></div></div></div>
              <div className="bg-card rounded-xl p-6 border border-border"><h3 className="text-lg font-semibold text-foreground mb-6">Customer Satisfaction</h3><div className="flex flex-col items-center"><div className="relative w-40 h-40"><svg className="w-full h-full transform -rotate-90"><circle cx="80" cy="80" r="70" stroke="hsl(var(--muted))" strokeWidth="12" fill="none" /><circle cx="80" cy="80" r="70" stroke="hsl(var(--primary))" strokeWidth="12" fill="none" strokeDasharray={`${((performance?.customer_satisfaction || 0) / 5) * 100 * 4.4} ${100 * 4.4}`} strokeLinecap="round" /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-4xl font-bold text-foreground">{performance?.customer_satisfaction || 0}</span><span className="text-sm text-muted-foreground">out of 5.0</span></div></div></div></div>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-5 border-b border-border"><h3 className="text-lg font-semibold text-foreground">Agent vs Bot Performance</h3></div>
              <table className="w-full"><thead><tr className="bg-muted/50"><th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">Metric</th><th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">Bot (AI)</th><th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">Human Agent</th><th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">Comparison</th></tr></thead><tbody>{comparisonData.map((row) => (<tr key={row.name} className="border-t border-border"><td className="px-6 py-4 font-medium text-foreground">{row.name}</td><td className={cn("px-6 py-4", row.winner === "bot" && "text-primary font-semibold")}>{row.bot}</td><td className={cn("px-6 py-4", row.winner === "agent" && "text-primary font-semibold")}>{row.agent}</td><td className="px-6 py-4"><span className={cn("inline-flex px-2 py-1 rounded text-xs font-medium", row.winner === "bot" ? "bg-accent text-accent-foreground" : "bg-warning/20 text-warning-foreground")}>{row.comparison}</span></td></tr>))}</tbody></table>
            </div>
          </>
        )}

        {(activeTab === "User Insights" || activeTab === "AI Metrics") && (<div className="flex items-center justify-center h-64 bg-card rounded-xl border border-border"><p className="text-muted-foreground">{activeTab} content coming soon...</p></div>)}
      </div>
    </DashboardLayout>
  );
}
