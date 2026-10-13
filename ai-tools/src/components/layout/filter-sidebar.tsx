"use client";

import { useState } from "react";
import { CATEGORIES, type Pricing } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  Tag,
  Sparkles,
  Zap,
  ShieldCheck,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Bookmark,
  ArrowRight,
  Code2,
  PenLine,
  Brain,
  MessageSquare,
  Image as ImageIcon,
  Globe,
  Wallet,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const CATEGORY_ICONS: Record<string, typeof Layers> = {
  "All tools": LayoutGrid,
  "Content Generation": PenLine,
  "Developer Tools": Code2,
  Design: ImageIcon,
  Research: Brain,
  Productivity: Zap,
  Education: MessageSquare,
  "AI Assistants": Sparkles,
  Automation: RefreshCw,
  "Web Tools": Globe,
  Finance: Wallet,
};

const PRICING_ICONS: Record<string, typeof Tag> = {
  All: LayoutGrid,
  free: Tag,
  freemium: Sparkles,
  paid: ShieldCheck,
};

function Option({
  label,
  icon: Icon,
  active,
  collapsed,
  onClick,
}: {
  label: string;
  icon?: typeof Layers;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg text-sm transition-all duration-200",
        collapsed ? "justify-center px-0 py-3" : "px-3 py-2.5",
        active
          ? "bg-stone-900 font-medium text-white shadow-sm shadow-stone-900/10 dark:bg-white dark:text-stone-900 dark:shadow-white/10"
          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-4 w-4 shrink-0 transition-colors",
            active
              ? "text-current"
              : "text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300"
          )}
        />
      )}
      {!collapsed && <span className="truncate">{label}</span>}
      {!collapsed && active && (
        <Check className="ml-auto h-3.5 w-3.5 shrink-0" />
      )}
    </button>
  );
}

function Section({
  title,
  icon: Icon,
  collapsed,
  children,
}: {
  title: string;
  icon: typeof Layers;
  collapsed: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400"
          title={title}
        >
          <Icon className="h-4 w-4" />
        </div>
        {children}
      </div>
    );
  }

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mb-2 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors hover:bg-stone-100 dark:hover:bg-white/10"
      >
        <Icon className="h-4 w-4 text-stone-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          {title}
        </span>
        <ChevronRight
          className={cn(
            "ml-auto h-3.5 w-3.5 text-stone-400 transition-transform duration-300",
            open ? "rotate-90" : "rotate-0"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1.5">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function FilterSidebar({
  collapsed,
  onToggleCollapse,
  selectedCategory,
  onSelectCategory,
  selectedPricing,
  onSelectPricing,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  selectedCategory: string;
  onSelectCategory: (c: string) => void;
  selectedPricing: Pricing | "All";
  onSelectPricing: (p: Pricing | "All") => void;
}) {
  const PRICING: (Pricing | "All")[] = ["All", "free", "freemium", "paid"];

  return (
    <div
      className={cn(
        "flex h-full flex-col transition-all duration-300 ease-out",
        collapsed ? "w-24" : "w-80"
      )}
    >
      {/* Header with professional collapse toggle */}
      <div className="flex items-center justify-between px-4 pb-5 pt-2">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 dark:bg-white">
              <SlidersHorizontal className="h-4 w-4 text-white dark:text-stone-900" />
            </div>
            <span className="text-sm font-semibold text-stone-900 dark:text-white">
              Filters
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 text-stone-500 transition-all duration-200 hover:border-stone-300 hover:bg-stone-100 hover:text-stone-700 dark:border-white/10 dark:text-stone-400 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-stone-200",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-5 border-t border-stone-200 dark:border-white/10" />

      {/* Sections */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        <Section title="Category" icon={Layers} collapsed={collapsed}>
          <Option
            label="All tools"
            icon={CATEGORY_ICONS["All tools"]}
            active={selectedCategory === "All"}
            collapsed={collapsed}
            onClick={() => onSelectCategory("All")}
          />
          {CATEGORIES.map((c) => (
            <Option
              key={c}
              label={c}
              icon={CATEGORY_ICONS[c] || Layers}
              active={selectedCategory === c}
              collapsed={collapsed}
              onClick={() => onSelectCategory(c)}
            />
          ))}
        </Section>

        <Section title="Pricing" icon={Tag} collapsed={collapsed}>
          {PRICING.map((p) => (
            <Option
              key={p}
              label={p === "All" ? "All pricing" : p}
              icon={PRICING_ICONS[p] || Tag}
              active={selectedPricing === p}
              collapsed={collapsed}
              onClick={() => onSelectPricing(p)}
            />
          ))}
        </Section>
      </div>

      {/* Submit CTA */}
      {!collapsed && (
        <div className="px-4 pb-4">
          <Card
            as="a"
            href="/submit"
            hover
            radius="lg"
            className="block p-4"
          >
            <p className="text-sm font-medium text-stone-900 dark:text-white">
              Have a tool to share?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
              Submissions are free and reviewed by a person.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-stone-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200">
              Submit your tool
              <ArrowRight className="h-3 w-3" />
            </span>
          </Card>
        </div>
      )}
    </div>
  );
}
