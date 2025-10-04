import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageSquare, FileText, Mail, Code2, Database } from "lucide-react"

const agents = [
  {
    icon: Bot,
    name: "Customer Support AI",
    description: "Automated customer service with multi-channel support and sentiment analysis.",
    price: "$0.05/request",
    category: "Support",
  },
  {
    icon: MessageSquare,
    name: "Content Generator",
    description: "Generate blog posts, social media content, and marketing copy at scale.",
    price: "$0.03/request",
    category: "Content",
  },
  {
    icon: FileText,
    name: "Document Analyzer",
    description: "Extract insights from PDFs, contracts, and documents with AI-powered analysis.",
    price: "$0.08/request",
    category: "Analytics",
  },
  {
    icon: Mail,
    name: "Email Assistant",
    description: "Smart email drafting, scheduling, and response automation for teams.",
    price: "$0.04/request",
    category: "Productivity",
  },
  {
    icon: Code2,
    name: "Code Review Assistant",
    description: "Automated code review with best practices, security checks, and optimization suggestions.",
    price: "$0.06/request",
    category: "Development",
  },
  {
    icon: Database,
    name: "Data Pipeline Agent",
    description: "Automate data extraction, transformation, and loading with intelligent error handling.",
    price: "$0.07/request",
    category: "Data",
  },
]

export function MarketplacePreview() {
  return (
    <section
      id="marketplace"
      className="relative overflow-hidden bg-black/[0.96] bg-grid-white/[0.02] px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: "#3591E2" }}>
            Explore the Agent Marketplace
          </h2>
          <p className="mx-auto max-w-3xl text-balance text-base sm:text-lg text-slate-400 px-4 sm:px-0">
            Discover pre-built AI agents ready to integrate into your workflow, or publish your own.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            const IconComponent = agent.icon
            return (
              <Card
                key={agent.name}
                className="group flex flex-col border-slate-800 bg-slate-900/50 p-4 sm:p-6 backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:bg-slate-900/80"
              >
                <div className="mb-3 sm:mb-4 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                  <IconComponent className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>

                <Badge className="mb-2 sm:mb-3 w-fit border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs">
                  {agent.category}
                </Badge>

                <h3 className="mb-2 text-base sm:text-lg font-semibold text-white">{agent.name}</h3>
                <p className="mb-3 sm:mb-4 flex-1 text-xs sm:text-sm leading-relaxed text-slate-400">{agent.description}</p>

                <div className="flex items-center justify-between border-t border-slate-800 pt-3 sm:pt-4">
                  <span className="text-xs sm:text-sm font-semibold text-indigo-400">{agent.price}</span>
                  <Button size="sm" variant="ghost" className="text-slate-300 hover:bg-white/5 hover:text-white text-xs sm:text-sm px-3 sm:px-4">
                    Try Now
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Button variant="outline" className="border-slate-700 bg-transparent text-white hover:bg-white/5 w-full sm:w-auto">
            View All Agents
          </Button>
        </div>
      </div>
    </section>
  )
}
