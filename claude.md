# CLAUDE.md — SU IMT UC Web-Main

> **Read this file in full before writing any code.** Every rule is mandatory.

---

## Project Overview

This is the official website for **SU IMT UC** (Student Union Information & Multimedia Technology, Universitas Ciputra). It is a **Next.js 15 App Router** application with **Turbopack**, **Prisma ORM** (PostgreSQL via Prisma Accelerate), **NextAuth v4** (Google OAuth, `@ciputra.ac.id` domain lock), **Tailwind CSS v4**, **GSAP** animations, **Cloudinary** image hosting, and **Zod** validation.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| ORM | Prisma Client + Accelerate | 6.x |
| Auth | NextAuth (next-auth v4) | 4.x |
| Validation | Zod | 4.x |
| Animation | GSAP + @gsap/react | 3.x |
| Images | next-cloudinary | 6.x |
| Package Manager | pnpm | — |
| Dev Bundler | Turbopack | — |

---

## Strict Folder Structure

```
Web-Main/
├── prisma/
│   ├── schema.prisma              # Single source of truth for DB models & enums
│   ├── seed.ts                    # Database seed script
│   └── migrations/                # Auto-generated Prisma migrations (DO NOT edit)
│
├── public/                        # Static assets only (images, fonts, SVGs)
│   ├── fonts/                     # Custom font files (.otf, .ttf)
│   ├── home/                      # Home page assets
│   ├── achievements/              # Achievement page assets
│   ├── activities/                # Activity page assets
│   ├── events/                    # Event page assets
│   ├── competitions/              # Competition page assets
│   ├── backgrounds/               # Shared background images
│   ├── logos/                     # Logo assets
│   ├── committee/                 # Committee member photos
│   ├── dashboard/                 # Dashboard page assets
│   └── ...                        # Other asset directories by feature
│
├── src/
│   ├── app/                       # Next.js App Router — pages & API routes ONLY
│   │   ├── layout.tsx             # Root layout (providers, nav, footer)
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css            # Global styles, @theme tokens, @font-face, keyframes
│   │   ├── not-found.tsx          # Custom 404 page
│   │   ├── favicon.ico
│   │   │
│   │   ├── about/                 # /about
│   │   │   └── page.tsx
│   │   ├── achievements/          # /achievements, /achievements/[achievementId]
│   │   │   ├── page.tsx
│   │   │   └── [achievementId]/
│   │   │       └── page.tsx
│   │   ├── activities/            # /activities, /activities/[activityId]
│   │   │   ├── page.tsx
│   │   │   └── [activityId]/
│   │   │       └── page.tsx
│   │   ├── competitions/          # /competitions, /competitions/[competitionId]
│   │   │   ├── page.tsx
│   │   │   └── [competitionId]/
│   │   │       └── page.tsx
│   │   ├── events/                # /events, /events/[eventId]
│   │   │   ├── page.tsx
│   │   │   └── [eventId]/
│   │   │       └── page.tsx
│   │   ├── members/               # /members
│   │   │   └── page.tsx
│   │   ├── dashboard/             # Role-gated dashboard routes
│   │   │   ├── page.tsx           # Dashboard redirect/landing
│   │   │   ├── sa/                # Student Affairs dashboard
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── activities/
│   │   │   │   ├── applications/
│   │   │   │   └── competitions/
│   │   │   ├── pr/                # Public Relations dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   ├── tech/              # Tech dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   ├── pulse/             # Pulse dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   └── student/           # Student dashboard
│   │   │       └── page.tsx
│   │   ├── auth/                  # Auth error pages
│   │   │   └── error/
│   │   ├── unauthorized/          # Unauthorized access page
│   │   │   └── page.tsx
│   │   └── api/                   # API routes
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.ts   # NextAuth catch-all handler
│   │
│   ├── components/                # All React components
│   │   ├── NavigationBar.tsx      # SHARED: Global navigation bar
│   │   ├── Footer.tsx             # SHARED: Global footer
│   │   ├── Button.tsx             # SHARED: Generic button
│   │   ├── LinkButton.tsx         # SHARED: Link-styled button
│   │   ├── DeleteButton.tsx       # SHARED: Delete action button
│   │   ├── SearchBar.tsx          # SHARED: Reusable search bar
│   │   ├── HomeServicesCard.tsx   # SHARED: Home services card
│   │   ├── CommitteeCard.tsx      # SHARED: Committee member card
│   │   ├── TLInfoPanelDecorative.tsx
│   │   │
│   │   ├── utils/                 # Utility/wrapper components
│   │   │   ├── Providers.tsx      # SessionProvider wrapper
│   │   │   ├── LoginButton.tsx    # Auth login button
│   │   │   ├── ApplyButton.tsx    # Activity apply button
│   │   │   ├── ArrowButton.tsx    # Carousel arrow button
│   │   │   ├── ClientDate.tsx     # Client-side date formatting
│   │   │   ├── ClientDateTime.tsx # Client-side datetime formatting
│   │   │   ├── SkeletonLoader.tsx # Loading skeleton
│   │   │   └── UploadWidget.tsx   # Cloudinary upload widget
│   │   │
│   │   ├── home/                  # Home page components
│   │   ├── achievement/           # Achievement feature components
│   │   ├── activity/              # Activity feature components
│   │   │   └── details/           # Activity detail subcomponents
│   │   ├── competition/           # Competition feature components
│   │   ├── events/                # Events feature components
│   │   ├── eventsdetails/         # Event detail components
│   │   ├── about/                 # About page components
│   │   ├── dashboard/             # Dashboard feature components
│   │   └── pulse/                 # Pulse (recruitment) components
│   │
│   ├── hooks/                     # Custom React hooks
│   │   └── useIsMobile.ts         # Mobile breakpoint detection hook
│   │
│   ├── lib/                       # Core logic & server-side code
│   │   ├── auth.ts                # NextAuth configuration (authOptions)
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── contexts/              # React contexts
│   │   │   └── SANavContext.tsx    # Side navigation context
│   │   ├── service/               # Server Actions ("use server")
│   │   │   ├── achievement.ts     # Achievement CRUD actions
│   │   │   ├── activity.ts        # Activity CRUD actions
│   │   │   ├── application.ts     # Application CRUD actions
│   │   │   ├── competition.ts     # Competition CRUD actions
│   │   │   ├── pulse.ts           # Pulse registration actions
│   │   │   └── user.ts            # User management actions
│   │   └── utils/                 # Utility functions
│   │       └── font.ts            # Google Fonts (Pixelify Sans, Cinzel)
│   │
│   ├── styles/                    # Feature-specific CSS files
│   │   ├── home.css               # Home page styles
│   │   ├── committee.css          # Committee section styles
│   │   ├── committee-card.css     # Committee card styles
│   │   └── event/                 # Event styles
│   │       └── pulse/             # Pulse event styles
│   │
│   ├── types/                     # ALL TypeScript type definitions
│   │   ├── action.ts              # ActionResult<T>, FormProps<T>, shared UI prop types
│   │   ├── committee.ts           # Committee card prop types
│   │   ├── dashboard.ts           # SearchableItem<T> generic
│   │   ├── events.ts              # EventsCardProps
│   │   ├── homecard.ts            # HomeServiceCard
│   │   ├── popUpPanel.ts          # PopUpPanelProps
│   │   ├── css.d.ts               # CSS module declaration
│   │   └── service/               # Domain model types (mirrors Prisma models)
│   │       ├── achievement.ts     # Achievement, AchievementData, AchievementSchema, AchievementInput
│   │       ├── activity.ts        # Activity, ActivityData, ActivitySchema, ActivityInput
│   │       ├── application.ts     # Application, ApplicationWithDetails, ApplicationSchema
│   │       ├── competition.ts     # Competition, CompetitionData, CompetitionSchema
│   │       ├── pulse.ts           # Pulse, PulseSchema, PulseInput
│   │       └── user.ts            # User, UserData, UserSchema
│   │
│   └── middleware.ts              # Route protection (role-based access control)
│
├── .env                           # Environment variables (NEVER commit secrets)
├── .gitignore
├── eslint.config.mjs              # ESLint flat config (next/core-web-vitals + next/typescript)
├── next.config.ts                 # Next.js configuration (image remote patterns)
├── postcss.config.mjs             # PostCSS config for Tailwind
├── prisma.config.ts               # Prisma CLI configuration
├── tsconfig.json                  # TypeScript config (strict: true, path alias @/*)
├── package.json
└── pnpm-lock.yaml
```

