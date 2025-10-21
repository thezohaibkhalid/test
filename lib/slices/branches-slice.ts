import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Branch {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  manager: string
  status: "active" | "inactive" | "maintenance"
  openingTime: string
  closingTime: string
  latitude: number
  longitude: number
  deliveryRadius: number
  createdAt: string
}

interface BranchesState {
  branches: Branch[]
  loading: boolean
  error: string | null
}

const initialState: BranchesState = {
  branches: [],
  loading: false,
  error: null,
}

export const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    setBranches: (state, action: PayloadAction<Branch[]>) => {
      state.branches = action.payload
    },
    addBranch: (state, action: PayloadAction<Branch>) => {
      state.branches.push(action.payload)
    },
    updateBranch: (state, action: PayloadAction<Branch>) => {
      const index = state.branches.findIndex((b) => b.id === action.payload.id)
      if (index !== -1) {
        state.branches[index] = action.payload
      }
    },
    deleteBranch: (state, action: PayloadAction<string>) => {
      state.branches = state.branches.filter((b) => b.id !== action.payload)
    },
    toggleBranchStatus: (state, action: PayloadAction<string>) => {
      const branch = state.branches.find((b) => b.id === action.payload)
      if (branch) {
        branch.status = branch.status === "active" ? "inactive" : "active"
      }
    },
  },
})

export const { setBranches, addBranch, updateBranch, deleteBranch, toggleBranchStatus } = branchesSlice.actions
export default branchesSlice.reducer
