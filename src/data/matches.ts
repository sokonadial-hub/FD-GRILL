import type { Food } from "@/data/site"

type Photo = { name: string; widths: number[]; width: number; height: number; alt: string }

export type Match = {
  key: string
  love: string
  ask: string
  answer: string
  description: string
  food: Food
  short: string
  photo?: Photo
  art?: { name: string; gloss: string; tone: string }
}

/** From food you already love to your first FD Grill dish */
export const MATCHES: Match[] = [
  {
    key: "cookout",
    love: "A backyard cookout",
    ask: "Love a backyard cookout?",
    answer: "Start with kabobs.",
    description: "Beef, chicken or mushroom, marinated in house spices and charred over live charcoal. The smoke and char you know, with new spices.",
    food: "Kabobs",
    short: "kabobs",
    photo: { name: "chicken-kabobs", widths: [640, 960], width: 960, height: 683, alt: "Charcoal-grilled chicken kabobs with peppers and onions, fries and fresh tomato" },
  },
  {
    key: "greens",
    love: "Collard greens",
    ask: "Love collard greens?",
    answer: "Try saka-saka.",
    description: "Potato greens stewed low with garlic, onions, herbs, beef and palm oil, served with white rice or fonio. Cassava leaf and fakoye are close cousins.",
    food: "Stews",
    short: "greens",
    photo: { name: "stew", widths: [640, 960, 1400], width: 1400, height: 634, alt: "Leaf stew in a glass bowl beside a mound of white rice" },
  },
  {
    key: "eggrolls",
    love: "Egg rolls",
    ask: "Love egg rolls?",
    answer: "Try nem.",
    description: "Crispy spring rolls with glass noodles, mushrooms and beef or chicken, with sweet chili sauce and house salad.",
    food: "Nem",
    short: "nem",
    photo: { name: "nem", widths: [640, 960, 1150], width: 1150, height: 854, alt: "Crispy nem spring rolls, one cut open to show seasoned beef" },
  },
  {
    key: "patties",
    love: "Empanadas or beef patties",
    ask: "Love empanadas or beef patties?",
    answer: "Try patté.",
    description: "Flaky pastry filled with spiced ground beef or chicken, boiled egg and herbs. Easy to pass around at any party.",
    food: "Patté",
    short: "patté",
    photo: { name: "patte-beef", widths: [640, 1000], width: 1000, height: 826, alt: "Golden patté filled with spiced beef and boiled egg" },
  },
  {
    key: "redrice",
    love: "Jambalaya or Spanish rice",
    ask: "Love jambalaya or Spanish rice?",
    answer: "Try zaamè.",
    description: "Malian jollof: short-grain rice simmered in a spiced tomato and herb sauce, served with your choice of fish or meat.",
    food: "Platters",
    short: "zaamè",
    art: { name: "Zaamè", gloss: "Malian jollof rice", tone: "bg-ember-deep" },
  },
  {
    key: "peanut",
    love: "Peanut butter",
    ask: "Love peanut butter?",
    answer: "Try maafe.",
    description: "Groundnut stew with beef, slow-cooked in a peanut-tomato sauce and served with white rice or fonio. Rich, savory and nothing like a sandwich.",
    food: "Stews",
    short: "maafe",
    art: { name: "Maafe", gloss: "Peanut stew", tone: "bg-[#7a5a12]" },
  },
  {
    key: "reddrink",
    love: "Agua de jamaica or red drink",
    ask: "Love agua de jamaica or red drink?",
    answer: "Try bissap.",
    description: "Hibiscus juice, from the same flower as agua de jamaica: deep red, sweet and tart, and cold. Add ginger juice if you like a kick.",
    food: "Juices",
    short: "bissap",
    art: { name: "Bissap", gloss: "Hibiscus juice", tone: "bg-[#8c1c2e]" },
  },
]
