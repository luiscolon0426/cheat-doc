import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Linkedin } from "lucide-react";

const newsletterUrl =
  "https://www.linkedin.com/newsletters/building-real-products-7416884045105741824/";

export const metadata: Metadata = {
  title: "Building Real Products | DevMarks",
  description:
    "Practical lessons from shipping, refactoring, and designing real-world web apps.",
  alternates: {
    canonical: "/newsletter",
  },
};

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Link
          href="/journal"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" /> Engineering journal
        </Link>

        <section className="relative mt-12 overflow-hidden rounded-2xl border border-sky-400/20 bg-[#151e30] p-7 sm:p-10">
          <div className="absolute -right-16 -top-16 size-56 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-sm text-sky-300">
              <Linkedin className="size-4" /> Monthly on LinkedIn
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Building Real Products
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-400">
              Practical lessons from shipping, refactoring, and designing
              real-world web apps.
            </p>
            <a
              href={newsletterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-3 font-medium text-white transition hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              Read and subscribe on LinkedIn
              <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 text-sm text-gray-500">
              LinkedIn sign-in is required to subscribe.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
