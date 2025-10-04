"use client"
import { Mail, Calendar, MessageSquare, FileText, Table, Webhook } from "lucide-react"
import type { AgentData } from "@/components/agent-creation-wizard"

interface IntegrationsStepProps {
  agentData: AgentData
  updateAgentData: (updates: Partial<AgentData>) => void
}

const integrations = [
  { id: "gmail", name: "Gmail", icon: Mail, color: "from-red-500 to-orange-500" },
  { id: "calendar", name: "Google Calendar", icon: Calendar, color: "from-blue-500 to-cyan-500" },
  { id: "slack", name: "Slack", icon: MessageSquare, color: "from-purple-500 to-pink-500" },
  { id: "notion", name: "Notion", icon: FileText, color: "from-gray-600 to-gray-800" },
  { id: "sheets", name: "Google Sheets", icon: Table, color: "from-green-500 to-emerald-500" },
  { id: "webhook", name: "Custom Webhook", icon: Webhook, color: "from-indigo-500 to-purple-500" },
]

export function IntegrationsStep({ agentData, updateAgentData }: IntegrationsStepProps) {
  const toggleIntegration = (integrationId: string) => {
    const currentIntegrations = agentData.integrations || []
    const isConnected = currentIntegrations.includes(integrationId)

    if (isConnected) {
      updateAgentData({
        integrations: currentIntegrations.filter((id) => id !== integrationId),
      })
    } else {
      updateAgentData({
        integrations: [...currentIntegrations, integrationId],
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Connect Tools & Data Sources</h2>
        <p className="mt-2 text-sm text-slate-400">Select the tools and services your agent will interact with</p>
      </div>

      {/* Integrations Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => {
          const isConnected = agentData.integrations.includes(integration.id)
          const Icon = integration.icon

          return (
            <button
              key={integration.id}
              onClick={() => toggleIntegration(integration.id)}
              className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all ${
                isConnected
                  ? "border-purple-500 bg-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                  : "border-slate-700 bg-black/40 hover:border-slate-600 hover:bg-white/5"
              }`}
            >
              {/* Glow Effect on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${integration.color} opacity-0 transition-opacity group-hover:opacity-10`}
              />

              <div className="relative space-y-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${integration.color} shadow-lg`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">{integration.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{isConnected ? "✓ Connected" : "Click to connect"}</p>
                </div>
              </div>

              {/* Connected Badge */}
              {isConnected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
        <p className="text-sm text-cyan-300">
          🔒 <strong>No coding required</strong> — Just authorize and connect. Your credentials are securely encrypted.
        </p>
      </div>
    </div>
  )
}
