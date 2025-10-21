import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Campaign {
  id: string
  name: string
  type: "discount" | "loyalty" | "seasonal" | "referral"
  status: "active" | "scheduled" | "ended"
  startDate: string
  endDate: string
  description: string
  discountValue: number
  discountType: "percentage" | "fixed"
  minOrderValue: number
  maxUses: number
  usedCount: number
  targetAudience: string[]
}

export interface Banner {
  id: string
  title: string
  description: string
  imageUrl: string
  link: string
  status: "active" | "inactive"
  position: "hero" | "sidebar" | "footer"
  startDate: string
  endDate: string
  clicks: number
  impressions: number
}

interface CampaignsState {
  campaigns: Campaign[]
  banners: Banner[]
  selectedCampaign: Campaign | null
  selectedBanner: Banner | null
  loading: boolean
}

const initialState: CampaignsState = {
  campaigns: [],
  banners: [],
  selectedCampaign: null,
  selectedBanner: null,
  loading: false,
}

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    setCampaigns: (state, action: PayloadAction<Campaign[]>) => {
      state.campaigns = action.payload
    },
    setBanners: (state, action: PayloadAction<Banner[]>) => {
      state.banners = action.payload
    },
    selectCampaign: (state, action: PayloadAction<Campaign | null>) => {
      state.selectedCampaign = action.payload
    },
    selectBanner: (state, action: PayloadAction<Banner | null>) => {
      state.selectedBanner = action.payload
    },
    updateCampaignStatus: (state, action: PayloadAction<{ id: string; status: Campaign["status"] }>) => {
      const campaign = state.campaigns.find((c) => c.id === action.payload.id)
      if (campaign) {
        campaign.status = action.payload.status
      }
    },
    updateBannerStatus: (state, action: PayloadAction<{ id: string; status: Banner["status"] }>) => {
      const banner = state.banners.find((b) => b.id === action.payload.id)
      if (banner) {
        banner.status = action.payload.status
      }
    },
  },
})

export const { setCampaigns, setBanners, selectCampaign, selectBanner, updateCampaignStatus, updateBannerStatus } =
  campaignsSlice.actions
export default campaignsSlice.reducer
