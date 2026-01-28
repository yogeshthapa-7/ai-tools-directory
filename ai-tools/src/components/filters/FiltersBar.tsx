"use client";

import { CATEGORIES, type Pricing } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Filter, Layers, DollarSign, ChevronRight, Sparkles, TrendingUp, Grid3X3, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FiltersBar({
  selectedCategory,
  onSelectCategory,
  selectedPricing,
  onSelectPricing,
}: {
  selectedCategory: string;
  onSelectCategory: (c: string) => void;
  selectedPricing: Pricing | "All";
  onSelectPricing: (p: Pricing | "All") => void;
}) {
  const PRICING: (Pricing | "All")[] = ["All", "free", "freemium", "paid"];

  const pricingColors = {
    "All": "from-zinc-600 to-zinc-700",
    "free": "from-emerald-600 to-teal-600",
    "freemium": "from-blue-600 to-cyan-600",
    "paid": "from-purple-600 to-pink-600",
  };

  const pricingIcons = {
    "All": Grid3X3,
    "free": Sparkles,
    "freemium": TrendingUp,
    "paid": DollarSign,
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
            Categories
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory("All")}
            className={cn(
              "group relative flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 lg:w-full overflow-hidden",
              selectedCategory === "All"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/25"
                : "bg-white dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
            )}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              All Tools
            </span>
            <ChevronRight className={cn(
              "hidden h-4 w-4 lg:block transition-all duration-300",
              selectedCategory === "All" ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
            )} />

            {selectedCategory === "All" && (
              <motion.div
                layoutId="category-indicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>

          {CATEGORIES.map((c, index) => {
            const Icon = pricingIcons["All"]; // You can customize icons per category
            return (
              <motion.button
                key={c}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategory(c)}
                className={cn(
                  "group relative flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 lg:w-full overflow-hidden",
                  selectedCategory === c
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/25"
                    : "bg-white dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                )}
              >
                <span className="relative z-10">{c}</span>
                <ChevronRight className={cn(
                  "hidden h-4 w-4 lg:block transition-all duration-300",
                  selectedCategory === c ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                )} />

                {selectedCategory === c && (
                  <motion.div
                    layoutId="category-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      {/* Pricing Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
            Pricing
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {PRICING.map((p, index) => {
            const Icon = pricingIcons[p];
            const gradient = pricingColors[p];

            return (
              <motion.button
                key={p}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPricing(p)}
                className={cn(
                  "group relative rounded-xl px-4 py-3 text-sm font-bold capitalize transition-all duration-300 overflow-hidden",
                  selectedPricing === p
                    ? `bg-gradient-to-r ${gradient} text-white shadow-xl`
                    : "bg-white dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/70 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700"
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Icon className="h-4 w-4" />
                  {p}
                </span>

                {selectedPricing === p && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 h-5 w-5 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Divider */}
      <div className="hidden lg:block h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      {/* Featured CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden lg:block relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 text-white shadow-2xl shadow-indigo-500/30"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl" />
        <motion.div
          className="absolute top-1/2 left-1/2 h-24 w-24 rounded-full bg-pink-500/20 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-xs font-black uppercase tracking-widest">Featured</span>
          </div>

          <div>
            <h4 className="text-xl font-black leading-tight mb-2">
              List Your AI Tool
            </h4>
            <p className="text-sm text-indigo-100 font-medium leading-relaxed">
              Join 500+ developers showcasing their tools to 50k+ monthly users.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-xl bg-white py-3 text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl shadow-black/10 transition-all hover:shadow-2xl relative overflow-hidden group"
          >
            <span className="relative z-10">Submit Your Tool</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 group-hover:from-white group-hover:to-white transition-all" />
          </motion.button>

          <div className="flex items-center gap-3 text-xs text-indigo-100">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free listing</span>
            </div>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Instant approval</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section (Optional) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="hidden lg:grid grid-cols-2 gap-3"
      >
        <div className="rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-800/50 p-4 border border-zinc-200/60 dark:border-zinc-800/60">
          <div className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            500+
          </div>
          <div className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
            AI Tools
          </div>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-800/50 p-4 border border-zinc-200/60 dark:border-zinc-800/60">
          <div className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            50k+
          </div>
          <div className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
            Monthly Users
          </div>
        </div>
      </motion.div>
    </div>
  );
}