"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setMetaAds, updateAdStatus } from "@/lib/slices/reports-slice"
import { mockMetaAds } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, BarChart3, TrendingUp } from "lucide-react"

export function MetaAdsPage() {
  const dispatch = useDispatch()
  const metaAds = useSelector((state: RootState) => state.reports.metaAds)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    dispatch(setMetaAds(mockMetaAds))
  }, [dispatch])

  const filteredAds = metaAds.filter((ad) => {
    const matchesSearch = ad.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    active: "bg-emerald-100 text-emerald-800",
    paused: "bg-amber-100 text-amber-800",
    ended: "bg-gray-100 text-gray-800",
  }

  const platformColors = {
    facebook: "bg-blue-100 text-blue-800",
    instagram: "bg-pink-100 text-pink-800",
    both: "bg-purple-100 text-purple-800",
  }

  const totalSpent = metaAds.reduce((sum, ad) => sum + ad.spent, 0)
  const totalConversions = metaAds.reduce((sum, ad) => sum + ad.conversions, 0)
  const avgROAS = metaAds.length > 0 ? (metaAds.reduce((sum, ad) => sum + ad.roas, 0) / metaAds.length).toFixed(2) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Meta Ads</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Spent</div>
          <div className="text-3xl font-bold text-indigo-600">${totalSpent.toFixed(2)}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Conversions</div>
          <div className="text-3xl font-bold text-emerald-600">{totalConversions}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Avg ROAS</div>
          <div className="text-3xl font-bold text-amber-600">{avgROAS}x</div>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
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
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="ended">Ended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredAds.map((ad) => (
          <Card key={ad.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{ad.name}</h3>
                  <Badge className={statusColors[ad.status]}>{ad.status}</Badge>
                  <Badge className={platformColors[ad.platform]}>{ad.platform}</Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  dispatch(updateAdStatus({ id: ad.id, status: ad.status === "active" ? "paused" : "active" }))
                }
              >
                {ad.status === "active" ? "Pause" : "Resume"}
              </Button>
            </div>

            <div className="grid grid-cols-6 gap-4 text-sm mb-3">
              <div>
                <div className="text-muted-foreground">Budget</div>
                <div className="font-semibold text-foreground">${ad.budget}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Spent</div>
                <div className="font-semibold text-foreground">${ad.spent.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Impressions</div>
                <div className="font-semibold text-foreground">{ad.impressions.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Clicks</div>
                <div className="font-semibold text-foreground">{ad.clicks.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-muted-foreground">CTR</div>
                <div className="font-semibold text-foreground">{ad.ctr.toFixed(2)}%</div>
              </div>
              <div>
                <div className="text-muted-foreground">CPC</div>
                <div className="font-semibold text-foreground">${ad.cpc.toFixed(2)}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm pt-3 border-t">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <div>
                  <div className="text-muted-foreground">Conversions</div>
                  <div className="font-semibold text-foreground">{ad.conversions}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="text-muted-foreground">ROAS</div>
                  <div className="font-semibold text-foreground">{ad.roas.toFixed(2)}x</div>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Start Date</div>
                <div className="font-semibold text-foreground text-xs">{ad.startDate}</div>
              </div>
              <div>
                <div className="text-muted-foreground">End Date</div>
                <div className="font-semibold text-foreground text-xs">{ad.endDate}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
