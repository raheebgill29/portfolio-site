export const siteConfig = {
  name: "Raheeb ur Rehman",
  initials: "RR",
  role: "Frontend Engineer × n8n AI Automation Developer",
  headline:
    "I build polished digital products and automate the systems behind them.",
  introduction:
    "I combine modern frontend engineering, APIs, cloud infrastructure, AI, and n8n to create products that look exceptional and workflows that operate reliably.",
  location: "Lahore, Pakistan",
  availability:
    "Available for frontend, full-stack, and automation opportunities",
  email: "raheebrehman29@gmail.com",
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  },
  links: {
    github: "https://github.com/raheebgill29",
    linkedin: "https://www.linkedin.com/in/raheeb-gill",
    resume: "/Raheeb ur-Rehman-Resume.pdf",
  },
} as const;

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Automation", href: "#automation" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;
