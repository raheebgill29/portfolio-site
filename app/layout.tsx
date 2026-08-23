import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Raheeb-ur Rehman — Frontend Engineer & n8n Automation Developer",
    template: "%s — Raheeb-ur Rehman",
  },
  description:
    "Frontend engineering, AI products, and reliable n8n automation systems by Raheeb-ur Rehman in Lahore, Pakistan.",
  keywords: [
    "Frontend Engineer",
    "n8n Automation Developer",
    "Next.js Developer",
    "React Developer",
    "AI Automation",
    "Pakistan",
    "Remote",
  ],
  authors: [{ name: "Raheeb-ur Rehman" }],
  creator: "Raheeb-ur Rehman",
  category: "technology",
  openGraph: {
    title: "Raheeb-ur Rehman — Frontend & n8n Automation",
    description:
      "Polished digital products and the automation systems operating behind them.",
    type: "website",
    locale: "en_US",
    siteName: "Raheeb-ur Rehman",
    images: [
      {
        url: "/og.png",
        width: 1732,
        height: 909,
        alt: "Raheeb-ur Rehman — Frontend Engineer and n8n AI Automation Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raheeb-ur Rehman — Frontend & n8n Automation",
    description:
      "Polished digital products and the automation systems operating behind them.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
