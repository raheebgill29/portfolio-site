export type Capability = {
  id: string;
  number: string;
  label: string;
  lane: "Intake" | "Orchestration" | "Intelligence & data" | "Reliability & handoff";
  description: string;
};

export const capabilities: Capability[] = [
  { id: "webhook", number: "01", label: "Webhook-based workflows", lane: "Intake", description: "Receive product events, lead submissions, replies, and service callbacks in real time." },
  { id: "apis", number: "02", label: "REST API integrations", lane: "Intake", description: "Connect authenticated services and move structured data cleanly between them." },
  { id: "validation", number: "03", label: "Validation & normalization", lane: "Intake", description: "Standardize incoming records and reject incomplete or unsafe payloads before processing." },
  { id: "routing", number: "04", label: "Conditional routing", lane: "Orchestration", description: "Send each record down the correct path using explicit business rules and state." },
  { id: "loops", number: "05", label: "Loops & batch processing", lane: "Orchestration", description: "Process large lists predictably without losing item-level context or results." },
  { id: "polling", number: "06", label: "Asynchronous polling", lane: "Orchestration", description: "Wait for slower external jobs without blocking the rest of the workflow." },
  { id: "agents", number: "07", label: "AI agents & structured outputs", lane: "Intelligence & data", description: "Orchestrate models and require schema-valid results before downstream use." },
  { id: "logging", number: "08", label: "Sheets & database logging", lane: "Intelligence & data", description: "Persist operational state, reports, and audit trails where teams can use them." },
  { id: "retry", number: "09", label: "Retry & failure handling", lane: "Reliability & handoff", description: "Recover from transient service errors and surface failures that need attention." },
  { id: "consent", number: "10", label: "Suppression & consent", lane: "Reliability & handoff", description: "Respect opt-outs and consent rules at intake and immediately before contact." },
  { id: "human", number: "11", label: "Human-in-the-loop review", lane: "Reliability & handoff", description: "Route ambiguous or high-risk cases to people with the right context attached." },
  { id: "timezone", number: "12", label: "Timezone-aware scheduling", lane: "Reliability & handoff", description: "Schedule communication inside each customer’s local contact window." },
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
