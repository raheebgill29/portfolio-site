export type TechnologyId =
  | "n8n"
  | "nextjs"
  | "react"
  | "typescript"
  | "openai"
  | "tailwind"
  | "shadcn"
  | "javascript"
  | "nodejs"
  | "nestjs"
  | "fastapi"
  | "python"
  | "supabase"
  | "postgresql"
  | "mongodb"
  | "azure"
  | "aws"
  | "vercel"
  | "docker"
  | "microsoftGraph"
  | "googleSheets"
  | "shopify"
  | "reactNative"
  | "expo";

export type Technology = {
  id: TechnologyId;
  name: string;
  category: string;
  group: "frontend" | "automation";
  brandColor: `#${string}`;
  iconKey: string;
  prominence?: "hero" | "major" | "standard";
};

export const technologies: Technology[] = [
  { id: "nextjs", name: "Next.js", category: "Frontend framework", group: "frontend", brandColor: "#FFFFFF", iconKey: "nextjs", prominence: "hero" },
  { id: "react", name: "React", category: "Interface engineering", group: "frontend", brandColor: "#61DAFB", iconKey: "react", prominence: "hero" },
  { id: "typescript", name: "TypeScript", category: "Type-safe applications", group: "frontend", brandColor: "#3178C6", iconKey: "typescript", prominence: "hero" },
  { id: "tailwind", name: "Tailwind CSS", category: "Design systems", group: "frontend", brandColor: "#06B6D4", iconKey: "tailwind" },
  { id: "shadcn", name: "shadcn/ui", category: "Accessible UI", group: "frontend", brandColor: "#FFFFFF", iconKey: "shadcn" },
  { id: "javascript", name: "JavaScript", category: "Web engineering", group: "frontend", brandColor: "#F7DF1E", iconKey: "javascript" },
  { id: "vercel", name: "Vercel", category: "Frontend deployment", group: "frontend", brandColor: "#FFFFFF", iconKey: "vercel" },
  { id: "shopify", name: "Shopify", category: "Commerce", group: "frontend", brandColor: "#7AB55C", iconKey: "shopify" },
  { id: "reactNative", name: "React Native", category: "Mobile applications", group: "frontend", brandColor: "#61DAFB", iconKey: "react" },
  { id: "expo", name: "Expo", category: "Mobile tooling", group: "frontend", brandColor: "#F5F5F5", iconKey: "expo" },
  { id: "n8n", name: "n8n", category: "Workflow orchestration", group: "automation", brandColor: "#EA4B71", iconKey: "n8n", prominence: "hero" },
  { id: "openai", name: "OpenAI", category: "AI models & agents", group: "automation", brandColor: "#F1F1E8", iconKey: "openai", prominence: "hero" },
  { id: "nodejs", name: "Node.js", category: "Backend runtime", group: "automation", brandColor: "#5FA04E", iconKey: "nodejs" },
  { id: "nestjs", name: "NestJS", category: "Backend framework", group: "automation", brandColor: "#E0234E", iconKey: "nestjs" },
  { id: "fastapi", name: "FastAPI", category: "Python services", group: "automation", brandColor: "#009688", iconKey: "fastapi" },
  { id: "python", name: "Python", category: "AI & backend", group: "automation", brandColor: "#3776AB", iconKey: "python" },
  { id: "supabase", name: "Supabase", category: "Backend platform", group: "automation", brandColor: "#3FCF8E", iconKey: "supabase" },
  { id: "postgresql", name: "PostgreSQL", category: "Relational data", group: "automation", brandColor: "#4169E1", iconKey: "postgresql" },
  { id: "mongodb", name: "MongoDB", category: "Document data", group: "automation", brandColor: "#47A248", iconKey: "mongodb" },
  { id: "azure", name: "Microsoft Azure", category: "Cloud & AI infrastructure", group: "automation", brandColor: "#0089D6", iconKey: "azure", prominence: "major" },
  { id: "aws", name: "AWS", category: "Cloud infrastructure", group: "automation", brandColor: "#FF9900", iconKey: "aws" },
  { id: "docker", name: "Docker", category: "Deployment", group: "automation", brandColor: "#2496ED", iconKey: "docker" },
  { id: "microsoftGraph", name: "Microsoft Graph", category: "Microsoft APIs", group: "automation", brandColor: "#00A4EF", iconKey: "microsoft" },
  { id: "googleSheets", name: "Google Sheets", category: "Reporting & operations", group: "automation", brandColor: "#34A853", iconKey: "googleSheets" },
];

export const technologyById = Object.fromEntries(
  technologies.map((technology) => [technology.id, technology]),
) as Record<TechnologyId, Technology>;
