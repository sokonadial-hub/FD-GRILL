import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

/** The mustard-and-indigo table cloth stripe; it weaves in once on scroll */
export function Cloth({ thin }: { thin?: boolean }) {
  const ref = useReveal<HTMLDivElement>("woven")
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "cloth relative flex flex-col justify-center overflow-hidden bg-ochre",
        thin ? "h-10 [&>span:nth-child(n+4)]:hidden" : "h-16",
        "[&>span]:relative [&>span]:block [&>span]:h-1 [&>span]:origin-left [&>span]:bg-[#fbf6ea]",
        "[&>span:nth-child(2)]:h-[9px] [&>span:nth-child(2)]:bg-indigo",
        "[&>span:nth-child(4)]:mt-2.5 [&>span:nth-child(4)]:h-[5px] [&>span:nth-child(4)]:bg-indigo [&>span:nth-child(4)]:opacity-90",
        "[&>span:nth-child(5)]:h-0.5 [&>span:nth-child(5)]:opacity-90",
      )}
    >
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  )
}
