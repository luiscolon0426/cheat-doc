import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import ToolkitClient from "./ToolkitClient";

export const metadata: Metadata = {
  title: "Personal Developer Toolkit | CheatDoc.ME",
  description: "Track growth goals, learning notes, career evidence, and reusable snippets locally.",
};

export default function ToolkitPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link
          href="/learn"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" /> All learning areas
        </Link>
        <header className="py-12 sm:py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
            Your workspace
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
            Personal Developer Toolkit
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-gray-400 sm:text-lg">
            Turn learning into visible progress with goals, notes, evidence, and
            your own reusable references.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/60 px-3 py-1.5 text-xs text-gray-400">
            <LockKeyhole className="size-3.5 text-emerald-300" />
            Stored only in this browser using local storage
          </div>
        </header>
        <ToolkitClient />
      </div>
    </main>
  );
}
