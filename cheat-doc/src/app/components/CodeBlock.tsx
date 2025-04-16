"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";

type CodeBlockProps = {
  title: string;
  description?: string;
  code: string;
  tag?: string;
};

export default function CodeBlock({
  title,
  description,
  code,
  tag,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="bg-[#1e293b] text-white rounded-lg p-4 shadow-md relative group">
      {/* Title & Tag */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base font-semibold">{title}</h3>
        {tag && (
          <span className="bg-emerald-600 text-xs px-2 py-0.5 rounded-full text-white">
            {tag}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-300 mb-2">{description}</p>
      )}

      {/* Code */}
      <div className="relative">
        <SyntaxHighlighter
          language="html"
          style={oneDark}
          customStyle={{
            background: "#0f172a",
            borderRadius: "0.375rem",
            padding: "1rem",
            paddingRight: "3rem",
          }}
        >
          {code}
        </SyntaxHighlighter>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 text-xs px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-opacity opacity-0 group-hover:opacity-100"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
