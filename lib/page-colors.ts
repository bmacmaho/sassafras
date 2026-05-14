export const PAGE_COLORS: Record<string, string> = {
  "/":              "#c5d940",
  "/about":         "#303a8f",
  "/explore":       "#f39c12",
  "/submissions":   "#e74c3c",
  "/keep-in-touch": "#9b59b6",
  "/contact":       "#9b59b6",
  "/issues":        "#16a085",
  "/article":       "#16a085",
  "/current-issue": "#27ae60",
}

export const DEFAULT_COLOR = "#f0f0f0"

export function getPageColor(pathname: string): string {
  const match = Object.keys(PAGE_COLORS).find((key) => pathname.startsWith(key))
  return match ? PAGE_COLORS[match] : DEFAULT_COLOR
}
