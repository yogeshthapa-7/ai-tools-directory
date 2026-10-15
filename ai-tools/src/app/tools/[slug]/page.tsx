"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Tag,
  Check,
  Copy,
  Share2,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import { TOOLS } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { PearlButton } from "@/components/ui/pearl-button";
import { cn } from "@/lib/utils";

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tool = TOOLS.find((t) => t.slug === slug);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!tool) {
    notFound();
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: tool.name,
        text: tool.shortDescription,
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen text-stone-900 dark:text-stone-100 selection:bg-stone-500/30">
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <Link
          href="/directory"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Directory
        </Link>

        <Card radius="xl" className="mt-6 p-8 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-stone-900/5 dark:ring-white/10">
              <Image src={tool.image} alt={tool.name} fill className="object-cover" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
                  {tool.name}
                </h1>
                {tool.featured && (
                  <span className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-stone-600 dark:bg-white/10 dark:text-stone-300">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-2 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
                {tool.shortDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {tool.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:bg-white/10 dark:text-stone-300"
                  >
                    {c}
                  </span>
                ))}
                <span className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium capitalize text-stone-600 dark:bg-white/10 dark:text-stone-300">
                  {tool.pricing}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2.5 lg:items-end">
<PearlButton 
  label="Visit Website" 
  href={tool.website} 
  variant="primary"
  size="sm"
/>
              <div className="flex gap-2">
<PearlButton
  label={bookmarked ? "Remove bookmark" : "Bookmark"}
  onClick={() => setBookmarked((v) => !v)}
  variant="outline"
  size="xs"
  className="w-full"
  aria-pressed={bookmarked}
  aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
>
  <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
</PearlButton>
<PearlButton
  label="Share"
  onClick={handleShare}
  variant="outline"
  size="xs"
  className="w-full"
  aria-label="Share"
>
  <Share2 className="h-4 w-4" />
</PearlButton>
<PearlButton
  label={copied ? "Copied!" : "Copy Link"}
  onClick={handleCopyLink}
  variant="outline"
  size="xs"
  className="w-full"
  aria-label="Copy link"
>
  {copied ? (
    <Check className="h-4 w-4 text-stone-900 dark:text-white" />
  ) : (
    <Copy className="h-4 w-4" />
  )}
</PearlButton>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card radius="lg" className="p-6 sm:p-8">
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-stone-900 dark:text-white">
                About {tool.name}
              </h2>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {tool.description}
              </p>
            </Card>

            {tool.screenshots && tool.screenshots.length > 0 && (
              <Card radius="lg" className="p-6 sm:p-8">
                <h2 className="mb-4 text-xl font-semibold tracking-tight text-stone-900 dark:text-white">
                  Screenshots
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {tool.screenshots.map((s, i) => (
                    <div
                      key={i}
                      className="group relative aspect-video overflow-hidden rounded-lg ring-1 ring-stone-900/5 dark:ring-white/10"
                    >
                      <Image
                        src={s}
                        alt={`${tool.name} screenshot ${i + 1}`}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute bottom-3 left-3 text-sm font-medium text-white">
                          Screenshot {i + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card radius="lg" className="sticky top-24 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                <Globe className="h-4 w-4" />
                Details
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-stone-50 p-3.5 dark:bg-white/5">
                  <p className="mb-1 text-xs font-medium text-stone-500 dark:text-stone-400">
                    Pricing
                  </p>
                  <p className="text-sm font-semibold capitalize text-stone-900 dark:text-white">
                    {tool.pricing}
                  </p>
                </div>
                <div className="rounded-lg bg-stone-50 p-3.5 dark:bg-white/5">
                  <p className="mb-1 text-xs font-medium text-stone-500 dark:text-stone-400">
                    Website
                  </p>
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 truncate text-sm font-medium text-stone-900 hover:underline dark:text-white"
                  >
                    {new URL(tool.website).hostname}
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </div>
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-1.5 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
              >
                Get Started
                <ChevronRight className="h-4 w-4" />
              </a>
            </Card>

            <Card radius="lg" className="p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                <Tag className="h-4 w-4" />
                Categories & Tags
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:bg-white/10 dark:text-stone-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium text-stone-500 dark:text-stone-400">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:bg-white/10 dark:text-stone-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card radius="lg" className="p-6">
              <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                <Share2 className="h-4 w-4" />
                Share
              </h3>
              <p className="mb-4 text-sm text-stone-600 dark:text-stone-300">
                Found this useful? Share it with your network.
              </p>
<div className="flex gap-2 mt-3">
              <PearlButton
                label="Share"
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="flex-1"
              />
              <PearlButton
                label={copied ? "Copied!" : "Copy Link"}
                onClick={handleCopyLink}
                variant="outline"
                size="sm"
                className="flex-1"
              />
            </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
