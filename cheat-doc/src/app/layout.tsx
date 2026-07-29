import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import JsonLd from "./components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://devmarks.netlify.app"),
  title: {
    default: "DevMarks | Luis's Engineering Field Notes",
    template: "%s",
  },
  description:
    "Technical references, production lessons, and career notes collected by software engineer Luis Colon.",
  applicationName: "DevMarks",
  authors: [{ name: "Luis Colon", url: "https://luiscolon0426.github.io/portfolio/" }],
  creator: "Luis Colon",
  keywords: [
    "software engineering",
    "developer reference",
    "system design",
    "production engineering",
    "career growth",
    "project blueprints",
  ],
  openGraph: {
    type: "website",
    siteName: "DevMarks",
    title: "DevMarks | Luis's Engineering Field Notes",
    description:
      "Technical references, production lessons, project blueprints, and career notes for software engineers.",
    url: "https://devmarks.netlify.app",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "DevMarks engineering field notes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevMarks | Luis's Engineering Field Notes",
    description:
      "Technical references, production lessons, project blueprints, and career notes for software engineers.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0e1525] text-white">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "DevMarks",
            url: "https://devmarks.netlify.app",
            description:
              "Luis Colon's engineering field notes, project blueprints, and production lessons.",
            author: {
              "@type": "Person",
              name: "Luis Colon",
              url: "https://luiscolon0426.github.io/portfolio/",
            },
          }}
        />
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
