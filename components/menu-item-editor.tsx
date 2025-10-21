"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import { publishItem } from "@/lib/slices/menu-slice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Save } from "lucide-react"
import { useState } from "react"

export function MenuItemEditor() {
  const dispatch = useDispatch<AppDispatch>()
  const selectedItemId = useSelector((state: RootState) => state.menu.selectedItemId)
  const item = useSelector((state: RootState) => state.menu.items.find((i) => i.id === selectedItemId))
  const variants = useSelector((state: RootState) => state.menu.variants.filter((v) => v.itemId === selectedItemId))
  const toppings = useSelector((state: RootState) => state.menu.toppings[selectedItemId || ""] || [])
  const combos = useSelector((state: RootState) => state.menu.combos[selectedItemId || ""] || [])

  const [formData, setFormData] = useState(item || {})

  if (!item) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">Select an item to edit</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{item.title}</CardTitle>
          <div className="flex gap-2">
            <Badge variant={item.status === "PUBLISHED" ? "default" : "secondary"}>{item.status}</Badge>
            <Button
              size="sm"
              onClick={() => {
                dispatch(
                  publishItem({
                    itemId: item.id,
                    snapshot: {
                      id: `snap-${Date.now()}`,
                      itemId: item.id,
                      version: 1,
                      createdAt: new Date().toISOString(),
                      author: "Admin",
                    },
                  }),
                )
              }}
            >
              Publish
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="toppings">Toppings</TabsTrigger>
            <TabsTrigger value="combos">Combos</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={item.title} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Input value={item.shortDesc || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Long Description</Label>
              <Textarea value={item.longDesc || ""} readOnly className="min-h-24" />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={item.taxIncluded} disabled />
              <Label>Tax Included</Label>
            </div>
          </TabsContent>

          {/* Variants Tab */}
          <TabsContent value="variants" className="space-y-4">
            <div className="space-y-3">
              {variants.map((variant) => (
                <Card key={variant.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{variant.name}</p>
                        <p className="text-sm text-muted-foreground">${variant.price.toFixed(2)}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Variant
            </Button>
          </TabsContent>

          {/* Toppings Tab */}
          <TabsContent value="toppings" className="space-y-4">
            <div className="space-y-3">
              {toppings.map((group) => (
                <Card key={group.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{group.name}</CardTitle>
                      <Badge variant="outline">{group.selectionMode}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {group.options.map((option) => (
                      <div key={option.id} className="flex items-center justify-between text-sm">
                        <span>{option.label}</span>
                        <span className="text-muted-foreground">+${option.priceDelta.toFixed(2)}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Topping Group
            </Button>
          </TabsContent>

          {/* Combos Tab */}
          <TabsContent value="combos" className="space-y-4">
            <div className="space-y-3">
              {combos.map((combo) => (
                <Card key={combo.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{combo.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm font-medium">${combo.basePrice.toFixed(2)}</p>
                    {combo.components.map((comp, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {comp.label} (Qty: {comp.quantity})
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Combo
            </Button>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-4">
            <div className="space-y-2">
              <Label>Global Availability</Label>
              <select className="w-full px-3 py-2 border border-border rounded-md text-sm">
                <option>Always Available</option>
                <option>Scheduled</option>
                <option>Out of Stock</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Per-Branch Settings</Label>
              <p className="text-sm text-muted-foreground">Configure availability for each branch</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-6 pt-6 border-t border-border">
          <Button className="flex-1 gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
