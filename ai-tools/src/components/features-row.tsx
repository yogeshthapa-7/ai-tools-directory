"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Zap,
  Layers,
  Tag,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Search,
    title: "Instant search",
    body: "Type a name, a description, or a tag and the directory narrows the results as you type. No separate search page, no waiting for a server round-trip — what matches is always in front of you, the moment you start typing.",
  },
  {
    icon: SlidersHorizontal,
    title: "Real filters",
    body: "Category and pricing filters that actually work. Narrow by what a tool does and what it costs, and watch the list update instantly. Every button on this page is wired to something — there are no dead controls here.",
  },
  {
    icon: Bookmark,
    title: "Personal shortlist",
    body: "Bookmark tools as you browse and find them again on the Bookmarks page. Your list lives in your own browser — no account, no sign-up, no tracking. What you save is yours, and it stays put.",
  },
  {
    icon: ShieldCheck,
    title: "No sponsors",
    body: "Nothing here is paid for. Tools are listed because they are useful, in the order that makes sense for you — not for whoever paid the most. The directory is free to use and free of sponsored placements.",
  },
  {
    icon: RefreshCw,
    title: "Kept current",
    body: "Listings are reviewed and refreshed on a regular basis, so broken links and abandoned projects get flagged and removed. What you see is what you can actually use today, not what was true a year ago.",
  },
  {
    icon: Zap,
    title: "Fast by design",
    body: "No heavy animation frameworks, no bloated scripts, no layout thrash. The list renders instantly and filters feel immediate, because the page is built to stay light even as the directory grows.",
  },
  {
    icon: Layers,
    title: "Honest categories",
    body: "Every tool is filed under a real category based on what it does, not on marketing copy. You can browse by task — writing, coding, design, research — and trust that the grouping is meaningful.",
  },
  {
    icon: Tag,
    title: "Clear pricing",
    body: "Free, freemium, or paid — marked on every card before you ever click through. You can filter by budget and know exactly what a tool costs before you open its website.",
  },
  {
    icon: Sparkles,
    title: "Curated, not scraped",
    body: "Each listing is hand-picked and written by a person who actually looked at the tool. No auto-generated descriptions, no keyword-stuffed pages — just an honest take on what the tool is good for.",
  },
  {
    icon: ArrowRight,
    title: "Open submissions",
    body: "Built something worth sharing? Add it to the directory for free. Submissions are read by a person and go live once they fit the directory's standards — no paid priority, no waiting list.",
  },
];

export function FeaturesRow({ showHeader = true }: { showHeader?: boolean }) {
  const [paused, setPaused] = useState(false);

  const row = (
    <div className="flex w-max items-stretch gap-4">
      {[...FEATURES, ...FEATURES].map((f, i) => {
        const Icon = f.icon;
        return (
            <Card
            key={`${f.title}-${i}`}
            hover
            radius="lg"
            className="h-[320px] w-[340px] shrink-0 p-6"
          >
            <Icon className="h-5 w-5 text-stone-500 dark:text-stone-400" />
            <h3 className="mt-3 text-base font-medium text-stone-900 dark:text-white">
              {f.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              {f.body}
            </p>
          </Card>
        );
      })}
    </div>
  );

  return (
    <section className="mt-28 overflow-hidden">
      {showHeader && (
        <div className="mb-8 max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
            Features
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
            What this directory gives you
          </h2>
          <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
            Most AI directories are little more than a link dump
            with a search box bolted on. This one is built around
            a different idea: you should be able to tell, in
            seconds, whether a tool is worth your time. These are
            the features that make that possible.
          </p>
        </div>
      )}

      <div
        className={cn(
          "group relative",
          paused ? "" : "animate-scroll-x"
        )}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-stone-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-stone-950" />
        {row}
      </div>

      <style jsx>{`
        @keyframes scrollX {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-x {
          animation: scrollX 40s linear infinite;
        }
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
