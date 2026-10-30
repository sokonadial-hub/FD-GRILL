import { Photo } from "@/components/Photo"
import { SectionHead } from "@/components/SectionHead"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

type Dish = {
  title: string
  copy: string
  photo: { name: string; widths: number[]; width: number; height: number; alt: string; sizes: string }
  feature?: boolean
}

const DISHES: Dish[] = [
  {
    title: "Kabobs",
    copy: "Beef, chicken or mushroom, marinated in house spices, then charred over live charcoal until the edges crisp. Built for a crowd.",
    feature: true,
    photo: { name: "chicken-kabobs", widths: [640, 960], width: 960, height: 683, sizes: "(max-width: 860px) 92vw, 58vw", alt: "Charcoal-grilled chicken kabobs with peppers and onions, fries and fresh tomato on a yellow plate" },
  },
  {
    title: "Leaf stews",
    copy: "Cassava leaf, saka-saka or fakoye, slow-cooked with meat and served with white rice or fonio.",
    photo: { name: "stew", widths: [640, 960, 1400], width: 1400, height: 634, sizes: "(max-width: 860px) 40vw, 46vw", alt: "Leaf stew in a glass bowl beside a mound of white rice and a scotch bonnet pepper" },
  },
  {
    title: "Nem",
    copy: "Crispy West African spring rolls with glass noodles, mushrooms and beef or chicken. With sweet chili sauce and house salad.",
    photo: { name: "nem", widths: [640, 960, 1150], width: 1150, height: 854, sizes: "(max-width: 860px) 40vw, 46vw", alt: "Crispy nem spring rolls, one cut open to show seasoned beef, with house salad" },
  },
]

function DishCard({ dish }: { dish: Dish }) {
  const ref = useReveal<HTMLElement>()
  const { feature } = dish
  return (
    <article
      ref={ref}
      className={cn(
        feature
          ? "md:col-span-full md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end md:gap-[clamp(24px,5vw,72px)]"
          : "grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center gap-4 md:block",
      )}
    >
      <figure
        className={cn(
          "reveal m-0 overflow-hidden rounded-md",
          feature ? "aspect-[4/3] md:aspect-auto" : "aspect-square md:aspect-[16/10]",
        )}
      >
        <Photo {...dish.photo} className={cn("w-full", feature ? "h-full object-cover md:h-auto" : "h-full object-cover")} />
      </figure>
      <div className={feature ? "pt-[18px] md:pt-0 md:pb-2" : "md:pt-[22px]"}>
        <h3
          className={cn(
            "font-extrabold tracking-[-0.02em] font-condensed",
            feature ? "text-[2.6rem] md:text-[clamp(3rem,6.5vw,5.5rem)]" : "text-[1.9rem] md:text-[clamp(2.2rem,3.6vw,3.2rem)]",
          )}
        >
          {dish.title}
        </h3>
        <p
          className={cn(
            "text-muted-foreground",
            feature
              ? "mt-2 text-base md:mt-[18px] md:max-w-[38ch] md:text-[1.1rem]"
              : "mt-1.5 text-[0.95rem] leading-normal md:mt-3 md:max-w-[42ch] md:text-[1.05rem] md:leading-[1.55]",
          )}
        >
          {dish.copy}
        </p>
      </div>
    </article>
  )
}

export function Signatures() {
  return (
    <section id="signatures" aria-labelledby="sig-title" className="mx-auto max-w-site px-gutter pt-[clamp(64px,9vw,128px)] pb-[clamp(32px,5vw,64px)]">
      <SectionHead id="sig-title" title="Off the fire">
        Not sure where to begin? These three are where we'd start your menu.
      </SectionHead>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-x-[clamp(24px,4vw,56px)] md:gap-y-[clamp(48px,6vw,88px)]">
        {DISHES.map((dish) => (
          <DishCard key={dish.title} dish={dish} />
        ))}
      </div>
    </section>
  )
}
