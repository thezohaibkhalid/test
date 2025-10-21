// Payments Management Component
"use client"

import type React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPayments } from "@/lib/slices/payments-slice"
import type { RootState } from "@/lib/store"
import type { Payment } from "@/lib/slices/payments-slice"
import { DSCard } from "./ds-card"
import { DSBadge } from "./ds-badge"
import { PrimaryTable } from "./primary-table"
import { mockPayments } from "@/lib/mock-data"

export const PaymentsPage: React.FC = () => {
  const dispatch = useDispatch()
  const payments = useSelector((state: RootState) => state.payments.payments)

  useEffect(() => {
    if (payments.length === 0) {
      dispatch(setPayments(mockPayments))
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "pending":
        return "warning"
      case "failed":
        return "danger"
      case "refunded":
        return "outline"
      default:
        return "default"
    }
  }

  const getMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      card: "Credit Card",
      wallet: "Digital Wallet",
      cod: "Cash on Delivery",
      bank_transfer: "Bank Transfer",
    }
    return methods[method] || method
  }

  const columns = [
    { key: "transactionId", label: "Transaction ID", width: "20%" },
    { key: "orderId", label: "Order ID", width: "15%" },
    {
      key: "amount",
      label: "Amount",
      width: "15%",
      render: (payment: Payment) => `$${payment.amount.toFixed(2)}`,
    },
    {
      key: "method",
      label: "Method",
      width: "15%",
      render: (payment: Payment) => getMethodLabel(payment.method),
    },
    {
      key: "status",
      label: "Status",
      width: "15%",
      render: (payment: Payment) => (
        <DSBadge variant={getStatusColor(payment.status) as any}>{payment.status.toUpperCase()}</DSBadge>
      ),
    },
    {
      key: "processedAt",
      label: "Processed At",
      width: "20%",
      render: (payment: Payment) => new Date(payment.processedAt).toLocaleString(),
    },
  ]

  const totalRevenue = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const totalRefunded = payments
    .filter((p) => p.status === "refunded")
    .reduce((sum, p) => sum + (p.refundAmount || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">Manage and track all payment transactions</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DSCard padding="lg">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
        </DSCard>
        <DSCard padding="lg">
          <p className="text-sm text-muted-foreground">Total Refunded</p>
          <p className="text-2xl font-bold text-danger">${totalRefunded.toFixed(2)}</p>
        </DSCard>
        <DSCard padding="lg">
          <p className="text-sm text-muted-foreground">Completed Transactions</p>
          <p className="text-2xl font-bold">{payments.filter((p) => p.status === "completed").length}</p>
        </DSCard>
      </div>

      <PrimaryTable columns={columns} data={payments} />
    </div>
  )
}
