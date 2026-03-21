import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishu Sharma | React Native Developer",
  description: "High-performance React Native developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
