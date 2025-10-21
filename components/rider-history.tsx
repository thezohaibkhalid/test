"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { RiderProfileData } from "@/lib/slices/riders-slice"

interface RiderHistoryProps {
  rider: RiderProfileData
}

const ITEMS_PER_PAGE = 5

export function RiderHistory({ rider }: RiderHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const history = rider.history || []
  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedHistory = history.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  return (
    <div className="space-y-4">
      {paginatedHistory.length > 0 ? (
        <>
          {paginatedHistory.map((item) => (
            <Card key={item.orderId}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Order #{item.orderId}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.deliveredAt ? new Date(item.deliveredAt).toLocaleString() : "Pending"}
                    </p>
                  </div>
                  <Badge variant={item.onTime ? "default" : "secondary"} className="capitalize">
                    {item.onTime ? "On Time" : "Late"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">No delivery history</CardContent>
        </Card>
      )}
    </div>
  )
}
