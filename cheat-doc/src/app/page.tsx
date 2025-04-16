"use client";
import Head from "next/head";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <main className="bg-[#0e1525] min-h-screen text-white">
        {/* Hero Section */}
        <div className="text-center py-20 px-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Quick Reference</h1>
          <p className="mt-4 text-lg text-gray-400">
            Here are some cheatsheets and quick references contributed by devs
            like you.
          </p>

          {/* Optional Search Prompt (can be removed if header search is enough) */}
          <div className="mt-8 max-w-md mx-auto">
            <div
              className="w-full px-4 py-2 rounded-md bg-[#1f2937] text-white text-left placeholder-gray-400 border border-gray-600 cursor-pointer hover:border-blue-500 transition"
              onClick={() => {
                const event = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                  bubbles: true,
                });
                window.dispatchEvent(event);
              }}
            >
              <span className="opacity-60">Search for cheatsheet...</span>
              <kbd className="float-right bg-gray-600 px-2 py-0.5 rounded text-xs">
                ⌘ K
              </kbd>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <h2 className="text-xl font-semibold mb-6">Programming</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: "HTML", color: "bg-red-500" },
              { name: "CSS", color: "bg-blue-500" },
              { name: "JavaScript", color: "bg-yellow-500 text-black" },
              { name: "Git", color: "bg-gray-700" },
              { name: "React", color: "bg-cyan-500" },
              { name: "Tailwind", color: "bg-teal-400" },
              { name: "Python", color: "bg-indigo-600" },
              { name: "Node.js", color: "bg-green-600" },
            ].map(({ name, color }) => (
              <a
                href={`/${name.toLowerCase().replace(".", "")}`} // handle "Node.js" → "nodejs"
                key={name}
                className={`block rounded-lg text-center py-4 px-2 font-semibold text-white hover:opacity-70 transition ${color}`}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
