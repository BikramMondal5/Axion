"use client"

import { useState } from "react"
import { Layers, Plus, TrendingUp, Database, Settings, Puzzle } from "lucide-react"
import Link from "next/link"

const navItems = [
  { icon: Layers, label: "All Agents", href: "/dashboard" },
  { icon: Plus, label: "Create New Agent", href: "/create_agent" },
  { icon: TrendingUp, label: "Analytics", href: "/analytics" },
  { icon: Database, label: "Database", href: "/user_database" },
  { icon: Puzzle, label: "Integration", href: "/Integration" },
  { icon: Settings, label: "Settings", href: "/user_setting" },
]

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("All Agents")

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-white/5 bg-black/20 backdrop-blur-md">
      <div className="flex h-full flex-col p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white">Your Agents ⚙️</h2>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.label
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-all duration-200 ${
                    isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-indigo-400"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
