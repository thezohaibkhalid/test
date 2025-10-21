"use client"

import type React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
}

interface ReusableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  subTitle?: string
  onSubmit: () => void
  onCancel: () => void
  submitLabel?: string
  cancelLabel?: string
  loading?: boolean
  children?: React.ReactNode
  size?: keyof typeof sizeClasses
  scrollable?: boolean
  preventClose?: boolean
  disabled?: boolean
}

export const ReusableDialog: React.FC<ReusableDialogProps> = ({
  open,
  onOpenChange,
  title,
  subTitle,
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  loading = false,
  children,
  size = "md",
  scrollable = false,
  preventClose = false,
  disabled = false,
  
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
          )}
        />
        <DialogPrimitive.Content
          onPointerDownOutside={preventClose ? (e) => e.preventDefault() : undefined}
          onEscapeKeyDown={preventClose ? (e) => e.preventDefault() : undefined}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-xl duration-200 rounded-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            sizeClasses[size],
            scrollable && "max-h-[90vh] overflow-hidden",
          )}
        >
          {scrollable ? (
            <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
              <div className="space-y-4">
                <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight">
                  {title}
                </DialogPrimitive.Title>
                {subTitle && (
                  <DialogPrimitive.Description className="text-sm text-muted-foreground">
                    {subTitle}
                  </DialogPrimitive.Description>
                )}
                <div className="pt-4">{children}</div>
              </div>
            </ScrollArea>
          ) : (
            <div className="space-y-4">
              <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </DialogPrimitive.Title>
              {subTitle && (
                <DialogPrimitive.Description className="text-sm text-muted-foreground">
                  {subTitle}
                </DialogPrimitive.Description>
              )}
              <div className="pt-4">{children}</div>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            <Button variant="outline" type="button" onClick={onCancel} >
              {cancelLabel}
            </Button>
            <Button type="button" onClick={onSubmit} disabled={disabled}>
              {loading ? "Saving..." : submitLabel}
            </Button>
          </div>

          {!preventClose && (
            <DialogPrimitive.Close
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}