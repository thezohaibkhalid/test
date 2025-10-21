import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  change?: string
  icon?: React.ReactNode
}

export function KPICard({ title, value, change, icon }: KPICardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <p className="text-xs text-success mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
