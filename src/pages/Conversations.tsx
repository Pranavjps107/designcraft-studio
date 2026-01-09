import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Search,
  MoreVertical,
  Paperclip,
  Send,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Archive,
  Download,
  Ban,
  Package,
  Loader2,
} from "lucide-react";
import api, { Conversation, Message, ConversationMessages } from "@/lib/api";
import { toast } from "sonner";

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationDetails, setConversationDetails] = useState<ConversationMessages | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const [search, setSearch] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConversations();
  }, [filter, search]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const data = await api.getConversations({ filter, search });
      setConversations(data.conversations);
      if (data.conversations.length > 0 && !selectedConversation) {
        setSelectedConversation(data.conversations[0]);
      }
    } catch (error) {
      toast.error("Failed to load conversations");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (contactId: string) => {
    setIsLoadingMessages(true);
    try {
      // Fetch both conversation details and messages in parallel
      const [detailData, messagesData] = await Promise.all([
        api.getConversationDetail(contactId),
        api.getMessages(contactId),
      ]);
      
      setMessages(messagesData.messages);
      setConversationDetails(messagesData);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation) return;

    setIsSending(true);
    try {
      const newMessage = await api.sendMessage(selectedConversation.id, messageInput);
      setMessages([...messages, newMessage]);
      setMessageInput("");
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const handleArchive = async () => {
    if (!selectedConversation) return;
    try {
      await api.archiveConversation(selectedConversation.id);
      toast.success("Conversation archived");
      loadConversations();
    } catch (error) {
      toast.error("Failed to archive conversation");
    }
  };

  const handleExport = async () => {
    if (!selectedConversation) return;
    try {
      const blob = await api.exportConversation(selectedConversation.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `conversation-${selectedConversation?.name || "export"}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to export conversation");
    }
  };

  const handleBlock = async () => {
    if (!selectedConversation) return;
    try {
      await api.blockContact(selectedConversation.id);
      toast.success("Contact blocked");
      loadConversations();
    } catch (error) {
      toast.error("Failed to block contact");
    }
  };

  const safeInitials = (contact?: { initials?: string; name?: string }) => {
    if (!contact) return "?";
    if (contact.initials) return contact.initials;
    if (contact.name) return contact.name.charAt(0).toUpperCase();
    return "?";
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(["all", "unread", "archived"] as const).map((f) => (
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
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex gap-3 p-4 border-b border-border">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No conversations found
              </div>
            ) : (
              conversations
                .map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={cn(
                    "flex gap-3 p-4 cursor-pointer border-b border-border transition-colors",
                    selectedConversation?.id === conv.id
                      ? "bg-accent border-l-2 border-l-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-info flex-shrink-0 flex items-center justify-center text-info-foreground font-semibold">
                    {conv.initials || conv.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-foreground truncate">
                        {conv.name || "Unknown"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(conv.last_message_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.last_message}
                    </p>
                  </div>
                  {conv.unread_count > 0 && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-semibold">
                      {conv.unread_count}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="h-16 px-6 border-b border-border flex items-center justify-between bg-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-info flex items-center justify-center text-info-foreground font-semibold">
                    {selectedConversation.initials || selectedConversation.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {selectedConversation.name || "Unknown"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground">
                        ● Offline
                      </span> • {selectedConversation.phone || "N/A"}
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
                {isLoadingMessages ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
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
                          msg.direction === "outbound" && "flex-row-reverse"
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold",
                            msg.direction === "outbound"
                              ? "bg-primary text-primary-foreground"
                              : "bg-info text-info-foreground"
                          )}
                        >
                          {msg.direction === "outbound" ? "🤖" : selectedConversation.initials || selectedConversation.name.charAt(0).toUpperCase()}
                        </div>
                        <div className={cn("max-w-[60%]", msg.direction === "outbound" && "text-right")}>
                          <div
                            className={cn(
                              "rounded-xl px-4 py-3 shadow-sm",
                              msg.direction === "outbound"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card text-foreground"
                            )}
                          >
                            <p className="text-sm leading-relaxed">{msg.body}</p>
                          </div>
                          <div
                            className={cn(
                              "flex gap-2 items-center mt-1 text-xs text-muted-foreground",
                              msg.direction === "outbound" && "justify-end"
                            )}
                          >
                            {msg.direction === "outbound" && <span>✓✓</span>}
                            <span>{formatTime(msg.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
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
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isSending}
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={isSending || !messageInput.trim()}>
                    {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>

        {/* Contact Details */}
        {selectedConversation && (
          <div className="w-80 bg-card border-l border-border overflow-y-auto">
            <div className="p-6 text-center border-b border-border">
              <div className="w-20 h-20 rounded-full bg-info flex items-center justify-center text-3xl font-semibold text-info-foreground mx-auto mb-4">
                {safeInitials(selectedConversation.contact)}
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {selectedConversation.name || "Unknown"}
              </h3>
              <p className="text-muted-foreground">{selectedConversation.phone || "N/A"}</p>
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
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedConversation.phone || "Not available"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">
                      {selectedConversation.attributes?.location || "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedConversation.attributes && Object.entries(selectedConversation.attributes).map(([key, value]) => (
                  <span key={key} className="px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-xs font-medium">
                    {value}
                  </span>
                ))}
                {(!conversationDetails?.contact.tags || (Array.isArray(conversationDetails.contact.tags) && conversationDetails.contact.tags.length === 0)) && (
                  <span className="text-sm text-muted-foreground">No tags</span>
                )}
              </div>
            </div>

            <div className="p-6 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Conversation Stats
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {conversationDetails?.stats.total_messages || 0}
                  </p>
                  <p className="text-xs text-muted-foreground">Total Messages</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {conversationDetails?.stats.total_conversations || 0}
                  </p>
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
                    <p className="text-sm font-medium text-foreground">
                      {conversationDetails?.stats.first_contact 
                        ? new Date(conversationDetails.stats.first_contact).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Active</p>
                    <p className="text-sm font-medium text-foreground">
                      {conversationDetails?.stats.last_active || "N/A"}
                    </p>
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
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleArchive}>
                  <Archive className="h-4 w-4" /> Archive Conversation
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={handleExport}>
                  <Download className="h-4 w-4" /> Export Chat
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive"
                  onClick={handleBlock}
                >
                  <Ban className="h-4 w-4" /> Block Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
