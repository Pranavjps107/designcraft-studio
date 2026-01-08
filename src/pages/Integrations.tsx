import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Switch } from "@/components/ui/switch";
import {
  MessageSquare,
  Zap,
  CreditCard,
  Mail,
  Calendar,
  BarChart3,
  Webhook,
  Settings,
} from "lucide-react";

const integrations = [
  {
    id: 1,
    name: "WhatsApp Business",
    description: "Connect your WhatsApp Business API for messaging",
    icon: MessageSquare,
    status: "connected",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    name: "Zapier",
    description: "Automate workflows with 5,000+ apps",
    icon: Zap,
    status: "available",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    name: "Stripe",
    description: "Accept payments and manage subscriptions",
    icon: CreditCard,
    status: "available",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    name: "Mailchimp",
    description: "Sync contacts and send email campaigns",
    icon: Mail,
    status: "available",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 5,
    name: "Google Calendar",
    description: "Schedule appointments and send reminders",
    icon: Calendar,
    status: "available",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 6,
    name: "Google Analytics",
    description: "Track conversation analytics and metrics",
    icon: BarChart3,
    status: "connected",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 7,
    name: "Webhooks",
    description: "Send data to external services via webhooks",
    icon: Webhook,
    status: "available",
    color: "bg-gray-100 text-gray-600",
  },
  {
    id: 8,
    name: "Custom API",
    description: "Connect your own APIs and services",
    icon: Settings,
    status: "available",
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function Integrations() {
  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your favorite tools and services
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${integration.color}`}
                  >
                    <integration.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                  </div>
                </div>
                {integration.status === "connected" ? (
                  <Switch defaultChecked />
                ) : (
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                )}
              </div>
              {integration.status === "connected" && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <StatusBadge status="active">Connected</StatusBadge>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Configure
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
