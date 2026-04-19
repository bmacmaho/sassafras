export const PAGE_COLORS: Record<string, string> = {
  "/current-issue": "rgb(112, 150, 234)",
  "/issues":        "rgb(160, 120, 200)",
  "/explore":       "rgb(140, 195, 120)",
  "/about":         "rgb(234, 170,  90)",
  "/contact":       "rgb(220, 100, 120)",
  "/keep-in-touch": "rgb( 90, 195, 180)",
  "/article":       "rgb(112, 150, 234)",
  "/":              "#fbfaf1",
}

export const DEFAULT_COLOR = "#fbfaf1"

export function getPageColor(pathname: string): string {
  const match = Object.keys(PAGE_COLORS).find((key) => pathname.startsWith(key))
  return match ? PAGE_COLORS[match] : DEFAULT_COLOR
}
