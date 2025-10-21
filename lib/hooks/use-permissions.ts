import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

export const usePermissions = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const perms = useSelector((state: RootState) => state.auth.perms)

  const hasPermission = (permission: string | string[]): boolean => {
    if (Array.isArray(permission)) {
      return permission.some((p) => perms.includes(p))
    }
    return perms.includes(permission)
  }

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every((p) => perms.includes(p))
  }

  return {
    user,
    permissions: perms,
    hasPermission,
    hasAllPermissions,
  }
}
