import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CodeBlock from "../components/CodeBlock";
import JsonLd from "../components/JsonLd";
import RelatedContent, { type RelatedItem } from "../components/RelatedContent";
import ShareButton from "../journal/ShareButton";
import { blueprints, caseStudies } from "../content/data";
import topics from "../meta/allTopics.json";

type Snippet = {
  title: string;
  description?: string;
  code?: string;
  tag?: string;
  table?: [string, string][];
};

type Section = {
  section: string;
  cards: Snippet[];
};

type TopicProps = {
  params: Promise<{ topic: string }>;
};

export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), "src/app/data");
  const files = fs.readdirSync(dataDir);

  return files.map((filename) => ({
    topic: filename.replace(".json", ""),
  }));
}

export async function generateMetadata({ params }: TopicProps): Promise<Metadata> {
  const { topic } = await params;
  const meta = topics.find((item) => item.slug === topic);
  if (!meta) return { title: "Technical Reference | DevMarks" };
  return {
    title: `${meta.title} Cheatsheet | DevMarks`,
    description: meta.description,
    alternates: { canonical: `/${meta.slug}` },
    openGraph: {
      title: `${meta.title} Cheatsheet`,
      description: meta.description,
      url: `/${meta.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function TopicPage(props: TopicProps) {
  const params = await props.params;
  const filePath = path.join(
    process.cwd(),
    "src/app/data",
    `${params.topic}.json`
  );
  if (!fs.existsSync(filePath)) notFound();
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(fileContent);
  const currentTopic = topics.find((topic) => topic.slug === params.topic);
  const relatedItems: RelatedItem[] = [];

  if (currentTopic) {
    relatedItems.push(
      ...topics
        .filter(
          (topic) =>
            topic.slug !== currentTopic.slug &&
            topic.tags.some((tag) => currentTopic.tags.includes(tag)),
        )
        .slice(0, 2)
        .map((topic) => ({
          href: `/${topic.slug}`,
          title: topic.title,
          description: topic.description,
          type: "Technical reference",
        })),
    );
  }

  const matchingCaseStudy = caseStudies.find((study) =>
    study.relatedTopics.includes(params.topic),
  );
  if (matchingCaseStudy) {
    relatedItems.push({
      href: `/case-studies/${matchingCaseStudy.slug}`,
      title: matchingCaseStudy.title,
      description: matchingCaseStudy.summary,
      type: "Case study",
    });
  }

  const matchingBlueprint = blueprints.find((blueprint) =>
    blueprint.relatedTopics.includes(params.topic),
  );
  if (matchingBlueprint) {
    relatedItems.push({
      href: `/blueprints/${matchingBlueprint.slug}`,
      title: matchingBlueprint.title,
      description: matchingBlueprint.summary,
      type: "Project blueprint",
    });
  }

  return (
    <main className="min-h-screen bg-[#0e1525] px-4 pb-24 pt-28 text-white sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: `${parsed.title} Cheatsheet`,
          description: currentTopic?.description,
          author: { "@type": "Person", name: "Luis Colon" },
          mainEntityOfPage: `https://devmarks.netlify.app/${params.topic}`,
        }}
      />
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b border-gray-800 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
              Technical reference
            </span>
            <h1 className="mt-2 text-3xl font-bold">{parsed.title} Cheatsheet</h1>
            {currentTopic && (
              <p className="mt-3 text-gray-400">{currentTopic.description}</p>
            )}
          </div>
          <ShareButton />
        </header>

        {parsed.snippets.map((section: Section, i: number) => (
          <div key={i} className="mb-10">
            <h2 className="mb-4 text-2xl font-semibold">{section.section}</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.cards.map((snippet: Snippet, j: number) => (
                <CodeBlock
                  key={`${i}-${j}`}
                  {...snippet}
                  description={snippet.description || ""}
                />
              ))}
            </div>
          </div>
        ))}
        <RelatedContent items={relatedItems} />
      </div>
    </main>
  );
}
