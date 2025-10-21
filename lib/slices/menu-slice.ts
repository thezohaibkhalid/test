import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Category {
  id: string
  name: string
  description?: string
  sort: number
  showOn: { web: boolean; frontdesk: boolean }
}

export interface MenuItem {
  id: string
  categoryId: string
  title: string
  slug: string
  shortDesc?: string
  longDesc?: string
  badges?: string[]
  taxIncluded?: boolean
  status: "DRAFT" | "PUBLISHED"
  media?: { imageUrl?: string; videoUrl?: string; alt?: string }
  availability?: {
    global: "ALWAYS" | "SCHEDULED" | "OUT_OF_STOCK"
    perBranch?: Record<string, "DEFAULT" | "FORCE_AVAILABLE" | "FORCE_HIDDEN">
  }
}

export interface Variant {
  id: string
  itemId: string
  name: string
  price: number
  sku?: string
  cost?: number
}

export interface ToppingOption {
  id: string
  label: string
  priceDelta: number
  defaultSelected?: boolean
  maxQty?: number
  iconUrl?: string
  imageUrl?: string
  calorie?: number
}

export interface ToppingGroup {
  id: string
  itemId: string
  name: string
  required: boolean
  min: number
  max: number
  selectionMode: "SINGLE" | "MULTI" | "QUANTITY"
  options: ToppingOption[]
  display: "chips" | "list" | "grid"
  priceRule?: "PER_OPTION" | "PER_GROUP"
}

export interface Combo {
  id: string
  name: string
  basePrice: number
  components: {
    label: string
    categoryId?: string
    itemIds?: string[]
    required: boolean
    quantity: number
    upgradeRule?: "ALLOW_UPGRADE" | "NO_UPGRADE"
  }[]
}

export interface PublishSnapshot {
  id: string
  itemId: string
  version: number
  createdAt: string
  author: string
}

interface MenuState {
  categories: Category[]
  items: MenuItem[]
  variants: Variant[]
  toppings: Record<string, ToppingGroup[]>
  combos: Record<string, Combo[]>
  publishing: Record<string, PublishSnapshot[]>
  loading: boolean
  selectedItemId?: string
}

const initialState: MenuState = {
  categories: [],
  items: [],
  variants: [],
  toppings: {},
  combos: {},
  publishing: {},
  loading: false,
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    fetchAllStart: (state) => {
      state.loading = true
    },
    fetchAllSuccess: (state, action: PayloadAction<{ categories: Category[]; items: MenuItem[] }>) => {
      state.categories = action.payload.categories
      state.items = action.payload.items
      state.loading = false
    },
    selectItem: (state, action: PayloadAction<string>) => {
      state.selectedItemId = action.payload
    },
    upsertItem: (state, action: PayloadAction<MenuItem>) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id)
      if (idx >= 0) {
        state.items[idx] = action.payload
      } else {
        state.items.push(action.payload)
      }
    },
    upsertVariants: (state, action: PayloadAction<{ itemId: string; variants: Variant[] }>) => {
      state.variants = state.variants.filter((v) => v.itemId !== action.payload.itemId)
      state.variants.push(...action.payload.variants)
    },
    upsertToppings: (state, action: PayloadAction<{ itemId: string; groups: ToppingGroup[] }>) => {
      state.toppings[action.payload.itemId] = action.payload.groups
    },
    upsertCombos: (state, action: PayloadAction<{ itemId: string; combos: Combo[] }>) => {
      state.combos[action.payload.itemId] = action.payload.combos
    },
    publishItem: (state, action: PayloadAction<{ itemId: string; snapshot: PublishSnapshot }>) => {
      if (!state.publishing[action.payload.itemId]) {
        state.publishing[action.payload.itemId] = []
      }
      state.publishing[action.payload.itemId].push(action.payload.snapshot)
      const item = state.items.find((i) => i.id === action.payload.itemId)
      if (item) {
        item.status = "PUBLISHED"
      }
    },
  },
})

export const {
  fetchAllStart,
  fetchAllSuccess,
  selectItem,
  upsertItem,
  upsertVariants,
  upsertToppings,
  upsertCombos,
  publishItem,
} = menuSlice.actions
export default menuSlice.reducer
