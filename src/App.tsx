import { useState } from "react"

import { Catering } from "@/components/Catering"
import { Cloth } from "@/components/Cloth"
import { Dock } from "@/components/Dock"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Menu } from "@/components/Menu"
import { Restaurant } from "@/components/Restaurant"
import { Signatures } from "@/components/Signatures"
import { StartHere } from "@/components/StartHere"
import { Story } from "@/components/Story"
import { Ticker } from "@/components/Ticker"
import type { Food } from "@/data/site"

export function App() {
  // Dishes ticked on the quote form; the start-here matches can add to it
  const [foods, setFoods] = useState<string[]>([])
  const addFood = (food: Food) => setFoods((prev) => (prev.includes(food) ? prev : [...prev, food]))

  return (
    <>
      <a
        href="#catering"
        className="absolute top-2 -left-[999px] z-[100] bg-ember px-4 py-2.5 font-bold text-charcoal focus:left-2"
      >
        Skip to catering
      </a>
      <Ticker />
      <Header />
      <main id="top">
        <Hero />
        <Cloth />
        <StartHere onAddFood={addFood} />
        <Story />
        <Signatures />
        <Catering foods={foods} onFoodsChange={setFoods} />
        <Menu />
        <Restaurant />
      </main>
      <Footer />
      <Dock />
    </>
  )
}
