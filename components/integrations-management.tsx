"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIntegrations } from "@/lib/slices/settings-slice"
import { mockIntegrations } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Settings, AlertCircle, CheckCircle } from "lucide-react"

export function IntegrationsManagement() {
  const dispatch = useDispatch()
  const integrations = useSelector((state: RootState) => state.settings.integrations)

  useEffect(() => {
    dispatch(setIntegrations(mockIntegrations))
  }, [dispatch])

  const statusColors = {
    connected: "bg-emerald-100 text-emerald-800",
    disconnected: "bg-gray-100 text-gray-800",
    error: "bg-rose-100 text-rose-800",
  }

  const typeColors = {
    payment: "bg-indigo-100 text-indigo-800",
    delivery: "bg-blue-100 text-blue-800",
    analytics: "bg-purple-100 text-purple-800",
    communication: "bg-orange-100 text-orange-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground">{integration.name}</h3>
                  <Badge className={statusColors[integration.status]}>
                    {integration.status === "connected" && <CheckCircle className="w-3 h-3 mr-1" />}
                    {integration.status === "error" && <AlertCircle className="w-3 h-3 mr-1" />}
                    {integration.status}
                  </Badge>
                  <Badge className={typeColors[integration.type]}>{integration.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Last synced: {integration.lastSync}</p>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