### Folder Rules

1. **`src/app/`** — Contains **ONLY** `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, and `route.ts` files. **No components, hooks, types, utilities, or business logic.** Pages are thin wrappers that import from `components/` and call server actions from `lib/service/`.
2. **`src/components/`** — All React components live here, organized by feature. Shared/reusable components go in the root of `components/`. Feature-specific components go in a matching subdirectory (e.g., `components/achievement/`). Utility/wrapper components go in `components/utils/`.
3. **`src/hooks/`** — All custom React hooks. Each hook in its own file, prefixed with `use` (e.g., `useIsMobile.ts`). Hooks must have `"use client"` directive at the top.
4. **`src/lib/`** — Core server-side logic. Never import from `components/` or `hooks/`.
   - `lib/service/` — All Server Actions (`"use server"` files). One file per domain entity.
   - `lib/contexts/` — React context providers and consumers.
   - `lib/utils/` — Pure utility functions (fonts, formatting, helpers).
5. **`src/types/`** — **THE ONLY PLACE** to define interfaces, types, and Zod schemas. See [Type System Rules](#type-system-rules) below.
6. **`src/styles/`** — Feature-specific CSS files that are too large for Tailwind inline or `globals.css`.
7. **`prisma/`** — Schema, migrations, and seed data. **Never manually edit migration files.**
8. **`public/`** — Static assets organized by feature name in subdirectories.

---

## TypeScript Rules — ZERO TOLERANCE

### The `any` Ban

> **NEVER use the `any` type. This is non-negotiable.**

- ❌ `const data: any`
- ❌ `function foo(x: any)`
- ❌ `as any`
- ❌ `catch (error: any)`
- ❌ `Record<string, any>`

Use these alternatives instead:

| Instead of | Use |
|---|---|
| `any` | A proper interface or type |
| `any` for unknown data | `unknown` + type narrowing |
| `any` in catch blocks | `unknown` + `instanceof Error` check |
| `any` for objects | `Record<string, unknown>` |
| `any` for JSON | Define the exact shape, or use Zod `.parse()` |
| `any` for event handlers | The proper React event type (e.g., `React.ChangeEvent<HTMLInputElement>`) |
| `any` for refs | `React.RefObject<HTMLDivElement>` (or appropriate element type) |
| `any` for generic args | Proper generic constraint `<T extends SomeType>` |

### Catch block pattern

```typescript
// ✅ CORRECT
try {
  // ...
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error("Failed:", message);
  return { success: false, error: message };
}

