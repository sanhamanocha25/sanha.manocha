/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  SITE CONTENT — the only file you need to edit.
 *
 *  The file is split into two clearly separated parts:
 *
 *   PART A — VERBATIM FACTS
 *     Job titles, dates, numbers, education, awards, thesis, bio paragraphs.
 *     Carried over character for character from the original index.html.
 *
 *   PART B — NEW COPY (drafted, please review)
 *     Everything written for the redesign: the TEST bench write-ups, the
 *     "where this leads" sentence, the plain-language state glosses, the
 *     glossary, widget labels and micro-survey questions. Every sentence in
 *     Part B is a draft you can edit or delete freely.
 *
 *  Components read from these arrays and adapt to however many items exist,
 *  so adding, removing or rewording entries never touches animation code.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/* ╔═══════════════════════════════════════════════════════════════════════╗
   ║  PART A — VERBATIM FACTS                                              ║
   ╚═══════════════════════════════════════════════════════════════════════╝ */

export const meta = {
  name: "Sanha Manocha",
  title: "Sanha Manocha — Field notes on people, prices, and product",
  description:
    "Consumer & market insights researcher, behavioural economist, and part-time builder of small useful tools. Field notes from Sanha Manocha.",
  siteUrl: "https://sanhamanocha.com",
  footer: "Sanha Manocha — last updated 2026.",
};

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
};

/** The bio, verbatim. A third, new paragraph is appended from Part B. */
export const bioParagraphs = [
  "I run end-to-end qualitative and quantitative research for a D2C beauty and personal care brand — everything from early concept work through to how a product actually performs after it launches. I work directly with category heads and the C-suite to shape product and brand decisions, and I'm comfortable owning a study from design through fieldwork, moderation, analysis, and the final stakeholder presentation.",
  "My background is in behavioural economics (MSc, Erasmus University Rotterdam), with project experience across the Netherlands and India before that. What ties it together is a fairly stubborn curiosity: I want to know why people do what they do, and I'd rather build a small tool to test a theory than just write a slide about it.",
];

export const role = {
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
};

export const pathLede =
  "Before consumer insights, a few years of learning how behavioural ideas hold up outside a classroom — and one year in operations that taught me what it means for a number to actually have to be right.";

export const pathEntries = [
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
];

export const education = [
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
];

export const toolkit = [
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
    items: ["Tally", "Qualtrics", "SQL", "Power BI", "Tableau", "Excel", "Claude Code", "Atlas.ti", "PowerPoint"],
  },
  {
    label: "languages",
    items: ["English — advanced", "Hindi — native", "Punjabi — native"],
  },
];

export const recognition = [
  { name: "\"AI Ka Akhada\" Award", org: "Heavenly Secrets" },
  { name: "Star of the Month", org: "J.P. Morgan" },
  { name: "Dean's List", org: "Baldwin Wallace University" },
  { name: "Merit Scholarship", org: "Christ University" },
  { name: "Google Data Analytics Professional Certificate — Level 2", org: "Google" },
  { name: "CISI Merit Certification — 49/50", org: "CISI" },
  { name: "IELTS — 8.0", org: "IELTS" },
];

export const writingNote = [
  "I'm starting to write in public — not as a research analyst, but closer to an anthropologist who happens to also run consumer studies for a living. The plan is simple: pick something about how people actually live, learn it properly, and only then write about it.",
  "This section will hold that writing as it goes up — starting on Substack, mirrored here. Nothing published yet. Check back soon.",
];

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

/* ╔═══════════════════════════════════════════════════════════════════════╗
   ║  PART B — NEW COPY (drafted for the redesign — please review)         ║
   ║  Nothing below this line is quoted from the original site.            ║
   ╚═══════════════════════════════════════════════════════════════════════╝ */

/** The three states of a research mind. `gloss` is the plain-language line. */
export const states = {
  notice: { word: "Notice", number: "01", gloss: "watching how people actually behave, and asking why" },
  question: { word: "Question", number: "02", gloss: "checking it properly, at scale, with numbers" },
  test: { word: "Test", number: "03", gloss: "trying small things to find out faster" },
} as const;

export const nav = [
  { label: "Notice", href: "/#notice" },
  { label: "Field notes", href: "/notes" },
  { label: "Question", href: "/#question" },
  { label: "Test", href: "/#test" },
  { label: "Connect", href: "/#connect" },
];

/** NEW — the closing sentence of the bio. Appended as the third paragraph. */
export const whereThisLeads =
  "Research is the thing I do and want to keep doing; I'm still working out exactly where it leads.";

/**
 * Phrases in the bio that get a highlighter stroke and a margin code.
 * Phrases must match the paragraph text exactly or they're simply skipped.
 * `code` labels are annotation labels, not facts — edit freely.
 */
