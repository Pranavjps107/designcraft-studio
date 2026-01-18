import { useState, useEffect } from "react";
import { MessageCircle, ShoppingBag, Zap, Mail, CreditCard, Database, Check, X, Settings, Loader2, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import api, { Integration } from "@/lib/api";
import { cn } from "@/lib/utils";

// Mock integrations
const mockIntegrations: Integration[] = [
  {
    id: "1",
    type: "whatsapp",
    name: "WhatsApp Business",
    description: "Connect your WhatsApp Business API for messaging",
    status: "connected",
    enabled: true,
    config: { phone_number: "+919876543210", phone_number_id: "108123456789" }
  },
  {
    id: null,
    type: "shopify",
    name: "Shopify",
    description: "Sync products and orders from your Shopify store",
    status: "available",
    enabled: false,
    config: null
  },
  {
    id: null,
    type: "zapier",
    name: "Zapier",
    description: "Automate workflows with 5,000+ apps",
    status: "available",
    enabled: false,
    config: null
  },
  {
    id: null,
    type: "stripe",
    name: "Stripe",
    description: "Accept payments directly in conversations",
    status: "available",
    enabled: false,
    config: null
  },
  {
    id: null,
    type: "mailchimp",
    name: "Mailchimp",
    description: "Sync contacts with your email marketing",
    status: "available",
    enabled: false,
    config: null
  },
  {
    id: null,
    type: "hubspot",
    name: "HubSpot CRM",
    description: "Sync contacts and deals with HubSpot",
    status: "available",
    enabled: false,
    config: null
  }
];

const integrationIcons: Record<string, any> = {
  whatsapp: MessageCircle,
  shopify: ShoppingBag,
  zapier: Zap,
  stripe: CreditCard,
  mailchimp: Mail,
  hubspot: Database,
};

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [isLoading, setIsLoading] = useState(false);
  const [connectDialog, setConnectDialog] = useState<Integration | null>(null);
  const [connectionConfig, setConnectionConfig] = useState<Record<string, string>>({});
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    setIsLoading(true);
    try {
      const data = await api.getIntegrations();
      if (data.integrations) {
        setIntegrations(data.integrations);
      }
    } catch (error) {
      console.log("Using mock integrations data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (integration: Integration) => {
    if (!integration.id) return;

    try {
      await api.toggleIntegration(integration.id, !integration.enabled);
      setIntegrations(integrations.map(i => 
        i.id === integration.id ? { ...i, enabled: !i.enabled } : i
      ));
      toast.success(`${integration.name} ${integration.enabled ? 'disabled' : 'enabled'}`);
    } catch (error) {
      toast.error("Failed to update integration");
    }
  };

  const handleConnect = async () => {
    if (!connectDialog) return;

    setIsConnecting(true);
    try {
      await api.connectIntegration(connectDialog.type, connectionConfig);
      toast.success(`${connectDialog.name} connected successfully!`);
      setConnectDialog(null);
      setConnectionConfig({});
      loadIntegrations();
    } catch (error) {
      toast.error("Failed to connect integration");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async (integration: Integration) => {
    if (!integration.id) return;

    try {
      await api.disconnectIntegration(integration.id);
      toast.success(`${integration.name} disconnected`);
      loadIntegrations();
    } catch (error) {
      toast.error("Failed to disconnect integration");
    }
  };

  const handleTest = async (integration: Integration) => {
    if (!integration.id) return;

    try {
      const result = await api.testIntegration(integration.id);
      if (result.success) {
        toast.success("Connection test successful!");
      } else {
        toast.error("Connection test failed");
      }
    } catch (error) {
      toast.error("Connection test failed");
    }
  };

  const getConnectionFields = (type: string) => {
    switch (type) {
      case "shopify":
        return [
          { key: "shop_url", label: "Shop URL", placeholder: "https://yourstore.myshopify.com" },
          { key: "access_token", label: "Access Token", placeholder: "shpat_xxxxxxxxxxxxx", type: "password" }
        ];
      case "stripe":
        return [
          { key: "api_key", label: "API Key", placeholder: "sk_live_xxxxxxxxxxxxx", type: "password" }
        ];
      case "mailchimp":
        return [
          { key: "api_key", label: "API Key", placeholder: "xxxxxxxxxxxxxxx-us1", type: "password" }
        ];
      case "hubspot":
        return [
          { key: "api_key", label: "API Key", placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", type: "password" }
        ];
      case "zapier":
        return [
          { key: "webhook_url", label: "Webhook URL", placeholder: "https://hooks.zapier.com/..." }
        ];
      default:
        return [];
    }
  };

  const connectedIntegrations = integrations.filter(i => i.status === "connected");
  const availableIntegrations = integrations.filter(i => i.status === "available");

  return (
    <div className="h-full bg-accent/20 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools to enhance your chatbot</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Connected Integrations */}
            {connectedIntegrations.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">Connected</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {connectedIntegrations.map((integration) => {
                    const Icon = integrationIcons[integration.type] || Zap;
                    return (
                      <Card key={integration.id || integration.type} className="relative">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-base">{integration.name}</CardTitle>
                                <Badge variant="outline" className="text-green-600 bg-green-50 mt-1">
                                  <Check className="h-3 w-3 mr-1" />
                                  Connected
                                </Badge>
                              </div>
                            </div>
                            <Switch
                              checked={integration.enabled}
                              onCheckedChange={() => handleToggle(integration)}
                            />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                          {integration.config && (
                            <p className="text-xs text-muted-foreground mb-4">
                              {integration.config.phone_number || integration.config.shop_url}
                            </p>
                          )}
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleTest(integration)}>
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Test
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-3 w-3 mr-1" />
                              Configure
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleDisconnect(integration)}
                            >
                              Disconnect
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Available Integrations */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Available Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableIntegrations.map((integration) => {
                  const Icon = integrationIcons[integration.type] || Zap;
                  return (
                    <Card key={integration.type} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-accent rounded-lg">
                            <Icon className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                        <Button 
                          className="w-full"
                          onClick={() => setConnectDialog(integration)}
                        >
                          Connect
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Connect Dialog */}
        <Dialog open={!!connectDialog} onOpenChange={() => setConnectDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect {connectDialog?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {connectDialog && getConnectionFields(connectDialog.type).map((field) => (
                <div key={field.key}>
                  <Label>{field.label}</Label>
                  <Input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={connectionConfig[field.key] || ""}
                    onChange={(e) => setConnectionConfig({
                      ...connectionConfig,
                      [field.key]: e.target.value
                    })}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConnectDialog(null)}>
                Cancel
              </Button>
              <Button onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}