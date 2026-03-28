export type MediaType = "essay" | "poetry" | "audio" | "video" | "visual"

export interface Article {
  slug: string
  title: string
  author: string
  authorBio: string
  mediaType: MediaType
  excerpt: string
  body: string
  issueSlug: string
  coverColor: string
}

export interface Issue {
  slug: string
  number: number
  title: string
  season: string
  year: number
  description: string
  coverColor: string
  articles: Article[]
}

const issue3Articles: Article[] = [
  {
    slug: "the-weight-of-water",
    title: "The Weight of Water",
    author: "Elena Marcos",
    authorBio: "Elena Marcos is a hydrologist and writer based in Lisbon. Her work examines the intersection of ecology, memory, and place.",
    mediaType: "essay",
    excerpt: "On the politics of rivers and the quiet violence of forgetting where our water comes from.",
    body: `There is a river in the south of Portugal that no longer reaches the sea. It was not always this way. My grandmother remembers wading through it as a girl, the water cold and urgent against her shins, carrying with it the smell of eucalyptus and wet stone.

Now the riverbed is cracked earth for most of the year. The almonds still bloom along its banks in February, their white petals falling onto dust instead of current. The farmers speak of it the way one speaks of the dead — with a tenderness that has learned to live alongside absence.

Water, unlike oil, has no mythology of scarcity that precedes its disappearance. We do not hoard it in the cultural imagination the way we do gold or grain. It is simply there, and then it is not. The violence of its absence is quiet — a slow erosion of possibility.

I have spent the last decade studying aquifer depletion in southern Europe. The data tells one story: extraction rates exceeding recharge, agricultural demand outpacing supply, policy frameworks that treat water as infinite. But there is another story underneath the data, one that numbers cannot hold. It is the story of what a community loses when it loses its river — not just a resource, but a rhythm, a calendar, a way of understanding time.

In the village of Mertola, the old women still wash clothes at the communal fountain, though the water now comes from a municipal pipe rather than the spring. The gesture persists after the source has changed. This is how forgetting works — not as a sudden rupture, but as a gradual replacement of one reality with another, until the original becomes indistinguishable from myth.

The question is not whether we will run out of water. The question is what we are willing to remember about the world that existed before we did.`,
    issueSlug: "issue-3",
    coverColor: "bg-[oklch(0.75_0.06_200)]",
  },
  {
    slug: "three-poems-on-thresholds",
    title: "Three Poems on Thresholds",
    author: "Kwame Adjei",
    authorBio: "Kwame Adjei is a poet and translator working between Accra and Berlin. His first collection, Cartography of Breath, was published in 2024.",
    mediaType: "poetry",
    excerpt: "What the doorframe knows that we do not.",
    body: `I. ARRIVAL

The door does not care
who you were before you touched the handle.
It opens the same way for grief
as it does for the mail carrier.

This is the democracy of thresholds:
everyone must pause,
everyone must decide
to step through.

The wood remembers nothing.
The hinges have no opinion.
Only you carry the weight
of what you are entering.


II. THE SPACE BETWEEN

There is a word in Twi for the feeling
of standing in a doorway —
not inside, not outside,
but held by the frame itself.

My grandmother used it
when she meant indecision,
but also when she meant prayer:
the body suspended

between what it knows
and what it is about to learn.
The threshold is not a line.
It is a room unto itself.


III. DEPARTURE

When you leave a house for the last time
you do not know it is the last time.
The door closes behind you
with the same sound it always made.

Later, you will try to remember:
Was the paint peeling?
Was there light in the hallway?
Did the lock turn easily?

But the threshold has already
forgotten you. It is already
opening for someone else,
offering them the same

impartial welcome,
the same beautiful
indifference.`,
    issueSlug: "issue-3",
    coverColor: "bg-[oklch(0.80_0.08_80)]",
  },
  {
    slug: "listening-to-the-forest-floor",
    title: "Listening to the Forest Floor",
    author: "Dr. Yuki Tanaka",
    authorBio: "Dr. Yuki Tanaka is a sound ecologist at the University of Kyoto. She records and studies the acoustic ecology of old-growth forests.",
    mediaType: "audio",
    excerpt: "A sound essay on mycorrhizal networks and the frequencies beneath our feet.",
    body: `What does a forest sound like from below?

We are accustomed to the forest as an auditory experience from the human scale — birdsong, wind through canopy, the crack of a branch. But beneath our feet, another acoustic world persists, one we are only beginning to understand.

For the past five years, I have been placing hydrophones and contact microphones in the soil of Yakushima's ancient cedar forests. The recordings reveal a world of startling complexity: the low-frequency hum of root systems under hydraulic pressure, the faint clicking of fungal hyphae as they extend through soil particles, the subterranean percussion of beetle larvae boring through decaying wood.

These are not metaphors. They are measurable acoustic phenomena, operating at frequencies between 20 and 800 Hz, most of them below the threshold of unaided human hearing.

The mycorrhizal network — the vast fungal web that connects the root systems of nearly all forest plants — is not silent. It conducts vibrations along its filaments in ways that resemble, though do not replicate, the transmission of signals along nerve fibers. When a tree is stressed by drought, the acoustic signature of its root zone changes measurably. Neighboring trees, connected through the fungal network, show corresponding changes within hours.

I do not claim that trees communicate in the way that humans do. But I do claim that the forest floor is a medium of transmission — that it carries information in forms we are only beginning to hear.

To listen to the piece, press play. You will hear three minutes of processed field recordings from Yakushima, slowed and pitch-shifted to bring the subterranean frequencies into audible range. What you are hearing is real. It is simply a world that was always there, waiting to be heard.`,
    issueSlug: "issue-3",
    coverColor: "bg-[oklch(0.65_0.08_150)]",
  },
  {
    slug: "the-choreography-of-demolition",
    title: "The Choreography of Demolition",
    author: "Ines Oliveira",
    authorBio: "Ines Oliveira is a filmmaker and visual anthropologist. She documents the slow transformation of post-industrial landscapes across Europe.",
    mediaType: "video",
    excerpt: "A video essay on what buildings remember as they come apart.",
    body: `Every demolition is a performance.

I began filming the destruction of buildings in 2019, after watching a housing block in Porto come down in forty-five minutes. The building had stood for sixty years. Families had been born and had died within its walls. Children had measured their height against its doorframes. And then, in less time than it takes to watch a film, it was rubble.

What struck me was not the violence of the act — though it was violent — but its choreography. The way the excavator operator moved with a precision that was almost tender. The way he knew which wall to strike first so that the structure would fold inward rather than outward. The way the dust rose in plumes that seemed rehearsed.

Demolition is the inverse of architecture. Where architecture is the art of making space, demolition is the art of unmaking it. And yet, like architecture, it requires an intimate knowledge of materials — of how concrete fractures under stress, of where the steel reinforcements lie, of how a building's weight distributes itself across its foundations.

In this video essay, I follow three demolitions across three cities: a textile factory in Manchester, a socialist-era apartment block in Bucharest, and a colonial-era warehouse in Maputo. In each case, I was interested not in the spectacle of destruction but in what emerges from it — the layers of paint revealed as walls come down, the objects found inside cavity walls, the way a building's interior becomes its exterior for a few brief hours before becoming nothing at all.

What does a building remember? Perhaps nothing. But the act of taking it apart reveals the sediment of human use — the handprints in plaster, the wiring patched and re-patched over decades, the wallpaper layered over wallpaper like geological strata of taste and aspiration.

To watch is to participate in an act of reading — of interpreting the material history of a place in the brief moment before it disappears.`,
    issueSlug: "issue-3",
    coverColor: "bg-[oklch(0.50_0.06_30)]",
  },
  {
    slug: "atlas-of-vanishing-trades",
    title: "Atlas of Vanishing Trades",
    author: "Rami Haddad",
    authorBio: "Rami Haddad is a photographer and oral historian based in Beirut. His work documents the material culture of the Eastern Mediterranean.",
    mediaType: "visual",
    excerpt: "A photographic meditation on the hands that still know how to make things the old way.",
    body: `In a workshop in the old quarter of Tripoli, a man is making soap the way his family has made soap for four hundred years.

He pours olive oil and lye into a copper vat that is older than the modern state of Lebanon. He stirs with a wooden paddle worn smooth by generations of hands. The mixture thickens. He knows it is ready not by temperature or time but by the way it falls from the paddle — a quality he describes as "like honey that has been thinking."

This is tacit knowledge: understanding that lives in the body rather than the book, that is transmitted not through instruction but through proximity, repetition, and years.

Across the Eastern Mediterranean, these forms of knowledge are disappearing — not because they have been superseded by better methods, but because the economic structures that sustained them have collapsed. The soap maker's children are engineers and accountants. The coppersmith's apprentice moved to Beirut. The woman who knew how to dye silk with pomegranate rinds died in 2021, and no one had thought to ask her how she did it.

This photo essay documents twelve trades in five countries: soap-making in Tripoli, copper-working in Gaziantep, glass-blowing in Hebron, silk-weaving in Damascus, salt-harvesting in Marsalforn, tile-making in Fez, boat-building in Byblos, leather-tanning in Marrakech, oud-carving in Istanbul, paper-making in Samarkand, basket-weaving in the Bekaa Valley, and olive-pressing in the hills above Jenin.

What these trades share is not nostalgia but a relationship to material reality that industrial production has made invisible. When you make soap by hand, you understand fat. When you blow glass, you understand heat. When you weave silk, you understand patience — not as a virtue, but as a physical fact.

The photographs are accompanied by fragments of conversation — not interviews, but the things people said while their hands were busy, when they were not performing for the camera but simply being in the practice of their work.`,
    issueSlug: "issue-3",
    coverColor: "bg-[oklch(0.72_0.06_60)]",
  },
]

