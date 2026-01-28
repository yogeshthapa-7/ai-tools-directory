"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, ExternalLink, Star, ArrowUpRight, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { type Tool } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ToolCard({ tool, bookmarked, onToggleBookmark }: {
  tool: Tool;
  bookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <Link href={`/tools/${tool.slug}`} className="block h-full">
        <div
          className={cn(
            "relative h-full overflow-hidden rounded-[1.75rem] border transition-all duration-500",
            "bg-white dark:bg-zinc-900",
            "border-zinc-200/60 dark:border-zinc-800/60",
            "shadow-lg shadow-zinc-900/[0.03] dark:shadow-black/20",
            "hover:shadow-2xl hover:shadow-zinc-900/[0.08] dark:hover:shadow-black/40",
            "hover:border-indigo-300/50 dark:hover:border-indigo-700/50",
            "backdrop-blur-sm"
          )}
        >
          {/* Background Gradient Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] transition-opacity duration-500" />
          
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={isHovered ? { translateX: "200%" } : { translateX: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="relative p-6 flex flex-col h-full">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-5">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative h-16 w-16 overflow-hidden rounded-2xl shadow-lg shadow-zinc-900/10 dark:shadow-black/30 ring-1 ring-zinc-900/5 dark:ring-white/10"
                >
                  <Image
                    src={tool.image} 
                    alt={tool.name} 
                    fill 
                    sizes="64px" 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </motion.div>
                
                {/* Featured Badge on Logo */}
                {tool.featured && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 h-7 w-7 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
                  >
                    <Star className="h-3.5 w-3.5 fill-white text-white" />
                  </motion.div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleBookmark?.(tool.id);
                  }}
                  className={cn(
                    "rounded-xl p-2 transition-all duration-300",
                    bookmarked 
                      ? "text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-md shadow-amber-500/10" 
                      : "text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                  )}
                  aria-label="Bookmark"
                >
                  <Bookmark className={cn("h-4.5 w-4.5 transition-all", bookmarked && "fill-current")} />
                </motion.button>
                
                <motion.a 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={tool.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-xl p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-300"
                  aria-label="Visit website"
                >
                  <ExternalLink className="h-4.5 w-4.5" />
                </motion.a>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {tool.name}
                  </h3>
                  {tool.featured && (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-500 ring-1 ring-inset ring-amber-500/20 shrink-0">
                      Hot
                    </span>
                  )}
                </div>
                
                <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                  {tool.shortDescription}
                </p>
              </div>

              {/* Tags Section */}
              <div className="flex flex-wrap items-center gap-1.5">
                {tool.categories.slice(0, 2).map((c) => (
                  <span 
                    key={c} 
                    className="rounded-lg bg-zinc-100 dark:bg-zinc-800/70 px-2.5 py-1 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-all group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/30 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 group-hover:scale-105"
                  >
                    {c}
                  </span>
                ))}
                {tool.categories.length > 2 && (
                  <span className="rounded-lg bg-zinc-100 dark:bg-zinc-800/70 px-2.5 py-1 text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                    +{tool.categories.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Footer Section */}
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "rounded-lg px-2.5 py-1 text-[11px] font-black uppercase tracking-wider transition-all",
                  tool.pricing === "free" && "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500/20",
                  tool.pricing === "freemium" && "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 ring-1 ring-blue-500/20",
                  tool.pricing === "paid" && "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 ring-1 ring-purple-500/20"
                )}>
                  {tool.pricing}
                </div>
              </div>
              
              <motion.div
                className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                animate={isHovered ? { x: [0, 4, 0] } : { x: 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <span className="text-xs">Explore</span>
                <ArrowUpRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>

          {/* Hover Border Glow */}
          <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-indigo-500/0 group-hover:ring-indigo-500/20 dark:group-hover:ring-indigo-400/20 transition-all duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}