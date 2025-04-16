"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e1525] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-green-400">
          Cheat<span className="text-white">Doc</span>.ME
        </Link>

        <div className="flex items-center gap-2">
          <button
            className="bg-gray-800 text-sm text-gray-300 px-3 py-1 rounded hover:bg-gray-700"
            onClick={() => {
              const event = new KeyboardEvent("keydown", {
                key: "k",
                metaKey: true,
              });
              window.dispatchEvent(event);
            }}
          >
            ⌘K
          </button>
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
