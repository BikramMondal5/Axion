"use client"
import { WobbleCard } from "@/components/ui/wobble-card"
import { Sparkles, Zap, Users } from "lucide-react"

export function ShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-black/[0.96] bg-grid-white/[0.02] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#3591E2" }}>
            Why Choose Axion?
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of AI agent development with powerful features and seamless integration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 min-h-[350px] lg:min-h-[250px]"
            className=""
          >
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-7 h-7 text-purple-400" />
              </div>
              <h2 className="text-left text-balance text-base md:text-xl lg:text-2xl font-bold tracking-[-0.015em] text-white">
                AI-Powered Development Platform
              </h2>
              <p className="mt-3 text-left text-sm/6 text-neutral-200">
                Build sophisticated AI agents with our intuitive platform. Deploy in minutes, scale effortlessly, and
                monetize your creations in our thriving marketplace.
              </p>
            </div>
            <img
              src="/ai-agent-dashboard.png"
              width={500}
              height={500}
              alt="AI agent dashboard"
              className="absolute -right-4 lg:-right-[40%] filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[250px] bg-gradient-to-br from-blue-900/50 to-purple-900/50">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-2xl font-bold tracking-[-0.015em] text-white">
              Lightning-Fast Deployment
            </h2>
            <p className="mt-3 max-w-[26rem] text-left text-sm/6 text-neutral-200">
              From concept to production in minutes. Our streamlined workflow gets your AI agents live faster than ever.
            </p>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 min-h-[350px] lg:min-h-[400px] xl:min-h-[250px]">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-7 h-7 text-indigo-400" />
              </div>
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-2xl font-bold tracking-[-0.015em] text-white">
                Join Thousands of Developers Building the Future
              </h2>
              <p className="mt-3 max-w-[26rem] text-left text-sm/6 text-neutral-200">
                Connect with a vibrant community of AI developers. Share agents, collaborate on projects, and monetize
                your innovations in our marketplace.
              </p>
            </div>
            <img
              src="/developer-community-collaboration.jpg"
              width={500}
              height={500}
              alt="developer community"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
        </div>
      </div>
    </section>
  )
}
