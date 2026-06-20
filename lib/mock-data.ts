import { ArtworkTag } from "./types"
import type { Article, Issue, Artwork } from "./types"

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

export const artworks: Artwork[] = [
  {
    id: 1,
    slug: "but-look-your-grace-those-are-not-giants-but-windmills",
    title: "But Look, Your Grace, Those Are Not Giants But Windmills",
    author: "Javiera Bilbao",
    image: "/explore_jellyfish_new.jpg",
    medium: "Text + Illustration",
    theme: "Towers",
    tags: [ArtworkTag.Towers, ArtworkTag.Illustration, ArtworkTag.Personal, ArtworkTag.ShortNarration, ArtworkTag.Childhood, ArtworkTag.Gender, ArtworkTag.Memory],
    year: "2026",
    issue: "Issue 01",
    description: "A short and intimate story that describes how the tower was seen through the eyes of a child and how it is seen through the eyes of an adult. Though the tower has shifted in appearance over time, it remains imposing, gigantic, and terrifying as ever.",
    body: `Ever since I was little, the towers I imagined looming toward me were like gigantic structures made of rock or some other sturdy, solid material—ones I couldn't climb or get through. In my childish mind, a tower was the one where Rapunzel lived, or those giant structures that Don Quixote mistook for windmills, or Goliath when he fought David. Towers, therefore, were not only difficult or impossible to climb, but they also represented the unknown, the terrifying, the gigantic, while I was the smaller one.

As I grew up, my ideas of towers became less tangible in my mind, but more metaphorical. I could no longer describe them so easily; I just knew that I still saw them as gigantic, immutable, insurmountable, and terrifying. These towers were no longer part of stories or fairytales, but they were towers that I encountered every day.

The tower was now the night, or maybe it was not the night itself. The night was actually a reminder that a tower was there, a tower governed by rules that applied only to women and dictated how I should dress or move if I didn't want to be attacked by any of its inhabitants. I had to move carefully to avoid encountering the tower and its inhabitants.

But those weren't the only towers. Some of them still haunt me, filling me with fear. Inhabited by mad, greedy, and evil men who gaze upon me. The future looks uncertain there, surrounded by ghosts of anxiety, fear, and emptiness. Other towers are made up of countless offices, bureaucrats, and meaningless documents and seem impossible to conquer, made up of endless absurd regulations that kill spirits.

But are they really giant towers, or are they windmills trying to scare us?`,
    aspectRatio: 673 / 1024,
    pos: { x: 50, y: 5, width: 140, height: 0 },
    float: { delay: "0s", dur: "8s" }
  },
  {
    id: 2,
    slug: "toward-dizzying-height",
    title: "Toward Dizzying Height",
    author: "Anna Hijmans",
    image: "/explore_charcoal_new.jpg",
    medium: "Essay",
    theme: "Towers",
    tags: [ArtworkTag.Towers, ArtworkTag.Essay, ArtworkTag.Hierarchies, ArtworkTag.History, ArtworkTag.Religion, ArtworkTag.Order, ArtworkTag.Morality],
    year: "2026",
    issue: "Issue 01",
    description: "A historical analysis of humanity's obsession with height across overlapping domains of architecture, religion, nature, and morality.",
    body: `"I have flown, To star-stained heights, On bent and battered wings (...), Sure that everything of worth is in the sky and not the earth (...) Singing scraps of angel-song, High is right and low is wrong, And I never taught, Myself to give, Down Down Down, Where the iguanas live." (Dory Previn)

I recently came across the notion of 'iliggocene' - the age of 'dizziness' proposed as part of an exhibition project at Kindl Berlin. The name describes a new orientation towards our time, one that is blurry, hard to grasp, full of confluence and vertigo. There has been an effort to find a name of our time for a while now, with a few 'cenes (Anthropocene, Capitalocene, Cthulucene, Noocene, etc.) having made their rounds as potential representatives of a new social geology. I'm caught by the idea of an age of dizziness, though, not just as a name but as a state. It carries the suggestion that we live in a time of disorientation; perhaps because the systems we rely on are spinning ever more out of control, or because we seem to be teetering at a precipice of ever-cascading ecological damage. When I think of dizziness however, I mainly think of height and the disequilibrium that comes from the thought of 'how far down?'.

This writing frames itself around the question of height, and how height behaves as a critical tool in the ways we orient our social world. In his book Animal Fables after Darwin, Chris Danta describes how western humanist traditions have commonly envisioned their relationship to the world through vertical metaphors, as 'higher animals' whose moral and intellectual plane exists 'above' that of other creatures. Some of this is quite literal in terms of physical orientation -- animals walk on all fours and angle themselves towards the earth, whereas humans walk 'erect' and are physically oriented skywards. Plato was an early proponent of this idea, describing the posture of 'man' as indicative of 'his' rational physicality, where the brain/head (the seat of knowledge) is positioned at the 'acropolis' of the body, towering over the more lowly and 'bestial' organs and thereby less driven by bodily instinct than other creatures. We quickly see then that this disposition upwards is not just a physical distinction between 'man' and 'animal', but it is explicitly linked to moral predetermination in Western theological traditions. Ovid, in his first book 'Metamorphoses', describes 'the Creator' as having designed man to stand erect so that he may look towards the heavens and stars. Much the same is said by John Donne (1624), who describes humans as "naturally built and disposed to the contemplation of heaven". Danta highlights this further by bringing our attention to the story of the Babylonian King Nebuchadnezzar, who is punished by God for his boasting and made to live 'as an animal', walking on all fours and eating grass for seven years. It was only when he was able once more to turn his gaze upwards that his sanity was restored, and he could again revere and glorify God 'Most High'. Indeed, the consistent reference of height and posture to the divine sustains the idea that uprightness, straightness, and the vertical is itself the physical embodiment of ethical capacity. Not only is 'man' vertical, but there is the idea that man must strive for the vertical, that there is a social imperative to be the 'upright' citizen, to be 'righteous', and to embody a moral 'rectitude'.

This idea is further embodied in the historical drawing of social, natural, and moral hierarchies across intellectual traditions. Among the most famous examples of this is the work by Aristotle in his History of Animals, where he presents the notion of ordering all animals according to a grand scale or 'ladder' in terms of "complexity, perfection, and value". Inorganic and 'less complex' organisms exist at the bottom of this scale, above which we find plants, then 'lower animals' such as invertebrates, until we begin to reach 'higher' animals, with humans at the top of the animal scale (after which we enter the realm of gods). What makes this scale so consequential, as Lori Marino notes, is that it not only determines the interrelations of living matter, but their worth and proximity to 'perfection'. Much like the erect posture of man, value is approximated to height or being at the 'top', which in turn measures one's capacity for 'goodness'. This is made even more acute by the fact that this system is one that rejects mobility, as Aristotle believed that every being's place on this 'Scala Naturae' (or natural scale), was materially and eternally fixed by universal forces. Perfection could therefore be framed as a single universal and upwards truth, while remaining ultimately unattainable by earthly forms.

This notion of the natural ordering of life has continued to emerge in various traditions and organisational methods across time. Take for example the Rhetorica Christiana written and illustrated by Didacus Valades in 1579. Prominently featured is 'The Great Chain of Being', a copperplate engraving which depicts at the very top a representation of God surrounded by a halo of light and angels, with what appears to be a young man (perhaps the figure of Jesus) on his lap. From the hand of God runs a chain, which passes then downwards over the page through layers of earthly beings. The first sees a collection of humans, then birds, then aquatic life, then mammals, then plants, minerals, and finally at the bottom of the page, we see Hell, filled with imagery of flames and torture. Once more there is a ladder of being, but this time the consequences of 'lowness' become dire. Here we find a blending of Aristotle's ordering of nature with the literal expression of perfection in the God 'on high', and lowness as being associated with true evil. Interestingly humans, like in the work of Aristotle, occupy the top of the chain just before the divine, privileged by their proximity to perfection but unable to actually attain it. Different from the Scala Naturae, however, is the presence of Hell in the image, which, given its Christian context, suggests that one's place on the scale (as human) is more mobile than previously suggested, and that perfection or punishment awaits according to the virtues of one's soul.

To move downwards on the ladder would therefore be disastrous. If we come back to Nebuchadnezzar, for example, his transformation forces him away from perfection, at which time he loses all sense of self, his body twists into something 'other', and he loses the ability to feel, much less perceive, perfection, beauty, and divinity. We can see some echo of Nebuchadnezzar in Kafka's Metamorphosis, whose leading character transforms into a cockroach. Over the course of the story, the value of this man-turned-cockroach becomes increasingly limited, as various characters, having initially shown a mixture of disgust, fear, or in some cases care and concern, begin to treat him with total apathy. From human he becomes vermin, and the occasion of his eventual death is met with relief. Once more we see a disgust for the 'downward' and the idea of lowness as a place of lesser value.

The reason I want to emphasise this spatial and physical relation to value is because it remains closely embedded in the ways we measure and describe success, civilisation, progress, and politics still today. I would argue that, while perfection is still treated as an unattainable feature of the 'most high', it continues to haunt the social imagination. From alchemical pursuits towards the philosopher's stone and the perfect immortal body, to Herbert Spencer's idea of Universal Progress, to the techno-optimism of the industrial age and the boom of capitalist neoliberal economies, there is the idea that we, almost inevitably, must continuously progress and strive towards an ever-perfect world.

It's here that I would like to speak to the image of the tower, both in its physical manifestation as well as its metaphorical implication. Towers often take a symbolic form for a city or people, such as in the case of the Berlin TV tower, which adorns much of the tourist merchandise on the Unter Den Linden. What is interesting about the TV tower in particular is that it was considered a major Soviet victory during the Cold War, not least for its height, as it remains the tallest building in Germany to this day. The Empire State Building is another example, which at the time of its making was the tallest building in the world, and quickly became an icon for the city of New York. We can also think of the Eiffel Tower, the Burj Khalifa in Dubai, etc. The height of the tower, and the city skyline marked by skyscrapers, quickly came and continue to act as emblems for the modern world.

Now another, much older example of the social significance of the tower and its height lies in the biblical story of Babel in Genesis 11, which sees the first people of Babel begin building a city and a tower of great height. Their progress drives God to intervene and scatter the people over the earth and 'confuse their language', so as to prevent the tower from ever reaching the heavens. Now the examples of modern towers and ancient stories are worlds apart in many ways, but are linked by the notion that a society's capability for progress and potential for 'perfection' can be reflected in the height of the structures they make. In the case of Babel and its people, their shared push towards the heavens was indicative of their social cohesion and potential, so that when they crossed some forbidden threshold between humanity and the realm of perfection, the shared language and location of humanity had to be revoked. The building of the TV tower symbolizes something akin, where the ability to build at such a height becomes indicative of the social/moral/physical prowess of said society. Thomas van Leeuwen, in his book The Skyward Trend of Thought, speaks of skywards architecture and the skyscraper as the heir to Babel, a "fulfillment of the Babylonian promise; the realization of both its technical enigma and its utopian-cosmopolitan objective." There is a celebration of height in a way that is almost 'primal' as J.J. Korom puts it, where the assertion of height becomes synonymous with strength and agency.

The imperative to move upwards in search of progress, immortality, perfection, or even just in pursuit of the 'good' or 'divine', is a dizzying thing. Indeed, in many ways, height seems to become a kind of material evidence for spiritual and moral significance, whether through our posture, in ladders of being, or in our towers. We see in many ways how the themes of height interlace throughout Western cosmological histories, into the divine right of kings, into separation of 'man' and 'animal', and so on. Neoliberal governance which bases itself closely on the notion of eternal growth and progress can in part be understood through this obsession with the 'higher' and with perfection. It is as though we are building our own metaphysical tower, ever further. I would argue that if our age is indeed one of dizziness, that it comes from this continuous effort to build higher faster stronger, in such a way that the stress of innovation (in AI, in agriculture, in mining, the infinite stock market, capitalist growth) fails to understand that no tower builds forever, and that at the heights of our fanaticism for height itself, the dizziness of the space we inhabit makes us blind to what is below, what we can longer see.`,
    bibliography: [
      "Donne, John. Devotions upon Emergent Occasions. Ann Arbor, MI: University of Michigan Press, 1959.",
      "Ovid. Metamorphoses. Translated by Mary M. Innes. London: Penguin, 2003.",
      "Berkeley Science Review, and Maiko Kitaoka. \"The Never-Ending Search for the Elixir of Life.\" Berkeleysciencereview.com, 2021. https://berkeleysciencereview.com/article/2021/05/28/the-never-ending-search-for-the-elixir-of-life.",
      "Danta, Chris. Animal Fables after Darwin. Cambridge University Press, 2018. https://doi.org/10.1017/9781108552394.",
      "Davis, Heather M, and Etienne Turpin. Art in the Anthropocene : Encounters among Aesthetics, Politics, Environments and Epistemologies. London: Open Humanities Press, 2015.",
      "Demos, T.J. Against the Anthropocene : Visual Culture and Environment Today. Berlin: Sternberg Press, 2017.",
      "Edelsztein, Sergio, Ruth Anderwald, and Leonhard Grond. \"Iliggocene – the Age of Dizziness.\" KINDL - Zentrum Für Zeitgenössische Kunst, 2019. https://www.kindl-berlin.de/ausstellungen/iliggocene.",
      "Gilman, Sander L. \"How Posture Makes Us Human.\" Nautil.us. Nautilus, April 27, 2018. https://nautil.us/how-posture-makes-us-human-237068.",
      "Korom, Joseph J. American Skyscraper, 1850-1940 : A Celebration of Height. Boston: Branden, 2016.",
      "Kuntz, Marion Leathers, and Paul Grimley Kuntz. Jacob's Ladder and the Tree of Life. Peter Lang Incorporated, International Academic Publishers, 1987.",
      "Marino, Lori. \"Classification.\" In Encyclopedia of Human-Animal Relationships: A Global Exploration of Our Connections with Animals, 220–25. Westport, Conn.: Greenwood Press, 2007.",
      "Maslovskaya, Oksana, and Grigoriy Ignatov. \"Conceptions of Height and Verticality in the History of Skyscrapers and Skylines.\" Edited by D. Safarik, Y. Tabunschikov, and V. Murgul. E3S Web of Conferences, no. 33 (2018): 01005. https://doi.org/10.1051/e3sconf/20183301005.",
      "Project Gutenberg, and Herbert Spencer. \"Illustrations of Universal Progress.\" Gutenberg.org, 2026. https://www.gutenberg.org/files/39977/39977-h/39977-h.htm.",
      "Tam, Agnes, and Meek Lange. \"Progress.\" Stanford.edu, February 17, 2011. https://plato.stanford.edu/entries/progress/#Aca.",
      "University of Virginia. \"Great Chain of Being - Encyclopedia Virginia.\" Encyclopedia Virginia, July 17, 2023. https://encyclopediavirginia.org/great-chain-of-being/.",
      "Van Leeuwen, Thomas A. P. The Skyward Trend of Thought. MIT Press, 1990.",
    ],
    aspectRatio: 1024 / 654,
    pos: { x: 15, y: 15, width: 180, height: 0 },
    float: { delay: "1.5s", dur: "10s" }
  },
  {
    id: 3,
    slug: "bells-of-shandon",
    title: "Bells of Shandon",
    author: "Barra MacMahon",
    image: "/explore_botanical_new.jpg",
    medium: "Audio",
    theme: "Towers",
    tags: [ArtworkTag.Towers, ArtworkTag.Audio, ArtworkTag.Personal, ArtworkTag.Ireland, ArtworkTag.BritishColonization, ArtworkTag.Religion, ArtworkTag.Power, ArtworkTag.History, ArtworkTag.Hegemony, ArtworkTag.Memory],
    year: "2026",
    issue: "Issue 01",
    description: "An audio work exploring bell towers as summoning devices and as sonic symbols of hegemonic power in modern Irish history.",
    body: `My contribution to the Sassafras Issue 'The Tower' examines the role of church bells as they intertwine with Ireland's history of Catholicism, British colonial rule, and communal acts of listening. The initial inspiration for the piece is derived from the Angelus, a Catholic call to prayer which is televised daily at midday and 6pm on Ireland's RTÉ1 network. It is characterised by the sound of tolling bells (lasting 1 minute), upon which the listener is met with various (and somewhat random) scenes of calm—someone mowing the lawn for example, or a figure placing down a Christmas card, the view of ice as it melts from a branch, etc.

This prayer plays a distinct role in childhood memories, and closely symbolises the continued prominence of the Catholic church in Ireland. It is at once a symbol of Ireland's resistance against British Colonial powers (there being numerous links between colonial rule and the persecution of Catholic regions), while simultaneously existing as a specter of generational and institutionalised abuse.

When I think of the tower, I think of the church bells ringing, the sound of the divine, the sound of the institution, the sound of continuity, the sound of home and having to wait for it to end so that I could watch The Simpsons. The bells are charming, and cast a purity and virtue that juxtapose the formidable structure at its source.

From bells, to churches, to the thought of home, I was reminded by the Irish ballad 'The Bells of Shandon' which is based on the poem of the same name by Francis Sylvester Mahony. In it, he describes the beauty of the bells that ring in his hometown. He has "heard bells chiming" all around the world and although they are mighty…

For memory, dwelling
On each proud swelling
Of the belfry knelling
Its bold notes free,
Made the bells of Shandon
Sound far more grand on
The pleasant waters
Of the River Lee.

My piece incorporates threads from this Irish melody into dense swirling reverb, to simulate how the resonance of bells used to fill my room when I lived directly across from a church steeple. I wanted to capture how the bells' strikes bounce off buildings, hills, waters, as they make their way to listening ears. The repeating melody therefore is not locked to a meter. Bells don't play to a metronome after all, they aren't dictated by a conductor; rather, they oscillate based on their own (and the poor bell-ringer's) energy, and thus have an inherently inconsistent rhythm.

This piece thereby strings together threads of sound and pieces of towers, towers such as the Catholic church, or the British empire, or even the Western ideas surrounding how music ought to be formed.`,
    aspectRatio: 718 / 1024,
    pos: { x: 80, y: 25, width: 120, height: 0 },
    float: { delay: "0.8s", dur: "7s" }
  },
  {
    id: 4,
    slug: "that-house-scented-with-guava",
    title: "'That House Scented with Guava': Reflections on Fruit Culture and the Law in Tobago",
    author: "Gabrielle Francois",
    image: "/explore_flower_new.jpg",
    medium: "Text + Video",
    theme: "Towers",
    tags: [ArtworkTag.Towers, ArtworkTag.Essay, ArtworkTag.Personal, ArtworkTag.Video, ArtworkTag.Caribbean, ArtworkTag.TrinidadAndTobagoLaw, ArtworkTag.Community, ArtworkTag.Culture, ArtworkTag.Nature, ArtworkTag.Ecology],
    year: "2026",
    issue: "Issue 01",
    description: "An exploration of tensions between rigid legal structures and fluid communitarian logics through the site of the fruit-bearing trees of Trinidad and Tobago.",
    body: `It's 7AM and I'm on the last hill of my daily walk with my parents when my mother remarks that the guavas are almost in season. My father is delighted; he enjoyed having them daily last year and is looking forward to the season. Two weeks later, the guavas hanging over the neighbour's fence are ripe. For breakfast, we feast on guavas picked on our morning walk.

Tobago is an abundant island. Located in the southern Caribbean Sea, the climate allows a plethora of fruits and vegetables to flourish. As such, Tobagonians often have multiple fruit trees in their yards. On our walks and visits to neighbours I have observed trees bearing avocados, bananas, plums, pomeracs, chennette, breadfruit, and of course, guavas. This abundance is not the product of meticulous cultivation; families, or earlier generations of families, plant seeds or tree cuttings, and the climate does the rest.

On mornings like this, I think of Olive Senior's poetry collection 'Gardening in the Tropics', which I first encountered as a CAPE Literatures in English student. She dedicates two poems to guavas, and the following passage from Guava/2 is particularly evocative of fruit culture in Tobago:

… that house scented with guava and Maud trying to reduce the vast quantity of fruit you kept harvesting. That week she made guava jelly, guava cheese, guava paste, stewed guava, and blended the pulp into drink. But your tree would not stop producing. It bore faster than she could cook or we could consume.

Whether guavas or plums or mangoes, the overwhelming abundance that Senior describes has shaped the sociocultural norms surrounding fruit trees in Tobago. Fruit trees often bear more than a home can reasonably consume, lending itself to widespread gifting of fruit to neighbours, coworkers, and relatives. It also lends itself to a culture of casual fruit picking by passers-by. My mother, born and raised in Tobago, climbed trees and picked fruit to snack on in between meals as a child. I share this experience as well, picking guavas and mangoes for a snack from the trees that grew in my primary school. In this way, picking fruit is a consummate part of life on the island. This way of life allows for my parents to enjoy mangoes in mango season and guavas in guava season, despite our only fruit tree being a stubborn lime tree (which bore fruit for the first time this year that were immediately scorched by the sun).

However, this cultural practice sits uneasily within Trinidad and Tobago's legal framework. The Law, a legacy of Trinidad and Tobago's colonial past, alters the ways in which the land, the tree, the fruit, and the Trinbagonian relate to each other. The Law introduces ownership into the relational framework, where the individual or family owns the land, owns the tree, owns the fruit on the tree within the boundaries of the land. As for the fruit on the tree hanging in the neighbour's land? Or the fruit on the tree hanging over public property? Under the Law, even this detail can change how the fruit relates to the tree.

The result is a breakdown of a symbiotic whole (the Tobagonian, the land, the tree, and the fruit) into distinct legal categories, which are alienated from each other. The Law is the architect of this alienation, as it divests fruits from their organic relational framework and reclassifies them as 'agricultural produce'. This reclassification turns 'picking' into 'stealing', allowing the Law to equate the act of picking our neighbour's fruit to a violation of their individual right to enjoy their property. In other words, a crime.

This criminality is enshrined in the Summary Offenses Act, which criminalises a range of social ills, including assault and battery, violent language, indecency, drunkenness or disorderly conduct, and fouling (pollution) of rivers, streams, and ponds, as follows:

Clause 22: Any person who steals, or destroys or damages or cuts or plucks with intent to steal, any sugar cane, cocoa tree, coconut tree, lime tree, rubber tree, or coffee tree, or any fruit, vegetable, or other praedial production, or any cultivated root or plant used or capable of being used for the food of man or beast or for medicine, distilling, or dyeing, or in the course of any manufacture, whatever the value of the article stolen may be, and whether the land on which the same is at the time growing or in course of cultivation be opened or enclosed, is, subject to section 127, liable on first conviction to a fine of not less than one hundred dollars and not more than two thousand dollars or to imprisonment for not less than one month and not more than six months and on any subsequent conviction to imprisonment for not less than one month and not more than one year.

This legal framework looms over the Tobagonian way of life as its overseer, erecting an intangible tower that often conflicts with spatial logics. Despite its intangibility, there are tower-like qualities, or 'contours', to the Law. As the above clause demonstrates, Laws are constructed to be highly specific and highly exhaustive. As a result, legal clauses tend to be dense, almost to the point of incomprehension. This incomprehensibility also works to situate the Law above the community, literally above and beyond its understanding. To a similar effect, the Law's density, specificity, and exhaustiveness work to weave an airtight construct, which allows little question of its reach or its application. These features legitimate the Law as an absolute authority. In other words, a Tower.

Another way in which the intangible towers like the Law solidify their authority is, interestingly, through culture. Not the organic culture of the island, but the culture of the Anglophone Global North that is disseminated to the island through television, movies, and 'classic' literature. In these depictions, the Law is branded in ways that discourage question. A popular reference that comes to mind is Elle Woods quoting Aristotle in her valedictorian speech in Legally Blonde: "The Law is reason free from passion". Such statements take root in the societal consciousness, situating Law as the site of complete rationality, ultimate fairness, and beyond question. The result is an uneasy tension between the communal practices that are intuitive to Tobagonians, and the Law, which purports to govern and regulate human relationships to space and to each other. In these confrontations, spatial logics are often subordinated to the Law as its antithesis. If the Law is rational, fair, and beyond question, then the spatial logic is irrational, unfair, and unjustifiable.

However, Tobagonians are resourceful with liminality. Many landowners in Tobago allow the branches of their fruit trees to grow over the boundaries of their property (usually fences). The fruit that hangs over the fence is culturally understood as available for picking, challenging the logic of enclosure and culture of individualism that the Law seeks to instill. Instead of the law eradicating a longstanding and cherished communal practice and lived experience, the practice evolves to preserve the values on which they are based. Your neighbour is your family, and there is always enough to share. This subversion ultimately highlights a vulnerability of the Law: this construct towering over the village derives its power from the community's consent.`,
    aspectRatio: 936 / 981,
    pos: { x: 45, y: 45, width: 160, height: 0 },
    float: { delay: "2.1s", dur: "9s" }
  },
  {
    id: 5,
    slug: "exploring-gendered-emotions-and-norms",
    title: "Exploring Gendered Emotions and Norms Through the Lens of a Tower",
    author: "Anusha Madhumitha",
    image: "/explore_struggle_new.jpg",
    medium: "Essay",
    theme: "Towers",
    tags: [ArtworkTag.Towers, ArtworkTag.Essay, ArtworkTag.Gender, ArtworkTag.Emotions, ArtworkTag.Feminism],
    year: "2026",
    issue: "Issue 01",
    description: "An explanation of how emotional expression is governed and enforced by patriarchal structures that serve to further diminish, surveil, exclude, and pathologize women.",
    body: `"One is not born, but rather becomes a woman."
- Simone de Beauvoir, The Second Sex

In our society, there exist rules of feeling. We are supposed to be happy when we are graduating, getting married or meeting friends, and sad when someone dies. Not to yawn or laugh or roll our eyes in front of the teacher or the professor. We also have emotions that are supposed to be displayed; i.e., the cultural display rules. This can be explained using examples of a flight attendant or a salesperson who has to pretend to smile despite their exhaustion or long work schedule. It's significant to note that we all expect these emotional demands both consciously and unconsciously.

Let's explore how emotions, feelings and cultural display rules are extremely gendered. Quite similar to the existence of social scripts, there exist emotional scripts, and the gender of the individual becomes one of the foundational and primary ways in which society as a whole disciplines our emotional behaviour. What emotions are acceptable and can be expressed and permitted to feel in public? For example, men are socialised to express dominance and pride (historically linked to masculinity) and women are socialised to express care and empathy, which are largely considered as feminine.

While one's sex typically carries biological determinants, gender is a social construct. The intersection of gender and emotions in itself is an emotionally charged topic. So much has been misused and exploited, including any research that discusses sex in general, which is likely to be controversial.

Emotional expression is never neutral, and the emotional scripts of our society classify emotions as a binary concept. Masculinity is associated with control, rationality and, importantly, an extreme level of emotional suppression. Conversely, femininity is linked to care, vulnerability, and sensitivity. These categories are not biologically determined truths, but socially and culturally constructed scripts that lay the groundwork for hierarchy and power. Of course, these beliefs about individuals' emotions and behaviours based on their gender do have a huge impact on the roles they play—or are even considered fit to play—in society.

The tower, both in the context of a metaphor and as a living reality, offers a framework through which these categories or even emotional hierarchies can be understood. The tower is understood as a symbol of control, surveillance, institutional authority, and even to some extent as a means of exclusion. The tower also regulates who is given access to power and the emotional behaviour that has been followed to maintain it, and even to require that power in the first place.

Emotional conformity becomes a condition for belonging and survival, and those who fail to conform will face risk, exclusion and dismissal. This pattern of emotional code begins within the domestic space. Homes are often portrayed and imagined as a private, intimate and safe place detached from institutional power and surveillance, and yet they serve as the foundation where we not only learn societal emotional scripts but also begin to internalise societal expectations. Men, from such a young age, are discouraged from expressing vulnerability and crying through various ways. Through a combination of social cues, learning by example, media representation, film industry, etc., they are told to present a certain type of masculinity, and to actively express their masculinity— for example, being chauvinistic or aggressive. The more a boy is pushed to suppress his "feminine" traits to conform to or develop a version of a hyper-masculine person, the more he is forced to fit the box and less able to express his emotions.

Meanwhile, women are socialised differently. Femininity is often constructed in the context of all sorts of emotional labour, such as nurturing, caring, empathic expression, and absorbing discomfort in the name of being calm without any resistance. Women are expected to provide emotional support without any reciprocal expectations, which comes at a price of violating their own emotional autonomy. Yet, women are expected to feel openly in a way that legitimises their emotions. A woman being angry in general, regardless of public or private places, is often labelled as hysterical, aggressive, unstable or irrational. Women expressing passive vulnerability are romanticised and even fetishised, but are condemned when it disrupts.

These gendered expectations that are mythical in nature create a toxic hierarchy in which masculine emotional restraint is perceived as authority and competence, while feminine emotional expression is associated with weakness and instability. It is like rationality is masculinised and is reserved only for boys, and emotion is feminised. This myth of gendered emotions continues to shape systems and institutional life across workplaces, universities, public spaces and governments. The modern workplace can be used as one of the evident manifestations of a tower as a structure of emotion. Workplace environments reward emotional neutrality, emotional suppression and the so-called composure, all of which are actively coded as masculine. Employees are expected to remain "professional", a term that often disguises emotional conformity as neutrality, but emotional expressions are never neutral and never will be.

Thus, gendered emotions further perpetuate systemic inequalities, and individuals' emotional legitimacy gets unevenly distributed. As mentioned before, the tower also functions through surveillance like a watchdog. The same applies to individuals learning to monitor themselves constantly, adjusting and changing their emotional expressions to avoid exclusion or even punishment. Women in power may very carefully calculate their emotional expressions when they make appearances in professional settings. Men experiencing burnout are usually forced to suppress their vulnerability to avoid appearing weak before their employers or colleagues. Emotional self-survival to mask raw emotions becomes this strategy, or even a coping mechanism for survival.

The above-mentioned notions reflect the broader structures of power that really determine whose emotions are validated and whose are dismissed. Emotional expression is not only shaped by gender, although it is heavily shaped by it, but also intersects with race, class, migration, religion, disability and sexuality. The tower, therefore, doesn't just simply regulate emotions, per se; it regulates emotions in an extremely unfair and uneven way. It barely rewards particular emotions while punishing others.

The harsh truth is that emotional conformity dictates access to employment, safety, security, social belonging, authority and recognition. Academic institutions themselves reflect this bias. Universities frequently position themselves as spaces of intellectual freedom and critical thinking, but often reproduce extremely rigid emotional hierarchies. The idea of "Ivory Tower" is not only inaccessible through some sort of specialised language or institutional privilege, but it also privileges certain carefully curated emotional performances. As if emotion is something that contaminates knowledge rather than something that actually contributes to it. Academic authority is often associated with intellectual distance.

Feminist scholars and writers and activists have long challenged the myths of gendered emotions—see, for example, Hysterical: Exploding the Myth of Gendered Emotions by behavioral and data scientist Dr. Pragya Agarwal. In the book, she argues that emotions are not just limited to the feelings of an individual but a bigger picture of the political and social experiences that further reveal society's jarring inequalities. Hence, reclaiming emotional fluidity challenges emotions that have become gendered and the emotional architecture of the tower by questioning or rejecting the systematic values that it prioritises. Thus, the real power lies not simply in emotional expressions, but in transforming the outdated structures that determine or undermine how emotions are valued. To question gendered emotional norms is also to question systems like patriarchy that benefit from maintaining them. The image of a tower, therefore, remains as a precise symbol where power operates in every aspect, especially in an emotional sense.`,
    aspectRatio: 764 / 776,
    pos: { x: 10, y: 55, width: 140, height: 0 },
    float: { delay: "1.1s", dur: "7.5s" }
  },
  {
    id: 6,
    slug: "woman-in-the-concrete-jungle",
    title: "Woman in the Concrete Jungle",
    author: "Kalifa Lovelace",
    image: "/explore_gardens_new.jpg",
    medium: "Poem",
    theme: "Towers",
    tags: [ArtworkTag.Towers, ArtworkTag.Poem, ArtworkTag.Gender, ArtworkTag.Feminism, ArtworkTag.Caribbean, ArtworkTag.TrinidadAndTobago],
    year: "2026",
    issue: "Issue 01",
    description: "The tower of patriarchy looms ominously over women at each stage of life; girlhood, womanhood and motherhood. This poem explores how hypersexualisation and violence impacts women at each stage of their existence, and comments on the cyclical nature of it all. It was inspired by the inordinate number of missing women and young girls in Trinidad and Tobago and the excessive reports of violent crimes and murders against women and girls in the country over the last decade.",
    aspectRatio: 1024 / 916,
    pos: { x: 75, y: 70, width: 180, height: 0 },
    float: { delay: "0.3s", dur: "12s" }
  },
  {
    id: 7,
    slug: "gazes-on-me",
    title: "Gazes On Me",
    author: "Anjana Ramesh",
    image: "/explore_resin_new.jpg",
    medium: "Essay",
    theme: "Towers",
    tags: [ArtworkTag.Towers, ArtworkTag.Essay, ArtworkTag.Personal, ArtworkTag.SouthAsia, ArtworkTag.India, ArtworkTag.Surveillance, ArtworkTag.Community, ArtworkTag.Gender, ArtworkTag.Culture],
    year: "2026",
    issue: "Issue 01",
    description: "A self-reflective critique of casual surveillance and privacy invasion and its normalisation in South Asian culture sustained through hierarchical structures, which include patriarchy.",
    body: `Two steps out of my gate, and I am met with the usual, "Where are you off to, Mole?" There is care, curiosity and a bit of concern in the tone of my "well-meaning" neighbour. It is rare that I don't get at least one of these questions every time I step out of my house to go somewhere. I answer politely of my intentions and brush it off as neighbourly camaraderie that I had clearly enjoyed not having to go through during my time living abroad. We both go separate ways, but I still feel a gaze following me, and then one gaze turns to many…

The nosy neighbour (or relative) is well represented in South Asian pop-culture and is often a mildly undesirable off-shoot of our collectivist nature where community precedes individualism. Not that the nosy neighbour is a phenomenon limited to the South Asian people – I don't want to gatekeep nosiness – but the distinguishing factor is the blatant lack of boundaries. It is an important currency in the world of gossip that fills weddings, birthdays, or any other gathering, along with the delicious fare. I must admit that I do enjoy the occasional family gatherings with juicy gossip on people that I don't even know until I am the object of analysis. Then, I am forced to take out my culture analyst persona and diagnose the normalisation of privacy infringement and casual surveillance in Indian culture. The constant sense of being watched – by the aunty next door or the shopkeeper by the bus-stop or the old-man who sits beside me on the bus. The neighbourhood moves around with me like my own personal storm cloud with binoculars and an opinion on everything I do. But my grievance is not with my neighbour, it is with the normalisation of casual surveillance and spying in the name of care and upholding "the culture" – blurring the lines between love and privacy invasion.

The spying can be a subject of deep sociological analysis beginning with the patriarchal gaze that it sustains. The watchful eye of the neighbour is important in keeping the culture intact. Who wears what and does what does not escape a discussion. I often catch myself looking into the mirror through the eyes of the uncle next door. My favourite white and yellow summer dress is suddenly too transparent. In the Foucauldian sense, I am reminded of the Panopticon and internalizing the gaze and correcting myself (loathingly, might I add) to fit the bill as a "good Indian girl". I know I am being watched from the tower by the watchful eyes of the guards of patriarchy. Meanwhile, the neighbour, or the spy as I like to call them, escapes all scrutiny, especially if they are an "uncle spy". Their gaze gets glorified as protection when what I need is to be protected from them and their x-ray vision. The Aunty spies are not often as lucky to escape from critique and ridicule. They have become a cliché in films and cultural lore, often bearing blame by the progressive new generation for upholding the oppressive systems of South Asian patriarchy. They are often reduced to punchlines like "the bored housewife" while the same gossip in the hands of the uncle spy becomes words of wisdom.

So, is it possible to escape the watchful eyes of the uncles and aunties? Sadly, I am skeptical. In the current world of digital media, where privacy is often a myth satisfied by "only necessary cookies", my woes are amplified. The neighbourhood has gone digital. I have to be extremely careful not to accidentally follow my distant uncle whom I have met last maybe 5 years ago. I do not know him well, but I cannot take the chances.

I have tried to go a bit further, or a lot further by moving away with the hope that the gaze does not follow. But what I failed to fathom was that every culture has its own iteration of the nosy neighbour that I am impervious to. The trope is not limited to South Asian culture; for us, it just serves a larger social function of community cohesion. In some ways, the community aspect of it is heartening compared to the nosiness that I have faced elsewhere away from home. The gazes away from home are often alienating. While the gaze that I try to evade at home is primarily sustained by the power of patriarchy, I am confronted with my otherness through the gazes away from home. This does not mean I have transcended patriarchal control by moving away, but the lens shifts. The watchtower here forces me to check myself to "belong". I correct myself not to be loud, not to be disruptive, to sort the trash perfectly so that I fit into the bill of the "good immigrant". But I still don't belong and never will. The same way I don't belong back home. At least away from home, my misdoings don't get back to my parents.

While I am concerned about the larger systems of surveillance brought forth by the technocratic overloads, I worry more about the policing and surveillance that has been normalised and that I embody myself. Even if I were ever to escape these gazes, will I ever escape my own?`,
    aspectRatio: 1024 / 890,
    pos: { x: 35, y: 78, width: 160, height: 0 },
    float: { delay: "2.1s", dur: "6s" }
  },
  {
    id: 8,
    slug: "commodification-of-intelligence",
    title: "Commodification of Intelligence (provisional title)",
    author: "Malin Menzel",
    image: "/explore_landscape_new.jpg",
    medium: "Essay",
    theme: "Towers",
    tags: [ArtworkTag.Towers, ArtworkTag.Essay, ArtworkTag.AI, ArtworkTag.Technology, ArtworkTag.Futurism, ArtworkTag.Hierarchies, ArtworkTag.Class, ArtworkTag.Power, ArtworkTag.Commodification],
    year: "2026",
    issue: "Issue 01",
    body: `How social media, AI, and the growing tech elite — the tower of tech bros — shape our relation to knowledge and critical thinking.

We all know the idea of the "ivory tower", where the academic, intellectual elite is sitting high up in the tower, theorizing over society, thinking themselves superior, while being detached from not only the majority of people but also from "real life." Leaving aside the extent to which this is accurate, what if a new tower is being constructed? One in which the tech elite sits high up in the chain of decision-making and governance, while the rest of us sit at the bottom, looking up, without any power to move up the tower nor to crumble it? A tower where the people who have knowledge, critical thinking skills, and, most importantly, the ability to engage with the world through theorizing about it, sit at the top while the rest are glued to their phones, disengaged. A tower in which your position is determined based on whether you have the privilege of being able to avoid social media and, even more importantly, to avoid using AI.

Polluted environments and the new underclass

In a time of information overload, a post-truth society, social media, increasingly addictive algorithms, and AI, critical thinking skills, as well as the time and capability to engage with social sciences, humanities, and philosophy are likely to become a privilege of the few. In fact, these developments are likely to create a new underclass. In her video essay "the chronically online will be the new underclass," DJ and Youtuber @yagirldjmagic puts forward a theory likening the internet, specifically social media, to a physical place, which has become polluted and unbearable for most. Taking this idea further, she distinguishes six "pollutants", which, just as pollutants in the physical world, create a toxic environment with far-reaching social problems. These pollutants include echo chamber, anxiety, over consumption, cultural extraction, addiction, and rage bait, which not only poison the space, but also exploit something from our daily lives. For example, anxiety exploits our mental health and sense of self, while addiction exploits our time and attention. Content creators are then incentivized to use these pollutants in order to stay relevant in the algorithm and keep users on the platform, as attention is the currency. Consumers often struggle to log off due to these pollutants and several real life circumstances that further keep people on their phones. In fact, I would argue that in today's hyper-capitalistic society, many people are constantly in survival mode, working full-time during unprecedented levels of wealth inequality, a cost of living crisis, the dissolution of the community, and ongoing climate catastrophe, so when they finally come home they are simply exhausted. In this sense, social media becomes a coping mechanism in order to escape reality, relax from work and stimulate themselves without having to physically do anything. Then the above-mentioned pollutants keep them on the platform and engaged, which is very much done intentionally by platform owners, supported by creators to keep people online as long as possible. This competition for our time goes so far that they now compete for our time by even trying to make people sleep less, so they can spend more time on the platform.

Moreover, consumers are being presented with an illusion of being connected to others on the platforms, while at the same time options for real life connections and community are becoming increasingly sparse or unaffordable. DJ Magic argues that real life community spaces are dwindling, people are becoming detached and lonelier, cities are becoming less livable, and many pastime activities are increasingly costly. While her perspective is definitely very focused on the US context, where this is more visible, it seems to be increasing, and traces of this are also found in Europe. These developments are affecting marginalized communities with fewer resources and often living in neighborhoods that offer even fewer spaces and opportunities, making them more vulnerable to the pollutants of the internet. This exacerbates already existing social inequalities and makes privilege the determining factor of who gets to log off.

AI and its impact on critical thinking

While social media is harmful and has far-reaching social consequences, AI is further intensifying this. AI is increasingly replacing content creators, making content creation easier, faster and cheaper for platforms, intensifying the aforementioned pollutants and making it easier to keep people on the platform.

Apart from social media and AI harming people's mental health and lives, being stuck online also means that people do not have time or energy left to form communities, to organize, and to create political pressure. This is also being intensified by cost of living crises, people losing jobs due to being replaced with AI, all further pushing people into survival mode, seeking dissociation in the online world instead. When people are distracted, exhausted, and lacking alternatives, it makes them more vulnerable to propaganda and stifles resistance, thus not offering any opposition to this downward spiral.

Furthermore, social media, AI and the combination of both are diminishing critical thinking skills and pushing us further into a post-truth society. There is no consensus anymore on what is a fact, while opinions matter more and people are drawn to the truth that they find the most compelling or the most entertaining. AI's best skill is making something sound as if it is the truth— that is literally what LLMs are doing. So, this combined with a lack of critical thinking skills will further diminish the importance of truth.

To further add to the theory presented by DJ Magic, I argue that an engagement with social sciences, philosophy and critical reflection on the world and the societies we live in will increasingly become a privilege as well. One can certainly argue that deep engagement with these disciplines through studying or working in academia has always been a privilege to a certain extent.`,
    aspectRatio: 1024 / 768,
    pos: { x: 65, y: 50, width: 180, height: 0 },
    float: { delay: "1.2s", dur: "9s" }
  }
]
