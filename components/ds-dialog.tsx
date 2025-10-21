// Design System Dialog - Reusable dialog/modal component using design system
"use client"

import type React from "react"

import { forwardRef, useState } from "react"
import { componentStyles } from "@/lib/component-styles"
import { DSButton } from "./ds-button"

interface DSDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  isDangerous?: boolean
}

export const DSDialog = forwardRef<HTMLDivElement, DSDialogProps>(
  (
    {
      open = false,
      onOpenChange,
      title,
      description,
      children,
      onConfirm,
      onCancel,
      confirmText = "Confirm",
      cancelText = "Cancel",
      isDangerous = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(open)

    const handleClose = () => {
      setIsOpen(false)
      onOpenChange?.(false)
      onCancel?.()
    }

    const handleConfirm = () => {
      onConfirm?.()
      setIsOpen(false)
      onOpenChange?.(false)
    }

    if (!isOpen) return null

    return (
      <>
        <div className={componentStyles.dialog.overlay} onClick={handleClose} />
        <div ref={ref} className={componentStyles.dialog.content}>
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          {children && <div className="my-4">{children}</div>}
          <div className="flex justify-end gap-2">
            <DSButton variant="outline" onClick={handleClose}>
              {cancelText}
            </DSButton>
            <DSButton variant={isDangerous ? "danger" : "primary"} onClick={handleConfirm}>
              {confirmText}
            </DSButton>
          </div>
        </div>
      </>
    )
  },
)

DSDialog.displayName = "DSDialog"
