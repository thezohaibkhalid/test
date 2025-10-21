import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

interface UIState {
  theme: "light" | "dark"
  sidebarOpen: boolean
  toasts: Toast[]
  modals: Record<string, boolean>
}

const initialState: UIState = {
  theme: "light",
  sidebarOpen: true,
  toasts: [],
  modals: {},
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
    },
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      const id = Date.now().toString()
      state.toasts.push({ ...action.payload, id })
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload)
    },
    setModal: (state, action: PayloadAction<{ name: string; open: boolean }>) => {
      state.modals[action.payload.name] = action.payload.open
    },
  },
})

export const { toggleSidebar, setTheme, addToast, removeToast, setModal } = uiSlice.actions
export default uiSlice.reducer
