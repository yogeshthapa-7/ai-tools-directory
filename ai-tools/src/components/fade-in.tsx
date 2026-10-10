"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  delay = 0,
  className,
  retrigger = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  retrigger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!retrigger) {
    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          className
        )}
        style={{ transitionDelay: `${delay * 1000}ms` }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay * 1000}ms` }}
    >
      {children}
    </div>
  );
}
