import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  name: string
  email: string
  role: Role["id"]
  status: "active" | "inactive"
  lastLogin: string
  createdAt: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

export interface Integration {
  id: string
  name: string
  type: "payment" | "delivery" | "analytics" | "communication"
  status: "connected" | "disconnected" | "error"
  lastSync: string
  config: Record<string, string>
}

interface SettingsState {
  users: User[]
  roles: Role[]
  integrations: Integration[]
  selectedUser: User | null
  selectedRole: Role | null
  loading: boolean
}

const initialState: SettingsState = {
  users: [],
  roles: [],
  integrations: [],
  selectedUser: null,
  selectedRole: null,
  loading: false,
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload
    },
    setIntegrations: (state, action: PayloadAction<Integration[]>) => {
      state.integrations = action.payload
    },
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload
    },
    selectRole: (state, action: PayloadAction<Role | null>) => {
      state.selectedRole = action.payload
    },
    updateUserStatus: (state, action: PayloadAction<{ id: string; status: User["status"] }>) => {
      const user = state.users.find((u) => u.id === action.payload.id)
      if (user) {
        user.status = action.payload.status
      }
    },
    updateIntegrationStatus: (state, action: PayloadAction<{ id: string; status: Integration["status"] }>) => {
      const integration = state.integrations.find((i) => i.id === action.payload.id)
      if (integration) {
        integration.status = action.payload.status
      }
    },
  },
})

export const {
  setUsers,
  setRoles,
  setIntegrations,
  selectUser,
  selectRole,
  updateUserStatus,
  updateIntegrationStatus,
} = settingsSlice.actions
export default settingsSlice.reducer
