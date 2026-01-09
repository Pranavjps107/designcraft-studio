import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, Zap, CreditCard, Mail, Calendar, BarChart3, Webhook, Settings, Loader2 } from "lucide-react";
import api, { Integration } from "@/lib/api";
import { toast } from "sonner";

const integrationIcons: Record<string, any> = {
  whatsapp: MessageSquare, zapier: Zap, stripe: CreditCard, mailchimp: Mail,
  google_calendar: Calendar, google_analytics: BarChart3, webhooks: Webhook, custom_api: Settings,
};

const integrationColors: Record<string, string> = {
  whatsapp: "bg-green-100 text-green-600", zapier: "bg-orange-100 text-orange-600",
  stripe: "bg-purple-100 text-purple-600", mailchimp: "bg-yellow-100 text-yellow-600",
  google_calendar: "bg-blue-100 text-blue-600", google_analytics: "bg-orange-100 text-orange-600",
  webhooks: "bg-gray-100 text-gray-600", custom_api: "bg-indigo-100 text-indigo-600",
};

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => { loadIntegrations(); }, []);

  const loadIntegrations = async () => {
    setIsLoading(true);
    try {
      const data = await api.getIntegrations();
      setIntegrations(data.integrations);
    } catch (error) { toast.error("Failed to load integrations"); }
    finally { setIsLoading(false); }
  };

  const handleToggle = async (integration: Integration) => {
    if (!integration.id) return;
    setTogglingId(integration.id);
    try {
      await api.toggleIntegration(integration.id, !integration.enabled);
      toast.success(`${integration.name} ${!integration.enabled ? "enabled" : "disabled"}`);
      loadIntegrations();
    } catch (error) { toast.error("Failed to toggle integration"); }
    finally { setTogglingId(null); }
  };

  const handleConnect = async (type: string) => {
    toast.info(`Please configure ${type} integration settings`);
  };

  const handleDisconnect = async (integration: Integration) => {
    if (!integration.id) return;
    try {
      await api.disconnectIntegration(integration.id);
      toast.success(`${integration.name} disconnected`);
      loadIntegrations();
    } catch (error) { toast.error("Failed to disconnect integration"); }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and services</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-6">{Array(8).fill(0).map((_, i) => (<div key={i} className="bg-card rounded-xl p-6 border border-border"><div className="flex items-start gap-4"><Skeleton className="w-12 h-12 rounded-xl" /><div className="flex-1"><Skeleton className="h-5 w-32 mb-2" /><Skeleton className="h-4 w-48" /></div><Skeleton className="h-6 w-12" /></div></div>))}</div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {integrations.map((integration) => {
              const Icon = integrationIcons[integration.type] || Settings;
              const color = integrationColors[integration.type] || "bg-gray-100 text-gray-600";
              return (
                <div key={integration.type} className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}><Icon className="h-6 w-6" /></div>
                      <div>
                        <h3 className="font-semibold text-foreground">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    {integration.status === "connected" ? (
                      <Switch checked={integration.enabled} onCheckedChange={() => handleToggle(integration)} disabled={togglingId === integration.id} />
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleConnect(integration.type)}>Connect</Button>
                    )}
                  </div>
                  {integration.status === "connected" && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      <StatusBadge status="active">Connected</StatusBadge>
                      <Button variant="ghost" size="sm" className="ml-auto" onClick={() => handleDisconnect(integration)}>Disconnect</Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
