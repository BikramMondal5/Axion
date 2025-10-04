"use client"

import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AgentCreationWizard } from "@/components/agent-creation-wizard"

export default function CreateAgentPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar />
        <div className="flex-1">
          <AgentCreationWizard />
        </div>
      </div>
    </div>
  )
}
