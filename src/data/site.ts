export const PHONE = "+16102569268"
export const PHONE_DISPLAY = "(610) 256-9268"
export const EMAIL = "fdgrillllc@gmail.com"
export const ADDRESS = "6732 Elmwood Ave, Philadelphia, PA"
export const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=6732+Elmwood+Ave+Philadelphia+PA"

/** Dishes guests can tick on the quote form */
export const FOODS = ["Kabobs", "Grilled lamb", "Steak", "Lamb gigot", "Patté", "Nem", "Platters", "Stews", "Juices"] as const
export type Food = (typeof FOODS)[number]
