"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Info, Key } from "lucide-react"
import type { AgentData } from "@/components/agent-creation-wizard"

interface ModelIntelligenceStepProps {
  agentData: AgentData
  updateAgentData: (updates: Partial<AgentData>) => void
}

export function ModelIntelligenceStep({ agentData, updateAgentData }: ModelIntelligenceStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Model & Intelligence</h2>
        <p className="mt-2 text-sm text-slate-400">Configure the AI brain powering your agent</p>
      </div>

      {/* AI Model Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="model" className="text-slate-300">
            Select AI Model
          </Label>
          <div className="group relative">
            <Info className="h-4 w-4 text-slate-500" />
            <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-lg border border-purple-500/20 bg-black/90 p-3 text-xs text-slate-300 backdrop-blur-sm group-hover:block">
              Choose the AI model that best fits your needs. GPT-4 is recommended for complex tasks.
            </div>
          </div>
        </div>
        <Select value={agentData.model} onValueChange={(value) => updateAgentData({ model: value })}>
          <SelectTrigger className="border-slate-700 bg-black/40 text-white focus:border-purple-500 focus:ring-purple-500/20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-slate-700 bg-black/90 text-white backdrop-blur-sm">
            <SelectItem value="GPT-4">GPT-4 (Most Capable)</SelectItem>
            <SelectItem value="GPT-3.5">GPT-3.5 (Fast & Efficient)</SelectItem>
            <SelectItem value="Claude">Claude (Anthropic)</SelectItem>
            <SelectItem value="Gemini">Gemini (Google)</SelectItem>
            <SelectItem value="Llama">Llama (Open Source)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* API Key Input Field */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="apiKey" className="text-slate-300">
            API Key
          </Label>
          <div className="group relative">
            <Info className="h-4 w-4 text-slate-500" />
            <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-lg border border-purple-500/20 bg-black/90 p-3 text-xs text-slate-300 backdrop-blur-sm group-hover:block">
              Enter your API key for the selected model. This key will be securely stored and used for authentication.
            </div>
          </div>
        </div>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            id="apiKey"
            type="password"
            placeholder="sk-..."
            className="border-slate-700 bg-black/40 pl-10 text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-purple-500/20"
            value={agentData.apiKey}
            onChange={(e) => updateAgentData({ apiKey: e.target.value })}
          />
        </div>
      </div>

      {/* Creativity Slider */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="text-slate-300">Response Creativity</Label>
          <div className="group relative">
            <Info className="h-4 w-4 text-slate-500" />
            <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-lg border border-purple-500/20 bg-black/90 p-3 text-xs text-slate-300 backdrop-blur-sm group-hover:block">
              Lower values make responses more focused and deterministic. Higher values allow more creative and varied
              outputs.
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Slider
            value={[agentData.creativity]}
            onValueChange={(value) => updateAgentData({ creativity: value[0] })}
            max={100}
            step={1}
            className="[&_[role=slider]]:border-purple-500 [&_[role=slider]]:bg-purple-600"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>Precise</span>
            <span className="font-medium text-purple-400">
              {agentData.creativity < 33 ? "Precise" : agentData.creativity < 66 ? "Balanced" : "Creative"}
            </span>
            <span>Creative</span>
          </div>
        </div>
      </div>

      {/* Memory Toggle */}
      <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-black/40 p-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Label htmlFor="memory" className="text-slate-300">
              Enable Memory
            </Label>
            <div className="group relative">
              <Info className="h-4 w-4 text-slate-500" />
              <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-lg border border-purple-500/20 bg-black/90 p-3 text-xs text-slate-300 backdrop-blur-sm group-hover:block">
                When enabled, your agent will remember previous interactions and maintain context across conversations.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">Agent will remember previous interactions</p>
        </div>
        <Switch
          id="memory"
          checked={agentData.enableMemory}
          onCheckedChange={(checked) => updateAgentData({ enableMemory: checked })}
          className="data-[state=checked]:bg-purple-600"
        />
      </div>

      {/* Info Box */}
      <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
        <p className="text-sm text-cyan-300">
          💡 <strong>Tip:</strong> For customer support agents, enable memory and use balanced creativity. For data
          analysis, use precise mode.
        </p>
      </div>
    </div>
  )
}
