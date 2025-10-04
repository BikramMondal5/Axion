"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Info, Clock, Mail, Calendar, Zap } from "lucide-react"
import type { AgentData } from "@/components/agent-creation-wizard"

interface AutomationTriggersStepProps {
  agentData: AgentData
  updateAgentData: (updates: Partial<AgentData>) => void
}

const triggerExamples: Record<string, string> = {
  manual: "You'll trigger this agent manually whenever you need it.",
  schedule: "Your agent will run automatically at scheduled intervals (e.g., every day at 9 AM).",
  email: "Every time you receive a new email, this agent will process and respond instantly.",
  calendar: "When a new event is added to your calendar, this agent will take action automatically.",
}

export function AutomationTriggersStep({ agentData, updateAgentData }: AutomationTriggersStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Automation Triggers</h2>
        <p className="mt-2 text-sm text-slate-400">Define when and how your agent should run</p>
      </div>

      {/* Trigger Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="trigger" className="text-slate-300">
            When should your agent run?
          </Label>
          <div className="group relative">
            <Info className="h-4 w-4 text-slate-500" />
            <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-lg border border-purple-500/20 bg-black/90 p-3 text-xs text-slate-300 backdrop-blur-sm group-hover:block">
              Choose how your agent will be triggered to perform its tasks
            </div>
          </div>
        </div>
        <Select value={agentData.trigger} onValueChange={(value) => updateAgentData({ trigger: value })}>
          <SelectTrigger className="border-slate-700 bg-black/40 text-white focus:border-purple-500 focus:ring-purple-500/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-slate-700 bg-black/90 text-white backdrop-blur-sm">
            <SelectItem value="manual">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Manual Trigger
              </div>
            </SelectItem>
            <SelectItem value="schedule">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                On Schedule
              </div>
            </SelectItem>
            <SelectItem value="email">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                On Email Received
              </div>
            </SelectItem>
            <SelectItem value="calendar">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                On Calendar Event
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Example Text */}
      <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
        <p className="text-sm text-purple-200">💡 {triggerExamples[agentData.trigger]}</p>
      </div>

      {/* Schedule Input (conditional) */}
      {agentData.trigger === "schedule" && (
        <div className="space-y-2">
          <Label htmlFor="schedule" className="text-slate-300">
            Schedule Pattern
          </Label>
          <Input
            id="schedule"
            placeholder="e.g., Every day at 9:00 AM"
            value={agentData.triggerSchedule || ""}
            onChange={(e) => updateAgentData({ triggerSchedule: e.target.value })}
            className="border-slate-700 bg-black/40 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
          />
        </div>
      )}

      {/* Notifications Toggle */}
      <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-black/40 p-4">
        <div className="space-y-1">
          <Label htmlFor="notifications" className="text-slate-300">
            Enable Notifications
          </Label>
          <p className="text-xs text-slate-500">Get updates via email or dashboard alerts</p>
        </div>
        <Switch
          id="notifications"
          checked={agentData.enableNotifications}
          onCheckedChange={(checked) => updateAgentData({ enableNotifications: checked })}
          className="data-[state=checked]:bg-purple-600"
        />
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
        <p className="text-sm text-cyan-300">
          ⚡ <strong>Pro Tip:</strong> Start with manual triggers to test your agent, then switch to automation once
          you're confident.
        </p>
      </div>
    </div>
  )
}
