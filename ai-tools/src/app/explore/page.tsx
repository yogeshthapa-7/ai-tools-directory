"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiltersBar } from "@/components/filters/FiltersBar";
import { ToolCard } from "@/components/tool/ToolCard";
import { TOOLS, type Pricing } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  TrendingUp,
  Calendar,
  ArrowDownAZ,
  Sparkles,
  Filter
} from "lucide-react";

type SortOption = "popular" | "latest" | "name";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPricing, setSelectedPricing] = useState<Pricing | "All">("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);

  const filteredTools = useMemo(() => {
    let tools = [...TOOLS];

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      tools = tools.filter((t) =>
        [t.name, t.shortDescription, ...t.tags, ...t.categories].some((s) =>
          s.toLowerCase().includes(q)
        )
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      tools = tools.filter((t) => t.categories.includes(selectedCategory));
    }

    // Pricing filter
    if (selectedPricing !== "All") {
      tools = tools.filter((t) => t.pricing === selectedPricing);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      tools = tools.filter((t) => selectedTags.every((tag) => t.tags.includes(tag)));
    }

    // Sorting
    switch (sortBy) {
      case "name":
        tools.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "latest":
        tools.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "popular":
      default:
        // Keep original order (assumed to be by popularity)
        break;
    }

    return tools;
  }, [search, selectedCategory, selectedPricing, selectedTags, sortBy]);

  function toggleBookmark(id: string) {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  const sortOptions = [
    { value: "popular", label: "Popular", icon: TrendingUp },
    { value: "latest", label: "Latest", icon: Calendar },
    { value: "name", label: "A-Z", icon: ArrowDownAZ },
  ] as const;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-zinc-950 dark:via-slate-900 dark:to-indigo-950/20">
      <main className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 px-5 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-6 ring-1 ring-inset ring-indigo-500/20 shadow-lg shadow-indigo-500/10">
            <Sparkles className="h-4 w-4" />
            <span>Explore All Tools</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Discover AI Tools
            </span>
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium">
            Browse through our complete collection of curated AI tools with advanced filtering and search.
          </p>
        </motion.div>

        {/* Search & Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-4 shadow-xl shadow-zinc-900/5"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search tools, categories, tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 pl-11 pr-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-400 font-medium"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="h-3.5 w-3.5 text-zinc-400" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1">
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold transition-all ${sortBy === option.value
                          ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-md"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg p-2 transition-all ${viewMode === "grid"
                      ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-md"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg p-2 transition-all ${viewMode === "list"
                      ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-md"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:w-72 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FiltersBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedPricing={selectedPricing}
                onSelectPricing={setSelectedPricing}
              />
            </motion.div>
          </aside>

          {/* Tools Grid */}
          <div className="flex-1 min-w-0">
            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 flex items-center justify-between"
            >
              <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
                Showing <span className="text-indigo-600 dark:text-indigo-400">{filteredTools.length}</span> of {TOOLS.length} tools
              </p>

              {/* Mobile Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="lg:hidden rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-sm font-bold text-zinc-700 dark:text-zinc-300 outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Tools List */}
            <AnimatePresence mode="wait">
              {filteredTools.length > 0 ? (
                <motion.div
                  key="tools-grid"
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className={
                    viewMode === "grid"
                      ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                      : "space-y-4"
                  }
                >
                  {filteredTools.map((tool) => (
                    <motion.div key={tool.id} variants={item}>
                      <ToolCard
                        tool={tool}
                        bookmarked={bookmarks.includes(tool.id)}
                        onToggleBookmark={toggleBookmark}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 p-8 mb-6 shadow-xl shadow-zinc-900/5">
                    <Search className="h-16 w-16 text-zinc-400 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
                    No tools found
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("All");
                      setSelectedPricing("All");
                      setSelectedTags([]);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all"
                  >
                    <Filter className="h-4 w-4" />
                    Clear all filters
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

      {/* Background */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div className="absolute -top-[30%] -left-[10%] h-[1000px] w-[1000px] rounded-full bg-indigo-500/5 blur-[120px] dark:bg-indigo-500/10" />
        <div className="absolute top-[20%] -right-[5%] h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-[100px] dark:bg-purple-500/10" />
      </div>
    </div>
  );
}