"use client"

import type React from "react"

import { usePermissions } from "@/lib/hooks/use-permissions"

interface PermissionGuardProps {
  permission: string | string[]
  children: React.ReactNode
  fallback?: React.ReactNode
  requireAll?: boolean
}

export function PermissionGuard({ permission, children, fallback = null, requireAll = false }: PermissionGuardProps) {
  const { hasPermission, hasAllPermissions } = usePermissions()

  const hasAccess = requireAll
    ? hasAllPermissions(Array.isArray(permission) ? permission : [permission])
    : hasPermission(permission)

  return hasAccess ? <>{children}</> : <>{fallback}</>
}