const issue2Articles: Article[] = [
  {
    slug: "cartography-of-silence",
    title: "Cartography of Silence",
    author: "Maren Vogt",
    authorBio: "Maren Vogt is a sound artist and writer based in Reykjavik.",
    mediaType: "audio",
    excerpt: "Field recordings from six of the quietest places left on Earth.",
    body: "A deep investigation into the acoustic ecology of silence, from the Hoh Rainforest to the Namibian desert, exploring what we hear when we stop making noise.",
    issueSlug: "issue-2",
    coverColor: "bg-[oklch(0.60_0.05_240)]",
  },
  {
    slug: "the-patience-of-ink",
    title: "The Patience of Ink",
    author: "Liu Wenxia",
    authorBio: "Liu Wenxia is a calligrapher and essayist working in Hangzhou.",
    mediaType: "essay",
    excerpt: "On the relationship between handwriting and thought in the age of keyboards.",
    body: "What happens to thinking when the hand no longer shapes the letter? This essay traces the cognitive and cultural implications of the shift from handwriting to typing, drawing on neuroscience, personal practice, and the history of Chinese calligraphy.",
    issueSlug: "issue-2",
    coverColor: "bg-[oklch(0.45_0.03_260)]",
  },
  {
    slug: "nocturne-for-a-disappeared-lake",
    title: "Nocturne for a Disappeared Lake",
    author: "Aigul Temirbek",
    authorBio: "Aigul Temirbek is a poet from Almaty whose work engages with ecological loss.",
    mediaType: "poetry",
    excerpt: "Elegies for the Aral Sea and the communities it once sustained.",
    body: "A cycle of poems tracing the disappearance of the Aral Sea through the voices of fishermen, children, and the salt-crusted boats left behind on what was once a shore.",
    issueSlug: "issue-2",
    coverColor: "bg-[oklch(0.70_0.07_180)]",
  },
  {
    slug: "the-last-projection",
    title: "The Last Projection",
    author: "Gabriel Sousa",
    authorBio: "Gabriel Sousa is a filmmaker and media historian based in Sao Paulo.",
    mediaType: "video",
    excerpt: "A video essay on the death of analog cinema and the projectionists who keep it alive.",
    body: "This film follows three projectionists in three cities — Havana, Lagos, and Kolkata — who continue to work with 35mm film, exploring what is gained and lost in the transition to digital.",
    issueSlug: "issue-2",
    coverColor: "bg-[oklch(0.40_0.04_300)]",
  },
]

