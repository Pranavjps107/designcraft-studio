import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/dashboard/KPICard";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronDown,
  TrendingUp,
  MessageSquare,
  Target,
  Clock,
  BarChart3,
  Users,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const tabs = ["Overview", "Performance", "User Insights", "AI Metrics"];

const kpiData = [
  { title: "Total Conversations", value: "12,847", change: "12.5%", up: true },
  { title: "Conversion Rate", value: "34.2%", change: "5.8%", up: true },
  { title: "Avg Response Time", value: "1.8m", change: "18.3%", up: false },
  { title: "Message Volume", value: "48.2K", change: "8.9%", up: true },
  { title: "Active Users", value: "3,284", change: "15.2%", up: true },
  { title: "Bot Accuracy", value: "92.4%", change: "3.1%", up: true },
];

const chartData = [
  { name: "Week 1", conversations: 2400, users: 1200 },
  { name: "Week 2", conversations: 3200, users: 1500 },
  { name: "Week 3", conversations: 2800, users: 1400 },
  { name: "Week 4", conversations: 4000, users: 2000 },
];

const topicData = [
  { name: "Order Issues", value: 35 },
  { name: "Shipping", value: 25 },
  { name: "Product Info", value: 20 },
  { name: "Returns", value: 12 },
  { name: "Other", value: 8 },
];

const deviceData = [
  { name: "Mobile", value: 45, color: "hsl(var(--primary))" },
  { name: "Desktop", value: 30, color: "hsl(var(--info))" },
  { name: "Tablet", value: 25, color: "hsl(160 50% 60%)" },
];

const comparisonData = [
  { metric: "Avg Response Time", bot: "0.8 seconds", agent: "2.4 minutes", comparison: "Bot 180x faster", botWins: true },
  { metric: "Resolution Rate", bot: "87.3%", agent: "94.8%", comparison: "Agent +7.5%", botWins: false },
  { metric: "Conversations Handled", bot: "11,247", agent: "1,600", comparison: "Bot 7x more", botWins: true },
  { metric: "Customer Satisfaction", bot: "4.5 / 5.0", agent: "4.8 / 5.0", comparison: "Agent +0.3", botWins: false },
  { metric: "Cost per Conversation", bot: "$0.02", agent: "$3.50", comparison: "Bot 175x cheaper", botWins: true },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track and analyze your chatbot performance
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 days
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <>
            {/* KPI Row */}
            <div className="grid grid-cols-6 gap-4 mb-8">
              {kpiData.map((kpi) => (
                <div
                  key={kpi.title}
                  className="bg-card rounded-xl p-5 border border-border"
                >
                  <p className="text-xs font-medium text-muted-foreground mb-3">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mb-2">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className={kpi.up ? "text-primary" : "text-destructive"}>
                      {kpi.up ? "↑" : "↓"} {kpi.change}
                    </span>
                    <span className="text-muted-foreground">vs last period</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* Conversation Trends */}
              <div className="col-span-2 bg-card rounded-xl p-6 border border-border">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Conversation Trends
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Monthly conversation volume
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">7D</Button>
                    <Button variant="outline" size="sm">30D</Button>
                    <Button variant="outline" size="sm">90D</Button>
                  </div>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
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
                        fill="url(#colorConv)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Device Breakdown */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Device Breakdown
                </h3>
                <div className="h-44 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-4">
                  {deviceData.map((device) => (
                    <div key={device.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: device.color }}
                        />
                        <span className="text-sm text-muted-foreground">{device.name}</span>
                      </div>
                      <span className="font-semibold text-foreground">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Topic Distribution */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Top Conversation Topics
                </h3>
                <div className="space-y-4">
                  {topicData.map((topic) => (
                    <div key={topic.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-foreground">{topic.name}</span>
                        <span className="text-sm font-medium text-foreground">{topic.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${topic.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-2 bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Response Time Breakdown
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { range: "0-30s", count: 450 },
                      { range: "30s-1m", count: 280 },
                      { range: "1-2m", count: 120 },
                      { range: "2m+", count: 50 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="range" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
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
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Resolution Rate Gauge */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Resolution Rate
                </h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${92 * 4.4} ${100 * 4.4}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">92%</span>
                      <span className="text-sm text-muted-foreground">Resolved</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Satisfaction Gauge */}
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Customer Satisfaction
                </h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${94 * 4.4} ${100 * 4.4}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-foreground">4.7</span>
                      <span className="text-sm text-muted-foreground">out of 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-5 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  Agent vs Bot Performance
                </h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Bot (AI)
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Human Agent
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Comparison
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.metric} className="border-t border-border">
                      <td className="px-6 py-4 font-medium text-foreground">
                        {row.metric}
                      </td>
                      <td className={cn("px-6 py-4", row.botWins && "text-primary font-semibold")}>
                        {row.bot}
                      </td>
                      <td className={cn("px-6 py-4", !row.botWins && "text-primary font-semibold")}>
                        {row.agent}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex px-2 py-1 rounded text-xs font-medium",
                            row.botWins
                              ? "bg-accent text-accent-foreground"
                              : "bg-warning/20 text-warning-foreground"
                          )}
                        >
                          {row.comparison}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {(activeTab === "User Insights" || activeTab === "AI Metrics") && (
          <div className="flex items-center justify-center h-64 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground">
              {activeTab} content coming soon...
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
