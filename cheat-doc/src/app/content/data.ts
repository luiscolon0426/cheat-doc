export type ContentSection = {
  title: string;
  body: string;
  points?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  outcome: string;
  tags: string[];
  sections: ContentSection[];
  relatedTopics: string[];
};

export type Blueprint = {
  slug: string;
  title: string;
  summary: string;
  level: "Intermediate" | "Advanced";
  duration: string;
  stack: string[];
  outcomes: string[];
  phases: { title: string; deliverables: string[] }[];
  relatedTopics: string[];
};

export type GoalPath = {
  slug: string;
  title: string;
  summary: string;
  icon: string;
  steps: { title: string; description: string; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "patient-app-performance",
    title: "Making a patient-facing app feel faster",
    summary:
      "How measurement-led frontend refactoring improved a critical experience without a risky rewrite.",
    context: "Frontend performance · Production",
    outcome: "Roughly 40% faster load time on the targeted experience",
    tags: ["performance", "react", "measurement", "production"],
    relatedTopics: ["react", "javascript", "nextjs"],
    sections: [
      {
        title: "The problem",
        body: "A patient-facing workflow was slow enough to affect usability. The useful goal was not a perfect synthetic score; it was reducing the wait before people could complete an important task.",
      },
      {
        title: "The investigation",
        body: "I established a repeatable baseline and traced the critical rendering path before proposing changes.",
        points: [
          "Profiled expensive renders and unnecessary work",
          "Compared production-like devices and realistic data",
          "Separated network, JavaScript, and rendering costs",
          "Prioritized delays users could actually perceive",
        ],
      },
      {
        title: "The decision",
        body: "Focused refactoring had a smaller blast radius and clearer measurement than a rewrite. Changes were released incrementally so each improvement could be verified.",
      },
      {
        title: "What I learned",
        body: "Performance is a product feature. A successful optimization starts with a user-visible symptom, changes the constrained path, and keeps regression protection after release.",
      },
    ],
  },
  {
    slug: "safe-payment-webhooks",
    title: "Designing payment webhooks for retries",
    summary:
      "A durable approach to signature validation, idempotency, asynchronous work, and controlled replay.",
    context: "Payments · Backend reliability",
    outcome: "Duplicate delivery no longer meant duplicate business effects",
    tags: ["payments", "webhooks", "security", "reliability"],
    relatedTopics: ["stripe", "webhooks", "api-security"],
    sections: [
      {
        title: "The risk",
        body: "Providers retry valid events when acknowledgements are delayed or lost. Processing every delivery as new work can create duplicate fulfillment, emails, or financial changes.",
      },
      {
        title: "The design",
        body: "Receipt, validation, and business processing became distinct responsibilities.",
        points: [
          "Validate signatures against the raw request body",
          "Persist provider event IDs under a unique constraint",
          "Acknowledge quickly and queue durable processing",
          "Make downstream side effects safe to retry",
          "Keep an audit trail and controlled replay path",
        ],
      },
      {
        title: "The trade-off",
        body: "The design adds durable state and operational tooling, but that cost is justified when duplicate side effects can harm customers or require manual financial correction.",
      },
    ],
  },
  {
    slug: "recoverable-realtime",
    title: "Building real-time features that recover",
    summary:
      "Why WebSockets and push notifications should signal state changes—not become the only copy of state.",
    context: "Mobile · Distributed systems",
    outcome: "Clients could reconnect, resynchronize, and tolerate missed events",
    tags: ["websockets", "mobile", "reliability", "push notifications"],
    relatedTopics: ["websockets", "push-notifications", "react-native"],
    sections: [
      {
        title: "The misconception",
        body: "A real-time transport makes delivery immediate when connected, but it cannot guarantee that every device receives every event exactly once and in order.",
      },
      {
        title: "The recovery model",
        body: "Messages became notifications that authoritative state had changed.",
        points: [
          "Reconnect with bounded backoff",
          "Restore subscriptions after reconnect",
          "Track versions or event identifiers",
          "Resynchronize authoritative state after gaps",
          "Re-check authorization when handling actions",
        ],
      },
      {
        title: "What I learned",
        body: "A reliable real-time feature is defined less by never disconnecting and more by recovering predictably from delay, duplication, reordering, and missed events.",
      },
    ],
  },
];

