import fs from "fs";
import path from "path";
import CodeBlock from "../components/CodeBlock";

type Snippet = {
  title: string;
  description: string;
  code: string;
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
      <h1 className="text-3xl font-bold mb-4">{parsed.title} Cheatsheet</h1>
      {parsed.snippets?.length > 0 ? (
        parsed.snippets.map((snippet: Snippet, i: number) => (
          <CodeBlock key={i} {...snippet} />
        ))
      ) : (
        <p className="text-gray-400">No snippets available for this topic.</p>
      )}
    </main>
  );
}
