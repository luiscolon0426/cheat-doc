import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, FolderKanban, Target } from "lucide-react";
import { careerPaths, getCareerPath } from "../data";

type CareerPathPageProps = {
  params: Promise<{ level: string }>;
};

export function generateStaticParams() {
  return careerPaths.map((path) => ({ level: path.slug }));
}

export async function generateMetadata({
  params,
}: CareerPathPageProps): Promise<Metadata> {
  const { level } = await params;
  const path = getCareerPath(level);

  return {
    title: path ? `${path.title} | CheatDoc.ME` : "Career Path | CheatDoc.ME",
    description: path?.summary,
  };
}

export default async function CareerPathPage({ params }: CareerPathPageProps) {
  const { level } = await params;
  const path = getCareerPath(level);

  if (!path) notFound();

  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          href="/career"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          All career paths
        </Link>

        <header className="py-12 sm:py-16">
          <div className="flex items-start gap-4 sm:gap-6">
            <span
              className="flex size-14 shrink-0 items-center justify-center rounded-2xl text-2xl sm:size-16"
              style={{ backgroundColor: `${path.color}20` }}
              aria-hidden="true"
            >
              {path.icon}
            </span>
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: path.color }}
              >
                {path.eyebrow}
              </span>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
                {path.title}
              </h1>
              <p className="mt-4 max-w-3xl leading-7 text-gray-400 sm:text-lg">
                {path.summary}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3 rounded-xl border border-gray-700/80 bg-[#151e30] p-5">
            <Target className="mt-0.5 size-5 shrink-0" style={{ color: path.color }} />
            <div>
              <h2 className="font-semibold">The goal</h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">{path.goal}</p>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {path.sections.map((section, index) => (
            <section
              key={section.title}
              className="overflow-hidden rounded-2xl border border-gray-700/80 bg-[#151e30]"
            >
              <div className="border-b border-gray-700/80 p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `${path.color}20`,
                      color: path.color,
                    }}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
              <ul className="grid gap-px bg-gray-700/60 sm:grid-cols-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 bg-[#151e30] p-5 text-sm leading-6 text-gray-300"
                  >
                    <Check
                      className="mt-1 size-4 shrink-0"
                      style={{ color: path.color }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-700/80 bg-[#151e30] p-6">
            <div className="flex items-center gap-3">
              <FolderKanban className="size-5" style={{ color: path.color }} />
              <h2 className="text-lg font-semibold">Projects to practice</h2>
            </div>
            <ul className="mt-5 space-y-4">
              {path.projects.map((project) => (
                <li key={project} className="flex gap-3 text-sm leading-6 text-gray-300">
                  <span style={{ color: path.color }}>→</span>
                  {project}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-gray-700/80 bg-[#151e30] p-6">
            <div className="flex items-center gap-3">
              <Target className="size-5" style={{ color: path.color }} />
              <h2 className="text-lg font-semibold">Evidence of growth</h2>
            </div>
            <ul className="mt-5 space-y-4">
              {path.evidence.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-gray-300">
                  <Check className="mt-1 size-4 shrink-0" style={{ color: path.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <nav
          className="mt-10 flex flex-col gap-3 border-t border-gray-800 pt-8 sm:flex-row sm:items-center sm:justify-between"
          aria-label="Career path navigation"
        >
          <Link
            href="/career"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Career overview
          </Link>
          {level !== "path-to-senior" && (
            <Link
              href="/career/path-to-senior"
              className="rounded-lg bg-emerald-500 px-4 py-2.5 text-center text-sm font-semibold text-gray-950 transition hover:bg-emerald-400"
            >
              Build your path to Senior
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
