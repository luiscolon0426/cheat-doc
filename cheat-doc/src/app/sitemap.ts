import type { MetadataRoute } from "next";
import { blueprints, caseStudies } from "./content/data";
import { careerPaths } from "./career/data";
import { journalEntries } from "./journal/data";
import { learningAreas } from "./learn/data";
import topics from "./meta/allTopics.json";

const baseUrl = "https://devmarks.netlify.app";
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/start",
    "/case-studies",
    "/blueprints",
    "/projects",
    "/career",
    "/learn",
    "/learn/toolkit",
    "/journal",
    "/newsletter",
    "/now",
    "/changelog",
    ...topics.map((topic) => `/${topic.slug}`),
    ...careerPaths.map((path) => `/career/${path.slug}`),
    ...learningAreas.map((area) => `/learn/${area.slug}`),
    ...journalEntries.map((entry) => `/journal/${entry.slug}`),
    ...caseStudies.map((study) => `/case-studies/${study.slug}`),
    ...blueprints.map((blueprint) => `/blueprints/${blueprint.slug}`),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-07-29"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.split("/").length <= 2 ? 0.8 : 0.7,
  }));
}
