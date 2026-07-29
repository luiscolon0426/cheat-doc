import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { goalPaths } from "../content/data";

export const metadata: Metadata = {
  title: "Start Here | DevMarks",
  description:
    "Goal-based paths through DevMarks for shipping applications, growing your career, learning backend engineering, and preparing for interviews.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="inline-flex rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm text-green-300">
          Choose an outcome
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Start with where you want to go
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
          Follow a focused route through the references, playbooks, projects, and
          lessons instead of browsing everything at once.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
        {goalPaths.map((path) => (
          <article
            key={path.slug}
            id={path.slug}
            className="scroll-mt-24 rounded-2xl border border-gray-700/80 bg-[#151e30] p-6 sm:p-7"
          >
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-400/10 text-2xl">
                {path.icon}
              </span>
              <div>
                <h2 className="text-xl font-semibold">{path.title}</h2>
                <p className="mt-2 leading-7 text-gray-400">{path.summary}</p>
              </div>
            </div>
            <ol className="mt-7 space-y-3">
              {path.steps.map((step, index) => (
                <li key={step.title}>
                  <Link
                    href={step.href}
                    className="group flex gap-3 rounded-xl border border-gray-700/70 bg-gray-900/30 p-4 transition hover:border-gray-500 hover:bg-gray-900/60"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-400/10 text-xs font-bold text-green-300">
                      {index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-medium">
                        {step.title}
                        <ArrowRight className="size-4 text-gray-600 transition group-hover:translate-x-1 group-hover:text-white" />
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-gray-400">
                        {step.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle2 className="size-4 text-green-300" />
              Follow in order or jump to the step you need.
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
