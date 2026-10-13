"use client";

import { AboutSelector } from "@/components/home/about-selector";

export const metadata = {
  title: "About — AI Forge",
  description: "A closer look at the tools inside the AI Forge directory.",
};

export default function AboutPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <AboutSelector />
    </main>
  );
}
