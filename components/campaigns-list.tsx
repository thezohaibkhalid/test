"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCampaigns } from "@/lib/slices/campaigns-slice"
import { mockCampaigns } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus } from "lucide-react"

export function CampaignsList() {
  const dispatch = useDispatch()
  const campaigns = useSelector((state: RootState) => state.campaigns.campaigns)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    dispatch(setCampaigns(mockCampaigns))
  }, [dispatch])

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    active: "bg-emerald-100 text-emerald-800",
    scheduled: "bg-blue-100 text-blue-800",
    ended: "bg-gray-100 text-gray-800",
  }

  const typeColors = {
    discount: "bg-indigo-100 text-indigo-800",
    loyalty: "bg-purple-100 text-purple-800",
    seasonal: "bg-orange-100 text-orange-800",
    referral: "bg-pink-100 text-pink-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
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
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="ended">Ended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                  <Badge className={statusColors[campaign.status]}>{campaign.status}</Badge>
                  <Badge className={typeColors[campaign.type]}>{campaign.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{campaign.description}</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-5 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Discount</div>
                <div className="font-semibold text-foreground">
                  {campaign.discountValue}
                  {campaign.discountType === "percentage" ? "%" : "$"}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Min Order</div>
                <div className="font-semibold text-foreground">${campaign.minOrderValue}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Usage</div>
                <div className="font-semibold text-foreground">
                  {campaign.usedCount}/{campaign.maxUses}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Start Date</div>
                <div className="font-semibold text-foreground">{campaign.startDate}</div>
              </div>
              <div>
                <div className="text-muted-foreground">End Date</div>
                <div className="font-semibold text-foreground">{campaign.endDate}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
