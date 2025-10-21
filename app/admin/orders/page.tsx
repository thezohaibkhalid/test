"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchListSuccess, selectOrder, updateOrderStatus } from "@/lib/slices/orders-slice"
import { mockOrders, mockOrderDetail } from "@/lib/mock-data"
import { PrimaryTable } from "@/components/primary-table"
import { OrderDrawer } from "@/components/order-drawer"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { OrderStatus } from "@/lib/slices/orders-slice"
import { formatDistanceToNow } from "date-fns"

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-blue-100 text-blue-800",
  PREPARING: "bg-purple-100 text-purple-800",
  READY: "bg-green-100 text-green-800",
  DISPATCHED: "bg-orange-100 text-orange-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-red-100 text-red-800",
}

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>()
  const orders = useSelector((state: RootState) => state.orders.list)
  const selectedOrderId = useSelector((state: RootState) => state.orders.selectedOrderId)
  const selectedOrder = useSelector((state: RootState) => state.orders.detail[selectedOrderId || ""])
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchListSuccess(mockOrders))
  }, [dispatch])

  const handleRowClick = (order: any) => {
    dispatch(selectOrder(order.id))
    // Load order detail
    dispatch({ type: "orders/fetchDetailSuccess", payload: mockOrderDetail })
    setDrawerOpen(true)
  }

  const handleStatusChange = (status: OrderStatus) => {
    if (selectedOrderId) {
      dispatch(updateOrderStatus({ id: selectedOrderId, status }))
    }
  }

  const columns = [
    {
      dataField: "number",
      text: "Order #",
      sortable: true,
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cell: OrderStatus) => <Badge className={statusColors[cell]}>{cell}</Badge>,
    },
    {
      dataField: "customerName",
      text: "Customer",
      sortable: true,
    },
    {
      dataField: "total",
      text: "Total",
      formatter: (cell: number) => `$${cell.toFixed(2)}`,
    },
    {
      dataField: "channel",
      text: "Channel",
      formatter: (cell: string) => <Badge variant="outline">{cell}</Badge>,
    },
    {
      dataField: "paymentMethod",
      text: "Payment",
      formatter: (cell: string) => <Badge variant="secondary">{cell.toUpperCase()}</Badge>,
    },
    {
      dataField: "placedAt",
      text: "Placed",
      formatter: (cell: string) => formatDistanceToNow(new Date(cell), { addSuffix: true }),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground">Manage and track all orders</p>
      </div>

      <Card>
        <div className="p-6">
          <PrimaryTable
            columns={columns}
            data={orders}
            keyField="id"
            onRowClick={handleRowClick}
            responsive={true}
            showColumnToggle={true}
          />
        </div>
      </Card>

      <OrderDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
      />
    </div>
  )
}
