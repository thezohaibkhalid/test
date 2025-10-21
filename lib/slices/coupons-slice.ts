import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  maxUses: number
  currentUses: number
  minOrderValue: number
  startDate: Date
  endDate: Date
  isActive: boolean
  description: string
  applicableItems?: string[]
}

interface CouponsState {
  coupons: Coupon[]
  loading: boolean
  error: string | null
}

const initialState: CouponsState = {
  coupons: [],
  loading: false,
  error: null,
}

export const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    setCoupons: (state, action: PayloadAction<Coupon[]>) => {
      state.coupons = action.payload
    },
    addCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupons.push(action.payload)
    },
    updateCoupon: (state, action: PayloadAction<Coupon>) => {
      const index = state.coupons.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) {
        state.coupons[index] = action.payload
      }
    },
    deleteCoupon: (state, action: PayloadAction<string>) => {
      state.coupons = state.coupons.filter((c) => c.id !== action.payload)
    },
    toggleCouponStatus: (state, action: PayloadAction<string>) => {
      const coupon = state.coupons.find((c) => c.id === action.payload)
      if (coupon) {
        coupon.isActive = !coupon.isActive
      }
    },
    incrementCouponUses: (state, action: PayloadAction<string>) => {
      const coupon = state.coupons.find((c) => c.id === action.payload)
      if (coupon && coupon.currentUses < coupon.maxUses) {
        coupon.currentUses += 1
      }
    },
  },
})

export const { setCoupons, addCoupon, updateCoupon, deleteCoupon, toggleCouponStatus, incrementCouponUses } =
  couponsSlice.actions
export default couponsSlice.reducer
