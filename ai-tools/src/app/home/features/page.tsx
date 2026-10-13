"use client";

import { FeaturesRow } from "@/components/home/features-row";

export const metadata = {
  title: "Features — AI Forge",
  description: "What the AI Forge directory gives you.",
};

export default function FeaturesPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 w-full max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
          Features
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
          What this directory gives you
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
          Most AI directories are little more than a link dump with a
          search box bolted on. This one is built around a different
          idea: you should be able to tell, in seconds, whether a tool
          is worth your time. These are the things that make that
          possible — the features we care about, and why they exist.
        </p>
      </div>
      <div className="w-full">
        <FeaturesRow showHeader={false} />
      </div>
    </main>
  );
}
