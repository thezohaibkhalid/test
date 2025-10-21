"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, TrendingUp, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from "recharts";

/**
 * Small utilities — consistent number/currency/date formatting
 */
const fmtNumber = (n?: number) =>
  typeof n === "number" ? new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n) : "–";
const fmtCurrency = (n?: number) =>
  typeof n === "number"
    ? new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n)
    : "–";
const fmtDate = (d?: string) => (d ? new Intl.DateTimeFormat(undefined, { month: "short", day: "2-digit" }).format(new Date(d)) : "–");

/**
 * Minimal, elegant tooltip shared by all charts
 */
function ChartTooltip({ active, payload, label, labelFormatter, currencyKeys = [] as string[] }: any) {
  if (!active || !payload?.length) return null;
  const rows = payload.map((p: any) => ({
    name: p.name || p.dataKey,
    value: currencyKeys.includes(p.dataKey || p.name) ? fmtCurrency(p.value) : fmtNumber(p.value),
    stroke: p.color,
  }));
  const lbl = labelFormatter ? labelFormatter(label) : label;
  return (
    <div className="rounded-xl border bg-popover text-popover-foreground shadow-sm p-3 text-sm">
      <div className="mb-2 font-medium">{lbl}</div>
      <div className="space-y-1">
        {rows.map((r: any) => (
          <div key={r.name} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: r.stroke }} />
              <span className="text-muted-foreground">{r.name}</span>
            </div>
            <span className="font-medium">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sparkline({ data, dataKey = "value", yAxisId, gradientId }: any) {
  if (!data?.length) return null;
  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={data} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey={dataKey} stroke="hsl(var(--primary))" fill={`url(#${gradientId})`} strokeWidth={1.75} />
        <XAxis dataKey="bucket" hide />
        <YAxis hide yAxisId={yAxisId} />
      </AreaChart>
    </ResponsiveContainer>
  );
}


export function DashboardCharts() {
  const series = useSelector((state: RootState) => state.dashboard.series)

  if (!series || !series.orders || !series.revenue || !series.aov) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[0, 1].map((i) => (
          <Card key={i} className="h-[360px] flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </Card>
        ))}
      </div>
    )
  }

  const chartData = series.orders.map((point: any, idx: number) => ({
    bucket: point.bucket,
    orders: point.value,
    revenue: series.revenue[idx]?.value ?? 0,
    aov: series.aov[idx]?.value ?? 0,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center justify-between w-full">
            <span>Orders & Revenue</span>
            <span className="text-xs text-muted-foreground">Hover to inspect</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="bucket" tickMargin={8} />
              <YAxis yAxisId="left" width={56} />
              <YAxis yAxisId="right" orientation="right" width={72} />
              <Tooltip content={<ChartTooltip labelFormatter={(l: string) => l} currencyKeys={["revenue"]} />} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="orders" name="Orders" stroke="#4f46e5" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle>Average Order Value</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <defs>
                <linearGradient id="aovGradientDash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="bucket" tickMargin={8} />
              <YAxis width={64} />
              <Tooltip content={<ChartTooltip labelFormatter={(l: string) => l} currencyKeys={["aov"]} />} />
              <Legend />
              <Area type="monotone" dataKey="aov" name="AOV ($)" stroke="#f59e0b" fill="url(#aovGradientDash)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
