import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Layers3 } from "lucide-react";
import { blueprints } from "../content/data";

export const metadata: Metadata = {
  title: "Project Blueprints | DevMarks",
  description:
    "Production-minded application blueprints with architecture, milestones, security, testing, operations, and evidence of completion.",
  alternates: { canonical: "/blueprints" },
};

export default function BlueprintsPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-sm text-violet-300">
          Learn by shipping
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Real project blueprints
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
          Build complete systems with requirements, milestones, operational
          concerns, and proof that goes beyond a tutorial.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2">
        {blueprints.map((blueprint) => (
          <Link
            key={blueprint.slug}
            href={`/blueprints/${blueprint.slug}`}
            className="group rounded-2xl border border-gray-700/80 bg-[#151e30] p-6 transition hover:-translate-y-1 hover:border-violet-400/40"
          >
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="rounded-full bg-violet-400/10 px-2.5 py-1 font-medium text-violet-300">
                {blueprint.level}
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Clock3 className="size-3.5" /> {blueprint.duration}
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold">{blueprint.title}</h2>
            <p className="mt-3 leading-7 text-gray-400">{blueprint.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {blueprint.stack.map((item) => (
                <span key={item} className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-400">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-gray-700/70 pt-4 text-sm">
              <span className="flex items-center gap-2 text-gray-500">
                <Layers3 className="size-4" /> {blueprint.phases.length} phases
              </span>
              <span className="flex items-center gap-1 text-gray-300">
                View blueprint <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
