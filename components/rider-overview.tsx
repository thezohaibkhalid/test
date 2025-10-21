import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { RiderProfileData } from "@/lib/slices/riders-slice"

interface RiderOverviewProps {
  rider: RiderProfileData
}

export function RiderOverview({ rider }: RiderOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-white text-lg font-bold">
                {rider.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">{rider.name}</p>
              <p className="text-sm text-muted-foreground">{rider.phone}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge className="capitalize">{rider.status}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Vehicle</span>
              <Badge variant="outline" className="capitalize">
                {rider.vehicle}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Capacity</span>
              <span className="font-medium">{rider.capacity} orders</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Rating</span>
              <span className="font-semibold">{rider.rating?.toFixed(1)} ⭐</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Active Orders</span>
              <span className="font-semibold">{rider.activeOrders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Last Ping</span>
              <span className="font-semibold">{rider.lastPingSec}s ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Branch</span>
              <span className="font-semibold">{rider.branchId}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-sm font-medium">CNIC</span>
            {rider.docs?.cnicUrl ? (
              <a
                href={rider.docs.cnicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                View Document
              </a>
            ) : (
              <span className="text-xs text-muted-foreground">Not uploaded</span>
            )}
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span className="text-sm font-medium">License</span>
            {rider.docs?.licenseUrl ? (
              <a
                href={rider.docs.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                View Document
              </a>
            ) : (
              <span className="text-xs text-muted-foreground">Not uploaded</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
