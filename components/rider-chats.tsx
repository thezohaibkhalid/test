"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import type { RiderProfileData } from "@/lib/slices/riders-slice"

interface RiderChatsProps {
  rider: RiderProfileData
}

const channelColors: Record<string, string> = {
  inapp: "bg-blue-100 text-blue-800",
  whatsapp: "bg-green-100 text-green-800",
  sms: "bg-purple-100 text-purple-800",
}

const directionColors: Record<string, string> = {
  RIDER: "bg-blue-50 border-blue-200",
  ADMIN: "bg-gray-50 border-gray-200",
  CUSTOMER: "bg-amber-50 border-amber-200",
}

export function RiderChats({ rider }: RiderChatsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const chats = rider.chats || []
  const filteredChats = chats.filter(
    (chat) => chat.body.toLowerCase().includes(searchTerm.toLowerCase()) || chat.orderId?.includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by text or order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Chats */}
      {filteredChats.length > 0 ? (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredChats.map((chat) => (
            <Card key={chat.id} className={`border ${directionColors[chat.direction]}`}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={channelColors[chat.channel]} variant="outline">
                        {chat.channel}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {chat.direction}
                      </Badge>
                      {chat.orderId && (
                        <Badge variant="secondary" className="text-xs">
                          Order #{chat.orderId}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-foreground">{chat.body}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(chat.at).toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            {chats.length === 0 ? "No chats" : "No chats matching your search"}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
