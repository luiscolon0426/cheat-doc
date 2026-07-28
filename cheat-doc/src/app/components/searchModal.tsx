"use client";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import topics from "@/app/meta/allTopics.json";
import { careerPaths } from "@/app/career/data";
import { learningAreas } from "@/app/learn/data";
import { journalEntries } from "@/app/journal/data";
import { motion, AnimatePresence } from "framer-motion";

type SearchItem = {
  href: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  group: string;
  preview: Record<string, string[]>;
};

const searchItems: SearchItem[] = [
  ...topics.map((topic): SearchItem => ({
    href: `/${topic.slug}`,
    title: topic.title,
    description: topic.description,
    tags: topic.tags,
    icon: topic.icon,
    group: "Tech",
    preview: topic.preview as unknown as Record<string, string[]>,
  })),
  ...careerPaths.map((path): SearchItem => ({
    href: `/career/${path.slug}`,
    title: path.title,
    description: path.summary,
    tags: ["career", path.eyebrow.toLowerCase()],
    icon: path.icon,
    group: "Career",
    preview: Object.fromEntries(
      path.sections.slice(0, 3).map((section) => [
        section.title,
        section.items.slice(0, 4),
      ]),
    ),
  })),
  ...learningAreas.map((area): SearchItem => ({
    href: `/learn/${area.slug}`,
    title: area.title,
    description: area.description,
    tags: [area.eyebrow.toLowerCase(), ...area.topics],
    icon: area.icon,
    group: "Playbook",
    preview: {
      "Featured topics": area.topics.slice(0, 8),
      "Deep dives": area.featured.map((guide) => guide.title),
    },
  })),
  ...journalEntries.map((entry): SearchItem => ({
    href: `/journal/${entry.slug}`,
    title: entry.title,
    description: entry.summary,
    tags: entry.tags,
    icon: "✦",
    group: "Journal",
    preview: {
      [entry.category]: entry.sections.map((section) => section.title),
      Context: [entry.context, entry.level, `Reviewed ${entry.reviewed}`],
    },
  })),
  {
    href: "/learn/toolkit",
    title: "Personal Developer Toolkit",
    description: "Track goals, notes, career evidence, and custom snippets locally.",
    tags: ["toolkit", "goals", "notes", "progress"],
    icon: "🧰",
    group: "Playbook",
    preview: { Tools: ["Growth goals", "Learning notes", "Evidence journal", "Custom snippets"] },
  },
  {
    href: "/now",
    title: "What I’m Learning Now",
    description: "What Luis is currently building, studying, and exploring.",
    tags: ["now", "learning", "building"],
    icon: "◉",
    group: "Journal",
    preview: { Current: ["Building", "Studying", "Questions I’m exploring"] },
  },
  {
    href: "/changelog",
    title: "CheatDoc Build Log",
    description: "A public record of how this engineering field guide is evolving.",
    tags: ["changelog", "build log", "updates"],
    icon: "⑂",
    group: "Journal",
    preview: { Updates: ["Engineering journal", "Personal field guide", "Applied engineering"] },
  },
];

const fuse = new Fuse(searchItems, {
  keys: ["title", "description", "tags", "group"],
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
  const results = query ? fuse.search(query).map((r) => r.item) : searchItems;
  const [selected, setSelected] = useState(results[0]);

  useEffect(() => {
    setSelected(results[0]);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && selected) {
        window.location.href = selected.href;
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
                  onClick={() => (window.location.href = item.href)}
                  onMouseEnter={() => setSelected(item)}
                  className={`cursor-pointer p-4 pr-12 hover:bg-gray-800 ${
                    item.href === selected?.href ? "bg-gray-800" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="mt-0.5 text-xs text-gray-500">{item.group}</div>
                    </div>
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
