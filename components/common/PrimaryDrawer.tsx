"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

type DrawerSize = "sm" | "md" | "lg" | "xl" | "2xl" | number | string
type DrawerSide = "right" | "left"

const sizeToClass: Record<Exclude<DrawerSize, number | string>, string> = {
  sm:  "max-w-sm",   
  md:  "max-w-md",    
  lg:  "max-w-lg",    
  xl:  "max-w-xl",   
  "2xl":"max-w-2xl",  
}

export interface PrimaryDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: DrawerSize
  side?: DrawerSide
  showClose?: boolean
  withScroll?: boolean
  stickyHeader?: boolean
  stickyFooter?: boolean
   className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

export function PrimaryDrawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "2xl",
  side = "right",
  showClose = true,
  withScroll = true,
  stickyHeader = true,
  stickyFooter = true,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
}: PrimaryDrawerProps) {
  const widthClass =
    typeof size === "string"
      ? sizeToClass[size as keyof typeof sizeToClass] ?? "max-w-2xl"
      : undefined
  const inlineWidth =
    typeof size === "number"
      ? { width: `${size}px` }
      : typeof size === "string" && !(size in sizeToClass)
      ? { width: size }
      : undefined

  const sideTransforms =
    side === "left"
      ? {
          open: "data-[state=open]:slide-in-from-left",
          closed: "data-[state=closed]:slide-out-to-left",
          position: "left-0",
          rounded: "rounded-r-2xl",
        }
      : {
          open: "data-[state=open]:slide-in-from-right",
          closed: "data-[state=closed]:slide-out-to-right",
          position: "right-0",
          rounded: "rounded-l-2xl",
        }

  const ContentWrapper = withScroll ? ScrollArea : React.Fragment
  const contentWrapperProps = withScroll ? { className: "h-full w-full" } : {}

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
        )} />

        <DialogPrimitive.Content
          className={cn(
            "fixed top-0 z-50 h-full w-full bg-background shadow-xl duration-200 overflow-y-auto",
            widthClass,
            sideTransforms.position,
            sideTransforms.rounded,
            sideTransforms.open,
            sideTransforms.closed,
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            className
          )}
          style={inlineWidth}
        >
          <div
            className={cn(
              "flex items-start justify-between p-6 gap-3 border-b border-border/60",
              stickyHeader && "sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
              headerClassName
            )}
          >
            <div className="min-w-0">
              {title && <h2 className="text-xl font-semibold text-foreground truncate">{title}</h2>}
              {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
            </div>

            {showClose && (
              <DialogPrimitive.Close
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-foreground/70 hover:text-foreground hover:bg-muted/40 transition"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </DialogPrimitive.Close>
            )}
          </div>

          <ContentWrapper {...contentWrapperProps as any}>
            <div className={cn("p-6 space-y-6", bodyClassName)}>{children}</div>
          </ContentWrapper>

          {footer && (
            <div
              className={cn(
                "p-4 border-t border-border/60",
                stickyFooter && "sticky bottom-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                footerClassName
              )}
            >
              <div className="flex items-center justify-end gap-2">{footer}</div>
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/** Optional helper: a basic Close button you can reuse in footers */
export function DrawerCloseButton({ children = "Close" }: { children?: React.ReactNode }) {
  return (
    <DialogPrimitive.Close asChild>
      <Button variant="outline">{children}</Button>
    </DialogPrimitive.Close>
  )
}
