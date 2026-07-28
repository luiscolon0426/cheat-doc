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
          {/* Hero Section */}
          <div className="text-center py-20 px-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Quick Reference</h1>
            <p className="mt-4 text-lg text-gray-400">
              Here are some cheatsheets and quick references contributed by devs
              like you.
            </p>

            {/* Search Field */}
            <div className="mt-8 max-w-md mx-auto">
              <div
                className="w-full px-4 py-2 rounded-md bg-[#1f2937] text-white text-left placeholder-gray-400 border border-gray-600 cursor-pointer hover:border-blue-500 transition"
                onClick={() => setOpenModal(true)}
              >
                <span className="opacity-60">Search for cheatsheet...</span>
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
                <h2 className="text-xl font-semibold">Explore cheatsheets</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Pick a topic for commands, examples, and quick references.
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
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-700">
          <p>
            &copy; {new Date().getFullYear()} All rights reserved. Designed by{" "}
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
