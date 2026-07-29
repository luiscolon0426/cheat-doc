import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Hammer, HelpCircle, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "What I'm Learning Now | DevMarks",
  description: "What Luis is currently building, studying, and exploring in software engineering.",
};

const nowItems = [
  {
    icon: Hammer,
    title: "Building",
    items: [
      "Turning DevMarks from a syntax reference into a personal engineering field guide",
      "Organizing technical notes, career lessons, and applied engineering practices",
      "Making useful knowledge easier to search, revisit, and share",
    ],
  },
  {
    icon: BookOpen,
    title: "Studying",
    items: [
      "Astro and its server-first islands approach to content-focused websites",
      "Supabase Postgres, Auth, Row Level Security, Storage, and Realtime",
      "Cloudflare Workers, edge caching, R2, D1, and platform bindings",
      "System-design trade-offs and how simple architectures evolve",
      "Production reliability, observability, and incident learning",
      "Secure API, authentication, webhook, and payment patterns"
    ],
  },
  {
    icon: HelpCircle,
    title: "Questions I’m exploring",
    items: [
      "How can engineering guidance stay practical without becoming rigid?",
      "What makes a technical reference useful during real production work?",
      "How can developers collect better evidence of their growth?",
      "Which lessons are universal, and which depend on team and system context?",
    ],
  },
];

export default function NowPage() {
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
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm text-green-300">
            <RefreshCw className="size-3.5" /> Updated July 2026
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            What I&apos;m learning now
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            A snapshot of what I&apos;m building, studying, and still trying to
            understand. This page is intentionally unfinished because the work is too.
          </p>
        </header>

        <div className="space-y-5">
          {nowItems.map(({ icon: Icon, title, items }) => (
            <section key={title} className="rounded-2xl border border-gray-700/80 bg-[#151e30] p-6">
              <div className="flex items-center gap-3">
                <Icon className="size-5 text-green-300" />
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-gray-400">
                    <span className="text-green-300">→</span> {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-gray-500">
          This is a current-focus page, not a claim of expertise. Topics move as
          projects, questions, and priorities change.
        </p>
      </div>
    </main>
  );
}
