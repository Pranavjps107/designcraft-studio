import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Search,
  MoreVertical,
  Paperclip,
  Send,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Archive,
  Download,
  Ban,
  Package,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Sarah Anderson",
    initials: "SA",
    lastMessage: "I need help with my recent order...",
    time: "2m",
    unread: 3,
    active: true,
  },
  {
    id: 2,
    name: "Michael Johnson",
    initials: "MJ",
    lastMessage: "Thank you for the support!",
    time: "15m",
    unread: 0,
    active: false,
  },
  {
    id: 3,
    name: "Emily Wilson",
    initials: "EW",
    lastMessage: "When will my order arrive?",
    time: "1h",
    unread: 1,
    active: false,
  },
  {
    id: 4,
    name: "David Brown",
    initials: "DB",
    lastMessage: "Can I change my shipping address?",
    time: "2h",
    unread: 0,
    active: false,
  },
  {
    id: 5,
    name: "Lisa Martinez",
    initials: "LM",
    lastMessage: "Great service, highly recommended!",
    time: "3h",
    unread: 0,
    active: false,
  },
];

const messages = [
  {
    id: 1,
    type: "received",
    text: "Hi there! I need help with my recent order #12345.",
    time: "10:30 AM",
    sender: "Sarah Anderson",
  },
  {
    id: 2,
    type: "sent",
    text: "Hello Sarah! I'd be happy to help you with order #12345. Let me pull up the details for you.",
    time: "10:31 AM",
  },
  {
    id: 3,
    type: "sent",
    text: "Your order is currently being processed and should ship within 24 hours. You'll receive a tracking number via email.",
    time: "10:31 AM",
  },
  {
    id: 4,
    type: "received",
    text: "Perfect! One more question - can I change the shipping address?",
    time: "10:33 AM",
    sender: "Sarah Anderson",
  },
  {
    id: 5,
    type: "sent",
    text: "Since your order hasn't shipped yet, yes! Please provide the new shipping address and I'll update it for you.",
    time: "10:34 AM",
  },
  {
    id: 6,
    type: "received",
    text: "New address: 123 Oak Street, San Francisco, CA 94102",
    time: "10:35 AM",
    sender: "Sarah Anderson",
  },
];

export default function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [filter, setFilter] = useState("all");

  return (
    <DashboardLayout hideTopBar>
      <div className="flex h-[calc(100vh-0px)]">
        {/* Conversation List */}
        <div className="w-80 bg-card border-r border-border flex flex-col">
          <div className="p-5 border-b border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Conversations</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {["all", "unread", "archived"].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f)}
                  className="capitalize"
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={cn(
                  "flex gap-3 p-4 cursor-pointer border-b border-border transition-colors",
                  selectedConversation.id === conv.id
                    ? "bg-accent border-l-2 border-l-primary"
                    : "hover:bg-muted"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-info flex-shrink-0 flex items-center justify-center text-info-foreground font-semibold">
                  {conv.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-foreground truncate">
                      {conv.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-semibold">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Chat Header */}
          <div className="h-16 px-6 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-info flex items-center justify-center text-info-foreground font-semibold">
                {selectedConversation.initials}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {selectedConversation.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary">● Online</span> • +1 234 567 8900
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="h-4 w-4" /> Search
              </Button>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-card rounded-full text-xs text-muted-foreground shadow-sm">
                Today
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.type === "sent" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold",
                    msg.type === "sent"
                      ? "bg-primary text-primary-foreground"
                      : "bg-info text-info-foreground"
                  )}
                >
                  {msg.type === "sent" ? "🤖" : "SA"}
                </div>
                <div className={cn("max-w-[60%]", msg.type === "sent" && "text-right")}>
                  <div
                    className={cn(
                      "rounded-xl px-4 py-3 shadow-sm",
                      msg.type === "sent"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <div
                    className={cn(
                      "flex gap-2 items-center mt-1 text-xs text-muted-foreground",
                      msg.type === "sent" && "justify-end"
                    )}
                  >
                    {msg.type === "sent" && <span>✓✓</span>}
                    <span>{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-3 items-center">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="w-80 bg-card border-l border-border overflow-y-auto">
          <div className="p-6 text-center border-b border-border">
            <div className="w-20 h-20 rounded-full bg-info flex items-center justify-center text-3xl font-semibold text-info-foreground mx-auto mb-4">
              {selectedConversation.initials}
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {selectedConversation.name}
            </h3>
            <p className="text-muted-foreground">+1 234 567 8900</p>
          </div>

          <div className="p-6 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Contact Information
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">sarah.a@email.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-xs font-medium">
                VIP Customer
              </span>
              <span className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-xs font-medium">
                Support
              </span>
            </div>
          </div>

          <div className="p-6 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Conversation Stats
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">47</p>
                <p className="text-xs text-muted-foreground">Total Messages</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Conversations</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">First Contact</p>
                  <p className="text-sm font-medium text-foreground">Jan 15, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Active</p>
                  <p className="text-sm font-medium text-foreground">2 minutes ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Actions
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Package className="h-4 w-4" /> View Orders
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Archive className="h-4 w-4" /> Archive Conversation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Download className="h-4 w-4" /> Export Chat
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-destructive hover:text-destructive"
              >
                <Ban className="h-4 w-4" /> Block Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