export const noticeHighlights = [
  { phrase: "end-to-end qualitative and quantitative research", code: "METHOD" },
  { phrase: "category heads and the C-suite", code: "AUDIENCE" },
  { phrase: "design through fieldwork, moderation, analysis, and the final stakeholder presentation", code: "SCOPE" },
  { phrase: "behavioural economics", code: "TRAINING" },
  { phrase: "why people do what they do", code: "MOTIVE" },
  { phrase: "build a small tool to test a theory", code: "INSTRUMENT" },
  { phrase: "still working out exactly where it leads", code: "OPEN" },
];

/** Plain-language meaning of each margin code, shown on hover/tap. */
export const codeGloss: Record<string, string> = {
  METHOD: "how the observation was gathered",
  AUDIENCE: "who the work is for",
  SCOPE: "how much of the study I own",
  TRAINING: "where the way of thinking comes from",
  MOTIVE: "the question underneath everything",
  INSTRUMENT: "a tool is a means, not the point",
  OPEN: "an honest unknown, left open on purpose",
};

/**
 * Glossary: research terms that appear in the verbatim text, with a one-line
 * plain gloss. Terms are matched exactly (case-sensitive) inside paragraphs.
 */
export const glossary: Record<string, string> = {
  "D2C": "direct-to-consumer: a brand that sells to people online rather than through shops",
  "IDIs": "in-depth interviews, one person at a time",
  "FGDs": "focus group discussions: a small group talking about a topic together",
  "in-home visits": "watching how a product is actually used where people live",
  "concept-evolution calls": "sessions where an early product idea is reworked with the people who own it",
  "U&A": "usage and attitude study: who uses a category, how, and what they think of it",
  "concept and claims tests": "checking whether a product idea, and what it promises, lands with people",
  "barrier and lapser studies": "why people don't buy, and why people who did stopped",
  "brand tracking": "measuring what people think of a brand, repeatedly over time",
  "conjoint and pricing research": "working out what people value and what they'll pay, from their choices",
  "Van Westendorp": "a method for finding the price range people consider acceptable",
  "Gabor-Granger": "a method for finding how likely people are to buy at different prices",
  "head-to-head testing": "putting two products in front of the same people and asking which wins",
  "no significant lift": "the improvement was too small to be sure it was real",
  "voice-of-consumer": "what customers are saying, gathered and passed on",
  "thematic coding": "sorting what people said into recurring themes",
  "randomised controlled trial": "people are randomly split into groups so differences can be trusted",
  "A/B testing": "showing two versions to different people to see which performs better",
  "OTC derivatives": "financial contracts traded directly between two parties rather than on an exchange",
  "Qualtrics": "a survey platform",
  "Power BI": "a dashboard and reporting tool",
  "Alteryx": "a tool for automating data preparation",
  "Atlas.ti": "software for coding interview transcripts",
};

/**
 * QUESTION panel. Each group is lit by one of the Pilgrim role points (`point`
 * is the 0-based index into role.points). Counts and labels come only from
 * what those points say. Kinds:
 *   count   — N unit marks + a numeral (N must be stated in the text)
 *   legend  — a list of named items, no counts
 *   pair    — two named items side by side
 *   flat    — two equal bars: a comparison that found no difference
 *   cadence — a rhythm label, no count implied
 *   xref    — cross-references to the TEST bench
 */
export type PanelGroup =
  | { id: string; point: number; kind: "count"; label: string; count: number; suffix: string }
  | { id: string; point: number; kind: "legend"; label: string; items: string[] }
  | { id: string; point: number; kind: "pair"; label: string; items: [string, string] }
  | { id: string; point: number; kind: "flat"; label: string; items: [string, string] }
  | { id: string; point: number; kind: "cadence"; label: string; items: { name: string; rhythm: "monthly" | "weekly" }[] }
  | { id: string; point: number; kind: "xref"; label: string; items: { name: string; bench: string }[] };

