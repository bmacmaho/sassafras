import type { Person } from "./types"

/** Splits a role into display lines for the multi-line role label in person list rows. */
export function getRoleLines(role: Person["role"]): string[] {
  if (Array.isArray(role)) return role
  const words = role.split(" ")
  return words.length === 4
    ? [words[0], words[1] + " " + words[2], words[3]]
    : words
}

/** Flattens a role into a single display string for the vertical role strip. */
export function getRoleText(role: Person["role"]): string {
  return Array.isArray(role) ? role.join(" ") : role
}

// ── Team (About page) ────────────────────────────────────────────────────────
export const teamData: Person[] = [
  { id: 1, name: "Anjana Ramesh",      role: "Content Editor",                 photo: null, bio: "" },
  { id: 2, name: "Anna Phaidra",       role: "Artistic Director/Designer",     photo: null, bio: "Anna Phaidra is an award-winning artist and researcher specializing in illustration, woodcarving, and installation. Her work attends to living, extinct, and speculative beings through an interdisciplinary lens—bringing together historical symbolism and folklore with environmental humanities research." },
  { id: 3, name: "Barra MacMahon",     role: "Web Developer/Designer",         photo: null, bio: "" },
  { id: 4, name: "Chenlu Ni",          role: "Designer/Web Developer",         photo: null, bio: "" },
  { id: 5, name: "Diana Rudic",        role: "Community Manager",              photo: null, bio: "" },
  { id: 6, name: "Gabrielle Francois", role: "Social Media and Branding",      photo: "Upload-test.JPG", bio: "" },
  { id: 7, name: "Javiera Bilbao",     role: "Project Manager/Content Editor", photo: null, bio: "Javiera directs the initiative's operational strategy, ensuring that Sassafras remains at the vanguard of redefining accessible academic discourse." },
  { id: 8, name: "Malin Menzel",       role: "Event Coordinator",              photo: null, bio: "" },
]

// ── Contributors (Current Issue page) ──────────────────────────────────────────
export const contributorsData: Person[] = [
  { id: 1, name: "Elena Vasquez",    role: "Essayist",     photo: null, bio: "" },
  { id: 2, name: "Felix Okonkwo",    role: "Audio Essay",  photo: null, bio: "" },
  { id: 3, name: "Priya Sunderajan", role: "Poet",         photo: null, bio: "" },
  { id: 4, name: "Tomás Reinholt",   role: "Illustrator",  photo: null, bio: "" },
  { id: 5, name: "Yuki Nakashima",   role: "Photographer", photo: null, bio: "" },
]
