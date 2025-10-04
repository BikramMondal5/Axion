"use client"

import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { IntegrationContent } from "@/components/integration-content"

export default function IntegrationPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar />
        <IntegrationContent />
      </div>
    </div>
  )
}
