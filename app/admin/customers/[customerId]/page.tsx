"use client"
import { CustomerProfile } from "@/components/customer-profile"

interface CustomerDetailPageProps {
  params: {
    customerId: string
  }
}

export default function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  return <CustomerProfile customerId={params.customerId} />
}
