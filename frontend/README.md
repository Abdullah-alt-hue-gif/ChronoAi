# ChronoAI Frontend

**Next.js-based web application for intelligent event scheduling with AI-powered constraint solving and real-time conflict detection.**

## Overview

The ChronoAI frontend is a modern React application built with Next.js that provides a user-friendly interface for creating, configuring, and generating optimized event schedules. It communicates with the FastAPI backend to leverage AI-powered constraint solving algorithms.

## Technology Stack

- **Next.js 16.1.6** - React framework with App Router, server-side rendering, and static optimization
- **React 19** - Component library with hooks and concurrent features
- **TypeScript** - Type-safe development environment
- **Tailwind CSS v4** - Utility-first CSS framework with custom design tokens
- **Zustand** - Lightweight state management library
- **date-fns** - Functional date manipulation utilities
- **Playwright** - End-to-end testing framework
- **Next Image** - Optimized image handling

## Project Structure

```
frontend/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── signup/
│   │   └── page.tsx            # User registration page
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout
│   │   ├── page.tsx            # Main dashboard view
│   │   ├── calendar/
│   │   │   └── page.tsx        # Calendar view
│   │   └── entities/
│   │       └── page.tsx        # Entity management
│   ├── about/
│   ├── pricing/
│   ├── features/
│   ├── product/
│   ├── docs/
│   ├── blog/
│   ├── contact/
│   └── [other pages]/
├── components/                   # React components
│   ├── AuthProvider.tsx         # Authentication context provider
│   ├── LoginContent.tsx         # Login form logic
│   ├── EventForm.tsx            # Main event creation form
│   ├── EventTypeSelector.tsx    # Event type selection UI
│   ├── ScheduleView.tsx         # Schedule timeline visualization
│   ├── ConflictPanel.tsx        # Conflict detection display
│   ├── ExplainabilityPanel.tsx  # AI reasoning explanations
│   ├── ConfirmationModal.tsx    # Reusable confirmation dialog
│   ├── Toast.tsx                # Notification toasts
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer component
│   ├── FeatureGrid.tsx          # Feature showcase
│   ├── HeroSection.tsx          # Landing page hero
│   ├── ProtectedRoute.tsx       # Route protection wrapper
│   └── forms/                   # Event-type specific forms
│       ├── TournamentForm.tsx
│       ├── ConferenceForm.tsx
│       ├── HackathonForm.tsx
│       └── WorkshopForm.tsx
├── lib/                          # Utilities and helpers
│   ├── api.ts                   # API client with authentication
│   ├── store.ts                 # Zustand state management
│   └── mockData.ts              # Sample data for testing
├── public/                       # Static assets
│   ├── team/                    # Team member images
│   └── [other assets]/
├── tests/                        # Test files
│   └── e2e/                     # Playwright end-to-end tests
├── playwright.config.ts          # E2E testing configuration
├── tailwind.config.ts            # Tailwind CSS customization
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies with legacy peer deps flag
npm install --legacy-peer-deps

# Or with yarn
yarn install
```

### Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

The development server includes hot module reloading (HMR) for instant feedback on code changes.

### Environment Configuration

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

This configuration tells the frontend where to find the backend API.

## Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

The production build includes:
- Code splitting and minification
- Image optimization
- Static analysis and optimization
- Type checking

## Feature Components

### Authentication
- **LoginContent.tsx** - Email/password login form with error handling
- **AuthProvider.tsx** - Context provider for authentication state
- JWT token management and localStorage persistence

