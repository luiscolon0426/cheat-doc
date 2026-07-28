import Link from "next/link";
import { ArrowRight, BookOpen, Wrench } from "lucide-react";
import { learningAreas } from "./data";

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pt-24 text-white">
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-sm text-blue-300">
          Applied engineering
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Learn how professional software gets built
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
          Playbooks, scenarios, architecture, production practices, templates,
          and projects that turn technical knowledge into engineering judgment.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Learning areas</h2>
            <p className="mt-2 text-sm text-gray-400">
              Use these as references, practice material, or team discussion guides.
            </p>
          </div>
          <span className="shrink-0 text-sm text-gray-500">
            {learningAreas.length + 1} areas
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningAreas.map((area) => (
            <Link
              href={`/learn/${area.slug}`}
              key={area.slug}
              className="group relative min-h-56 overflow-hidden rounded-2xl border border-gray-700/80 bg-[#151e30] p-6 transition duration-200 hover:-translate-y-1 hover:border-gray-500 hover:bg-[#1a2539] hover:shadow-xl hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: area.color }}
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: area.color }}
                  >
                    {area.eyebrow}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">{area.title}</h3>
                </div>
                <span className="text-2xl" aria-hidden="true">{area.icon}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-400">{area.description}</p>
              <div className="absolute inset-x-6 bottom-5 flex items-center justify-between text-sm">
                <span className="text-gray-500">{area.topics.length} topics</span>
                <ArrowRight className="size-4 text-gray-500 transition group-hover:translate-x-1 group-hover:text-white" />
              </div>
            </Link>
          ))}

          <Link
            href="/learn/toolkit"
            className="group relative min-h-56 overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-emerald-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  Your workspace
                </span>
                <h3 className="mt-2 text-xl font-semibold">Personal Toolkit</h3>
              </div>
              <Wrench className="size-6 text-emerald-300" />
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Save notes, track growth goals, and keep a private evidence journal in your browser.
            </p>
            <div className="absolute inset-x-6 bottom-5 flex items-center justify-between text-sm text-emerald-300">
              <span className="flex items-center gap-2">
                <BookOpen className="size-4" /> Local and private
              </span>
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
