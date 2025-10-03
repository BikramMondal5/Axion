import { Card } from "@/components/ui/card"

export function WorkflowTeaser() {
  return (
    <section className="relative overflow-hidden bg-black/[0.96] bg-grid-white/[0.02] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl" style={{ color: "#3591E2" }}>
              Compose multiple agents into workflows
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-slate-400">
              Build complex AI workflows by connecting multiple agents together. No code required – just drag, drop, and
              deploy.
            </p>
            <ul className="space-y-3">
              {[
                "Visual workflow builder with React Flow",
                "Connect agents with conditional logic",
                "Real-time testing and debugging",
                "One-click deployment to production",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-indigo-500/20 p-1">
                    <div className="h-full w-full rounded-full bg-indigo-500" />
                  </div>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm">
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-950/50" />
          </Card>
        </div>
      </div>
    </section>
  )
}
