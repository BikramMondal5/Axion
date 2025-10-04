"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Lock, PlugZap, Puzzle, RefreshCw, ShieldCheck, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

type Category = "All" | "Communication" | "Productivity" | "Storage" | "CRM"

type Integration = {
  id: string
  name: string
  category: Exclude<Category, "All">
  connected: boolean
  usersThisWeek: number
  logo: string
}

const ALL_INTEGRATIONS: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    category: "Communication",
    connected: false,
    usersThisWeek: 328,
    logo: "/slack-logo.png",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "Communication",
    connected: true,
    usersThisWeek: 412,
    logo: "/gmail-logo.png",
  },
  {
    id: "notion",
    name: "Notion",
    category: "Productivity",
    connected: true,
    usersThisWeek: 305,
    logo: "/notion-logo.png",
  },
  {
    id: "gcal",
    name: "Google Calendar",
    category: "Productivity",
    connected: false,
    usersThisWeek: 221,
    logo: "/google-calendar-logo.png",
  },
  {
    id: "trello",
    name: "Trello",
    category: "Productivity",
    connected: false,
    usersThisWeek: 144,
    logo: "/trello-logo.png",
  },
  {
    id: "discord",
    name: "Discord",
    category: "Communication",
    connected: false,
    usersThisWeek: 189,
    logo: "/discord-logo.png",
  },
  {
    id: "gdrive",
    name: "Google Drive",
    category: "Storage",
    connected: false,
    usersThisWeek: 263,
    logo: "/google-drive-logo.png",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    connected: false,
    usersThisWeek: 97,
    logo: "/salesforce-logo.png",
  },
]

const usageMiniData = [
  { name: "Mon", value: 18 },
  { name: "Tue", value: 24 },
  { name: "Wed", value: 35 },
  { name: "Thu", value: 28 },
  { name: "Fri", value: 40 },
  { name: "Sat", value: 22 },
  { name: "Sun", value: 30 },
]

