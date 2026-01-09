import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { User, Bell, Shield, CreditCard, Users, Globe, Palette, Loader2 } from "lucide-react";
import api, { UserProfile, NotificationPreferences } from "@/lib/api";
import { toast } from "sonner";

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "team", label: "Team", icon: Users },
  { id: "language", label: "Language", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationPreferences | null>(null);
  const [profileForm, setProfileForm] = useState({ firstName: "", lastName: "", email: "", company: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });

  useEffect(() => { loadData(); }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === "profile") {
        const data = await api.getUserProfile();
        setProfile(data);
        const [firstName, ...rest] = data.name.split(" ");
        setProfileForm({ firstName, lastName: rest.join(" "), email: data.email, company: data.tenant.name });
      } else if (activeTab === "notifications") {
        const data = await api.getNotificationPreferences();
        setNotifications(data);
      }
    } catch (error) { toast.error("Failed to load settings"); }
    finally { setIsLoading(false); }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await api.updateUserProfile({ name: `${profileForm.firstName} ${profileForm.lastName}`, email: profileForm.email });
      toast.success("Profile updated successfully");
    } catch (error: any) { toast.error(error.message || "Failed to update profile"); }
    finally { setIsSaving(false); }
  };

  const handleSaveNotifications = async () => {
    if (!notifications) return;
    setIsSaving(true);
    try {
      await api.updateNotificationPreferences(notifications);
      toast.success("Notification preferences updated");
    } catch (error: any) { toast.error(error.message || "Failed to update notifications"); }
    finally { setIsSaving(false); }
  };

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error("Please fill in both password fields");
      return;
    }
    setIsSaving(true);
    try {
      await api.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      toast.success("Password changed successfully");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (error: any) { toast.error(error.message || "Failed to change password"); }
    finally { setIsSaving(false); }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="flex gap-8">
          <div className="w-56 space-y-1">
            {settingsTabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors", activeTab === tab.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}><tab.icon className="h-5 w-5" />{tab.label}</button>))}
          </div>

          <div className="flex-1 max-w-2xl">
            {activeTab === "profile" && (
              <div className="bg-card rounded-xl p-8 border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Profile Settings</h2>
                {isLoading ? (<div className="space-y-6"><Skeleton className="h-20 w-20 rounded-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>) : (
                  <>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 rounded-full bg-info flex items-center justify-center text-2xl font-bold text-info-foreground">{profileForm.firstName[0]}{profileForm.lastName[0]}</div>
                      <div><Button variant="outline" size="sm">Change Photo</Button><p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. Max size 2MB.</p></div>
                    </div>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label htmlFor="firstName">First Name</Label><Input id="firstName" value={profileForm.firstName} onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })} /></div>
                        <div className="space-y-2"><Label htmlFor="lastName">Last Name</Label><Input id="lastName" value={profileForm.lastName} onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })} /></div>
                      </div>
                      <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} /></div>
                      <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" value={profileForm.company} disabled /></div>
                      <Separator />
                      <div className="flex justify-end"><Button onClick={handleSaveProfile} disabled={isSaving}>{isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Changes"}</Button></div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-card rounded-xl p-8 border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>
                {isLoading ? (<div className="space-y-6">{Array(4).fill(0).map((_, i) => (<div key={i} className="flex justify-between"><Skeleton className="h-10 w-48" /><Skeleton className="h-6 w-12" /></div>))}</div>) : notifications && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between"><div><p className="font-medium text-foreground">Email Notifications</p><p className="text-sm text-muted-foreground">Receive notifications via email</p></div><Switch checked={notifications.email_enabled} onCheckedChange={(c) => setNotifications({ ...notifications, email_enabled: c })} /></div>
                    <Separator />
                    <div className="flex items-center justify-between"><div><p className="font-medium text-foreground">New Conversations</p><p className="text-sm text-muted-foreground">Get notified when a new conversation starts</p></div><Switch checked={notifications.new_conversations} onCheckedChange={(c) => setNotifications({ ...notifications, new_conversations: c })} /></div>
                    <div className="flex items-center justify-between"><div><p className="font-medium text-foreground">Unread Messages</p><p className="text-sm text-muted-foreground">Reminder for unread messages</p></div><Switch checked={notifications.unread_messages} onCheckedChange={(c) => setNotifications({ ...notifications, unread_messages: c })} /></div>
                    <div className="flex items-center justify-between"><div><p className="font-medium text-foreground">Weekly Reports</p><p className="text-sm text-muted-foreground">Receive weekly analytics summary</p></div><Switch checked={notifications.weekly_reports} onCheckedChange={(c) => setNotifications({ ...notifications, weekly_reports: c })} /></div>
                    <Separator />
                    <div className="flex justify-end"><Button onClick={handleSaveNotifications} disabled={isSaving}>{isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Changes"}</Button></div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-card rounded-xl p-8 border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div className="space-y-2"><Label htmlFor="currentPassword">Current Password</Label><Input id="currentPassword" type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} /></div>
                  <div className="space-y-2"><Label htmlFor="newPassword">New Password</Label><Input id="newPassword" type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} /></div>
                  <div className="flex justify-end"><Button onClick={handleChangePassword} disabled={isSaving}>{isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Changing...</> : "Change Password"}</Button></div>
                </div>
              </div>
            )}

            {!["profile", "notifications", "security"].includes(activeTab) && (
              <div className="bg-card rounded-xl p-8 border border-border flex items-center justify-center h-64">
                <p className="text-muted-foreground">{settingsTabs.find((t) => t.id === activeTab)?.label} settings coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
