import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { siteUrl } from "@/src/components/portfolio/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const title = "Rishu Sharma | Independent Mobile Engineer";
const description =
  "Independent mobile engineer specialising in React Native & mobile app development. 3+ years of experience building production-ready apps for iOS and Android — from feature development to integrations and app releases. Available for freelance projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "React Native Developer",
    "Senior React Native Developer",
    "React Native Developer India",
    "Mobile App Developer",
    "React Native iOS Android",
    "React Native Developer",
    "Mobile Application Engineer",
    "TypeScript Developer",
    "React Native Expo",
    "React Native Firebase",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${display.variable} ${body.variable}`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg antialiased">
        {children}
      </body>
    </html>
  );
}
