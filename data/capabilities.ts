export type Capability = {
  id: string;
  number: string;
  label: string;
  icon: string;
  lane: "Intake" | "Orchestration" | "Intelligence & data" | "Reliability & handoff";
  description: string;
};

export type AutomationStage = {
  id: string;
  number: string;
  lane: Capability["lane"];
  title: string;
  description: string;
};

export const automationStages: AutomationStage[] = [
  { id: "intake", number: "01", lane: "Intake", title: "Capture trusted inputs.", description: "Events enter through webhooks and APIs, then become normalized, safe records before any downstream work begins." },
  { id: "orchestration", number: "02", lane: "Orchestration", title: "Move each record with intent.", description: "Business rules, loops, and asynchronous jobs determine the correct route while preserving state at every step." },
  { id: "intelligence", number: "03", lane: "Intelligence & data", title: "Turn data into decisions.", description: "AI returns structured results, while databases and reporting surfaces retain the operational truth." },
  { id: "reliability", number: "04", lane: "Reliability & handoff", title: "Recover, protect, and escalate.", description: "Retries handle transient failures, consent rules protect customers, and ambiguous cases reach people with context." },
];

export const capabilities: Capability[] = [
  { id: "webhook", number: "01", label: "Webhook-based workflows", icon: "IN", lane: "Intake", description: "Receive product events, lead submissions, replies, and service callbacks in real time." },
  { id: "apis", number: "02", label: "REST & GraphQL integrations", icon: "API", lane: "Intake", description: "Connect authenticated services and move structured data cleanly between them." },
  { id: "validation", number: "03", label: "Data validation & transformation", icon: "✓", lane: "Intake", description: "Standardize incoming records and reject incomplete or unsafe payloads before processing." },
  { id: "routing", number: "04", label: "Conditional routing", icon: "◇", lane: "Orchestration", description: "Send each record down the correct path using explicit business rules and state." },
  { id: "loops", number: "05", label: "Loops & batch processing", icon: "∞", lane: "Orchestration", description: "Process large lists predictably without losing item-level context or results." },
  { id: "polling", number: "06", label: "Asynchronous polling", icon: "↻", lane: "Orchestration", description: "Wait for slower external jobs without blocking the rest of the workflow." },
  { id: "agents", number: "07", label: "AI agents & structured outputs", icon: "AI", lane: "Intelligence & data", description: "Orchestrate models and require schema-valid results before downstream use." },
  { id: "logging", number: "08", label: "Sheets & database logging", icon: "DB", lane: "Intelligence & data", description: "Persist operational state, reports, and audit trails where teams can use them." },
  { id: "retry", number: "09", label: "Retry & failure handling", icon: "R", lane: "Reliability & handoff", description: "Recover from transient service errors and surface failures that need attention." },
  { id: "consent", number: "10", label: "Suppression & consent", icon: "⊘", lane: "Reliability & handoff", description: "Respect opt-outs and consent rules at intake and immediately before contact." },
  { id: "human", number: "11", label: "Human-in-the-loop review", icon: "H", lane: "Reliability & handoff", description: "Route ambiguous or high-risk cases to people with the right context attached." },
  { id: "timezone", number: "12", label: "Timezone-aware scheduling", icon: "TZ", lane: "Reliability & handoff", description: "Schedule communication inside each customer’s local contact window." },
];

export const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    accent: "cyan",
    description: "Interfaces designed to feel precise, fast, and dependable across screens.",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Responsive design", "Reusable components", "State management", "Accessibility", "API integration"],
  },
  {
    number: "02",
    title: "Automation & AI",
    accent: "coral",
    description: "Workflows that transform events into reliable actions and observable outcomes.",
    skills: ["n8n", "OpenAI", "AI agents", "Structured outputs", "Webhooks", "API orchestration", "Conditional routing", "Data transformation", "Async processing", "Human handoff"],
  },
  {
    number: "03",
    title: "Backend & data",
    accent: "neutral",
    description: "Service boundaries and data layers that support real product behavior.",
    skills: ["FastAPI", "NestJS", "Node.js", "REST APIs", "Supabase", "PostgreSQL", "MongoDB", "Cosmos DB"],
  },
  {
    number: "04",
    title: "Cloud & deployment",
    accent: "neutral",
    description: "Production delivery across modern cloud and container platforms.",
    skills: ["Azure App Service", "Azure OpenAI", "AWS", "Vercel", "Docker"],
  },
] as const;
