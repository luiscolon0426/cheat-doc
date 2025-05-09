"use client";
import { useEffect, useState } from "react";
import SearchModal from "./components/searchModal";

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
          <div className="max-w-6xl mx-auto px-4 pb-20">
            <h2 className="text-xl font-semibold mb-6">Programming</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[
                { name: "HTML", color: "bg-red-500" },
                { name: "CSS", color: "bg-blue-600" },
                { name: "JavaScript", color: "bg-yellow-500 text-black" },
                { name: "Git", color: "bg-gray-700" },
                { name: "PHP", color: "bg-cyan-500" },
                { name: "HomeBrew", color: "bg-teal-400" },
                { name: "Sass", color: "bg-indigo-600" },
                { name: "JSON", color: "bg-green-600" },
                { name: "Python", color: "bg-green-400" },
                { name: "NodeJS", color: "bg-yellow-400" },
                { name: "React", color: "bg-blue-300" },
              ].map(({ name, color }) => (
                <a
                  href={`/${name.toLowerCase().replace(".", "")}`}
                  key={name}
                  className={`block rounded-lg text-center py-4 px-2 font-semibold text-white hover:opacity-70 transition ${color}`}
                >
                  {name}
                </a>
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