### Event Management
- **EventTypeSelector.tsx** - Visual selection of 5 event types
- **EventForm.tsx** - Generic event creation form wrapper
- **forms/** - Type-specific forms (Tournament, Conference, Hackathon, Workshop)

### Schedule Generation
- **ScheduleView.tsx** - Timeline visualization of generated schedules
- **ConflictPanel.tsx** - Conflict alerts with hard/soft classifications
- **ExplainabilityPanel.tsx** - AI reasoning explanations for decisions

### UI Components
- **ConfirmationModal.tsx** - Reusable confirmation dialogs
- **Toast.tsx** - Notification system for feedback
- **Navbar.tsx** - Navigation with auth state awareness
- **Footer.tsx** - Footer with links and information

## State Management

The application uses Zustand for state management. Key stores:

```typescript
useAppStore // Main application state
- user: User | null
- isAuthenticated: boolean
- currentEvent: EventData | null
- schedule: ScheduleItem[]
- conflicts: Conflict[]
- toast: ToastState
- confirmation: ConfirmationState
```

State is persisted to localStorage for token and user data.

## API Integration

The frontend communicates with the backend through a custom API client in `lib/api.ts`:

```typescript
// API client with automatic auth header injection
api.post(endpoint, data)
api.get(endpoint)
api.put(endpoint, data)
api.delete(endpoint)

// Automatically includes JWT token in Authorization header
// Handles 401 responses and redirects to login
```

## Design System

### Color Usage
- **Primary Actions** - Electric Blue (#2563EB)
- **Success States** - Emerald (#10B981)
- **Warnings** - Amber (#F59E0B)
- **Errors** - Crimson (#EF4444)
- **Background** - Midnight Blue (#0F172A)
- **Surfaces** - Off-White (#F8FAFC)

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid and padding systems

### Typography
- Font Family: Inter, system fonts
- Font Scale: Responsive sizing
- Line Heights: Optimized for readability

## Testing

### End-to-End Tests

Tests are located in `tests/e2e/` and use Playwright:

```bash
# Run E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e -- --ui

# Run specific test file
npm run test:e2e auth_wizard.spec.ts
```

### Test Coverage
- Authentication flow (signup, login, logout)
- Event creation and management
- Schedule generation
- Conflict detection and display
- Navigation and routing

## Performance Optimization

### Next.js Optimizations
- Image optimization with `next/image`
- Code splitting with dynamic imports
- Static generation for marketing pages
- Incremental static regeneration

### Frontend Performance
- Component-level code splitting
- Lazy loading of routes
- Efficient state management with Zustand
- CSS-in-JS optimization with Tailwind

### Bundle Size
- Tree shaking of unused dependencies
- Minification and compression
- Critical CSS inlining

## Common Development Tasks

### Adding a New Page

1. Create file in `app/[route]/page.tsx`
2. Export default React component
3. Next.js automatically creates route

```typescript
// app/pricing/page.tsx
export default function PricingPage() {
  return <div>Pricing content</div>
}
```

### Creating a New Component

1. Create file in `components/ComponentName.tsx`
2. Use 'use client' directive for interactivity
3. Export component

```typescript
// components/NewComponent.tsx
'use client'
export default function NewComponent() {
  return <div>Component content</div>
}
```

### Adding Styling

Tailwind CSS classes handle all styling:

```typescript
<div className="bg-primary text-white p-4 rounded-lg">
  Styled content
</div>
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
# Windows: 
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Clear Cache
```bash
# Remove Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install --legacy-peer-deps
```

### Backend Connection Issues
- Verify backend is running on port 8000
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Check browser console for CORS errors
- Verify firewall allows localhost connections

### TypeScript Errors
```bash
# Type check entire project
npx tsc --noEmit

# Generate TypeScript definitions
npm install @types/[package-name]
```

## Code Quality

### Type Safety
- Full TypeScript coverage
- Strict mode enabled
- No implicit any

### Component Best Practices
- Functional components with hooks
- Custom hooks for reusable logic
- Proper event handler typing
- Error boundaries for error handling

### State Management
- Zustand for global state
- Local state with useState for component-specific state
- useEffect for side effects
- Dependency arrays properly configured

## Deployment

### Vercel (Recommended)

```bash
# Login to Vercel
npm install -g vercel
vercel login

# Deploy
vercel
```

### Self-Hosted

```bash
# Build production bundle
npm run build

# Start on specific port
PORT=3000 npm start
```

### Environment Variables for Deployment
- `NEXT_PUBLIC_API_URL` - Backend API endpoint
- `NODE_ENV` - Set to 'production'

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Contributing

1. Create feature branch from `main`
2. Follow existing code style
3. Add tests for new features
4. Submit pull request with description

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

**Part of the ChronoAI project**

*Intelligent event scheduling with AI-powered constraint solving*
