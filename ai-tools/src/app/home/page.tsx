import Link from "next/link";
import { ArrowRight, Bookmark, Search, SlidersHorizontal, ShieldCheck, RefreshCw } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SnapHeading } from "@/components/snap-heading";
import { Card } from "@/components/ui/card";

const VALUES = [
  {
    icon: Search,
    title: "Search that works",
    body: "Type a name, a description, or a tag and the directory narrows as you type. No separate search page, no waiting for results — what matches is always in front of you.",
  },
  {
    icon: SlidersHorizontal,
    title: "Honest categories",
    body: "Every tool is filed under a real category and marked free, freemium, or paid. You can filter by what a tool does and what it costs before you ever open it.",
  },
  {
    icon: Bookmark,
    title: "Your own shortlist",
    body: "Bookmark tools as you browse and find them again on the Bookmarks page. Your list lives in your browser — no account, no sign-up, no tracking.",
  },
  {
    icon: ShieldCheck,
    title: "No sponsored placements",
    body: "Nothing here is paid for. Tools are listed because they are useful, in the order that makes sense for you, not for whoever paid the most.",
  },
  {
    icon: RefreshCw,
    title: "Kept up to date",
    body: "Listings are reviewed and refreshed so broken links and abandoned projects get flagged. What you see is what you can actually use today.",
  },
  {
    icon: ArrowRight,
    title: "Submit your own",
    body: "Built something? Add it to the directory for free. Submissions are read by a person and go live once they fit the directory's standards.",
  },
];

export const metadata = {
  title: "AI Forge — A calm directory of AI tools",
  description:
    "A curated, no-noise directory of AI tools. Browse by category and pricing, save what matters, and get back to work.",
};

export default function HomePage() {
  const featured = TOOLS.filter((t) => t.featured).slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <FadeIn retrigger={false}>
        <section className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
            AI Forge
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-stone-900 dark:text-white sm:text-5xl">
            <SnapHeading text="Find the right AI tool without the noise." />
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            A hand-curated directory of AI tools, organized by what they do
            and what they cost. No sponsored placements, no inflated counts —
            just a clean list you can search, filter, and save.
          </p>
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
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mt-16 grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-3 dark:border-white/10 dark:bg-white/10">
          {[
            { label: "Curated tools", note: "hand-picked, not scraped" },
            { label: "Real categories", note: "filed by what they do" },
            { label: "Clear pricing", note: "free, freemium, or paid" },
          ].map((s) => (
            <div key={s.label} className="bg-white px-6 py-5 dark:bg-stone-950">
              <p className="text-lg font-semibold tracking-tight text-stone-900 dark:text-white">
                {s.label}
              </p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                {s.note}
              </p>
            </div>
          ))}
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section className="mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-white">
            What you&apos;ll get from this directory
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            Most AI directories are little more than a link dump with a
            search box bolted on. This one is built around a simple idea:
            you should be able to tell, in seconds, whether a tool is
            worth your time.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((f) => {
              const Icon = f.icon;
              return (
                <Card
                  key={f.title}
                  hover
                  radius="lg"
                  className="p-5"
                >
                  <Icon className="h-5 w-5 text-stone-500 dark:text-stone-400" />
                  <h3 className="mt-3 text-base font-medium text-stone-900 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                    {f.body}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>
      </FadeIn>

      {featured.length > 0 && (
        <FadeIn delay={0.2}>
          <section className="mt-20">
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
              {featured.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group block"
                >
                  <Card hover radius="lg" className="p-5">
                    <div className="flex items-center gap-3">
                      <span className="relative h-10 w-10 overflow-hidden rounded-md ring-1 ring-stone-900/5 dark:ring-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tool.image}
                          alt={tool.name}
                          className="h-full w-full object-cover"
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
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      <FadeIn delay={0.25}>
        <section className="mt-20 rounded-lg border border-stone-200 p-8 text-center dark:border-white/10">
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
        </section>
      </FadeIn>
    </main>
  );
}
