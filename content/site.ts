/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT
 *  Every word that appears on the site lives in this file.
 *  Edit text here freely — components and animations read from these arrays
 *  and adapt to however many items exist. Nothing else needs to change.
 *
 *  Notes on a few fields:
 *   - `code`  (in sections)  : the small margin label beside each section.
 *   - `highlights` (about)   : phrases inside the paragraphs that get a
 *                              highlighter stroke + margin code. The phrase
 *                              must match the paragraph text exactly; if it
 *                              doesn't, it is simply not highlighted.
 *   - `from` / `to` (path)   : machine-readable months (YYYY-MM) used ONLY to
 *                              plot the time axis. `when` is what's displayed.
 *   - `posts`                : add a new object to publish a new field note.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const meta = {
  name: "Sanha Manocha",
  title: "Sanha Manocha — Field notes on people, prices, and product",
  description:
    "Consumer & market insights researcher, behavioural economist, and part-time builder of small useful tools. Field notes from Sanha Manocha.",
  siteUrl: "https://sanhamanocha.com",
  footer: "Sanha Manocha — last updated 2026.",
};

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Current work", href: "/#work" },
  { label: "Things I've built", href: "/#made" },
  { label: "Earlier path", href: "/#path" },
  { label: "Education", href: "/#education" },
  { label: "Toolkit", href: "/#toolkit" },
  { label: "Field notes", href: "/notes" },
  { label: "Connect", href: "/#connect" },
];

export const hero = {
  eyebrow: "i. an opening note",
  headline:
    "I spend my working life trying to understand why people buy, believe, and behave the way they do — then I go build the tools that help ask better questions about it.",
  sub:
    "Consumer & market insights researcher by trade, behavioural economist by training, and someone who can't leave a good research problem alone until she's turned it into a working prototype.",
  facts: [
    { label: "Based in", value: "India" },
    { label: "Currently", value: "Consumer & Market Insights Executive, Pilgrim" },
    { label: "Trained at", value: "Erasmus University Rotterdam" },
  ],
  /**
   * Fragments that drift across the hero canvas and sort themselves into a
   * grid. Each is a short quotation lifted from the content below.
   * `code` decides the colour family it sorts into: motive | method | build | figure
   */
  fragments: [
    { text: "why people buy", code: "motive" },
    { text: "believe, and behave", code: "motive" },
    { text: "why people do what they do", code: "motive" },
    { text: "a fairly stubborn curiosity", code: "motive" },
    { text: "fairness drives consumer behaviour", code: "motive" },
    { text: "price transparency", code: "motive" },
    { text: "framing and visuals", code: "motive" },
    { text: "human understanding", code: "motive" },
    { text: "how people actually live", code: "motive" },
    { text: "curious about people", code: "motive" },
    { text: "voice-of-consumer", code: "motive" },
    { text: "consumer chatter", code: "motive" },
    { text: "IDIs", code: "method" },
    { text: "FGDs", code: "method" },
    { text: "in-home visits", code: "method" },
    { text: "concept-evolution calls", code: "method" },
    { text: "U&A", code: "method" },
    { text: "concept and claims tests", code: "method" },
    { text: "barrier and lapser studies", code: "method" },
    { text: "brand tracking", code: "method" },
    { text: "conjoint", code: "method" },
    { text: "Van Westendorp", code: "method" },
    { text: "Gabor-Granger", code: "method" },
    { text: "head-to-head testing", code: "method" },
    { text: "thematic coding", code: "method" },
    { text: "randomised controlled trial", code: "method" },
    { text: "A/B testing framework", code: "method" },
    { text: "field studies", code: "method" },
    { text: "moderation", code: "method" },
    { text: "significance testing", code: "method" },
    { text: "synthesising across dozens of studies", code: "method" },
    { text: "in-house survey platform", code: "build" },
    { text: "real-time product-feedback dashboard", code: "build" },
    { text: "Swipe Cards", code: "build" },
    { text: "HSV colour-wheel survey", code: "build" },
    { text: "Postgres", code: "build" },
    { text: "Next.js dashboard", code: "build" },
    { text: "Claude Code", code: "build" },
    { text: "keyboard navigation throughout", code: "build" },
    { text: "a working prototype", code: "build" },
    { text: "gamified app interventions", code: "build" },
    { text: "peer-comparison tool", code: "build" },
    { text: "automated reconciliations", code: "build" },
    { text: "Goonj", code: "build" },
    { text: "40+ quantitative studies a year", code: "figure" },
    { text: "10+ category D2C beauty portfolio", code: "figure" },
    { text: "n=78", code: "figure" },
    { text: "35%", code: "figure" },
    { text: "7 regions", code: "figure" },
    { text: "150%", code: "figure" },
    { text: "25%", code: "figure" },
    { text: "40%", code: "figure" },
    { text: "15%", code: "figure" },
    { text: "₹375Cr+", code: "figure" },
    { text: "99% accuracy", code: "figure" },
    { text: "250+ hours a year", code: "figure" },
    { text: "8/10", code: "figure" },
    { text: "IELTS — 8.0", code: "figure" },
    { text: "49/50", code: "figure" },
    { text: "no significant lift", code: "figure" },
  ],
};

