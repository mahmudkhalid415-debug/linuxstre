# Foodex Automation Engine Dashboard

A stunning, production-ready, corporate-grade frontend dashboard for the **Foodex Automation Engine** — an AI-powered system that automates form filling, clicking, and web interactions at ultra-high speed with AI error detection.

## 🚀 Features

### Pages & Sections

1. **📊 Dashboard (/)** - Main overview with key metrics, charts, and recent activity
2. **▶️ Run Automation (/run)** - Configure and execute automation tasks
3. **📋 Task History (/history)** - View all completed tasks with detailed analysis
4. **⚠️ Error Center (/errors)** - Analyze failed tasks with AI diagnostics
5. **📈 Analytics (/analytics)** - Comprehensive performance insights
6. **⚙️ Settings (/settings)** - Configure API, browser, AI, and notification settings

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **shadcn/ui** - Component primitives

## 🎨 Design Features

- ✅ Corporate/Enterprise look
- ✅ Dark mode by default with light mode toggle
- ✅ Sidebar navigation with icons
- ✅ Foodex branding with blue primary colors
- ✅ Fully responsive design
- ✅ Smooth animations and transitions
- ✅ Status badges with color coding
- ✅ Professional typography

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with sidebar
│   ├── page.tsx           # Dashboard page
│   ├── run/               # Run automation page
│   ├── history/           # Task history page
│   ├── errors/            # Error center page
│   ├── analytics/         # Analytics page
│   └── settings/          # Settings page
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── sidebar.tsx       # Navigation sidebar
│   ├── breadcrumbs.tsx   # Breadcrumb navigation
│   └── theme-provider.tsx # Theme management
└── lib/                   # Utilities and helpers
    ├── utils.ts          # Utility functions
    └── mock-data.ts      # Mock data generators
```

## 🎯 Key Components

### Dashboard
- Key metric cards (Tasks, Success Rate, Speed, Workers)
- Interactive charts (Line, Pie, Bar)
- Recent activity feed with status badges

### Run Automation
- Dynamic form builder
- Action type selector (fill, click, select, etc.)
- Real-time execution time estimation
- Loading states with progress animation

### Task History
- Searchable and filterable data table
- Expandable rows with AI analysis
- Pagination support
- Status filtering

### Error Center
- Error statistics dashboard
- AI-powered diagnostics
- Suggested fixes for each error
- Error type distribution chart

### Analytics
- Success rate trends
- Performance metrics over time
- Top slowest tasks
- Most common errors

### Settings
- API configuration
- Browser optimization settings
- AI model selection
- Notification preferences

## 📊 Mock Data

All pages use realistic mock data for demonstration purposes. The mock data generator is located in `lib/mock-data.ts` and provides:

- Task records with various statuses
- Error logs with AI diagnoses
- Analytics data for charts
- Performance metrics

## 🔧 Customization

### Theme

Edit `app/globals.css` to customize the color scheme. The project uses CSS variables for easy theming:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  /* ... more variables */
}
```

### Components

All UI components are located in `components/ui/` and can be customized to match your brand.

## 📝 License

This project is created for demonstration purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using Next.js 14 and Tailwind CSS
