# Quick Reference Guide - DesignCraft Studio

## 📑 Page-by-Page Feature Matrix

| Page | Features | Buttons | Tables | Charts | Forms |
|------|----------|---------|--------|--------|-------|
| **Dashboard** | 7 | 10 | 2 | 1 | 0 |
| **Conversations** | 8 | 9 | 0 | 0 | 1 |
| **Contacts** | 6 | 7 | 1 | 0 | 1 |
| **Analytics** | 9 | 4 | 1 | 4 | 0 |
| **Knowledge Base** | 7 | 5 | 1 | 0 | 1 |
| **Settings** | 5 | 4 | 0 | 0 | 3 |
| **Integrations** | 3 | 3 | 0 | 0 | 0 |

---

## 🎯 Dashboard - Quick Reference

### KPIs (4 cards)
- Total Conversations
- Total Messages  
- Inbound Messages
- Avg Response Time

### Quick Actions (4 buttons)
- Create Campaign
- Add Contact
- Create Audience
- Send Message

### Charts
- Daily Message Volume (Area Chart)
- Credits & Pricing (Card)

### Tables
- Recent Campaigns (5 rows)
- Recent Messages (5 rows)

### Key Metrics
- Sending Limits (Messages/sec, Messages/day)
- Credit Balance
- Growth Percentages

---

## 💬 Conversations - Quick Reference

### Layout
- **3-Panel**: List | Chat | Details

### Left Panel
- Search bar
- Filters: All, Unread, Archived
- Conversation list with avatars

### Center Panel
- Chat header (name, status, phone)
- Message area (inbound/outbound)
- Input area (attach, send)

### Right Panel
- Contact profile
- Contact info (phone, location)
- Tags
- Stats (messages, conversations, dates)
- Actions (view orders, archive, export, block)

---

## 👥 Contacts - Quick Reference

### Table Columns
1. Checkbox (bulk select)
2. Name (with avatar)
3. Phone
4. Messages (count)
5. Last Seen (date)
6. Actions (edit, delete)

### Actions
- Import CSV
- Add contact
- Edit contact
- Delete contact
- Bulk operations

### Pagination
- First, Previous, Current, Next, Last
- Shows "X to Y of Z results"

---

## 📊 Analytics - Quick Reference

### Tabs
1. Overview
2. Performance
3. User Insights (coming soon)
4. AI Metrics (coming soon)

### Overview Tab
- 6 KPI cards
- Conversation Trends (Area Chart)
- Device Breakdown (Pie Chart)
- Top Topics (Progress Bars)
- Response Time Breakdown (Bar Chart)

### Performance Tab
- Resolution Rate (Circular Progress)
- Customer Satisfaction (Circular Progress)
- Agent vs Bot Performance (Table)

---

## 📚 Knowledge Base - Quick Reference

### Tabs
1. Documents
2. Text Snippets

### Document Features
- Upload (PDF, DOCX, TXT, max 10MB)
- Drag & drop zone
- Grid/List view toggle
- Download/Delete
- Processing status

### Text Snippet Features
- Title (optional)
- Content (required)
- Add snippet button

### Status Badges
- ✓ Ready
- ⏳ Processing
- ✕ Failed

---

## ⚙️ Settings - Quick Reference

### Sidebar Tabs
1. Profile
2. Notifications
3. Security
4. Billing (coming soon)
5. Team (coming soon)
6. Language (coming soon)
7. Appearance (coming soon)

### Profile Tab
- Photo upload
- First Name, Last Name
- Email
- Company (read-only)

### Notifications Tab
- Email Notifications (toggle)
- New Conversations (toggle)
- Unread Messages (toggle)
- Weekly Reports (toggle)

### Security Tab
- Current Password
- New Password
- Change Password button

---

## 🔌 Integrations - Quick Reference

### Available Integrations
1. WhatsApp
2. Zapier
3. Stripe
4. Mailchimp
5. Google Calendar
6. Google Analytics
7. Webhooks
8. Custom API

### Actions
- Connect/Disconnect
- Enable/Disable (toggle)
- View status

---

## 🎨 Component Library

### Buttons
```jsx
<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="icon">Icon</Button>
```

