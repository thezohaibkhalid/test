"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setReviews } from "@/lib/slices/customers-slice"
import { mockCustomers } from "@/lib/mock-data"
import type { RootState } from "@/lib/store"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search } from "lucide-react"

export function ReviewsPage() {
  const dispatch = useDispatch()
  const reviews = useSelector((state: RootState) => state.customers.reviews)
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState<string>("all")

  useEffect(() => {
    const allReviews = mockCustomers.flatMap((c) => c.reviews)
    dispatch(setReviews(allReviews))
  }, [dispatch])

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = ratingFilter === "all" || review.rating === Number.parseInt(ratingFilter)
    return matchesSearch && matchesRating
  })

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Customer Reviews</h1>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Average Rating</div>
          <div className="text-2xl font-bold text-amber-600">⭐ {averageRating}</div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
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
            <p className="text-foreground mb-3">{review.comment}</p>
            <div className="flex gap-2 flex-wrap">
              {review.items.map((item, idx) => (
                <Badge key={idx} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
