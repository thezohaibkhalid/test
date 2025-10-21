"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUsers, updateUserStatus } from "@/lib/slices/settings-slice"
import { mockUsers } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Trash2 } from "lucide-react"

export function UsersManagement() {
  const dispatch = useDispatch()
  const users = useSelector((state: RootState) => state.settings.users)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  useEffect(() => {
    dispatch(setUsers(mockUsers))
  }, [dispatch])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const statusColors = {
    active: "bg-emerald-100 text-emerald-800",
    inactive: "bg-gray-100 text-gray-800",
  }

  const roleColors = {
    admin: "bg-red-100 text-red-800",
    manager: "bg-indigo-100 text-indigo-800",
    staff: "bg-blue-100 text-blue-800",
    viewer: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
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
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{user.name}</h3>
                  <Badge className={statusColors[user.status]}>{user.status}</Badge>
                  <Badge className={roleColors[user.role]}>{user.role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                  <span>Last login: {user.lastLogin}</span>
                  <span>Created: {user.createdAt}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    dispatch(
                      updateUserStatus({ id: user.id, status: user.status === "active" ? "inactive" : "active" }),
                    )
                  }
                >
                  {user.status === "active" ? "Deactivate" : "Activate"}
                </Button>
                <Button variant="outline" size="sm" className="text-rose-600 hover:text-rose-700 bg-transparent">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
