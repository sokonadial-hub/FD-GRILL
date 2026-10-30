import { useEffect, useState } from "react"

import { Cloth } from "@/components/Cloth"
import { asset } from "@/components/Photo"
import { ADDRESS, EMAIL, MAPS_URL, PHONE, PHONE_DISPLAY } from "@/data/site"

export function Footer() {
  const [year, setYear] = useState(2026)
  useEffect(() => setYear(new Date().getFullYear()), [])
  return (
    <footer className="bg-charcoal pb-[calc(84px+env(safe-area-inset-bottom))] text-bone-soft md:pb-0 [&_a]:text-bone">
      <Cloth thin />
      <div className="px-gutter pt-10 pb-9 text-center [&_p]:my-1">
        <picture>
          <source srcSet={asset("img/logo.webp")} type="image/webp" />
          <img src={asset("img/logo.png")} alt="FD Grill logo" width={64} height={64} loading="lazy" className="mx-auto mb-3.5 size-16 rounded-full" />
        </picture>
        <p className="mb-2.5! font-display text-2xl font-bold text-bone font-semi-narrow">Home of the African grill.</p>
        <p>From our family's table to yours.</p>
        <p>Family-run West African grill and catering</p>
        <p><a href={MAPS_URL}>{ADDRESS}</a></p>
        <p><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></p>
        <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
        <p className="mt-3.5! text-[0.9rem] text-[#8d8473]">© {year} FD Grill</p>
      </div>
    </footer>
  )
}
