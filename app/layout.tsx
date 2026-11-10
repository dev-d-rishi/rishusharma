import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/src/components/portfolio/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`h-full antialiased ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg antialiased">
        {children}
      </body>
    </html>
  );
}
