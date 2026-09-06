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
  title: "Sanha Manocha",
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
  /** used only to draw the bar on the time axis */
  from: "2025-11",
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
    /** approximate months, used only to draw the bar on the time axis; `meta` is what's displayed */
    plot: { from: "2022-09", to: "2024-08" },
  },
  {
    degree: "Exchange Program",
    school: "Baldwin Wallace University, USA",
    meta: "Spring 2020 · 9/10",
    thesis: null,
    plot: { from: "2020-01", to: "2020-05" },
  },
  {
    degree: "BCom Finance and Investment",
    school: "Christ University, Bangalore, India",
    meta: "2018 — 2021 · 9/10",
    thesis: null,
    plot: { from: "2018-07", to: "2021-06" },
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
    items: ["Tally", "Qualtrics", "SQL", "Power BI", "Tableau", "Excel", "Atlas.ti", "PowerPoint"],
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

/** Hero. Final approved copy. */
export const hero = {
  eyebrow: "i. an opening note",
  headline:
    "I'm a curious person. I want to understand why people do what they do, and I'm always learning something new to get there.",
  sub: "Consumer insights researcher. Behavioural economics by training. Compulsive learner by nature.",
  facts: heroFacts,
};

/** Standalone personal line above the professional summary. No tags. */
export const heroPersonal = "I love noticing people, whether it's in a consumer interview or people-watching on vacation.";

/**
 * The professional summary line. Keywords in [[double brackets]] drift across
 * the opening screen and fly into their places here. The sentences render as
 * one paragraph; `code` only decides how each sentence's tags are marked.
 */
export const heroSummary: { code: "notice" | "question" | "test"; text: string }[] = [
  {
    code: "question",
    text: "I run consumer research: [[40+ studies a year]] across [[a 10+ category portfolio]], from [[in-depth interviews]] to [[pricing research]].",
  },
  {
    code: "test",
    text: "When the right tool doesn't exist, I build one: [[a colour wheel]], [[feedback as it arrives]], [[an LLM persona]], [[a survey platform from scratch]].",
  },
];

/** One line above the summary, explaining what the reader is looking at. */
export const heroNote = "This page is laid out like my field notes: what I notice, what I question, what I test.";

/**
 * Extra fragments that drift in the opening field but don't make it into the
 * summary. Each one is a phrase that appears verbatim in Part A.
 */
export const heroExtras: { text: string; code: "notice" | "question" | "test" }[] = [
  { text: "IDIs", code: "notice" },
  { text: "FGDs", code: "notice" },
  { text: "in-home visits", code: "notice" },
  { text: "concept-evolution calls", code: "notice" },
  { text: "voice-of-consumer", code: "notice" },
  { text: "thematic coding", code: "notice" },
  { text: "U&A", code: "question" },
  { text: "concept and claims tests", code: "question" },
  { text: "barrier and lapser studies", code: "question" },
  { text: "brand tracking", code: "question" },
  { text: "conjoint and pricing research", code: "question" },
  { text: "Van Westendorp", code: "question" },
  { text: "Gabor-Granger", code: "question" },
  { text: "head-to-head testing", code: "question" },
  { text: "no significant lift", code: "question" },
  { text: "randomised controlled trial", code: "question" },
  { text: "significance testing", code: "question" },
  { text: "competitive benchmarking", code: "question" },
  { text: "A/B testing", code: "test" },
  { text: "real-time product-feedback dashboard", code: "test" },
  { text: "in-house survey platform", code: "test" },
  { text: "post-launch iteration", code: "test" },
];

export const states = {
  notice: { word: "Notice", number: "01", gloss: "I notice things about people that they don't say out loud." },
  question: { word: "Question", number: "02", gloss: "I ask questions properly: quant for scale, qual for depth." },
  test: { word: "Test", number: "03", gloss: "I experiment. If a new method or tool gets me closer to an answer, I try it." },
} as const;

export const nav = [
  { label: "Notice", href: "/#notice" },
  { label: "Question", href: "/#question" },
  { label: "Test", href: "/#test" },
  { label: "Connect", href: "/#connect" },
];

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
];

/**
 * Highlights for the QUESTION statements: index = role.points index.
 * Same rules as noticeHighlights (exact phrase, or it is skipped).
 */
