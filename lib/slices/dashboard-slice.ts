import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Kpis {
  orders: number
  revenue: number
  aov: number
  prepTimeAvgMin: number
  deliveryTimeAvgMin: number
  activeRiders: number
  generatedAt: string
}

export interface PopularItem {
  itemId: string
  title: string
  units: number
  revenue: number
  imageUrl?: string
}

export interface SeriesPoint {
  bucket: string
  value: number
}

export interface Timeseries {
  orders: SeriesPoint[]
  revenue: SeriesPoint[]
  aov: SeriesPoint[]
}

export type LiveEventType = "order.created" | "order.updated" | "stockout" | "payment.failed" | "rider.capacity"

export interface LiveEvent {
  id: string
  type: LiveEventType
  title: string
  subtitle?: string
  at: string
}

interface DashboardState {
  kpis: Kpis | null
  popular: PopularItem | null
  series: Timeseries | null
  feed: LiveEvent[]
  loading: boolean
  error?: string
}

const initialState: DashboardState = {
  kpis: null,
  popular: null,
  series: null,
  feed: [],
  loading: false,
}

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchKpisStart: (state) => {
      state.loading = true
      state.error = undefined
    },
    fetchKpisSuccess: (state, action: PayloadAction<Kpis>) => {
      state.kpis = action.payload
      state.loading = false
    },
    fetchKpisError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    fetchSeriesSuccess: (state, action: PayloadAction<Timeseries>) => {
      state.series = action.payload
    },
    setPopularItem: (state, action: PayloadAction<PopularItem>) => {
      state.popular = action.payload
    },
    appendEvent: (state, action: PayloadAction<LiveEvent>) => {
      state.feed.unshift(action.payload)
      if (state.feed.length > 20) {
        state.feed.pop()
      }
    },
    clearFeed: (state) => {
      state.feed = []
    },
  },
})

export const {
  fetchKpisStart,
  fetchKpisSuccess,
  fetchKpisError,
  fetchSeriesSuccess,
  setPopularItem,
  appendEvent,
  clearFeed,
} = dashboardSlice.actions
export default dashboardSlice.reducer
