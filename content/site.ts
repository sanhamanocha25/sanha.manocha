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

export const heroFacts = [
  { label: "Based in", value: "India" },
  { label: "Currently", value: "Consumer & Market Insights Executive, Pilgrim" },
  { label: "Trained at", value: "Erasmus University Rotterdam" },
];

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
    /** plotted on the time axis at year resolution (the years stated in `meta`) */
    years: [2022, 2024] as [number, number],
  },
  {
    degree: "Exchange Program",
    school: "Baldwin Wallace University, USA",
    meta: "Spring 2020 · 9/10",
    thesis: null,
    years: null,
  },
  {
    degree: "BCom Finance and Investment",
    school: "Christ University, Bangalore, India",
    meta: "2018 — 2021 · 9/10",
    thesis: null,
    years: null,
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
  "Nothing published yet. Writing will go up on Substack and be mirrored here.",
];

export const connect = {
  id: "connect",
  code: "x",
  tag: "get in touch",
  heading: "Connect",
  links: [
    { label: "sanha.manocha@yahoo.com", href: "mailto:sanha.manocha@yahoo.com", external: false },
    { label: "linkedin.com/in/sanha-manocha", href: "https://linkedin.com/in/sanha-manocha", external: true },
  ],
};

/* ╔═══════════════════════════════════════════════════════════════════════╗
   ║  PART B — NEW COPY (drafted for the redesign — please review)         ║
   ║  Nothing below this line is quoted from the original site.            ║
   ╚═══════════════════════════════════════════════════════════════════════╝ */

/** Hero. Rewritten; edit freely. */
export const hero = {
  eyebrow: "i. an opening note",
  headline:
    "I'm a curious person. I study why people buy, believe and behave the way they do, and I keep experimenting with new ways to ask.",
  sub:
    "Consumer and market insights researcher. Behavioural economist by training. Constant learner by temperament: if there is a new method, tool or idea, I want to try it. Most weeks that means qualitative and quantitative research for a D2C beauty brand, plus small experiments, built with Claude Code, in how research itself could work better.",
  facts: heroFacts,
};

/**
 * The hero summary. Keywords drift across the opening screen, then fly into
 * their places in these sentences. Wrap a keyword in [[double brackets]] to
 * make it a tag; each sentence belongs to one state, which decides how its
 * tags are marked. Keep tags short; they are drawn on a canvas first.
 */
export const heroSummary: { code: "notice" | "question" | "test"; text: string }[] = [
  {
    code: "notice",
    text: "I want to know [[why people buy]] and [[why they believe what they believe]], so I go and look: [[in-home visits]], [[in-depth interviews]], [[focus groups]], watching [[how people actually live]].",
  },
  {
    code: "question",
    text: "Then I check it properly: [[40+ quantitative studies a year]] across [[a 10+ category portfolio]], from [[usage and attitude studies]] and [[brand tracking]] to [[conjoint and pricing research]], and I say so when there is [[no significant lift]].",
  },
  {
    code: "test",
    text: "And when the right tool doesn't exist, I try something: [[a colour wheel instead of a swatch list]], [[feedback read as it arrives]], [[an LLM primed with a consumer persona]], [[a survey platform, from scratch]]. Most of it built with Claude Code.",
  },
];

/** One line above the summary, explaining what the reader is looking at. */
export const heroNote =
  "This site is laid out like my field notes: what I notice, what I question, what I test. The tags are the highlights.";

/**
 * Extra fragments that drift in the opening field but don't make it into the
 * summary. They fade as the sort happens, the way most observations do.
 */
export const heroExtras: { text: string; code: "notice" | "question" | "test" }[] = [
  { text: "a stubborn curiosity", code: "notice" },
  { text: "price transparency and fairness", code: "notice" },
  { text: "how framing changes a choice", code: "notice" },
  { text: "what customers are actually saying", code: "notice" },
  { text: "an anthropologist's habit of watching", code: "notice" },
  { text: "concept and claims tests", code: "question" },
  { text: "barrier and lapser studies", code: "question" },
  { text: "Van Westendorp", code: "question" },
  { text: "Gabor-Granger", code: "question" },
  { text: "head-to-head against the category leader", code: "question" },
  { text: "a randomised controlled trial, n=78", code: "question" },
  { text: "research across 7 regions", code: "question" },
  { text: "99% accuracy on ₹375Cr+ a month", code: "question" },
  { text: "thematic coding", code: "question" },
  { text: "a monthly briefing to the CEO and CMO", code: "question" },
  { text: "confetti when the survey ends", code: "test" },
  { text: "fifteen concepts screened down to five", code: "test" },
  { text: "an A/B testing framework", code: "test" },
  { text: "gamified app interventions", code: "test" },
  { text: "a peer-comparison tool", code: "test" },
  { text: "automating the tedious parts", code: "test" },
];

