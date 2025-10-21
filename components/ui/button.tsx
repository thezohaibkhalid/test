import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg",
    "text-sm font-medium",
    "bg-background text-foreground",
    "border border-border",
    "transition-[background-color,border-color,box-shadow,transform] duration-150",
    "active:scale-[0.99]",
    "hover:bg-muted/60 hover:border-foreground/30",
    "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "data-[state=open]:border-foreground/40 data-[state=open]:bg-muted/70 data-[state=open]:ring-2 data-[state=open]:ring-ring/30",
    "aria-pressed:border-foreground/40",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "shadow-sm hover:shadow"
  ].join(" "),
  {
    variants: {
      variant: {
        neutral: " ",
        outline: "bg-transparent",
        subtle: "bg-muted",
        ghost: "bg-transparent border-transparent hover:bg-muted/50",
        link: "bg-transparent border-transparent underline-offset-4 hover:underline hover:shadow-none",
        destructive: "bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/90",
        secondary:" border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3 text-[13px]",
        lg: "h-11 px-5",
        icon: "h-10 w-10 [&_svg]:!size-5",
        iconL: "h-16 w-16 [&_svg]:!size-8 md:[&_svg]:!size-9"
      }
    },
    defaultVariants: {
      variant: "neutral",
      size: "default"
    },
 
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
