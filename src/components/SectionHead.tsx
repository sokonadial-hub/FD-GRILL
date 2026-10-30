import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** Big condensed section title with a short note beside it (or below, when stacked) */
export function SectionHead({ id, title, children, stacked, className }: { id: string; title: string; children: ReactNode; stacked?: boolean; className?: string }) {
  return (
    <header
      className={cn(
        stacked ? "block" : "flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2.5",
        "mb-[clamp(32px,5vw,64px)]",
        className,
      )}
    >
      <h2
        id={id}
        className={cn(
          "font-extrabold tracking-[-0.025em] font-condensed",
          stacked ? "max-w-[12ch] text-[clamp(3rem,6.8vw,6rem)]" : "text-[clamp(3rem,8vw,7rem)]",
        )}
      >
        {title}
      </h2>
      <p className={cn("text-muted-foreground", stacked ? "mt-[22px] max-w-[46ch] text-[1.15rem]" : "max-w-[36ch]")}>{children}</p>
    </header>
  )
}
