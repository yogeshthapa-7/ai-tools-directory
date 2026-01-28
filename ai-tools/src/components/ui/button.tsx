"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gradient" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  icon?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    icon,
    children,
    disabled,
    ...props
  }, ref) => {
    // Omit motion props from props to avoid type mismatch with motion.button
    const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...buttonProps } = props as any;
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2 font-bold transition-all duration-300",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
      "relative overflow-hidden group"
    );

    const variants = {
      primary: cn(
        "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25",
        "hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30",
        "active:scale-95",
        "focus-visible:ring-indigo-500"
      ),
      secondary: cn(
        "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-md",
        "hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:shadow-lg",
        "active:scale-95",
        "focus-visible:ring-zinc-400"
      ),
      ghost: cn(
        "bg-transparent text-zinc-700 dark:text-zinc-300",
        "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        "active:scale-95",
        "focus-visible:ring-zinc-400"
      ),
      outline: cn(
        "border-2 border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 dark:text-white",
        "hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50",
        "active:scale-95",
        "focus-visible:ring-zinc-400"
      ),
      gradient: cn(
        "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-indigo-500/25",
        "hover:shadow-2xl hover:shadow-indigo-500/30 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700",
        "active:scale-95",
        "focus-visible:ring-indigo-500"
      ),
      danger: cn(
        "bg-rose-600 text-white shadow-lg shadow-rose-500/25",
        "hover:bg-rose-700 hover:shadow-xl hover:shadow-rose-500/30",
        "active:scale-95",
        "focus-visible:ring-rose-500"
      ),
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-lg",
      md: "h-11 px-5 text-sm rounded-xl",
      lg: "h-12 px-6 text-base rounded-xl",
      icon: "h-10 w-10 rounded-xl",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...buttonProps}
      >
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : icon ? (
            icon
          ) : null}
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";