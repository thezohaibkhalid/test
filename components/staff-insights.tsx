"use client"

import { DSCard } from "./ds-card"
import { DSBadge } from "./ds-badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface StaffInsight {
  id: string
  name: string
  role: "frontdesk" | "rider"
  totalOrders: number
  completedOrders: number
  averageRating: number
  hoursWorked: number
  performanceScore: number
}

interface StaffInsightsProps {
  insights: StaffInsight[]
}

export function StaffInsights({ insights }: StaffInsightsProps) {
  const chartData = insights.map((staff) => ({
    name: staff.name,
    completed: staff.completedOrders,
    rating: Math.round(staff.averageRating * 10),
    performance: staff.performanceScore,
  }))

  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return <DSBadge variant="success">Excellent</DSBadge>
    if (score >= 75) return <DSBadge variant="primary">Good</DSBadge>
    if (score >= 60) return <DSBadge variant="warning">Average</DSBadge>
    return <DSBadge variant="danger">Needs Improvement</DSBadge>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((staff) => (
          <DSCard key={staff.id} className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-foreground">{staff.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{staff.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Orders</p>
                  <p className="font-semibold text-foreground">{staff.completedOrders}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rating</p>
                  <p className="font-semibold text-foreground">{staff.averageRating.toFixed(1)}★</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Hours</p>
                  <p className="font-semibold text-foreground">{staff.hoursWorked}h</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Score</p>
                  <p className="font-semibold text-foreground">{staff.performanceScore}%</p>
                </div>
              </div>

              <div className="flex justify-center">{getPerformanceBadge(staff.performanceScore)}</div>
            </div>
          </DSCard>
        ))}
      </div>

      <DSCard className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey="completed" fill="var(--primary)" name="Completed Orders" />
            <Bar dataKey="performance" fill="var(--success)" name="Performance Score" />
          </BarChart>
        </ResponsiveContainer>
      </DSCard>
    </div>
  )
}
