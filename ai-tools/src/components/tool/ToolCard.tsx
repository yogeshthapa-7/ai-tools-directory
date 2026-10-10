"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, ExternalLink, ArrowRight } from "lucide-react";
import { type Tool } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export function ToolCard({
  tool,
  bookmarked,
  onToggleBookmark,
}: {
  tool: Tool;
  bookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}) {
  return (
    <Card
      hover
      radius="lg"
      className="group relative flex items-start gap-4 p-5"
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="absolute inset-0 z-10 rounded-lg"
        aria-label={`View details for ${tool.name}`}
      />

      <div className="relative z-20 h-14 w-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-stone-900/5 transition-transform duration-300 group-hover:scale-105 dark:ring-white/10">
        <Image
          src={tool.image}
          alt={tool.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      <div className="relative z-20 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold tracking-tight text-stone-900 transition-colors group-hover:text-stone-700 dark:text-white dark:group-hover:text-stone-200">
            {tool.name}
          </h3>
          {tool.featured && (
            <span className="rounded-sm bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-600 dark:bg-white/10 dark:text-stone-300">
              Featured
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          {tool.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {tool.categories.slice(0, 2).map((c) => (
            <span
              key={c}
              className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:bg-white/10 dark:text-stone-300"
            >
              {c}
            </span>
          ))}
          {tool.categories.length > 2 && (
            <span className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-500 dark:bg-white/10 dark:text-stone-400">
              +{tool.categories.length - 2}
            </span>
          )}
          <span className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium capitalize text-stone-600 dark:bg-white/10 dark:text-stone-300">
            {tool.pricing}
          </span>
        </div>
      </div>

      <div className="relative z-20 flex shrink-0 flex-col items-end gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleBookmark?.(tool.id);
            }}
            className={cn(
              "rounded-md p-1.5 transition-colors",
              bookmarked
                ? "text-stone-900 dark:text-white"
                : "text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            )}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
            aria-pressed={bookmarked}
          >
            <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
          </button>
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-md p-1.5 text-stone-400 transition-colors hover:text-stone-700 dark:hover:text-stone-200"
            aria-label={`Visit ${tool.name} website`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <span className="hidden items-center gap-1.5 text-xs font-medium text-stone-500 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-stone-400 sm:flex">
          View details
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Card>
  );
}
