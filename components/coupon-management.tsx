// Coupon Management Component - Create, edit, and manage coupons with timers
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCoupons, addCoupon, updateCoupon, deleteCoupon, toggleCouponStatus } from "@/lib/slices/coupons-slice"
import type { RootState } from "@/lib/store"
import type { Coupon } from "@/lib/slices/coupons-slice"
import { DSButton } from "./ds-button"
import { DSInput } from "./ds-input"
import { DSCard } from "./ds-card"
import { DSBadge } from "./ds-badge"
import { PrimaryTable } from "./primary-table"
import { mockCoupons } from "@/lib/mock-data"

interface CouponFormData {
  code: string
  type: "percentage" | "fixed"
  value: number
  maxUses: number
  minOrderValue: number
  startDate: string
  endDate: string
  description: string
}

export const CouponManagement: React.FC = () => {
  const dispatch = useDispatch()
  const coupons = useSelector((state: RootState) => state.coupons.coupons)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<CouponFormData>({
    code: "",
    type: "percentage",
    value: 0,
    maxUses: 100,
    minOrderValue: 0,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    description: "",
  })

  useEffect(() => {
    if (coupons.length === 0) {
      dispatch(setCoupons(mockCoupons))
    }
  }, [])

  const handleAddCoupon = () => {
    const newCoupon: Coupon = {
      id: `coupon-${Date.now()}`,
      code: formData.code,
      type: formData.type,
      value: formData.value,
      maxUses: formData.maxUses,
      currentUses: 0,
      minOrderValue: formData.minOrderValue,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      isActive: true,
      description: formData.description,
    }

    if (editingId) {
      dispatch(updateCoupon({ ...newCoupon, id: editingId }))
      setEditingId(null)
    } else {
      dispatch(addCoupon(newCoupon))
    }

    setFormData({
      code: "",
      type: "percentage",
      value: 0,
      maxUses: 100,
      minOrderValue: 0,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      description: "",
    })
    setIsFormOpen(false)
  }

  const handleEditCoupon = (coupon: Coupon) => {
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      maxUses: coupon.maxUses,
      minOrderValue: coupon.minOrderValue,
      startDate: coupon.startDate.toISOString().split("T")[0],
      endDate: coupon.endDate.toISOString().split("T")[0],
      description: coupon.description,
    })
    setEditingId(coupon.id)
    setIsFormOpen(true)
  }

  const handleDeleteCoupon = (id: string) => {
    dispatch(deleteCoupon(id))
  }

  const handleToggleStatus = (id: string) => {
    dispatch(toggleCouponStatus(id))
  }

  const getTimeRemaining = (endDate: Date): string => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()

    if (diff < 0) return "Expired"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const columns = [
    { key: "code", label: "Code", width: "15%" },
    {
      key: "discount",
      label: "Discount",
      width: "15%",
      render: (coupon: Coupon) => `${coupon.value}${coupon.type === "percentage" ? "%" : "$"}`,
    },
    {
      key: "usage",
      label: "Usage",
      width: "15%",
      render: (coupon: Coupon) => `${coupon.currentUses}/${coupon.maxUses}`,
    },
    {
      key: "timeRemaining",
      label: "Time Remaining",
      width: "15%",
      render: (coupon: Coupon) => (
        <DSBadge variant={coupon.isActive ? "success" : "outline"}>{getTimeRemaining(coupon.endDate)}</DSBadge>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "15%",
      render: (coupon: Coupon) => (
        <DSBadge variant={coupon.isActive ? "success" : "outline"}>{coupon.isActive ? "Active" : "Inactive"}</DSBadge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      width: "25%",
      render: (coupon: Coupon) => (
        <div className="flex gap-2">
          <DSButton size="sm" variant="outline" onClick={() => handleEditCoupon(coupon)}>
            Edit
          </DSButton>
          <DSButton
            size="sm"
            variant={coupon.isActive ? "warning" : "success"}
            onClick={() => handleToggleStatus(coupon.id)}
          >
            {coupon.isActive ? "Deactivate" : "Activate"}
          </DSButton>
          <DSButton size="sm" variant="danger" onClick={() => handleDeleteCoupon(coupon.id)}>
            Delete
          </DSButton>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Coupon Management</h1>
        <DSButton onClick={() => setIsFormOpen(!isFormOpen)}>{isFormOpen ? "Cancel" : "Create Coupon"}</DSButton>
      </div>

      {isFormOpen && (
        <DSCard padding="lg">
          <h2 className="mb-4 text-xl font-semibold">{editingId ? "Edit Coupon" : "Create New Coupon"}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DSInput
              label="Coupon Code"
              placeholder="e.g., SUMMER20"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
            />
            <div>
              <label className="text-sm font-medium">Discount Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as "percentage" | "fixed" })}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <DSInput
              label="Discount Value"
              type="number"
              placeholder="e.g., 20"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: Number.parseFloat(e.target.value) })}
            />
            <DSInput
              label="Max Uses"
              type="number"
              placeholder="e.g., 100"
              value={formData.maxUses}
              onChange={(e) => setFormData({ ...formData, maxUses: Number.parseInt(e.target.value) })}
            />
            <DSInput
              label="Min Order Value"
              type="number"
              placeholder="e.g., 25"
              value={formData.minOrderValue}
              onChange={(e) => setFormData({ ...formData, minOrderValue: Number.parseFloat(e.target.value) })}
            />
            <DSInput
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <DSInput
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
            <div className="md:col-span-2">
              <DSInput
                label="Description"
                placeholder="e.g., 20% off on all orders above $25"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <DSButton variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </DSButton>
            <DSButton onClick={handleAddCoupon}>{editingId ? "Update Coupon" : "Create Coupon"}</DSButton>
          </div>
        </DSCard>
      )}

      <PrimaryTable columns={columns} data={coupons} />
    </div>
  )
}
