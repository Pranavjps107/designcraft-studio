# CRM Components Visual Showcase

## 🎨 Component Library

This document showcases all the reusable UI components and patterns used across the CRM modules.

---

## 📋 Table Components

### Standard Table
Used in: All modules' list views

**Features:**
- Sortable columns with arrow indicators
- Hover states on rows
- Inline actions that appear on hover
- Checkbox selection
- Alternating row colors (optional)

**Structure:**
```tsx
<table className="w-full">
  <thead>
    <tr className="bg-slate-50 border-b border-slate-200">
      <th className="px-6 py-4 text-left">
        <Checkbox />
      </th>
      <th className="px-6 py-4 text-left">
        <button className="flex items-center gap-2">
          Column Name
          <ArrowUpDown className="w-3 h-3" />
        </button>
      </th>
      ...
    </tr>
  </thead>
  <tbody className="divide-y divide-slate-200">
    <tr className="hover:bg-blue-50/50 transition-colors group">
      ...
    </tr>
  </tbody>
</table>
```

**Responsive Behavior:**
- Horizontal scroll on mobile
- Fixed first column (optional)
- Collapsible columns on smaller screens

---

## 📇 Card Components

### Grid Card (Contacts, Leads, Documents)
Beautiful card layout for grid view modes

**Anatomy:**
```
┌─────────────────────────────┐
│ [Checkbox]        [⋮ Menu]  │
│                             │
│         [Avatar/Icon]       │
│                             │
│      Primary Name           │
│      Secondary Info         │
│      Tertiary Info          │
│                             │
│  [Icon] Detail 1            │
│  [Icon] Detail 2            │
│  [Icon] Detail 3            │
│                             │
│ ─────────────────────────── │
│                             │
│  [Badge 1]    [Badge 2]     │
│                             │
│ ─────────────────────────── │
│                             │
│ [Button 1]  [Button 2]      │
└─────────────────────────────┘
```

**Features:**
- Hover lift effect (`hover:-translate-y-1`)
- Shadow growth on hover (`hover:shadow-lg`)
- Smooth transitions (300ms)
- Color-coded borders on hover
- Gradient avatar/icons

---

## 🎴 Kanban Card (Deals, Tasks)
Used in stage/status board views

**Anatomy:**
```
┌─────────────────────────────┐
│ [☐]                  [🔔 ⟲] │
│                             │
│ Task/Deal Title (bold)      │
│                             │
│ [Priority Badge]            │
│                             │
│ [Icon] Date: Jan 18         │
│ [Icon] Owner: John Doe      │
│ [Icon] Related: Account     │
│                             │
│ ─────────────────────────── │
│ Next Step: Follow up        │
│                             │
│ ──── Hover Actions ──────   │
│ [View]        [Edit]        │
└─────────────────────────────┘
```

**Features:**
- Draggable (ready for drag-and-drop)
- Status badges
- Progress indicators
- Compact info display
- Quick actions on hover

---

## 🎯 Header Components

### Page Header Pattern
Consistent across all modules

```tsx
<header className="bg-white border-b border-slate-200 shadow-sm">
  <div className="px-6 py-4">
    {/* Title Row */}
    <div className="flex items-center justify-between">
      {/* Left: Icon + Title */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Module Name</h1>
          <p className="text-sm text-slate-600">Subtitle</p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <Button>Filter</Button>
        <ViewToggle />
        <Button>Export</Button>
        <Button primary>Create</Button>
      </div>
    </div>

    {/* Search Row */}
    <div className="mt-4">
      <SearchBar />
    </div>

    {/* Selection Bar (conditional) */}
    {selectedCount > 0 && <SelectionBar />}
  </div>
</header>
```

**Gradient Colors by Module:**
- Leads: `from-blue-500 to-indigo-600`
- Contacts: `from-cyan-500 to-blue-600`
- Deals: `from-green-500 to-emerald-600`
- Tasks: `from-purple-500 to-indigo-600`
- Documents: `from-amber-500 to-orange-600`

---

## 🔍 Filter Panel

### Sidebar Filter Pattern
Collapsible filter panel with sections

