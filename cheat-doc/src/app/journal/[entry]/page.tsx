import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock3 } from "lucide-react";
import ShareButton from "../ShareButton";
import { getJournalEntry, journalEntries } from "../data";

type JournalEntryPageProps = {
  params: Promise<{ entry: string }>;
};

export function generateStaticParams() {
  return journalEntries.map((entry) => ({ entry: entry.slug }));
}

export async function generateMetadata({
  params,
}: JournalEntryPageProps): Promise<Metadata> {
  const { entry } = await params;
  const note = getJournalEntry(entry);
  return {
    title: note ? `${note.title} | Luis's Engineering Journal` : "Engineering Journal",
    description: note?.summary,
  };
}

export default async function JournalEntryPage({ params }: JournalEntryPageProps) {
  const { entry } = await params;
  const note = getJournalEntry(entry);
  if (!note) notFound();

  const related = note.related
    .map((slug) => getJournalEntry(slug))
    .filter((item) => item !== undefined);

  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/journal"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft className="size-4" /> Engineering journal
        </Link>

        <header className="py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-green-400/20 bg-green-400/10 px-2.5 py-1 text-green-300">
              {note.category}
            </span>
            <span className="rounded-full border border-gray-700 px-2.5 py-1 text-gray-400">
              {note.context}
            </span>
            <span className="rounded-full border border-gray-700 px-2.5 py-1 text-gray-400">
              {note.level}
            </span>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">{note.title}</h1>
          <p className="mt-5 text-lg leading-8 text-gray-400">{note.summary}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-gray-800 py-4">
            <span className="flex items-center gap-2 text-xs text-gray-500">
              <Clock3 className="size-4" /> Last reviewed {note.reviewed}
            </span>
            <ShareButton />
          </div>
        </header>

        <div className="space-y-10">
          {note.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-4 leading-8 text-gray-300">{section.body}</p>
              {section.points && (
                <ul className="mt-5 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-7 text-gray-400">
                      <Check className="mt-1.5 size-4 shrink-0 text-green-300" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2 border-t border-gray-800 pt-6">
          {note.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
              #{tag}
            </span>
          ))}
        </div>

        {related.length > 0 && (
          <aside className="mt-12">
            <h2 className="text-lg font-semibold">Related field notes</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/journal/${item.slug}`}
                  className="rounded-xl border border-gray-700 bg-[#151e30] p-4 transition hover:border-gray-500"
                >
                  <span className="text-xs text-green-300">{item.category}</span>
                  <h3 className="mt-2 font-medium">{item.title}</h3>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </main>
  );
}
