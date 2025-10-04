"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Zap,
  Calendar,
  Mail,
  Rocket,
  Lightbulb,
  Target,
  Flame,
  Sparkles,
  Star,
  Briefcase,
  BarChart3,
  Palette,
} from "lucide-react" // add lucide icons for preview
import type { AgentData } from "@/components/agent-creation-wizard"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bot: Bot,
  rocket: Rocket,
  lightbulb: Lightbulb,
  zap: Zap,
  target: Target,
  flame: Flame,
  sparkles: Sparkles,
  star: Star,
  briefcase: Briefcase,
  mail: Mail,
  barchart: BarChart3,
  palette: Palette,
}

interface AgentPreviewCardProps {
  agentData: AgentData
}

export function AgentPreviewCard({ agentData }: AgentPreviewCardProps) {
  const getTriggerIcon = () => {
    switch (agentData.trigger) {
      case "schedule":
        return <Calendar className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const PreviewIcon = iconMap[agentData.icon] || Bot

  return (
    <Card className="border-purple-500/20 bg-[#121212] p-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Live Preview</h3>
        <Bot className="h-5 w-5 text-purple-400" />
      </div>

      <div className="space-y-4">
        {/* Agent Icon & Name */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-3xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <PreviewIcon className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white">{agentData.name || "Untitled Agent"}</h4>
            <Badge variant="secondary" className="mt-1 bg-purple-500/20 text-purple-300">
              {agentData.category}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-slate-400">{agentData.description || "No description provided yet..."}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">AI Model</span>
            <span className="font-medium text-white">{agentData.model}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Creativity</span>
            <span className="font-medium text-white">
              {agentData.creativity < 33 ? "Precise" : agentData.creativity < 66 ? "Balanced" : "Creative"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Memory</span>
            <span className="font-medium text-white">{agentData.enableMemory ? "Enabled" : "Disabled"}</span>
          </div>

          {agentData.integrations.length > 0 && (
            <div>
              <span className="text-slate-400">Connected Tools</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {agentData.integrations.map((integration) => (
                  <Badge
                    key={integration}
                    variant="outline"
                    className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                  >
                    {integration}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Trigger</span>
            <div className="flex items-center gap-2">
              {getTriggerIcon()}
              <span className="font-medium text-white capitalize">
                {agentData.trigger === "manual" ? "Manual" : agentData.trigger}
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="rounded-lg bg-purple-500/10 p-3 text-center">
          <p className="text-xs text-purple-300">⚡ Ready to deploy once all steps are complete</p>
        </div>
      </div>
    </Card>
  )
}
