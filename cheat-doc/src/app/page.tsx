import CodeBlock from "./components/CodeBlock";
import htmlData from "./data/html.json";

export default function HtmlPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{htmlData.title} Cheatsheet</h1>
      {htmlData.snippets.map((snippet, i) => (
        <CodeBlock key={i} {...snippet} />
      ))}
    </main>
  );
}
