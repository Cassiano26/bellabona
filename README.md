# Bellabona – Homepage

A responsive homepage for Bellabona (office lunch delivery) built as a technical assessment.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Sanity v3** (headless CMS, page builder pattern)
- **Tailwind CSS v4**
- **TypeScript**

## Key Decisions

### Rendering
All page content is fetched server-side via Server Components. Pages are statically generated at build time (`generateStaticParams`) with Sanity data.

### CMS – Page Builder
Sanity is configured with a **page builder** pattern: editors create pages and compose them from reusable section blocks (Hero, Social Proof, Meal Options). Sections render in the order defined in the CMS. A `SectionRenderer` maps each block type to its React component.

### i18n
Internationalization uses a `[lang]` dynamic route segment with JSON dictionaries (`en.json`, `de.json`). A `proxy.ts` handles locale detection and redirection. The CMS stores translated content per-language via `@sanity/document-internationalization`, with slug uniqueness scoped per locale.

### SEO
Metadata is fully CMS-driven: global defaults from `siteSettings`, with per-page overrides. No hardcoded meta tags in the frontend. `generateMetadata` fetches SEO fields from Sanity at build time.

### Project Structure

```
src/
├── app/
│   ├── [lang]/              # i18n route segment
│   │   ├── [slug]/page.tsx  # Dynamic CMS pages
│   │   ├── page.tsx         # Homepage (slug: "home")
│   │   ├── layout.tsx       # Lang layout + dynamic metadata
│   │   └── dictionaries/    # EN/DE translation files
│   └── studio/              # Embedded Sanity Studio
├── components/
│   ├── SectionRenderer.tsx  # Maps CMS sections → components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── SocialProof.tsx
│   ├── MealOptions.tsx
│   └── Footer.tsx
└── sanity/
    ├── schemas/             # Page, sections, SEO, siteSettings
    └── lib/                 # Client, queries, image helper
```

## Getting Started

```bash
npm install
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Sanity Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

### Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```
