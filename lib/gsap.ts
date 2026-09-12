import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Registered once here so every scroll-animation component can just import
// from this module instead of each calling registerPlugin itself.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
