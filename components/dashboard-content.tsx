"use client"

import { Button } from "@/components/ui/button"
import { AgentCard } from "@/components/agent-card"
import { Plus, BookOpen } from "lucide-react"

const agents = [
  {
    id: 1,
    name: "Customer Support Bot",
    model: "GPT-4",
    status: "Active",
    requests: 1247,
    uptime: 99.8,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Code Review Assistant",
    model: "Claude 3.5",
    status: "Active",
    requests: 892,
    uptime: 98.5,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Data Analyzer",
    model: "Gemini Pro",
    status: "Paused",
    requests: 543,
    uptime: 95.2,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "Content Generator",
    model: "GPT-4",
    status: "Active",
    requests: 2103,
    uptime: 99.9,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "Email Classifier",
    model: "Claude 3",
    status: "Draft",
    requests: 0,
    uptime: 0,
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 6,
    name: "Sentiment Analyzer",
    model: "GPT-3.5",
    status: "Active",
    requests: 678,
    uptime: 97.3,
    color: "from-yellow-500 to-orange-500",
  },
]

export function DashboardContent() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-white">Your AI Agents Overview</h1>
        <p className="text-sm sm:text-base text-slate-400">Manage, deploy, and track your agents in real time.</p>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3">
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Agent
        </Button>
        <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 w-full sm:w-auto">
          <BookOpen className="mr-2 h-4 w-4" />
          Docs
        </Button>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 sm:mt-12">
        <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-white">Recent Activity</h2>
        <div className="space-y-3 rounded-lg border border-white/5 bg-black/20 p-4 sm:p-6 backdrop-blur-sm">
          <ActivityItem title="Customer Support Bot deployed" time="2 minutes ago" type="success" />
          <ActivityItem title="New API key created for Code Review Assistant" time="15 minutes ago" type="info" />
          <ActivityItem title="Data Analyzer paused by user" time="1 hour ago" type="warning" />
          <ActivityItem title="Content Generator reached 2000 requests" time="3 hours ago" type="success" />
        </div>
      </div>
    </main>
  )
}

function ActivityItem({ title, time, type }: { title: string; time: string; type: "success" | "info" | "warning" }) {
  const colors = {
    success: "bg-green-500/20 text-green-400",
    info: "bg-blue-500/20 text-blue-400",
    warning: "bg-yellow-500/20 text-yellow-400",
  }

  return (
    <div className="flex items-start sm:items-center gap-3 text-xs sm:text-sm">
      <div className={`h-2 w-2 rounded-full ${colors[type]} mt-1 sm:mt-0 flex-shrink-0`} />
      <span className="flex-1 text-slate-300 leading-relaxed">{title}</span>
      <span className="text-slate-500 text-xs whitespace-nowrap">{time}</span>
    </div>
  )
}
