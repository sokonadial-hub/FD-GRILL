import { Button } from "@/components/ui/button"
import { PHONE, PHONE_DISPLAY } from "@/data/site"
import { useReveal } from "@/hooks/use-reveal"

export function Restaurant() {
  const ref = useReveal<HTMLElement>()
  return (
    <section
      ref={ref}
      id="restaurant"
      aria-labelledby="restaurant-title"
      className="relative grid grid-cols-1 items-center gap-[clamp(24px,5vw,80px)] overflow-hidden bg-charcoal px-[max(var(--gutter),calc((100%-1240px)/2+var(--gutter)))] py-[clamp(72px,10vw,140px)] text-bone md:grid-cols-2"
    >
      <p
        aria-hidden="true"
        className="year m-0 font-display text-[clamp(6rem,19vw,17rem)] leading-[0.8] font-extrabold tracking-[-0.03em] text-transparent font-condensed [-webkit-text-stroke:2px_var(--ember)]"
      >
        2027
      </p>
      <div>
        <p className="mb-4 text-[0.95rem] font-semibold tracking-[0.08em] text-ochre">Announcing our dining room</p>
        <h2 id="restaurant-title" className="text-[clamp(2.4rem,4.6vw,4rem)] font-extrabold tracking-[-0.02em] [font-stretch:78%]">
          Sit-down dining comes to FD Grill in 2027
        </h2>
        <p className="mt-5 mb-[30px] max-w-[40ch] text-[1.15rem] text-bone-soft">
          After more than 20 years of cooking for Philadelphia, we're starting a new chapter. We already have our home
          here; now we're building a full kitchen inside it, so you can sit down and eat with us. Catering carries on as
          always while we build.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href="#quote">Get a catering quote</a>
          </Button>
          <Button asChild variant="outline">
            <a href={`tel:${PHONE}`}>Call {PHONE_DISPLAY}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
