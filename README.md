# sanha.manocha

Personal site for Sanha Manocha — consumer & market insights researcher, behavioural economist, builder of small useful tools.

Built with Next.js (App Router), Tailwind CSS v4, Framer Motion and GSAP ScrollTrigger. Deploys to Vercel with zero configuration.

## Editing the site

**All text lives in one file: [`content/site.ts`](content/site.ts).**
Bio, work history, projects, earlier roles, education, toolkit, recognition, the field-notes feed and the contact links are plain arrays and strings there. Components read from those arrays and adapt to however many items exist, so adding, removing or rewording entries never touches animation code.

A few fields worth knowing about:

| Where | Field | What it does |
| --- | --- | --- |
| `hero.fragments` | `text`, `code` | The fragments that drift across the hero and sort into the coded grid. `code` is one of `motive`, `method`, `build`, `figure` and decides how it's marked. |
| `about.highlights` | `phrase`, `code` | Phrases in the About paragraphs that get a highlighter stroke and a margin code. The phrase must match the paragraph text exactly. |
| `path.entries` | `from`, `to` | `YYYY-MM` values used only to plot the time axis. `when` is what's displayed. |
| `made.projects` | `href` | Optional link for a project name. Leave `null` for none. |
| `writing.posts` | — | The field-notes feed. See below. |

### Publishing a field note

Add an object to `writing.posts`:

```ts
{
  slug: "the-queue-at-the-chemist",
  title: "The queue at the chemist",
  date: "2026-10-01",
  excerpt: "What twenty minutes in line taught me about trust.",
  href: "https://yourname.substack.com/p/the-queue-at-the-chemist",
  source: "Substack",
  // Optional. If present the post gets its own page at /notes/<slug>.
  body: ["First paragraph…", "Second paragraph…"],
}
```

- With `body`, the note renders at `/notes/<slug>` and the feed links there.
- Without `body`, the feed links straight to `href`.
- The feed sorts by `date`, newest first. The home page shows the latest three; `/notes` shows all.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Structure

```
app/            routes: /, /notes, /notes/[slug], not-found, icon
components/     one component per section; Section.tsx is the shared coding-sheet layout
content/site.ts all site content
lib/            motion helpers (reduced-motion, hover detection), post helpers
```

## Design notes

The visual language is a qualitative researcher's coding sheet: evidence on the left, the analyst's margin on the right. Fraunces carries the human voice; JetBrains Mono carries the codes, figures and dates. One accent — a chartreuse highlighter — plus a rarely used red pen for figures.

Motion respects `prefers-reduced-motion` everywhere: the hero renders as a static sorted grid, scroll choreography collapses to its end state, and the hover lens is disabled.
