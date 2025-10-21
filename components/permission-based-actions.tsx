"use client"

import { usePermissions } from "@/lib/hooks/use-permissions"
import { DSButton } from "./ds-button"
import { Edit, Trash2, Eye } from "lucide-react"

interface PermissionBasedActionsProps {
  itemId: string
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onView?: (id: string) => void
  editPermission?: string
  deletePermission?: string
  viewPermission?: string
}

export function PermissionBasedActions({
  itemId,
  onEdit,
  onDelete,
  onView,
  editPermission = "edit-order",
  deletePermission = "delete-order",
  viewPermission = "view-order",
}: PermissionBasedActionsProps) {
  const { hasPermission } = usePermissions()

  return (
    <div className="flex items-center gap-2">
      {hasPermission(viewPermission) && onView && (
        <DSButton variant="ghost" size="sm" onClick={() => onView(itemId)} title="View details">
          <Eye className="h-4 w-4" />
        </DSButton>
      )}

      {hasPermission(editPermission) && onEdit && (
        <DSButton variant="ghost" size="sm" onClick={() => onEdit(itemId)} title="Edit">
          <Edit className="h-4 w-4" />
        </DSButton>
      )}

      {hasPermission(deletePermission) && onDelete && (
        <DSButton
          variant="ghost"
          size="sm"
          onClick={() => onDelete(itemId)}
          title="Delete"
          className="text-danger hover:text-danger"
        >
          <Trash2 className="h-4 w-4" />
        </DSButton>
      )}
    </div>
  )
}
