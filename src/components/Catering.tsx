import { Photo } from "@/components/Photo"
import { QuoteForm } from "@/components/QuoteForm"
import { SectionHead } from "@/components/SectionHead"
import { EMAIL, PHONE, PHONE_DISPLAY } from "@/data/site"
import { useReveal } from "@/hooks/use-reveal"

const OCCASIONS = [
  "Birthdays and family parties",
  "Family reunions and cookouts",
  "Weddings and celebrations",
  "Graduations and showers",
  "Office lunches and meetings",
  "Church and community events",
]

const STEPS = [
  ["Tell us about your event.", "Date, number of guests, where it is and what you'd like to serve."],
  ["Get a menu and quote.", "We'll email, text or call you back to plan the food and confirm the price."],
  ["We cook for your day.", "Everything is grilled and simmered fresh for your event."],
] as const

export function Catering({ foods, onFoodsChange }: { foods: string[]; onFoodsChange: (foods: string[]) => void }) {
  const mediaRef = useReveal<HTMLDivElement>()
  return (
    <section
      id="catering"
      aria-labelledby="catering-title"
      className="mx-auto grid max-w-site grid-cols-1 items-center gap-x-[clamp(32px,6vw,96px)] gap-y-[clamp(32px,5vw,72px)] px-gutter pt-[clamp(64px,9vw,128px)] pb-[clamp(48px,7vw,96px)] [grid-template-areas:'intro'_'media'_'booking'] md:grid-cols-2 md:[grid-template-areas:'intro_media'_'booking_booking']"
    >
      <div className="[grid-area:intro]">
        <SectionHead id="catering-title" title="Let us cook for your people" stacked className="mb-8">
          Feed your guests the way we feed family: kabobs and lamb straight from the coals, flaky patté, slow-simmered
          peanut and leaf stews, fresh bissap and ginger juice. Tell us about your event, big or small, and we'll build a
          menu around it.
        </SectionHead>
        <ul aria-label="Events we cater" className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-2.5 p-0 sm:grid-cols-[repeat(2,minmax(0,max-content))]">
          {OCCASIONS.map((o) => (
            // small square of cloth ochre: a list marker, not a button
            <li key={o} className="relative pl-5 font-medium before:absolute before:top-[0.55em] before:left-0 before:size-2 before:bg-ochre">
              {o}
            </li>
          ))}
        </ul>
      </div>

      <div ref={mediaRef} className="relative pb-[22%] [grid-area:media]">
        <figure className="reveal m-0 ml-auto w-[88%] overflow-hidden rounded-md">
          <Photo
            name="grill-basting"
            widths={[659]}
            sizes="(max-width: 860px) 100vw, 44vw"
            alt="Cooks basting and turning meat on a large outdoor grill"
            width={659}
            height={465}
            className="w-full"
          />
        </figure>
        <figure className="reveal absolute bottom-0 left-0 m-0 w-[54%] overflow-hidden rounded-[10px] border-[6px] border-white">
          <Photo
            name="grill-overhead"
            widths={[700]}
            sizes="(max-width: 860px) 54vw, 26vw"
            alt="Overhead view of a charcoal grill loaded with chicken skewers and sausages"
            width={700}
            height={420}
            className="w-full"
          />
        </figure>
      </div>

      <div
        id="quote"
        className="-mx-gutter grid scroll-mt-20 grid-cols-1 gap-[clamp(32px,5vw,80px)] bg-charcoal p-[clamp(28px,5vw,64px)] text-bone [grid-area:booking] md:mx-0 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:rounded-[10px]"
      >
        <div>
          <h3 className="mb-6 text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold font-narrow">How booking works</h3>
          <ol className="m-0 list-none p-0">
            {STEPS.map(([title, text], i) => (
              <li key={title} className="relative pb-[26px] pl-[58px] text-bone-soft">
                <span aria-hidden="true" className="absolute -top-1.5 left-0 font-display text-[2.6rem] leading-none font-extrabold text-ember font-condensed">
                  {i + 1}
                </span>
                <strong className="mb-1 block text-[1.1rem] text-bone">{title}</strong> {text}
              </li>
            ))}
          </ol>
          <p className="mt-2 text-bone-soft">
            Rather talk it through? <a href={`tel:${PHONE}`} className="font-bold text-bone">Call {PHONE_DISPLAY}</a>
          </p>
          <p className="mt-2 text-bone-soft">
            Or email <a href={`mailto:${EMAIL}`} className="font-bold text-bone">{EMAIL}</a>
          </p>
        </div>
        <QuoteForm foods={foods} onFoodsChange={onFoodsChange} />
      </div>
    </section>
  )
}
