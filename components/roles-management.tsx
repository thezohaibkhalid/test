"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setRoles } from "@/lib/slices/settings-slice"
import { mockRoles } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"

export function RolesManagement() {
  const dispatch = useDispatch()
  const roles = useSelector((state: RootState) => state.settings.roles)

  useEffect(() => {
    dispatch(setRoles(mockRoles))
  }, [dispatch])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Roles & Permissions</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          New Role
        </Button>
      </div>

      <div className="grid gap-4">
        {roles.map((role) => (
          <Card key={role.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">{role.name}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-rose-600 hover:text-rose-700 bg-transparent">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm text-muted-foreground mb-2">Permissions ({role.permissions.length})</div>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <Badge key={permission} variant="outline">
                    {permission.replace(/_/g, " ")}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {role.userCount} user{role.userCount !== 1 ? "s" : ""} assigned
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
