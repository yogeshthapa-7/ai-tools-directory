"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const HOLD_MS = 5000;
const PER_LETTER_MS = 40;
const PAUSE_MS = 300;

export function SnapHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [chars, setChars] = useState<(string | null)[]>(text.split(""));

  useEffect(() => {
    const letters = text.split("");
    const letterIdx = letters
      .map((ch, i) => (ch === " " ? -1 : i))
      .filter((i) => i !== -1);
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function later(fn: () => void, ms: number) {
      const t = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(t);
    }

    function dissolve(done: () => void) {
      const order = shuffle(letterIdx);
      order.forEach((idx, step) => {
        later(() => {
          setChars((prev) => {
            const next = [...prev];
            next[idx] = null;
            return next;
          });
        }, step * PER_LETTER_MS);
      });
      later(done, order.length * PER_LETTER_MS + PAUSE_MS);
    }

    function reform(done: () => void) {
      const order = shuffle(letterIdx);
      order.forEach((idx, step) => {
        later(() => {
          setChars((prev) => {
            const next = [...prev];
            next[idx] = letters[idx];
            return next;
          });
        }, step * PER_LETTER_MS);
      });
      later(done, order.length * PER_LETTER_MS + PAUSE_MS);
    }

    function cycle() {
      if (cancelled) return;
      dissolve(() => {
        reform(() => {
          later(cycle, HOLD_MS);
        });
      });
    }

    later(cycle, HOLD_MS);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [text]);

  return (
    <span className={cn("inline-block whitespace-pre", className)} aria-label={text}>
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            "inline-block transition-all duration-300",
            ch === null
              ? "translate-y-1 scale-90 opacity-0 blur-[2px]"
              : "translate-y-0 scale-100 opacity-100 blur-0"
          )}
        >
          {ch === null ? "" : ch}
        </span>
      ))}
    </span>
  );
}