// ❌ WRONG
try {
  // ...
} catch (error: any) {
  console.error(error.message);
}
```

---

## Type System Rules

### Where to Define Types

| Type Category | Location | Example |
|---|---|---|
| **Domain models** (entities, DTOs, Zod schemas) | `src/types/service/<entity>.ts` | `Achievement`, `AchievementSchema`, `AchievementInput` |
| **Shared UI prop types** used across multiple features | `src/types/<name>.ts` | `ActionResult<T>`, `FormProps<T>`, `SearchableItem<T>` |
| **Component props** used by a single component | `src/types/<feature-or-name>.ts` | `EventsCardProps`, `PopUpPanelProps` |
| **Ambient declarations** (CSS modules, env vars) | `src/types/<name>.d.ts` | `css.d.ts` |
| **Prisma enums** (`Role`, `Status`, `Category`, `Level`, `Type`) | Import from `@prisma/client` | `import { Role } from "@prisma/client"` |

### What Goes Where

- **`src/types/service/`** — One file per domain entity. Each file contains:
  1. The **full entity interface** (mirrors Prisma model with TypeScript types)
  2. The **Data interface** (input shape for creates/updates, omitting `id`, `createdAt`, `updatedAt`)
  3. The **Zod schema** for validation
  4. The inferred **Input type** (`z.infer<typeof Schema>`)
  5. The **FormProps type** (extends `FormProps<T>` from `action.ts`)

- **`src/types/action.ts`** — Shared generic types: `ActionResult<T>`, `FormProps<T>`, `UploadWidgetProps`, `ArrowButtonProps`, `ApplyButtonProps`.

- **`src/types/` root** — Component prop interfaces that don't belong to a service entity (e.g., `EventsCardProps`, `HomeServiceCard`, `PopUpPanelProps`, `SearchableItem`).

### Strict Rules

1. **NEVER define interfaces/types inline in component files.** Extract to `src/types/`.
2. **NEVER define types in `lib/service/` files.** Import from `src/types/`.
3. **NEVER duplicate Prisma enum definitions.** Always import from `@prisma/client`.
4. **Use `interface` for object shapes** (component props, domain models). Use `type` only for unions, intersections, mapped types, or `z.infer<>`.
5. **All exported interfaces must be explicitly typed** — no implicit return types on exported functions.
6. **Prefer `type` aliases from Zod inference** for form input shapes:
   ```typescript
   export type AchievementInput = z.infer<typeof AchievementSchema>;
   ```
7. **Generic types go in `src/types/action.ts`** or `src/types/dashboard.ts`:
   ```typescript
   export interface ActionResult<T> {
     success: boolean;
     data?: T;
     error?: string;
     message?: string;
   }
   ```

---

## Hooks Rules

1. **All hooks live in `src/hooks/`** — one hook per file.
2. **File naming**: `use<Name>.ts` (camelCase with `use` prefix).
3. **Every hook file must start with `"use client"`** directive.
4. **Hooks must have explicit return types** — never rely on type inference for the return value.
5. **Never define hooks inside components.** Extract to `src/hooks/`.
6. **Context hooks** (like `useOptionalSideNav`) live in `src/lib/contexts/` alongside their context definition — these are the only exception to the `src/hooks/` rule.

---

## Server Actions Rules

1. **All server actions live in `src/lib/service/`** — one file per domain entity.
2. **Every file must start with `"use server"`** directive.
3. **Every action must return `Promise<ActionResult<T>>`** for mutations, or `Promise<T>` for queries.
4. **Always validate with Zod before any database operation.**
5. **Always call `revalidatePath()` after mutations** to invalidate relevant caches.
6. **Never import server actions in client components directly** — pass them as props or use them in server components.

---

## Component Rules

1. **Server Components by default.** Only add `"use client"` when the component needs:
   - `useState`, `useEffect`, `useRef`, or other hooks
   - Event handlers (`onClick`, `onChange`, etc.)
   - Browser APIs (`window`, `document`, etc.)
   - GSAP animations
2. **Component files are PascalCase**: `AchievementCard.tsx`, `HomeHeroDesktop.tsx`.
3. **One component per file.** Small helpers within the same file are acceptable only if they are not exported.
4. **Props must be typed via an interface** imported from `src/types/`.
5. **Shared components** (used across 2+ features) go in `src/components/` root.
6. **Feature components** go in `src/components/<feature>/` matching their route/domain.

---

## Styling Rules

1. **Tailwind CSS v4 is the primary styling method.** Use utility classes inline.
2. **Use `tailwind-merge` (`twMerge`)** when conditionally combining classes to avoid conflicts.
3. **Global tokens** (colors, font families) are defined in `src/app/globals.css` under `@theme`.
4. **Custom `@font-face` declarations** go in `src/app/globals.css`.
5. **Google Fonts** loaded via `next/font/google` are configured in `src/lib/utils/font.ts` and applied as CSS variables.
6. **Feature-specific CSS** that cannot be expressed in Tailwind goes in `src/styles/<feature>.css`.
7. **Never use inline `style={}` props** unless absolutely necessary for dynamic runtime values (e.g., GSAP-controlled transforms).

---

## Prisma & Database Rules

1. **`prisma/schema.prisma`** is the single source of truth for all models and enums.
2. **Never manually edit migration files** in `prisma/migrations/`.
3. **Use the Prisma client singleton** from `src/lib/prisma.ts` — never instantiate `new PrismaClient()` elsewhere.
4. **Enums** (`Role`, `Status`, `Category`, `Level`, `Type`) are defined in Prisma schema and imported from `@prisma/client`. Do not re-declare them.
5. **Run `pnpm prisma:migrate`** to create migrations. **Run `pnpm prisma:deploy`** for production.

---

## Authentication & Authorization

1. **Auth config** lives in `src/lib/auth.ts` — the single `authOptions` export.
2. **Route protection** is handled by `src/middleware.ts` using `next-auth/middleware`.
3. **Only `@ciputra.ac.id` emails** are allowed to sign in.
4. **Role-based access** is defined in `ROUTE_PERMISSIONS` in `middleware.ts`:
   - `/dashboard/sa` → `SA`, `LECTURER`, `TECH`
   - `/dashboard/pr` → `PR`, `TECH`
   - `/dashboard/tech` → `TECH`
   - `/dashboard/pulse` → `PULSE`, `TECH`
5. **Never bypass middleware** for dashboard routes. Add new role routes to `ROUTE_PERMISSIONS`.

---

## Import Rules

1. **Always use the `@/` path alias** (maps to `./src/*`). Never use relative imports that go above two levels (`../../..`).
2. **Import order** (enforced consistently):
   1. External packages (`react`, `next`, `next-auth`, `zod`, `@prisma/client`, etc.)
   2. Internal absolute imports (`@/lib/...`, `@/types/...`, `@/components/...`, `@/hooks/...`)
   3. Relative imports (only for files in the same directory)
3. **Never import from `src/lib/` in client components** (except contexts and utils).
4. **Never import from `src/components/` or `src/hooks/` in `src/lib/service/` files.**

---

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Component files | PascalCase `.tsx` | `AchievementCard.tsx` |
| Hook files | camelCase with `use` prefix `.ts` | `useIsMobile.ts` |
| Service files | camelCase `.ts` | `achievement.ts` |
| Type files | camelCase `.ts` | `achievement.ts`, `action.ts` |
| Interfaces | PascalCase, descriptive nouns | `Achievement`, `ActionResult<T>` |
| Type aliases | PascalCase | `AchievementInput`, `CompetitionFormProps` |
| Zod schemas | PascalCase + `Schema` suffix | `AchievementSchema`, `ActivitySchema` |
| Server action functions | camelCase verbs | `createAchievement`, `getActivities` |
| React contexts | PascalCase + `Context`/`Provider` suffix | `SideNavProvider` |
| CSS files | kebab-case `.css` | `committee-card.css` |
| Public asset directories | kebab-case | `eventsdetails/`, `pdddesign/` |
| Route params | camelCase in brackets | `[achievementId]`, `[eventId]` |
| Environment variables | SCREAMING_SNAKE_CASE | `DATABASE_URL`, `GOOGLE_CLIENT_ID` |

---

## File Creation Checklist

Before creating any new file, verify:

- [ ] Is it in the correct directory per the folder structure above?
- [ ] Does it follow the naming convention?
- [ ] Are all types defined in `src/types/` (not inline)?
- [ ] Does it use `@/` path alias for imports?
- [ ] Is `any` used anywhere? → **Remove it.**
- [ ] Does a new hook have `"use client"` and live in `src/hooks/`?
- [ ] Does a new server action have `"use server"` and live in `src/lib/service/`?
- [ ] Are Prisma enums imported from `@prisma/client` (not re-declared)?
- [ ] Does a new dashboard route have its role added to `ROUTE_PERMISSIONS` in `middleware.ts`?
