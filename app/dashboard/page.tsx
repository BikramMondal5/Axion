"use client"

import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </div>
  )
}
