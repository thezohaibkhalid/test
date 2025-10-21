"use client"

import { Card } from "@/components/ui/card"

interface RiderFiltersProps {
  filters: {
    status: string
    vehicle: string
    branch: string
    capacity: string
  }
  onFiltersChange: (filters: any) => void
}

export function RiderFilters({ filters, onFiltersChange }: RiderFiltersProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handleClearFilters = () => {
    onFiltersChange({
      status: "",
      vehicle: "",
      branch: "",
      capacity: "",
    })
  }

  const activeFiltersCount = Object.values(filters).filter((v) => v).length

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <button onClick={handleClearFilters} className="text-sm text-primary hover:underline">
              Clear all ({activeFiltersCount})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background"
            >
              <option value="">All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="BUSY">Busy</option>
              <option value="OFFLINE">Offline</option>
            </select>
          </div>

          {/* Vehicle Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Vehicle</label>
            <select
              value={filters.vehicle}
              onChange={(e) => handleFilterChange("vehicle", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background"
            >
              <option value="">All Vehicles</option>
              <option value="bike">Bike</option>
              <option value="car">Car</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Branch Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Branch</label>
            <select
              value={filters.branch}
              onChange={(e) => handleFilterChange("branch", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background"
            >
              <option value="">All Branches</option>
              <option value="branch-1">Downtown Branch</option>
              <option value="branch-2">Uptown Branch</option>
            </select>
          </div>

          {/* Capacity Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Min Capacity</label>
            <select
              value={filters.capacity}
              onChange={(e) => handleFilterChange("capacity", e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm bg-background"
            >
              <option value="">Any Capacity</option>
              <option value="4">4+ orders</option>
              <option value="5">5+ orders</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  )
}
