"use client"

import type React from "react"

import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { RootState } from "@/lib/store"
import { SidebarNav } from "@/components/sidebar-nav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="max-w-64 overflow-hidden">
        <SidebarNav />
      </div>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}
