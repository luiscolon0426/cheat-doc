// components/Header.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Search } from "lucide-react";

export default function Header() {
  const [stars, setStars] = useState<number | null>(null);

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
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-green-400">
          Cheat<span className="text-white">Doc</span>.ME
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <button
            className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-gray-300 text-sm transition"
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
            <span>Search</span>
            <kbd className="ml-2 bg-gray-600 px-1.5 py-0.5 rounded text-xs">
              ⌘ K
            </kbd>
          </button>

          {/* GitHub Star */}
          <a
            href="https://github.com/luiscolon0426/cheat-doc"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-gray-300 text-sm"
          >
            ⭐ Star {stars !== null ? `(${stars})` : ""}
          </a>

          {/* GitHub Icon */}
          <a
            href="https://github.com/luiscolon0426"
            target="_blank"
            className="text-gray-400 hover:text-white transition"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
