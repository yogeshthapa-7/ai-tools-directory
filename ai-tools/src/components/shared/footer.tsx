"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SocialIcon = "x" | "linkedin" | "youtube" | "instagram" | "github";

type FooterSocial = {
  label: string;
  href?: string;
  icon: SocialIcon;
};

type FooterLink = { label: string; href?: string };
type FooterColumn = { title: string; links: FooterLink[] };

type FooterProps = {
  brand?: string;
  company?: string;
  year?: number;
  socials?: FooterSocial[];
  columns?: FooterColumn[];
  className?: string;
};

const DEFAULT_SOCIALS: FooterSocial[] = [
  { label: "X", href: "#", icon: "x" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Instagram", href: "#", icon: "instagram" },
];

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/home/features" },
      { label: "Directory", href: "/directory" },
      { label: "Explore", href: "/explore" },
      { label: "Submit", href: "/submit" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/home/about" },
      { label: "Home", href: "/home" },
      { label: "Bookmarks", href: "/bookmarks" },
    ],
  },
];

const ICONS: Record<SocialIcon, React.ReactNode> = {
  x: (
    <path
      d="M17.6 3.5h2.9l-6.3 7.2 7.4 9.8h-5.8l-4.5-5.9-5.2 5.9H3.2l6.7-7.7L2.8 3.5h5.9l4.1 5.4 4.8-5.4Zm-1 15.3h1.6L7.9 5.1H6.2l10.4 13.7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  ),
  linkedin: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5V16M12 16v-5.5M12 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.4V16" />
      <circle cx="8" cy="7.7" r=".55" fill="currentColor" />
    </g>
  ),
  youtube: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="2.75" y="5.5" width="18.5" height="13" rx="4" />
      <path d="M10.2 9.3v5.4l4.6-2.7-4.6-2.7Z" />
    </g>
  ),
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.1" cy="6.9" r=".6" fill="currentColor" stroke="none" />
    </g>
  ),
  github: (
    <path
      d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

const isIconName = (v: unknown): v is SocialIcon =>
  typeof v === "string" && v in ICONS;

const Arrow = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true" className="h-3 w-3">
    <path
      d="M2.5 9.5l7-7M4 2.5h5.5V8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Footer({
  brand = "AI Forge",
  company,
  year = new Date().getFullYear(),
  socials = DEFAULT_SOCIALS,
  columns = DEFAULT_COLUMNS,
  className,
}: FooterProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const label = company ?? brand;
  let d = 0;
  const delay = () => ({ "--footer-d": (d += 60) + "ms" } as React.CSSProperties);

  return (
    <footer
      ref={rootRef}
      className={cn(
        "relative mt-28 overflow-hidden border-t border-stone-200 bg-stone-950 text-stone-100 dark:border-white/10",
        className
      )}
      data-seen={seen}
    >
      {/* ambient glow + AI backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 80% at 15% 0%, rgba(120,113,108,0.12), transparent 60%), radial-gradient(50% 60% at 90% 10%, rgba(120,113,108,0.08), transparent 55%)",
        }}
      />
      {/* AI background image — subtle, behind text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url('/images/footer_background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 mx-auto max-w-none px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 sm:gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <p
              className="footer-fade text-xs font-medium uppercase tracking-widest text-stone-400"
              style={delay()}
            >
              © {year} {label}
            </p>

            {socials.length > 0 && (
              <ul className="mt-4 flex gap-3">
                {socials.map((s, i) => (
                  <li key={s.label + i} className="footer-fade" style={delay()}>
                    <a
                      href={s.href || "#"}
                      aria-label={s.label}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-700/60 text-stone-400 transition-all hover:border-stone-500 hover:text-stone-100 hover:-translate-y-0.5"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        {isIconName(s.icon) ? ICONS[s.icon] : null}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <p
              className="footer-fade mt-5 text-sm leading-relaxed text-stone-400"
              style={delay()}
            >
              A calm directory of AI tools. Curated, honest, and free
              of sponsored placements.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col, ci) => (
            <nav key={col.title + ci} aria-label={col.title}>
              <p
                className="footer-fade text-xs font-medium uppercase tracking-widest text-stone-400"
                style={delay()}
              >
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l, li) => (
                  <li key={l.label + li} className="footer-fade" style={delay()}>
                    <a
                      href={l.href || "#"}
                      className="group inline-flex items-center gap-2 text-sm text-stone-300 transition-colors hover:text-white"
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {l.label}
                      </span>
                      <span className="opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <Arrow />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="footer-fade mt-10 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-6 sm:mt-12 sm:flex-row"
          style={delay()}
        >
          <p className="text-xs text-stone-500">
            Built with care. No tracking, no noise.
          </p>
          <p className="text-xs text-stone-500">
            {brand} — discover tools worth your time.
          </p>
        </div>
      </div>

      {/* Bottom edge — full width, touches bottom */}
      <div className="relative z-10 border-t border-stone-800/50">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center sm:px-6">
          <p className="text-xs text-stone-600">
            © {year} {label}. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        .footer-fade {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.8s ease var(--footer-d, 0ms),
            transform 0.8s cubic-bezier(0.2, 0.7, 0.1, 1) var(--footer-d, 0ms);
        }
        footer[data-seen="true"] .footer-fade {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-fade {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </footer>
  );
}
