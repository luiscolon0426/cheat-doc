export type JournalCategory =
  | "Case Study"
  | "Production Lesson"
  | "Decision Note"
  | "Advice";

export type JournalEntry = {
  slug: string;
  category: JournalCategory;
  title: string;
  summary: string;
  context: "Learned in production" | "Used personally" | "Researched" | "Opinion";
  reviewed: string;
  level: "All levels" | "Junior" | "Mid-level" | "Senior";
  tags: string[];
  sections: {
    title: string;
    body: string;
    points?: string[];
  }[];
  related: string[];
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "performance-is-a-user-feature",
    category: "Case Study",
    title: "Performance is a user feature",
    summary: "How profiling and focused frontend changes reduced load time instead of relying on a rewrite.",
    context: "Learned in production",
    reviewed: "July 2026",
    level: "Mid-level",
    tags: ["performance", "frontend", "measurement"],
    sections: [
      {
        title: "The situation",
        body: "A patient-facing application had slow initial experiences that affected usability and retention. The goal was not simply to make a benchmark green; it was to make important screens feel meaningfully faster.",
      },
      {
        title: "How I approached it",
        body: "I traced the critical rendering path and used measurements to find work that delayed useful content.",
        points: [
          "Measured before changing code and kept a repeatable baseline",
          "Reduced unnecessary component work and expensive rendering paths",
          "Prioritized changes users would actually perceive",
          "Released incrementally and compared the result",
        ],
      },
      {
        title: "Result and lesson",
        body: "Focused refactoring reduced load time by roughly 40%. The lasting lesson was that performance work needs a user-centered target, a measurement, and verification after release.",
      },
      {
        title: "What I would watch next",
        body: "Bundle growth, slow-device behavior, long tasks, real-user percentiles, and regressions introduced by later features.",
      },
    ],
    related: ["measure-before-optimizing", "rest-api-vs-graphql"],
  },
  {
    slug: "webhooks-must-assume-retries",
    category: "Case Study",
    title: "Payment webhooks must assume retries",
    summary: "Why signature validation and idempotent processing are both required for safe payments.",
    context: "Learned in production",
    reviewed: "July 2026",
    level: "Mid-level",
    tags: ["payments", "webhooks", "security"],
    sections: [
      {
        title: "The risk",
        body: "Payment providers retry events when acknowledgements are delayed or lost. A valid event can therefore arrive more than once, and blindly repeating business logic can create duplicate side effects.",
      },
      {
        title: "The approach",
        body: "Treat webhook receipt and business processing as separate responsibilities.",
        points: [
          "Verify the provider signature against the raw request body",
          "Persist the provider event identifier under a unique constraint",
          "Acknowledge quickly and process durable work asynchronously",
          "Make every downstream side effect safe to retry",
          "Keep enough event history for support and controlled replay",
        ],
      },
      {
        title: "The lesson",
        body: "Signature validation proves where an event came from; idempotency prevents a legitimate retry from becoming fraud or customer harm. Secure integrations require both.",
      },
    ],
    related: ["retries-need-idempotency", "rest-api-vs-graphql"],
  },
  {
    slug: "real-time-features-need-recovery",
    category: "Case Study",
    title: "Real-time features need a recovery path",
    summary: "What push notifications and WebSockets taught me about delivery, reconnection, and authoritative state.",
    context: "Learned in production",
    reviewed: "July 2026",
    level: "Mid-level",
    tags: ["websockets", "push notifications", "mobile"],
    sections: [
      {
        title: "The misconception",
        body: "Real-time transport can make an experience immediate, but it does not guarantee that every client receives every event exactly once or in order.",
      },
      {
        title: "Designing for reality",
        body: "I learned to treat notifications and socket messages as signals that fresh state exists—not as the only copy of that state.",
        points: [
          "Reconnect with backoff and restore subscriptions",
          "Use event identifiers or versions to detect stale data",
          "Synchronize authoritative state after reconnect or app open",
          "Make notification actions re-check authorization",
          "Measure provider acceptance separately from user delivery",
        ],
      },
      {
        title: "The lesson",
        body: "The reliable design is not the one that never disconnects. It is the one that knows how to recover when disconnection, delay, duplication, and missed events happen.",
      },
    ],
    related: ["retries-need-idempotency", "simple-systems-recover-better"],
  },
  {
    slug: "standardize-the-boring-parts",
    category: "Case Study",
    title: "Standardize the boring parts",
    summary: "How consistent controllers, pagination, and API responses reduce defects and cognitive load.",
    context: "Learned in production",
    reviewed: "July 2026",
    level: "Mid-level",
    tags: ["apis", "standards", "team"],
    sections: [
      {
        title: "The situation",
        body: "When similar endpoints use different response shapes, pagination rules, or error behavior, every client and developer must relearn the same concept.",
      },
      {
        title: "The improvement",
        body: "I helped standardize repeated backend patterns around controllers, pagination, and API responses.",
        points: [
          "Documented a small default instead of creating a large framework",
          "Kept error and metadata shapes predictable",
          "Made page limits and ordering explicit",
          "Allowed exceptions when the use case justified them",
        ],
      },
      {
        title: "The lesson",
        body: "Good standards remove decisions that do not create product value. They should make the common path easier without preventing thoughtful exceptions.",
      },
    ],
    related: ["simple-systems-recover-better", "activity-is-not-impact"],
  },
  {
    slug: "retries-need-idempotency",
    category: "Production Lesson",
    title: "Retries need idempotency",
    summary: "Retrying unsafe work can multiply damage instead of improving reliability.",
    context: "Learned in production",
    reviewed: "July 2026",
    level: "All levels",
    tags: ["reliability", "apis", "queues"],
    sections: [
      {
        title: "What I keep in mind",
        body: "Networks fail and clients retry. Before retrying a write, I ask whether repeating it produces the same result.",
        points: [
          "Use stable idempotency keys for business operations",
          "Enforce uniqueness in durable storage",
          "Return the original result for repeated requests",
          "Use bounded backoff with jitter",
          "Observe retry exhaustion and provide recovery tooling",
        ],
      },
    ],
    related: ["webhooks-must-assume-retries", "simple-systems-recover-better"],
  },
  {
    slug: "measure-before-optimizing",
    category: "Production Lesson",
    title: "Measure before optimizing",
    summary: "Performance work without a baseline often improves the wrong thing.",
    context: "Learned in production",
    reviewed: "July 2026",
    level: "All levels",
    tags: ["performance", "observability"],
    sections: [
      {
        title: "My rule",
        body: "Start with a user-visible symptom and a repeatable measurement. Profile the path, change one meaningful constraint, and compare the result under the same conditions.",
        points: [
          "Prefer percentiles over averages for user latency",
          "Measure production-like devices and data volumes",
          "Watch for shifting cost to another service or stage",
          "Keep regression protection after the improvement",
        ],
      },
    ],
    related: ["performance-is-a-user-feature", "simple-systems-recover-better"],
  },
  {
    slug: "simple-systems-recover-better",
    category: "Production Lesson",
    title: "Simple systems recover better",
    summary: "Complexity appears again during incidents, when the team has the least attention available.",
    context: "Opinion",
    reviewed: "July 2026",
    level: "Senior",
    tags: ["architecture", "reliability"],
    sections: [
      {
        title: "The trade-off",
        body: "Every queue, cache, service, and abstraction can solve a real problem, but each also adds failure modes and operational knowledge.",
        points: [
          "Earn complexity with a demonstrated constraint",
          "Prefer designs responders can understand under pressure",
          "Keep rollback and degradation paths obvious",
          "Remove temporary infrastructure when its job is done",
        ],
      },
    ],
    related: ["measure-before-optimizing", "microservices-or-modular-monolith"],
  },
  {
    slug: "logs-need-context",
    category: "Production Lesson",
    title: "Logs need context to be useful",
    summary: "A message saying “request failed” rarely answers the responder's next question.",
    context: "Used personally",
    reviewed: "July 2026",
    level: "All levels",
    tags: ["observability", "debugging"],
    sections: [
      {
        title: "What useful logs contain",
        body: "Structured events should help correlate a failure without exposing secrets or sensitive personal data.",
        points: [
          "Request, trace, job, and safe tenant identifiers",
          "Operation and result rather than arbitrary prose",
          "Duration, attempt number, dependency, and stable error code",
          "Enough context to connect logs, metrics, and traces",
          "Explicit redaction of tokens, passwords, payments, and health data",
        ],
      },
    ],
    related: ["measure-before-optimizing", "real-time-features-need-recovery"],
  },
  {
    slug: "rest-api-vs-graphql",
    category: "Decision Note",
    title: "REST API or GraphQL?",
    summary: "Choose based on consumers, data shape, operations, and organizational needs—not fashion.",
    context: "Researched",
    reviewed: "July 2026",
    level: "Mid-level",
    tags: ["rest", "graphql", "apis"],
    sections: [
      {
        title: "I lean toward REST when",
        body: "Resources and operations are stable, HTTP caching matters, consumers need simple tooling, and explicit endpoints make authorization and operations easier.",
      },
      {
        title: "I consider GraphQL when",
        body: "Multiple clients need meaningfully different data shapes, the domain benefits from a discoverable typed graph, and the team can operate query complexity, resolver performance, and field-level authorization.",
      },
      {
        title: "The decision",
        body: "Neither removes backend design. I choose the simplest contract that serves actual consumers and that the team can secure, observe, version, and support.",
      },
    ],
    related: ["standardize-the-boring-parts", "microservices-or-modular-monolith"],
  },
  {
    slug: "microservices-or-modular-monolith",
    category: "Decision Note",
    title: "Microservices or a modular monolith?",
    summary: "Independent deployment is valuable only when it outweighs distributed-system cost.",
    context: "Researched",
    reviewed: "July 2026",
    level: "Senior",
    tags: ["architecture", "microservices", "monolith"],
    sections: [
      {
        title: "Start with the constraint",
        body: "A messy codebase does not automatically need network boundaries. First identify whether the real constraint is ownership, deployment, scaling, reliability, or poor internal design.",
      },
      {
        title: "My default",
        body: "I prefer deliberate modules in one deployable system until independent operation has measurable value.",
        points: [
          "Define business-oriented module boundaries",
          "Control dependencies and data ownership",
          "Observe module behavior before extraction",
          "Extract incrementally with compatibility and rollback",
        ],
      },
      {
        title: "When services earn their cost",
        body: "Separate services make more sense when independent teams, scaling profiles, security boundaries, or deployment schedules create enough value to justify network failure, contracts, observability, and operational ownership.",
      },
    ],
    related: ["simple-systems-recover-better", "rest-api-vs-graphql"],
  },
  {
    slug: "sessions-or-jwts",
    category: "Decision Note",
    title: "Server sessions or JWTs?",
    summary: "Token format is less important than lifecycle, trust boundaries, and revocation requirements.",
    context: "Researched",
    reviewed: "July 2026",
    level: "Mid-level",
    tags: ["authentication", "security"],
    sections: [
      {
        title: "Server sessions",
        body: "A secure opaque cookie and server-side session store provide straightforward revocation and are often the simpler choice for first-party web applications.",
      },
      {
        title: "JWT access tokens",
        body: "Signed tokens can help independently operated services validate short-lived claims, but require strict issuer, audience, algorithm, expiry, rotation, and revocation design.",
      },
      {
        title: "My decision rule",
        body: "I do not choose JWTs merely because they are stateless. I start with the trust boundaries, clients, revocation needs, and operational model.",
      },
    ],
    related: ["simple-systems-recover-better", "rest-api-vs-graphql"],
  },
  {
    slug: "debugging-before-frameworks",
    category: "Advice",
    title: "Learn debugging before chasing frameworks",
    summary: "Framework knowledge expires faster than the ability to isolate an incorrect assumption.",
    context: "Opinion",
    reviewed: "July 2026",
    level: "Junior",
    tags: ["debugging", "career"],
    sections: [
      {
        title: "Advice to my younger self",
        body: "Learn to reproduce problems, read stack traces, inspect network requests, use breakpoints, query data, and reduce a system to the smallest failing path.",
        points: [
          "Write down what you expected and what actually happened",
          "Change one variable at a time",
          "Verify boundaries instead of guessing",
          "Keep a record of the root cause and prevention",
        ],
      },
    ],
    related: ["logs-need-context", "ask-questions-earlier"],
  },
  {
    slug: "ask-questions-earlier",
    category: "Advice",
    title: "Ask questions earlier",
    summary: "Hiding uncertainty wastes more time than a well-prepared question.",
    context: "Opinion",
    reviewed: "July 2026",
    level: "Junior",
    tags: ["communication", "career"],
    sections: [
      {
        title: "A useful question includes",
        body: "Share the goal, relevant context, what you expected, what happened, evidence you collected, approaches you tried, and the decision you need help making.",
      },
      {
        title: "The lesson",
        body: "Independent work does not mean silent work. Strong engineers manage uncertainty and involve others before a hidden assumption becomes expensive.",
      },
    ],
    related: ["debugging-before-frameworks", "activity-is-not-impact"],
  },
  {
    slug: "activity-is-not-impact",
    category: "Advice",
    title: "Activity is not impact",
    summary: "More commits, meetings, and complexity do not automatically produce a better outcome.",
    context: "Opinion",
    reviewed: "July 2026",
    level: "All levels",
    tags: ["career", "impact"],
    sections: [
      {
        title: "What I try to measure",
        body: "The result should connect to a customer, business, system, or team outcome.",
        points: [
          "A user can complete an important flow more successfully",
          "A service becomes faster, safer, or more reliable",
          "A delivery risk is reduced",
          "Other engineers become more autonomous",
          "A repeated source of work or confusion disappears",
        ],
      },
    ],
    related: ["standardize-the-boring-parts", "becoming-the-only-expert"],
  },
  {
    slug: "becoming-the-only-expert",
    category: "Advice",
    title: "Do not become the only expert",
    summary: "Being indispensable to every change is a team risk, not a seniority strategy.",
    context: "Opinion",
    reviewed: "July 2026",
    level: "Senior",
    tags: ["leadership", "mentoring"],
    sections: [
      {
        title: "A better kind of expertise",
        body: "Deep knowledge creates more value when it raises the capability of the group.",
        points: [
          "Document common diagnostic and operational paths",
          "Pair on consequential changes",
          "Delegate real ownership with support",
          "Rotate responsibilities and incident roles",
          "Teach decision-making instead of supplying every answer",
        ],
      },
    ],
    related: ["activity-is-not-impact", "ask-questions-earlier"],
  },
];

export const journalCategories: JournalCategory[] = [
  "Case Study",
  "Production Lesson",
  "Decision Note",
  "Advice",
];

export function getJournalEntry(slug: string) {
  return journalEntries.find((entry) => entry.slug === slug);
}
