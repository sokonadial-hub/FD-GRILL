import * as React from "react"

import { cn } from "@/lib/utils"

// Shared look for every field in the dark quote form
const fieldClasses =
  "w-full min-h-12 rounded-lg border-[1.5px] border-input bg-charcoal px-3.5 py-[11px] text-base text-bone [color-scheme:dark] transition-[border-color,box-shadow] duration-200 placeholder:text-[#8f8677] focus:border-ember focus:shadow-[0_0_0_3px_rgba(232,120,42,0.25)] focus:outline-none aria-invalid:border-[#f08a6a]"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldClasses, className)} {...props} />
}

export { Input, fieldClasses }
