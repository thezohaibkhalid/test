import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RiderMap } from "@/components/rider-map"
import type { RiderProfileData } from "@/lib/slices/riders-slice"

interface RiderCurrentWorkProps {
  rider: RiderProfileData
}

const stageColors: Record<string, string> = {
  EN_ROUTE_TO_BRANCH: "bg-blue-100 text-blue-800",
  PICKED_UP: "bg-purple-100 text-purple-800",
  EN_ROUTE_TO_CUSTOMER: "bg-orange-100 text-orange-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
}

export function RiderCurrentWork({ rider }: RiderCurrentWorkProps) {
  return (
    <div className="space-y-6">
      {/* Map */}
      <RiderMap rider={rider} />

      {/* Active Orders */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Orders</h3>
        {rider.currentWork?.orders && rider.currentWork.orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rider.currentWork.orders.map((order) => (
              <Card key={order.orderId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Order #{order.orderId}</CardTitle>
                    <Badge className={stageColors[order.stage]}>{order.stage.replace(/_/g, " ")}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Customer</p>
                    <p className="font-medium">{order.customer?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ETA</p>
                    <p className="font-medium">{order.etaMin} minutes</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Picked Up</p>
                      <p className="text-sm font-medium">
                        {order.pickupAt ? new Date(order.pickupAt).toLocaleTimeString() : "Pending"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Drop Off</p>
                      <p className="text-sm font-medium">
                        {order.dropAt ? new Date(order.dropAt).toLocaleTimeString() : "Pending"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">No active orders</CardContent>
          </Card>
        )}
      </div>

      {/* Heartbeat Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Heartbeat Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                rider.lastPingSec! < 20 ? "bg-emerald-500" : rider.lastPingSec! < 60 ? "bg-amber-500" : "bg-gray-500"
              }`}
            />
            <span className="text-sm">
              Last ping: <span className="font-semibold">{rider.lastPingSec}s ago</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
