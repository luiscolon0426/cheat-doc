// pages/api/github-stars.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const GITHUB_OWNER = "luiscolon0426"; // Replace with your GitHub username
  const GITHUB_REPO = "https://github.com/luiscolon0426/cheat-doc";

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repository data");
    }

    const data = await response.json();
    const stars = data.stargazers_count;

    res.status(200).json({ stars });
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
    res.status(500).json({ error: "Failed to fetch GitHub stars" });
  }
}
