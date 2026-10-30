import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border-[1.5px] border-transparent px-6 font-bold whitespace-nowrap no-underline transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.97] disabled:cursor-progress disabled:opacity-70 max-sm:flex-auto",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#f38a3f]",
        dark: "bg-charcoal text-bone hover:bg-black",
        outline: "border-current hover:border-bone hover:bg-bone hover:text-charcoal",
      },
      size: {
        default: "",
        block: "mt-1.5 w-full cursor-pointer text-[1.05rem]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
