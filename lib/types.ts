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

export interface Person {
  id: number
  name: string
  pronouns: string
  role: string | string[]
  photo: string | null
  bio: string
  personalLink?: string
  languages?: string[]
}

export interface Artwork {
  id: number;
  slug: string;
  title: string;
  author: string;
  image: string;
  medium: string;
  theme: string;
  year: string;
  issue: string;
  description?: string;
  tags?: string[];
  body?: string;
  bibliography?: string[];
  aspectRatio: number;
  pos: { x: number; y: number; width: number; height: number };
  float: { delay: string; dur: string };
}
