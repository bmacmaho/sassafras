import type { Article, Issue } from "./types"

// ── Mock Articles ──────────────────────────────────────────────────────────────

const issue1Articles: Article[] = [
  {
    id: "a1",
    slug: "the-weight-of-light",
    title: "The Weight of Light",
    author: "Elena Vasquez",
    authorBio: "Elena Vasquez is a writer and visual artist based in Mexico City.",
    mediaType: "essay",
    excerpt:
      "Light has weight. Not in the way physicists measure it—not in grams or newtons—but in the way it presses against memory, bending the shape of a room long after the sun has moved on.",
    body: `Light has weight. Not in the way physicists measure it—not in grams or newtons—but in the way it presses against memory, bending the shape of a room long after the sun has moved on.

I first noticed this in my grandmother's kitchen, where the afternoon light fell through lace curtains and pooled on the tile floor like something you could gather in your hands. That light had substance. It thickened the air, slowed time, made the dust motes into constellations.

Years later, living in a city apartment with windows that faced a brick wall, I understood absence as a kind of weight too. The missing light pressed down just as heavily, compressing the days into flat, gray planes.

This is an essay about looking. About the way we carry landscapes inside us—not as photographs but as qualities of illumination. The slant of winter sun in Montreal. The brutal noon of a Oaxacan summer. The blue hour in Helsinki when the sky refuses to darken.

Each light leaves its residue. Each one teaches the eye a different grammar.`,
    issueSlug: "crossings-issue-3",
    coverColor: "oklch(0.20 0.02 50)",
    position: 1,
  },
  {
    id: "a2",
    slug: "cartography-of-silence",
    title: "Cartography of Silence",
    author: "Miriam Osei",
    authorBio: "Miriam Osei is a poet whose work explores diaspora, memory, and landscape.",
    mediaType: "poetry",
    excerpt:
      "We drew maps of the places we couldn't return to, / marking borders with the ink of longing.",
    body: `We drew maps of the places we couldn't return to,
marking borders with the ink of longing.

Here is the river where your name dissolved.
Here is the mountain that learned to forget.
Here is the road that leads only backward,
lined with trees whose leaves are letters
never sent.

I trace the coastline of your absence
with a finger dipped in salt water,
and the paper curls at the edges
the way shorelines do
when a tide recedes.

There are countries inside us
that no atlas records.
Provinces of grief, cantons of wonder,
territories of the almost-said.

We are all cartographers of silence,
mapping what we cannot name
with the instruments of breath
and the compass of the body.`,
    issueSlug: "crossings-issue-3",
    coverColor: "oklch(0.22 0.03 30)",
    position: 2,
  },
  {
    id: "a3",
    slug: "resonance-field",
    title: "Resonance Field",
    author: "Tomás Pereira",
    authorBio: "Tomás Pereira is a sound artist and composer working at the intersection of field recording and electronic music.",
    mediaType: "audio",
    excerpt:
      "A 22-minute composition built from recordings of abandoned industrial sites along the Tagus River, exploring the sonic memory embedded in architecture.",
    body: `Resonance Field is a 22-minute electroacoustic composition built from field recordings gathered at abandoned industrial sites along the Tagus River in Lisbon.

The piece explores the idea that buildings remember sound—that the acoustic properties of a space are themselves a form of memory. The cavernous reverb of an empty factory floor carries within it the ghost of every noise that ever filled it.

I recorded in six locations over three weeks, capturing not just the ambient sounds but the resonant frequencies of the structures themselves, tapping walls and metal beams to find the notes each building wanted to sing.

These recordings were then layered, stretched, and woven into a composition that moves between documentary and abstraction—sometimes you hear the Tagus lapping at the docks, sometimes the river becomes something else entirely.`,
    issueSlug: "crossings-issue-3",
    coverColor: "oklch(0.18 0.03 200)",
    position: 3,
  },
  {
    id: "a4",
    slug: "what-the-garden-knows",
    title: "What the Garden Knows",
    author: "Yuki Tanaka",
    authorBio: "Yuki Tanaka is a visual artist and filmmaker based in Kyoto.",
    mediaType: "visual",
    excerpt:
      "A photographic series documenting the same garden across four seasons, asking what permanence means in a space designed for impermanence.",
    body: `What the Garden Knows is a photographic series documenting the same garden—a small private temple garden in eastern Kyoto—across all four seasons of a single year.

The project began as a simple exercise in observation but became something more: an investigation into the nature of permanence in a space explicitly designed for change.

The Japanese garden is a paradox. It is meticulously maintained to appear natural. It is designed to evoke eternity while celebrating ephemerality. The moss that takes decades to establish will be covered by snow overnight. The maple that blazes red in November is bare by December.

I photographed this garden once each week for fifty-two weeks, always at the same hour, always from the same six positions. The resulting images, when viewed in sequence, reveal the garden as a living clock—not measuring minutes but seasons, not counting seconds but the slow procession of light and weather across stone and leaf.`,
    issueSlug: "crossings-issue-3",
    coverColor: "oklch(0.20 0.04 100)",
    position: 4,
  },
  {
    id: "a5",
    slug: "palimpsest-city",
    title: "Palimpsest City",
    author: "Amal Khoury",
    authorBio: "Amal Khoury is a writer and urban researcher based in Beirut.",
    mediaType: "essay",
    excerpt:
      "Every city is written over the ruins of another city, and beneath that city, another still. To read the city is to read through layers of erasure.",
    body: `Every city is written over the ruins of another city, and beneath that city, another still. Beirut knows this in its bones.

Walk down Hamra Street and you are walking on Ottoman paving stones covered by French mandate asphalt covered by postwar concrete. Each layer is a text, each text a partial erasure of what came before.

This is the palimpsest principle: nothing is ever fully erased. The old text bleeds through. A Roman column appears in the foundation of a parking garage. A medieval wall surfaces during construction of a high-rise. The city refuses to forget even as it insists on rebuilding.

I have spent fifteen years documenting these moments of emergence—the places where the past breaks through the surface of the present like a bone through skin. Not as archaeology, which seeks to systematize the past, but as something closer to poetry: a reading of the city as a living, layered document.`,
    issueSlug: "crossings-issue-3",
    coverColor: "oklch(0.16 0.04 280)",
    position: 5,
  },
]

