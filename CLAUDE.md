@AGENTS.md

# teo-nextjs-portfolio-v2

Personal portfolio site. Next.js 16 App Router + React 19 + TypeScript, bilingual (en/zh) via next-intl, Tailwind v4 + shadcn-style UI, deployed on Vercel at `https://www.twlworks.com`.

## Commands

```bash
bun install
bun run dev         # next dev --turbo (localhost:3000)
bun run build       # next build
bun run format      # biome check (lint + format, no writes)
bun run format:fix  # biome check --fix  <-- run this before finishing any change
bunx tsc --noEmit   # typecheck; there is no `lint` or `test` script
```

Package manager is **bun** (`bun.lock` is committed) — don't run `npm`/`npx` here, they rewrite the lockfile.

No test suite exists. Verify changes by building or by hitting the dev server (e.g. `curl -s localhost:3000/sitemap.xml`).

## Layout

```
src/app/layout.ts          pass-through root layout (required by root not-found)
src/app/robots.ts          robots.txt      — locale-independent
src/app/sitemap.ts         sitemap.xml     — locale-independent, emits BOTH locales
src/app/[locale]/          every real page lives here
  layout.tsx               html/body, fonts, NextIntlClientProvider, ReactQueryProvider,
                           ThemeProvider, Navbar/Footer/BackToTop, Vercel Analytics
  globals.css              Tailwind entry + theme tokens (imported by the locale layout)
  page.tsx                 home = Hero + SkillSet + Project sections
  about|blog|contact/      page.tsx (server: metadata + data) + *.tsx (client component)
  blog/[slug]/page.tsx     markdown post, generateStaticParams over content/blog
  opengraph-image.tsx      generated OG image
src/components/layout/     navbar, footer, providers, toggles, sections/
src/components/ui/         shadcn-style primitives (Radix + CVA + tailwind-merge)
src/constants/index.tsx    METADATA, NAV_ITEM_LIST, SITE_CONFIG, PROJECT_LIST,
                           SKILL_LIST, CAREER_LIST, EDUCATION_LIST — content lives here
src/constants/types.ts     shared types
src/i18n/routing.ts        next-intl routing + navigation wrappers
src/i18n/request.ts        per-request locale/messages
src/proxy.ts               next-intl middleware
src/utils/                 blog.ts (markdown), api.ts (Medium RSS), cn.ts, getQueryClient.ts
messages/en.json, zh.json  all UI copy
content/blog/*.md          blog posts (gray-matter front matter: title, date, description, tags, coverImage)
```

Import alias: `@/*` → `src/*`.

## i18n rules (get these wrong and pages 404 or SEO breaks)

- Locales `["en", "zh"]`, default `en`, `localePrefix: "as-needed"` → **en has no URL prefix, zh is `/zh/...`**.
- Never import `Link`, `useRouter`, `usePathname`, `redirect` from `next/link` / `next/navigation` in pages — import them from `@/i18n/routing` so locale prefixing is handled.
- All user-facing strings go in `messages/en.json` **and** `messages/zh.json`. Client components use `useTranslations`, server components/`generateMetadata` use `getTranslations({ locale })`.
- `src/proxy.ts` matcher is `/((?!_next|api|.*\..*).*)` — anything with a dot (`/sitemap.xml`, `/robots.txt`) bypasses the middleware, which is why those routes sit outside `[locale]`.
- Anything under `src/app/` but outside `[locale]` is locale-independent: if it emits URLs, it must emit them for every locale itself (see `sitemap.ts`).

## Conventions

- Pages are server components: `page.tsx` does `generateMetadata` + data fetching, then renders a sibling client component (`About.tsx`, `Blog.tsx`, `Contact.tsx`) that holds the interactivity. Keep that split.
- `params` is a Promise — `const { locale } = await params;`.
- Data fetching: TanStack Query, server-prefetched with `getQueryClient()` + `dehydrate` + `HydrationBoundary` (see `blog/page.tsx`).
- Forms: react-hook-form + zod v4 + `@hookform/resolvers`. The contact form has no backend — it builds a `mailto:` link.
- Styling: Tailwind v4 (CSS-first config in `globals.css`, no `tailwind.config`), `cn()` from `@/utils/cn` for class merging, `next-themes` for dark mode (`attribute="class"`).
- Icons: `lucide-react` and `react-icons`. Animation: `motion`.
- Biome, not ESLint/Prettier: **tabs** for indentation, double quotes. Run `bun run format:fix`.
- Portfolio content (projects, skills, career, education) is data in `src/constants/index.tsx`, not JSX scattered in components — add entries there.
- Images: `public/images/`, `next/image` with `remotePatterns` open to all https hosts.

## SEO

`METADATA.url` in `src/constants/index.tsx` is the single source of truth for the site origin (note the trailing slash — strip it when concatenating). It feeds `metadataBase` and `sitemap.ts`. `robots.ts` still hardcodes the URL. When adding a route, add it to `src/app/sitemap.ts`'s `staticRoutes`; entries are expanded across locales with hreflang alternates automatically.

## Known gotchas

- `next.config.js` exposes `MEDIIUM_USERNAME` (typo, three i's) while `blog/page.tsx` reads `process.env.MEDIUM_USERNAME` and `Blog.tsx` reads `NEXT_PUBLIC_MEDIUM_USERNAME`. The Medium feed silently returns `[]` when unset.
- `AGENTS.md` is regenerated by `next dev`; leave its `nextjs-agent-rules` block alone and commit it if it reappears.
