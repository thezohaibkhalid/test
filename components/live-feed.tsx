"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ShoppingCart, TrendingUp, Zap, AlertTriangle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const eventIcons = {
  "order.created": <ShoppingCart className="w-4 h-4" />,
  "order.updated": <TrendingUp className="w-4 h-4" />,
  "rider.capacity": <Zap className="w-4 h-4" />,
  "payment.failed": <AlertCircle className="w-4 h-4" />,
  stockout: <AlertTriangle className="w-4 h-4" />,
}

const eventColors = {
  "order.created": "bg-blue-50 border-blue-200",
  "order.updated": "bg-green-50 border-green-200",
  "rider.capacity": "bg-yellow-50 border-yellow-200",
  "payment.failed": "bg-red-50 border-red-200",
  stockout: "bg-orange-50 border-orange-200",
}

export function LiveFeed() {
  const feed = useSelector((state: RootState) => state.dashboard?.feed)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {feed?.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No activity yet</p>
          ) : (
            feed?.map((event) => (
              <div key={event.id} className={`p-3 rounded-lg border ${eventColors[event.type]}`}>
                <div className="flex items-start gap-3">
                  <div className="mt-1">{eventIcons[event.type]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{event.title}</p>
                    {event.subtitle && <p className="text-xs text-muted-foreground mt-1">{event.subtitle}</p>}
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDistanceToNow(new Date(event.at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
