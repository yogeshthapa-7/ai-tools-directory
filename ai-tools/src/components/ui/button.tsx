"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  icon?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2 font-medium",
      "transition-all duration-200 ease-out",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
    );

    const variants = {
      primary: cn(
        "bg-stone-900 text-white shadow-sm shadow-stone-900/10",
        "hover:bg-stone-700 hover:shadow-md hover:shadow-stone-900/15",
        "active:scale-[0.98]",
        "dark:bg-white dark:text-stone-900 dark:shadow-sm dark:shadow-black/10",
        "dark:hover:bg-stone-200 dark:hover:shadow-md dark:hover:shadow-black/15",
        "focus-visible:ring-stone-400"
      ),
      secondary: cn(
        "bg-stone-100 text-stone-900 shadow-sm shadow-stone-900/5",
        "hover:bg-stone-200 hover:shadow-md hover:shadow-stone-900/10",
        "active:scale-[0.98]",
        "dark:bg-white/10 dark:text-white dark:shadow-none",
        "dark:hover:bg-white/15",
        "focus-visible:ring-stone-400"
      ),
      ghost: cn(
        "bg-transparent text-stone-600",
        "hover:bg-stone-100 hover:text-stone-900",
        "active:scale-[0.98]",
        "dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white",
        "focus-visible:ring-stone-400"
      ),
      outline: cn(
        "border border-stone-300 bg-transparent text-stone-700",
        "hover:border-stone-400 hover:bg-stone-50 hover:text-stone-900",
        "active:scale-[0.98]",
        "dark:border-white/15 dark:text-stone-200",
        "dark:hover:border-white/30 dark:hover:bg-white/5 dark:hover:text-white",
        "focus-visible:ring-stone-400"
      ),
      danger: cn(
        "bg-stone-900 text-white shadow-sm shadow-stone-900/10",
        "hover:bg-stone-700 hover:shadow-md hover:shadow-stone-900/15",
        "active:scale-[0.98]",
        "focus-visible:ring-stone-400"
      ),
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-md",
      md: "h-10 px-4 text-sm rounded-md",
      lg: "h-12 px-6 text-sm rounded-lg",
      icon: "h-10 w-10 rounded-md",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