export const about = {
  id: "about",
  code: "ii",
  tag: "who I am",
  heading: "About",
  paragraphs: [
    "I run end-to-end qualitative and quantitative research for a D2C beauty and personal care brand — everything from early concept work through to how a product actually performs after it launches. I work directly with category heads and the C-suite to shape product and brand decisions, and I'm comfortable owning a study from design through fieldwork, moderation, analysis, and the final stakeholder presentation.",
    "My background is in behavioural economics (MSc, Erasmus University Rotterdam), with project experience across the Netherlands and India before that. What ties it together is a fairly stubborn curiosity: I want to know why people do what they do, and I'd rather build a small tool to test a theory than just write a slide about it.",
  ],
  highlights: [
    { phrase: "end-to-end qualitative and quantitative research", code: "METHOD" },
    { phrase: "category heads and the C-suite", code: "AUDIENCE" },
    { phrase: "design through fieldwork, moderation, analysis, and the final stakeholder presentation", code: "SCOPE" },
    { phrase: "behavioural economics", code: "TRAINING" },
    { phrase: "why people do what they do", code: "MOTIVE" },
    { phrase: "build a small tool to test a theory", code: "BUILD" },
  ],
};

export const work = {
  id: "work",
  code: "iii",
  tag: "right now",
  heading: "Current work",
  roles: [
    {
      title: "Consumer & Market Insights Executive",
      org: "Heavenly Secrets Pvt. Ltd. — Pilgrim & PHD brand, India",
      when: "Nov 2025 — present",
      points: [
        "Co-own end-to-end consumer research across a 10+ category D2C beauty portfolio — embedded in new product development, brand positioning, launch readiness, marketing, and post-launch iteration.",
        "Lead qualitative research end-to-end: IDIs, FGDs, in-home visits, and iterative concept-evolution calls with category heads, synthesising across dozens of studies to turn human understanding into product concepts.",
        "Design and analyse 40+ quantitative studies a year: U&A, concept and claims tests, barrier and lapser studies, brand tracking, and conjoint and pricing research (Van Westendorp, Gabor-Granger) — pairing standard frameworks with custom-built approaches when the question demands it.",
        "Gate major launches on head-to-head testing against category leaders, among both competitor and existing users — a reformulated hair-fall shampoo and a new hair-colour range only launched after beating the incumbent.",
        "Turn findings into commercial trade-offs for leadership rather than just data — flagged no significant lift from a costlier serum reformulation, which shaped the CMO's call on whether to continue it.",
        "Deliver the company's monthly voice-of-consumer briefing, \"Goonj,\" to the CEO, Co-founders, CMO, and CFO, and run a weekly working session with the CMO to keep leadership close to the consumer.",
        "Build internal tools and pilot new research methods out of curiosity: a real-time product-feedback dashboard, an in-house survey platform, and ongoing experiments with emerging techniques.",
      ],
    },
  ],
};

