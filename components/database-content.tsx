"use client"

import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Copy, Trash2, Plus, CheckCircle2, Shield, ShieldCheck, Lock } from "lucide-react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

type ApiKey = {
  id: string
  name: string
  key: string
  createdAt: string
  usage: number
  visible?: boolean
}

const initialKeys: ApiKey[] = [
  {
    id: "k1",
    name: "Primary Key",
    key: "sk-axicov-1a2b3c4d5e6f7g8h",
    createdAt: "2025-08-14",
    usage: 1240,
    visible: false,
  },
  {
    id: "k2",
    name: "Backend Service",
    key: "sk-axicov-9z8y7x6w5v4u3t2s",
    createdAt: "2025-08-28",
    usage: 890,
    visible: false,
  },
  {
    id: "k3",
    name: "Staging Key",
    key: "sk-axicov-abcdef1234567890",
    createdAt: "2025-09-05",
    usage: 230,
    visible: false,
  },
]

// Mock usage analytics
const requestsPerDay = [
  { date: "Mon", calls: 420 },
  { date: "Tue", calls: 580 },
  { date: "Wed", calls: 490 },
  { date: "Thu", calls: 720 },
  { date: "Fri", calls: 650 },
  { date: "Sat", calls: 380 },
  { date: "Sun", calls: 290 },
]

export function DatabaseContent() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys)
  const [search, setSearch] = useState("")
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)
  const [show2FAModal, setShow2FAModal] = useState(false)
  const { toast } = useToast()

  const filteredKeys = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return keys
    return keys.filter((k) => k.name.toLowerCase().includes(q) || k.key.toLowerCase().includes(q))
  }, [keys, search])

  const totalUsage = useMemo(() => keys.reduce((sum, k) => sum + k.usage, 0), [keys])
  const usageDist = useMemo(
    () =>
      keys.map((k, i) => ({
        name: k.name,
        value: k.usage,
        color: ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"][i % 5],
      })),
    [keys],
  )

  function maskKey(value: string) {
    if (!value) return ""
    const start = value.slice(0, 6)
    const end = value.slice(-4)
    return `${start}••••••••••••••${end}`
  }

  function handleCopy(value: string) {
    navigator.clipboard.writeText(value)
    toast({ title: "Copied!", description: "API key copied to clipboard." })
  }

  function handleToggleVisibility(id: string) {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, visible: !k.visible } : k)))
  }

  function handleDelete(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id))
    toast({ title: "Key deleted", description: "The API key has been removed." })
  }

  function handleGenerate() {
    const rand = Math.random().toString(36).slice(2, 10)
    const newKey: ApiKey = {
      id: `k-${Date.now()}`,
      name: `New Key ${keys.length + 1}`,
      key: `sk-axicov-${rand}${rand}`,
      createdAt: new Date().toISOString().slice(0, 10),
      usage: 0,
      visible: false,
    }
    setKeys((prev) => [newKey, ...prev])
    toast({ title: "New API key generated", description: "Store it securely." })
  }

  function handleEnable2FA() {
    setShow2FAModal(true)
  }

  function handleVerify2FA() {
    setIs2FAEnabled(true)
    setShow2FAModal(false)
    toast({ title: "2FA enabled", description: "Two-factor authentication is now active." })
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>
            <span className="text-white">/ Database</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-white">Your Secure Database</h1>
              <p className="text-slate-400">Manage your API keys, monitor usage, and protect your account with 2FA.</p>
            </div>
            <div className="flex items-center gap-3">
              
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        <Card className="mb-8 border-white/10 bg-[#121212] p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl font-semibold text-white">API Keys</h3>
            <div className="flex items-center gap-3">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search keys..."
                className="w-[240px] border-white/10 bg-white/5 text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          {keys.length === 0 ? (
            <div className="rounded-md border border-white/10 bg-white/5 p-8 text-center">
              <p className="mb-4 text-slate-300">You haven’t generated any API keys yet.</p>
              <Button
                onClick={handleGenerate}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create your first key
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-slate-400">API Key Name</TableHead>
                    <TableHead className="text-slate-400">Key</TableHead>
                    <TableHead className="text-slate-400">Created On</TableHead>
                    <TableHead className="text-slate-400">Usage (Requests)</TableHead>
                    <TableHead className="text-right text-slate-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKeys.map((k) => (
                    <TableRow key={k.id} className="border-white/10">
                      <TableCell className="text-white">{k.name}</TableCell>
                      <TableCell>
                        <code className="rounded bg-white/5 px-2 py-1 text-sm text-cyan-400">
                          {k.visible ? k.key : maskKey(k.key)}
                        </code>
                      </TableCell>
                      <TableCell className="text-slate-400">{k.createdAt}</TableCell>
                      <TableCell className="text-white">{k.usage.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleVisibility(k.id)}
                            className="text-slate-400 hover:text-white"
                            aria-label={k.visible ? "Hide key" : "Show key"}
                          >
                            {k.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopy(k.key)}
                            className="text-slate-400 hover:text-white"
                            aria-label="Copy key"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(k.id)}
                            className="text-slate-400 hover:text-white"
                            aria-label="Delete key"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>

        {/* Usage Analytics */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Donut usage distribution */}
          <Card className="border-white/10 bg-[#121212] p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={usageDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {usageDist.map((entry, idx) => (
                    <Cell key={`usage-${idx}`} fill={entry.color} />
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
              {usageDist.map((u, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: u.color }} />
                  <span className="text-sm text-slate-400">{u.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Daily requests bar chart */}
          <Card className="border-white/10 bg-[#121212] p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">API Requests (Daily)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestsPerDay}>
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
                <Bar dataKey="calls" fill="url(#barGradientDB)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradientDB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* 2FA Section */}
        <Card className="border-white/10 bg-[#121212] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                {is2FAEnabled ? (
                  <ShieldCheck className="h-5 w-5 text-white" />
                ) : (
                  <Shield className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Two-Factor Authentication (2FA)</h3>
                <p className="text-sm text-slate-400">Add an extra layer of protection to your account.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400">{is2FAEnabled ? "Enabled" : "Disabled"}</span>
              <Switch
                checked={is2FAEnabled}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleEnable2FA()
                  } else {
                    setIs2FAEnabled(false)
                    toast({ title: "2FA disabled", description: "You have turned off two-factor authentication." })
                  }
                }}
              />
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3 text-slate-300">
              <Lock className="h-4 w-4 text-slate-400" />
              <p className="text-sm">
                Use an authenticator app to scan your QR code and enter the code to verify. Keep your backup codes safe.
              </p>
            </div>
          </div>
        </Card>

        {/* 2FA Modal */}
        <Dialog open={show2FAModal} onOpenChange={(o) => setShow2FAModal(o)}>
          <DialogContent className="border-white/10 bg-[#0b0b0b] text-white">
            <DialogHeader>
              <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
              <DialogDescription className="text-slate-400">
                Scan the QR code with your authenticator app and store your backup codes securely.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-4">
                <img src="/qr-code-for-2fa.jpg" alt="2FA QR Code" className="rounded" />
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-white">Backup Codes</h4>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                  <ul className="grid gap-2">
                    <li>Y3K7-9PLQ-1VZC</li>
                    <li>HW2N-57QK-M9TX</li>
                    <li>T4P6-88GV-N1DU</li>
                    <li>QJ3S-6HRT-4BXP</li>
                    <li>VM2W-7KQJ-5ZLA</li>
                  </ul>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-4 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                onClick={() => setShow2FAModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleVerify2FA}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Verify & Enable
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  )
}
