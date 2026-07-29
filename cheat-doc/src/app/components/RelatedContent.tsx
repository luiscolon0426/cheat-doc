import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedItem = {
  href: string;
  title: string;
  description: string;
  type: string;
};

export default function RelatedContent({
  items,
  title = "Keep exploring",
}: {
  items: RelatedItem[];
  title?: string;
}) {
  if (items.length === 0) return null;

  return (
    <aside className="mt-14 border-t border-gray-800 pt-8">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-gray-700/80 bg-[#151e30] p-5 transition hover:-translate-y-0.5 hover:border-gray-500"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-green-300">
              {item.type}
            </span>
            <h3 className="mt-2 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">{item.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-gray-300">
              Explore <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
