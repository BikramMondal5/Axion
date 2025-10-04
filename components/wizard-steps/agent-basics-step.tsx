"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Info,
  Bot,
  Rocket,
  Lightbulb,
  Zap,
  Target,
  Flame,
  Sparkles,
  Star,
  Briefcase,
  Mail,
  BarChart3,
  Palette,
} from "lucide-react" // add lucide icons for avatar selection
import type { AgentData } from "@/components/agent-creation-wizard"

interface AgentBasicsStepProps {
  agentData: AgentData
  updateAgentData: (updates: Partial<AgentData>) => void
}

const iconOptions = [
  { id: "bot", label: "Bot", icon: Bot, color: "from-purple-600 to-indigo-600" },
  { id: "rocket", label: "Rocket", icon: Rocket, color: "from-cyan-500 to-blue-500" },
  { id: "lightbulb", label: "Ideas", icon: Lightbulb, color: "from-amber-500 to-orange-600" },
  { id: "zap", label: "Power", icon: Zap, color: "from-yellow-400 to-amber-500" },
  { id: "target", label: "Focus", icon: Target, color: "from-fuchsia-600 to-pink-600" },
  { id: "flame", label: "Hot", icon: Flame, color: "from-rose-500 to-red-600" },
  { id: "sparkles", label: "Magic", icon: Sparkles, color: "from-emerald-500 to-teal-500" },
  { id: "star", label: "Star", icon: Star, color: "from-indigo-500 to-purple-500" },
  { id: "briefcase", label: "Work", icon: Briefcase, color: "from-slate-600 to-slate-800" },
  { id: "mail", label: "Mail", icon: Mail, color: "from-blue-500 to-cyan-500" },
  { id: "barchart", label: "Analytics", icon: BarChart3, color: "from-green-500 to-emerald-500" },
  { id: "palette", label: "Design", icon: Palette, color: "from-violet-500 to-purple-600" },
]

export function AgentBasicsStep({ agentData, updateAgentData }: AgentBasicsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Agent Basics</h2>
        <p className="mt-2 text-sm text-slate-400">Let's start with the fundamentals of your AI agent</p>
      </div>

      {/* Agent Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-slate-300">
          Agent Name
        </Label>
        <Input
          id="name"
          placeholder="e.g., TaskMaster, MailBuddy"
          value={agentData.name}
          onChange={(e) => updateAgentData({ name: e.target.value })}
          className="border-slate-700 bg-black/40 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="description" className="text-slate-300">
            Short Description
          </Label>
          <div className="group relative">
            <Info className="h-4 w-4 text-slate-500" />
            <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-lg border border-purple-500/20 bg-black/90 p-3 text-xs text-slate-300 backdrop-blur-sm group-hover:block">
              Describe what you want your agent to do in simple terms
            </div>
          </div>
        </div>
        <Textarea
          id="description"
          placeholder="What do you want your agent to do?"
          value={agentData.description}
          onChange={(e) => updateAgentData({ description: e.target.value })}
          rows={4}
          className="border-slate-700 bg-black/40 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-slate-300">
          Purpose Category
        </Label>
        <Select value={agentData.category} onValueChange={(value) => updateAgentData({ category: value })}>
          <SelectTrigger className="border-slate-700 bg-black/40 text-white focus:border-purple-500 focus:ring-purple-500/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-slate-700 bg-black/90 text-white backdrop-blur-sm">
            <SelectItem value="Productivity">Productivity</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Automation">Automation</SelectItem>
            <SelectItem value="Customer Support">Customer Support</SelectItem>
            <SelectItem value="Data Analysis">Data Analysis</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Icon Selection */}
      <div className="space-y-2">
        <Label className="text-slate-300">Select Icon/Avatar</Label>
        <div className="grid grid-cols-6 gap-3">
          {iconOptions.map((opt) => {
            const Icon = opt.icon
            const selected = agentData.icon === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                aria-label={`Select ${opt.label} icon`}
                aria-pressed={selected}
                onClick={() => updateAgentData({ icon: opt.id })}
                className={`group relative flex h-12 w-12 items-center justify-center rounded-lg transition-all ${
                  selected
                    ? "shadow-[0_0_20px_rgba(168,85,247,0.4)] ring-2 ring-purple-500/80"
                    : "hover:bg-white/5 ring-1 ring-transparent"
                } bg-black/40`}
              >
                <div
                  className={`absolute inset-0 -z-10 rounded-lg bg-gradient-to-br ${opt.color} opacity-0 transition-opacity group-hover:opacity-20 ${selected ? "opacity-20" : ""}`}
                />
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${opt.color}`}>
                  <Icon className="h-5 w-5 text-white drop-shadow" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
