// components/Header.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Github, Search } from "lucide-react";

export default function Header() {
  const [stars, setStars] = useState<number | null>(null);
  const pathname = usePathname();
  const isCareer = pathname.startsWith("/career");
  const isLearn = pathname.startsWith("/learn");

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch("/api/github-stars");
        const data = await response.json();
        setStars(data.stars);
      } catch (error) {
        console.error("Error fetching star count:", error);
      }
    };

    fetchStars();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e1525] border-b border-gray-800">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6">
        <Link href="/" className="shrink-0 text-lg font-bold text-green-400 sm:text-xl">
          <span className="sm:hidden">C<span className="text-white">D</span></span>
          <span className="hidden sm:inline">
            Cheat<span className="text-white">Doc</span>.ME
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm" aria-label="Main navigation">
          <Link
            href="/"
            className={`rounded-md px-2.5 py-1.5 transition sm:px-3 ${
              !isCareer && !isLearn
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Tech
          </Link>
          <Link
            href="/career"
            className={`rounded-md px-2.5 py-1.5 transition sm:px-3 ${
              isCareer
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Career
          </Link>
          <Link
            href="/learn"
            className={`rounded-md px-2.5 py-1.5 transition sm:px-3 ${
              isLearn
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span className="sm:hidden">Learn</span>
            <span className="hidden sm:inline">Playbook</span>
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {pathname === "/" && (
          <button
            className="flex items-center gap-1 rounded bg-gray-800 p-2 text-sm text-gray-300 transition hover:bg-gray-700 sm:px-3 sm:py-1"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                })
              )
            }
          >
            <Search size={14} />
            <span className="hidden md:inline">Search</span>
            <kbd className="ml-2 hidden rounded bg-gray-600 px-1.5 py-0.5 text-xs lg:inline">
              ⌘ K
            </kbd>
          </button>
          )}

          <a
            href="https://github.com/luiscolon0426/cheat-doc"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded bg-gray-800 px-3 py-1 text-sm text-gray-300 hover:bg-gray-700 lg:block"
          >
            ⭐ Star {stars !== null ? `(${stars})` : ""}
          </a>

          <a
            href="https://github.com/luiscolon0426"
            target="_blank"
            className="hidden text-gray-400 transition hover:text-white sm:block"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
