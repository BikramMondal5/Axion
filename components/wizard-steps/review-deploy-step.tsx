"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Rocket, Save } from "lucide-react"
import type { AgentData } from "@/components/agent-creation-wizard"

interface ReviewDeployStepProps {
  agentData: AgentData
  updateAgentData: (updates: Partial<AgentData>) => void
}

export function ReviewDeployStep({ agentData }: ReviewDeployStepProps) {
  const [isDeployed, setIsDeployed] = useState(false)

  const handleDeploy = () => {
    // Simulate deployment
    setTimeout(() => {
      setIsDeployed(true)
    }, 1000)
  }

  if (isDeployed) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
          <Check className="h-10 w-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">🎉 Your Agent is Live!</h2>
          <p className="mt-2 text-slate-400">Access it from the Dashboard or share it via API</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700">
            Go to Dashboard
          </Button>
          <Button variant="outline" className="border-slate-700 bg-transparent text-slate-300 hover:bg-white/5">
            View API Docs
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Review & Deploy</h2>
        <p className="mt-2 text-sm text-slate-400">Review your agent configuration before deployment</p>
      </div>

      {/* Summary Card */}
      <Card className="border-slate-700 bg-black/40 p-6">
        <div className="space-y-4">
          {/* Agent Info */}
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-3xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              {agentData.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{agentData.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{agentData.description}</p>
              <Badge variant="secondary" className="mt-2 bg-purple-500/20 text-purple-300">
                {agentData.category}
              </Badge>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

          {/* Configuration Details */}
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">AI Model</span>
              <span className="font-medium text-white">{agentData.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Creativity Level</span>
              <span className="font-medium text-white">
                {agentData.creativity < 33 ? "Precise" : agentData.creativity < 66 ? "Balanced" : "Creative"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Memory</span>
              <span className="font-medium text-white">{agentData.enableMemory ? "Enabled" : "Disabled"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Connected Tools</span>
              <span className="font-medium text-white">
                {agentData.integrations.length > 0 ? `${agentData.integrations.length} tools` : "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Trigger Type</span>
              <span className="font-medium text-white capitalize">{agentData.trigger}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Notifications</span>
              <span className="font-medium text-white">{agentData.enableNotifications ? "Enabled" : "Disabled"}</span>
            </div>
          </div>

          {agentData.integrations.length > 0 && (
            <>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              <div>
                <p className="mb-2 text-sm text-slate-400">Connected Integrations</p>
                <div className="flex flex-wrap gap-2">
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
            </>
          )}
        </div>
      </Card>

      {/* Estimated Cost (Optional) */}
      <Card className="border-purple-500/20 bg-purple-500/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-200">Estimated Monthly Cost</p>
            <p className="text-xs text-purple-300/70">Based on average usage</p>
          </div>
          <p className="text-2xl font-bold text-purple-300">$12/mo</p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleDeploy}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          <Rocket className="mr-2 h-4 w-4" />
          Deploy Agent
        </Button>
        <Button variant="outline" className="border-slate-700 bg-transparent text-slate-300 hover:bg-white/5">
          <Save className="mr-2 h-4 w-4" />
          Save as Draft
        </Button>
      </div>
    </div>
  )
}
