"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectCustomer } from "@/lib/slices/customers-slice"
import { mockCustomers } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star } from "lucide-react"
import Link from "next/link"

interface CustomerProfileProps {
  customerId: string
}

export function CustomerProfile({ customerId }: CustomerProfileProps) {
  const dispatch = useDispatch()
  const selectedCustomer = useSelector((state: RootState) => state.customers.selectedCustomer)

  useEffect(() => {
    const customer = mockCustomers.find((c) => c.id === customerId)
    if (customer) {
      dispatch(selectCustomer(customer))
    }
  }, [customerId, dispatch])

  if (!selectedCustomer) {
    return <div>Loading...</div>
  }

  const statusColors = {
    active: "bg-emerald-100 text-emerald-800",
    inactive: "bg-gray-100 text-gray-800",
    vip: "bg-amber-100 text-amber-800",
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/customers">
        <Button variant="outline" className="mb-4 bg-transparent">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customers
        </Button>
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{selectedCustomer.name}</h1>
          <Badge className={`mt-2 ${statusColors[selectedCustomer.status]}`}>{selectedCustomer.status}</Badge>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">Send Message</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Email</div>
          <div className="font-semibold text-foreground text-sm">{selectedCustomer.email}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Phone</div>
          <div className="font-semibold text-foreground text-sm">{selectedCustomer.phone}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Join Date</div>
          <div className="font-semibold text-foreground text-sm">{selectedCustomer.joinDate}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground mb-1">Last Order</div>
          <div className="font-semibold text-foreground text-sm">{selectedCustomer.lastOrderDate}</div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-2">Total Orders</div>
              <div className="text-3xl font-bold text-indigo-600">{selectedCustomer.totalOrders}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-2">Total Spent</div>
              <div className="text-3xl font-bold text-emerald-600">${selectedCustomer.totalSpent.toFixed(2)}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground mb-2">Average Rating</div>
              <div className="text-3xl font-bold text-amber-600">⭐ {selectedCustomer.averageRating}</div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {selectedCustomer.reviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
              <p className="text-foreground mb-2">{review.comment}</p>
              <div className="flex gap-2 flex-wrap">
                {review.items.map((item, idx) => (
                  <Badge key={idx} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
