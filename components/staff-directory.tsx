"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { setStaff } from "@/lib/slices/frontdesk-slice"
import { mockStaff } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"

export function StaffDirectory() {
  const dispatch = useDispatch()
  const staff = useSelector((state: RootState) => state.frontdesk.staff)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  useEffect(() => {
    dispatch(setStaff(mockStaff))
  }, [dispatch])

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  const statusColors = {
    active: "bg-emerald-100 text-emerald-800",
    inactive: "bg-gray-100 text-gray-800",
    "on-leave": "bg-amber-100 text-amber-800",
  }

  const roleColors = {
    manager: "bg-indigo-100 text-indigo-800",
    cashier: "bg-blue-100 text-blue-800",
    kitchen: "bg-orange-100 text-orange-800",
    delivery: "bg-purple-100 text-purple-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Staff Directory</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
        </Button>
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
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="cashier">Cashier</SelectItem>
            <SelectItem value="kitchen">Kitchen</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredStaff.map((member) => (
          <Link key={member.id} href={`/admin/frontdesk/${member.id}`}>
            <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <Badge className={statusColors[member.status]}>{member.status.replace("-", " ")}</Badge>
                    <Badge className={roleColors[member.role]}>{member.role}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  <p className="text-sm text-muted-foreground">{member.phone}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">
                    {member.performance.ordersProcessed} orders
                  </div>
                  <div className="text-sm text-muted-foreground">{member.performance.accuracy}% accuracy</div>
                  <div className="text-sm text-muted-foreground">⭐ {member.performance.avgRating}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
