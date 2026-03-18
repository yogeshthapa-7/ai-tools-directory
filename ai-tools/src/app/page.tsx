"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, TrendingUp, Grid2X2, Zap, Filter, X, SlidersHorizontal, ArrowRight } from "lucide-react";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { ToolCard } from "@/components/tool/ToolCard";
import { TOOLS, type Pricing } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPricing, setSelectedPricing] = useState<Pricing | "All">("All");
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        selectedCategory === "All" || tool.categories.includes(selectedCategory);
      const matchesPricing =
        selectedPricing === "All" || tool.pricing === selectedPricing;
      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [search, selectedCategory, selectedPricing]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-zinc-950 dark:via-slate-900 dark:to-indigo-950/20 text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30">
      <main className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative mb-20 text-center">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 px-5 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-8 ring-1 ring-inset ring-indigo-500/20 shadow-lg shadow-indigo-500/10"
          >
            <Sparkles className="h-4 w-4" />
            <span>Discover 500+ AI-Powered Tools</span>
            <Zap className="h-4 w-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black tracking-tight sm:text-7xl mb-6 leading-tight"
          >
            <span className="bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
              The Ultimate AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tools Directory
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed"
          >
            Curated collection of the best artificial intelligence tools to boost your
            <span className="text-indigo-600 dark:text-indigo-400 font-bold"> productivity</span>,
            <span className="text-purple-600 dark:text-purple-400 font-bold"> creativity</span>, and
            <span className="text-pink-600 dark:text-pink-400 font-bold"> workflow</span>.
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mx-auto mt-12 max-w-2xl"
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-2xl transition-all duration-500 group-focus-within:opacity-40 group-focus-within:blur-3xl" />

              {/* Search Icon */}
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-indigo-500" />

              {/* Input */}
              <input
                type="text"
                placeholder="Search for AI tools, categories, or features..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border-2 border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm py-5 pl-14 pr-5 text-zinc-900 dark:text-zinc-100 shadow-xl shadow-zinc-900/5 ring-0 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none placeholder:text-zinc-400 font-medium"
              />

              {/* Clear button */}
              {search && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="h-4 w-4 text-zinc-400" />
                </motion.button>
              )}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 flex items-center justify-center gap-6 text-sm text-zinc-500 dark:text-zinc-400"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">{TOOLS.length} Tools</span>
              </div>
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="font-semibold">Daily Updates</span>
              </div>
              <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="font-semibold">Free to Use</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Filters and Tools Grid */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:w-72 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FiltersBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedPricing={selectedPricing}
                onSelectPricing={setSelectedPricing}
              />
            </motion.div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg shadow-zinc-900/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  <Grid2X2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    Showing <span className="text-indigo-600 dark:text-indigo-400">{filteredTools.length}</span> of {TOOLS.length} tools
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 flex-1 sm:flex-initial rounded-xl bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>

                {/* Sort Button */}
                <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-2.5 text-sm font-bold text-indigo-700 dark:text-indigo-300 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all ring-1 ring-inset ring-indigo-500/20">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Popular</span>
                </button>
              </div>
            </motion.div>

            {/* Tools Grid */}
            <AnimatePresence mode="wait">
              {filteredTools.length > 0 ? (
                <motion.div
                  key="tools-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool, index) => (
                      <motion.div 
                        key={tool.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                          opacity: { duration: 0.2 }
                        }}
                      >
                        <ToolCard
                          tool={tool}
                          bookmarked={bookmarks.includes(tool.id)}
                          onToggleBookmark={toggleBookmark}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-24 px-4 text-center"
                >
                  <div className="rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 p-8 mb-6 shadow-xl shadow-zinc-900/5 ring-1 ring-zinc-900/5 dark:ring-white/5">
                    <Search className="h-16 w-16 text-zinc-400 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">No tools found</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
                    We couldn&apos;t find any tools matching your search. Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("All");
                      setSelectedPricing("All");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all hover:scale-105"
                  >
                    Clear all filters
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-zinc-900 shadow-2xl overflow-y-auto lg:hidden"
            >
              <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-black">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <FiltersBar
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat);
                    setShowMobileFilters(false);
                  }}
                  selectedPricing={selectedPricing}
                  onSelectPricing={(price) => {
                    setSelectedPricing(price);
                    setShowMobileFilters(false);
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] h-[1000px] w-[1000px] rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />
        <div className="absolute top-[20%] -right-[5%] h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[100px] dark:bg-purple-500/10" />
        <div className="absolute -bottom-[30%] -right-[10%] h-[1000px] w-[1000px] rounded-full bg-pink-500/5 blur-[120px] dark:bg-pink-500/10" />
      </div>
    </div>
  );
}