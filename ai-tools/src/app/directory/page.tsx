"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, X, SlidersHorizontal, ArrowRight } from "lucide-react";
import { FilterSidebar } from "@/components/navigation/filter-sidebar";
import { ToolCard } from "@/components/tool/ToolCard";
import { TOOLS, type Pricing } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPricing, setSelectedPricing] = useState<Pricing | "All">("All");
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const filteredTools = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesCategory =
        selectedCategory === "All" || tool.categories.includes(selectedCategory);
      const matchesPricing =
        selectedPricing === "All" || tool.pricing === selectedPricing;
      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [search, selectedCategory, selectedPricing]);

  const clearAll = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedPricing("All");
  };

  return (
    <div className="min-h-screen text-stone-900 dark:text-stone-100 selection:bg-stone-500/30">
      <div className="fixed inset-y-0 left-0 z-40 hidden border-r border-stone-200/80 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-black/30 lg:block lg:top-16">
        <div className="sidebar-scroll h-full overflow-y-auto">
          <FilterSidebar
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedPricing={selectedPricing}
            onSelectPricing={setSelectedPricing}
          />
        </div>
      </div>

      <main
        className={
          "sidebar-scroll h-screen overflow-y-auto transition-[padding] duration-300 ease-out lg:pl-20 xl:pl-72 " +
          (sidebarCollapsed ? "lg:pl-20 xl:pl-20" : "")
        }
      >
        <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <section className="mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
            Directory
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-4xl">
            Browse every tool
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-300">
            Search by name, description, or tag. Narrow by category and
            pricing. Save the ones worth keeping.
          </p>

          <div className="relative mt-8 max-w-2xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools, categories, or tags"
              aria-label="Search tools"
              className="h-11 w-full rounded-md border border-stone-300 bg-white pl-10 pr-10 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-stone-500 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-white/40"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-white/10 dark:hover:text-stone-300"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {filteredTools.length} of {TOOLS.length} tools
            </p>
            <button
              type="button"
              onClick={() => setShowMobileFilters(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/5 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  bookmarked={bookmarks.includes(tool.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
              <div className="rounded-lg border border-stone-200 bg-white p-8 mb-6 dark:border-white/10 dark:bg-stone-950">
                <Search className="h-10 w-10 text-stone-400 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-2">
                No tools found
              </h3>
              <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-md text-sm leading-relaxed">
                Nothing matches your current search and filters. Try
                different terms or clear them.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
              >
                Clear all filters
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      {showMobileFilters && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl dark:bg-stone-950">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-200 bg-white p-4 dark:border-white/10 dark:bg-stone-950">
              <h2 className="text-base font-semibold text-stone-900 dark:text-white">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="rounded-md p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                collapsed={false}
                onToggleCollapse={() => {}}
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
          </div>
        </div>
      )}
    </div>
  );
}
