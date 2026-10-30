import { useEffect, useState } from "react"

import { PHONE } from "@/data/site"
import { cn } from "@/lib/utils"

/** Thumb-reach actions on phones; hidden while the hero's own buttons are on screen */
export function Dock() {
  const [hidden, setHidden] = useState(true)
  useEffect(() => {
    const heroActions = document.querySelector("#hero-title")?.parentElement?.querySelector(".hero-fade:last-child")
    if (!heroActions || !("IntersectionObserver" in window)) {
      setHidden(false)
      return
    }
    const io = new IntersectionObserver((entries) => setHidden(entries[0].isIntersecting))
    io.observe(heroActions)
    return () => io.disconnect()
  }, [])

  const link = "flex min-h-12 items-center justify-center rounded-[13px] font-bold text-bone no-underline active:scale-[0.96]"
  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-30 grid grid-cols-[1.2fr_1fr_1fr] gap-1.5 rounded-[18px] bg-charcoal/94 p-1.5 shadow-[0_10px_30px_rgba(23,19,15,0.3)] backdrop-blur-md transition-[transform,opacity] duration-500 ease-out md:hidden",
        hidden && "pointer-events-none translate-y-[140%] opacity-0",
      )}
    >
      <a href="#quote" className={cn(link, "bg-ember text-charcoal")}>Get a quote</a>
      <a href={`tel:${PHONE}`} className={link}>Call</a>
      <a href="#menu" className={link}>Menu</a>
    </nav>
  )
}
