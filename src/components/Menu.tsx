import { useEffect, useRef, useState } from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHead } from "@/components/SectionHead"
import { MENU } from "@/data/menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

const ALL = MENU.map((s) => s.id)
const TABS = MENU.filter((s) => s.tab)

export function Menu() {
  const phone = useMediaQuery("(max-width: 860px)")
  // Every section open on wide screens; on phones they fold, first one open
  const [open, setOpen] = useState<string[]>(ALL)
  const [active, setActive] = useState(TABS[0].id)
  const tabsRef = useRef<HTMLElement>(null)

  useEffect(() => setOpen(phone ? [ALL[0]] : ALL), [phone])

  // Tabs follow the reader through the menu
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.id === "drinks" ? "sides" : entry.target.id
          setActive(id)
          const tab = tabsRef.current?.querySelector<HTMLAnchorElement>(`a[href="#${id}"]`)
          if (tab) tabsRef.current?.scrollTo({ left: tab.offsetLeft - 16, behavior: "smooth" })
        })
      },
      { rootMargin: "-35% 0px -60% 0px" },
    )
    ALL.forEach((id) => {
      const el = document.getElementById(id)
      if (el) spy.observe(el)
    })
    return () => spy.disconnect()
  }, [])

  const openSection = (id: string) => {
    const ids = id === "sides" ? ["sides", "drinks"] : [id]
    setOpen((prev) => Array.from(new Set([...prev, ...ids])))
  }

  return (
    <section id="menu" aria-labelledby="menu-title" className="mx-auto max-w-site px-gutter pt-[clamp(32px,5vw,64px)] pb-[clamp(64px,9vw,120px)]">
      <SectionHead id="menu-title" title="The menu">
        Everything here can be cooked for your event, from the grill to the stew pot. Pick what you love and we'll quote it
        for your guest count.
      </SectionHead>

      <nav
        ref={tabsRef}
        aria-label="Menu sections"
        className="sticky top-[calc(var(--ticker-h)+62px)] z-10 -mx-gutter mb-6 flex gap-2 overflow-x-auto bg-white/94 px-gutter py-3 [scrollbar-width:none] backdrop-blur-sm sm:top-[calc(var(--ticker-h)+64px)] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => openSection(s.id)}
            className={cn(
              "flex-none rounded-full px-4 py-2 font-medium no-underline transition-colors duration-200",
              active === s.id ? "bg-charcoal text-bone" : "bg-ochre-pale hover:bg-accent",
            )}
          >
            {s.tab}
          </a>
        ))}
      </nav>

      <Accordion
        type="multiple"
        value={open}
        onValueChange={(v) => phone && setOpen(v)}
        className="grid grid-cols-1 items-start gap-x-[clamp(32px,6vw,96px)] md:grid-cols-2"
      >
        {MENU.map((section) => (
          <AccordionItem key={section.id} value={section.id} id={section.id} className={section.id === "stews" ? "md:row-span-3" : undefined}>
            <AccordionTrigger tabIndex={phone ? undefined : -1} className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[0.95] font-extrabold font-narrow">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              {section.note && <p className="-mt-0.5 mb-1.5 max-w-[46ch] text-[0.98rem] text-muted-foreground">{section.note}</p>}
              <ul className="m-0 mb-5 list-none p-0 md:mb-9">
                {section.items.map((item) => (
                  <li key={item.name} className={cn(section.compact ? "py-2.5" : "py-3.5", "border-dashed border-border [&+&]:border-t")}>
                    <span className="font-display text-[1.2rem] leading-[1.15] font-bold font-semi-narrow sm:text-[1.35rem]">
                      {item.name}
                      {item.gloss && (
                        <small className="block font-sans text-[0.85rem] font-medium text-ember-deep [font-stretch:100%]">{item.gloss}</small>
                      )}
                    </span>
                    {item.description && <p className="mt-1 max-w-[56ch] text-muted-foreground">{item.description}</p>}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
