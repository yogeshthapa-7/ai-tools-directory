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
    "border border-stone-200 bg-white dark:border-white/10 dark:bg-stone-950",
  elevated:
    "border border-stone-200 bg-white shadow-sm shadow-stone-900/5 dark:border-white/10 dark:bg-stone-950 dark:shadow-black/20",
  outlined:
    "border border-stone-300 bg-transparent dark:border-white/20",
  glass:
    "border border-stone-200/60 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-white/5",
};

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
          radiusMap[radius],
          variants[variant],
          hover &&
            "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-md hover:shadow-stone-900/5 hover:border-stone-300 dark:hover:border-white/20 dark:hover:shadow-black/30",
          className
        )}
        {...props}
      />
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
      className={cn("text-base font-semibold tracking-tight text-stone-900 dark:text-white", className)}
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
      className={cn("text-sm leading-relaxed text-stone-600 dark:text-stone-300", className)}
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
      className={cn("flex items-center border-t border-stone-100 p-5 pt-4 dark:border-white/5", className)}
      {...props}
    />
  );
}