/** The three states of a research mind. `gloss` is the plain-language line. */
export const states = {
  notice: {
    word: "Notice",
    number: "01",
    gloss: "I pay attention to how people actually behave, and I want to know why.",
  },
  question: {
    word: "Question",
    number: "02",
    gloss: "Then I check it properly. Interviews, focus groups, surveys, pricing studies: qualitative and quantitative, both.",
  },
  test: {
    word: "Test",
    number: "03",
    gloss: "And when the right tool doesn't exist, I build a rough one with Claude Code and try it. That part is fun.",
  },
} as const;

export const nav = [
  { label: "Notice", href: "/#notice" },
  { label: "Question", href: "/#question" },
  { label: "Test", href: "/#test" },
  { label: "Field notes", href: "/notes" },
  { label: "Connect", href: "/#connect" },
];

/** NEW: the closing sentence of the bio. Appended as the third paragraph. */
export const whereThisLeads =
  "I like learning new things more than I like being comfortable with old ones. Research is what I want to keep doing. Where exactly it leads, I'm still working out.";

/**
 * Things you are currently curious about or learning. Shown in the NOTICE
 * margin when non-empty. One short phrase per line. Leave empty to hide.
 */
export const currentlyCurious: string[] = [];

/**
 * Phrases in the bio that get a highlighter stroke and a margin code.
 * Phrases must match the paragraph text exactly or they're simply skipped.
 * `code` labels are annotation labels, not facts. Edit freely.
 */
export const noticeHighlights = [
  { phrase: "end-to-end qualitative and quantitative research", code: "METHOD" },
  { phrase: "category heads and the C-suite", code: "AUDIENCE" },
  { phrase: "design through fieldwork, moderation, analysis, and the final stakeholder presentation", code: "SCOPE" },
  { phrase: "behavioural economics", code: "TRAINING" },
  { phrase: "why people do what they do", code: "MOTIVE" },
  { phrase: "build a small tool to test a theory", code: "INSTRUMENT" },
  { phrase: "learning new things", code: "LEARNER" },
  { phrase: "still working out", code: "OPEN" },
];

/** Plain-language meaning of each margin code, shown on hover or tap. */
export const codeGloss: Record<string, string> = {
  METHOD: "how the evidence was gathered",
  AUDIENCE: "who the work is for",
  SCOPE: "how much of a study I own, start to finish",
  TRAINING: "where the way of thinking comes from",
  MOTIVE: "the question under everything else",
  INSTRUMENT: "tools are a means to the question, not the point",
  LEARNER: "new method, new tool, new idea: I want to try it",
  OPEN: "an unknown, left open on purpose",
};

/**
 * Glossary: research terms that appear in the verbatim text, with a one-line
 * plain gloss. Terms are matched exactly (case-sensitive) inside paragraphs.
 */
export const glossary: Record<string, string> = {
  "D2C": "direct-to-consumer: a brand that sells online to people directly, not through shops",
  "IDIs": "in-depth interviews, one person at a time",
  "FGDs": "focus group discussions: a small group talking through a topic together",
  "in-home visits": "watching how a product is actually used where people live",
  "concept-evolution calls": "working sessions where an early product idea is reworked with the people who own it",
  "U&A": "usage and attitude study: who uses a category, how, and what they think of it",
  "concept and claims tests": "checking whether a product idea, and what it promises, lands with people",
  "barrier and lapser studies": "why people don't buy, and why people who did buy stopped",
  "brand tracking": "measuring what people think of a brand, repeatedly, over time",
  "conjoint and pricing research": "working out what people value and what they'll pay from the choices they make",
  "Van Westendorp": "a method for finding the price range people find acceptable",
  "Gabor-Granger": "a method for finding how likely people are to buy at different prices",
  "head-to-head testing": "putting two products in front of the same people and asking which wins",
  "no significant lift": "the improvement was too small to be sure it was real",
  "voice-of-consumer": "what customers are saying, gathered and passed on to the people who decide",
  "thematic coding": "sorting what people said into recurring themes",
  "randomised controlled trial": "people are randomly split into groups, so the difference between groups can be trusted",
  "A/B testing": "showing two versions to different people to see which one does better",
  "OTC derivatives": "financial contracts traded directly between two parties rather than on an exchange",
  "Qualtrics": "a survey platform",
  "Power BI": "a dashboard and reporting tool",
  "Alteryx": "a tool for automating data preparation",
  "Atlas.ti": "software for coding interview transcripts",
};

/**
 * QUESTION panel. Each group is lit by one of the role points (`point` is the
 * 0-based index into role.points). Counts and labels come only from what
 * those points say. Kinds:
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
  panelHint: "every mark here is a number or a name taken from the statements alongside",
  provenanceTitle: "where the rigour came from",
  provenanceNote: "the MSc is plotted by year and the roles by month; everything else is on file below",
  instruments: "instruments",
  onRecord: "on the record",
  training: "training",
  earlierPath: "earlier path",
};

/* ── TEST bench ─────────────────────────────────────────────────────────── */

