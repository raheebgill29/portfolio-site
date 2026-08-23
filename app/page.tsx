import Portfolio from "@/components/Portfolio";
import { siteConfig } from "@/data/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: "Frontend Engineer and n8n AI Automation Developer",
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: [siteConfig.links.linkedin, siteConfig.links.github],
  knowsAbout: [
    "Frontend engineering",
    "Next.js",
    "React",
    "TypeScript",
    "n8n workflow automation",
    "AI agents",
    "API orchestration",
  ],
};

export default function Home() {
  return (
    <>
      <Portfolio />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
