"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SearchModal from "./components/searchModal";
import topics from "./meta/allTopics.json";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      if (
        (isMac && e.metaKey && e.key === "k") ||
        (!isMac && e.ctrlKey && e.key === "k")
      ) {
        e.preventDefault();
        setOpenModal(true);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* <Header onSearchClick={() => setOpenModal(true)} /> */}

      {openModal && (
        <SearchModal open={openModal} close={() => setOpenModal(false)} />
      )}

      <main className="bg-[#0e1525] min-h-screen text-white pt-24 flex flex-col justify-between">
        <div>
          <div className="text-center py-20 px-4">
            <span className="inline-flex rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-sm text-green-300">
              Notes from 5+ years in software engineering
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Luis&apos;s Engineering Field Notes
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-400">
              Commands, patterns, mistakes, and lessons I keep coming back to
              while building web, mobile, backend, and cloud software.
            </p>

            {/* Search Field */}
            <div className="mt-8 max-w-md mx-auto">
              <div
                className="w-full px-4 py-2 rounded-md bg-[#1f2937] text-white text-left placeholder-gray-400 border border-gray-600 cursor-pointer hover:border-blue-500 transition"
                onClick={() => setOpenModal(true)}
              >
                <span className="opacity-60">Search my technical notes...</span>
                <kbd className="float-right bg-gray-600 px-2 py-0.5 rounded text-xs">
                  ⌘ K
                </kbd>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Technical notes</h2>
                <p className="mt-1 text-sm text-gray-400">
                  The references and examples I want close by when I&apos;m
                  building.
                </p>
              </div>
              <span className="shrink-0 text-sm text-gray-500">
                {topics.length} topics
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {topics.map((topic) => (
                <Link
                  href={`/${topic.slug}`}
                  key={topic.slug}
                  className="group relative min-h-36 overflow-hidden rounded-xl border border-gray-700/80 bg-[#151e30] p-5 transition duration-200 hover:-translate-y-1 hover:border-gray-500 hover:bg-[#1a2539] hover:shadow-xl hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: topic.color }}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white transition group-hover:text-blue-100">
                        {topic.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-400">
                        {topic.description}
                      </p>
                    </div>
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg text-lg"
                      style={{
                        backgroundColor: `${topic.color}20`,
                        color: topic.color,
                      }}
                      aria-hidden="true"
                    >
                      {topic.icon}
                    </span>
                  </div>
                  <span className="absolute bottom-4 right-5 text-gray-600 transition group-hover:translate-x-1 group-hover:text-gray-300">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <div className="relative overflow-hidden rounded-2xl border border-gray-700/80 bg-[#151e30] p-6 sm:p-8">
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-green-400/5 blur-3xl" />
              <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-green-300">
                    About these notes
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold">
                    The things I&apos;ve learned—and the things I&apos;m still
                    learning
                  </h2>
                  <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                    I&apos;m Luis Colon, a software engineer working across web,
                    mobile, backend systems, and cloud infrastructure. CheatDoc
                    is where I organize the references I repeatedly need,
                    lessons from production work, and advice I wish I had
                    earlier.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-5">
                  <p className="text-sm leading-6 text-gray-400">
                    These are working field notes—not universal rules. They
                    combine my professional experience, personal projects,
                    official documentation, and ongoing research.
                  </p>
                  <a
                    href="https://luiscolon0426.github.io/portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex text-sm font-medium text-green-300 transition hover:text-green-200"
                  >
                    More about my work →
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-700">
          <p>
            &copy; {new Date().getFullYear()} Field notes collected and designed
            by{" "}
            <a
              href="https://luiscolon0426.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Luis Colon
            </a>
            .
          </p>
        </footer>
      </main>
    </>
  );
}