export const made = {
  id: "made",
  code: "iv",
  tag: "things I've built",
  heading: "Things I've built",
  lede:
    "Research is the day job. Building the tools to do it faster, or just to test an idea, is the part I do for fun.",
  projects: [
    {
      name: "Pilgrim CMI Survey Studio",
      status: "in active use",
      description:
        "An in-house survey platform built with Claude Code, inspired by Tally and Qualtrics but built for how our team actually works — keyboard navigation throughout, and a \"Swipe Cards\" question type for fast concept testing.",
      tags: ["Claude Code", "internal tool", "survey design"],
      href: null,
    },
    {
      name: "Voice-of-consumer dashboard",
      status: "prototype",
      description:
        "An architecture and dashboard prototype that pulls consumer chatter from Amazon, Flipkart, and Reddit into a Postgres database, surfaced through a Next.js dashboard — built to catch product feedback closer to real time than a quarterly study can.",
      tags: ["Next.js", "PostgreSQL", "web scraping"],
      href: null,
    },
    {
      name: "Color Instincts",
      status: "shipped",
      description:
        "A consumer-facing HSV colour-wheel survey — a self-contained web app that lets people express colour preference directly rather than choosing from a fixed swatch list, feeding straight into a Google Sheet for analysis.",
      tags: ["HTML / CSS / JS", "Netlify", "consumer research"],
      href: null,
    },
    {
      name: "Car Clinic Chandigarh",
      status: "shipped",
      description:
        "A small business website built and deployed end to end — outside the beauty and research world entirely, mostly to prove to myself I could take a build from nothing to a live, working site on my own.",
      tags: ["Next.js 14", "Tailwind", "Vercel"],
      href: null,
    },
    {
      name: "Glow Up",
      status: "in progress",
      description:
        "An early-stage concept for a wellness app grounded in behavioural science rather than generic habit-tracking — still taking shape.",
      tags: ["concept", "behavioural science"],
      href: null,
    },
  ],
};

export const path = {
  id: "path",
  code: "v",
  tag: "how I got here",
  heading: "Earlier path",
  lede:
    "Before consumer insights, a few years of learning how behavioural ideas hold up outside a classroom — and one year in operations that taught me what it means for a number to actually have to be right.",
  entries: [
    {
      when: "Jan — May 2024",
      from: "2024-01",
      to: "2024-05",
      role: "Consultant",
      org: "Hitachi Construction Machinery, Netherlands",
      summary:
        "Led market research across 7 regions — interviews, field studies, thematic coding — to shape go-to-market strategy, designing surveys in Qualtrics and analysing results in Power BI. Projected a 150% engagement lift.",
    },
    {
      when: "Jan — Feb 2024",
      from: "2024-01",
      to: "2024-02",
      role: "Consultant",
      org: "Eneco, Netherlands",
      summary:
        "Built gamified app interventions — rewards, notifications, a planner — projected to raise daily logins by 25%, and proposed an A/B testing framework projected to cut cost by 40%.",
    },
    {
      when: "Feb — Mar 2024",
      from: "2024-02",
      to: "2024-03",
      role: "Consultant",
      org: "Mijn Sofie Pension Planner, Netherlands",
      summary:
        "Ran a randomised controlled trial (n=78) testing framing and visuals in pension planning, improving optimal scheme selection by 35%, and delivered a peer-comparison tool projected to drive a further 15% engagement.",
    },
    {
      when: "Jul 2021 — Jun 2022",
      from: "2021-07",
      to: "2022-06",
      role: "Operations Analyst",
      org: "J.P. Morgan Chase, India",
      summary:
        "Managed OTC derivatives worth ₹375Cr+ a month across 100+ accounts at 99% accuracy, resolved ₹75Cr+ in daily breaks, and automated reconciliations with Excel and Alteryx — saving 250+ hours a year.",
    },
  ],
};

