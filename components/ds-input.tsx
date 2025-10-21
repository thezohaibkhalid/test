import type React from "react"
// Design System Input - Reusable input component using design system
import { forwardRef } from "react"
import { componentStyles } from "@/lib/component-styles"
import { cn } from "@/lib/utils"

interface DSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: "sm" | "md" | "lg"
  error?: string
  hint?: string
  label?: string
  icon?: React.ReactNode
}

export const DSInput = forwardRef<HTMLInputElement, DSInputProps>(
  ({ className, size = "md", error, hint, label, icon, ...props }, ref) => {
    return (
      <div className={componentStyles.form.group}>
        {label && <label className={componentStyles.form.label}>{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}
          <input
            ref={ref}
            className={cn(
              componentStyles.input.base,
              componentStyles.input.sizes[size],
              icon && "pl-10",
              error && "border-danger focus-visible:ring-danger",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className={componentStyles.form.error}>{error}</p>}
        {hint && !error && <p className={componentStyles.form.hint}>{hint}</p>}
      </div>
    )
  },
)

DSInput.displayName = "DSInput"