export const roleHighlights: { phrase: string; code: string }[][] = [
  [
    { phrase: "10+ category D2C beauty portfolio", code: "SCALE" },
    { phrase: "post-launch iteration", code: "LOOP" },
  ],
  [
    { phrase: "IDIs, FGDs, in-home visits", code: "QUAL" },
    { phrase: "turn human understanding into product concepts", code: "SYNTHESIS" },
  ],
  [
    { phrase: "40+ quantitative studies a year", code: "QUANT" },
    { phrase: "custom-built approaches when the question demands it", code: "CUSTOM" },
  ],
  [
    { phrase: "head-to-head testing against category leaders", code: "GATE" },
    { phrase: "only launched after beating the incumbent", code: "EVIDENCE" },
  ],
  [
    { phrase: "commercial trade-offs for leadership rather than just data", code: "JUDGEMENT" },
    { phrase: "no significant lift", code: "HONESTY" },
  ],
  [
    { phrase: "monthly voice-of-consumer briefing", code: "CADENCE" },
    { phrase: "weekly working session with the CMO", code: "CADENCE" },
  ],
  [
    { phrase: "out of curiosity", code: "CURIOSITY" },
    { phrase: "ongoing experiments with emerging techniques", code: "EXPERIMENT" },
  ],
];

/** Highlights for the earlier-role summaries: index = pathEntries index. */
export const pathHighlights: { phrase: string; code: string }[][] = [
  [
    { phrase: "across 7 regions", code: "SCALE" },
    { phrase: "Projected a 150% engagement lift", code: "RESULT" },
  ],
  [
    { phrase: "gamified app interventions", code: "NUDGE" },
    { phrase: "A/B testing framework", code: "METHOD" },
  ],
  [
    { phrase: "randomised controlled trial (n=78)", code: "METHOD" },
    { phrase: "improving optimal scheme selection by 35%", code: "RESULT" },
  ],
  [
    { phrase: "99% accuracy", code: "RIGOUR" },
    { phrase: "saving 250+ hours a year", code: "AUTOMATION" },
  ],
];

/** Plain-language meaning of each margin code, shown on hover or tap. */
export const codeGloss: Record<string, string> = {
  SCALE: "how much ground the work covers",
  LOOP: "the study doesn't end at launch",
  QUAL: "talking to people and watching them, not just counting them",
  QUANT: "counting them too, properly",
  SYNTHESIS: "many conversations, one clear idea",
  CUSTOM: "when the standard method doesn't fit the question, make one",
  GATE: "nothing ships until it wins a fair fight",
  EVIDENCE: "the decision followed the data, not the other way round",
  JUDGEMENT: "a finding is only useful once it becomes a trade-off",
  HONESTY: "saying 'no difference' when there is no difference",
  CADENCE: "a fixed rhythm keeps the consumer in the room",
  CURIOSITY: "no one asked. I wanted to know.",
  EXPERIMENT: "try it small, see what happens, decide from there.",
  RESULT: "what actually changed",
  NUDGE: "small changes to how a choice is presented",
  RIGOUR: "the number has to be right, every time",
  AUTOMATION: "the machine does the repetitive part. I keep the interesting one.",
  ITCH: "the thing that bothered me enough to start",
  BUILD: "what I actually made",
  CAVEAT: "what this is not",
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
  instruments: "instruments",
  onRecord: "on the record",
  training: "training",
  earlierPath: "earlier path",
  now: "now",
};

/** The story under "where the rigour came from". Final approved copy. */
export const pathLede =
  "A year at J.P. Morgan, in investment banking, made me comfortable with numbers. I lived in Excel and got properly good at quantitative analysis. What I actually wanted was the why behind decisions, not just the numbers. That's what took me to the Netherlands, for a master's in behavioural economics, then into consulting work across the country. I still love numbers. I just love understanding people more.";
export const pathLedeHighlights = [
  { phrase: "comfortable with numbers", code: "RIGOUR" },
  { phrase: "the why behind decisions", code: "CURIOSITY" },
  { phrase: "behavioural economics", code: "TRAINING" },
];

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
  /** phrases inside why/did/result that get the highlighter + a tag */
  highlights: { phrase: string; code: string }[];
};

