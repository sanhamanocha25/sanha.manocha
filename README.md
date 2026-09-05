# sanha.manocha

Personal site for Sanha Manocha — consumer & market insights researcher and behavioural economist who builds whatever small thing helps her study people better.

Built with Next.js (App Router), Tailwind CSS v4, Framer Motion and GSAP ScrollTrigger. Deploys to Vercel with zero configuration.

## The idea

The page is one argument in three states of a research mind, each with its own instrument:

| State | Plain meaning | Signature treatment |
| --- | --- | --- |
| **Notice** | watching how people actually behave, and asking why | The bio as a transcript being coded: highlighter strokes scrubbed by scroll, margin codes that explain themselves |
| **Question** | checking it properly, at scale, with numbers | The role, plotted: a panel of unit marks fills in as each statement scrolls past. Education, earlier roles, toolkit and recognition are filed underneath as numbered footnotes |
| **Test** | trying small things to find out faster | The bench: five experiments, each with a working miniature you can operate |

Field notes sit between Notice and Question as the bridge.

## Editing the site

**All text lives in one file: [`content/site.ts`](content/site.ts).** It has two clearly separated parts:

- **Part A — verbatim facts.** Job title, dates, numbers, education, awards, thesis, bio paragraphs. Carried over character for character from the original site.
- **Part B — new copy.** Everything drafted for the redesign: the five bench write-ups, the "where this leads" sentence, the state glosses, the glossary, widget labels and the micro-survey questions. Edit or delete freely.

Components read from these arrays and adapt to however many items exist, so adding, removing or rewording entries never touches animation code.

### Fields worth knowing

| Where | Field | What it does |
| --- | --- | --- |
| `heroSummary`, `heroExtras`, `heroNote` | `text`, `code` | The hero summary sentences. Wrap a keyword in `[[double brackets]]` to make it a tag; tags drift across the opening screen and fly into place. `heroExtras` drift and fade. |
| `noticeHighlights` | `phrase`, `code` | Phrases in the bio that get a highlighter stroke and margin code. Must match the text exactly |
| `codeGloss` | — | Plain-language meaning of each margin code, shown on hover or tap |
| `glossary` | — | Research terms found in the text, with a one-line gloss. Matched exactly, case-sensitive |
| `questionPanel` | `point`, `kind`, `count` | Which role statement lights each panel group. `count` must be a number the statement states |
| `pathEntries`, `education` | `from`, `to`, `years` | Used only to plot the time axis: roles by month, education by year. `when` and `meta` are what is displayed |
| `bench` | `why`, `did`, `result` | The three lab-entry fields. Leave one empty to hide it |
| `writing.posts` | — | The field-notes feed (see below) |

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

With `body`, the note renders at `/notes/<slug>`. Without it, the feed links to `href`. The home page shows the latest three; `/notes` shows all.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Structure

```
app/               routes: /, /notes, /notes/[slug], not-found, icon
components/        Hero, Notice, Question (+ Panel, Provenance), Test, FieldNotes, Connect
components/bench/  the five miniatures: Feed, Wheel, Delight, Screen, Platform
content/site.ts    all site content (Part A verbatim, Part B new copy)
lib/               motion helpers, glossary wrapper, post helpers
```

## Performance and accessibility

- The five bench miniatures are code-split and mount only when scrolled within 480px of the viewport.
- Timers and animation loops pause when their widget is off screen or the tab is hidden.
- `prefers-reduced-motion` is honoured everywhere: the hero renders as a static sorted grid, scroll choreography collapses to its end state, the cadence pulses and cursor stop, and each miniature falls back to a static or instant version.
- Every glossary term is a focusable button with a tooltip; the colour wheel has slider equivalents for keyboard users.
