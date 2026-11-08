import type { Food } from "@/data/site"

type Photo = { name: string; widths: number[]; width: number; height: number; alt: string }

export type Match = {
  key: string
  love: string
  ask: string
  answer: string
  /** Where the favorite comes from: its West African roots and the routes it traveled */
  roots: string
  description: string
  food: Food
  short: string
  photo?: Photo
  art?: { name: string; gloss: string; tone: string }
}

/** From a food America loves, back to its West African roots, then to the FD Grill dish */
export const MATCHES: Match[] = [
  {
    key: "redrice",
    love: "Jambalaya or red rice",
    ask: "Love jambalaya or Lowcountry red rice?",
    answer: "Meet its ancestor: zaamè.",
    roots:
      "Jollof rice was born in the Senegambia region of West Africa. Enslaved rice farmers from that coast brought their know-how to the Carolinas, and their one-pot tomato rice became Lowcountry red rice, a close cousin of jambalaya.",
    description: "Our Malian jollof: short-grain rice simmered in a spiced tomato and herb sauce, served with your choice of fish or meat.",
    food: "Platters",
    short: "zaamè",
    photo: { name: "zaame", widths: [640, 960, 1400], width: 1400, height: 933, alt: "A plate of red jollof rice cooked in tomato and spices" },
  },
  {
    key: "greens",
    love: "Collard greens",
    ask: "Love collard greens?",
    answer: "Meet their roots: saka-saka.",
    roots:
      "West African cooks have always stewed leafy greens low and slow with meat and seasoning. They carried that way of cooking to the American South, pot likker and all.",
    description: "Potato greens stewed low with garlic, onions, herbs, beef and palm oil, served with white rice or fonio. Cassava leaf and fakoye are close cousins.",
    food: "Stews",
    short: "greens",
    photo: { name: "stew", widths: [640, 960, 1400], width: 1400, height: 634, alt: "Leaf stew in a glass bowl beside a mound of white rice" },
  },
  {
    key: "peanut",
    love: "Peanut soup",
    ask: "Love Southern peanut soup?",
    answer: "Meet its ancestor: maafe.",
    roots:
      "Peanuts came to the American South with enslaved West Africans, who had grown and stewed them for generations. Even the word goober comes from nguba, the Kikongo word for peanut.",
    description: "Groundnut stew with beef, slow-cooked in a peanut-tomato sauce and served with white rice or fonio.",
    food: "Stews",
    short: "maafe",
    photo: { name: "maafe", widths: [640, 960, 1400], width: 1400, height: 934, alt: "Maafe peanut stew with beef beside white rice on a woven mat" },
  },
  {
    key: "reddrink",
    love: "Red drink or sorrel",
    ask: "Love red drink, sorrel or agua de jamaica?",
    answer: "Meet the original: bissap.",
    roots:
      "Hibiscus is African. It crossed the Atlantic with enslaved West Africans and became sorrel in Jamaica, agua de jamaica in Mexico and the red drink on every Juneteenth table.",
    description: "Hibiscus juice, deep red, sweet and tart, served cold. Add ginger juice if you like a kick.",
    food: "Juices",
    short: "bissap",
    photo: { name: "bissap", widths: [640, 960, 1400], width: 1400, height: 933, alt: "A tall glass of iced hibiscus juice surrounded by fresh hibiscus calyces" },
  },
  {
    key: "cookout",
    love: "A backyard cookout",
    ask: "Love a backyard cookout?",
    answer: "Start with kabobs.",
    roots:
      "Enslaved Africans and their descendants worked the pits that built Southern barbecue. Back home, West Africa still grills over open coals: dibi in Senegal, brochettes in Mali, suya in Nigeria.",
    description: "Beef, chicken or mushroom, marinated in house spices and charred over live charcoal.",
    food: "Kabobs",
    short: "kabobs",
    photo: { name: "chicken-kabobs", widths: [640, 960], width: 960, height: 683, alt: "Charcoal-grilled chicken kabobs with peppers and onions, fries and fresh tomato" },
  },
  {
    key: "patties",
    love: "Beef patties or empanadas",
    ask: "Love beef patties or empanadas?",
    answer: "Try patté.",
    roots:
      "Hand pies traveled the Atlantic world in every direction. On the West African coast, cooks made the pastry their own with spiced meat and boiled egg, while the Caribbean turned it into the beef patty.",
    description: "Flaky pastry filled with spiced ground beef or chicken, boiled egg and herbs. Easy to pass around at any party.",
    food: "Patté",
    short: "patté",
    photo: { name: "patte-beef", widths: [640, 1000], width: 1000, height: 826, alt: "Golden patté filled with spiced beef and boiled egg" },
  },
  {
    key: "eggrolls",
    love: "Egg rolls",
    ask: "Love egg rolls?",
    answer: "Try nem.",
    roots:
      "Nem came to Senegal in the 1950s with the Vietnamese wives of Senegalese soldiers returning from Indochina. It became a West African party staple, a reminder that our food has always traveled.",
    description: "Crispy spring rolls with glass noodles, mushrooms and beef or chicken, with sweet chili sauce and house salad.",
    food: "Nem",
    short: "nem",
    photo: { name: "nem", widths: [640, 960, 1150], width: 1150, height: 854, alt: "Crispy nem spring rolls, one cut open to show seasoned beef" },
  },
]
