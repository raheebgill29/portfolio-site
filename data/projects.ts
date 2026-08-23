import type { TechnologyId } from "./technologies";

export type ProjectFilter = "all" | "automation" | "frontend" | "ai-fullstack";

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  filterTags: Exclude<ProjectFilter, "all">[];
  role: string;
  stack: string[];
  technologyIds: TechnologyId[];
  year: string;
  periodLabel: string;
  accent: string;
  surface: string;
  preview: "lead" | "content" | "synoptix" | "automotive" | "homedash" | "commerce";
  description: string[];
  problem: string;
  responsibilities: string[];
  architecture: string[];
  functionality: string[];
  decisions: string[];
  gallery: { label: string; note: string; image?: string; alt?: string }[];
};

export const projectFilters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "automation", label: "n8n Automation" },
  { id: "frontend", label: "Frontend" },
  { id: "ai-fullstack", label: "AI and Full Stack" },
];

export const projects: Project[] = [
  {
    id: "dealership-lead-follow-up",
    number: "01",
    title: "Dealership Lead Follow-Up System",
    category: "n8n Automation",
    filterTags: ["automation"],
    role: "Workflow and Automation Developer",
    stack: ["n8n", "Webhooks", "JavaScript", "Data Tables", "REST APIs"],
    technologyIds: ["n8n", "javascript", "nodejs"],
    year: "Current",
    periodLabel: "Independent project work",
    accent: "#ff6b4a",
    surface: "#16100e",
    preview: "lead",
    description: [
      "A complete outbound and inbound lead-management automation. It validates and normalizes new leads, verifies consent, prevents duplicate events, checks permanent suppression, respects the customer’s local contact hours, schedules follow-ups, and checks suppression again before contacting the customer.",
      "Incoming replies are matched to the correct lead and classified as Interested, Not Interested, Opt-Out, or Unclear. Interested leads are routed to a dealer queue, opt-outs are permanently suppressed, and unclear replies are sent for human review.",
    ],
    problem: "Dealership follow-up must remain timely without contacting duplicate, suppressed, non-consenting, or out-of-hours customers. Incoming replies also need to be matched and routed reliably.",
    responsibilities: [
      "Designed separate outbound lead-intake and inbound reply workflows.",
      "Implemented normalization, consent validation, duplicate prevention, suppression checks, timezone-aware scheduling, and delayed follow-ups.",
      "Added reply matching, classification, queue routing, audit logging, and operational state tracking.",
    ],
    architecture: ["Webhook intake", "Normalize lead", "Validate consent", "Idempotency check", "Suppression check", "Local-hours decision", "Schedule follow-up", "Pre-send suppression", "Reply classification", "Dealer or human handoff"],
    functionality: ["Interested / Not Interested / Opt-Out / Unclear states", "Permanent opt-out suppression", "Duplicate-event protection", "Local-time contact windows", "Delayed follow-ups", "Data Tables state and audit records", "Human review for ambiguous replies"],
    decisions: ["Separate inbound and outbound workflows so responsibilities and failure paths remain clear.", "Re-check suppression immediately before each contact attempt.", "Persist workflow state instead of relying on execution memory.", "Route unclear replies to people rather than forcing an unreliable classification."],
    gallery: [
      { label: "Outbound control flow", note: "Consent, idempotency, suppression, and local-hour gates before contact.", image: "/dealership-lead-system.jpg", alt: "AI lead follow-up automation routing leads through messaging, AI classification, opt-out protection, and human review" },
      {
        label: "Production workflow",
        note: "The complete n8n system connects intake, validation, suppression, reply routing, and follow-up branches.",
        image: "/dealership-lead-system-2.jpg",
        alt: "n8n dealership lead follow-up workflow with intake, validation, suppression, reply routing, and follow-up branches",
      },
      { label: "Human handoff", note: "Unclear replies arrive with context instead of disappearing into a dead end." },
    ],
  },
  {
    id: "competitor-content-intelligence",
    number: "02",
    title: "Competitor Content Intelligence",
    category: "n8n and AI Automation",
    filterTags: ["automation", "ai-fullstack"],
    role: "AI Automation Developer",
    stack: ["n8n", "OpenAI", "REST APIs", "Google Sheets", "Structured Outputs"],
    technologyIds: ["n8n", "openai", "googleSheets", "javascript"],
    year: "Current",
    periodLabel: "Independent project work",
    accent: "#ff8268",
    surface: "#17100f",
    preview: "content",
    description: [
      "A scalable automation containing more than 50 nodes. It resolves and deduplicates competitor data, loops through competitors, retrieves content through APIs, routes image, video, and carousel content separately, and polls asynchronous jobs when necessary.",
      "OpenAI analyzes each item and returns schema-enforced structured data. The final results are merged and logged into Google Sheets in real time without manual cleanup.",
    ],
    problem: "Competitor research across many sources and media formats creates duplicate records, asynchronous API work, inconsistent AI responses, and reports that otherwise require manual cleanup.",
    responsibilities: ["Designed and built a workflow containing more than 50 nodes.", "Implemented competitor resolution, deduplication, iteration, API retrieval, media routing, polling, AI analysis, result merging, and reporting.", "Structured the workflow for observable processing across multiple competitors and content types."],
    architecture: ["Competitor input", "Resolve & deduplicate", "Loop competitors", "Retrieve content", "Route by media type", "Poll async jobs", "OpenAI analysis", "Validate schema", "Merge results", "Append to Google Sheets"],
    functionality: ["Multi-competitor batch processing", "Separate image, video, and carousel paths", "Asynchronous job polling", "OpenAI agent analysis", "Schema-enforced structured outputs", "Live Sheets reporting"],
    decisions: ["Deduplicate before beginning expensive API and AI work.", "Give each media type its own processing path.", "Poll slower jobs instead of blocking the main workflow.", "Require schema-valid AI output before merging records.", "Converge every branch into one reporting shape."],
    gallery: [
      { label: "Media routing", note: "Every asset type enters the analysis system through its own controlled path.", image: "/competitor-content-analysis.jpg", alt: "Competitor content intelligence workflow showing content routing, AI insights, structured output, and live reporting" },
      {
        label: "Production workflow",
        note: "The full n8n canvas shows media routing, asynchronous processing, AI analysis, merging, and reporting.",
        image: "/competitor-content-analysis-2.png",
        alt: "n8n competitor content intelligence workflow with media routing, AI analysis, polling, merging, and reporting nodes",
      },
      { label: "Live report", note: "Merged results populate an operations-ready sheet without cleanup." },
    ],
  },
  {
    id: "synoptix-ai-platform",
    number: "03",
    title: "Synoptix AI Platform",
    category: "Full-Stack AI Product",
    filterTags: ["frontend", "ai-fullstack"],
    role: "Full-Stack Developer",
    stack: ["Next.js 15", "React 19", "TypeScript", "FastAPI", "Azure OpenAI", "Microsoft Graph", "Azure App Service"],
    technologyIds: ["nextjs", "react", "typescript", "fastapi", "azure", "microsoftGraph", "openai"],
    year: "2025",
    periodLabel: "Jan 2025 — Dec 2025",
    accent: "#45cfff",
    surface: "#0a1418",
    preview: "synoptix",
    description: [
      "An enterprise AI platform featuring conversational interfaces, evaluations, request monitoring, safety-category reporting, user management, Microsoft service integrations, and Azure deployment.",
      "The frontend included reusable application layouts, chat experiences, evaluation dashboards, charts, tables, modals, authentication flows, and administration interfaces. The application connected to FastAPI services, Microsoft Graph, and Azure-based AI infrastructure.",
    ],
    problem: "Enterprise users needed a single product for AI conversations, agent workflows, evaluations, request monitoring, safety reporting, administration, and Microsoft-service integrations.",
    responsibilities: ["Worked across the Next.js and React frontend and FastAPI service layer.", "Built reusable layouts, chat experiences, evaluation dashboards, charts, tables, modals, authentication flows, and administration interfaces.", "Developed ReAct agents and connected Azure AI Search, Azure OpenAI, DeepSeek, and Llama.", "Integrated conversation persistence, role-based access, Microsoft services, and Azure deployment infrastructure."],
    architecture: ["Role-based access", "Next.js application shell", "Chat & admin interfaces", "FastAPI services", "Agent orchestration", "Azure AI Search & models", "Cosmos DB persistence", "Microsoft Graph", "Monitoring & evaluations", "Azure deployment"],
    functionality: ["Conversational AI interfaces", "Blog, code-writing, and FAQ agents", "Evaluation dashboards", "Request and safety monitoring", "Guest / User / Admin access", "Persistent conversations", "Microsoft service integrations"],
    decisions: ["Keep the frontend and AI orchestration separated by a FastAPI boundary.", "Use shared application layouts across chat, evaluation, and administration modules.", "Persist conversation state in Cosmos DB.", "Make evaluations, safety information, and request monitoring visible product features.", "Apply explicit role-based access instead of UI-only permissions."],
    gallery: [
      { label: "Conversational workspace", note: "A reusable chat surface connected to production AI services.", image: "/synoptix-image.png", alt: "Synoptix AI platform showing its enterprise website, conversational workspace, and observability dashboard" },
      { label: "Evaluation command centre", note: "Monitoring, charts, safety categories, and request-level detail." },
      { label: "Microsoft connections", note: "Identity and service integrations cross the frontend/service boundary." },
    ],
  },
  {
    id: "automotive-inventory-platform",
    number: "04",
    title: "RBCAR Company",
    category: "Frontend Product Development",
    filterTags: ["frontend"],
    role: "Frontend Developer",
    stack: ["Next.js 15", "TypeScript", "REST APIs", "Recharts", "Maps"],
    technologyIds: ["nextjs", "typescript", "react"],
    year: "2026",
    periodLabel: "Current frontend work",
    accent: "#579dff",
    surface: "#0a111a",
    preview: "automotive",
    description: ["RBCAR Company is an API-driven dealership platform containing vehicle inventory, advanced filters, vehicle detail pages, saved vehicles, comparison functionality, dealership maps, location cards, and inventory reporting."],
    problem: "Dealership inventory must remain understandable across a large, changing vehicle catalogue while supporting detailed filtering, comparison, saving, location discovery, and reporting.",
    responsibilities: ["Built responsive, API-integrated Next.js interfaces from design specifications.", "Developed reusable inventory, vehicle-detail, filter, saved-vehicle, comparison, location, map, and reporting views.", "Collaborated with design and backend teams while maintaining reusable frontend architecture."],
    architecture: ["REST inventory source", "Typed frontend data layer", "Filters & result state", "Inventory cards", "Vehicle details", "Saved & comparison views", "Dealership maps", "Reporting visualizations"],
    functionality: ["Advanced vehicle filters", "Inventory and detail pages", "Saved vehicles", "Side-by-side comparison", "Maps and location cards", "Inventory reporting", "Responsive layouts"],
    decisions: ["Reuse one vehicle model across browsing, details, comparisons, maps, and reports.", "Centralize filtering behavior across every inventory surface.", "Isolate map and reporting integrations from core browsing UI.", "Build components suitable for multiple dealership implementations."],
    gallery: [
      {
        label: "Dealership landing page",
        note: "A search-led homepage introduces the dealership and moves customers directly into the available inventory.",
        image: "/rbcar.png",
        alt: "RBCAR Company dealership homepage with vehicle search and used inventory introduction",
      },
      {
        label: "Inventory discovery",
        note: "Advanced filters, vehicle cards, pricing information, and saved-item controls make a large catalogue easier to explore.",
        image: "/rbcar-1.png",
        alt: "RBCAR Company used vehicle inventory page with filters, vehicle cards, pricing, and saved-item controls",
      },
      {
        label: "Dealer locations",
        note: "An interactive map connects customers with dealership locations across South Bend, Warsaw, and Fort Wayne.",
        image: "/rbcar-2.png",
        alt: "RBCAR Company dealership locations page with an interactive regional map and three dealership addresses",
      },
    ],
  },
  {
    id: "homedash",
    number: "05",
    title: "Homedash",
    category: "Responsive Web Application",
    filterTags: ["frontend", "ai-fullstack"],
    role: "Frontend Developer",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST APIs"],
    technologyIds: ["nextjs", "react", "typescript", "tailwind", "supabase", "openai"],
    year: "Live",
    periodLabel: "Selected product project",
    accent: "#7ce0c7",
    surface: "#0a1614",
    preview: "homedash",
    description: ["A production application developed from design specifications with reusable components, responsive layouts, API-integrated user journeys, and consistent frontend architecture."],
    problem: "Multi-tenant property operations span maintenance, tenant communication, leases, and owner reporting, but those workflows need to feel like one coherent responsive product.",
    responsibilities: ["Built responsive application journeys from design specifications.", "Created reusable components and consistent frontend architecture.", "Integrated product APIs and supported multi-tenant property-management workflows.", "Delivered interfaces for maintenance coordination, tenant communication, lease tracking, and owner reporting."],
    architecture: ["Responsive Next.js application", "Tenant-aware product areas", "Application APIs", "Supabase services", "AI-assisted maintenance", "Communication services", "Lease & owner reporting"],
    functionality: ["Multi-tenant property management", "AI-assisted maintenance coordination", "Tenant communication automation", "Lease tracking", "Owner reporting", "Responsive API-integrated journeys"],
    decisions: ["Treat tenant context as a core product boundary.", "Use a shared component foundation across operational workflows.", "Keep external services behind application APIs.", "Maintain consistent behavior across tenant, property, and reporting views."],
    gallery: [
      {
        label: "Product landing experience",
        note: "A clear, responsive introduction to the operating system for self-managing landlords.",
        image: "/homedash.png",
        alt: "HomeDash homepage for self-managing UK landlords",
      },
      {
        label: "Landlord briefing",
        note: "Property-market and regulatory insight presented as a focused editorial report.",
        image: "/homedash-2.png",
        alt: "HomeDash Landlord Briefing page with property market analysis",
      },
      {
        label: "Connected dashboard",
        note: "Compliance, properties, finances, due dates, and AI assistance brought into one operational view.",
        image: "/homedash-3.png",
        alt: "HomeDash dashboard showing compliance, properties, finances, due dates, and an AI assistant",
      },
    ],
  },
  {
    id: "darwaza-ecommerce",
    number: "06",
    title: "Darwaza E-commerce",
    category: "Shopify Development",
    filterTags: ["frontend"],
    role: "E-commerce Developer",
    stack: ["Shopify", "Theme Customization", "Responsive UI"],
    technologyIds: ["shopify", "javascript"],
    year: "2022—24",
    periodLabel: "Karbon Ion project period",
    accent: "#eab36f",
    surface: "#17130d",
    preview: "commerce",
    description: [
      "Darwaza is a modern fashion e-commerce website designed for clothing, accessories, jewellery, and lifestyle products. Its clean responsive interface supports product categories, new-arrival showcases, top-rated products, and detailed product discovery.",
      "The shopping experience includes wishlist functionality, a persistent cart, customer sign-in, checkout and delivery configuration, and mobile-friendly journeys designed to keep browsing and purchasing clear across devices.",
    ],
    problem: "A varied fashion and lifestyle catalogue needed a cohesive storefront that could support editorial merchandising, product discovery, customer accounts, and the full purchasing journey without becoming difficult to navigate on mobile.",
    responsibilities: ["Customized the storefront theme and collection presentation.", "Built responsive category, new-arrival, top-rated, and product-detail experiences.", "Implemented wishlist, cart, customer sign-in, checkout, and delivery flows.", "Delivered store-specific interface improvements across desktop and mobile."],
    architecture: ["Shopify catalogue", "Categories & collections", "Theme sections", "Product details", "Wishlist", "Shopping cart", "Customer account", "Shopify checkout", "Delivery configuration"],
    functionality: ["Fashion and lifestyle categories", "New-arrival and top-rated showcases", "Responsive product details", "Wishlist", "Shopping cart", "Customer sign-in", "Checkout and delivery settings"],
    decisions: ["Extend Shopify’s theme system rather than replacing the commerce platform.", "Use modular merchandising sections across categories and product collections.", "Keep wishlist, cart, and account actions consistently available.", "Retain Shopify-native checkout and delivery configuration.", "Prioritize touch-friendly catalogue browsing on smaller screens."],
    gallery: [
      { label: "New arrivals", note: "An editorial landing experience introduces the latest fashion collection.", image: "/darwaza.png", alt: "Darwaza fashion storefront new arrivals hero section" },
      { label: "Category discovery", note: "Clothing, accessories, jewellery, and new products are organized into clear visual entry points.", image: "/darwaza-1.png", alt: "Darwaza shop-by-category page with clothing, accessories, jewellery, and new-in categories" },
      { label: "Fashion story", note: "Large-format editorial content gives the storefront a distinctive visual identity.", image: "/darwaza-2.png", alt: "Darwaza editorial fashion section displayed beneath the product categories" },
    ],
  },
  {
    id: "sudeshi-ecommerce",
    number: "07",
    title: "Sudeshi E-commerce",
    category: "E-commerce Web Application",
    filterTags: ["frontend"],
    role: "Frontend Developer",
    stack: ["React", "JavaScript", "Responsive UI", "E-commerce UX"],
    technologyIds: ["react", "javascript"],
    year: "Selected",
    periodLabel: "Selected e-commerce project",
    accent: "#b78372",
    surface: "#17110f",
    preview: "commerce",
    description: [
      "Sudeshi is a responsive fashion e-commerce application that combines culturally rooted presentation with a contemporary shopping experience. The storefront uses editorial imagery, clear collection navigation, and focused product discovery to establish a distinct identity.",
      "Reusable catalogue and merchandising patterns keep featured products, categories, sizing, and shopping journeys consistent across desktop and mobile views.",
    ],
    problem: "The fashion catalogue needed to communicate a strong brand identity while keeping product discovery, sizing, and responsive shopping interactions straightforward for customers.",
    responsibilities: ["Built the responsive storefront and reusable merchandising sections.", "Developed featured-product and catalogue presentation patterns.", "Translated the visual identity into consistent navigation, product cards, sizing controls, and responsive layouts.", "Refined the experience for desktop and mobile shopping journeys."],
    architecture: ["Storefront shell", "Collection navigation", "Editorial hero", "Featured products", "Reusable product cards", "Size selection", "Responsive catalogue", "Shopping journey"],
    functionality: ["Editorial fashion landing page", "New-arrival and category navigation", "Featured product catalogue", "Product sizing options", "Responsive product presentation", "Mobile-friendly shopping experience"],
    decisions: ["Let the brand imagery lead without reducing navigation clarity.", "Use reusable catalogue patterns for consistent product presentation.", "Keep sizing and product information close to each purchasing decision.", "Preserve comfortable image proportions across responsive breakpoints."],
    gallery: [
      { label: "Editorial storefront", note: "A heritage-led hero introduces the brand and directs customers into the catalogue.", image: "/sudeshi.png", alt: "Sudeshi fashion e-commerce homepage with Wear Your Roots campaign hero" },
      { label: "Featured products", note: "A structured product catalogue presents pricing and sizing without competing with the imagery.", image: "/sudeshi-1.png", alt: "Sudeshi featured products catalogue with clothing, prices, and size options" },
      { label: "Catalogue continuation", note: "Responsive merchandising patterns carry the visual identity deeper into the shopping experience.", image: "/sudeshi-2.png", alt: "Sudeshi responsive fashion product catalogue section" },
    ],
  },
];
