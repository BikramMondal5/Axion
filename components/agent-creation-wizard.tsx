"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgentBasicsStep } from "@/components/wizard-steps/agent-basics-step"
import { ModelIntelligenceStep } from "@/components/wizard-steps/model-intelligence-step"
import { IntegrationsStep } from "@/components/wizard-steps/integrations-step"
import { AutomationTriggersStep } from "@/components/wizard-steps/automation-triggers-step"
import { ReviewDeployStep } from "@/components/wizard-steps/review-deploy-step"
import { AgentPreviewCard } from "@/components/agent-preview-card"

export interface AgentData {
  name: string
  description: string
  category: string
  icon: string
  model: string
  creativity: number
  enableMemory: boolean
  integrations: string[]
  trigger: string
  triggerSchedule?: string
  enableNotifications: boolean
}

const steps = [
  { id: 1, name: "Agent Basics", component: AgentBasicsStep },
  { id: 2, name: "Model & Intelligence", component: ModelIntelligenceStep },
  { id: 3, name: "Integrations", component: IntegrationsStep },
  { id: 4, name: "Automation Triggers", component: AutomationTriggersStep },
  { id: 5, name: "Review & Deploy", component: ReviewDeployStep },
]

export function AgentCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [agentData, setAgentData] = useState<AgentData>({
    name: "",
    description: "",
    category: "Productivity",
    icon: "bot",
    model: "GPT-4",
    creativity: 50,
    enableMemory: false,
    integrations: [],
    trigger: "manual",
    enableNotifications: true,
  })

  const updateAgentData = (updates: Partial<AgentData>) => {
    setAgentData((prev) => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = steps[currentStep - 1].component

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <span className="hover:text-purple-400 cursor-pointer">Dashboard</span>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white">Create New Agent</span>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    currentStep > step.id
                      ? "border-purple-500 bg-purple-500 text-white"
                      : currentStep === step.id
                        ? "border-purple-500 bg-transparent text-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        : "border-slate-700 bg-transparent text-slate-500"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <span className={`mt-2 text-xs ${currentStep >= step.id ? "text-purple-400" : "text-slate-500"}`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-all ${
                    currentStep > step.id ? "bg-purple-500" : "bg-slate-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content: 2-Column Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: Form Area */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-white/10 bg-black/40 p-8 backdrop-blur-md">
            <CurrentStepComponent agentData={agentData} updateAgentData={updateAgentData} />

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-slate-700 bg-transparent text-slate-300 hover:bg-white/5 disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50"
              >
                {currentStep === steps.length ? "Complete" : "Next"}
                {currentStep < steps.length && <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AgentPreviewCard agentData={agentData} />
          </div>
        </div>
      </div>
    </div>
  )
}