```
┌─────────────────────────┐
│ Filters        Clear All │
├─────────────────────────┤
│                         │
│ SYSTEM FILTERS          │
│ ☐ Touched Records       │
│ ☐ Untouched Records     │
│ ☐ Locked                │
│                         │
│ ───────────────────────  │
│                         │
│ FILTER BY FIELDS        │
│                         │
│ Lead Source             │
│ [Dropdown ▼]            │
│                         │
│ Lead Status             │
│ [Dropdown ▼]            │
│                         │
│ Lead Score: 65          │
│ [─────●────────]        │
│ 0      50     100       │
│                         │
└─────────────────────────┘
```

**Width:** 320px (w-80)
**Background:** White
**Border:** Right border `border-slate-200`

---

## 💬 Dialog/Modal Components

### Create Form Dialog Pattern

**Size:** `max-w-3xl` (large forms) or `max-w-2xl` (medium forms)
**Max Height:** `max-h-[90vh]` with `overflow-y-auto`

**Structure:**
```tsx
<Dialog>
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
    {/* Header */}
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-2xl">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        Create [Module]
      </DialogTitle>
    </DialogHeader>

    {/* Form */}
    <form className="space-y-6 mt-4">
      {/* Section 1 */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-4 pb-2 border-b">
          Section Title
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField />
          <FormField />
        </div>
      </div>

      {/* Section 2 */}
      ...

      {/* Footer */}
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

---

## 🎨 Badge Components

### Status Badges
Color-coded semantic badges

**Implementation:**
```tsx
// Status Badge
<Badge className="bg-green-100 text-green-700">
  Qualified
</Badge>

// Priority Badge
<Badge className="bg-red-100 text-red-700 border-red-300">
  <Flag className="w-3 h-3" />
  Highest
</Badge>

// Count Badge
<Badge variant="secondary" className="rounded-full">
  12
</Badge>

// Alert Badge (notification dot)
<Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
  !
</Badge>
```

**Badge Variants:**
| Variant | Use Case | Example |
|---------|----------|---------|
| Default | Neutral info | "Draft" |
| Secondary | Count, Number | "5 items" |
| Destructive | Errors, Alerts | "Overdue" |
| Outline | Categories | "Department" |

---

## 🔘 Button Components

### Button Hierarchy

**1. Primary Action** (Gradient)
```tsx
<Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30">
  <Plus className="w-4 h-4" />
  Create Lead
</Button>
```

**2. Secondary Action** (Outline)
```tsx
<Button variant="outline" size="sm" className="gap-2">
  <Filter className="w-4 h-4" />
  Filters
</Button>
```

**3. Ghost/Subtle Action**
```tsx
<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
  <Eye className="w-4 h-4" />
</Button>
```

**4. Destructive Action**
```tsx
<Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
  <Trash2 className="w-4 h-4" />
  Delete
</Button>
```

---

## 🔍 Search Bar Component

### Standard Search Pattern
```tsx
<div className="relative flex-1">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
  <Input
    placeholder="Search..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
  />
</div>
```

**Features:**
- Icon prefix (magnifying glass)
- Placeholder text specific to module
- Background color change on focus
- Smooth transitions

---

## 👤 Avatar Component

### Gradient Avatar with Initials
```tsx
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
  {getInitials(firstName, lastName)}
</div>
```

**Sizes:**
- Small: `w-8 h-8` (list view)
- Medium: `w-10 h-10` (table view)
- Large: `w-20 h-20` (grid cards, detail view)

**Gradient by Module:**
Each module uses its signature gradient for consistency

---

## 📊 Progress Indicators

### Deal Probability Bar
```tsx
<div className="flex items-center gap-2">
  {/* Bar */}
  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
      style={{ width: `${probability}%` }}
    />
  </div>
  
  {/* Percentage */}
  <span className="text-sm font-medium">{probability}%</span>
</div>
```

### Lead Score Display
```tsx
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg font-semibold bg-green-50 text-green-600">
  <TrendingUp className="w-4 h-4" />
  {leadScore}
