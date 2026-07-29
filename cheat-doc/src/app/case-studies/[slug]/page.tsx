import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, TrendingUp } from "lucide-react";
import JsonLd from "../../components/JsonLd";
import RelatedContent from "../../components/RelatedContent";
import ShareButton from "../../journal/ShareButton";
import { caseStudies, getCaseStudy } from "../../content/data";
import topics from "../../meta/allTopics.json";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return { title: "Case Study | DevMarks" };
  return {
    title: `${study.title} | DevMarks`,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.summary,
      url: `/case-studies/${study.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const related = study.relatedTopics
    .map((slug) => topics.find((topic) => topic.slug === slug))
    .filter((topic) => topic !== undefined)
    .map((topic) => ({
      href: `/${topic.slug}`,
      title: topic.title,
      description: topic.description,
      type: "Technical reference",
    }));

  return (
    <main className="min-h-screen bg-[#0e1525] pb-24 pt-24 text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: study.title,
          description: study.summary,
          author: { "@type": "Person", name: "Luis Colon" },
          publisher: { "@type": "Organization", name: "DevMarks" },
          mainEntityOfPage: `https://devmarks.netlify.app/case-studies/${study.slug}`,
        }}
      />
      <article className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/case-studies" className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
          <ArrowLeft className="size-4" /> All case studies
        </Link>
        <header className="py-12 sm:py-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-300">
            {study.context}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{study.title}</h1>
          <p className="mt-5 text-lg leading-8 text-gray-400">{study.summary}</p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-gray-800 py-4">
            <span className="flex items-center gap-2 text-sm text-green-300">
              <TrendingUp className="size-4" /> {study.outcome}
            </span>
            <ShareButton />
          </div>
        </header>
        <div className="space-y-10">
          {study.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-4 leading-8 text-gray-300">{section.body}</p>
              {section.points && (
                <ul className="mt-5 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-7 text-gray-400">
                      <Check className="mt-1.5 size-4 shrink-0 text-green-300" /> {point}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
        <RelatedContent items={related} title="Related technical references" />
      </article>
    </main>
  );
}