export const blueprints: Blueprint[] = [
  {
    slug: "multi-tenant-saas",
    title: "Multi-tenant SaaS dashboard",
    summary:
      "Build a production-minded SaaS with tenant isolation, roles, billing boundaries, audit history, and safe background work.",
    level: "Advanced",
    duration: "6–8 weeks",
    stack: ["Next.js", "PostgreSQL", "Authentication", "Stripe", "Background jobs"],
    outcomes: [
      "Tenant-aware authentication and authorization",
      "Subscription lifecycle and usage limits",
      "Audit logs, exports, and account deletion",
      "Observable jobs with retries and idempotency",
    ],
    phases: [
      {
        title: "Foundation",
        deliverables: ["Product brief", "Tenant data model", "Auth and role matrix", "Threat model"],
      },
      {
        title: "Core product",
        deliverables: ["Tenant dashboard", "Member invitations", "CRUD workflows", "Audit events"],
      },
      {
        title: "Operations",
        deliverables: ["Billing webhooks", "Background jobs", "Rate limits", "Dashboards and alerts"],
      },
      {
        title: "Proof",
        deliverables: ["Cross-tenant security tests", "Load test", "Runbook", "Architecture write-up"],
      },
    ],
    relatedTopics: ["nextjs", "sql", "authentication", "stripe", "webhooks"],
  },
  {
    slug: "realtime-collaboration",
    title: "Real-time collaboration workspace",
    summary:
      "Create a shared workspace with presence, optimistic updates, reconnect recovery, and durable history.",
    level: "Advanced",
    duration: "5–7 weeks",
    stack: ["React", "WebSockets", "Node.js", "PostgreSQL", "Redis"],
    outcomes: [
      "Presence and live updates",
      "Conflict and ordering strategy",
      "Reconnect and state synchronization",
      "Load and failure testing",
    ],
    phases: [
      {
        title: "Protocol",
        deliverables: ["Event schema", "Connection lifecycle", "Authorization rules", "Ordering model"],
      },
      {
        title: "Experience",
        deliverables: ["Shared workspace", "Presence", "Optimistic UI", "Offline feedback"],
      },
      {
        title: "Recovery",
        deliverables: ["Reconnect backoff", "Missed-event sync", "Idempotent mutations", "Replay tests"],
      },
    ],
    relatedTopics: ["react", "websockets", "nodejs", "sql"],
  },
  {
    slug: "commerce-api",
    title: "Reliable commerce API",
    summary:
      "Build an API for products, carts, orders, payments, webhooks, and fulfillment with explicit failure handling.",
    level: "Intermediate",
    duration: "4–6 weeks",
    stack: ["REST API", "Node.js", "PostgreSQL", "Stripe", "Docker"],
    outcomes: [
      "Versioned API and validation",
      "Transactional order creation",
      "Idempotent payment workflow",
      "Integration tests and deployment runbook",
    ],
    phases: [
      {
        title: "Domain",
        deliverables: ["API contract", "Product and order model", "Error format", "Security boundaries"],
      },
      {
        title: "Transactions",
        deliverables: ["Cart checkout", "Inventory rules", "Payment intent", "Webhook inbox"],
      },
      {
        title: "Release",
        deliverables: ["Contract tests", "Failure scenarios", "Container build", "Rollback plan"],
      },
    ],
    relatedTopics: ["rest-api", "nodejs", "sql", "stripe", "docker"],
  },
  {
    slug: "mobile-notification-system",
    title: "Mobile notification system",
    summary:
      "Design user preferences, device registration, queued delivery, deep links, and delivery observability.",
    level: "Intermediate",
    duration: "3–5 weeks",
    stack: ["React Native", "Push notifications", "Node.js", "Queues"],
    outcomes: [
      "Device and preference management",
      "Template and localization model",
      "Retry-safe queued delivery",
      "Deep-link authorization and analytics",
    ],
    phases: [
      {
        title: "Model",
        deliverables: ["Notification types", "Preference rules", "Device lifecycle", "Provider adapter"],
      },
      {
        title: "Delivery",
        deliverables: ["Queue worker", "Retry policy", "Invalid-token cleanup", "Deep links"],
      },
      {
        title: "Operate",
        deliverables: ["Delivery metrics", "Failure dashboard", "Replay tool", "Privacy review"],
      },
    ],
    relatedTopics: ["react-native", "push-notifications", "nodejs"],
  },
];

