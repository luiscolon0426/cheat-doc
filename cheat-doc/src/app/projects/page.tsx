import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "../content/data";

export const metadata: Metadata = {
  title: "Projects and Work | DevMarks",
  description:
    "Projects, production case studies, and engineering work by software engineer Luis Colon.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-sm text-blue-300">
          Knowledge connected to practice
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Projects and engineering work
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
          The systems behind these field notes—and the decisions, constraints,
          and outcomes that made the lessons useful.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-3">
        {portfolioProjects.map((project) => {
          const content = (
            <>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-400">
                    {item}
                  </span>
                ))}
              </div>
              <span className="mt-auto inline-flex items-center gap-1 pt-8 text-sm text-blue-300">
                {project.cta}
                {project.external ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
              </span>
            </>
          );
          const classes =
            "group flex min-h-72 flex-col rounded-2xl border border-gray-700/80 bg-[#151e30] p-6 transition hover:-translate-y-1 hover:border-blue-400/40";
          return project.external ? (
            <a key={project.title} href={project.href} target="_blank" rel="noopener noreferrer" className={classes}>
              {content}
            </a>
          ) : (
            <Link key={project.title} href={project.href} className={classes}>
              {content}
            </Link>
          );
        })}
      </section>
    </main>
  );
}
