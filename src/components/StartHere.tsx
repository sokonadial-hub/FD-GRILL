import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Photo } from "@/components/Photo"
import { MATCHES } from "@/data/matches"
import type { Food } from "@/data/site"

/** "You already know this food": pick a food you love, meet your first FD Grill dish */
export function StartHere({ onAddFood }: { onAddFood: (food: Food) => void }) {
  const [picked, setPicked] = useState(MATCHES[0].key)
  const match = MATCHES.find((m) => m.key === picked) ?? MATCHES[0]

  const pick = (key: string) => {
    if (!key) return // a single choice always stays selected
    setPicked(key)
    // On phones the card sits under the chips: bring it into view if it landed off-screen
    requestAnimationFrame(() => {
      const card = document.getElementById("match-card")
      if (!card || card.getBoundingClientRect().top <= window.innerHeight - 160) return
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      card.scrollIntoView({ block: "nearest", behavior: still ? "auto" : "smooth" })
    })
  }

  return (
    <section id="start" aria-labelledby="start-title" className="bg-ochre-pale text-charcoal">
      <div className="mx-auto grid max-w-site grid-cols-[minmax(0,1fr)] content-start gap-x-[clamp(32px,6vw,96px)] gap-y-7 px-gutter py-[clamp(64px,9vw,120px)] [grid-template-areas:'intro'_'loves'_'match'] md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:grid-rows-[auto_1fr] md:[grid-template-areas:'intro_match'_'loves_match']">
        <header className="[grid-area:intro]">
          <h2 id="start-title" className="max-w-[13ch] text-[clamp(2.8rem,6vw,5.4rem)] font-extrabold tracking-[-0.025em] font-condensed">
            You already know this food.
          </h2>
          <p className="mt-[22px] max-w-[44ch] text-[1.15rem] text-muted-foreground">
            Meat charred over the coals, rice cooked red with tomato, greens simmered low and slow, flaky hand pies:
            if you've been to an American cookout, you already know these flavors. Pick what you love and we'll show
            you where to start.
          </p>
        </header>

        <div className="self-start [grid-area:loves]">
          <p id="loves-label" className="mb-2.5 font-display text-[1.35rem] font-bold font-semi-narrow">I love…</p>
          <ToggleGroup type="single" value={picked} onValueChange={pick} aria-labelledby="loves-label" className="gap-2.5">
            {MATCHES.map((m) => (
              <ToggleGroupItem key={m.key} value={m.key}>
                {m.love}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="self-center [grid-area:match]" aria-live="polite">
          <article
            key={match.key}
            id="match-card"
            className="animate-match-in overflow-hidden rounded-[10px] bg-white shadow-[0_1px_0_var(--border)]"
          >
            {match.photo ? (
              <figure className="m-0 aspect-[2/1] md:aspect-[16/10]">
                <Photo
                  name={match.photo.name}
                  widths={match.photo.widths}
                  sizes="(max-width: 860px) 92vw, 46vw"
                  alt={match.photo.alt}
                  width={match.photo.width}
                  height={match.photo.height}
                  className="size-full object-cover"
                />
              </figure>
            ) : (
              match.art && (
                <div
                  aria-hidden="true"
                  className={`match-art flex aspect-[2/1] flex-col justify-end p-[clamp(20px,3vw,32px)] text-bone md:aspect-[16/10] ${match.art.tone}`}
                >
                  <span className="font-display text-[3.6rem] leading-[0.85] font-extrabold tracking-[-0.03em] font-condensed md:text-[clamp(4rem,9vw,7rem)]">
                    {match.art.name}
                  </span>
                  <span className="mt-2.5 text-[1.05rem] font-semibold">{match.art.gloss}</span>
                </div>
              )
            )}
            <div className="p-[clamp(22px,3vw,32px)]">
              <p className="font-semibold text-ember-deep">{match.ask}</p>
              <h3 className="mt-1 text-[clamp(2.2rem,3.8vw,3.2rem)] font-extrabold tracking-[-0.02em] [font-stretch:78%]">
                {match.answer}
              </h3>
              <p className="mt-3 mb-[22px] max-w-[46ch] text-muted-foreground">{match.description}</p>
              <Button asChild variant="dark">
                <a href="#quote" onClick={() => onAddFood(match.food)}>
                  Add {match.short} to my quote
                </a>
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
