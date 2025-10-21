"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/lib/store"
import { fetchAllSuccess } from "@/lib/slices/menu-slice"
import { mockCategories, mockMenuItems } from "@/lib/mock-data"
import { MenuCategoryTree } from "@/components/menu-category-tree"
import { MenuItemEditor } from "@/components/menu-item-editor"

export default function MenuPage() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAllSuccess({ categories: mockCategories, items: mockMenuItems }))
  }, [dispatch])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Menu Management</h1>
        <p className="text-muted-foreground">Manage items, variants, toppings, and combos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <MenuCategoryTree />
        </div>
        <div className="lg:col-span-3">
          <MenuItemEditor />
        </div>
      </div>
    </div>
  )
}
