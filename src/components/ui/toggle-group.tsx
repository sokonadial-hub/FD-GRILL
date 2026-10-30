import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex cursor-pointer items-center rounded-full font-semibold transition-[background-color,color,border-color,transform] duration-200 ease-out focus-visible:outline-3 focus-visible:outline-offset-3",
  {
    variants: {
      variant: {
        // Ink chips on the light "start here" band; the picked one tilts
        ink: "min-h-11 border-2 border-charcoal px-[15px] text-[0.98rem] hover:bg-accent focus-visible:outline-ember-deep data-[state=on]:-rotate-2 data-[state=on]:bg-charcoal data-[state=on]:text-bone md:min-h-[46px] md:px-[18px] md:text-[1.0625rem]",
        // Light chips on the dark quote form; picked ones turn ember with a tick
        ember:
          "border-[1.5px] border-input px-[15px] py-[9px] font-medium text-bone hover:border-bone/70 focus-visible:outline-ember active:scale-[0.96] data-[state=on]:border-ember data-[state=on]:bg-ember data-[state=on]:text-charcoal data-[state=on]:before:content-['✓_']",
      },
    },
    defaultVariants: { variant: "ink" },
  },
)

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({ variant: "ink" })

function ToggleGroup({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn("flex flex-wrap", className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(toggleVariants({ variant: context.variant || variant }), className)}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem, toggleVariants }
