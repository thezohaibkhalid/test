import { StaffProfile } from "@/components/staff-profile"

interface StaffDetailPageProps {
  params: {
    staffId: string
  }
}

export default function StaffDetailPage({ params }: StaffDetailPageProps) {
  return <StaffProfile staffId={params.staffId} />
}
