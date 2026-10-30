import { Photo } from "@/components/Photo"
import { useReveal } from "@/hooks/use-reveal"

export function Story() {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id="story"
      aria-labelledby="story-title"
      className="mx-auto grid max-w-site grid-cols-1 items-center gap-[clamp(32px,6vw,96px)] px-gutter pt-[clamp(64px,9vw,128px)] md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
    >
      <figure className="reveal -mx-gutter m-0 overflow-hidden md:mx-0 md:rounded-md">
        <Photo
          name="patte-beef"
          widths={[640, 1000]}
          sizes="(max-width: 860px) 100vw, 45vw"
          alt="Golden patté filled with spiced beef and boiled egg, served on lettuce with a bowl of onion sauce"
          width={1000}
          height={826}
          className="w-full"
        />
      </figure>
      <div>
        <h2 id="story-title" className="max-w-[14ch] text-[clamp(2.6rem,5.4vw,4.8rem)] font-extrabold tracking-[-0.02em] font-condensed">
          20+ years at the grill. Now, a new chapter.
        </h2>
        <p className="mt-7 mb-[18px] max-w-[34ch] font-display text-[clamp(1.35rem,2.1vw,1.7rem)] leading-[1.25] font-semibold text-ember-deep [font-stretch:90%]">
          FD Grill is a family business, rooted in our heritage, in live-fire cooking and in the beauty of food made from
          whole, natural ingredients.
        </p>
        <p className="max-w-[52ch] text-[1.1rem] text-muted-foreground">
          For more than 20 years we've cooked the dishes we grew up with: kabobs marinated in house spices and charred
          over the coals, stews that simmer for hours, pastry folded by hand. Now we're growing: we're building a full
          kitchen at our Philadelphia location and opening it for sit-down dining in 2027. Our catering carries on as
          always.
        </p>
        <p className="mt-4 max-w-[52ch] text-[1.1rem] font-semibold text-charcoal">
          These are our family's recipes, cooked the way we cook them at home. Nothing toned down, nothing dressed up.
        </p>
      </div>
    </section>
  )
}
