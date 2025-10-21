import type React from "react"
// Design System Button - Reusable button component using design system
import { forwardRef } from "react"
import { componentStyles } from "@/lib/component-styles"
import { cn } from "@/lib/utils"

interface DSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  icon?: React.ReactNode
}

export const DSButton = forwardRef<HTMLButtonElement, DSButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, icon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          componentStyles.button.base,
          componentStyles.button.sizes[size],
          componentStyles.button.variants[variant],
          className,
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {icon && !isLoading && <span className="mr-2">{icon}</span>}
        {children}
      </button>
    )
  },
)

DSButton.displayName = "DSButton"
