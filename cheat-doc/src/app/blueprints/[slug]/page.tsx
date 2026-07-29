import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock3 } from "lucide-react";
import JsonLd from "../../components/JsonLd";
import RelatedContent from "../../components/RelatedContent";
import ShareButton from "../../journal/ShareButton";
import { blueprints, getBlueprint } from "../../content/data";
import topics from "../../meta/allTopics.json";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blueprints.map((blueprint) => ({ slug: blueprint.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blueprint = getBlueprint((await params).slug);
  if (!blueprint) return { title: "Project Blueprint | DevMarks" };
  return {
    title: `${blueprint.title} Blueprint | DevMarks`,
    description: blueprint.summary,
    alternates: { canonical: `/blueprints/${blueprint.slug}` },
    openGraph: {
      title: `${blueprint.title} Blueprint`,
      description: blueprint.summary,
      url: `/blueprints/${blueprint.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function BlueprintPage({ params }: Props) {
  const blueprint = getBlueprint((await params).slug);
  if (!blueprint) notFound();

  const related = blueprint.relatedTopics
    .map((slug) => topics.find((topic) => topic.slug === slug))
    .filter((topic) => topic !== undefined)
    .map((topic) => ({
      href: `/${topic.slug}`,
      title: topic.title,
      description: topic.description,
      type: "Technical reference",
    }));

  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LearningResource",
          name: blueprint.title,
          description: blueprint.summary,
          educationalLevel: blueprint.level,
          timeRequired: blueprint.duration,
          author: { "@type": "Person", name: "Luis Colon" },
        }}
      />
      <article className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link href="/blueprints" className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
          <ArrowLeft className="size-4" /> All blueprints
        </Link>
        <header className="py-12 sm:py-16">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-violet-400/10 px-3 py-1 text-violet-300">
              {blueprint.level}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-gray-700 px-3 py-1 text-gray-400">
              <Clock3 className="size-3.5" /> {blueprint.duration}
            </span>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">{blueprint.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">{blueprint.summary}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {blueprint.stack.map((item) => (
                <span key={item} className="rounded-md bg-gray-800 px-2.5 py-1 text-xs text-gray-300">
                  {item}
                </span>
              ))}
            </div>
            <ShareButton />
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-semibold">Evidence you should finish with</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {blueprint.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 rounded-xl border border-gray-700/80 bg-[#151e30] p-4 text-sm leading-6 text-gray-300">
                <Check className="mt-1 size-4 shrink-0 text-green-300" /> {outcome}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Build plan</h2>
          <div className="mt-6 space-y-4">
            {blueprint.phases.map((phase, index) => (
              <div key={phase.title} className="rounded-2xl border border-gray-700/80 bg-[#151e30] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-violet-400/10 text-sm font-bold text-violet-300">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold">{phase.title}</h3>
                </div>
                <ul className="mt-4 grid gap-2 pl-11 sm:grid-cols-2">
                  {phase.deliverables.map((item) => (
                    <li key={item} className="text-sm leading-6 text-gray-400">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <RelatedContent items={related} title="References for this build" />
      </article>
    </main>
  );
}
