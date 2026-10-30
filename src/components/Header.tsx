import { useEffect, useState } from "react"

import { asset } from "@/components/Photo"
import { cn } from "@/lib/utils"

const NAV = [
  ["#start", "Start here"],
  ["#story", "Our story"],
  ["#catering", "Catering"],
  ["#menu", "Menu"],
  ["#restaurant", "Restaurant"],
] as const

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      id="topbar"
      className={cn(
        "sticky top-[var(--ticker-h)] z-20 flex items-center gap-6 border-b border-transparent bg-charcoal/92 px-gutter py-3 text-bone backdrop-blur-md transition-[border-color] duration-300",
        scrolled && "border-bone/12",
      )}
    >
      <a
        href="#top"
        aria-label="FD Grill, back to top"
        className="mr-auto flex items-center gap-2.5 font-display text-[1.25rem] font-extrabold tracking-[-0.01em] no-underline font-narrow sm:text-[1.4rem]"
      >
        <picture>
          <source srcSet={asset("img/logo.webp")} type="image/webp" />
          <img src={asset("img/logo.png")} alt="" width={44} height={44} className="size-10 rounded-full" />
        </picture>
        <span className="whitespace-nowrap">FD Grill</span>
      </a>
      <nav aria-label="Main" className="hidden gap-7 lg:flex">
        {NAV.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="relative font-medium text-bone-soft no-underline transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-ember after:transition-transform after:duration-300 after:ease-out hover:text-bone hover:after:scale-x-100"
          >
            {label}
          </a>
        ))}
      </nav>
      <a
        href="#quote"
        className="rounded-full border-[1.5px] border-bone/35 px-[13px] py-2 text-[0.9rem] font-bold whitespace-nowrap no-underline transition-colors hover:border-ember hover:bg-ember hover:text-charcoal sm:px-4 sm:py-[9px] sm:text-[0.95rem]"
      >
        Get a <span className="hidden xs:inline">catering </span>quote
      </a>
    </header>
  )
}
