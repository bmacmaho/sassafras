import { mockIssues } from "./mock-data"
import type { Article, Issue } from "./types"

// ── Queries (using mock data — no Supabase needed) ───────────────────────────

export async function getCurrentIssue(): Promise<Issue | null> {
  return mockIssues.find((i) => i.isCurrent) ?? null
}

export async function getIssueBySlug(slug: string): Promise<Issue | null> {
  return mockIssues.find((i) => i.slug === slug) ?? null
}

export async function getAllIssues(): Promise<Issue[]> {
  return [...mockIssues].sort((a, b) => b.number - a.number)
}

export async function getPreviousIssues(): Promise<Issue[]> {
  return mockIssues
    .filter((i) => !i.isCurrent)
    .sort((a, b) => b.number - a.number)
}

export async function getArticleBySlug(
  slug: string
): Promise<(Article & { issue: Issue }) | null> {
  for (const issue of mockIssues) {
    const article = issue.articles.find((a) => a.slug === slug)
    if (article) {
      return { ...article, issue }
    }
  }
  return null
}

export async function getAllArticleSlugs(): Promise<string[]> {
  return mockIssues.flatMap((i) => i.articles.map((a) => a.slug))
}

export async function getAllIssueSlugs(): Promise<string[]> {
  return mockIssues.map((i) => i.slug)
}
