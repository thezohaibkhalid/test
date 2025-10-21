import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Payment {
  id: string
  orderId: string
  amount: number
  method: "card" | "wallet" | "cod" | "bank_transfer"
  status: "pending" | "completed" | "failed" | "refunded"
  transactionId: string
  processedAt: string
  refundedAt?: string
  refundAmount?: number
}

interface PaymentsState {
  payments: Payment[]
  loading: boolean
  error: string | null
}

const initialState: PaymentsState = {
  payments: [],
  loading: false,
  error: null,
}

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.payments = action.payload
    },
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.payments.push(action.payload)
    },
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.payments.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.payments[index] = action.payload
      }
    },
    refundPayment: (state, action: PayloadAction<{ id: string; refundAmount: number }>) => {
      const payment = state.payments.find((p) => p.id === action.payload.id)
      if (payment) {
        payment.status = "refunded"
        payment.refundAmount = action.payload.refundAmount
        payment.refundedAt = new Date().toISOString()
      }
    },
  },
})

export const { setPayments, addPayment, updatePayment, refundPayment } = paymentsSlice.actions
export default paymentsSlice.reducer
