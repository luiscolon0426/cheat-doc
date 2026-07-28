export type CareerSection = {
  title: string;
  description: string;
  items: string[];
};

export type CareerPath = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  goal: string;
  color: string;
  icon: string;
  sections: CareerSection[];
  projects: string[];
  evidence: string[];
};

export const careerPaths: CareerPath[] = [
  {
    slug: "junior",
    eyebrow: "Foundation",
    title: "Junior Developer",
    summary: "Become dependable with clearly defined work and build strong engineering habits.",
    goal: "Deliver small, well-tested changes while communicating progress and asking effective questions.",
    color: "#38bdf8",
    icon: "🌱",
    sections: [
      {
        title: "Technical foundations",
        description: "Understand the tools and concepts used in everyday development.",
        items: [
          "Set up a local development environment and understand its moving parts",
          "Use Git branches, commits, pull requests, and resolve basic conflicts",
          "Understand HTTP requests, responses, methods, headers, and status codes",
          "Work confidently with variables, functions, data structures, and asynchronous code",
          "Write basic SQL queries and understand tables, keys, and relationships",
          "Build responsive, accessible interfaces",
        ],
      },
      {
        title: "Quality and debugging",
        description: "Learn to prove that code works and find causes instead of guessing.",
        items: [
          "Reproduce a bug consistently before changing code",
          "Read errors, stack traces, logs, and network requests",
          "Use breakpoints and isolate a failing assumption",
          "Write focused unit and integration tests",
          "Validate input and handle expected failure states",
          "Test loading, empty, error, success, and permission states",
        ],
      },
      {
        title: "Team habits",
        description: "Make your work easy for teammates to understand and review.",
        items: [
          "Break a ticket into small, verifiable tasks",
          "Give early updates when blocked or when scope changes",
          "Write pull requests that explain what changed, why, and how it was tested",
          "Receive feedback without treating it as a personal criticism",
          "Ask questions with context, evidence, and what you already tried",
          "Document setup steps and non-obvious decisions",
        ],
      },
    ],
    projects: [
      "Build and deploy a CRUD application backed by a real database",
      "Add authentication and authorization to an existing application",
      "Write tests around a critical user flow",
      "Fix a documented bug in an unfamiliar repository",
    ],
    evidence: [
      "Delivers small changes without repeated follow-up fixes",
      "Can explain how their code works and how it was tested",
      "Raises blockers early and incorporates review feedback",
      "Leaves code and documentation clearer than they found it",
    ],
  },
  {
    slug: "mid",
    eyebrow: "Ownership",
    title: "Mid-level Developer",
    summary: "Own complete features and make sound decisions within a product area.",
    goal: "Take moderately ambiguous work from requirements through release, monitoring, and follow-up.",
    color: "#a78bfa",
    icon: "🧭",
    sections: [
      {
        title: "Feature ownership",
        description: "Move beyond assigned implementation tasks and own the outcome.",
        items: [
          "Clarify requirements, edge cases, dependencies, and success measures",
          "Break a feature into safe increments and identify delivery risks",
          "Coordinate frontend, backend, data, design, and product needs",
          "Release using feature flags, staged rollouts, or backward-compatible changes",
          "Monitor production behavior and follow through after launch",
          "Balance delivery speed with maintainability and risk",
        ],
      },
      {
        title: "Engineering depth",
        description: "Design changes that remain understandable and operable.",
        items: [
          "Design predictable APIs and database schemas",
          "Plan safe database and API migrations",
          "Choose an appropriate testing strategy instead of testing everything the same way",
          "Use logs, metrics, and traces to investigate production behavior",
          "Profile performance before optimizing",
          "Apply caching, queues, retries, timeouts, and idempotency appropriately",
        ],
      },
      {
        title: "Team contribution",
        description: "Improve work beyond your own pull requests.",
        items: [
          "Review code for behavior, simplicity, security, and operability",
          "Write concise design documents for meaningful changes",
          "Share domain knowledge and help onboard teammates",
          "Identify recurring friction and improve the team process",
          "Challenge ideas respectfully and commit after a decision",
          "Know when to solve independently and when to involve others",
        ],
      },
    ],
    projects: [
      "Design and deliver a feature from discovery to measured production results",
      "Migrate an API or database without disrupting consumers",
      "Diagnose and improve a slow or unreliable service",
      "Lead a small technical project involving multiple contributors",
    ],
    evidence: [
      "Owns features rather than only assigned coding tasks",
      "Anticipates edge cases and operational concerns",
      "Makes trade-offs explicit and documents important decisions",
      "Unblocks teammates and improves a recurring team problem",
    ],
  },
  {
    slug: "senior",
    eyebrow: "Impact",
    title: "Senior Developer",
    summary: "Lead ambiguous work, reduce risk, and multiply the effectiveness of a team.",
    goal: "Create durable outcomes across systems and people—not simply produce more code.",
    color: "#f59e0b",
    icon: "🏔️",
    sections: [
      {
        title: "Systems and judgment",
        description: "Make decisions that remain sound beyond the immediate task.",
        items: [
          "Design systems around real scale, reliability, security, and cost requirements",
          "Explain architecture trade-offs and reject unnecessary complexity",
          "Understand service boundaries, data ownership, and failure modes",
          "Plan incremental migrations with rollback and compatibility strategies",
          "Make build-versus-buy decisions using business and operational context",
          "Know which decisions are reversible and which deserve deeper review",
        ],
      },
      {
        title: "Production leadership",
        description: "Own how systems behave after deployment.",
        items: [
          "Define useful service indicators, objectives, dashboards, and alerts",
          "Lead incidents calmly with clear roles and communication",
          "Write blameless postmortems with concrete prevention work",
          "Run production-readiness and security reviews",
          "Plan capacity, degradation behavior, and disaster recovery",
          "Reduce operational toil through simple automation",
        ],
      },
      {
        title: "Organizational impact",
        description: "Help a group make better decisions and deliver stronger outcomes.",
        items: [
          "Turn unclear goals into an executable technical direction",
          "Communicate risks and trade-offs to product, design, and leadership",
          "Lead projects across team boundaries without relying on authority",
          "Mentor engineers by creating opportunities, not taking over their work",
          "Create standards that solve demonstrated problems",
          "Connect technical investment to customer and business outcomes",
        ],
      },
    ],
    projects: [
      "Lead a cross-team initiative with measurable customer or operational impact",
      "Design and execute a high-risk migration with a tested rollback",
      "Improve a service's reliability using indicators, objectives, and incident history",
      "Establish a technical practice that makes multiple engineers more effective",
    ],
    evidence: [
      "Successfully leads important work with incomplete requirements",
      "Reduces risk before it becomes an incident",
      "Makes other engineers more autonomous and effective",
      "Influences outcomes beyond a single repository or feature",
    ],
  },
  {
    slug: "path-to-senior",
    eyebrow: "Roadmap",
    title: "Path to Senior Engineer",
    summary: "A practical roadmap for engineers who want senior-level impact but lack a clear path.",
    goal: "Build repeatable evidence across technical depth, ownership, judgment, communication, and team impact.",
    color: "#34d399",
    icon: "🚀",
    sections: [
      {
        title: "1. Build technical depth",
        description: "Go deeper in one production stack while learning the systems around it.",
        items: [
          "Trace a request from interface through API, database, infrastructure, and monitoring",
          "Learn the common failure modes and performance limits of your systems",
          "Own one difficult domain deeply enough to teach and troubleshoot it",
          "Practice system design using explicit requirements and trade-offs",
          "Develop strong debugging skills before reaching for rewrites",
        ],
      },
      {
        title: "2. Expand ownership",
        description: "Own outcomes and risks, not merely code completion.",
        items: [
          "Volunteer to lead a contained feature from discovery through production",
          "Define success measures and monitor them after release",
          "Identify dependencies, edge cases, rollout plans, and rollback plans",
          "Close follow-up work instead of moving on after deployment",
          "Take responsibility without becoming a single point of failure",
        ],
      },
      {
        title: "3. Practice technical judgment",
        description: "Learn to choose the simplest solution that responsibly meets the need.",
        items: [
          "Write down alternatives and their cost, risk, complexity, and reversibility",
          "Separate current requirements from hypothetical future requirements",
          "Use prototypes and measurements to resolve uncertainty",
          "Ask what can fail and how the system will recover",
          "Review past decisions without hindsight blame",
        ],
      },
      {
        title: "4. Increase team impact",
        description: "Your growth should make the people around you more capable.",
        items: [
          "Mentor through questions, context, feedback, and progressively larger opportunities",
          "Document knowledge that is repeatedly trapped in one person",
          "Improve one recurring source of delivery friction",
          "Lead design reviews that invite disagreement and produce clear decisions",
          "Delegate meaningful ownership and remain available for support",
        ],
      },
      {
        title: "5. Communicate your growth",
        description: "Make goals, gaps, and evidence visible to the people supporting your progression.",
        items: [
          "Ask your manager for the actual senior expectations at your company",
          "Choose one or two growth gaps per quarter",
          "Request projects that create evidence for those gaps",
          "Keep an evidence journal with context, action, outcome, and lessons",
          "Ask for specific feedback before formal promotion conversations",
        ],
      },
      {
        title: "Common misconceptions",
        description: "Avoid progress that looks impressive but does not create senior-level impact.",
        items: [
          "Learning more frameworks does not automatically increase seniority",
          "Writing the most code does not make someone the strongest engineer",
          "Being the only person who understands a system is a team risk, not a promotion strategy",
          "Senior does not require management, but it does require leadership",
          "A career framework is a compass and evidence guide—not a guaranteed checklist",
        ],
      },
    ],
    projects: [
      "Lead one ambiguous project and document its decisions, risks, and outcomes",
      "Own a production improvement informed by metrics or incident history",
      "Mentor a teammate through a meaningful piece of work",
      "Write a promotion-style evidence document and review the gaps with your manager",
    ],
    evidence: [
      "Context: What problem or risk existed?",
      "Action: What decisions and leadership did you personally provide?",
      "Outcome: What measurable customer, business, system, or team result changed?",
      "Learning: What would you repeat or change next time?",
    ],
  },
];

export function getCareerPath(slug: string) {
  return careerPaths.find((path) => path.slug === slug);
}
