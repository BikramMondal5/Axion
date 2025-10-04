"use client"

import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UserSettingsContent } from "@/components/user-settings-content"

export default function UserSettingsPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar />
        <UserSettingsContent />
      </div>
    </div>
  )
}
