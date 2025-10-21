"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStaff } from "@/lib/slices/frontdesk-slice"
import { mockStaff } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface StaffProfileProps {
  staffId: string
}

export function StaffProfile({ staffId }: StaffProfileProps) {
  const dispatch = useDispatch()
  const selectedStaff = useSelector((state: RootState) => state.frontdesk.selectedStaff)

  useEffect(() => {
    const staff = mockStaff.find((s) => s.id === staffId)
    if (staff) {
      dispatch(selectStaff(staff))
    }
  }, [staffId, dispatch])

  if (!selectedStaff) {
    return <div>Loading...</div>
  }

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
      <Link href="/admin/frontdesk">
        <Button variant="outline" className="mb-4 bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Staff
        </Button>
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{selectedStaff.name}</h1>
          <div className="flex gap-2 mt-2">
            <Badge className={statusColors[selectedStaff.status]}>{selectedStaff.status.replace("-", " ")}</Badge>
            <Badge className={roleColors[selectedStaff.role]}>{selectedStaff.role}</Badge>
          </div>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">Edit Profile</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Email</div>
          <div className="font-semibold text-foreground">{selectedStaff.email}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Phone</div>
          <div className="font-semibold text-foreground">{selectedStaff.phone}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Join Date</div>
          <div className="font-semibold text-foreground">{selectedStaff.joinDate}</div>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="shifts">Shifts</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-2">Orders Processed</div>
              <div className="text-3xl font-bold text-indigo-600">{selectedStaff.performance.ordersProcessed}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-2">Accuracy Rate</div>
              <div className="text-3xl font-bold text-emerald-600">{selectedStaff.performance.accuracy}%</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-2">Average Rating</div>
              <div className="text-3xl font-bold text-amber-600">⭐ {selectedStaff.performance.avgRating}</div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shifts" className="space-y-4">
          <div className="space-y-2">
            {selectedStaff.shifts.map((shift) => (
              <Card key={shift.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{shift.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {shift.startTime} - {shift.endTime}
                    </div>
                  </div>
                  <Badge
                    className={
                      shift.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : shift.status === "scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-rose-100 text-rose-800"
                    }
                  >
                    {shift.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
