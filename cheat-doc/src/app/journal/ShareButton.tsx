"use client";

import { useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
    >
      {copied ? <Check className="size-4 text-green-300" /> : <LinkIcon className="size-4" />}
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
