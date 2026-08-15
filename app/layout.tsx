import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const title = "Rishu Sharma | Senior React Native Engineer";
const description =
  "Senior React Native Engineer with 3+ years building cross-platform mobile apps for Android and iOS. Experienced in TypeScript, Redux Toolkit, Firebase, REST APIs, and App Store / Play Store deployment. Open to remote opportunities.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "React Native Developer",
    "Senior React Native Engineer",
    "React Native Developer India",
    "Mobile App Developer",
    "React Native iOS Android",
    "React Native Engineer",
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
  icons: {
    icon: [{ url: "/assets/images/Tsunami.jpg", type: "image/jpeg" }],
    shortcut: "/assets/images/Tsunami.jpg",
    apple: "/assets/images/Tsunami.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`min-h-full flex flex-col antialiased ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
