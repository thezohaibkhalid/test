"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { fetchKpisSuccess, fetchSeriesSuccess, setPopularItem, appendEvent } from "@/lib/slices/dashboard-slice"
import { mockKpis, mockTimeseries, mockPopularItem, mockLiveEvents } from "@/lib/mock-data"
import { KPICard } from "@/components/kpi-card"
import { LiveFeed } from "@/components/live-feed"
import { DashboardCharts } from "@/components/dashboard-charts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, DollarSign, TrendingUp, Clock, Bike } from "lucide-react"

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>()
  const kpis = useSelector((state: RootState) => state.dashboard.kpis)
  const popular = useSelector((state: RootState) => state.dashboard.popular)

  useEffect(() => {
    // Load initial data
    dispatch(fetchKpisSuccess(mockKpis))
    dispatch(fetchSeriesSuccess(mockTimeseries))
    dispatch(setPopularItem(mockPopularItem))

    // Add initial events
    mockLiveEvents.forEach((event) => {
      dispatch(appendEvent(event))
    })

    // Simulate live events every 5 seconds
    const eventInterval = setInterval(() => {
      const randomEvent = mockLiveEvents[Math.floor(Math.random() * mockLiveEvents.length)]
      dispatch(
        appendEvent({
          ...randomEvent,
          id: `${Date.now()}`,
          at: new Date().toISOString(),
        }),
      )
    }, 5000)

    return () => clearInterval(eventInterval)
  }, [dispatch])

  if (!kpis) return null

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Today's performance overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Total Orders"
          value={kpis.orders.toLocaleString()}
          change="+12% from yesterday"
          icon={<ShoppingCart className="w-5 h-5" />}
        />
        <KPICard
          title="Revenue"
          value={`$${kpis.revenue.toLocaleString()}`}
          change="+8% from yesterday"
          icon={<DollarSign className="w-5 h-5" />}
        />
        <KPICard
          title="Average Order Value"
          value={`$${kpis.aov.toFixed(2)}`}
          change="+2% from yesterday"
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPICard
          title="Avg Prep Time"
          value={`${kpis.prepTimeAvgMin}m`}
          change="-1m from yesterday"
          icon={<Clock className="w-5 h-5" />}
        />
        <KPICard
          title="Avg Delivery Time"
          value={`${kpis.deliveryTimeAvgMin}m`}
          change="+2m from yesterday"
          icon={<Clock className="w-5 h-5" />}
        />
        <KPICard
          title="Active Riders"
          value={kpis.activeRiders}
          change="+5 from yesterday"
          icon={<Bike className="w-5 h-5" />}
        />
      </div>

      {/* Popular Item */}
      {popular && (
        <Card>
          <CardHeader>
            <CardTitle>Popular Item Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img
                src={popular.imageUrl || "/placeholder.svg"}
                alt={popular.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{popular.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{popular.units} units sold</p>
                <p className="text-lg font-bold text-success mt-2">${popular.revenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <DashboardCharts />

      {/* Live Feed */}
      <LiveFeed />
    </div>
  )
}
