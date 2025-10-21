  "use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersManagement } from "@/components/users-management"
import { RolesManagement } from "@/components/roles-management"
import { IntegrationsManagement } from "@/components/integrations-management"
import { StaffPasswordManager } from "@/components/staff-password-manager"
import { StaffInsights } from "@/components/staff-insights"
import { ThemeToggle } from "@/components/theme-toggle"
import { DSCard } from "@/components/ds-card"
import { mockFrontdeskStaff, mockRiderStaff, mockStaffInsights } from "@/lib/mock-data"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <ThemeToggle />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="staff-passwords">Staff Passwords</TabsTrigger>
          <TabsTrigger value="staff-insights">Staff Insights</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <UsersManagement />
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <RolesManagement />
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <IntegrationsManagement />
        </TabsContent>

        <TabsContent value="staff-passwords" className="mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Frontdesk Staff</h2>
              <p className="text-muted-foreground mb-4">Manage passwords for frontdesk team members</p>
              <StaffPasswordManager staffMembers={mockFrontdeskStaff} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Rider Staff</h2>
              <p className="text-muted-foreground mb-4">Manage passwords for delivery riders</p>
              <StaffPasswordManager staffMembers={mockRiderStaff} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="staff-insights" className="mt-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Staff Performance Insights</h2>
              <p className="text-muted-foreground mb-4">Monitor staff performance metrics and analytics</p>
            </div>
            <StaffInsights insights={mockStaffInsights} />
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <div className="space-y-6">
            <DSCard className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Theme Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                  <div>
                    <h3 className="font-semibold text-foreground">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
                  </div>
                  <ThemeToggle />
                </div>

                <div className="p-4 border border-border rounded-lg bg-card">
                  <h3 className="font-semibold text-foreground mb-2">Color Scheme</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The app uses a modern color system with primary (indigo), success (emerald), warning (amber), and
                    danger (rose) colors.
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="h-12 rounded-lg bg-primary"></div>
                      <p className="text-xs font-medium text-foreground">Primary</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 rounded-lg bg-success"></div>
                      <p className="text-xs font-medium text-foreground">Success</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 rounded-lg bg-warning"></div>
                      <p className="text-xs font-medium text-foreground">Warning</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 rounded-lg bg-danger"></div>
                      <p className="text-xs font-medium text-foreground">Danger</p>
                    </div>
                  </div>
                </div>
              </div>
            </DSCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