const issue2Articles: Article[] = [
  {
    id: "a6",
    slug: "the-in-between",
    title: "The In-Between",
    author: "Sofia Lindqvist",
    authorBio: "Sofia Lindqvist is a Swedish-Finnish writer exploring borders, identity, and belonging.",
    mediaType: "essay",
    excerpt:
      "To live between two languages is to live in a country that exists only in translation—a place where meaning is always approximate, always arriving.",
    body: `To live between two languages is to live in a country that exists only in translation—a place where meaning is always approximate, always arriving.

I grew up speaking Swedish at home and Finnish outside it, and from the earliest age I understood that no word in one language perfectly matched any word in the other. The Finnish word 'koti' and the Swedish word 'hem' both mean 'home,' but they are different homes. They have different doorways, different qualities of light, different sounds in the hallway.

This is not a deficiency of language. It is its greatest gift: the reminder that reality is never singular, that every name we give to the world is also a choice about what to notice and what to let slip past.`,
    issueSlug: "crossings-issue-2",
    coverColor: "oklch(0.20 0.02 50)",
    position: 1,
  },
  {
    id: "a7",
    slug: "nocturne-for-the-displaced",
    title: "Nocturne for the Displaced",
    author: "Kwame Appiah-Mensah",
    authorBio: "Kwame Appiah-Mensah is a poet and musician originally from Accra, now based in London.",
    mediaType: "poetry",
    excerpt:
      "At night the city opens its other mouth / and speaks in the languages of the displaced.",
    body: `At night the city opens its other mouth
and speaks in the languages of the displaced.

I hear Twi in the kebab shop,
Tigrinya at the bus stop,
Portuguese in the barbershop,
Arabic in the late-night grocery
where fluorescent light
makes everything the same color
as longing.

We are the city's other citizens,
the ones who carry countries
in our throats,
who navigate by stars
that shine in different hemispheres.

This city is a chorus.
Listen:
beneath the sirens and the traffic
there is singing.`,
    issueSlug: "crossings-issue-2",
    coverColor: "oklch(0.22 0.03 30)",
    position: 2,
  },
  {
    id: "a8",
    slug: "three-studies-in-erosion",
    title: "Three Studies in Erosion",
    author: "Marina Colón",
    authorBio: "Marina Colón is a video artist working between San Juan and New York.",
    mediaType: "video",
    excerpt:
      "A three-channel video installation examining the slow transformation of coastline, architecture, and memory in post-hurricane Puerto Rico.",
    body: `Three Studies in Erosion is a three-channel video installation examining the slow transformation of coastline, architecture, and memory in post-hurricane Puerto Rico.

Channel one follows the shoreline of Rincón over six months, documenting the daily negotiation between land and sea. Channel two tracks the gradual decay and reconstruction of a house in Loíza. Channel three presents interviews with residents, their words appearing as text on screen while the audio plays ambient sound from each location.

The three channels are not synchronized. They drift in and out of alignment, creating accidental juxtapositions—the wave that erases a footprint coinciding with a mention of a lost photograph; the sound of hammering on the house channel accompanying the tide receding.`,
    issueSlug: "crossings-issue-2",
    coverColor: "oklch(0.16 0.04 280)",
    position: 3,
  },
  {
    id: "a9",
    slug: "taxonomy-of-rain",
    title: "Taxonomy of Rain",
    author: "Ingrid Haugen",
    authorBio: "Ingrid Haugen is a Norwegian writer and environmental researcher.",
    mediaType: "essay",
    excerpt:
      "There are more kinds of rain than any language accounts for. Each one falls differently, means differently, remembers differently.",
    body: `There are more kinds of rain than any language accounts for. The Scots have dozens of words—smirr, drizzle, haar, spitting, pelting—but even this rich vocabulary cannot capture every variation.

I have been cataloguing rain for seven years. Not meteorologically—I leave that to the scientists—but phenomenologically: rain as it is experienced by a body standing in it.

There is the rain that falls so fine it seems to hang in the air, not falling at all but simply existing as a condition of the atmosphere. There is the rain that arrives horizontally, driven by wind, more wall than weather. There is the rain that begins warm and turns cold mid-shower, as if the cloud itself is moving through time zones.`,
    issueSlug: "crossings-issue-2",
    coverColor: "oklch(0.18 0.03 200)",
    position: 4,
  },
]

// ── Mock Issues ────────────────────────────────────────────────────────────────

export const mockIssues: Issue[] = [
  {
    id: "i1",
    slug: "crossings-issue-3",
    number: 3,
    title: "Thresholds",
    season: "Spring",
    year: 2026,
    description:
      "Issue 3 explores the liminal—those in-between spaces where transformation occurs. Essays, poetry, sound, and visual work that dwell in doorways, borders, and the moments just before change.",
    coverColor: "oklch(0.09 0.018 55)",
    isCurrent: true,
    articles: issue1Articles,
  },
  {
    id: "i2",
    slug: "crossings-issue-2",
    number: 2,
    title: "Echoes",
    season: "Autumn",
    year: 2025,
    description:
      "Issue 2 listens for repetition and return—patterns that recur across language, landscape, and memory. How does the past make itself heard in the present?",
    coverColor: "oklch(0.12 0.025 40)",
    isCurrent: false,
    articles: issue2Articles,
  },
]
