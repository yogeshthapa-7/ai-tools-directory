"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FadeIn({
  children,
  delay = 0,
  className,
  retrigger = true,
  depth = 0,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  retrigger?: boolean;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const retriggerRef = useRef(retrigger);
  retriggerRef.current = retrigger;
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible((prev) => {
            if (!retriggerRef.current && prev) return prev;
            return entry.isIntersecting;
          });
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isHidden = mounted && !visible;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[transform,opacity] duration-700 ease-out",
        isHidden ? "opacity-0" : "opacity-100",
        className
      )}
      style={{
        transitionDelay: `${delay * 1000}ms`,
        transform: `translateZ(${depth}px) translateY(${isHidden ? "24px" : "0"})`,
      }}
    >
      {children}
    </div>
  );
}
