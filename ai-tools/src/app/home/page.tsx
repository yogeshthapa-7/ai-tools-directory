import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SnapHeading } from "@/components/snap-heading";
import { Card } from "@/components/ui/card";
import { AboutSelector } from "@/components/about-selector";
import { FeaturesRow } from "@/components/features-row";
import { AuthSection } from "@/components/auth-section";

export const metadata = {
  title: "AI Forge — A calm directory of AI tools",
  description:
    "A curated, no-noise directory of AI tools. Browse by category and pricing, save what matters, and get back to work.",
};

export default function HomePage() {
  const hero = TOOLS.find((t) => t.slug === "chatgpt") ?? TOOLS[0];
  const hero_background = "/images/ai-background.png"
  const heroImage = "/images/chatgpt.webp";
  const heroScreenshot = "/images/Designer.png";
  const featured = TOOLS.filter((t) => t.featured && t.id !== hero.id).slice(0, 3);

  return (
    <>
      {/* Premium AI image backdrop — full viewport width and height */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <Image
          src="/images/Designer.png"
          alt=""
          fill
          className="object-cover opacity-[0.10] dark:opacity-[0.07]"
          priority
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

        {/* Featured tool preview card */}
        <FadeIn retrigger={false} delay={0.15} depth={40}>
          <Link href={`/tools/${hero.slug}`} className="group block">
            <Card
              radius="xl"
              hover
              className="overflow-hidden p-0"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={heroScreenshot}
                  alt={hero.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="relative h-11 w-11 overflow-hidden rounded-lg ring-1 ring-stone-900/5 dark:ring-white/10">
                    <Image
                      src={heroImage}
                      alt={hero.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-stone-900 dark:text-white">
                      {hero.name}
                    </p>
                    <p className="text-xs capitalize text-stone-500 dark:text-stone-400">
                      {hero.pricing}
                    </p>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4 text-stone-400 transition-colors group-hover:text-stone-600 dark:group-hover:text-stone-300" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {hero.shortDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {hero.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-sm bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600 dark:bg-white/10 dark:text-stone-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Link>
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

      {/* Featured tools */}
      {featured.length > 0 && (
        <FadeIn delay={0.1} depth={10}>
          <section className="mt-24">
            <div className="flex items-baseline justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-white">
                  Featured tools
                </h2>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  A few worth starting with, chosen from the full directory.
                </p>
              </div>
              <Link
                href="/directory"
                className="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
              >
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {featured.map((tool, i) => (
                <FadeIn key={tool.id} delay={0.05 * i} depth={20 + i * 8}>
                  <Link href={`/tools/${tool.slug}`} className="group block h-full">
                    <Card hover radius="lg" className="h-full p-5">
                      <div className="flex items-center gap-3">
                        <span className="relative h-10 w-10 overflow-hidden rounded-md ring-1 ring-stone-900/5 dark:ring-white/10">
                          <Image
                            src={tool.image}
                            alt={tool.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-stone-900 dark:text-white">
                            {tool.name}
                          </p>
                          <p className="text-xs capitalize text-stone-500 dark:text-stone-400">
                            {tool.pricing}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                        {tool.shortDescription}
                      </p>
                    </Card>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Submit CTA */}
      <FadeIn delay={0.15} depth={10}>
        <section className="mt-24">
          <Card radius="lg" className="p-8 text-center">
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-white">
              Have a tool to share?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-300">
              Submissions are free and reviewed by a person. If it&apos;s
              useful and it works, it belongs in the directory.
            </p>
            <Link
              href="/submit"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Submit your tool
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </section>
      </FadeIn>
      </main>
    </>
  );
}
