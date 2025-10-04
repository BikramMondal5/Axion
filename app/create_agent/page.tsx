"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { DashboardSidebar, MobileSidebarToggle } from "@/components/dashboard-sidebar"
import { AgentCreationWizard } from "@/components/agent-creation-wizard"

export default function CreateAgentPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />
        <div className="flex-1 overflow-hidden">
          <MobileSidebarToggle 
            mobileMenuOpen={mobileMenuOpen} 
            setMobileMenuOpen={setMobileMenuOpen} 
          />
          <AgentCreationWizard />
        </div>
      </div>
    </div>
  )
}
