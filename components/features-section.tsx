"use client"

import { Zap, Shield, BarChart3, DollarSign, Workflow, Code } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const features = [
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "Deploy AI agents with API endpoints in seconds. No infrastructure setup required.",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    hoverBorder: "hover:border-purple-500",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description: "Track performance, monitor costs, and optimize your agents with real-time analytics.",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    hoverBorder: "hover:border-blue-500",
  },
  {
    icon: Shield,
    title: "Secure Environment",
    description: "Enterprise-grade security with encrypted environment variable management.",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    hoverBorder: "hover:border-green-500",
  },
  {
    icon: DollarSign,
    title: "Monetize & Share",
    description: "Turn your agents into revenue streams. Set pricing and share with the community.",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
    hoverBorder: "hover:border-red-500",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automate repetitive tasks and streamline processes with built-in orchestration tools.",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
    hoverBorder: "hover:border-yellow-500",
  },
  {
    icon: Code,
    title: "Code Generation",
    description: "Generate production-ready code for your agents with AI-powered development tools.",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500",
  },
]

export function FeaturesSection() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  return (
    <section className="relative overflow-hidden bg-black/[0.96] bg-grid-white/[0.02] px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: "#3591E2" }}>
            Everything you need to build AI agents
          </h2>
          <p className="mx-auto max-w-3xl text-balance text-base sm:text-lg text-slate-400 px-4 sm:px-0">
            From development to deployment, we've got you covered with powerful tools and features.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const IconComponent = feature.icon
            const isSelected = selectedCard === feature.title

            return (
              <Card
                key={feature.title}
                onClick={() => setSelectedCard(isSelected ? null : feature.title)}
                className={`group cursor-pointer border-2 border-transparent p-4 sm:p-6 backdrop-blur-sm shadow-lg shadow-black/50 transition-all duration-300 ${
                  feature.hoverBorder
                } ${isSelected ? "scale-105 shadow-2xl" : "hover:scale-102 hover:shadow-xl"}`}
                style={{ backgroundColor: "#121212" }}
              >
                <div
                  className={`mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg ${feature.iconBg} ${feature.iconColor} transition-all duration-300`}
                >
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mb-2 text-base sm:text-lg text-white font-bold">{feature.title}</h3>
                <p className="leading-relaxed text-slate-400 text-sm sm:text-base">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedCard(null)} />
      )}
    </section>
  )
}
