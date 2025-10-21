import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  lastOrderDate: string
  status: "active" | "inactive" | "vip"
  averageRating: number
  reviews: Review[]
}

export interface Review {
  id: string
  customerId: string
  orderId: string
  rating: number
  comment: string
  date: string
  items: string[]
}

interface CustomersState {
  customers: Customer[]
  selectedCustomer: Customer | null
  reviews: Review[]
  loading: boolean
}

const initialState: CustomersState = {
  customers: [],
  selectedCustomer: null,
  reviews: [],
  loading: false,
}

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload
    },
    selectCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload)
    },
  },
})

export const { setCustomers, selectCustomer, setReviews, addReview } = customersSlice.actions
export default customersSlice.reducer
