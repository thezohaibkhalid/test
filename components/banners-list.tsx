"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setBanners } from "@/lib/slices/campaigns-slice"
import { mockBanners } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye, MousePointer } from "lucide-react"
import Image from "next/image"

export function BannersList() {
  const dispatch = useDispatch()
  const banners = useSelector((state: RootState) => state.campaigns.banners)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    dispatch(setBanners(mockBanners))
  }, [dispatch])

  const filteredBanners = banners.filter((banner) => {
    const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || banner.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    active: "bg-emerald-100 text-emerald-800",
    inactive: "bg-gray-100 text-gray-800",
  }

  const positionColors = {
    hero: "bg-indigo-100 text-indigo-800",
    sidebar: "bg-blue-100 text-blue-800",
    footer: "bg-purple-100 text-purple-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Banners</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          New Banner
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search banners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredBanners.map((banner) => (
          <Card key={banner.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
            <div className="flex gap-4">
              <div className="w-32 h-24 relative flex-shrink-0 bg-gray-100 rounded">
                <Image src={banner.imageUrl || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{banner.title}</h3>
                    <p className="text-sm text-muted-foreground">{banner.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={statusColors[banner.status]}>{banner.status}</Badge>
                    <Badge className={positionColors[banner.position]}>{banner.position}</Badge>
                  </div>
                </div>

                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{banner.impressions.toLocaleString()} impressions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MousePointer className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{banner.clicks.toLocaleString()} clicks</span>
                  </div>
                  <div className="text-muted-foreground">
                    CTR: {banner.impressions > 0 ? ((banner.clicks / banner.impressions) * 100).toFixed(2) : 0}%
                  </div>
                </div>

                <div className="flex gap-4 mt-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Start: </span>
                    <span className="font-semibold text-foreground">{banner.startDate}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">End: </span>
                    <span className="font-semibold text-foreground">{banner.endDate}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="self-start bg-transparent">
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
