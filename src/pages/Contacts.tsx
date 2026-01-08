import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag } from "@/components/ui/tag";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Plus,
  Upload,
  Download,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Mail,
} from "lucide-react";

const contacts = [
  {
    id: 1,
    name: "Sarah Anderson",
    email: "sarah.a@email.com",
    phone: "+1 234 567 8900",
    initials: "SA",
    tags: ["VIP Customer", "Support"],
    messages: 47,
    lastActive: "2 minutes ago",
  },
  {
    id: 2,
    name: "Michael Johnson",
    email: "michael.j@email.com",
    phone: "+1 345 678 9012",
    initials: "MJ",
    tags: ["Sales"],
    messages: 23,
    lastActive: "15 minutes ago",
  },
  {
    id: 3,
    name: "Emily Wilson",
    email: "emily.w@email.com",
    phone: "+1 456 789 0123",
    initials: "EW",
    tags: ["Support"],
    messages: 12,
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.b@email.com",
    phone: "+1 567 890 1234",
    initials: "DB",
    tags: ["VIP Customer"],
    messages: 89,
    lastActive: "2 hours ago",
  },
  {
    id: 5,
    name: "Lisa Martinez",
    email: "lisa.m@email.com",
    phone: "+1 678 901 2345",
    initials: "LM",
    tags: [],
    messages: 5,
    lastActive: "1 day ago",
  },
];

export default function Contacts() {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const toggleContact = (id: number) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((c) => c.id));
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Contacts</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" /> Import CSV
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add contact
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9 max-w-md" />
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="w-12 px-6 py-4">
                  <Checkbox
                    checked={selectedContacts.length === contacts.length}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  First name
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Last name
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Audiences
                </th>
                <th className="w-12 px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={() => toggleContact(contact.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{contact.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {contact.name.split(" ")[0].toLowerCase()}
                  </td>
                  <td className="px-6 py-4 text-foreground">
                    {contact.name.split(" ")[1]?.charAt(0).toLowerCase() || ""}
                  </td>
                  <td className="px-6 py-4">
                    {contact.tags.length > 0 ? (
                      <div className="flex gap-2">
                        {contact.tags.slice(0, 1).map((tag) => (
                          <Tag key={tag} variant="general">
                            {tag === "VIP Customer" ? "General" : tag}
                          </Tag>
                        ))}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing 1 to {contacts.length} of {contacts.length} results
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
                <ChevronLeft className="h-4 w-4 -ml-2" />
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="sm" className="min-w-8">
                1
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
                <ChevronRight className="h-4 w-4 -ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Toast notification */}
        <div className="fixed bottom-8 right-8 bg-card rounded-lg shadow-lg border border-border px-4 py-3 flex items-center gap-3 animate-fade-in">
          <span className="text-sm text-foreground">Contact was successfully created.</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            ×
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