</div>
```

---

## 🎭 View Mode Toggle

### List/Grid/Kanban Toggle
```tsx
<div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
  <Button
    variant={viewMode === 'list' ? 'default' : 'ghost'}
    size="sm"
    onClick={() => setViewMode('list')}
    className="h-8 w-8 p-0"
  >
    <List className="w-4 h-4" />
  </Button>
  
  <Button
    variant={viewMode === 'grid' ? 'default' : 'ghost'}
    size="sm"
    onClick={() => setViewMode('grid')}
    className="h-8 w-8 p-0"
  >
    <Grid className="w-4 h-4" />
  </Button>
</div>
```

---

## 📝 Form Field Components

### Standard Input
```tsx
<div>
  <Label htmlFor="fieldName">Field Label *</Label>
  <Input
    id="fieldName"
    value={formData.fieldName}
    onChange={(e) => setFormData({ ...formData, fieldName: e.target.value })}
    required
    placeholder="Enter value..."
  />
</div>
```

### Select/Dropdown
```tsx
<div>
  <Label htmlFor="select">Select Field</Label>
  <Select
    value={formData.select}
    onValueChange={(value) => setFormData({ ...formData, select: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### Textarea
```tsx
<div>
  <Label htmlFor="description">Description</Label>
  <Textarea
    id="description"
    value={formData.description}
    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
    rows={4}
    placeholder="Enter description..."
  />
</div>
```

### Checkbox
```tsx
<label className="flex items-center gap-2 cursor-pointer">
  <Checkbox
    checked={formData.reminder}
    onCheckedChange={(checked) => 
      setFormData({ ...formData, reminder: checked as boolean })
    }
  />
  <span className="text-sm text-slate-700">Enable Reminder</span>
</label>
```

---

## 🎯 Action Dropdown Menu

### Three-dot Menu Pattern
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <MoreVertical className="w-4 h-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>
      <Eye className="w-4 h-4 mr-2" />
      View Details
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Edit className="w-4 h-4 mr-2" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </DropdownMenuItem>
    <DropdownMenuItem className="text-red-600">
      <Trash2 className="w-4 h-4 mr-2" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Best Practices:**
- Use icons for visual clarity
- Destructive actions in red
- Align to end for action columns
- Max 5-7 items per menu

---

## 📦 Selection Bar Component

### Bulk Action Bar
Appears when items are selected

```tsx
{selectedItems.length > 0 && (
  <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center justify-between">
    {/* Left: Selection count */}
    <span className="text-sm font-medium text-blue-900">
      {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
    </span>
    
    {/* Right: Actions */}
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="gap-2">
        <Edit className="w-4 h-4" />
        Bulk Edit
      </Button>
      <Button variant="outline" size="sm" className="gap-2 text-red-600">
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>
      <Button variant="ghost" size="sm" onClick={clearSelection}>
        <X className="w-4 h-4" />
      </Button>
    </div>
  </div>
)}
```

**Color by Module:**
- Leads: Blue background
- Contacts: Cyan background
- Deals: Green background
- Tasks: Purple background
- Documents: Amber background

---

## 🎨 Empty State Component

### No Data Pattern
```tsx
<div className="text-center py-12">
  {/* Icon */}
  <Icon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
  
  {/* Heading */}
  <h3 className="text-lg font-medium text-slate-900 mb-2">
    No Items Found
  </h3>
  
  {/* Description */}
  <p className="text-slate-600 mb-4">
    {hasFilters 
      ? 'Try adjusting your search or filters'
      : 'Get started by creating your first item'
    }
  </p>
  
  {/* CTA Button */}
  <Button onClick={handleCreate}>
    <Plus className="w-4 h-4 mr-2" />
    Create Item
  </Button>
</div>
```

---

## 🎭 Animation & Transition Classes

### Standard Transitions
```css
/* Hover Lift */
.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

/* Shadow Growth */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Smooth Transition */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Opacity Fade */
.opacity-0 {
  opacity: 0;
}
.group-hover\:opacity-100:hover {
  opacity: 1;
}
```

### Slide-in Animation
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease;
}
```

---

## 🎨 Color Palette

### Primary Colors (by Module)
```css
/* Leads */
--leads-primary: hsl(220, 90%, 56%);         /* Blue */
--leads-gradient: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%);

/* Contacts */
--contacts-primary: hsl(199, 89%, 48%);      /* Cyan */
--contacts-gradient: linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%);

