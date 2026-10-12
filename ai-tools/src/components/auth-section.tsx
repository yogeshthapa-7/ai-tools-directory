"use client";

import { useState, type FormEvent } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";

const MODE_META: Record<
  Mode,
  { label: string; heading: string; subheading: string; cta: string }
> = {
  login: {
    label: "Login",
    heading: "Welcome back",
    subheading:
      "Sign in to sync your bookmarks and pick up where you left off.",
    cta: "Sign in",
  },
  signup: {
    label: "Sign up",
    heading: "Create your account",
    subheading:
      "Free forever. Save tools, build a shortlist, and get back to work.",
    cta: "Create account",
  },
};

export function AuthSection() {
  const [mode, setMode] = useState<Mode>("login");
  const [curtain, setCurtain] = useState<"idle" | "covering" | "revealing">(
    "idle"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const switchMode = (next: Mode) => {
    if (next === mode || curtain !== "idle") return;
    setCurtain("covering");
    window.setTimeout(() => {
      setMode(next);
      setCurtain("revealing");
      window.setTimeout(() => setCurtain("idle"), 500);
    }, 500);
  };

  const meta = MODE_META[mode];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="mt-28">
      <div className="mb-10 max-w-2xl mx-auto text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
          Account
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
          Save what matters
        </h2>
        <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
          Create a free account to bookmark tools and build a
          personal shortlist — or sign in to pick up where you
          left off. No spam, no tracking, no credit card.
        </p>
      </div>
      <div className="mx-auto max-w-5xl">
        <Card radius="xl" className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-2">
            {/* Left — pitch */}
            <div className="relative hidden flex-col justify-between bg-stone-900 p-10 text-white dark:bg-white dark:text-stone-900 lg:flex">
              <div>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white dark:bg-stone-900">
                  <span className="text-[11px] font-bold tracking-tight text-stone-900 dark:text-white">
                    AF
                  </span>
                </span>
                <h2 className="mt-8 text-2xl font-semibold tracking-tight">
                  Your tools, saved in one place.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-300 dark:text-stone-600">
                  An account lets you bookmark tools from any device, keep a
                  personal shortlist, and come back to the directory without
                  starting over. No spam, no tracking — just your list.
                </p>
              </div>
              <ul className="mt-10 space-y-3 text-sm text-stone-300 dark:text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400 dark:bg-stone-500" />
                  Bookmarks sync across devices
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400 dark:bg-stone-500" />
                  No sponsored placements, ever
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400 dark:bg-stone-500" />
                  Free forever, no credit card
                </li>
              </ul>
            </div>

            {/* Right — forms with curtain slider */}
            <div className="relative p-8 sm:p-10">
              {/* mode toggle */}
              <div className="mb-8 flex items-center gap-1 rounded-md bg-stone-100 p-1 dark:bg-white/10">
                {(["login", "signup"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => switchMode(m)}
                    className={cn(
                      "flex-1 rounded-sm px-4 py-2 text-sm font-medium transition-colors",
                      mode === m
                        ? "bg-white text-stone-900 shadow-sm dark:bg-stone-900 dark:text-white"
                        : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                    )}
                  >
                    {MODE_META[m].label}
                  </button>
                ))}
              </div>

              {/* active form */}
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-white">
                  {meta.heading}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {meta.subheading}
                </p>

                <div className="mt-6 space-y-4">
                  {mode === "signup" && (
                    <div>
                      <label
                        htmlFor="auth-name"
                        className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-200"
                      >
                        Name
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                        <input
                          id="auth-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ada Lovelace"
                          autoComplete="name"
                          className="h-10 w-full rounded-md border border-stone-300 bg-white pl-9 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400/30 dark:border-white/15 dark:bg-transparent dark:text-white dark:placeholder:text-stone-500"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="auth-email"
                      className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-200"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                      <input
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        className="h-10 w-full rounded-md border border-stone-300 bg-white pl-9 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400/30 dark:border-white/15 dark:bg-transparent dark:text-white dark:placeholder:text-stone-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="auth-password"
                      className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-200"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                      <input
                        id="auth-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete={
                          mode === "login" ? "current-password" : "new-password"
                        }
                        required
                        className="h-10 w-full rounded-md border border-stone-300 bg-white pl-9 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400/30 dark:border-white/15 dark:bg-transparent dark:text-white dark:placeholder:text-stone-500"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="mt-6 w-full">
                  {meta.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>

                {mode === "login" && (
                  <p className="mt-4 text-center text-xs text-stone-500 dark:text-stone-400">
                    <a
                      href="#"
                      className="font-medium text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white"
                    >
                      Forgot your password?
                    </a>
                  </p>
                )}
              </form>

              {/* curtain — only mounted during transition */}
              {curtain !== "idle" && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-y-0 left-0 w-full bg-stone-50 dark:bg-stone-950",
                    curtain === "covering"
                      ? "animate-curtain-cover"
                      : "animate-curtain-reveal"
                  )}
                />
              )}
            </div>
          </div>
        </Card>

        <p className="mt-6 text-center text-sm text-stone-500 dark:text-stone-400">
          {mode === "login" ? (
            <>
              New to AI Forge?{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className="font-medium text-stone-700 hover:text-stone-900 dark:text-stone-200 dark:hover:text-white"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="font-medium text-stone-700 hover:text-stone-900 dark:text-stone-200 dark:hover:text-white"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
