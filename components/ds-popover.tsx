// Design System Popover - Reusable popover component using design system
"use client"

import type React from "react"

import { forwardRef, useState, useRef, useEffect } from "react"
import { componentStyles } from "@/lib/component-styles"
import { cn } from "@/lib/utils"

interface DSPopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export const DSPopover = forwardRef<HTMLDivElement, DSPopoverProps>(
  ({ trigger, children, side = "bottom", align = "start" }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const triggerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(event.target as Node) &&
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isOpen])

    return (
      <div className="relative inline-block">
        <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
          {trigger}
        </div>
        {isOpen && (
          <div
            ref={ref || contentRef}
            className={cn(
              componentStyles.popover.content,
              "absolute z-50",
              side === "bottom" && "top-full mt-2",
              side === "top" && "bottom-full mb-2",
              side === "right" && "left-full ml-2",
              side === "left" && "right-full mr-2",
              align === "start" && "left-0",
              align === "center" && "left-1/2 -translate-x-1/2",
              align === "end" && "right-0",
            )}
          >
            {children}
          </div>
        )}
      </div>
    )
  },
)

DSPopover.displayName = "DSPopover"