export function IntegrationContent() {
  const { toast } = useToast()
  const [category, setCategory] = useState<Category>("All")
  const [items, setItems] = useState<Integration[]>(ALL_INTEGRATIONS)
  const [authOpen, setAuthOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [activeApp, setActiveApp] = useState<Integration | null>(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [permissionPost, setPermissionPost] = useState(true)
  const [permissionRead, setPermissionRead] = useState(true)
  const [permissionBots, setPermissionBots] = useState(false)

  const categories: Category[] = ["All", "Communication", "Productivity", "Storage", "CRM"]

  const filtered = useMemo(() => {
    if (category === "All") return items
    return items.filter((i) => i.category === category)
  }, [items, category])

  function handleOpenAuth(app: Integration) {
    setActiveApp(app)
    setAuthOpen(true)
  }

  function handleConnect() {
    if (!activeApp) return
    setAuthLoading(true)
    // Simulated auth delay + success
    setTimeout(() => {
      setAuthLoading(false)
      setAuthOpen(false)
      setItems((prev) => prev.map((i) => (i.id === activeApp.id ? { ...i, connected: true } : i)))
      toast({ title: `${activeApp.name} connected`, description: "Integration authorized successfully." })
    }, 1200)
  }

  function handleDisconnect(app: Integration) {
    setItems((prev) => prev.map((i) => (i.id === app.id ? { ...i, connected: false } : i)))
    toast({ title: `${app.name} disconnected`, description: "You can reconnect anytime from Integrations Hub." })
  }

  function handleRefresh() {
    toast({ title: "Connections refreshed", description: "All integration statuses are up to date." })
  }

  function handleAddCustom() {
    toast({ title: "Custom integration", description: "Contact support or use our SDK to add custom integrations." })
  }

  return (
    <main className="flex-1 p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-balance text-2xl font-semibold text-white md:text-3xl">Integrations Hub</h1>
          <p className="text-pretty text-sm text-slate-400 md:text-base">
            Connect your favorite tools and supercharge your AI agents.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-white/10 text-slate-200 hover:bg-white/5 bg-transparent"
            onClick={handleRefresh}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Connections
          </Button>
          <Button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-purple-500"
            onClick={handleAddCustom}
          >
            <Puzzle className="mr-2 h-4 w-4" />
            Add Custom Integration
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6 md:mb-8">
        <Tabs value={category} onValueChange={(v) => setCategory(v as Category)}>
          <TabsList className="bg-black/30">
            {categories.map((c) => (
              <TabsTrigger key={c} value={c} className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Integrations Grid */}
      <TooltipProvider>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((app) => (
            <Card
              key={app.id}
              className="group border-white/10 bg-black/30 transition hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <CardHeader className="flex items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white/5 p-2 shadow-inner shadow-black/40">
                    <Image
                      src={app.logo || "/placeholder.svg"}
                      alt={`${app.name} logo`}
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-white">{app.name}</CardTitle>
                    <CardDescription className="text-slate-400">{app.category}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={app.connected ? "default" : "secondary"}
                  className={app.connected ? "bg-emerald-600/30 text-emerald-300" : "bg-white/10 text-slate-300"}
                >
                  {app.connected ? "Connected" : "Not Connected"}
                </Badge>
              </CardHeader>
              <CardContent className="mt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help text-xs text-slate-400">
                        Used by {app.usersThisWeek}+ users this week
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/80 text-slate-200">
                      Adoption stats update hourly.
                    </TooltipContent>
                  </Tooltip>
                  {app.connected ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-slate-300 hover:bg-white/5 hover:text-white"
                      onClick={() => handleDisconnect(app)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-indigo-600 text-white hover:bg-indigo-700"
                      onClick={() => handleOpenAuth(app)}
                    >
                      <PlugZap className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TooltipProvider>

      {/* Connected Tools Summary */}
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="border-white/10 bg-black/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Your Connected Tools</CardTitle>
            <CardDescription className="text-slate-400">
              Overview of connections, sync status, and recent usage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items
                .filter((i) => i.connected)
                .map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={app.logo || "/placeholder.svg"}
                        alt={`${app.name} logo`}
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">{app.name}</div>
                        <div className="text-xs text-slate-400">Connected: 2 days ago • Last sync: 1h</div>
                      </div>
                    </div>
                    <div className="hidden w-36 sm:block">
                      <ChartContainer
                        config={{
                          value: { label: "API usage", color: "hsl(var(--chart-1))" },
                        }}
                        className="h-16"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={usageMiniData}>
                            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 text-slate-200 hover:bg-white/5 bg-transparent"
                      onClick={() => {
                        setActiveApp(app)
                        setSettingsOpen(true)
                      }}
                    >
                      Manage
                    </Button>
                  </div>
                ))}
              {items.filter((i) => i.connected).length === 0 && (
                <div className="rounded-lg border border-white/10 bg-black/20 p-6 text-center text-slate-400">
                  No integrations connected yet. Connect one to get started!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security Box */}
        <Card className="border-white/10 bg-black/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              Security & Permissions
            </CardTitle>
            <CardDescription className="text-slate-400">
              Axion uses secure OAuth 2.0 authentication to ensure your data stays private. You have full control over
              what you share — always.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-indigo-400" /> Encrypted tokens, never store raw credentials
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Granular permissions per integration
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-purple-400" /> Revoke access anytime
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Authentication Modal */}
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="border-white/10 bg-black/80 text-slate-200 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-white">Connect to {activeApp?.name}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Allow Axion to access your {activeApp?.name} to automate tasks.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-300">
              Axion will be able to perform actions required by your workflows. Adjust permissions below.
            </p>
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <Label htmlFor="perm-read" className="text-slate-200">
                    Read data
                  </Label>
                </div>
                <Switch id="perm-read" checked={permissionRead} onCheckedChange={setPermissionRead} />
              </div>
              <Separator className="my-3 bg-white/10" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <Label htmlFor="perm-post" className="text-slate-200">
                    Post / write data
                  </Label>
                </div>
                <Switch id="perm-post" checked={permissionPost} onCheckedChange={setPermissionPost} />
              </div>
              <Separator className="my-3 bg-white/10" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <Label htmlFor="perm-bots" className="text-slate-200">
                    Manage bots
                  </Label>
                </div>
                <Switch id="perm-bots" checked={permissionBots} onCheckedChange={setPermissionBots} />
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <Label htmlFor="workspace" className="text-slate-300">
                Workspace / Account
              </Label>
              <Input id="workspace" placeholder="e.g., acme-inc" className="mt-2 bg-black/40 text-slate-200" />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleConnect}
              disabled={authLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500"
            >
              {authLoading ? "Authorizing..." : "Authorize & Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Integration Settings Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="border-white/10 bg-black/80 text-slate-200 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-white">Manage {activeApp?.name}</DialogTitle>
            <DialogDescription className="text-slate-400">Adjust permissions and view usage logs.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <h4 className="mb-2 text-sm font-medium text-white">Permissions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Read data</span>
                  <Switch checked={permissionRead} onCheckedChange={setPermissionRead} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Post / write data</span>
                  <Switch checked={permissionPost} onCheckedChange={setPermissionPost} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Manage bots</span>
                  <Switch checked={permissionBots} onCheckedChange={setPermissionBots} />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-4">
              <h4 className="mb-2 text-sm font-medium text-white">API Usage (last 7 days)</h4>
              <ChartContainer
                config={{
                  calls: { label: "Calls", color: "hsl(var(--chart-2))" },
                }}
                className="h-40"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageMiniData}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" />
                    <YAxis stroke="rgba(255,255,255,0.4)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-calls)" radius={6} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="border-white/10 text-slate-200 hover:bg-white/5 bg-transparent"
                onClick={() => toast({ title: "Re-authenticate", description: "Re-auth flow started." })}
              >
                Re-authenticate
              </Button>
              <Button
                variant="ghost"
                className="text-red-300 hover:bg-red-500/10 hover:text-red-200"
                onClick={() => {
                  if (activeApp) handleDisconnect(activeApp)
                  setSettingsOpen(false)
                }}
              >
                Remove Integration
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