export const education = {
  id: "education",
  code: "vi",
  tag: "training",
  heading: "Education",
  items: [
    {
      degree: "MSc Behavioural Economics",
      school: "Erasmus University Rotterdam, Netherlands",
      meta: "2022 — 2024 · 8/10",
      thesis:
        "Thesis: \"How Price Transparency Shapes Fairness, and How Fairness Drives Consumer Behaviour\"",
    },
    {
      degree: "Exchange Program",
      school: "Baldwin Wallace University, USA",
      meta: "Spring 2020 · 9/10",
      thesis: null,
    },
    {
      degree: "BCom Finance and Investment",
      school: "Christ University, Bangalore, India",
      meta: "2018 — 2021 · 9/10",
      thesis: null,
    },
  ],
};

export const toolkit = {
  id: "toolkit",
  code: "vii",
  tag: "how I work",
  heading: "Toolkit",
  groups: [
    {
      label: "research methods",
      items: [
        "IDIs",
        "FGDs",
        "In-home visits",
        "Concept & claims testing",
        "U&A studies",
        "Barrier / lapser studies",
        "Brand tracking",
        "Conjoint & pricing research",
        "Competitive benchmarking",
        "A/B testing",
        "Significance testing",
        "Thematic analysis",
        "Vendor management",
      ],
    },
    {
      label: "tools",
      items: [
        "Tally",
        "Qualtrics",
        "SQL",
        "Power BI",
        "Tableau",
        "Excel",
        "Claude Code",
        "Atlas.ti",
        "PowerPoint",
      ],
    },
    {
      label: "languages",
      items: ["English — advanced", "Hindi — native", "Punjabi — native"],
    },
  ],
};

export const recognition = {
  id: "recognition",
  code: "viii",
  tag: "on the record",
  heading: "Recognition",
  items: [
    { name: "\"AI Ka Akhada\" Award", org: "Heavenly Secrets" },
    { name: "Star of the Month", org: "J.P. Morgan" },
    { name: "Dean's List", org: "Baldwin Wallace University" },
    { name: "Merit Scholarship", org: "Christ University" },
    { name: "Google Data Analytics Professional Certificate — Level 2", org: "Google" },
    { name: "CISI Merit Certification — 49/50", org: "CISI" },
    { name: "IELTS — 8.0", org: "IELTS" },
  ],
};

/* ── Field notes ─────────────────────────────────────────────────────────── */

export type Post = {
  /** URL-safe id. Used for /notes/<slug> when `body` is provided. */
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. Displayed formatted; also used for sorting. */
  date: string;
  /** One or two sentences shown in the feed. */
  excerpt: string;
  /** Where the canonical post lives (e.g. your Substack URL). Optional. */
  href?: string;
  /** Short label for the source, e.g. "Substack". Optional. */
  source?: string;
  /**
   * Optional full text, one string per paragraph. If present, the post gets
   * its own page at /notes/<slug>. If absent, the feed links to `href`.
   */
  body?: string[];
};

export const writing = {
  id: "writing",
  code: "ix",
  tag: "a work in progress",
  heading: "Field notes",
  note: [
    "I'm starting to write in public — not as a research analyst, but closer to an anthropologist who happens to also run consumer studies for a living. The plan is simple: pick something about how people actually live, learn it properly, and only then write about it.",
    "This section will hold that writing as it goes up — starting on Substack, mirrored here. Nothing published yet. Check back soon.",
  ],
  /**
   * Add posts here. Newest first is not required — the feed sorts by date.
   * Example:
   * {
   *   slug: "the-queue-at-the-chemist",
   *   title: "The queue at the chemist",
   *   date: "2026-10-01",
   *   excerpt: "What twenty minutes in line taught me about trust.",
   *   href: "https://yourname.substack.com/p/the-queue-at-the-chemist",
   *   source: "Substack",
   *   body: ["First paragraph…", "Second paragraph…"],
   * },
   */
  posts: [] as Post[],
};

export const connect = {
  id: "connect",
  code: "x",
  tag: "get in touch",
  heading: "Connect",
  text: "Always glad to talk about consumer behaviour, behavioural economics, or a half-formed idea for a tool.",
  links: [
    { label: "sanha.manocha@yahoo.com", href: "mailto:sanha.manocha@yahoo.com", external: false },
    { label: "linkedin.com/in/sanha-manocha", href: "https://linkedin.com/in/sanha-manocha", external: true },
  ],
};