/* Deals */
--deals-primary: hsl(142, 76%, 36%);         /* Green */
--deals-gradient: linear-gradient(135deg, #10B981 0%, #059669 100%);

/* Tasks */
--tasks-primary: hsl(262, 83%, 58%);         /* Purple */
--tasks-gradient: linear-gradient(135deg, #A855F7 0%, #6366F1 100%);

/* Documents */
--documents-primary: hsl(38, 92%, 50%);      /* Amber */
--documents-gradient: linear-gradient(135deg, #F59E0B 0%, #EA580C 100%);
```

### Neutral Colors
```css
--slate-50: #F8FAFC;
--slate-100: #F1F5F9;
--slate-200: #E2E8F0;
--slate-300: #CBD5E1;
--slate-400: #94A3B8;
--slate-500: #64748B;
--slate-600: #475569;
--slate-700: #334155;
--slate-800: #1E293B;
--slate-900: #0F172A;
```

---

## 📐 Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
```

**Common Uses:**
- Padding: `px-6 py-4` (24px horizontal, 16px vertical)
- Gap: `gap-3` (12px)
- Margin: `mb-4` (16px bottom)

---

## 🔤 Typography Scale

```css
/* Headings */
--text-2xl: 1.5rem;    /* 24px - Page titles */
--text-xl: 1.25rem;    /* 20px - Section headers */
--text-lg: 1.125rem;   /* 18px - Card titles */

/* Body */
--text-base: 1rem;     /* 16px - Body text */
--text-sm: 0.875rem;   /* 14px - Secondary text */
--text-xs: 0.75rem;    /* 12px - Labels, metadata */
```

**Font Weights:**
- Normal: `font-normal` (400)
- Medium: `font-medium` (500)
- Semibold: `font-semibold` (600)
- Bold: `font-bold` (700)

---

## 📱 Responsive Breakpoints

```css
/* Tailwind CSS Breakpoints */
sm:  640px  @media (min-width: 640px)
md:  768px  @media (min-width: 768px)
lg:  1024px @media (min-width: 1024px)
xl:  1280px @media (min-width: 1280px)
2xl: 1536px @media (min-width: 1536px)
```

**Grid Responsive Pattern:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Cards */}
</div>
```

**Result:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large Desktop: 4 columns

---

## 🎯 Icon Usage Guide

### Icon Sizes
```tsx
{/* Extra Small - 12px */}
<Icon className="w-3 h-3" />

{/* Small - 16px */}
<Icon className="w-4 h-4" />

{/* Medium - 20px */}
<Icon className="w-5 h-5" />

{/* Large - 24px */}
<Icon className="w-6 h-6" />

{/* Extra Large - 64px (empty states) */}
<Icon className="w-16 h-16" />
```

### Common Icons by Use Case
| Use Case | Icon | Context |
|----------|------|---------|
| Create | `Plus` | Add new records |
| Edit | `Edit` | Modify existing |
| Delete | `Trash2` | Remove records |
| View | `Eye` | View details |
| Search | `Search` | Search bars |
| Filter | `Filter` | Filter panels |
| Sort | `ArrowUpDown` | Sortable columns |
| Export | `Download` | Export data |
| Upload | `Upload` | File uploads |
| Refresh | `RefreshCw` | Reload data |
| More | `MoreVertical` | Action menus |
| Close | `X` | Close modals |
| Phone | `Phone` | Phone numbers |
| Email | `Mail` | Email addresses |
| Location | `MapPin` | Addresses |
| Calendar | `Calendar` | Dates |
| User | `User` | Owners |
| Building | `Building2` | Accounts |
| Dollar | `DollarSign` | Deals/Revenue |

---

*Visual Component Showcase - Last Updated: 2026-01-18*
