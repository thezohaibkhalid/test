import type React from "react"
// Design System Card - Reusable card component using design system
import { forwardRef } from "react"
import { componentStyles } from "@/lib/component-styles"
import { cn } from "@/lib/utils"

interface DSCardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg"
}

export const DSCard = forwardRef<HTMLDivElement, DSCardProps>(({ className, padding = "md", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(componentStyles.card.base, componentStyles.card.padding[padding], className)}
    {...props}
  />
))

DSCard.displayName = "DSCard"
