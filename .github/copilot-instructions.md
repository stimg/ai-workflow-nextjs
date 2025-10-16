# Copilot Instructions for ai-workflow-nextjs

## Repository Overview

This is a **Next.js 15.5.5** project that demonstrates an AI-powered chat interface using the Vercel AI SDK. It's a small-to-medium sized web application (~2,870 lines of TypeScript/TSX code) that provides a conversational UI for interacting with OpenAI's GPT models.

**Tech Stack:**
- **Framework:** Next.js 15.5.5 (App Router) with Turbopack
- **Runtime:** Node.js v20+ (tested with v20.19.5)
- **Package Manager:** npm v10+ (tested with v10.8.2)
- **Language:** TypeScript 5.x with strict mode
- **Styling:** Tailwind CSS v4 (inline config in globals.css, no separate config file)
- **UI Components:** Radix UI primitives + custom shadcn/ui-style components
- **AI Integration:** Vercel AI SDK (@ai-sdk/react, @ai-sdk/openai, ai)
- **Key Libraries:** React 19.1.0, Lucide React icons, XYFlow for diagrams

## Build and Validation Commands

### Critical: Always Install Dependencies First
**ALWAYS run `npm install` immediately after cloning or before any other command.** This is required for all subsequent operations.

```bash
npm install
```

### Development Server
Start the development server with Turbopack (fast refresh enabled):
```bash
npm run dev
```
- Server starts at http://localhost:3000
- Ready in ~1-2 seconds
- No build errors expected in dev mode
- **Known Issue:** Google Fonts (Geist, Geist Mono) may fail to load if internet access is restricted. This is expected and does not prevent dev server from starting.

### Linting
```bash
npm run lint
```
- **Expected Behavior:** Linting currently shows 13 problems (4 errors, 9 warnings) in `src/components/ai-elements/prompt-input.tsx`
- **Known Issues:**
  - 4 TypeScript errors for `@typescript-eslint/no-explicit-any` (lines 965-971)
  - 9 React hooks exhaustive-deps warnings
  - 1 next/no-img-element warning
- **Important:** These are pre-existing issues. Do NOT attempt to "fix" them unless specifically working on prompt-input.tsx. They do not block builds or development.

### Production Build
```bash
npm run build
```
- **Expected Duration:** 15-30 seconds on first build
- **Known Build Issue:** Build WILL FAIL with "Failed to fetch Geist/Geist Mono from Google Fonts" if internet access to fonts.googleapis.com is blocked
- **Workaround:** This is an environment limitation. In restricted environments, consider:
  1. Using a local font fallback
  2. Removing font imports from `src/app/layout.tsx`
  3. Or document that builds require internet access
- **Cache Warning:** First build shows "No build cache found" - this is normal

### Production Server
After successful build:
```bash
npm start
```
- Serves the production build on http://localhost:3000

### No Test Suite
**This repository has NO test framework configured.** Do not attempt to run tests or add test dependencies unless specifically instructed.

## Project Structure and Architecture

### Root Directory Files
```
/
├── .github/                    # GitHub configuration (you may add workflows here)
├── .aiassistant/              # AI assistant rules (not for general use)
├── src/                       # All source code
├── public/                    # Static assets (SVG icons)
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration (strict mode, @/* alias)
├── eslint.config.mjs          # ESLint configuration (Next.js + TypeScript)
├── next.config.ts             # Next.js configuration (minimal, mostly empty)
├── postcss.config.mjs         # PostCSS with @tailwindcss/postcss plugin
├── components.json            # shadcn/ui configuration (New York style, RSC)
└── README.md                  # Basic Next.js setup documentation
```

