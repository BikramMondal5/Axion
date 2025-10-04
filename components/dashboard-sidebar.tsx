"use client"

import { useState } from "react"
import { Layers, Plus, TrendingUp, Database, Settings, Puzzle, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"

const navItems = [
  { icon: Layers, label: "All Agents", href: "/dashboard" },
  { icon: Plus, label: "Create New Agent", href: "/create_agent" },
  { icon: TrendingUp, label: "Analytics", href: "/analytics" },
  { icon: Database, label: "Database", href: "/user_database" },
  { icon: Puzzle, label: "Integration", href: "/Integration" },
  { icon: Settings, label: "Settings", href: "/user_setting" },
]

interface DashboardSidebarProps {
  mobileMenuOpen?: boolean
  setMobileMenuOpen?: (open: boolean) => void
}

export function DashboardSidebar({ mobileMenuOpen = false, setMobileMenuOpen }: DashboardSidebarProps) {
  const [activeItem, setActiveItem] = useState("All Agents")
  const isMobile = useIsMobile()

  const SidebarContent = () => (
    <div className="flex h-full flex-col p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-white">Your Agents ⚙️</h2>
      </div>
      <nav className="flex-1 space-y-1 sm:space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.label
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => {
                setActiveItem(item.label)
                if (isMobile && setMobileMenuOpen) {
                  setMobileMenuOpen(false)
                }
              }}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-200 ${
                  isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-indigo-400"
                }`}
              />
              <span className="text-xs sm:text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r border-white/5 bg-black/95 backdrop-blur-md transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <SidebarContent />
        </aside>
      </>
    )
  }

  // Desktop Sidebar
  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-48 lg:w-64 border-r border-white/5 bg-black/20 backdrop-blur-md">
      <SidebarContent />
    </aside>
  )
}

// Mobile Menu Button Component
export function MobileSidebarToggle({ 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: { 
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void 
}) {
  const isMobile = useIsMobile()
  
  if (!isMobile) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-20 left-4 z-30 bg-black/50 text-white hover:bg-black/70 lg:hidden"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  )
}
