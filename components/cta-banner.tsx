import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-black/[0.96] bg-grid-white/[0.02] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glow-effect relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 px-8 py-16 text-center sm:px-16">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Start building AI agents with Axion today</h2>
          <p className="mx-auto mb-8 max-w-2xl text-balance text-lg text-white/90">
            Join thousands of developers and businesses already using Axicov to build, deploy, and monetize AI agents.
          </p>

          <Button size="lg" className="group bg-white px-8 text-base text-slate-900 hover:bg-slate-100">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