export const questionPanel: PanelGroup[] = [
  { id: "categories", point: 0, kind: "count", label: "categories in the portfolio", count: 10, suffix: "+" },
  {
    id: "qual",
    point: 1,
    kind: "legend",
    label: "qualitative methods",
    items: ["IDIs", "FGDs", "in-home visits", "concept-evolution calls"],
  },
  { id: "studies", point: 2, kind: "count", label: "quantitative studies a year", count: 40, suffix: "+" },
  {
    id: "quant",
    point: 2,
    kind: "legend",
    label: "quantitative methods",
    items: [
      "U&A",
      "concept and claims tests",
      "barrier and lapser studies",
      "brand tracking",
      "conjoint and pricing research",
      "Van Westendorp",
      "Gabor-Granger",
    ],
  },
  {
    id: "gates",
    point: 3,
    kind: "pair",
    label: "launches gated on head-to-head tests",
    items: ["a reformulated hair-fall shampoo", "a new hair-colour range"],
  },
  {
    id: "lift",
    point: 4,
    kind: "flat",
    label: "costlier serum reformulation",
    items: ["existing", "reformulated"],
  },
  {
    id: "cadence",
    point: 5,
    kind: "cadence",
    label: "keeping leadership close to the consumer",
    items: [
      { name: "\"Goonj\" voice-of-consumer briefing", rhythm: "monthly" },
      { name: "working session with the CMO", rhythm: "weekly" },
    ],
  },
  {
    id: "audience",
    point: 5,
    kind: "legend",
    label: "briefing audience",
    items: ["CEO", "Co-founders", "CMO", "CFO"],
  },
  {
    id: "tools",
    point: 6,
    kind: "xref",
    label: "built out of curiosity",
    items: [
      { name: "real-time product-feedback dashboard", bench: "feed" },
      { name: "in-house survey platform", bench: "platform" },
    ],
  },
];

/** Labels used around the QUESTION section. */
export const questionLabels = {
  panelTitle: "the role, plotted",
  panelHint: "every mark here is a number or a name from the statements on the right",
  provenanceTitle: "where the rigour came from",
  instruments: "instruments",
  onRecord: "on the record",
  training: "training",
};

/* ── TEST bench ─────────────────────────────────────────────────────────── */

export type Bench = {
  /** stable id; also used by the QUESTION panel's cross-references */
  id: "feed" | "wheel" | "delight" | "screen" | "platform";
  number: string;
  title: string;
  status: string;
  /** the three lab-entry fields — leave any empty string to hide it */
  itch: string;
  tried: string;
  happened: string;
  /** small caption under the interactive miniature */
  caption: string;
};

export const benchLabels = {
  itch: "the itch",
  tried: "what I tried",
  happened: "what happened",
  lede: "Curiosity-driven experiments. Each one exists because a research question was waiting on a tool that didn't exist yet, or was too slow.",
  illustration: "Illustration with abstract marks. Not real data.",
};

export const bench: Bench[] = [
  {
    id: "feed",
    number: "01",
    title: "A feedback loop that doesn't wait for the quarter",
    status: "running",
    itch: "Quarterly reports told me what customers thought three months ago. I wanted to know what they thought this morning.",
    tried:
      "An automated dashboard that pulls incoming customer feedback through an API and analyses it live, instead of waiting for the next report.",
    happened:
      "The loop got shorter. Feedback is read as it arrives rather than batched into a quarterly retrospective, which is the only reason it was built.",
    caption: "Toggle between reading feedback as it arrives and reading it once a quarter.",
  },
  {
    id: "wheel",
    number: "02",
    title: "A survey question no survey tool could ask",
    status: "built and used",
    itch:
      "I needed people to pick a packaging colour. Every survey tool I tried, including the category-standard ones, could only offer a fixed list of swatches.",
    tried:
      "I designed the interaction myself: a colour wheel respondents can move around freely, and a data pipeline that writes each pick straight into Google Sheets. Both had to be worked out from scratch.",
    happened:
      "People could express a preference directly rather than choose the nearest approximation, and every response landed in a sheet ready for analysis.",
    caption: "Drag on the wheel. Each pick lands in the sheet row below, the way a respondent's would.",
  },
  {
    id: "delight",
    number: "03",
    title: "Making a survey feel less like a survey",
    status: "past experiment",
    itch: "Unincentivised respondents lose patience fast. Most surveys give them no reason to stay.",
    tried:
      "An exploration into making surveys feel like a small, enjoyable interaction rather than a piece of research: animation, light gamification, and small moments of delight such as confetti on completion.",
    happened:
      "It was a pattern study rather than a product: a set of small interaction ideas for holding attention when nobody is being paid to give it.",
    caption: "Three questions about this page. See how it feels to finish one.",
  },
  {
    id: "screen",
    number: "04",
    title: "Screening concepts with a borrowed persona",
    status: "experiment",
    itch:
      "Early-stage concept lists are long and fieldwork budget is finite. Testing fifteen ideas properly costs as much as testing five.",
    tried:
      "An LLM primed with a consumer persona, demographics and context included, generated synthetic responses to early-stage concepts. I tested those against real respondent data.",
    happened:
      "The gap was surprisingly small. Not small enough to replace real qualitative research, and never meant to. It is a way to narrow a large set, say fifteen concepts down to five, before spending real fieldwork budget on the ones that survive.",
    caption: "Run the screen. Fifteen abstract concepts, two readings of each, five survive.",
  },
  {
    id: "platform",
    number: "05",
    title: "A survey platform, from scratch",
    status: "in progress",
    itch: "",
    tried: "Currently building a survey platform from scratch.",
    happened: "",
    caption: "In progress. More when there is more to say.",
  },
];

