"use client";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import topics from "@/app/meta/allTopics.json";
import { careerPaths } from "@/app/career/data";
import { learningAreas } from "@/app/learn/data";
import { journalEntries } from "@/app/journal/data";
import { blueprints, caseStudies, goalPaths, portfolioProjects } from "@/app/content/data";
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
  ...caseStudies.map((study): SearchItem => ({
    href: `/case-studies/${study.slug}`,
    title: study.title,
    description: study.summary,
    tags: study.tags,
    icon: "◈",
    group: "Case Studies",
    preview: {
      Outcome: [study.outcome],
      Sections: study.sections.map((section) => section.title),
    },
  })),
  ...blueprints.map((blueprint): SearchItem => ({
    href: `/blueprints/${blueprint.slug}`,
    title: blueprint.title,
    description: blueprint.summary,
    tags: [...blueprint.stack, blueprint.level],
    icon: "▦",
    group: "Blueprints",
    preview: {
      Build: blueprint.outcomes,
      Plan: blueprint.phases.map((phase) => phase.title),
    },
  })),
  ...goalPaths.map((path): SearchItem => ({
    href: `/start#${path.slug}`,
    title: path.title,
    description: path.summary,
    tags: path.steps.map((step) => step.title),
    icon: path.icon,
    group: "Paths",
    preview: { Steps: path.steps.map((step) => step.title) },
  })),
  ...portfolioProjects.map((project): SearchItem => ({
    href: project.href,
    title: project.title,
    description: project.summary,
    tags: project.stack,
    icon: "◆",
    group: "Projects",
    preview: { Stack: project.stack },
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
    title: "DevMarks Build Log",
    description: "A public record of how this engineering field guide is evolving.",
    tags: ["changelog", "build log", "updates"],
    icon: "⑂",
    group: "Journal",
    preview: { Updates: ["Engineering journal", "Personal field guide", "Applied engineering"] },
  },
  {
    href: "/newsletter",
    title: "Building Real Products",
    description: "Practical lessons from shipping, refactoring, and designing real-world web apps.",
    tags: ["newsletter", "linkedin", "shipping", "products"],
    icon: "✉",
    group: "Newsletter",
    preview: { Published: ["Monthly on LinkedIn"] },
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
  const [activeGroup, setActiveGroup] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const groups = ["All", ...Array.from(new Set(searchItems.map((item) => item.group)))];
  const results = useMemo(() => {
    const matches = query ? fuse.search(query).map((result) => result.item) : searchItems;
    return activeGroup === "All"
      ? matches
      : matches.filter((item) => item.group === activeGroup);
  }, [query, activeGroup]);
  const selected = results[selectedIndex];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeGroup]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && selected) {
        window.location.href = selected.href;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((index) => Math.min(index + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((index) => Math.max(index - 1, 0));
      }
      if (e.key === "Escape") {
        close();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, results.length, open, close]);

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
              <div className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900 p-4">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search DevMarks..."
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {groups.map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() => setActiveGroup(group)}
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs transition ${
                        activeGroup === group
                          ? "bg-blue-500 text-white"
                          : "bg-gray-800 text-gray-400 hover:text-white"
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>

              {results.map((item, i) => (
                <div
                  key={i}
                  onClick={() => (window.location.href = item.href)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`cursor-pointer p-4 pr-12 hover:bg-gray-800 ${
                    i === selectedIndex ? "bg-gray-800" : ""
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
              {results.length === 0 && (
                <p className="p-6 text-sm text-gray-500">No matching content found.</p>
              )}
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
