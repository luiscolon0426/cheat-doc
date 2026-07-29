import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GitCommitHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "DevMarks Build Log",
  description: "A public log of how Luis's engineering field guide is evolving.",
};

const releases = [
  {
    date: "July 2026",
    title: "The engineering journal",
    items: [
      "Added anonymized case studies from production experience",
      "Added production lessons, technical decision notes, and career advice",
      "Added context labels, review dates, related notes, and shareable links",
      "Added a current-learning page and public build log",
    ],
  },
  {
    date: "July 2026",
    title: "A personal field guide",
    items: [
      "Repositioned DevMarks as Luis’s Engineering Field Notes",
      "Added a transparent author and content-context section",
      "Rewrote Career and Learn around personal lessons and ongoing growth",
    ],
  },
  {
    date: "July 2026",
    title: "Applied engineering",
    items: [
      "Added developer playbooks and debugging challenges",
      "Added system design, production, security, and code-review guides",
      "Added project blueprints, patterns, templates, interviews, and common mistakes",
      "Added a private browser-local toolkit for goals, notes, evidence, and snippets",
    ],
  },
  {
    date: "July 2026",
    title: "Career paths",
    items: [
      "Added Junior, Mid-level, and Senior engineering paths",
      "Added a dedicated Path to Senior roadmap",
      "Added project practice and evidence-of-growth guidance",
    ],
  },
  {
    date: "July 2026",
    title: "Technical library expansion",
    items: [
      "Expanded the catalog to 40 technical topics",
      "Made homepage cards data-driven and responsive",
      "Improved mobile search and syntax highlighting",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/journal"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft className="size-4" /> Engineering journal
        </Link>
        <header className="py-12 sm:py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">
            Building in public
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            DevMarks build log
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            A record of how this project is changing as I organize what I&apos;ve
            learned and discover better ways to share it.
          </p>
        </header>

        <div className="relative space-y-10 before:absolute before:bottom-3 before:left-3 before:top-3 before:w-px before:bg-gray-700">
          {releases.map((release, index) => (
            <article key={`${release.title}-${index}`} className="relative pl-10">
              <span className="absolute left-0 top-1 flex size-6 items-center justify-center rounded-full border border-blue-400/30 bg-[#0e1525]">
                <GitCommitHorizontal className="size-3.5 text-blue-300" />
              </span>
              <span className="text-xs font-medium text-blue-300">{release.date}</span>
              <h2 className="mt-1 text-xl font-semibold">{release.title}</h2>
              <ul className="mt-4 space-y-2">
                {release.items.map((item) => (
                  <li key={item} className="text-sm leading-6 text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
