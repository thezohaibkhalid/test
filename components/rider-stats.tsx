import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { RiderProfileData, RiderStatus } from "@/lib/slices/riders-slice"
import { Star, Bike, MapPin } from "lucide-react"

interface RiderStatsProps {
  rider: RiderProfileData
}

const statusColors: Record<RiderStatus, string> = {
  AVAILABLE: "bg-green-100 text-green-800",
  BUSY: "bg-orange-100 text-orange-800",
  OFFLINE: "bg-gray-100 text-gray-800",
}

const heartbeatColors: Record<string, string> = {
  fresh: "bg-green-500",
  stale: "bg-yellow-500",
  offline: "bg-gray-500",
}

function getHeartbeatStatus(lastPingSec?: number): string {
  if (!lastPingSec) return "fresh"
  if (lastPingSec < 60) return "fresh"
  if (lastPingSec < 300) return "stale"
  return "offline"
}

export function RiderStats({ rider }: RiderStatsProps) {
  const heartbeatStatus = getHeartbeatStatus(rider.lastPingSec)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge className={statusColors[rider.status]}>{rider.status}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{rider.rating?.toFixed(1)}</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rider.activeOrders}</div>
          <p className="text-xs text-muted-foreground">Capacity: {rider.capacity}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Last Ping</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${heartbeatColors[heartbeatStatus]}`} />
          <span className="text-sm">{rider.lastPingSec ? `${rider.lastPingSec}s ago` : "Just now"}</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Vehicle</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Bike className="w-4 h-4" />
          <span className="capitalize">{rider.vehicle || "Unknown"}</span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Location</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">40.71°N, 74.01°W</span>
        </CardContent>
      </Card>
    </div>
  )
}
