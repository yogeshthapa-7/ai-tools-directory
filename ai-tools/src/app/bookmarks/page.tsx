"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ToolCard } from "@/components/tool/ToolCard";
import { TOOLS } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Bookmark,
  Heart,
  Trash2,
  Download,
  Share2,
  Sparkles,
  TrendingUp,
  Grid3X3,
  List,
  Search,
  X
} from "lucide-react";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const bookmarkedTools = TOOLS.filter((t) => bookmarks.includes(t.id));

  const filteredTools = search
    ? bookmarkedTools.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(search.toLowerCase())
    )
    : bookmarkedTools;

  function toggleBookmark(id: string) {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function clearAllBookmarks() {
    if (confirm("Are you sure you want to remove all bookmarks?")) {
      setBookmarks([]);
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 px-5 py-2 text-sm font-bold text-amber-600 dark:text-amber-400 mb-6 ring-1 ring-inset ring-amber-500/20 shadow-lg shadow-amber-500/10">
            <Heart className="h-4 w-4 fill-current" />
            <span>Your Saved Tools</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  Bookmarks
                </span>
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium">
                Quick access to your favorite AI tools
              </p>
            </div>

            {bookmarkedTools.length > 0 && (
              <button
                onClick={clearAllBookmarks}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-rose-500/20 bg-rose-50 dark:bg-rose-950/20 px-4 py-2.5 text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/30 transition-all"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </button>
            )}
          </div>
        </motion.div>

        {bookmarkedTools.length > 0 ? (
          <>
            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-900/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                    <Bookmark className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">
                  {bookmarkedTools.length}
                </div>
                <div className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                  Saved Tools
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-900/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">
                  {bookmarkedTools.filter(t => t.pricing === "free").length}
                </div>
                <div className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                  Free Tools
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-900/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">
                  {new Set(bookmarkedTools.flatMap(t => t.categories)).size}
                </div>
                <div className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                  Categories
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-900/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Heart className="h-5 w-5 text-white fill-current" />
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">
                  {bookmarkedTools.filter(t => t.featured).length}
                </div>
                <div className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                  Featured
                </div>
              </div>
            </motion.div>

            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-4 shadow-lg shadow-zinc-900/5"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search bookmarks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 pl-11 pr-10 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-zinc-400 font-medium"
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

                {/* View Toggle */}
                <div className="flex items-center gap-3">
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

                  <button className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 px-4 py-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Tools Grid */}
            <AnimatePresence mode="wait">
              {filteredTools.length > 0 ? (
                <motion.div
                  key="tools"
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className={
                    viewMode === "grid"
                      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      : "space-y-4"
                  }
                >
                  {filteredTools.map((tool) => (
                    <motion.div key={tool.id} variants={item}>
                      <ToolCard
                        tool={tool}
                        bookmarked={true}
                        onToggleBookmark={toggleBookmark}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 p-8 mb-6 inline-block shadow-xl shadow-zinc-900/5">
                    <Search className="h-16 w-16 text-zinc-400 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">
                    No results found
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    No bookmarks match your search
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 p-12 shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-900/5 dark:ring-white/5">
                <Bookmark className="h-20 w-20 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                <Heart className="h-10 w-10 text-amber-500 mx-auto -mt-16 ml-12 fill-current" />
              </div>
            </div>

            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3">
              No bookmarks yet
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-md">
              Start bookmarking your favorite AI tools to quickly access them later
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 px-8 py-4 text-base font-black text-white shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              Explore Tools
            </Link>

            {/* Tips */}
            <div className="mt-16 grid sm:grid-cols-3 gap-4 max-w-3xl">
              {[
                { icon: Bookmark, title: "Easy Bookmarking", desc: "Click the bookmark icon on any tool card" },
                { icon: Heart, title: "Save Favorites", desc: "Keep track of tools you love and use often" },
                { icon: TrendingUp, title: "Quick Access", desc: "Find your saved tools instantly anytime" },
              ].map((tip, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm p-6 text-center shadow-lg shadow-zinc-900/5"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 mb-3 shadow-lg shadow-amber-500/25">
                    <tip.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-black text-zinc-900 dark:text-white mb-1 text-sm">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Background */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-amber-500/5 blur-[120px] dark:bg-amber-500/10" />
        <div className="absolute -bottom-[30%] -right-[10%] h-[1000px] w-[1000px] rounded-full bg-orange-500/5 blur-[120px] dark:bg-orange-500/10" />
      </div>
    </div>
  );
}