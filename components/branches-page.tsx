"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBranches, addBranch, updateBranch, deleteBranch, toggleBranchStatus } from "@/lib/slices/branches-slice"
import type { RootState } from "@/lib/store"
import type { Branch } from "@/lib/slices/branches-slice"
import { DSButton } from "./ds-button"
import { DSInput } from "./ds-input"
import { DSCard } from "./ds-card"
import { DSBadge } from "./ds-badge"
import { PrimaryTable } from "./primary-table"
import { mockBranches } from "@/lib/mock-data"
import type { Column } from "@tanstack/react-table"

export const BranchesPage: React.FC = () => {
  const dispatch = useDispatch()
  const branches = useSelector((state: RootState) => state.branches.branches)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Branch, "id" | "createdAt">>({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    manager: "",
    status: "active",
    openingTime: "10:00",
    closingTime: "23:00",
    latitude: 0,
    longitude: 0,
    deliveryRadius: 5,
  })

  useEffect(() => {
    if (branches.length === 0) {
      dispatch(setBranches(mockBranches))
    }
  }, [])

  const handleAddBranch = () => {
    const newBranch: Branch = {
      id: `branch-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
    }

    if (editingId) {
      dispatch(updateBranch({ ...newBranch, id: editingId }))
      setEditingId(null)
    } else {
      dispatch(addBranch(newBranch))
    }

    setFormData({
      name: "",
      address: "",
      city: "",
      phone: "",
      email: "",
      manager: "",
      status: "active",
      openingTime: "10:00",
      closingTime: "23:00",
      latitude: 0,
      longitude: 0,
      deliveryRadius: 5,
    })
    setIsFormOpen(false)
  }

  const handleEditBranch = (branch: Branch) => {
    setFormData({
      name: branch.name,
      address: branch.address,
      city: branch.city,
      phone: branch.phone,
      email: branch.email,
      manager: branch.manager,
      status: branch.status,
      openingTime: branch.openingTime,
      closingTime: branch.closingTime,
      latitude: branch.latitude,
      longitude: branch.longitude,
      deliveryRadius: branch.deliveryRadius,
    })
    setEditingId(branch.id)
    setIsFormOpen(true)
  }

  const handleDeleteBranch = (id: string) => {
    dispatch(deleteBranch(id))
  }

  const handleToggleStatus = (id: string) => {
    dispatch(toggleBranchStatus(id))
  }

  const columns = [
    { key: "name", label: "Branch Name", width: "20%" },
    { key: "city", label: "City", width: "15%" },
    { key: "manager", label: "Manager", width: "15%" },
    {
      key: "status",
      label: "Status",
      width: "15%",
      render: (branch: Branch) => (
        <DSBadge
          variant={branch.status === "active" ? "success" : branch.status === "maintenance" ? "warning" : "outline"}
        >
          {branch.status.toUpperCase()}
        </DSBadge>
      ),
    },
    {
      key: "hours",
      label: "Hours",
      width: "15%",
      render: (branch: Branch) => `${branch.openingTime} - ${branch.closingTime}`,
    },
    {
      key: "actions",
      label: "Actions",
      width: "20%",
      render: (branch: Branch) => (
        <div className="flex gap-2">
          <DSButton size="sm" variant="outline" onClick={() => handleEditBranch(branch)}>
            Edit
          </DSButton>
          <DSButton
            size="sm"
            variant={branch.status === "active" ? "secondary" : "outline"}
            onClick={() => handleToggleStatus(branch.id)}
          >
            {branch.status === "active" ? "Deactivate" : "Activate"}
          </DSButton>
          <DSButton size="sm" variant="danger" onClick={() => handleDeleteBranch(branch.id)}>
            Delete
          </DSButton>
        </div>
      ),
    },
  ] satisfies Column<Branch>[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Branches</h1>
        <DSButton onClick={() => setIsFormOpen(!isFormOpen)}>{isFormOpen ? "Cancel" : "Add Branch"}</DSButton>
      </div>

      {isFormOpen && (
        <DSCard padding="lg">
          <h2 className="mb-4 text-xl font-semibold">{editingId ? "Edit Branch" : "Add New Branch"}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DSInput
              label="Branch Name"
              placeholder="e.g., Downtown Branch"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <DSInput
              label="City"
              placeholder="e.g., New York"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <DSInput
              label="Address"
              placeholder="e.g., 123 Main Street"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <DSInput
              label="Manager"
              placeholder="e.g., John Smith"
              value={formData.manager}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
            />
            <DSInput
              label="Phone"
              placeholder="e.g., +1 (555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <DSInput
              label="Email"
              placeholder="e.g., branch@restaurant.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <DSInput
              label="Opening Time"
              type="time"
              value={formData.openingTime}
              onChange={(e) => setFormData({ ...formData, openingTime: e.target.value })}
            />
            <DSInput
              label="Closing Time"
              type="time"
              value={formData.closingTime}
              onChange={(e) => setFormData({ ...formData, closingTime: e.target.value })}
            />
            <DSInput
              label="Delivery Radius (km)"
              type="number"
              value={formData.deliveryRadius}
              onChange={(e) => setFormData({ ...formData, deliveryRadius: Number.parseFloat(e.target.value) })}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <DSButton variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </DSButton>
            <DSButton onClick={handleAddBranch}>{editingId ? "Update Branch" : "Add Branch"}</DSButton>
          </div>
        </DSCard>
      )}

      <PrimaryTable columns={columns} data={branches} keyField="id" responsive={true} showColumnToggle={true} />
    </div>
  )
}
