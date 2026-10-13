import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/data";
import { FadeIn } from "@/components/shared/fade-in";
import { SnapHeading } from "@/components/shared/snap-heading";
import { AboutSelector } from "@/components/home/about-selector";
import { FeaturesRow } from "@/components/home/features-row";
import { AuthSection } from "@/components/home/auth-section";
import { Footer } from "@/components/shared/footer";

export const metadata = {
  title: "AI Forge — A calm directory of AI tools",
  description:
    "A curated, no-noise directory of AI tools. Browse by category and pricing, save what matters, and get back to work.",
};

export default function HomePage() {
  const hero = TOOLS.find((t) => t.slug === "chatgpt") ?? TOOLS[0];
  const hero_background = "/images/background.png"
  const heroImage = "/images/chatgpt.webp";
  const heroScreenshot = "/images/hero_background.png";
  const featured = TOOLS.filter((t) => t.featured && t.id !== hero.id).slice(0, 3);

  return (
    <>
      {/* Full-page backdrop — visible behind every section */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <Image
          src="/images/background.png"
          alt=""
          fill
          className="object-cover opacity-[0.10] dark:opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-stone-950" />
      </div>

      <main className="relative mx-auto px-4 pt-32 pb-24 sm:px-6 lg:px-8">

      {/* Editorial split hero */}
      <section className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn retrigger={false} depth={20}>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 dark:bg-white">
              <span className="text-[11px] font-bold tracking-tight text-white dark:text-stone-900">
                AF
              </span>
            </span>
            <p className="text-base font-semibold uppercase tracking-[0.2em] text-stone-900 dark:text-white">
              AI&nbsp;Forge
            </p>
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-stone-900 dark:text-white sm:text-5xl">
            <SnapHeading
              text="Find the right tool"
              accent="without the noise."
              accentClassName="text-stone-500 dark:text-stone-400"
            />
          </h1>
          <div className="mt-5 max-w-xl space-y-4 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            <p>
              Discover AI tools that make your work{" "}
              <span className="font-semibold text-stone-900 dark:text-white">
                smarter, faster, and more efficient
              </span>
              . Explore solutions for coding, writing, design, research,
              productivity, and automation — with clear insights into their{" "}
              <span className="font-semibold text-stone-900 dark:text-white">
                features, use cases, and pricing
              </span>
              .
            </p>
            <p>
              Whether you&apos;re building projects, creating content, or
              streamlining everyday tasks, AI Forge helps you find the right
              tools without endless searching.{" "}
              <span className="font-semibold text-stone-900 dark:text-white">
                No sponsored rankings, no unnecessary clutter
              </span>{" "}
              — just better AI discovery.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Browse the directory
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/5"
            >
              Explore all tools
            </Link>
            <Link
              href="/home/about"
              className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 dark:border-white/15 dark:text-stone-200 dark:hover:bg-white/5"
            >
              About the directory
            </Link>
          </div>
        </FadeIn>

        {/* Featured tool — floating image with edge fade */}
        <FadeIn retrigger={false} delay={0.15} depth={40}>
          <div className="relative flex items-center justify-center">
            {/* 3D base */}
            <div className="absolute bottom-4 h-20 w-80 rounded-[50%] bg-gradient-to-b from-stone-300/40 to-stone-400/20 blur-sm dark:from-white/10 dark:to-white/5" />
            <div className="absolute bottom-6 h-10 w-64 rounded-[50%] bg-stone-900/10 blur-xl dark:bg-black/30" />
            {/* Image — larger, fading from all sides */}
            <div className="relative h-[600px] w-[700px]">
              <Image
                src={heroScreenshot}
                alt={hero.name}
                fill
                className="object-contain"
                priority
              />
              {/* Edge fade — all sides */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* About — interactive selector */}
      <FadeIn depth={10}>
        <AboutSelector />
      </FadeIn>

      {/* Features — infinite scrolling cards */}
      <FadeIn depth={10}>
        <FeaturesRow />
      </FadeIn>

      {/* Login / Signup — curtain slider */}
      <FadeIn retrigger={false} depth={10}>
        <AuthSection />
      </FadeIn>

      {/* Submit CTA — full width */}
      <FadeIn delay={0.15} depth={10}>
        <section className="mt-24">
          <div className="relative overflow-hidden">
            {/* Animated background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 animate-background-pan bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/submit_tools.png')`,
                backgroundSize: "contain",
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
              }}
            />
            {/* Overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/60 to-stone-950/80" />
            {/* Content */}
            <div className="relative z-10 px-8 py-16 text-center sm:px-12 sm:py-20">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Have a tool to share?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-stone-200">
                Submissions are free and reviewed by a person. If it&apos;s
                useful and it works, it belongs in the directory.
              </p>
              <Link
                href="/submit"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-stone-900 shadow-lg shadow-stone-950/20 transition-all hover:bg-stone-100 hover:shadow-xl active:scale-[0.98]"
              >
                Submit your tool
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Footer */}
      <Footer />
      </main>
    </>
  );
}