export const benchLabels = {
  why: "why",
  did: "what I did",
  result: "what came of it",
  lede: "Small experiments, all built single-handedly. Every one started the same way: I got curious about whether something could work, and the tool I needed either didn't exist or was too slow.",
  illustration: "Illustration with abstract marks. Not real data.",
};

export const bench: Bench[] = [
  {
    id: "feed",
    number: "01",
    title: "Reading feedback as it comes in",
    status: "running",
    why: "Product feedback used to mean writing a questionnaire, fielding it, waiting for enough responses, then crunching numbers into a report.",
    did: "A live dashboard that updates as responses come in. Top box, bottom box, NPS, every question calculated automatically, with open-ended comments sorted into themes. Hosted, so anyone at the company can check how a product is doing at any moment.",
    result: "No waiting for a report. A response counts the moment it arrives.",
    caption: "Switch between reading feedback as it arrives and reading it once a quarter.",
    highlights: [
      { phrase: "waiting for enough responses", code: "ITCH" },
      { phrase: "updates as responses come in", code: "BUILD" },
      { phrase: "counts the moment it arrives", code: "RESULT" },
    ],
  },
  {
    id: "wheel",
    number: "02",
    title: "A colour question no survey tool could ask",
    status: "built and used",
    why: "We needed people to pick a packaging colour. Every survey tool we tried only offered a fixed list of swatches.",
    did: "I built the question myself: a colour wheel people can move around freely, feeding straight into a Google Sheet.",
    result: "People could show the exact colour they meant, and the data was ready to analyse immediately.",
    caption: "Drag on the wheel. Each pick lands in the sheet row below, the way a respondent's would.",
    highlights: [
      { phrase: "only offered a fixed list of swatches", code: "ITCH" },
      { phrase: "a colour wheel people can move around freely", code: "BUILD" },
      { phrase: "the exact colour they meant", code: "RESULT" },
    ],
  },
  {
    id: "delight",
    number: "03",
    title: "Surveys people actually finish",
    status: "past experiment",
    why: "Respondents aren't paid to fill these out, but most surveys ask as if they are.",
    did: "I explored making a survey feel like an interaction, not a chore: animation, light gamification, confetti at the end.",
    result: "A set of patterns for holding attention when no one's being paid to give it.",
    caption: "Three questions about this page. Try finishing one.",
    highlights: [
      { phrase: "aren't paid to fill these out", code: "ITCH" },
      { phrase: "confetti at the end", code: "BUILD" },
      { phrase: "holding attention when no one's being paid to give it", code: "RESULT" },
    ],
  },
  {
    id: "screen",
    number: "04",
    title: "Screening concepts with a synthetic persona",
    status: "experiment",
    why: "Real fieldwork costs money, so out of fifteen concepts, only a handful ever get tested. Right now, deciding which ones make the cut comes down to gut feel.",
    did: "I built a pipeline where an AI plays a real consumer persona and answers in its own words, not a number. I score that answer against reference statements, then validate the whole thing against real Pilgrim survey results, checking every step along the way so a hidden bug can't quietly skew things.",
    result: "A way to narrow fifteen concepts to five with something more than instinct, before real fieldwork budget goes anywhere.",
    caption: "Run the screen. Fifteen abstract concepts, two readings of each, five survive.",
    highlights: [
      { phrase: "comes down to gut feel", code: "ITCH" },
      { phrase: "an AI plays a real consumer persona", code: "BUILD" },
      { phrase: "something more than instinct", code: "RESULT" },
    ],
  },
  {
    id: "platform",
    number: "05",
    title: "A survey platform, from scratch",
    status: "in progress",
    why: "",
    did: "Building a survey platform from scratch. In progress; more when there's more to show.",
    result: "",
    caption: "In progress.",
    highlights: [{ phrase: "from scratch", code: "BUILD" }],
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

/** Connect. Final approved copy. */
export const connectText = "I love talking to new people, would love to connect and have a chat :)";
export const connectHighlights = [{ phrase: "talking to new people", code: "CURIOSITY" }];

/** Footer credit line. */
export const colophon = "Designed and built by me.";

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
