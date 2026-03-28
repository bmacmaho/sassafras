import { supabase } from "./supabase"
import type { Article, Issue, MediaType } from "./types"

// ── Mappers ──────────────────────────────────────────────────────────────────

function mapArticle(
  row: Record<string, unknown>,
  issueSlug: string
): Article {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    author: row.author as string,
    authorBio: row.author_bio as string,
    mediaType: row.media_type as MediaType,
    excerpt: row.excerpt as string,
    body: row.body as string,
    coverColor: row.cover_color as string,
    issueSlug,
    position: row.position as number,
  }
}

function mapIssue(
  row: Record<string, unknown>,
  articles: Article[]
): Issue {
  return {
    id: row.id as string,
    slug: row.slug as string,
    number: row.number as number,
    title: row.title as string,
    season: row.season as string,
    year: row.year as number,
    description: row.description as string,
    coverColor: row.cover_color as string,
    isCurrent: row.is_current as boolean,
    articles,
  }
}

async function fetchArticlesForIssue(
  issueId: string,
  issueSlug: string
): Promise<Article[]> {
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("issue_id", issueId)
    .order("position", { ascending: true })

  return (data ?? []).map((row) => mapArticle(row, issueSlug))
}

// ── Queries ───────────────────────────────────────────────────────────────────

export async function getCurrentIssue(): Promise<Issue | null> {
  const { data: issueRow, error } = await supabase
    .from("issues")
    .select("*")
    .eq("is_current", true)
    .single()

  if (error || !issueRow) return null

  const articles = await fetchArticlesForIssue(issueRow.id, issueRow.slug)
  return mapIssue(issueRow, articles)
}

export async function getIssueBySlug(slug: string): Promise<Issue | null> {
  const { data: issueRow, error } = await supabase
    .from("issues")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !issueRow) return null

  const articles = await fetchArticlesForIssue(issueRow.id, issueRow.slug)
  return mapIssue(issueRow, articles)
}

export async function getAllIssues(): Promise<Issue[]> {
  const { data: issueRows } = await supabase
    .from("issues")
    .select("*")
    .order("number", { ascending: false })

  if (!issueRows) return []

  return Promise.all(
    issueRows.map(async (row) => {
      const articles = await fetchArticlesForIssue(row.id, row.slug)
      return mapIssue(row, articles)
    })
  )
}

export async function getPreviousIssues(): Promise<Issue[]> {
  const { data: issueRows } = await supabase
    .from("issues")
    .select("*")
    .eq("is_current", false)
    .order("number", { ascending: false })

  if (!issueRows) return []

  return Promise.all(
    issueRows.map(async (row) => {
      const articles = await fetchArticlesForIssue(row.id, row.slug)
      return mapIssue(row, articles)
    })
  )
}

export async function getArticleBySlug(
  slug: string
): Promise<(Article & { issue: Issue }) | null> {
  const { data: articleRow, error } = await supabase
    .from("articles")
    .select("*, issues(*)")
    .eq("slug", slug)
    .single()

  if (error || !articleRow) return null

  const issueRow = articleRow.issues as Record<string, unknown>

  const siblingArticles = await fetchArticlesForIssue(
    issueRow.id as string,
    issueRow.slug as string
  )
  const issue = mapIssue(issueRow, siblingArticles)
  const article = mapArticle(articleRow, issue.slug)

  return { ...article, issue }
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const { data } = await supabase.from("articles").select("slug")
  return (data ?? []).map((r) => r.slug)
}

export async function getAllIssueSlugs(): Promise<string[]> {
  const { data } = await supabase.from("issues").select("slug")
  return (data ?? []).map((r) => r.slug)
}
