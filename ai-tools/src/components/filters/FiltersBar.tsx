"use client";

import { CATEGORIES, type Pricing } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function FiltersBar({
  selectedCategory,
  onSelectCategory,
  selectedPricing,
  onSelectPricing,
}: {
  selectedCategory: string;
  onSelectCategory: (c: string) => void;
  selectedPricing: Pricing | "All";
  onSelectPricing: (p: Pricing | "All") => void;
}) {
  const PRICING: (Pricing | "All")[] = ["All", "free", "freemium", "paid"];

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Category
        </h3>
        <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5">
          {["All", ...CATEGORIES].map((c) => {
            const active = selectedCategory === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => onSelectCategory(c)}
                aria-pressed={active}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors lg:w-full",
                  active
                    ? "bg-stone-900 font-medium text-white dark:bg-white dark:text-stone-900"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <span>{c === "All" ? "All tools" : c}</span>
                {active && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Pricing
        </h3>
        <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-1">
          {PRICING.map((p) => {
            const active = selectedPricing === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onSelectPricing(p)}
                aria-pressed={active}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm capitalize transition-colors",
                  active
                    ? "bg-stone-900 font-medium text-white dark:bg-white dark:text-stone-900"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
                )}
              >
                <span>{p === "All" ? "All" : p}</span>
                {active && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </section>

      <section className="hidden lg:block rounded-lg border border-stone-200 p-5 dark:border-white/10">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
          Have a tool to share?
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          Submissions are free and reviewed by a person.
        </p>
        <a
          href="/submit"
          className="mt-4 inline-flex items-center rounded-md bg-stone-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
        >
          Submit your tool
        </a>
      </section>
    </div>
  );
}