export const goalPaths: GoalPath[] = [
  {
    slug: "ship-production-app",
    title: "Ship a production application",
    summary: "Move from idea to an observable, recoverable release.",
    icon: "🚀",
    steps: [
      { title: "Choose a blueprint", description: "Start with a scoped product and explicit outcomes.", href: "/blueprints" },
      { title: "Plan the system", description: "Work from requirements, risks, APIs, and data.", href: "/learn/system-design" },
      { title: "Prepare production", description: "Add observability, rollback, and recovery.", href: "/learn/production" },
      { title: "Study real decisions", description: "See how trade-offs played out in practice.", href: "/case-studies" },
    ],
  },
  {
    slug: "grow-to-senior",
    title: "Grow toward senior engineering",
    summary: "Develop ownership, judgment, communication, and system-level impact.",
    icon: "🧭",
    steps: [
      { title: "Assess your scope", description: "Compare current work with senior expectations.", href: "/career/path-to-senior" },
      { title: "Practice architecture", description: "Explain trade-offs, not only components.", href: "/learn/system-design" },
      { title: "Improve operations", description: "Own what happens after deployment.", href: "/learn/production" },
      { title: "Collect evidence", description: "Track outcomes and lessons in your toolkit.", href: "/learn/toolkit" },
    ],
  },
  {
    slug: "master-backend",
    title: "Build stronger backend systems",
    summary: "Connect API design, data, security, integrations, and reliability.",
    icon: "⚙️",
    steps: [
      { title: "API foundations", description: "Review contracts, HTTP behavior, and consistency.", href: "/rest-api" },
      { title: "Secure boundaries", description: "Apply authentication, authorization, and validation.", href: "/api-security" },
      { title: "Handle distributed failure", description: "Design retries, queues, and idempotency.", href: "/learn/production" },
      { title: "Build a complete API", description: "Apply the ideas to a commerce workflow.", href: "/blueprints/commerce-api" },
    ],
  },
  {
    slug: "prepare-interviews",
    title: "Prepare for engineering interviews",
    summary: "Practice technical explanation, system design, debugging, and evidence-based stories.",
    icon: "🎯",
    steps: [
      { title: "Calibrate the level", description: "Understand signals expected at each career stage.", href: "/career" },
      { title: "Practice debugging", description: "Reason from symptoms to evidence and prevention.", href: "/learn/debugging" },
      { title: "Design systems", description: "Use a repeatable requirements-first method.", href: "/learn/system-design" },
      { title: "Prepare stories", description: "Turn projects into problem, action, and outcome narratives.", href: "/case-studies" },
    ],
  },
];

export const portfolioProjects = [
  {
    title: "DevMarks",
    summary:
      "A searchable engineering field guide combining technical references, production lessons, career paths, and applied practice.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Netlify"],
    href: "/case-studies",
    cta: "Explore the engineering",
  },
  {
    title: "Production case studies",
    summary:
      "Anonymized examples showing how I investigate constraints, make trade-offs, reduce risk, and measure outcomes.",
    stack: ["Performance", "Payments", "Real-time systems"],
    href: "/case-studies",
    cta: "Read case studies",
  },
  {
    title: "Complete portfolio",
    summary:
      "See my broader work, background, and ways to connect outside this engineering knowledge base.",
    stack: ["Web", "Mobile", "Backend", "Cloud"],
    href: "https://luiscolon0426.github.io/portfolio/",
    cta: "Visit portfolio",
    external: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}

export function getBlueprint(slug: string) {
  return blueprints.find((item) => item.slug === slug);
}
