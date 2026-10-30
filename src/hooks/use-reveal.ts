import { useEffect, useRef } from "react"

/**
 * Adds a class once the element scrolls into view. Watch the parent of a
 * clipped photo: a fully clipped element never counts as visible.
 */
export function useReveal<T extends HTMLElement>(className = "in") {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reveal = () => {
      el.classList.add(className)
      el.querySelectorAll(".reveal").forEach((r) => r.classList.add("in"))
    }
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal()
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal()
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [className])
  return ref
}
