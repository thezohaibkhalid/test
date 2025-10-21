"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchProfileSuccess, incrementLastPing } from "@/lib/slices/riders-slice"
import { mockRiderProfile } from "@/lib/mock-data"
import { RiderOverview } from "@/components/rider-overview"
import { RiderCurrentWork } from "@/components/rider-current-work"
import { RiderHistory } from "@/components/rider-history"
import { RiderChats } from "@/components/rider-chats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, ArrowLeft } from "lucide-react"

export default function RiderProfilePage({ params }: { params: { riderId: string } }) {
  const dispatch = useDispatch<AppDispatch>()
  const rider = useSelector((state: RootState) => state.riders.profile[params.riderId])

  useEffect(() => {
    dispatch(fetchProfileSuccess(mockRiderProfile))

    const interval = setInterval(() => {
      dispatch(incrementLastPing())
    }, 1000)

    return () => clearInterval(interval)
  }, [dispatch])

  if (!rider) return null

  return (
    <div className="p-6 space-y-6">
      {/* Header with back button */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{rider.name}</h1>
            <p className="text-muted-foreground">{rider.phone}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Phone className="w-4 h-4" />
            Call
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <MessageSquare className="w-4 h-4" />
            Message
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="work">Current Work</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="chats">Chats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <RiderOverview rider={rider} />
        </TabsContent>

        <TabsContent value="work" className="space-y-4">
          <RiderCurrentWork rider={rider} />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <RiderHistory rider={rider} />
        </TabsContent>

        <TabsContent value="chats" className="space-y-4">
          <RiderChats rider={rider} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
