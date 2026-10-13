import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavigationBar } from "@/components/layout/navigationbar";
import { BackgroundDesign } from "@/components/shared/background-design";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Forge | The Ultimate AI Tools Directory",
  description: "Discover the best artificial intelligence tools to boost your productivity, creativity, and development workflow. Curated list of top-rated AI solutions.",
  keywords: ["AI tools", "Artificial Intelligence", "AI Directory", "Productivity Tools", "AI for Developers"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundDesign />
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
