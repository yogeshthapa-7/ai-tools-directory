"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Search, Plus, Sparkles, Menu, X, Command, TrendingUp, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const NAV = [
  { href: "/", label: "Home", icon: Sparkles },
  { href: "/explore", label: "Explore", icon: TrendingUp },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [bookmarks] = useLocalStorage<string[]>("bookmarks", []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        {/* Backdrop Blur Layer */}
        <div className="absolute inset-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50" />

        {/* Gradient Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-xl shadow-indigo-500/25"
                >
                  <Sparkles className="h-6 w-6 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <div className="hidden sm:block">
                  <span className="text-xl font-black tracking-tighter">
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      AI
                    </span>
                    <span className="text-zinc-900 dark:text-white">Tools</span>
                    <span className="text-indigo-600">Hub</span>
                  </span>
                  <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden items-center gap-1 md:flex">
                {NAV.map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      className={cn(
                        "relative rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 flex items-center gap-2",
                        pathname === n.href
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{n.label}</span>

                      {pathname === n.href && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 border border-indigo-200 dark:border-indigo-800/50"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <motion.div
                animate={{
                  width: searchFocused ? "280px" : "200px"
                }}
                className="hidden lg:flex items-center relative group"
              >
                <Search className={cn(
                  "absolute left-3.5 h-4 w-4 transition-colors duration-300",
                  searchFocused ? "text-indigo-500" : "text-zinc-400 group-hover:text-zinc-600"
                )} />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={cn(
                    "h-11 w-full rounded-xl border-2 bg-zinc-50/50 dark:bg-zinc-900/50 pl-10 pr-4 text-sm font-medium outline-none backdrop-blur-sm transition-all duration-300",
                    searchFocused
                      ? "border-indigo-500 bg-white dark:bg-zinc-900 shadow-lg shadow-indigo-500/10"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                />
                <div className="absolute right-3 hidden sm:flex items-center gap-1">
                  <kbd className="hidden md:inline-flex items-center gap-1 rounded-md bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                    <Command className="h-2.5 w-2.5" />K
                  </kbd>
                </div>
              </motion.div>

              {/* Mobile Search Button */}
              <button className="lg:hidden rounded-xl p-2.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
                <Search className="h-5 w-5" />
              </button>

              {/* Bookmarks Button */}
              <Link
                href="/bookmarks"
                className="hidden sm:flex rounded-xl p-2.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all relative group"
                aria-label="Bookmarks"
              >
                <Bookmark className="h-5 w-5" />
                {/* Badge */}
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">
                    {bookmarks.length}
                  </span>
                )}
              </Link>

              {/* Submit Tool Button */}
              <Link
                href="/submit"
                className="hidden sm:inline-flex"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-5 py-2.5 text-sm font-black text-white shadow-xl shadow-indigo-500/25 transition-all hover:shadow-2xl hover:shadow-indigo-500/30 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Submit Tool
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden rounded-xl p-2.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden"
          >
            <div className="mx-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl p-4 shadow-2xl">
              {/* Mobile Search */}
              <div className="mb-4 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  className="h-11 w-full rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 pl-10 pr-4 text-sm font-medium outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-1 mb-4">
                {NAV.map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                        pathname === n.href
                          ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{n.label}</span>
                      {pathname === n.href && (
                        <Star className="ml-auto h-4 w-4 fill-current" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <Link
                href="/submit"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-3 text-sm font-black text-white shadow-xl shadow-indigo-500/25">
                  <Plus className="h-4 w-4" />
                  Submit Your Tool
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}