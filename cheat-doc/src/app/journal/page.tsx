import Link from "next/link";
import { ArrowRight, Clock3, History, Radio } from "lucide-react";
import { journalCategories, journalEntries } from "./data";

const categoryColors = {
  "Case Study": "#34d399",
  "Production Lesson": "#f97316",
  "Decision Note": "#a78bfa",
  Advice: "#38bdf8",
};

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pt-24 text-white">
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="inline-flex rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm text-green-300">
          From the field
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          My engineering journal
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
          Anonymized project lessons, production reminders, technical decisions,
          and advice I would give my younger developer self.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/now"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-[#151e30] px-4 py-2 text-sm text-gray-300 hover:border-gray-500 hover:text-white"
          >
            <Radio className="size-4 text-green-300" /> What I&apos;m learning now
          </Link>
          <Link
            href="/changelog"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-[#151e30] px-4 py-2 text-sm text-gray-300 hover:border-gray-500 hover:text-white"
          >
            <History className="size-4 text-blue-300" /> CheatDoc build log
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-4 pb-24 sm:px-6">
        {journalCategories.map((category) => {
          const entries = journalEntries.filter((entry) => entry.category === category);
          return (
            <section key={category}>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{category}</h2>
                <span className="text-sm text-gray-500">{entries.length} notes</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {entries.map((entry) => (
                  <Link
                    href={`/journal/${entry.slug}`}
                    key={entry.slug}
                    className="group relative overflow-hidden rounded-xl border border-gray-700/80 bg-[#151e30] p-5 transition hover:-translate-y-0.5 hover:border-gray-500 hover:bg-[#1a2539]"
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-1"
                      style={{ backgroundColor: categoryColors[category] }}
                    />
                    <div className="flex items-center gap-3 text-xs">
                      <span style={{ color: categoryColors[category] }}>{entry.context}</span>
                      <span className="text-gray-700">•</span>
                      <span className="text-gray-500">{entry.level}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-400">{entry.summary}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="size-3.5" /> Reviewed {entry.reviewed}
                      </span>
                      <ArrowRight className="size-4 transition group-hover:translate-x-1 group-hover:text-white" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