/** Bench 03 — the micro survey a visitor can complete. */
export const delightSurvey = {
  questions: [
    { q: "Which state are you in right now?", options: ["noticing", "questioning", "testing"] },
    {
      q: "How long do you usually last in an online survey?",
      options: ["under a minute", "a few minutes", "as long as it takes", "I close it immediately"],
    },
    { q: "How did this one feel?", options: ["like a survey", "like a small game", "hard to say"] },
  ],
  start: "begin",
  next: "next",
  finish: "finish",
  done: "Done.",
  doneDetail: (seconds: number) => `That took ${seconds} second${seconds === 1 ? "" : "s"}.`,
  again: "again",
};

/** Bench 01 — labels for the feed miniature. */
export const feedLabels = {
  live: "as it arrives",
  quarterly: "once a quarter",
  read: "read",
  waiting: "waiting for the quarter",
  received: "received",
};

/** Bench 04 — labels for the screening miniature. */
export const screenLabels = {
  run: "run the screen",
  reset: "reset",
  synthetic: "synthetic",
  real: "real",
  shortlist: "shortlist",
  concepts: 15,
  keep: 5,
};

/** Bench 02 — sheet column headers for the colour miniature. */
export const wheelLabels = {
  columns: ["timestamp", "hex", "hue", "sat", "val"],
  hint: "drag on the wheel, or use the sliders",
  hue: "hue",
  saturation: "saturation",
  value: "brightness",
};

/* ── Field notes ─────────────────────────────────────────────────────────── */

export type Post = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  excerpt: string;
  /** canonical URL (e.g. Substack) */
  href?: string;
  source?: string;
  /** optional full text, one string per paragraph → gets /notes/<slug> */
  body?: string[];
};

export const writing = {
  id: "writing",
  code: "ix",
  tag: "a work in progress",
  heading: "Field notes",
  bridge: "Curiosity, applied with rigour. This is where noticing and questioning meet.",
  note: writingNote,
  /**
   * Add posts here. Example:
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

/**
 * Hero fragments — short quotations lifted from the text on this page. Each
 * sorts into one of the three states. Keep them short; they're drawn on a canvas.
 */
export const heroFragments: { text: string; code: "notice" | "question" | "test" }[] = [
  { text: "why people buy", code: "notice" },
  { text: "believe, and behave", code: "notice" },
  { text: "why people do what they do", code: "notice" },
  { text: "a fairly stubborn curiosity", code: "notice" },
  { text: "how people actually live", code: "notice" },
  { text: "human understanding", code: "notice" },
  { text: "in-home visits", code: "notice" },
  { text: "IDIs", code: "notice" },
  { text: "FGDs", code: "notice" },
  { text: "an anthropologist", code: "notice" },
  { text: "learn it properly", code: "notice" },
  { text: "voice-of-consumer", code: "notice" },
  { text: "fairness", code: "notice" },
  { text: "price transparency", code: "notice" },
  { text: "framing and visuals", code: "notice" },
  { text: "where it leads", code: "notice" },
  { text: "40+ quantitative studies a year", code: "question" },
  { text: "10+ category D2C beauty portfolio", code: "question" },
  { text: "U&A", code: "question" },
  { text: "concept and claims tests", code: "question" },
  { text: "barrier and lapser studies", code: "question" },
  { text: "brand tracking", code: "question" },
  { text: "conjoint", code: "question" },
  { text: "Van Westendorp", code: "question" },
  { text: "Gabor-Granger", code: "question" },
  { text: "head-to-head testing", code: "question" },
  { text: "no significant lift", code: "question" },
  { text: "n=78", code: "question" },
  { text: "35%", code: "question" },
  { text: "7 regions", code: "question" },
  { text: "99% accuracy", code: "question" },
  { text: "randomised controlled trial", code: "question" },
  { text: "thematic coding", code: "question" },
  { text: "significance testing", code: "question" },
  { text: "beating the incumbent", code: "question" },
  { text: "Goonj", code: "question" },
  { text: "a working prototype", code: "test" },
  { text: "a small tool to test a theory", code: "test" },
  { text: "feedback as it arrives", code: "test" },
  { text: "a colour wheel", code: "test" },
  { text: "straight into Google Sheets", code: "test" },
  { text: "confetti on completion", code: "test" },
  { text: "light gamification", code: "test" },
  { text: "a borrowed persona", code: "test" },
  { text: "synthetic responses", code: "test" },
  { text: "fifteen down to five", code: "test" },
  { text: "from scratch", code: "test" },
  { text: "real-time product-feedback dashboard", code: "test" },
  { text: "in-house survey platform", code: "test" },
  { text: "A/B testing framework", code: "test" },
  { text: "gamified app interventions", code: "test" },
  { text: "peer-comparison tool", code: "test" },
];
