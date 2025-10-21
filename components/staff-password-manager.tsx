"use client"

import { useState } from "react"
import { DSButton } from "./ds-button"
import { DSInput } from "./ds-input"
import { DSCard } from "./ds-card"
import { DSDialog } from "./ds-dialog"
import { Eye, EyeOff, Lock } from "lucide-react"

interface StaffMember {
  id: string
  name: string
  role: "frontdesk" | "rider"
  email: string
  lastPasswordChange?: string
}

interface StaffPasswordManagerProps {
  staffMembers: StaffMember[]
}

export function StaffPasswordManager({ staffMembers }: StaffPasswordManagerProps) {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleResetPassword = (staff: StaffMember) => {
    setSelectedStaff(staff)
    setNewPassword("")
    setConfirmPassword("")
    setShowPassword(false)
    setIsOpen(true)
  }

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters")
      return
    }
    // Here you would call an API to update the password
    console.log(`Password updated for ${selectedStaff?.name}`)
    setIsOpen(false)
    setSelectedStaff(null)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {staffMembers.map((staff) => (
          <DSCard key={staff.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{staff.name}</h3>
                <p className="text-sm text-muted-foreground">{staff.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Role: <span className="capitalize">{staff.role}</span>
                </p>
                {staff.lastPasswordChange && (
                  <p className="text-xs text-muted-foreground">Last changed: {staff.lastPasswordChange}</p>
                )}
              </div>
              <DSButton
                variant="outline"
                size="sm"
                onClick={() => handleResetPassword(staff)}
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Reset Password
              </DSButton>
            </div>
          </DSCard>
        ))}
      </div>

      <DSDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Reset Password"
        description={`Set new password for ${selectedStaff?.name}`}
      >
        <div className="space-y-4">
          <div className="relative">
            <DSInput
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="relative">
            <DSInput
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex gap-2 justify-end">
            <DSButton variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </DSButton>
            <DSButton onClick={handleSavePassword}>Save Password</DSButton>
          </div>
        </div>
      </DSDialog>
    </div>
  )
}
