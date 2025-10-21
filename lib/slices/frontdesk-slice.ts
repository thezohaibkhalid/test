import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface StaffMember {
  id: string
  name: string
  email: string
  phone: string
  role: "manager" | "cashier" | "kitchen" | "delivery"
  status: "active" | "inactive" | "on-leave"
  joinDate: string
  salary: number
  shifts: Shift[]
  performance: {
    ordersProcessed: number
    accuracy: number
    avgRating: number
  }
}

export interface Shift {
  id: string
  date: string
  startTime: string
  endTime: string
  status: "scheduled" | "completed" | "cancelled"
}

interface FrontdeskState {
  staff: StaffMember[]
  selectedStaff: StaffMember | null
  loading: boolean
}

const initialState: FrontdeskState = {
  staff: [],
  selectedStaff: null,
  loading: false,
}

const frontdeskSlice = createSlice({
  name: "frontdesk",
  initialState,
  reducers: {
    setStaff: (state, action: PayloadAction<StaffMember[]>) => {
      state.staff = action.payload
    },
    selectStaff: (state, action: PayloadAction<StaffMember | null>) => {
      state.selectedStaff = action.payload
    },
    updateStaffStatus: (state, action: PayloadAction<{ id: string; status: StaffMember["status"] }>) => {
      const staff = state.staff.find((s) => s.id === action.payload.id)
      if (staff) {
        staff.status = action.payload.status
      }
    },
    addShift: (state, action: PayloadAction<{ staffId: string; shift: Shift }>) => {
      const staff = state.staff.find((s) => s.id === action.payload.staffId)
      if (staff) {
        staff.shifts.push(action.payload.shift)
      }
    },
    updateShift: (state, action: PayloadAction<{ staffId: string; shiftId: string; shift: Shift }>) => {
      const staff = state.staff.find((s) => s.id === action.payload.staffId)
      if (staff) {
        const shift = staff.shifts.find((sh) => sh.id === action.payload.shiftId)
        if (shift) {
          Object.assign(shift, action.payload.shift)
        }
      }
    },
  },
})

export const { setStaff, selectStaff, updateStaffStatus, addShift, updateShift } = frontdeskSlice.actions
export default frontdeskSlice.reducer
