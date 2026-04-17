export interface ExploreItem {
  slug: string
  title: string
  author: string
  medium: string
  gradient: string
  desc: string
}

export const mockExplores: ExploreItem[] = [
  {
    slug: "the-starry-jellyfish",
    title: "The Starry Jellyfish",
    author: "N. Eleni",
    medium: "Digital Illustration",
    gradient: "from-indigo-900 via-purple-900 to-blue-900",
    desc: "A dreamlike creature suspended between ocean and cosmos.",
  },
  {
    slug: "red-thread",
    title: "Red Thread",
    author: "M. Aoki",
    medium: "Photography",
    gradient: "from-red-900 via-rose-800 to-orange-900",
    desc: "An exploration of connection and severed ties through textile and light.",
  },
  {
    slug: "archive-fever",
    title: "Archive Fever",
    author: "S. Brennan",
    medium: "Essay",
    gradient: "from-stone-800 via-zinc-700 to-neutral-900",
    desc: "On the compulsion to collect, preserve, and ultimately lose.",
  },
]
