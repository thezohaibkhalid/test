"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import { selectItem } from "@/lib/slices/menu-slice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

export function MenuCategoryTree() {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.menu.categories)
  const items = useSelector((state: RootState) => state.menu.items)
  const selectedItemId = useSelector((state: RootState) => state.menu.selectedItemId)

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Categories</CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="space-y-1">
            <p className="text-sm font-semibold text-foreground px-2 py-1">{category.name}</p>
            <div className="space-y-1 pl-4">
              {items
                .filter((item) => item.categoryId === category.id)
                .map((item) => (
                  <Button
                    key={item.id}
                    variant={selectedItemId === item.id ? "default" : "ghost"}
                    className="w-full justify-start text-sm"
                    onClick={() => dispatch(selectItem(item.id))}
                  >
                    {item.title}
                  </Button>
                ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
