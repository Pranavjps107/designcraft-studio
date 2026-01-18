import { useState, useEffect, useRef } from "react";
import { Search, Filter, MoreVertical, Send, Archive, Download, Ban, Phone, Mail, MapPin, MessageCircle, Users, Calendar, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import api, { Conversation, Message, Contact } from "@/lib/api";

// Mock data for demo
const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Anderson",
    phone: "+919876543210",
    last_seen_at: "2 min ago",
    last_message: "I need help with my recent order #12345",
    last_message_at: "2025-01-08T10:30:00Z",
    unread_count: 3
  },
  {
    id: "2",
    name: "Michael Chen",
    phone: "+918765432109",
    last_seen_at: "15 min ago",
    last_message: "Thanks for the quick response!",
    last_message_at: "2025-01-08T10:15:00Z",
    unread_count: 0
  },
  {
    id: "3",
    name: "Emily Roberts",
    phone: "+917654321098",
    last_seen_at: "1 hour ago",
    last_message: "When will my shipment arrive?",
    last_message_at: "2025-01-08T09:30:00Z",
    unread_count: 1
  }
];

const mockMessages: Message[] = [
  { id: "1", direction: "inbound", body: "Hi there! I need help with my recent order #12345.", created_at: "2025-01-08T10:30:00Z", status: "read", role: "user" },
  { id: "2", direction: "outbound", body: "Hello Sarah! I'd be happy to help you with your order. Could you please provide more details about the issue?", created_at: "2025-01-08T10:31:00Z", status: "sent", role: "assistant" },
  { id: "3", direction: "inbound", body: "The package arrived damaged. Several items are broken.", created_at: "2025-01-08T10:32:00Z", status: "read", role: "user" },
  { id: "4", direction: "outbound", body: "I'm so sorry to hear that! I can see your order #12345 was delivered yesterday. Let me process a replacement for the damaged items right away.", created_at: "2025-01-08T10:33:00Z", status: "sent", role: "assistant" },
];

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadConversations();
  }, [filter, searchQuery]);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const data = await api.getConversations({ search: searchQuery, filter });
      if (data.conversations && data.conversations.length > 0) {
        setConversations(data.conversations);
      }
    } catch (error) {
      // Use mock data if API fails
      console.log("Using mock data for conversations");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (contactId: string) => {
    try {
      const data = await api.getMessages(contactId);
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.log("Using mock data for messages");
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    setIsSending(true);
    const messageToSend = newMessage;
    setNewMessage("");

    // Optimistic update
    const tempMessage: Message = {
      id: Date.now().toString(),
      direction: "outbound",
      body: messageToSend,
      created_at: new Date().toISOString(),
      status: "sending",
      role: "assistant"
    };
    setMessages(prev => [...prev, tempMessage]);

    try {
      await api.sendMessage(selectedConversation.id, messageToSend);
      toast.success("Message sent!");
    } catch (error) {
      toast.error("Failed to send message");
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
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `conversation-${selectedConversation.id}.csv`;
      a.click();
      toast.success("Conversation exported");
    } catch (error) {
      toast.error("Failed to export conversation");
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex bg-background">
      {/* Conversations List */}
      <div className="w-80 border-r border-border flex flex-col bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">Conversations</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mt-3">
            {(['all', 'unread', 'archived'] as const).map((f) => (
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
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation);
                  loadMessages(conversation.id);
                }}
                className={cn(
                  "p-4 border-b border-border cursor-pointer hover:bg-accent/50 transition-colors",
                  selectedConversation?.id === conversation.id && "bg-accent"
                )}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getInitials(conversation.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground truncate">
                        {conversation.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {conversation.last_seen_at}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {conversation.last_message}
                    </p>
                    {conversation.unread_count > 0 && (
                      <Badge variant="default" className="mt-1 text-xs">
                        {conversation.unread_count} new
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(selectedConversation.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedConversation.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedConversation.phone}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleArchive}>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Ban className="h-4 w-4 mr-2" />
                    Block Contact
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-accent/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.direction === "outbound" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-3",
                      message.direction === "outbound"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card text-foreground border border-border rounded-bl-md"
                    )}
                  >
                    <p className="text-sm">{message.body}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      message.direction === "outbound" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {formatTime(message.created_at)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={isSending || !newMessage.trim()}>
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-accent/20">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a conversation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Contact Details Sidebar */}
      {selectedConversation && (
        <div className="w-72 border-l border-border bg-card p-4">
          <div className="text-center mb-6">
            <Avatar className="h-20 w-20 mx-auto mb-3">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {getInitials(selectedConversation.name)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-lg text-foreground">{selectedConversation.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedConversation.phone}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{selectedConversation.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">contact@email.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">San Francisco, CA</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent/50 rounded-lg p-3 text-center">
                <MessageCircle className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-semibold text-foreground">47</p>
                <p className="text-xs text-muted-foreground">Messages</p>
              </div>
              <div className="bg-accent/50 rounded-lg p-3 text-center">
                <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                <p className="text-lg font-semibold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Conversations</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">VIP Customer</Badge>
              <Badge variant="secondary">Support</Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}