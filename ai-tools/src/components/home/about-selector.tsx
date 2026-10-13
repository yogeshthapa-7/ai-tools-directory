"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Brain,
  Image as ImageIcon,
  PenLine,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  {
    title: "ChatGPT",
    description: "Conversational AI for writing & coding",
    image: "/images/Designer.png",
    icon: <MessageSquare size={22} className="text-white" />,
    slug: "chatgpt",
    details: {
      heading: "ChatGPT",
      subheading: "The conversational all-rounder",
      body: "ChatGPT is a conversational assistant for writing, coding, and problem-solving. It drafts, edits, and explains across almost any topic — useful for everything from quick questions to long-form drafts, with clear pricing and a generous free tier.",
      body2: "Because it covers so many tasks in one place, ChatGPT is often the first tool people try when they start exploring AI. It is a good default for brainstorming, summarizing, and learning new subjects before you decide whether a more specialized tool fits better.",
      categories: ["Content Generation", "Research", "Education"],
      pricing: "freemium",
    },
  },
  {
    title: "Claude",
    description: "Deep reasoning & long-form tasks",
    image: "/images/ai-background.png",
    icon: <Brain size={22} className="text-white" />,
    slug: "claude",
    details: {
      heading: "Claude",
      subheading: "Built for deep reasoning",
      body: "Claude is an assistant designed for deep reasoning and long-form work. It handles document analysis, coding help, and long-context conversations with a focus on accuracy and safety — ideal when the answer needs to be right, not just fast.",
      body2: "Where ChatGPT is broad, Claude is deliberate. It is the better pick for dense documents, careful editing, and multi-step reasoning, and it keeps a long memory of the conversation so you can work through a whole project in one thread.",
      categories: ["Content Generation", "Developer Tools"],
      pricing: "freemium",
    },
  },
  {
    title: "Midjourney",
    description: "Artistic text-to-image generation",
    image: "/images/chatgpt.webp",
    icon: <ImageIcon size={22} className="text-white" />,
    slug: "midjourney",
    details: {
      heading: "Midjourney",
      subheading: "Artistic text-to-image",
      body: "Midjourney is a text-to-image generator known for artistic, cinematic output. Designers and creators use it for concept art, mood boards, and visual exploration — turning a sentence into a striking image in seconds.",
      body2: "It leans toward an illustrative, atmospheric style rather than photorealism, which makes it a favorite for branding, album art, and early-stage design work. A paid plan is required, but the results are often worth the cost for visual professionals.",
      categories: ["Design"],
      pricing: "paid",
    },
  },
  {
    title: "Scribe",
    description: "Step-by-step visual guides",
    image: "/images/Designer.png",
    icon: <PenLine size={22} className="text-white" />,
    slug: "scribe",
    details: {
      heading: "Scribe",
      subheading: "Guides that write themselves",
      body: "Scribe records your on-screen actions and instantly converts them into step-by-step documentation with screenshots. Ideal for SOPs, onboarding, training, and knowledge sharing across teams — no manual writing required.",
      body2: "Instead of typing out a process while you do it, you just work and Scribe captures each step automatically. The result is a clean guide you can share, embed, or export — useful for onboarding new hires or documenting a workflow once and reusing it.",
      categories: ["Productivity"],
      pricing: "freemium",
    },
  },
  {
    title: "GitHub Copilot",
    description: "AI pair programming",
    image: "/images/ai-background.png",
    icon: <Code2 size={22} className="text-white" />,
    slug: "github-copilot",
    details: {
      heading: "GitHub Copilot",
      subheading: "Your AI pair programmer",
      body: "GitHub Copilot suggests code, functions, and tests as you type, right inside your editor. It speeds up repetitive coding, helps you learn new frameworks, and integrates directly into your existing workflow.",
      body2: "Because it works inside VS Code and other editors, Copilot stays out of the way while you code. It is best for boilerplate, refactoring, and exploring a new language — a partner that writes the first draft while you focus on the design.",
      categories: ["Developer Tools"],
      pricing: "paid",
    },
  },
];

export function AboutSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    OPTIONS.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const active = OPTIONS[activeIndex];

  return (
    <section className="mt-28">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
          About the directory
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
          Explore the tools inside
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-300">
          Select a tool to see what it does — every listing is
          hand-picked and filed by what it actually achieves.
        </p>
      </div>

      <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left — image carousel */}
        <div className="flex h-[480px] w-full items-stretch overflow-hidden">
          {OPTIONS.map((option, index) => {
            const isActive = activeIndex === index;
            const isAnimated = animatedOptions.includes(index);
            return (
              <div
                key={option.slug}
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                className={cn(
                  "relative flex cursor-pointer flex-col justify-end overflow-hidden",
                  isAnimated ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[60px]"
                )}
                style={{
                  backgroundImage: `url('${option.image}')`,
                  backgroundSize: isActive ? "cover" : "cover",
                  backgroundPosition: "center",
                  transition:
                    "flex-grow 700ms ease-in-out, box-shadow 700ms ease-in-out, background-size 700ms ease-in-out, border-color 700ms ease-in-out, opacity 700ms ease-in-out, transform 700ms ease-in-out",
                  flex: isActive ? "7 1 0%" : "1 1 0%",
                  minWidth: "60px",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: isActive ? "#ffffff" : "#292929",
                  borderRadius: 0,
                  margin: 0,
                  backgroundColor: "#18181b",
                  boxShadow: isActive
                    ? "0 20px 60px rgba(0,0,0,0.50)"
                    : "0 10px 30px rgba(0,0,0,0.30)",
                  zIndex: isActive ? 10 : 1,
                  willChange: "flex-grow, box-shadow, background-size, background-position",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0"
                  style={{
                    bottom: isActive ? "0" : "-40px",
                    height: "120px",
                    boxShadow: isActive
                      ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                      : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
                    transition: "bottom 700ms ease-in-out, box-shadow 700ms ease-in-out",
                  }}
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-5 z-[2] flex h-12 items-center justify-start gap-3 px-4">
                  <div className="flex h-[44px] min-w-[44px] max-w-[44px] shrink-0 items-center justify-center rounded-full border-2 border-[#444] bg-[rgba(32,32,32,0.85)] shadow-[0_1px_4px_rgba(0,0,0,0.18)] backdrop-blur-[10px]">
                    {option.icon}
                  </div>
                  <div className="relative whitespace-pre text-white">
                    <div
                      className="text-lg font-bold transition-all duration-700 ease-in-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(25px)",
                      }}
                    >
                      {option.title}
                    </div>
                    <div
                      className="text-base text-gray-300 transition-all duration-700 ease-in-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(25px)",
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right — dynamic tool details */}
        <div className="flex h-[480px] flex-col justify-start">
          <div key={active.slug} className="animate-fade-in-top pt-2">
            <p className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
              {active.details.pricing}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
              {active.details.heading}
            </h3>
            <p className="mt-1 text-lg font-medium text-stone-600 dark:text-stone-300">
              {active.details.subheading}
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
              {active.details.body}
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-300">
              {active.details.body2}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {active.details.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:bg-white/10 dark:text-stone-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
