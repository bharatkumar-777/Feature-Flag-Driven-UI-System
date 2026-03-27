# FlagKit — Feature Flag Driven UI System

A production-grade feature flag system built with **Next.js 16**, **React 19**, **Zustand 5**, and **Tailwind CSS 4**. Demonstrates runtime flag toggling, dependency management, lazy loading, fallback resilience, and dark mode — all without a page reload.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — live flag status strip, feature demos |
| `/admin` | Admin Panel — toggle flags, refresh from API, reset defaults |
| `/dashboard` | Dashboard — lazy-loaded feature sections |

---

## Feature Flags

| Flag | Default | Description | Depends on |
|------|---------|-------------|------------|
| `dark_mode` | ON (API) / OFF (default) | Dark mode toggle, persisted to localStorage | — |
| `chat_widget` | OFF | Live chat support widget | — |
| `new_dashboard` | OFF | Redesigned dashboard layout | — |
| `analytics_base` | ON | Base analytics bar chart | — |
| `premium_analytics` | OFF | Advanced pro metrics | `analytics_base` |

---

## Architecture

### State Management — Zustand store (`lib/feature-flags/store.ts`)

The single source of truth for all flag state. No prop drilling.

```
fetchFlags()   → GET /api/flags → update store → cache to localStorage
toggleFlag()   → validates parents → cascades disable to dependents
getFlagEnabled() → checks flag + all parent dependencies recursively
```

**3-tier fallback chain:**
1. Live API (`/api/flags`)
2. localStorage cache (`feature-flags-cache`)
3. Hardcoded defaults (`lib/feature-flags/defaults.ts`)

If the API fails, the app continues working with the last known good state and shows a warning toast.

### FeatureGate — synchronous gating (`lib/feature-flags/components.tsx`)

```tsx
<FeatureGate flag="dark_mode" fallback={<Fallback feature="dark_mode" />}>
  <DarkModeToggle />
</FeatureGate>
```

- Shows a skeleton while flags are initially loading
- Renders children when the flag is enabled
- Renders the fallback (with a link to Admin) when disabled

### LazyFeatureGate — code-split gating (`lib/feature-flags/components.tsx`)

```tsx
<LazyFeatureGate
  flag="premium_analytics"
  loader={() => import("@/components/features/premium-analytics")}
  loadingFallback={<Skeleton />}
  fallback={<Fallback feature="premium_analytics" />}
/>
```

The component's JavaScript bundle is **never downloaded** unless the flag is on. When the flag turns on, the chunk is fetched and rendered via `React.lazy` + `Suspense`.

### Dependency Management

`premium_analytics` requires `analytics_base`. Rules:

- **Enabling**: blocked unless all parent flags are already on
- **Disabling**: cascades — disabling `analytics_base` automatically disables `premium_analytics`

The Admin Panel visually shows which flags have unmet dependencies and displays cascade warnings before you disable a parent.

### Dark Mode

- Tailwind v4 class-based dark mode configured via `@variant dark (&:where(.dark, .dark *))` in `globals.css`
- The `dark` class is added/removed on `<html>` by the toggle
- Preference is persisted to `localStorage` key `dark-mode`
- An inline `<script>` in `layout.tsx` restores the preference before first paint — no flash of unstyled content

### API Route (`app/api/flags/route.ts`)

```
GET /api/flags          → returns flag definitions (500ms simulated latency)
GET /api/flags?fail=true → simulates a 500 error (tests the fallback flow)
```

Flags are polled every 60 seconds by the `FeatureFlagProvider`.

---

## File Structure

Enterprise feature-module structure — each feature is self-contained with its own API, store, hooks, components, types, and barrel export.

```
app/                                        # Next.js routing layer (thin, no business logic)
├── page.tsx                                # Home page
├── layout.tsx                              # Root layout — dark mode init + FeatureFlagProvider
├── globals.css                             # Tailwind v4 + class-based dark mode variant
├── admin/page.tsx                          # Admin panel page
├── dashboard/page.tsx                      # Dashboard (lazy-loaded feature sections)
└── api/flags/route.ts                      # GET /api/flags endpoint

features/                                   # Self-contained feature modules
├── feature-flags/                          # Core feature flag system
│   ├── api/flags-api.ts                   # Fetch logic isolated from store
│   ├── components/
│   │   ├── admin/
│   │   │   ├── flag-panel.tsx             # Admin panel — stats, sections, controls
│   │   │   └── flag-toggle.tsx            # Individual flag row with toggle switch
│   │   ├── feature-gate.tsx               # Synchronous gate (<FeatureGate>)
│   │   ├── lazy-feature-gate.tsx          # Code-split gate (<LazyFeatureGate>)
│   │   └── fallback.tsx                   # Disabled-feature UI with link to Admin
│   ├── constants/index.ts                 # Default flags, localStorage key, flag icons
│   ├── hooks/use-feature-flags.ts         # useFeatureFlag, useFeatureFlags, etc.
│   ├── provider/feature-flag-provider.tsx # Fetches flags, polls, shows fallback toast
│   ├── store/feature-flag-store.ts        # Zustand store — all flag state + actions
│   ├── types/index.ts                     # FeatureFlag, FlagState, FlagStore types
│   └── index.ts                           # Public API barrel export
│
├── dark-mode/
│   ├── components/dark-mode-toggle.tsx    # Toggle button with localStorage persistence
│   └── index.ts
│
├── chat/
│   ├── components/chat-widget.tsx         # Floating chat panel
│   └── index.ts
│
├── analytics/
│   ├── components/analytics-chart.tsx     # Base weekly bar chart
│   ├── components/premium-analytics-chart.tsx  # Pro metrics (lazy-loaded)
│   └── index.ts
│
└── new-dashboard/
    ├── components/new-dashboard-view.tsx  # Redesigned stat cards (lazy-loaded)
    └── index.ts

components/                                 # Shared UI primitives (no business logic)
└── ui/
    ├── skeleton.tsx                        # Loading skeleton
    ├── toast.tsx                           # Toast notification
    └── index.ts                            # Barrel export
```

---

## What You Can Build Next

### Higher priority

| Idea | Description |
|------|-------------|
| **User/group targeting** | Enable flags for specific user IDs, roles, or cohorts (e.g. beta users only) |
| **Percentage rollouts** | Gradually roll out a flag to e.g. 10% → 50% → 100% of traffic |
| **Flag scheduling** | Set a start/end datetime for a flag to be automatically on or off |
| **Audit log** | Record every toggle with who changed it and when |
| **Flag environments** | Separate flag sets for `development`, `staging`, and `production` |

### Lower priority / nice to have

| Idea | Description |
|------|-------------|
| **Server-side flag evaluation** | Evaluate flags in Server Components / middleware to prevent layout shift |
| **Flag override via URL** | `?flag_dark_mode=true` query param for QA testing without going to Admin |
| **A/B test integration** | Tie flags to experiment variants and track conversion per variant |
| **Real backend** | Replace the static `/api/flags` route with a database (e.g. Postgres + Prisma) |
| **Auth on Admin Panel** | Protect `/admin` behind authentication so only authorized users can toggle |
| **Stale-while-revalidate** | Show cached flags immediately on load, then silently refresh in the background |

---

## Tech Stack

| Technology | Version | Role |
|-----------|---------|------|
| Next.js | 16.2.1 | Framework, App Router, API routes |
| React | 19.2.4 | UI, `lazy`, `Suspense` |
| Zustand | 5.0.12 | Global flag state |
| Tailwind CSS | 4 | Styling + class-based dark mode |
| TypeScript | 5 | Type safety |
| React Compiler | 1.0.0 | Automatic memoization |