export type Bench = {
  /** stable id; also used by the QUESTION panel's cross-references */
  id: "feed" | "wheel" | "delight" | "screen" | "platform";
  number: string;
  title: string;
  status: string;
  /** the three lab-entry fields. Leave any one empty to hide it */
  why: string;
  did: string;
  result: string;
  /** small caption under the interactive miniature */
  caption: string;
};

export const benchLabels = {
  why: "why",
  did: "what I did",
  result: "what came of it",
  lede: "Small experiments, built with Claude Code. Every one started the same way: I got curious about whether something could work, and the tool I needed either didn't exist or was too slow.",
  illustration: "Illustration with abstract marks. Not real data.",
};

export const bench: Bench[] = [
  {
    id: "feed",
    number: "01",
    title: "Reading feedback as it comes in",
    status: "running",
    why: "Quarterly research tells you what customers thought a quarter ago. I wanted the loop to be shorter.",
    did: "An automated dashboard that pulls incoming customer feedback through an API and analyses it as it arrives, instead of waiting for the next report.",
    result: "Feedback gets read the day it comes in rather than the month the report is due.",
    caption: "Switch between reading feedback as it arrives and reading it once a quarter.",
  },
  {
    id: "wheel",
    number: "02",
    title: "A colour question no survey tool could ask",
    status: "built and used",
    why: "We needed people to pick a packaging colour. Every survey tool I tried, including the category-standard ones, could only offer a fixed list of swatches.",
    did: "Designed the interaction myself: a colour wheel respondents can move around freely, with each pick written straight into Google Sheets. The interaction design and the data pipeline both had to be worked out from scratch.",
    result: "Respondents could show the colour they meant rather than the nearest swatch, and the data was ready to analyse as it landed.",
    caption: "Drag on the wheel. Each pick lands in the sheet row below, the way a respondent's would.",
  },
  {
    id: "delight",
    number: "03",
    title: "Surveys people actually finish",
    status: "past experiment",
    why: "Unincentivised respondents lose patience quickly, and most surveys give them no reason to stay.",
    did: "Explored what happens when a survey feels less like research and more like a small, enjoyable interaction: animation, light gamification, confetti when you finish.",
    result: "A set of interaction patterns for holding attention when nobody is being paid to give it.",
    caption: "Three questions about this page. Try finishing one.",
  },
  {
    id: "screen",
    number: "04",
    title: "Screening concepts with a synthetic persona",
    status: "experiment",
    why: "Concept lists start long and fieldwork budgets don't. Testing fifteen ideas properly costs the same as testing five.",
    did: "Primed an LLM with a consumer persona, demographics and context included, and had it respond to early-stage concepts. Then compared those responses with real respondent data.",
    result: "The gap was smaller than expected. Small enough to use for early screening, say fifteen concepts down to five, before spending fieldwork budget on the ones that survive. Not a replacement for real qualitative research, and not meant as one.",
    caption: "Run the screen. Fifteen abstract concepts, two readings of each, five survive.",
  },
  {
    id: "platform",
    number: "05",
    title: "A survey platform, from scratch",
    status: "in progress",
    why: "",
    did: "Building a survey platform from scratch. In progress.",
    result: "",
    caption: "In progress. More when there is more to show.",
  },
];

/** Bench 03: the micro survey a visitor can complete. */
export const delightSurvey = {
  intro: "Three questions. No right answers. Nothing is saved.",
  questions: [
    { q: "Which of the three are you in right now?", options: ["noticing", "questioning", "testing"] },
    {
      q: "How long do you usually last in an online survey?",
      options: ["under a minute", "a few minutes", "as long as it takes", "I close it straight away"],
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

/** Bench 01: labels for the feed miniature. */
export const feedLabels = {
  live: "as it arrives",
  quarterly: "once a quarter",
  read: "read",
  waiting: "waiting for the quarter",
  received: "received",
};

/** Bench 04: labels for the screening miniature. */
export const screenLabels = {
  run: "run the screen",
  reset: "reset",
  synthetic: "synthetic",
  real: "real",
  shortlist: "shortlist",
  concepts: 15,
  keep: 5,
};

/** Bench 02: sheet column headers for the colour miniature. */
export const wheelLabels = {
  columns: ["timestamp", "hex", "hue", "sat", "val"],
  hint: "drag on the wheel, or use the sliders",
  hue: "hue",
  saturation: "saturation",
  value: "brightness",
};

/** Connect. Edit freely. */
export const connectText =
  "Always glad to talk about consumer behaviour, behavioural economics, or honestly anything under the sun. I like to talk, and I like being surprised by what people know.";

/** Footer credit line. */
export const colophon = "Designed and built by me, with Claude Code.";

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
  /** optional full text, one string per paragraph. Gets its own page at /notes/<slug> */
  body?: string[];
};

export const writing = {
  id: "writing",
  code: "ix",
  tag: "field notes",
  heading: "Field notes",
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
