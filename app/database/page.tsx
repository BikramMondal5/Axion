"use client"

import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DatabaseContent } from "@/components/database-content"
import { Toaster } from "@/components/ui/toaster"

export default function DatabasePage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar />
        <DatabaseContent />
      </div>
      <Toaster />
    </div>
  )
}