const issue1Articles: Article[] = [
  {
    slug: "the-grammar-of-ruins",
    title: "The Grammar of Ruins",
    author: "Sofia Alexiou",
    authorBio: "Sofia Alexiou is an archaeologist and writer based in Athens.",
    mediaType: "essay",
    excerpt: "How we read the past through what remains, and what our readings reveal about us.",
    body: "An essay exploring the semiotics of archaeological ruins, arguing that our interpretation of ancient sites tells us more about contemporary desires than about the past.",
    issueSlug: "issue-1",
    coverColor: "bg-[oklch(0.68_0.05_40)]",
  },
  {
    slug: "field-notes-from-the-edge",
    title: "Field Notes from the Edge",
    author: "Tomas Lindqvist",
    authorBio: "Tomas Lindqvist is a botanist and poet based in Uppsala, Sweden.",
    mediaType: "poetry",
    excerpt: "Poems written at the boundary between cultivated land and wilderness.",
    body: "A sequence of poems composed during a year-long walk along the border between farmland and forest in central Sweden, attending to the species that thrive in the margins.",
    issueSlug: "issue-1",
    coverColor: "bg-[oklch(0.62_0.08_130)]",
  },
  {
    slug: "the-shape-of-bread",
    title: "The Shape of Bread",
    author: "Amina Berrada",
    authorBio: "Amina Berrada is a visual anthropologist and baker based in Fez.",
    mediaType: "visual",
    excerpt: "A photographic study of bread-making across the Mediterranean.",
    body: "Documenting the geometry and gesture of bread-making across twelve Mediterranean cultures, revealing the deep connections between landscape, grain, and human hand.",
    issueSlug: "issue-1",
    coverColor: "bg-[oklch(0.78_0.06_70)]",
  },
]

