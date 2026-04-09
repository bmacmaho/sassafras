export type MediaType = "essay" | "poetry" | "audio" | "video" | "visual"

export interface Article {
  id: string
  slug: string
  title: string
  author: string
  authorBio: string
  mediaType: MediaType
  excerpt: string
  body: string
  issueSlug: string
  coverColor: string
  position: number
}

export interface Issue {
  id: string
  slug: string
  number: number
  title: string
  season: string
  year: number
  description: string
  coverColor: string
  isCurrent: boolean
  articles: Article[]
}

export const mediaTypeLabels: Record<MediaType, string> = {
  essay: "Essay",
  poetry: "Poetry",
  audio: "Audio",
  video: "Video",
  visual: "Visual",
}
