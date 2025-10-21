import type React from "react"
// Design System Badge - Reusable badge component using design system
import { forwardRef } from "react"
import { componentStyles } from "@/lib/component-styles"
import { cn } from "@/lib/utils"

interface DSBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

export const DSBadge = forwardRef<HTMLDivElement, DSBadgeProps>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(componentStyles.badge.base, componentStyles.badge.variants[variant], className)}
    {...props}
  />
))

DSBadge.displayName = "DSBadge"
