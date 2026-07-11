import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BoatCursor } from "@/src/components/portfolio/BoatCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishu Sharma | React Native Developer",
  description: "High-performance React Native developer portfolio.",
  icons: {
    icon: [
      { url: "/assets/images/Tsunami.jpg", type: "image/jpeg" },
    ],
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
        <BoatCursor />
      </body>
    </html>
  );
}
