import fs from "fs";
import path from "path";
import CodeBlock from "../components/CodeBlock";

type Snippet = {
  title: string;
  description?: string;
  code: string;
  tag?: string;
  table?: [string, string][];
};

type TopicProps = {
  params: { topic: string };
};

export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), "src/app/data");
  const files = fs.readdirSync(dataDir);

  return files.map((filename) => ({
    topic: filename.replace(".json", ""),
  }));
}

export default async function TopicPage({ params }: TopicProps) {
  const filePath = path.join(
    process.cwd(),
    "src/app/data",
    `${params.topic}.json`
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(fileContent);

  return (
    <main className="min-h-screen bg-[#0e1525] text-white p-6">
      <h1 className="text-3xl font-bold mb-8">{parsed.title} Cheatsheet</h1>

      {parsed.snippets.map((section: any, i: number) => (
        <div key={i} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.section}</h2>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
    </main>
  );
}
