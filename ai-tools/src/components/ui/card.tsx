"use client";

import {
  HTMLAttributes,
  AnchorHTMLAttributes,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";

export type CardProps = HTMLAttributes<HTMLDivElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "default" | "elevated" | "outlined" | "glass";
    radius?: "sm" | "md" | "lg" | "xl";
    hover?: boolean;
    as?: "div" | "section" | "article" | "aside" | "a";
  };

const radiusMap = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
};

const variants = {
    default:
      "",
    elevated:
      "",
    outlined:
      "bg-gradient-to-br from-gray-800/90 via-white/45 to-gray-800/90 dark:from-gray-900/90 dark:via-white/25 dark:to-gray-900/90",
    glass:
      "bg-gradient-to-br from-gray-800/70 via-white/35 to-gray-800/70 dark:from-gray-900/70 dark:via-white/15 dark:to-gray-900/70",
  };

const cardBase =
    "relative overflow-hidden border border-white/15 dark:border-white/10 " +
    "drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] " +
    "transition-all duration-200 ease-out " +
    "bg-gradient-to-br from-gray-800 via-white/50 to-gray-800";

const hoverStyles =
  "hover:-translate-y-1 hover:scale-[1.02] " +
  "drop-shadow-[0_6px_14px_-2px_rgba(0,0,0,0.55),0_2px_4px_rgba(0,0,0,0.4)] " +
  "hover:border-white/25 dark:hover:border-white/15";

export const Card = forwardRef<HTMLDivElement & HTMLAnchorElement, CardProps>(
  (
    {
      className,
      variant = "default",
      radius = "lg",
      hover = false,
      as = "div",
      ...props
    },
    ref
  ) => {
    const Tag = as;
    return (
      <Tag
        ref={ref}
        className={cn(
          cardBase,
          variants[variant],
          radiusMap[radius],
          hover && hoverStyles,
          className
        )}
        {...props}
      >
        {hover && <span className="card-shine" aria-hidden="true" />}
        {/* Neon accent effect - only show on hover to reduce performance impact */}
        {hover && (
          <span className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-neon-shift" aria-hidden="true"></span>
        )}
        {props.children}
      </Tag>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-5 pb-0", className)} {...props} />
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-base font-semibold tracking-tight text-white dark:text-stone-900",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed text-slate-200 dark:text-stone-600",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center border-t border-stone-100 p-5 pt-4 dark:border-white/5",
        className
      )}
      {...props}
    />
  );
}