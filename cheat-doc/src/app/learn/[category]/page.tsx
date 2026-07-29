import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Lightbulb } from "lucide-react";
import { getLearningArea, learningAreas } from "../data";

type LearnCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return learningAreas.map((area) => ({ category: area.slug }));
}

export async function generateMetadata({
  params,
}: LearnCategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const area = getLearningArea(category);
  return {
    title: area ? `${area.title} | DevMarks` : "Learn | DevMarks",
    description: area?.description,
  };
}

export default async function LearnCategoryPage({
  params,
}: LearnCategoryPageProps) {
  const { category } = await params;
  const area = getLearningArea(category);
  if (!area) notFound();

  const hideSolutions = area.slug === "debugging";

  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/learn"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" /> All learning areas
        </Link>

        <header className="py-12 sm:py-16">
          <div className="flex items-start gap-4">
            <span
              className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-2xl"
              style={{ backgroundColor: `${area.color}20` }}
              aria-hidden="true"
            >
              {area.icon}
            </span>
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: area.color }}
              >
                {area.eyebrow}
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
                {area.title}
              </h1>
              <p className="mt-4 max-w-3xl leading-7 text-gray-400 sm:text-lg">
                {area.description}
              </p>
            </div>
          </div>
        </header>

        <section>
          <h2 className="text-xl font-semibold">Topic library</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {area.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-gray-700 bg-[#151e30] px-3 py-1.5 text-sm text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div>
            <h2 className="text-2xl font-semibold">
              {hideSolutions ? "Featured challenges" : "Featured guides"}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {hideSolutions
                ? "Read the symptom and code before revealing the investigation."
                : "Practical starting points for the highest-value topics."}
            </p>
          </div>

          <div className="mt-6 space-y-6">
            {area.featured.map((guide) => (
              <article
                key={guide.title}
                className="overflow-hidden rounded-2xl border border-gray-700/80 bg-[#151e30]"
              >
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-semibold">{guide.title}</h3>
                  <p className="mt-2 leading-6 text-gray-400">{guide.summary}</p>
                  {guide.code && (
                    <pre className="mt-5 overflow-x-auto rounded-lg border border-gray-700 bg-gray-950 p-4 text-sm leading-6 text-gray-300">
                      <code>{guide.code}</code>
                    </pre>
                  )}
                </div>

                {hideSolutions ? (
                  <details className="group border-t border-gray-700/80">
                    <summary className="cursor-pointer list-none p-5 font-medium text-orange-300 transition hover:bg-gray-800/50 sm:p-6">
                      <span className="group-open:hidden">Reveal investigation and fix ↓</span>
                      <span className="hidden group-open:inline">Hide solution ↑</span>
                    </summary>
                    <GuideBody guide={guide} color={area.color} />
                  </details>
                ) : (
                  <GuideBody guide={guide} color={area.color} />
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function GuideBody({
  guide,
  color,
}: {
  guide: NonNullable<ReturnType<typeof getLearningArea>>["featured"][number];
  color: string;
}) {
  return (
    <div className="border-t border-gray-700/80 p-5 sm:p-6">
      <ol className="grid gap-3 sm:grid-cols-2">
        {guide.steps.map((step) => (
          <li key={step} className="flex gap-3 text-sm leading-6 text-gray-300">
            <Check
              className="mt-1 size-4 shrink-0"
              style={{ color }}
              aria-hidden="true"
            />
            {step}
          </li>
        ))}
      </ol>
      <div className="mt-6 flex gap-3 rounded-lg border border-gray-700 bg-gray-900/60 p-4">
        <Lightbulb className="mt-0.5 size-4 shrink-0" style={{ color }} />
        <p className="text-sm leading-6 text-gray-300">
          <span className="font-semibold text-white">Key idea:</span>{" "}
          {guide.takeaway}
        </p>
      </div>
    </div>
  );
}
