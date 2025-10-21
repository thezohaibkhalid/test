import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Permission {
  id: string
  name: string
  description: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "frontdesk" | "rider"
  permissions: Permission[]
}

interface AuthState {
  user: User | null
  perms: string[]
  branchScope: "ALL" | string[]
  status: "authenticated" | "guest"
}

const initialState: AuthState = {
  user: null,
  perms: [],
  branchScope: "ALL",
  status: "guest",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      if (action.payload.email === "admin@example.com") {
        state.user = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          permissions: [
            { id: "1", name: "view-dashboard", description: "View dashboard" },
            { id: "2", name: "manage-orders", description: "Manage orders" },
            { id: "3", name: "manage-menu", description: "Manage menu" },
            { id: "4", name: "manage-riders", description: "Manage riders" },
            { id: "5", name: "manage-staff", description: "Manage staff" },
            { id: "6", name: "manage-customers", description: "Manage customers" },
            { id: "7", name: "manage-coupons", description: "Manage coupons" },
            { id: "8", name: "view-reports", description: "View reports" },
            { id: "9", name: "manage-settings", description: "Manage settings" },
            { id: "10", name: "edit-order", description: "Edit orders" },
            { id: "11", name: "delete-order", description: "Delete orders" },
            { id: "12", name: "assign-rider", description: "Assign riders" },
            { id: "13", name: "view-analytics", description: "View analytics" },
          ],
        }
        state.perms = state.user.permissions.map((p) => p.name)
        state.branchScope = "ALL"
        state.status = "authenticated"
      }
    },
    logout: (state) => {
      state.user = null
      state.perms = []
      state.branchScope = "ALL"
      state.status = "guest"
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
