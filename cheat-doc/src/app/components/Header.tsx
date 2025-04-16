"use client";
import { useEffect, useState } from "react";
import SearchModal from "./searchModal";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  // ⌘K shortcut opens the modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0e1525] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          <span className="text-green-400">Quick</span>Ref
          <span className="text-blue-400">.ME</span>
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-sm text-gray-300 rounded-md hover:bg-gray-700 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
            />
          </svg>
          Search for cheatsheet…
          <kbd className="ml-auto bg-gray-600 px-2 py-0.5 rounded text-xs">
            ⌘ K
          </kbd>
        </button>
      </header>

      {showModal && <SearchModal close={() => setShowModal(false)} />}
    </>
  );
}
