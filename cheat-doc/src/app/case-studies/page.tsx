import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { caseStudies } from "../content/data";

export const metadata: Metadata = {
  title: "Engineering Case Studies | DevMarks",
  description:
    "Real-world engineering case studies covering performance, payments, reliability, and recoverable real-time systems.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-sm text-orange-300">
          Decisions under real constraints
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Engineering case studies
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
          Anonymized examples of how I investigate problems, weigh trade-offs,
          reduce risk, and measure useful outcomes.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <Link
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            className="group flex min-h-80 flex-col rounded-2xl border border-gray-700/80 bg-[#151e30] p-6 transition hover:-translate-y-1 hover:border-orange-400/40"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-300">
              {study.context}
            </span>
            <h2 className="mt-3 text-xl font-semibold">{study.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">{study.summary}</p>
            <div className="mt-5 flex gap-3 rounded-xl bg-gray-900/50 p-4">
              <TrendingUp className="mt-0.5 size-4 shrink-0 text-green-300" />
              <p className="text-sm leading-6 text-gray-300">{study.outcome}</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm text-gray-300">
              Read the case study
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
