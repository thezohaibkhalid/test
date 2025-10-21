import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/lib/slices/auth-slice"
import uiReducer from "@/lib/slices/ui-slice"
import dashboardReducer from "@/lib/slices/dashboard-slice"
import ordersReducer from "@/lib/slices/orders-slice"
import ridersReducer from "@/lib/slices/riders-slice"
import menuReducer from "@/lib/slices/menu-slice"
import frontdeskReducer from "@/lib/slices/frontdesk-slice"
import customersReducer from "@/lib/slices/customers-slice"
import campaignsReducer from "@/lib/slices/campaigns-slice"
import reportsReducer from "@/lib/slices/reports-slice"
import settingsReducer from "@/lib/slices/settings-slice"
import couponsReducer from "@/lib/slices/coupons-slice"
import paymentsReducer from "@/lib/slices/payments-slice"
import branchesReducer from "@/lib/slices/branches-slice"
import themeReducer from "@/lib/slices/theme-slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    dashboard: dashboardReducer,
    orders: ordersReducer,
    riders: ridersReducer,
    menu: menuReducer,
    frontdesk: frontdeskReducer,
    customers: customersReducer,
    campaigns: campaignsReducer,
    reports: reportsReducer,
    settings: settingsReducer,
    coupons: couponsReducer,
    payments: paymentsReducer,
    branches: branchesReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
