"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

type Goal = {
  id: string;
  text: string;
  done: boolean;
};

type Evidence = {
  id: string;
  context: string;
  action: string;
  outcome: string;
  learning: string;
};

type Snippet = {
  id: string;
  title: string;
  content: string;
};

type ToolkitState = {
  goals: Goal[];
  notes: string;
  evidence: Evidence[];
  snippets: Snippet[];
};

const storageKey = "cheatdoc-personal-toolkit-v1";

const initialState: ToolkitState = {
  goals: [
    { id: "own-feature", text: "Own a feature from requirements through production", done: false },
    { id: "design-doc", text: "Write and review a technical design document", done: false },
    { id: "production", text: "Improve one measurable production signal", done: false },
    { id: "mentor", text: "Help another developer own meaningful work", done: false },
  ],
  notes: "",
  evidence: [],
  snippets: [],
};

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

export default function ToolkitClient() {
  const [toolkit, setToolkit] = useState<ToolkitState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [newGoal, setNewGoal] = useState("");
  const [evidenceDraft, setEvidenceDraft] = useState<Omit<Evidence, "id">>({
    context: "",
    action: "",
    outcome: "",
    learning: "",
  });
  const [snippetDraft, setSnippetDraft] = useState({ title: "", content: "" });

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setToolkit(JSON.parse(saved));
      } catch {
        setToolkit(initialState);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(storageKey, JSON.stringify(toolkit));
    }
  }, [hydrated, toolkit]);

  const completed = toolkit.goals.filter((goal) => goal.done).length;
  const progress = toolkit.goals.length
    ? Math.round((completed / toolkit.goals.length) * 100)
    : 0;

  function addGoal(event: FormEvent) {
    event.preventDefault();
    const text = newGoal.trim();
    if (!text) return;
    setToolkit((current) => ({
      ...current,
      goals: [...current.goals, { id: makeId(), text, done: false }],
    }));
    setNewGoal("");
  }

  function addEvidence(event: FormEvent) {
    event.preventDefault();
    if (!evidenceDraft.context.trim() || !evidenceDraft.outcome.trim()) return;
    setToolkit((current) => ({
      ...current,
      evidence: [...current.evidence, { id: makeId(), ...evidenceDraft }],
    }));
    setEvidenceDraft({ context: "", action: "", outcome: "", learning: "" });
  }

  function addSnippet(event: FormEvent) {
    event.preventDefault();
    if (!snippetDraft.title.trim() || !snippetDraft.content.trim()) return;
    setToolkit((current) => ({
      ...current,
      snippets: [...current.snippets, { id: makeId(), ...snippetDraft }],
    }));
    setSnippetDraft({ title: "", content: "" });
  }

  if (!hydrated) {
    return <div className="h-48 animate-pulse rounded-2xl bg-[#151e30]" />;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-gray-700/80 bg-[#151e30] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Growth goals</h2>
            <p className="mt-1 text-sm text-gray-400">
              Choose observable behaviors instead of vague learning goals.
            </p>
          </div>
          <span className="text-sm font-medium text-emerald-300">
            {completed}/{toolkit.goals.length} complete
          </span>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <ul className="mt-5 space-y-2">
          {toolkit.goals.map((goal) => (
            <li key={goal.id} className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900/40 p-3">
              <button
                type="button"
                onClick={() =>
                  setToolkit((current) => ({
                    ...current,
                    goals: current.goals.map((item) =>
                      item.id === goal.id ? { ...item, done: !item.done } : item,
                    ),
                  }))
                }
                aria-label={goal.done ? `Mark ${goal.text} incomplete` : `Mark ${goal.text} complete`}
                className={`flex size-6 shrink-0 items-center justify-center rounded border ${
                  goal.done
                    ? "border-emerald-400 bg-emerald-400 text-gray-950"
                    : "border-gray-600 text-transparent"
                }`}
              >
                <Check className="size-4" />
              </button>
              <span className={`min-w-0 flex-1 text-sm ${goal.done ? "text-gray-500 line-through" : "text-gray-200"}`}>
                {goal.text}
              </span>
              <DeleteButton
                label={`Delete ${goal.text}`}
                onClick={() =>
                  setToolkit((current) => ({
                    ...current,
                    goals: current.goals.filter((item) => item.id !== goal.id),
                  }))
                }
              />
            </li>
          ))}
        </ul>
        <form onSubmit={addGoal} className="mt-4 flex gap-2">
          <input
            value={newGoal}
            onChange={(event) => setNewGoal(event.target.value)}
            placeholder="Add a specific growth goal"
            className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm outline-none placeholder:text-gray-600 focus:border-emerald-400"
          />
          <button className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-gray-950 hover:bg-emerald-400">
            <Plus className="size-4" /> <span className="hidden sm:inline">Add</span>
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-gray-700/80 bg-[#151e30] p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Learning notes</h2>
        <p className="mt-1 text-sm text-gray-400">
          Capture questions, decisions, and ideas you want to revisit.
        </p>
        <textarea
          value={toolkit.notes}
          onChange={(event) =>
            setToolkit((current) => ({ ...current, notes: event.target.value }))
          }
          rows={8}
          placeholder="What did you learn? What remains unclear?"
          className="mt-5 w-full resize-y rounded-lg border border-gray-700 bg-gray-900 p-4 text-sm leading-6 outline-none placeholder:text-gray-600 focus:border-emerald-400"
        />
        <p className="mt-2 text-xs text-gray-600">Saved automatically in this browser.</p>
      </section>

      <section className="rounded-2xl border border-gray-700/80 bg-[#151e30] p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Evidence journal</h2>
        <p className="mt-1 text-sm text-gray-400">
          Record context, your contribution, the result, and what you learned.
        </p>
        <form onSubmit={addEvidence} className="mt-5 grid gap-3 sm:grid-cols-2">
          {(["context", "action", "outcome", "learning"] as const).map((field) => (
            <textarea
              key={field}
              value={evidenceDraft[field]}
              onChange={(event) =>
                setEvidenceDraft((current) => ({ ...current, [field]: event.target.value }))
              }
              rows={3}
              required={field === "context" || field === "outcome"}
              placeholder={{
                context: "Context: What problem or risk existed? *",
                action: "Action: What did you decide or lead?",
                outcome: "Outcome: What measurably changed? *",
                learning: "Learning: What would you repeat or change?",
              }[field]}
              className="rounded-lg border border-gray-700 bg-gray-900 p-3 text-sm leading-6 outline-none placeholder:text-gray-600 focus:border-emerald-400"
            />
          ))}
          <button className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-gray-950 hover:bg-emerald-400 sm:col-span-2">
            Add evidence
          </button>
        </form>
        <div className="mt-6 space-y-3">
          {toolkit.evidence.map((entry) => (
            <article key={entry.id} className="relative rounded-xl border border-gray-700 bg-gray-900/50 p-4 pr-12">
              <p className="font-medium">{entry.context}</p>
              {entry.action && <p className="mt-2 text-sm text-gray-400"><strong className="text-gray-300">Action:</strong> {entry.action}</p>}
              <p className="mt-2 text-sm text-gray-400"><strong className="text-gray-300">Outcome:</strong> {entry.outcome}</p>
              {entry.learning && <p className="mt-2 text-sm text-gray-400"><strong className="text-gray-300">Learning:</strong> {entry.learning}</p>}
              <div className="absolute right-3 top-3">
                <DeleteButton
                  label="Delete evidence"
                  onClick={() =>
                    setToolkit((current) => ({
                      ...current,
                      evidence: current.evidence.filter((item) => item.id !== entry.id),
                    }))
                  }
                />
              </div>
            </article>
          ))}
          {!toolkit.evidence.length && <EmptyState text="No evidence recorded yet." />}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-700/80 bg-[#151e30] p-5 sm:p-6">
        <h2 className="text-xl font-semibold">Custom snippets</h2>
        <p className="mt-1 text-sm text-gray-400">
          Keep commands, checklists, or code you personally reuse.
        </p>
        <form onSubmit={addSnippet} className="mt-5 space-y-3">
          <input
            value={snippetDraft.title}
            onChange={(event) => setSnippetDraft((current) => ({ ...current, title: event.target.value }))}
            placeholder="Snippet title"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-sm outline-none placeholder:text-gray-600 focus:border-emerald-400"
          />
          <textarea
            value={snippetDraft.content}
            onChange={(event) => setSnippetDraft((current) => ({ ...current, content: event.target.value }))}
            rows={5}
            placeholder="Command, checklist, or code"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 font-mono text-sm leading-6 outline-none placeholder:text-gray-600 focus:border-emerald-400"
          />
          <button className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-gray-950 hover:bg-emerald-400">
            Save snippet
          </button>
        </form>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {toolkit.snippets.map((snippet) => (
            <article key={snippet.id} className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-950 p-4 pr-12">
              <h3 className="font-medium">{snippet.title}</h3>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-gray-400"><code>{snippet.content}</code></pre>
              <div className="absolute right-3 top-3">
                <DeleteButton
                  label={`Delete ${snippet.title}`}
                  onClick={() =>
                    setToolkit((current) => ({
                      ...current,
                      snippets: current.snippets.filter((item) => item.id !== snippet.id),
                    }))
                  }
                />
              </div>
            </article>
          ))}
          {!toolkit.snippets.length && <EmptyState text="No custom snippets saved yet." />}
        </div>
      </section>
    </div>
  );
}

function DeleteButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="rounded p-1.5 text-gray-600 transition hover:bg-red-400/10 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
    >
      <Trash2 className="size-4" />
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-lg border border-dashed border-gray-700 p-5 text-center text-sm text-gray-600">
      {text}
    </p>
  );
}
