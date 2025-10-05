"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Rocket, Save, Copy, Link as LinkIcon } from "lucide-react"
import type { AgentData } from "@/components/agent-creation-wizard"

interface ReviewDeployStepProps {
  agentData: AgentData
  updateAgentData: (updates: Partial<AgentData>) => void
}

export function ReviewDeployStep({ agentData, updateAgentData }: ReviewDeployStepProps) {
  const [isDeployed, setIsDeployed] = useState(false)
  const [deploying, setDeploying] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [endpointUrl, setEndpointUrl] = useState<string | null>(null)

  const handleDeploy = async () => {
    setDeploying(true)
    setStatusMessage(null)

    try {
      const res = await fetch("/api/deploy-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agentData),
      })

      const payload = await res.json()

      // handle errors returned by the API
      if (!res.ok) {
        const errMsg = payload?.error || payload?.message || "Deployment failed"
        setStatusMessage(errMsg)
        setDeploying(false)
        return
      }

      // expected success payload shape: { success: boolean, log?: string, endpoint?: string }
      if (payload.success) {
        setIsDeployed(true)
        setStatusMessage("Deployment successful")
        if (payload.endpoint) setEndpointUrl(payload.endpoint)
      } else {
        // If CLI returned success: false but with logs / message
        const err = payload.log || payload.error || "Deployment returned failure"
        setStatusMessage(err)
      }
    } catch (err: any) {
      setStatusMessage(err?.message ?? "Network or server error")
    } finally {
      setDeploying(false)
    }
  }

  const copyEndpoint = async () => {
    if (!endpointUrl) return
    try {
      await navigator.clipboard.writeText(endpointUrl)
      setStatusMessage("Endpoint copied to clipboard")
      setTimeout(() => setStatusMessage(null), 2000)
    } catch {
      setStatusMessage("Failed to copy endpoint")
    }
  }

  if (isDeployed) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
          <Check className="h-10 w-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">🎉 Your Agent is Live!</h2>
          <p className="mt-2 text-slate-400">Access it from the Dashboard or use the API endpoint below</p>
        </div>

        {endpointUrl ? (
          <Card className="w-full max-w-2xl border-slate-700 bg-black/40 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="truncate text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-slate-400" />
                  <span className="truncate">{endpointUrl}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={copyEndpoint} className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button asChild>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={endpointUrl}
                    className="flex items-center gap-2"
                  >
                    <Rocket className="h-4 w-4" />
                    Test
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <p className="text-sm text-slate-400">No endpoint was returned by the deployment API.</p>
        )}

        <div className="flex gap-3">
          <Button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/docs")}
            className="border-slate-700 bg-transparent text-slate-300 hover:bg-white/5"
          >
            View API Docs
          </Button>
        </div>

        {statusMessage && <p className="mt-2 text-sm text-slate-400">{statusMessage}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Review & Deploy</h2>
        <p className="mt-2 text-sm text-slate-400">Review your agent configuration before deployment</p>
      </div>

      <Card className="border-slate-700 bg-black/40 p-6">
        <div className="space-y-4">
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

      <Card className="border-purple-500/20 bg-purple-500/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-200">Estimated Monthly Cost</p>
            <p className="text-xs text-purple-300/70">Based on average usage</p>
          </div>
          <p className="text-2xl font-bold text-purple-300">$12/mo</p>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          onClick={handleDeploy}
          disabled={deploying}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          <Rocket className="mr-2 h-4 w-4" />
          {deploying ? "Deploying..." : "Deploy Agent"}
        </Button>
        <Button
          variant="outline"
          className="border-slate-700 bg-transparent text-slate-300 hover:bg-white/5"
          onClick={() => {
            // Save as draft logic could call an API or localStorage. For now just update data
            setStatusMessage("Saved as draft")
            setTimeout(() => setStatusMessage(null), 1500)
            if (typeof updateAgentData === "function") {
              updateAgentData({}) // placeholder if you want to toggle status in parent
            }
          }}
        >
          <Save className="mr-2 h-4 w-4" />
          Save as Draft
        </Button>
      </div>

      {statusMessage && <p className="mt-2 text-sm text-slate-400">{statusMessage}</p>}
    </div>
  )
}
