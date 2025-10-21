"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setReports } from "@/lib/slices/reports-slice"
import { mockReports } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, TrendingUp } from "lucide-react"

export function ReportsPage() {
  const dispatch = useDispatch()
  const reports = useSelector((state: RootState) => state.reports.reports)
  const [timeRange, setTimeRange] = useState("7days")

  useEffect(() => {
    dispatch(setReports(mockReports))
  }, [dispatch])

  const totalOrders = reports.reduce((sum, r) => sum + r.orders, 0)
  const totalRevenue = reports.reduce((sum, r) => sum + r.revenue, 0)
  const avgOrderValue = reports.length > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0
  const totalCustomers = reports.reduce((sum, r) => sum + r.customers, 0)

  const chartData = reports.map((r) => ({
    date: r.date,
    orders: r.orders,
    revenue: r.revenue,
    customers: r.customers,
  }))

  const topItemsAgg = reports
    .flatMap((r) => r.topItems)
    .reduce(
      (acc, item) => {
        const existing = acc.find((i) => i.name === item.name)
        if (existing) {
          existing.quantity += item.quantity
          existing.revenue += item.revenue
        } else {
          acc.push({ ...item })
        }
        return acc
      },
      [] as Array<{ name: string; quantity: number; revenue: number }>,
    )
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Orders</div>
          <div className="text-3xl font-bold text-indigo-600">{totalOrders}</div>
          <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12% from last period
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
          <div className="text-3xl font-bold text-emerald-600">${totalRevenue.toFixed(2)}</div>
          <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +8% from last period
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Avg Order Value</div>
          <div className="text-3xl font-bold text-amber-600">${avgOrderValue}</div>
          <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +2% from last period
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Customers</div>
          <div className="text-3xl font-bold text-purple-600">{totalCustomers}</div>
          <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +5% from last period
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Orders & Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#4f46e5" strokeWidth={2} />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Top Items by Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topItemsAgg}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#4f46e5" />
            <Bar dataKey="quantity" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Daily Breakdown</h2>
        <div className="space-y-2">
          {reports.map((report) => (
            <div key={report.date} className="flex items-center justify-between p-3 bg-background rounded border">
              <div>
                <div className="font-semibold text-foreground">{report.date}</div>
                <div className="text-sm text-muted-foreground">{report.customers} customers</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">{report.orders} orders</div>
                <div className="text-sm text-emerald-600">${report.revenue.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
