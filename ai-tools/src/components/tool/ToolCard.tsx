"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, ExternalLink, ArrowUpRight } from "lucide-react";
import { type Tool } from "@/lib/data";
import { cn } from "@/lib/utils";

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
    <div className="group relative flex h-full flex-col rounded-lg border border-stone-200 bg-white p-5 transition-colors hover:border-stone-300 dark:border-white/10 dark:bg-stone-950 dark:hover:border-white/20">
      <Link
        href={`/tools/${tool.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${tool.name}`}
      />

      <div className="relative z-20 mb-4 flex items-start justify-between">
        <div className="relative h-12 w-12 overflow-hidden rounded-md ring-1 ring-stone-900/5 dark:ring-white/10">
          <Image
            src={tool.image}
            alt={tool.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>

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
            <Bookmark
              className={cn("h-4 w-4", bookmarked && "fill-current")}
            />
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
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-base font-medium tracking-tight text-stone-900 dark:text-white">
            {tool.name}
          </h3>
          {tool.featured && (
            <span className="shrink-0 rounded-sm bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600 dark:bg-white/10 dark:text-stone-300">
              Featured
            </span>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
          {tool.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
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
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 dark:border-white/5">
        <span className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium capitalize text-stone-600 dark:bg-white/10 dark:text-stone-300">
          {tool.pricing}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-stone-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-stone-400">
          View
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
