"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  title: string;
  description?: string;
  code?: string;
  tag?: string;
  table?: string[][];
};

const detectLanguage = (tag?: string, title?: string): string => {
  const ref = (tag || title || "").toLowerCase();

  if (ref.includes("html")) return "html";
  if (ref.includes("css")) return "css";
  if (ref.includes("sass") || ref.includes("scss")) return "scss";
  if (ref.includes("js") || ref.includes("javascript")) return "javascript";
  if (ref.includes("json")) return "json";
  if (ref.includes("python")) return "python";
  if (ref.includes("bash") || ref.includes("sh")) return "bash";
  if (ref.includes("php")) return "php";
  if (ref.includes("c#") || ref.includes("cs")) return "csharp";
  if (ref.includes("c++")) return "cpp";
  if (ref.includes("java")) return "java";
  if (ref.includes("tsx")) return "tsx";
  if (ref.includes("jsx")) return "jsx";
  return "html"; // fallback
};

export default function CodeBlock({
  title,
  description,
  code,
  tag,
  table,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const language = detectLanguage(tag, title);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="bg-[#1f2937] rounded-lg p-4 shadow-md border border-gray-700 relative">
      {tag && (
        <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {tag}
        </span>
      )}

      <h3 className="text-white font-bold text-sm mb-1">{title}</h3>

      {description && (
        <p className="text-gray-400 text-sm mb-2">{description}</p>
      )}

      {code && (
        <div className="relative group">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{
              fontSize: "0.875rem",
              fontFamily: "Fira Code, Consolas, Menlo, monospace",
              background: "#111827",
              borderRadius: "0.375rem",
              padding: "1rem",
              overflowX: "auto",
              marginBottom: "0.5rem",
              lineHeight: "1.6",
            }}
            showLineNumbers={false}
          >
            {code}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-2 py-1 rounded shadow-md transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}

      {table && (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300 border border-gray-600 rounded overflow-hidden">
            <tbody>
              {table.map(([label, desc], index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-1 px-2 font-semibold text-cyan-300 whitespace-nowrap">
                    {label}
                  </td>
                  <td className="py-1 px-2 text-gray-400">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
