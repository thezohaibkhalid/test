import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface ReportData {
  date: string
  orders: number
  revenue: number
  avgOrderValue: number
  customers: number
  topItems: Array<{ name: string; quantity: number; revenue: number }>
}

export interface MetaAd {
  id: string
  name: string
  platform: "facebook" | "instagram" | "both"
  status: "active" | "paused" | "ended"
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  roas: number
  startDate: string
  endDate: string
}

interface ReportsState {
  reports: ReportData[]
  metaAds: MetaAd[]
  selectedReport: ReportData | null
  selectedAd: MetaAd | null
  loading: boolean
}

const initialState: ReportsState = {
  reports: [],
  metaAds: [],
  selectedReport: null,
  selectedAd: null,
  loading: false,
}

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<ReportData[]>) => {
      state.reports = action.payload
    },
    setMetaAds: (state, action: PayloadAction<MetaAd[]>) => {
      state.metaAds = action.payload
    },
    selectReport: (state, action: PayloadAction<ReportData | null>) => {
      state.selectedReport = action.payload
    },
    selectAd: (state, action: PayloadAction<MetaAd | null>) => {
      state.selectedAd = action.payload
    },
    updateAdStatus: (state, action: PayloadAction<{ id: string; status: MetaAd["status"] }>) => {
      const ad = state.metaAds.find((a) => a.id === action.payload.id)
      if (ad) {
        ad.status = action.payload.status
      }
    },
  },
})

export const { setReports, setMetaAds, selectReport, selectAd, updateAdStatus } = reportsSlice.actions
export default reportsSlice.reducer