### Source Code Structure
```
src/
├── app/                       # Next.js App Router
│   ├── api/chat/route.ts     # Chat API endpoint using Vercel AI SDK
│   ├── page.tsx              # Main chat interface component
│   ├── layout.tsx            # Root layout with fonts and metadata
│   ├── globals.css           # Tailwind v4 inline config + CSS variables
│   └── favicon.ico
├── components/
│   ├── ai-elements/          # Custom AI/chat components
│   │   ├── conversation.tsx  # Chat conversation container (3.2KB)
│   │   ├── message.tsx       # Individual message display (2.6KB)
│   │   ├── prompt-input.tsx  # Complex input component (45KB, has lint issues)
│   │   └── response.tsx      # Response rendering (585B)
│   └── ui/                   # shadcn/ui-style base components
│       ├── button.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── command.tsx
│       └── ... (12 components total)
└── lib/
    └── utils.ts              # Tailwind merge utility (cn function)
```

### Key Configuration Details

**TypeScript Configuration (`tsconfig.json`):**
- Target: ES2017
- Module resolution: bundler
- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Use the alias in imports: `import { Button } from '@/components/ui/button'`

**ESLint Configuration (`eslint.config.mjs`):**
- Extends: `next/core-web-vitals`, `next/typescript`
- Ignores: `node_modules`, `.next`, `out`, `build`, `next-env.d.ts`

**shadcn/ui Configuration (`components.json`):**
- Style: "new-york"
- RSC: true (React Server Components)
- Components path: `@/components`
- UI path: `@/components/ui`
- Tailwind CSS variables: enabled

**API Route (`src/app/api/chat/route.ts`):**
- Uses `@ai-sdk/openai` with model `gpt-4.1-nano`
- Max duration: 30 seconds
- Returns UI message stream response
- **Important:** Requires OPENAI_API_KEY environment variable (not tracked in repo)

### Critical Dependencies
- **Do NOT modify** package.json versions without explicit justification
- Next.js 15.5.5 requires React 19.1.0 (DO NOT downgrade)
- Turbopack is the default bundler (--turbopack flag in scripts)
- Tailwind CSS v4 uses a different configuration approach (inline in CSS)

## Common Development Tasks

### Adding a New Component
1. Create file in `src/components/ui/` or `src/components/ai-elements/`
2. Use TypeScript with proper type exports
3. Import existing components via `@/` alias
4. Follow existing patterns (see `button.tsx` for simple example)
5. Run `npm run lint` to check for issues

### Modifying the Chat Interface
- Main chat UI: `src/app/page.tsx`
- Chat API logic: `src/app/api/chat/route.ts`
- Message display: `src/components/ai-elements/message.tsx`
- Conversation container: `src/components/ai-elements/conversation.tsx`

### Working with Styles
- Global styles: `src/app/globals.css`
- Tailwind v4 uses `@import "tailwindcss"` and `@theme inline { ... }`
- CSS variables defined in `:root` section of globals.css
- Use `cn()` utility from `@/lib/utils` to merge classNames

### Environment Variables
The app requires `OPENAI_API_KEY` for the chat API to function. Create a `.env.local` file:
```
OPENAI_API_KEY=your_key_here
```
This file is gitignored automatically.

## Validation Checklist

Before submitting any PR, ensure:
1. ✅ `npm install` runs successfully
2. ✅ `npm run dev` starts without errors
3. ✅ `npm run lint` shows no NEW errors (pre-existing 13 issues are OK)
4. ⚠️ `npm run build` may fail in restricted environments (document if you encounter this)
5. ✅ TypeScript compilation passes (checked during build)
6. ✅ No new dependencies added unless required
7. ✅ All imports use `@/` path alias for src/ files
8. ✅ Code follows existing patterns and style

## Important Notes

- **Trust these instructions:** Only perform additional searches if information here is incomplete or incorrect
- **Pre-existing lint issues:** The 13 lint issues in prompt-input.tsx are known and should be ignored unless you're specifically fixing them
- **No tests:** Do not attempt to add test infrastructure unless specifically requested
- **Font loading issue:** Google Fonts may fail in restricted environments - this is expected
- **API key required:** The chat feature requires OPENAI_API_KEY environment variable
- **Turbopack is default:** All scripts use --turbopack flag for faster builds
- **React 19:** This project uses React 19.1.0, which is newer and may have different patterns than older versions
