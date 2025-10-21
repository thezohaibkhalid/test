"use client"

import * as React from "react"
import { PrimaryDrawer, DrawerCloseButton } from "@/components/common/PrimaryDrawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "date-fns"
import type { OrderDetail, OrderStatus } from "@/lib/slices/orders-slice"

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PREPARING: "bg-purple-100 text-purple-800",
  READY: "bg-green-100 text-green-800",
  DISPATCHED: "bg-orange-100 text-orange-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
}

const nextStatuses: Record<OrderStatus, OrderStatus | null> = {
  PENDING: "ACCEPTED",
  ACCEPTED: "PREPARING",
  PREPARING: "READY",
  READY: "DISPATCHED",
  DISPATCHED: "DELIVERED",
  DELIVERED: null,
  CANCELLED: null,
}

export function OrderDrawer({
  open,
  onOpenChange,
  order,
  onStatusChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: OrderDetail | null
  onStatusChange?: (status: OrderStatus) => void
}) {
  if (!order) return null
  const nextStatus = nextStatuses[order.status]

  return (
    <PrimaryDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-3">
          <span>Order {order.number}</span>
          <Badge className={statusColors[order.status]}>{order.status}</Badge>
        </div>
      }
      description={formatDistanceToNow(new Date(order.placedAt), { addSuffix: true })}
      size="2xl"
      side="right"
      footer={
        <>
          {nextStatus && (
            <Button onClick={() => onStatusChange?.(nextStatus)} className="min-w-[140px]">
              Update to {nextStatus}
            </Button>
          )}
          <DrawerCloseButton />
        </>
      }
    >

      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Status Timeline</h3>
        <div className="space-y-2">
          {order.timeline.map((event, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-foreground font-medium">{event.status}</span>
              <span className="text-muted-foreground">
                {formatDistanceToNow(new Date(event.at), { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground">Items</h3>
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-start p-3 bg-card border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.qty}</p>
                {item.modifiers?.length ? (
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.modifiers.map((m) => `${m.group}: ${m.option}`).join(", ")}
                  </div>
                ) : null}
              </div>
              <p className="font-semibold text-foreground">${(item.unitPrice * item.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Notes</h3>
          <p className="text-sm text-muted-foreground bg-card p-3 rounded-lg">{order.notes}</p>
        </div>
      )}

      {/* Charges */}
      <div className="space-y-2 p-4 bg-card border border-border rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${order.charges.subtotal.toFixed(2)}</span>
        </div>
        {order.charges.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-success">-${order.charges.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span className="text-foreground">${order.charges.deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${order.charges.tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-semibold">
          <span className="text-foreground">Total</span>
          <span className="text-primary">${order.charges.total.toFixed(2)}</span>
        </div>
      </div>
      {/* === End content === */}
    </PrimaryDrawer>
  )
}
