"use client"

import { useEffect, useRef } from "react"
import type { RiderProfileData } from "@/lib/slices/riders-slice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RiderMapProps {
  rider: RiderProfileData | null
}

export function RiderMap({ rider }: RiderMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || !rider?.currentWork?.location) return

    // Simple map visualization using canvas
    const canvas = document.createElement("canvas")
    canvas.width = mapRef.current.clientWidth
    canvas.height = 400
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Background
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Grid
    ctx.strokeStyle = "#e0e0e0"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Branch (center)
    ctx.fillStyle = "#4f46e5"
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#000"
    ctx.font = "12px sans-serif"
    ctx.fillText("Branch", canvas.width / 2 - 20, canvas.height / 2 - 15)

    // Rider location
    const riderX = canvas.width / 2 + Math.random() * 100 - 50
    const riderY = canvas.height / 2 + Math.random() * 100 - 50
    ctx.fillStyle = "#10b981"
    ctx.beginPath()
    ctx.arc(riderX, riderY, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#000"
    ctx.fillText(rider.name, riderX - 20, riderY - 15)

    // Route line
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height / 2)
    ctx.lineTo(riderX, riderY)
    ctx.stroke()
    ctx.setLineDash([])

    // Clear and redraw
    if (mapRef.current) {
      mapRef.current.innerHTML = ""
      mapRef.current.appendChild(canvas)
    }
  }, [rider])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="w-full bg-gray-100 rounded-lg min-h-96" />
      </CardContent>
    </Card>
  )
}
