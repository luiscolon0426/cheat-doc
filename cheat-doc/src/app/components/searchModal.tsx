"use client";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import topics from "@/app/meta/allTopics.json";
import { motion, AnimatePresence } from "framer-motion";

const fuse = new Fuse(topics, {
  keys: ["title", "description", "tags"],
  threshold: 0.3,
});

export default function SearchModal({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const [query, setQuery] = useState("");
  const results = query ? fuse.search(query).map((r) => r.item) : topics;
  const [selected, setSelected] = useState(results[0]);

  useEffect(() => {
    setSelected(results[0]);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && selected) {
        window.location.href = `/${selected.slug}`;
      }
      if (e.key === "Escape") {
        close();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex h-[min(600px,80vh)] w-full max-w-4xl overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left Panel */}
            <div className="w-full overflow-y-auto md:w-1/2 md:border-r md:border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for cheatsheet..."
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {results.map((item, i) => (
                <div
                  key={i}
                  onClick={() => (window.location.href = `/${item.slug}`)}
                  onMouseEnter={() => setSelected(item)}
                  className={`cursor-pointer p-4 pr-12 hover:bg-gray-800 ${
                    item.slug === selected?.slug ? "bg-gray-800" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="font-semibold">{item.title}</div>
                    {item.icon && <div>{item.icon}</div>}
                  </div>
                  <div className="text-sm text-gray-400">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Panel */}
            <div className="hidden w-1/2 overflow-y-auto p-6 text-white md:block">
              {selected.preview ? (
                <div className="space-y-4">
                  {Object.entries(selected.preview).map(([section, items]) => (
                    <div key={section}>
                      <h3 className="text-white font-semibold text-sm mb-1">
                        {section}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                        {items.map((item: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-gray-800 px-2 py-1 rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No preview available.</p>
              )}
            </div>

            <button
              onClick={close}
              aria-label="Close search"
              className="absolute right-4 top-4 z-10 rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