export const issues: Issue[] = [
  {
    slug: "issue-3",
    number: 3,
    title: "Thresholds",
    season: "Winter",
    year: 2026,
    description: "On borders, doorways, and the spaces between knowing and unknowing. This issue explores the Sassafras — in ecology, architecture, language, and the body.",
    coverColor: "bg-[oklch(0.30_0.04_50)]",
    articles: issue3Articles,
  },
  {
    slug: "issue-2",
    number: 2,
    title: "Resonance",
    season: "Summer",
    year: 2025,
    description: "Sound, silence, and the vibrations that connect us. Contributors explore acoustic ecology, the musicality of language, and what it means to truly listen.",
    coverColor: "bg-[oklch(0.35_0.03_240)]",
    articles: issue2Articles,
  },
  {
    slug: "issue-1",
    number: 1,
    title: "Origins",
    season: "Winter",
    year: 2025,
    description: "Where things begin. Our inaugural issue examines roots, foundations, and first principles across disciplines and geographies.",
    coverColor: "bg-[oklch(0.42_0.04_130)]",
    articles: issue1Articles,
  },
]

export function getCurrentIssue(): Issue {
  return issues[0]
}

export function getIssueBySlug(slug: string): Issue | undefined {
  return issues.find((i) => i.slug === slug)
}

export function getArticleBySlug(slug: string): (Article & { issue: Issue }) | undefined {
  for (const issue of issues) {
    const article = issue.articles.find((a) => a.slug === slug)
    if (article) return { ...article, issue }
  }
  return undefined
}

export function getPreviousIssues(): Issue[] {
  return issues.slice(1)
}

export const mediaTypeLabels: Record<MediaType, string> = {
  essay: "Essay",
  poetry: "Poetry",
  audio: "Audio",
  video: "Video",
  visual: "Visual",
}