### Cards
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Inputs
```jsx
<Input placeholder="Enter text..." />
<Textarea rows={4} />
<Select>
  <SelectItem value="1">Option 1</SelectItem>
</Select>
```

### Badges
```jsx
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
```

### Dialogs
```jsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    Content
  </DialogContent>
</Dialog>
```

---

## 🎯 Common Patterns

### Loading State
```jsx
{isLoading ? (
  <Skeleton className="h-10 w-full" />
) : (
  <ActualContent />
)}
```

### Empty State
```jsx
{items.length === 0 ? (
  <div className="text-center py-12">
    <p className="text-muted-foreground">No items found</p>
  </div>
) : (
  <ItemList items={items} />
)}
```

### Error Handling
```jsx
try {
  await api.someAction();
  toast.success("Success!");
} catch (error) {
  toast.error(error.message || "Failed");
}
```

### Pagination
```jsx
<div className="flex gap-2">
  <Button onClick={() => setPage(1)} disabled={page === 1}>
    First
  </Button>
  <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
    Previous
  </Button>
  <Button>{page}</Button>
  <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
    Next
  </Button>
  <Button onClick={() => setPage(totalPages)} disabled={page >= totalPages}>
    Last
  </Button>
</div>
```

---

## 🔧 API Endpoints Reference

### Analytics
- `GET /analytics/overview?period={7d|30d|90d}`
- `GET /analytics/chart-data?period={7d|30d|90d}`
- `GET /analytics/conversation-trends?period={7d|30d|90d}`
- `GET /analytics/device-breakdown`
- `GET /analytics/topic-distribution`
- `GET /analytics/response-time-breakdown`
- `GET /analytics/performance`

### Conversations
- `GET /conversations?filter={all|unread|archived}&search={query}`
- `GET /conversations/{id}/messages`
- `GET /conversations/{id}`
- `POST /conversations/{id}/messages`
- `POST /conversations/{id}/archive`
- `GET /conversations/{id}/export`
- `POST /contacts/{id}/block`

### Contacts
- `GET /contacts?page={n}&search={query}&limit={n}`
- `POST /contacts`
- `PUT /contacts/{id}`
- `DELETE /contacts/{id}`
- `POST /contacts/import`
- `GET /contacts/export`

### Knowledge Base
- `GET /documents?view={grid|list}`
- `POST /documents/upload`
- `POST /documents/text`
- `DELETE /documents/{id}`
- `GET /documents/{id}/download`

### Settings
- `GET /user/profile`
- `PUT /user/profile`
- `GET /user/notifications`
- `PUT /user/notifications`
- `POST /user/change-password`

### Integrations
- `GET /integrations`
- `POST /integrations/{id}/toggle`
- `POST /integrations/{id}/disconnect`

### Credits & Billing
- `GET /billing/credits`
- `GET /billing/limits`
- `POST /billing/top-up`

---

## 🎨 Color Reference

### Primary Colors
```
Primary:      #3B82F6 (Blue)
Success:      #16A34A (Green)
Warning:      #F59E0B (Orange)
Error:        #EF4444 (Red)
Info:         #0EA5E9 (Cyan)
```

### Neutral Colors
```
Background:   #FFFFFF
Foreground:   #0F172A
Muted:        #F1F5F9
Border:       #E2E8F0
```

### Gradients
```css
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-success: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
--gradient-warning: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

---

## 📏 Spacing Scale

```
1  = 4px
2  = 8px
3  = 12px
4  = 16px
5  = 20px
6  = 24px
8  = 32px
10 = 40px
12 = 48px
16 = 64px
```

---

## 🔤 Typography Scale

```
xs   = 12px
sm   = 14px
base = 16px
lg   = 18px
xl   = 20px
2xl  = 24px
3xl  = 30px
4xl  = 36px
```

---

## 📱 Breakpoints

```
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px
Large:   > 1920px
```

---

## ⌨️ Keyboard Shortcuts (Proposed)

```
Global:
Cmd/Ctrl + K     - Global search
Cmd/Ctrl + /     - Show shortcuts
Esc              - Close modal/dialog

Dashboard:
D                - Go to Dashboard
C                - Go to Conversations
A                - Go to Analytics
K                - Go to Knowledge Base

Conversations:
N                - New conversation
R                - Reply to message
E                - Export conversation
Cmd/Ctrl + Enter - Send message

