"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { setCustomers } from "@/lib/slices/customers-slice"
import { mockCustomers } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Phone } from "lucide-react"

export function CustomersDirectory() {
  const dispatch = useDispatch()
  const customers = useSelector((state: RootState) => state.customers.customers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    dispatch(setCustomers(mockCustomers))
  }, [dispatch])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    active: "bg-emerald-100 text-emerald-800",
    inactive: "bg-gray-100 text-gray-800",
    vip: "bg-amber-100 text-amber-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Customers</h1>
        <div className="text-sm text-muted-foreground">Total: {customers.length} customers</div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <Link key={customer.id} href={`/admin/customers/${customer.id}`}>
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{customer.name}</h3>
                    <Badge className={statusColors[customer.status]}>{customer.status}</Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {customer.phone}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">{customer.totalOrders} orders</div>
                  <div className="text-sm text-muted-foreground">${customer.totalSpent.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">⭐ {customer.averageRating}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
