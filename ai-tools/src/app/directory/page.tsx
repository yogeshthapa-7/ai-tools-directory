"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Search, X, SlidersHorizontal, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FilterSidebar } from "@/components/layout/filter-sidebar";
import { ToolCard } from "@/components/tool/ToolCard";
import { Card } from "@/components/ui/card";
import { TOOLS, type Pricing } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

const TOOLS_PER_PAGE = 10;

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPricing, setSelectedPricing] = useState<Pricing | "All">("All");
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedPricing]);

  const totalPages = Math.max(1, Math.ceil(filteredTools.length / TOOLS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedTools = useMemo(() => {
    const start = (safePage - 1) * TOOLS_PER_PAGE;
    return filteredTools.slice(start, start + TOOLS_PER_PAGE);
  }, [filteredTools, safePage]);

  const clearAll = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedPricing("All");
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className="min-h-screen text-stone-900 dark:text-stone-100 selection:bg-stone-500/30">
      {/* 3D model background — fixed, subtle, behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
          style={{
            backgroundImage: `url('/images/directory_image.avif')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        />
        {/* 3D depth overlay — subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40 dark:to-stone-950/40" />
        {/* Radial vignette for 3D focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(255,255,255,0.3)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="fixed inset-y-0 left-0 z-40 hidden border-r border-stone-200/80 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-black/30 lg:block lg:top-16 lg:pt-4">
        {/* Sidebar background image — subtle, behind content */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url('/images/sidebar.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Sidebar content — above background */}
        <div className="sidebar-scroll relative h-full overflow-y-auto">
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
          "sidebar-scroll h-screen overflow-y-auto transition-[padding] duration-300 ease-out lg:pl-24 xl:pl-80 " +
          (sidebarCollapsed ? "lg:pl-24 xl:pl-24" : "")
        }
      >
        <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <section className="mb-12 grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — text content */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 dark:bg-white">
                <span className="text-[11px] font-bold tracking-tight text-white dark:text-stone-900">
                  AF
                </span>
              </span>
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-stone-900 dark:text-white">
                AI&nbsp;Forge Directory
              </p>
            </div>
            <h1 className="mt-4 text-[2rem] font-semibold leading-[1.08] tracking-tight text-stone-900 dark:text-white sm:text-5xl">
              Browse every tool
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-300 sm:text-lg">
              Search by name, description, or tag. Narrow by category and
              pricing. Save the ones worth keeping. Every listing is
              hand-picked and filed by what it actually achieves — no
              sponsored rankings, no noise.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#tools"
                className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
              >
                Start browsing
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/submit"
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/5"
              >
                Submit a tool
              </a>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute bottom-4 h-16 w-56 rounded-[50%] bg-gradient-to-b from-stone-300/40 to-stone-400/20 blur-sm dark:from-white/10 dark:to-white/5 sm:h-20 sm:w-80" />
            <div className="absolute bottom-6 h-8 w-44 rounded-[50%] bg-stone-900/10 blur-xl dark:bg-black/30 sm:h-10 sm:w-64" />
            <div className="relative h-[300px] w-full sm:h-[420px] sm:w-[520px] lg:h-[500px] lg:w-[600px]">
              <Image
                src="/images/directory_hero.png"
                alt="AI tools directory"
                fill
                className="object-contain"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
            </div>
          </div>
        </section>

        {/* Search bar */}
        <section className="mb-8">
          <div className="relative max-w-2xl">
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

        <section id="tools" className="scroll-mt-24">

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Explore all tools
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
            <>
              <div className="flex flex-col gap-3">
                {paginatedTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    bookmarked={bookmarks.includes(tool.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mt-8 flex items-center justify-center gap-1.5"
                  aria-label="Pagination"
                >
                  <button
                    type="button"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-stone-300 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => goToPage(page)}
                        aria-label={`Page ${page}`}
                        aria-current={page === safePage ? "page" : undefined}
                        className={cn(
                          "h-9 min-w-9 rounded-md px-2 text-sm transition-all duration-200",
                          page === safePage
                            ? "bg-stone-900 font-medium text-white dark:bg-white dark:text-stone-900"
                            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
                        )}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    aria-label="Next page"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-stone-300 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              )}
            </>
          ) : (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
                <Card radius="lg" className="mb-6 p-8">
                  <Search className="h-10 w-10 text-stone-400 mx-auto" />
                </Card>
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
        </section>
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
