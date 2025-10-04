"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Settings, Trash2 } from "lucide-react"
import { useState } from "react"

interface Agent {
  id: number
  name: string
  model: string
  status: string
  requests: number
  uptime: number
  color: string
}

export function AgentCard({ agent }: { agent: Agent }) {
  const [isHovered, setIsHovered] = useState(false)

  const statusColors = {
    Active: "bg-green-500/20 text-green-400 border-green-500/30",
    Paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Draft: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  }

  return (
    <Card
      className="group relative overflow-hidden border border-white/5 bg-[#121212] p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Glow Effect */}
      <div
        className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${agent.color} opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20`}
      />

      {/* Card Content */}
      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-lg font-semibold text-white">{agent.name}</h3>
            <p className="text-sm text-slate-400">{agent.model}</p>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              statusColors[agent.status as keyof typeof statusColors]
            }`}
          >
            {agent.status}
          </span>
        </div>

        {/* Stats */}
        <div className="mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Requests</span>
            <span className="font-medium text-white">{agent.requests.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Uptime</span>
            <span className="font-medium text-white">{agent.uptime}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className={`h-full bg-gradient-to-r ${agent.color} transition-all duration-300`}
            style={{ width: `${agent.uptime}%` }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-white/5 text-white hover:bg-white/10">
            <Play className="mr-1 h-3 w-3" />
            Deploy
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-400 hover:bg-white/5 hover:text-white">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-400 hover:bg-white/5 hover:text-red-400">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
