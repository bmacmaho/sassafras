export const PAGE_COLORS: Record<string, string> = {
  "/":              "#FF7D00",
  "/about":         "#FF730F",
  "/explore":       "#A7B34D",
  "/submissions":   "#9DA941",
  "/keep-in-touch": "#7089B9",
  "/contact":       "#7089B9",
  "/issues":        "#9DA941",
  "/article":       "#9DA941",
  "/current-issue": "#7C6ABE",
}

export const DEFAULT_COLOR = "#9DA941"

export function getPageColor(pathname: string): string {
  const match = Object.keys(PAGE_COLORS)
    .sort((a, b) => b.length - a.length)
    .find((key) => pathname.startsWith(key))
  return match ? PAGE_COLORS[match] : DEFAULT_COLOR
}
