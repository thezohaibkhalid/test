"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchListSuccess } from "@/lib/slices/riders-slice"
import { mockRiders } from "@/lib/mock-data"
import { PrimaryTable } from "@/components/primary-table"
import { RiderFilters } from "@/components/rider-filters"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { RiderStatus } from "@/lib/slices/riders-slice"

const statusColors: Record<RiderStatus, string> = {
  AVAILABLE: "bg-emerald-100 text-emerald-800",
  BUSY: "bg-amber-100 text-amber-800",
  OFFLINE: "bg-gray-100 text-gray-800",
}

const statusBgColors: Record<RiderStatus, string> = {
  AVAILABLE: "bg-emerald-500",
  BUSY: "bg-amber-500",
  OFFLINE: "bg-gray-500",
}

export default function RidersPage() {
  const dispatch = useDispatch<AppDispatch>()
  const riders = useSelector((state: RootState) => state.riders.list)
  const [filteredRiders, setFilteredRiders] = useState(riders)
  const [filters, setFilters] = useState({
    status: "",
    vehicle: "",
    branch: "",
    capacity: "",
  })

  useEffect(() => {
    dispatch(fetchListSuccess(mockRiders))
  }, [dispatch])

  useEffect(() => {
    let filtered = riders

    if (filters.status) {
      filtered = filtered.filter((r) => r.status === filters.status)
    }
    if (filters.vehicle) {
      filtered = filtered.filter((r) => r.vehicle === filters.vehicle)
    }
    if (filters.branch) {
      filtered = filtered.filter((r) => r.branchId === filters.branch)
    }
    if (filters.capacity) {
      filtered = filtered.filter((r) => r.capacity >= Number.parseInt(filters.capacity))
    }

    setFilteredRiders(filtered)
  }, [riders, filters])

  const columns = [
    {
      dataField: "name",
      text: "Rider",
      formatter: (cell: string, row: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-white text-xs font-bold">
              {cell
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{cell}</p>
            <p className="text-xs text-muted-foreground">{row.phone}</p>
          </div>
        </div>
      ),
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cell: RiderStatus) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusBgColors[cell]}`} />
          <Badge className={statusColors[cell]}>{cell}</Badge>
        </div>
      ),
    },
    {
      dataField: "activeOrders",
      text: "Active Orders",
      sortable: true,
      formatter: (cell: number) => (
        <Badge variant="outline" className="bg-background">
          {cell} orders
        </Badge>
      ),
    },
    {
      dataField: "capacity",
      text: "Capacity",
      formatter: (cell: number) => `${cell} max`,
    },
    {
      dataField: "lastPingSec",
      text: "Last Ping",
      formatter: (cell: number) => {
        let color = "text-emerald-600"
        if (cell >= 60) color = "text-gray-600"
        else if (cell >= 20) color = "text-amber-600"
        return <span className={`text-sm font-medium ${color}`}>{cell}s ago</span>
      },
    },
    {
      dataField: "vehicle",
      text: "Vehicle",
      formatter: (cell: string) => (
        <Badge variant="outline" className="capitalize bg-background">
          {cell}
        </Badge>
      ),
    },
    {
      dataField: "rating",
      text: "Rating",
      formatter: (cell: number) => `${cell?.toFixed(1)} ⭐`,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Riders</h1>
        <p className="text-muted-foreground">Manage and track all delivery riders</p>
      </div>

      <RiderFilters filters={filters} onFiltersChange={setFilters} />

      <Card>
        <div className="p-6">
          <PrimaryTable
            columns={columns}
            data={filteredRiders}
            keyField="id"
            onRowClick={(rider) => {
              window.location.href = `/admin/riders/${rider.id}`
            }}
            pageSize={10}
            showPagination={true}
            showColumnToggle={true}
          />
        </div>
      </Card>
    </div>
  )
}
