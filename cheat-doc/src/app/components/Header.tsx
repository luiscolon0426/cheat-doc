"use client";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";

export default function Header({
  onSearchClick,
}: {
  onSearchClick: () => void;
}) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e1525] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-green-400">
          Cheat<span className="text-white">Doc</span>.ME
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <div
            onClick={onSearchClick}
            className="bg-gray-800 text-sm text-gray-300 px-3 py-1 rounded hover:bg-gray-700 cursor-pointer flex items-center gap-2"
          >
            🔍 <span className="hidden sm:inline">Search</span>
            <kbd className="bg-gray-600 px-2 py-0.5 rounded text-xs">⌘ K</kbd>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded bg-gray-700 hover:bg-gray-600 transition"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-blue-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
