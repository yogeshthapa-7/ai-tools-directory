"use client";

import { useId } from "react";
import { LayoutGrid, List, Table } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "table";

const OPTIONS: { value: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
  { value: "grid", label: "Grid", icon: LayoutGrid },
  { value: "table", label: "Table", icon: Table },
];

export function ViewToggle({
  value,
  onChange,
  className,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
  className?: string;
}) {
  const labelId = useId();

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-stone-200 bg-stone-100/80 p-0.5 dark:border-white/10 dark:bg-white/5",
        className
      )}
    >
      <span id={labelId} className="sr-only">
        View mode
      </span>
      {OPTIONS.map((option) => {
        const active = value === option.value;
        const Icon = option.icon;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${option.label} view`}
            title={`${option.label} view`}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all duration-200 ease-out sm:px-3",
              active
                ? "bg-white text-stone-900 shadow-sm shadow-stone-900/5 dark:bg-stone-800 dark:text-white"
                : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
            )}
          >
            <Icon className={cn("h-3.5 w-3.5 shrink-0", active && "scale-105")} />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
