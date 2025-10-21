import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type RiderStatus = "AVAILABLE" | "BUSY" | "OFFLINE"

export interface RiderRow {
  id: string
  name: string
  phone?: string
  status: RiderStatus
  activeOrders: number
  capacity: number
  lastPingSec?: number
  vehicle?: "bike" | "car" | "other"
  branchId: string
  rating?: number
}

export interface RiderProfileData extends RiderRow {
  docs?: { cnicUrl?: string; licenseUrl?: string }
  currentWork?: {
    orders: {
      orderId: string
      stage: "EN_ROUTE_TO_BRANCH" | "PICKED_UP" | "EN_ROUTE_TO_CUSTOMER" | "DELIVERED"
      etaMin?: number
      pickupAt?: string
      dropAt?: string
      customer?: { name?: string; phone?: string }
    }[]
    location?: { lat: number; lng: number; updatedAt: string }
    route?: { polyline?: string; distanceKm?: number; durationMin?: number }
  }
  history?: { orderId: string; deliveredAt?: string; onTime: boolean }[]
  chats?: {
    id: string
    orderId?: string
    channel: "inapp" | "whatsapp" | "sms"
    direction: "RIDER" | "ADMIN" | "CUSTOMER"
    body: string
    at: string
    mediaUrl?: string
  }[]
}

interface RidersState {
  list: RiderRow[]
  profile: Record<string, RiderProfileData>
  loading: boolean
  selectedRiderId?: string
}

const initialState: RidersState = {
  list: [],
  profile: {},
  loading: false,
}

const ridersSlice = createSlice({
  name: "riders",
  initialState,
  reducers: {
    fetchListStart: (state) => {
      state.loading = true
    },
    fetchListSuccess: (state, action: PayloadAction<RiderRow[]>) => {
      state.list = action.payload
      state.loading = false
    },
    fetchProfileSuccess: (state, action: PayloadAction<RiderProfileData>) => {
      state.profile[action.payload.id] = action.payload
      state.selectedRiderId = action.payload.id
    },
    updateLocation: (state, action: PayloadAction<{ id: string; lat: number; lng: number; at: string }>) => {
      const rider = state.list.find((r) => r.id === action.payload.id)
      if (rider) {
        rider.lastPingSec = 0
      }
      const profile = state.profile[action.payload.id]
      if (profile && profile.currentWork) {
        profile.currentWork.location = {
          lat: action.payload.lat,
          lng: action.payload.lng,
          updatedAt: action.payload.at,
        }
      }
    },
    appendChat: (state, action: PayloadAction<{ riderId: string; message: any }>) => {
      const profile = state.profile[action.payload.riderId]
      if (profile && profile.chats) {
        profile.chats.push(action.payload.message)
      }
    },
    incrementLastPing: (state) => {
      state.list.forEach((rider) => {
        if (rider.lastPingSec !== undefined) {
          rider.lastPingSec += 1
        }
      })
      Object.values(state.profile).forEach((profile) => {
        if (profile.lastPingSec !== undefined) {
          profile.lastPingSec += 1
        }
      })
    },
  },
})

export const { fetchListStart, fetchListSuccess, fetchProfileSuccess, updateLocation, appendChat, incrementLastPing } =
  ridersSlice.actions
export default ridersSlice.reducer
