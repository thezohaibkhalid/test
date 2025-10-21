import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type OrderStatus = "PENDING" | "ACCEPTED" | "PREPARING" | "READY" | "DISPATCHED" | "DELIVERED" | "CANCELLED"

export interface OrderSummary {
  id: string
  number: string
  status: OrderStatus
  placedAt: string
  branchId: string
  customerName?: string
  total: number
  channel: "web" | "frontdesk"
  paymentMethod: "cod" | "card" | "wallet"
  assignedRider?: { id: string; name: string; lastPingSec?: number }
}

export interface OrderDetail extends OrderSummary {
  items: {
    itemId: string
    title: string
    qty: number
    unitPrice: number
    modifiers?: { group: string; option: string; priceDelta: number }[]
  }[]
  notes?: string
  charges: { subtotal: number; discount: number; deliveryFee: number; tax: number; total: number }
  timeline: { status: OrderStatus; at: string }[]
  customer?: { id: string; name: string; phone?: string; email?: string; lastOrderAt?: string }
  rider?: {
    id: string
    name: string
    phone?: string
    status: "AVAILABLE" | "BUSY" | "OFFLINE"
    lastLocationAt?: string
    etaMin?: number
  }
}

interface OrdersState {
  list: OrderSummary[]
  detail: Record<string, OrderDetail>
  loading: boolean
  view: "kanban" | "table"
  selectedOrderId?: string
}

const initialState: OrdersState = {
  list: [],
  detail: {},
  loading: false,
  view: "table",
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    fetchListStart: (state) => {
      state.loading = true
    },
    fetchListSuccess: (state, action: PayloadAction<OrderSummary[]>) => {
      state.list = action.payload
      state.loading = false
    },
    fetchDetailSuccess: (state, action: PayloadAction<OrderDetail>) => {
      state.detail[action.payload.id] = action.payload
      state.selectedOrderId = action.payload.id
    },
    setView: (state, action: PayloadAction<"kanban" | "table">) => {
      state.view = action.payload
    },
    selectOrder: (state, action: PayloadAction<string>) => {
      state.selectedOrderId = action.payload
    },
    clearSelection: (state) => {
      state.selectedOrderId = undefined
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: OrderStatus }>) => {
      const order = state.list.find((o) => o.id === action.payload.id)
      if (order) {
        order.status = action.payload.status
      }
      const detail = state.detail[action.payload.id]
      if (detail) {
        detail.status = action.payload.status
        detail.timeline.push({ status: action.payload.status, at: new Date().toISOString() })
      }
    },
  },
})

export const {
  fetchListStart,
  fetchListSuccess,
  fetchDetailSuccess,
  setView,
  selectOrder,
  clearSelection,
  updateOrderStatus,
} = ordersSlice.actions
export default ordersSlice.reducer
