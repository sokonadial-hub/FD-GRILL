export type MenuItem = { name: string; gloss?: string; description?: string }
export type MenuSection = { id: string; tab?: string; title: string; note?: string; compact?: boolean; items: MenuItem[] }

export const MENU: MenuSection[] = [
  {
    id: "grill",
    tab: "Grill",
    title: "Over the coals",
    note: "Marinated in house spices and cooked over live charcoal until the smoke sets in.",
    items: [
      { name: "Kabob", description: "One charcoal-grilled skewer of beef, chicken or mushroom, marinated in house spices." },
      { name: "Kabob combo", description: "Charcoal-grilled skewers of beef, chicken or mushroom, with one side." },
      { name: "Grilled lamb", description: "Lamb marinated in house spices, charred over the coals and rested until juicy." },
      { name: "Steak", description: "Steak in our house seasoning, seared hard over live charcoal." },
      { name: "Lamb gigot", description: "Tender leg of lamb, double cooked in our signature seasoning. With one side and onion-mustard sauce." },
    ],
  },
  {
    id: "handhelds",
    tab: "Handhelds",
    title: "Handhelds & street bites",
    note: "Easy to pass around at parties and gatherings.",
    items: [
      { name: "Shawarma sandwich", description: "Seasoned grilled meat wrapped in warm pita with house sauce, lettuce, tomatoes and onions." },
      { name: "Patté", gloss: "West African hand pies", description: "Flaky pastry filled with spiced ground beef or chicken, boiled egg and herbs." },
      { name: "Nem", gloss: "West African spring rolls", description: "Five crispy rolls with glass noodles, mushrooms and beef or chicken. With sweet chili sauce and house salad." },
    ],
  },
  {
    id: "platters",
    tab: "Platters",
    title: "Platters for the table",
    note: "Malian classics, each served with your choice of protein.",
    items: [
      { name: "Djouka", gloss: "Malian peanut couscous", description: "Fonio steamed with roasted ground peanuts, with a savory onion sauce and your choice of fried tilapia or a flame-grilled kabob." },
      { name: "Vermicelli", gloss: "caramelized onion pasta", description: "Tender pasta in a rich caramelized onion sauce, slow-simmered and served with your choice of protein." },
      { name: "Zaamè", gloss: "Malian jollof rice", description: "Short-grain rice simmered in a spiced tomato and herb sauce, served with your choice of fish or meat." },
    ],
  },
  {
    id: "stews",
    tab: "Stews",
    title: "West African stews",
    note: "Every stew comes with white rice or fonio.",
    items: [
      { name: "Maafe", gloss: "peanut stew", description: "Groundnut stew with beef, slow-cooked in peanut-tomato sauce." },
      { name: "Peanut stew with potato greens", description: "Groundnut and potato green stew with meat in peanut-tomato sauce." },
      { name: "Cassava leaf stew", description: "Ground cassava leaves cooked with smoked turkey and beef in an aromatic sauce." },
      { name: "Saka-saka", gloss: "potato greens", description: "Stewed potato greens with garlic, onions, herbs, beef and palm oil." },
      { name: "Red onion stew", description: "Onions and tomatoes low-cooked with vegetables, with smoked chicken." },
      { name: "Yassa", description: "Smoked chicken braised in onion, lemon and mustard sauce." },
      { name: "Fakoye", description: "Jute leaf stew with lamb or beef, seasoned with West African spices." },
    ],
  },
  {
    id: "sides",
    tab: "Sides & drinks",
    title: "Sides",
    compact: true,
    items: [{ name: "Sweet plantains" }, { name: "French fries" }, { name: "House salad" }],
  },
  {
    id: "drinks",
    title: "Drinks",
    compact: true,
    items: [{ name: "Ginger juice" }, { name: "Bissap", gloss: "hibiscus juice" }, { name: "Baobab kefir" }, { name: "Dégué" }],
  },
]
