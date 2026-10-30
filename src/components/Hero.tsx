import { Button } from "@/components/ui/button"
import { Photo } from "@/components/Photo"

const FACTS = [
  ["Cooking for", "20+ years"],
  ["Catering", "Booking now"],
  ["Dining room", "Opening 2027"],
] as const

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-x-[clamp(28px,5vw,80px)] gap-y-[clamp(28px,4vw,64px)] overflow-hidden bg-charcoal px-gutter pt-5 pb-[clamp(28px,4vw,48px)] text-bone [grid-template-areas:'media'_'copy'_'facts'] md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:pt-[clamp(36px,6vw,88px)] md:[grid-template-areas:'copy_media'_'facts_facts']"
    >
      <div className="max-w-full [grid-area:copy]">
        <h1 id="hero-title" className="text-[13vw] leading-[0.9] font-extrabold tracking-[-0.025em] font-condensed xs:text-[clamp(3rem,7.2vw,6.6rem)]">
          <span className="hero-line block overflow-hidden pb-[0.06em]">
            <span className="block">The home of</span>
          </span>
          <span className="hero-line block overflow-hidden pb-[0.06em]">
            <span className="block text-ember">the African grill.</span>
          </span>
        </h1>
        <p className="hero-fade mt-[26px] mb-[34px] max-w-[40ch] text-[1.15rem] text-bone-soft [.loaded_&]:delay-[350ms]">
          Live fire, charcoal smoke and family recipes. For more than 20 years we've grilled kabobs, lamb and steak over
          the coals and simmered Malian stews from whole, natural ingredients. Now we cater them across Philadelphia, for
          events big and small.
        </p>
        <div className="hero-fade flex flex-wrap gap-3 [.loaded_&]:delay-[450ms]">
          <Button asChild>
            <a href="#quote">Get a catering quote</a>
          </Button>
          <Button asChild variant="outline">
            <a href="#start">Find your first dish</a>
          </Button>
        </div>
      </div>

      <figure className="hero-media relative m-0 -mx-gutter aspect-[1600/867] w-[calc(100%+var(--gutter)*2)] max-w-none overflow-hidden [grid-area:media] md:mx-0 md:w-auto md:max-w-full md:rounded-md">
        <Photo
          name="beef-kabobs"
          widths={[640, 960, 1280, 1600]}
          sizes="(max-width: 860px) 100vw, 55vw"
          alt="Two charcoal-grilled beef kabobs with onions and bell peppers on a white plate, garnished with tomato, cucumber and parsley"
          width={1600}
          height={867}
          fallback={1600}
          priority
          className="size-full object-cover"
        />
      </figure>

      <dl className="hero-fade m-0 grid max-w-full grid-cols-[repeat(3,minmax(0,1fr))] justify-between gap-x-4 gap-y-3 border-t border-bone/14 pt-[clamp(20px,3vw,32px)] [grid-area:facts] xs:grid-cols-[repeat(3,auto)] md:justify-start md:gap-x-[clamp(28px,5vw,72px)] [.loaded_&]:delay-700">
        {FACTS.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[0.85rem] text-bone-soft">{label}</dt>
            <dd className="m-0 mt-0.5 font-bold xs:whitespace-nowrap">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
