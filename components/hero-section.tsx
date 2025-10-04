"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Spotlight } from "@/components/ui/spotlight-new"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[35rem] sm:min-h-[40rem] w-full items-center justify-center overflow-hidden bg-black/[0.96] bg-grid-white/[0.02] px-4 pb-16 pt-24 sm:pb-20 sm:pt-32 antialiased sm:px-6 lg:px-8">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white">
          <span className="text-white">Build, Deploy & Monetize</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-600 bg-clip-text text-transparent">
            AI Agents
          </span>
          <span className="text-white"> – Instantly</span>
        </h1>

        <p className="mx-auto mb-8 sm:mb-10 max-w-2xl text-balance text-base sm:text-lg leading-relaxed text-slate-400 px-4 sm:px-0">
          A marketplace to build, deploy, and scale custom AI agents as APIs with seamless tracking and workflow
          automation.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row px-4 sm:px-0">
          <Button size="lg" className="group bg-indigo-600 px-6 sm:px-8 text-sm sm:text-base hover:bg-indigo-700 w-full sm:w-auto">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-700 bg-transparent px-6 sm:px-8 text-sm sm:text-base text-white hover:bg-white/5 w-full sm:w-auto"
          >
            Explore Marketplace
          </Button>
        </div>

        <div className="float-animation relative mx-auto mt-12 sm:mt-16 w-full max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="rounded-lg sm:rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6 lg:p-8 backdrop-blur-sm shadow-2xl">
            {/* Glossy shadow effect spanning full width */}
            <div className="absolute -top-px left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70" />
            <div className="absolute -top-1 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 h-10 bg-gradient-to-b from-purple-500/40 via-blue-500/30 to-transparent blur-2xl" />
            <div className="absolute -top-2 left-2 right-2 sm:left-4 sm:right-4 lg:left-8 lg:right-8 h-12 bg-gradient-to-b from-violet-500/20 via-purple-500/10 to-transparent blur-3xl" />

            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 sm:pb-4">
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500" />
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500" />
              <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500" />
            </div>
            <pre className="mt-4 sm:mt-6 overflow-x-auto text-left text-xs sm:text-sm lg:text-base text-slate-300">
              <code>{`// Deploy your AI agent in seconds
import { littleBraek } from '@axion'

// No coding? No problem.  
// Sit back, sip your coffee ☕, and let Axicov do the work.  
// Build custom AI agents in clicks, not code.  
✨ Your tasks…automated!`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
