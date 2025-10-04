"use client"

import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AnalyticsContent } from "@/components/analytics-content"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar />
        <AnalyticsContent />
      </div>
    </div>
  )
}
