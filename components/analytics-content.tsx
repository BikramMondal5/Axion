"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, TrendingUp, Clock, MessageSquare, ChevronDown, Copy, CheckCircle2 } from "lucide-react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for charts
const agentUsageData = [
  { name: "Customer Support Bot", value: 450, color: "#6366f1" },
  { name: "Data Analyzer", value: 320, color: "#8b5cf6" },
  { name: "Content Generator", value: 280, color: "#06b6d4" },
  { name: "Code Assistant", value: 180, color: "#10b981" },
]

const apiCallsData = [
  { date: "Mon", calls: 420 },
  { date: "Tue", calls: 580 },
  { date: "Wed", calls: 490 },
  { date: "Thu", calls: 720 },
  { date: "Fri", calls: 650 },
  { date: "Sat", calls: 380 },
  { date: "Sun", calls: 290 },
]

const workflowData = [
  { name: "Email Automation", value: 850 },
  { name: "Data Processing", value: 720 },
  { name: "Report Generation", value: 650 },
  { name: "Customer Queries", value: 580 },
]

export function AnalyticsContent() {
  const [dateRange, setDateRange] = useState("7days")
  const [selectedAgent, setSelectedAgent] = useState("all")
  const [copied, setCopied] = useState(false)

  const kpiCards = [
    {
      icon: Activity,
      label: "Active Agents",
      value: "12",
      change: "+2 this week",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: TrendingUp,
      label: "Total API Calls",
      value: "3,530",
      change: "+18% from last week",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Clock,
      label: "Avg Response Time",
      value: "142ms",
      change: "-12ms improvement",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: MessageSquare,
      label: "User Interactions",
      value: "1,847",
      change: "+24% engagement",
      color: "from-violet-500 to-purple-500",
    },
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText("sk-axicov-1234567890abcdef")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>
            <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            <span className="text-white">Analytics</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-white">Analytics Overview</h1>
              <p className="text-slate-400">Track your agents' performance, usage, and engagement in real time.</p>
            </div>
            <div className="flex gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px] border-white/10 bg-white/5 text-white backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#121212] text-white">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="w-[180px] border-white/10 bg-white/5 text-white backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#121212] text-white">
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="support">Customer Support Bot</SelectItem>
                  <SelectItem value="analyzer">Data Analyzer</SelectItem>
                  <SelectItem value="generator">Content Generator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 border-transparent bg-[#121212] p-6 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                <div className="relative z-10">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${kpi.color} shadow-lg`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="mb-1 text-sm text-slate-400">{kpi.label}</p>
                  <p className="mb-2 text-3xl font-bold text-white">{kpi.value}</p>
                  <p className="text-xs text-emerald-400">{kpi.change}</p>
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />
              </Card>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Donut Chart */}
          <Card className="border-white/10 bg-[#121212] p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">Agent Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={agentUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {agentUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {agentUsageData.map((agent, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: agent.color }} />
                  <span className="text-sm text-slate-400">{agent.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Bar Chart */}
          <Card className="border-white/10 bg-[#121212] p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">API Requests (Daily)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={apiCallsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="calls" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Horizontal Bar Chart */}
          <Card className="border-white/10 bg-[#121212] p-6 lg:col-span-2">
            <h3 className="mb-6 text-xl font-semibold text-white">Top Performing Workflows</h3>
            <div className="space-y-4">
              {workflowData.map((workflow, index) => (
                <div key={index} className="group">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-slate-300">{workflow.name}</span>
                    <span className="text-sm font-semibold text-white">{workflow.value}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 group-hover:from-cyan-500 group-hover:to-indigo-500"
                      style={{ width: `${(workflow.value / 850) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Detailed Agent Analytics */}
        <Card className="border-white/10 bg-[#121212] p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Detailed Agent Analytics</h3>
            <Select defaultValue="support">
              <SelectTrigger className="w-[250px] border-white/10 bg-white/5 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#121212] text-white">
                <SelectItem value="support">Customer Support Bot</SelectItem>
                <SelectItem value="analyzer">Data Analyzer</SelectItem>
                <SelectItem value="generator">Content Generator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Agent Summary Card */}
          <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="flex items-start gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-2xl font-bold text-white">
                CS
              </div>
              <div className="flex-1">
                <h4 className="mb-1 text-lg font-semibold text-white">Customer Support Bot</h4>
                <p className="mb-3 text-sm text-slate-400">Model: GPT-4 Turbo • Status: Active</p>
                <div className="flex items-center gap-3">
                  <code className="rounded bg-white/5 px-3 py-1 text-sm text-cyan-400">sk-axicov-1234567890abcdef</code>
                  <Button size="sm" variant="ghost" onClick={handleCopy} className="text-slate-400 hover:text-white">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Data Panels */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h5 className="mb-4 text-sm font-medium text-slate-400">Usage Breakdown</h5>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-300">Morning (6-12)</span>
                    <span className="text-white">35%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-300">Afternoon (12-18)</span>
                    <span className="text-white">45%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-300">Evening (18-24)</span>
                    <span className="text-white">20%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-full w-[20%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h5 className="mb-4 text-sm font-medium text-slate-400">Error Rate & Reliability</h5>
              <div className="flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full -rotate-90 transform">
                    <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(97 / 100) * 351.86} 351.86`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">97%</span>
                    <span className="text-xs text-slate-400">Uptime</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-emerald-400">Excellent reliability</p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h5 className="mb-4 text-sm font-medium text-slate-400">Cost Estimation</h5>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400">This Month</p>
                  <p className="text-3xl font-bold text-white">$127.50</p>
                </div>
                <div className="h-px bg-white/10" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">API Calls</span>
                    <span className="text-white">$89.20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Storage</span>
                    <span className="text-white">$18.30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bandwidth</span>
                    <span className="text-white">$20.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
