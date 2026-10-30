import * as React from "react"

import { cn } from "@/lib/utils"
import { fieldClasses } from "@/components/ui/input"

// A styled native <select>: the phone's own picker is the best one on mobile
function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return <select data-slot="native-select" className={cn(fieldClasses, className)} {...props} />
}

export { NativeSelect }
