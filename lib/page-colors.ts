export const PAGE_COLORS: Record<string, string> = {
  "/":              "#c5d940", // Sassafras Green
  "/current-issue": "#27ae60", // Forest Green
  "/issues":        "#16a085", // Archive Teal
  "/explore":       "#2b3485", // Deep Academic Blue
  "/about":         "#3498db", // Sky Blue
  "/submissions":   "#e74c3c", // Editorial Red
  "/keep-in-touch": "#e67e22", // Vibrant Orange
  "/contact":       "#e67e22", // Vibrant Orange
  "/article":       "#1abc9c", // Fresh Cyan
}

export const DEFAULT_COLOR = "#fcfaf2" // Soft Cream

export function getPageColor(pathname: string): string {
  // Check for exact matches first
  if (PAGE_COLORS[pathname]) return PAGE_COLORS[pathname]
  
  // Check for prefix matches
  const match = Object.keys(PAGE_COLORS)
    .filter(key => key !== "/") // Skip root to check more specific ones first
    .find((key) => pathname.startsWith(key))
    
  if (match) return PAGE_COLORS[match]
  
  // Default to home color if on root, else fallback
  if (pathname === "/") return PAGE_COLORS["/"]
  
  return DEFAULT_COLOR
}
