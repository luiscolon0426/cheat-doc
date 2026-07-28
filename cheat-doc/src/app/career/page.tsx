import Link from "next/link";
import { ArrowRight, Compass, Layers, Users } from "lucide-react";
import { careerPaths } from "./data";

const principles = [
  {
    icon: Layers,
    title: "Grow your scope",
    description: "Progress from completing tasks to owning outcomes, systems, and broader problems.",
  },
  {
    icon: Compass,
    title: "Improve your judgment",
    description: "Learn to make trade-offs using requirements, evidence, risk, and reversibility.",
  },
  {
    icon: Users,
    title: "Multiply the team",
    description: "Senior impact includes making other engineers and the whole team more effective.",
  },
];

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-[#0e1525] pt-24 text-white">
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
          Engineering growth
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Build the skills behind the title
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
          Practical paths for growing from strong foundations to senior-level
          ownership, judgment, communication, and impact.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-700/80 bg-[#151e30] p-5"
            >
              <Icon className="size-5 text-emerald-300" aria-hidden="true" />
              <h2 className="mt-4 font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Choose your path</h2>
          <p className="mt-2 text-sm text-gray-400">
            Start with your current responsibilities, not just your job title.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {careerPaths.map((path) => (
            <Link
              href={`/career/${path.slug}`}
              key={path.slug}
              className="group relative overflow-hidden rounded-2xl border border-gray-700/80 bg-[#151e30] p-6 transition duration-200 hover:-translate-y-1 hover:border-gray-500 hover:bg-[#1a2539] hover:shadow-xl hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: path.color }}
              />
              <div className="flex items-start gap-4">
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{ backgroundColor: `${path.color}20` }}
                  aria-hidden="true"
                >
                  {path.icon}
                </span>
                <div className="min-w-0">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: path.color }}
                  >
                    {path.eyebrow}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold">{path.title}</h3>
                  <p className="mt-2 leading-6 text-gray-400">{path.summary}</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gray-700/70 pt-4 text-sm">
                <span className="text-gray-500">
                  {path.sections.length} growth areas
                </span>
                <span className="flex items-center gap-1 text-gray-300 transition group-hover:text-white">
                  Explore <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