Contacts:
N                - New contact
E                - Export contacts
Delete           - Delete selected

Analytics:
1-4              - Switch tabs
E                - Export report
```

---

## 🚀 Performance Targets

```
First Contentful Paint:    < 1.5s
Time to Interactive:       < 3.5s
Largest Contentful Paint:  < 2.5s
Cumulative Layout Shift:   < 0.1
First Input Delay:         < 100ms
```

---

## ✅ Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] ARIA labels on icon-only buttons
- [ ] Alt text on all images
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Form labels are associated with inputs
- [ ] Error messages are descriptive
- [ ] Skip to main content link
- [ ] Screen reader tested

---

## 🔍 Testing Checklist

### Functional Testing
- [ ] All buttons work as expected
- [ ] Forms validate correctly
- [ ] API calls handle errors
- [ ] Loading states display
- [ ] Empty states display
- [ ] Pagination works
- [ ] Search/filter works
- [ ] Export functions work

### Visual Testing
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Dark mode (if implemented)
- [ ] Hover states work
- [ ] Active states work
- [ ] Disabled states work
- [ ] Animations are smooth

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 📦 Dependencies

### Core
- React 18+
- TypeScript
- Vite

### UI Components
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Recharts

### State Management
- React Hooks (useState, useEffect)

### Routing
- React Router

### Forms
- React Hook Form (recommended)

### API
- Axios / Fetch

### Notifications
- Sonner (toast)

---

## 🎯 Priority Features to Implement

### High Priority
1. ✅ Advanced filtering system
2. ✅ Bulk operations
3. ✅ Global search
4. ✅ Export functionality
5. ✅ Real-time notifications

### Medium Priority
1. ⏳ Dashboard customization
2. ⏳ Conversation templates
3. ⏳ Advanced analytics
4. ⏳ Contact segmentation
5. ⏳ Dark mode

### Low Priority
1. ⏳ Automation workflows
2. ⏳ Team collaboration
3. ⏳ Mobile app
4. ⏳ Multi-language support
5. ⏳ AI-powered features

---

## 📝 Code Snippets

### Fetch Data Pattern
```typescript
const [data, setData] = useState<Type[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await api.getData();
      setData(result);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };
  loadData();
}, []);
```

### Form Submission Pattern
```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    await api.submitForm(formData);
    toast.success("Success!");
    resetForm();
  } catch (error) {
    toast.error(error.message || "Failed");
  } finally {
    setIsSubmitting(false);
  }
};
```

### Debounced Search Pattern
```typescript
const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);
  return () => clearTimeout(timer);
}, [search]);

useEffect(() => {
  if (debouncedSearch) {
    performSearch(debouncedSearch);
  }
}, [debouncedSearch]);
```

---

## 🎨 Custom Hooks (Recommended)

```typescript
// useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue] as const;
}

// usePagination
function usePagination(totalItems: number, itemsPerPage: number) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    page,
    setPage,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    nextPage: () => setPage(p => Math.min(p + 1, totalPages)),
    prevPage: () => setPage(p => Math.max(p - 1, 1)),
  };
}
```

---

## 🔐 Security Best Practices

1. **Authentication**
   - Store tokens securely (httpOnly cookies)
   - Implement token refresh
   - Handle 401 errors globally

2. **Input Validation**
   - Validate on client and server
   - Sanitize user input
   - Use TypeScript for type safety

3. **XSS Prevention**
   - Escape user-generated content
   - Use dangerouslySetInnerHTML sparingly
   - Implement CSP headers

4. **CSRF Protection**
   - Use CSRF tokens
   - Validate origin headers
   - SameSite cookie attribute

---

## 📊 Monitoring & Analytics

### Metrics to Track
- Page load times
- API response times
- Error rates
- User engagement
- Feature usage
- Conversion rates

### Tools
- Google Analytics
- Sentry (error tracking)
- LogRocket (session replay)
- Lighthouse (performance)

---

## 🎯 Summary

This quick reference provides:

✅ **Page-by-page feature breakdown**
✅ **Component library reference**
✅ **API endpoints list**
✅ **Design system values**
✅ **Common code patterns**
✅ **Testing checklists**
✅ **Best practices**
✅ **Implementation priorities**

Use this as a quick lookup guide during development!
