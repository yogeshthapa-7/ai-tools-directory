"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bookmark, Plus, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const NAV = [
  { href: "/home", label: "Home" },
  { href: "/directory", label: "Directory" },
  { href: "/explore", label: "Explore" },
  { href: "/bookmarks", label: "Bookmarks" },
];

export function NavigationBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [bookmarks] = useLocalStorage<string[]>("bookmarks", []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-900/[0.06] bg-white/70 backdrop-blur-md dark:border-white/[0.06] dark:bg-black/50">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/home" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 dark:bg-white">
              <span className="text-[13px] font-semibold tracking-tight text-white dark:text-stone-900">
                AF
              </span>
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-stone-900 dark:text-white">
              AI&nbsp;Forge
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "font-medium text-stone-900 dark:text-white"
                      : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="mt-0.5 block h-px bg-stone-900 dark:bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools"
                aria-label="Search tools"
                className="h-9 w-56 rounded-md border border-stone-200 bg-stone-50/80 pl-9 pr-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition-colors focus:border-stone-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-white/30 dark:focus:bg-black/20"
              />
            </div>

            <Link
              href="/bookmarks"
              className="relative rounded-md p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Bookmarks"
            >
              <Bookmark className="h-[18px] w-[18px]" />
              {bookmarks.length > 0 && (
                <span className="absolute right-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-medium text-white dark:bg-white dark:text-stone-900">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            <Link
              href="/submit"
              className="hidden rounded-md bg-stone-900 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200 sm:inline-flex"
            >
              Submit tool
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-md p-2 text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-white md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-x-3 top-[4.5rem] rounded-lg border border-stone-200 bg-white p-3 shadow-lg dark:border-white/10 dark:bg-stone-950">
            <div className="relative mb-3 sm:hidden">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools"
                aria-label="Search tools"
                className="h-9 w-full rounded-md border border-stone-200 bg-stone-50/80 pl-9 pr-3 text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-stone-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-white/30"
              />
            </div>
            <nav className="flex flex-col gap-0.5" aria-label="Mobile">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-stone-100 font-medium text-stone-900 dark:bg-white/10 dark:text-white"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/submit"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center rounded-md bg-stone-900 px-3.5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-stone-900"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Submit tool
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
