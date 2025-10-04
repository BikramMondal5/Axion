"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Palette,
  Shield,
  Key,
  Monitor,
  Download,
  Trash2,
  Camera,
  Check,
  Copy,
  X,
  Smartphone,
  MapPin,
  ChevronRight,
  ShieldCheck,
  AppWindow,
  Link2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const accentColors = [
  { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
  { name: "Purple", value: "#a855f7", class: "bg-purple-500" },
  { name: "Green", value: "#10b981", class: "bg-green-500" },
  { name: "Orange", value: "#f97316", class: "bg-orange-500" },
  { name: "Pink", value: "#ec4899", class: "bg-pink-500" },
  { name: "Cyan", value: "#06b6d4", class: "bg-cyan-500" },
]

const integrations = [
  { name: "Google", logo: "🔍", connected: true },
  { name: "Slack", logo: "💬", connected: true },
  { name: "Notion", logo: "📝", connected: false },
  { name: "GitHub", logo: "🐙", connected: true },
]

const apiKeys = [
  { name: "Production API", lastUsed: "2 hours ago", key: "sk_live_..." },
  { name: "Development API", lastUsed: "1 day ago", key: "sk_test_..." },
]

const connectedDevices = [
  { device: "MacBook Pro", location: "San Francisco, CA", lastActive: "Active now" },
  { device: "iPhone 14", location: "San Francisco, CA", lastActive: "2 hours ago" },
  { device: "Windows Desktop", location: "New York, NY", lastActive: "3 days ago" },
]

export function UserSettingsContent() {
  const [selectedAccent, setSelectedAccent] = useState(accentColors[1])
  const [darkMode, setDarkMode] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [agentUpdates, setAgentUpdates] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [username, setUsername] = useState("Alex Johnson")
  const [email, setEmail] = useState("alex@axicov.com")
  const [avatarImage, setAvatarImage] = useState<string | null>(null)
  const [avatarError, setAvatarError] = useState<string | null>(null)
  const [allowAnalytics, setAllowAnalytics] = useState(true)
  const [personalizedRecs, setPersonalizedRecs] = useState(true)
  const [shareCrashReports, setShareCrashReports] = useState(false)
  const [analyticsCookies, setAnalyticsCookies] = useState(true)
  const [sessionTracking, setSessionTracking] = useState(true)
  const [searchIndexing, setSearchIndexing] = useState(false)
  const [modelImprovement, setModelImprovement] = useState(true)
  const [activityRetention, setActivityRetention] = useState<string>("90")
  const [suspiciousLoginAlerts, setSuspiciousLoginAlerts] = useState(true)

  useEffect(() => {
    return () => {
      if (avatarImage) URL.revokeObjectURL(avatarImage)
    }
  }, [avatarImage])

  const handleSave = () => {
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarError(null)
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setAvatarError("Invalid file type. Please upload an image.")
      e.target.value = ""
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("File too large. Max 2MB.")
      e.target.value = ""
      return
    }
    const url = URL.createObjectURL(file)
    setAvatarImage((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return url
    })
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl p-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">User Settings</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">Profile Settings</h1>
          <p className="text-slate-400">Manage your personal info and account preferences.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-white/10 bg-[#121212] p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="mb-1 text-2xl font-semibold text-white">Your Profile</h2>
                  <p className="text-sm text-slate-400">Update your personal information</p>
                </div>
                {showSaveSuccess && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-500/20 px-3 py-2 text-green-400 animate-in fade-in slide-in-from-top-2">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Saved!</span>
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="mb-6 flex items-center gap-6">
                <div className="group relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-1 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/50">
                    {avatarImage ? (
                      <img
                        src={avatarImage || "/placeholder.svg"}
                        alt="Profile avatar"
                        className="h-full w-full rounded-full object-cover bg-[#121212]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-[#121212]">
                        <User className="h-10 w-10 text-white" />
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-indigo-500 p-2 text-white shadow-lg transition-all duration-200 hover:bg-indigo-600 hover:shadow-indigo-500/50"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                    className="sr-only"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm text-slate-400">Profile Picture</p>
                  <p className="text-xs text-slate-500">JPG, PNG or GIF. Max size 2MB.</p>
                  {avatarError && <p className="mt-2 text-xs text-red-400">{avatarError}</p>}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-slate-300">
                    Username
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-white/10 bg-black/40 pl-10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-300">
                    Email Address
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-white/10 bg-black/40 pl-10 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <Check className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-400" />
                  </div>
                  <p className="mt-1 text-xs text-green-400">✓ Verified</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50">
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="border-white/10 bg-[#0a0a0a] text-white backdrop-blur-xl">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          Enter your current password and choose a new one.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            className="mt-2 border-white/10 bg-black/40 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            className="mt-2 border-white/10 bg-black/40 text-white"
                          />
                          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-700">
                            <div className="h-full w-2/3 bg-gradient-to-r from-yellow-500 to-green-500"></div>
                          </div>
                          <p className="mt-1 text-xs text-slate-400">Password strength: Good</p>
                        </div>
                        <div>
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            className="mt-2 border-white/10 bg-black/40 text-white"
                          />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500">
                          Update Password
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50"
                  >
                    Save Changes
                  </Button>

                  <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 bg-transparent">
                    Logout
                  </Button>
                </div>

                <p className="text-xs text-slate-500">🔒 Your data is securely encrypted.</p>
              </div>
            </Card>

            {/* Preferences Section */}
            <Card className="border-white/10 bg-[#121212] p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-black/20 p-2">
                  <Palette className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-white">Preferences</h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* Theme Mode */}
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-500/20 p-2">
                      <Palette className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Theme Mode</p>
                      <p className="text-sm text-slate-400">Choose your preferred theme</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>

                {/* Language */}
                <div className="rounded-lg border border-white/5 bg-black/20 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-500/20 p-2">
                      <Globe className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Language</p>
                      <p className="text-sm text-slate-400">Select your preferred language</p>
                    </div>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="border-white/10 bg-black/40 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#0a0a0a] text-white">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notifications */}
                <div className="rounded-lg border border-white/5 bg-black/20 p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-500/20 p-2">
                      <Bell className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Notifications</p>
                      <p className="text-sm text-slate-400">Manage your notification preferences</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Email Alerts</span>
                      <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Agent Status Updates</span>
                      <Switch checked={agentUpdates} onCheckedChange={setAgentUpdates} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Weekly Reports</span>
                      <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                    </div>
                  </div>
                </div>

                {/* Accent Color */}
                <div className="rounded-lg border border-white/5 bg-black/20 p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-500/20 p-2">
                      <Palette className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Accent Color</p>
                      <p className="text-sm text-slate-400">Choose your preferred color theme</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {accentColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedAccent(color)}
                        className={`h-10 w-10 rounded-full ${color.class} transition-all duration-200 ${
                          selectedAccent.name === color.name
                            ? "ring-2 ring-white ring-offset-2 ring-offset-[#121212] scale-110"
                            : "hover:scale-105"
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">💡 Changes apply instantly across the platform</p>
                </div>
              </div>
            </Card>

            {/* Security Section */}
            <Card className="border-white/10 bg-[#121212] p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-black/20 p-2">
                  <Shield className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-semibold text-white">Security & Access</h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-500/20 p-2">
                      <ShieldCheck className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-400">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                </div>

                {/* API Keys */}
                <div className="rounded-lg border border-white/5 bg-black/20 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-cyan-500/20 p-2">
                        <Key className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">API Keys</p>
                        <p className="text-sm text-slate-400">Manage your API access keys</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50"
                    >
                      <Key className="mr-2 h-4 w-4" />
                      Generate New
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {apiKeys.map((key, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-black/40 p-3"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{key.name}</p>
                          <p className="text-xs text-slate-500">Last used: {key.lastUsed}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="rounded bg-black/60 px-2 py-1 text-xs text-slate-400">{key.key}</code>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connected Devices */}
                <div className="rounded-lg border border-white/5 bg-black/20 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-purple-500/20 p-2">
                        <Monitor className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Connected Devices</p>
                        <p className="text-sm text-slate-400">Manage your active sessions</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      Sign Out All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {connectedDevices.map((device, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-black/40 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium text-white">{device.device}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <MapPin className="h-3 w-3" />
                              <span>{device.location}</span>
                              <span>•</span>
                              <span>{device.lastActive}</span>
                            </div>
                          </div>
                        </div>
                        {index !== 0 && (
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Data Control */}
            <Card className="border-white/10 bg-[#121212] p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-orange-500/20 p-2">
                  <Download className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Data Control</h3>
                  <p className="text-xs text-slate-400">Manage your data</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button className="w-full justify-start border-white/10 bg-black/20 text-white hover:bg-white/5">
                  <Download className="mr-2 h-4 w-4" />
                  Export My Data
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="border-white/10 bg-[#0a0a0a] text-white backdrop-blur-xl">
                    <DialogHeader>
                      <DialogTitle className="text-red-400">Delete Account</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        This action cannot be undone. All your data will be permanently deleted.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <p className="text-sm text-slate-300">
                        Type <span className="font-mono font-bold">DELETE</span> to confirm:
                      </p>
                      <Input className="border-white/10 bg-black/40 text-white" placeholder="DELETE" />
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 border-white/10 bg-transparent">
                          Cancel
                        </Button>
                        <Button className="flex-1 bg-red-500 hover:bg-red-600">Confirm Delete</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="mt-4 text-xs text-slate-500">⚠️ Deleting your account is permanent and irreversible.</p>
            </Card>

            {/* Privacy Preferences */}
            <Card className="border-white/10 bg-[#121212] p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-green-500/20 p-2">
                  <ShieldCheck className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Privacy Preferences</h3>
                  <p className="text-xs text-slate-400">Control how we use your data</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
                  <div>
                    <p className="text-sm text-white">Allow anonymized analytics</p>
                    <p className="text-xs text-slate-500">Improve product quality without identifying you</p>
                  </div>
                  <Switch checked={allowAnalytics} onCheckedChange={setAllowAnalytics} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
                  <div>
                    <p className="text-sm text-white">Personalized recommendations</p>
                    <p className="text-xs text-slate-500">Tailor suggestions based on your usage</p>
                  </div>
                  <Switch checked={personalizedRecs} onCheckedChange={setPersonalizedRecs} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
                  <div>
                    <p className="text-sm text-white">Share crash reports</p>
                    <p className="text-xs text-slate-500">Help us fix issues faster</p>
                  </div>
                  <Switch checked={shareCrashReports} onCheckedChange={setShareCrashReports} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
                  <div>
                    <p className="text-sm text-white">Allow analytics cookies</p>
                    <p className="text-xs text-slate-500">Use cookies to measure usage and reliability</p>
                  </div>
                  <Switch checked={analyticsCookies} onCheckedChange={setAnalyticsCookies} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
                  <div>
                    <p className="text-sm text-white">Session tracking</p>
                    <p className="text-xs text-slate-500">Improve support by tracking session events</p>
                  </div>
                  <Switch checked={sessionTracking} onCheckedChange={setSessionTracking} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
                  <div>
                    <p className="text-sm text-white">Search indexing (public pages)</p>
                    <p className="text-xs text-slate-500">Allow search engines to index public content</p>
                  </div>
                  <Switch checked={searchIndexing} onCheckedChange={setSearchIndexing} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
                  <div>
                    <p className="text-sm text-white">Use anonymized data to improve models</p>
                    <p className="text-xs text-slate-500">Help us enhance Axion agent quality</p>
                  </div>
                  <Switch checked={modelImprovement} onCheckedChange={setModelImprovement} />
                </div>
              </div>
            </Card>

            {/* Authorized Apps */}
            <Card className="border-white/10 bg-[#121212] p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-cyan-500/20 p-2">
                  <AppWindow className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Authorized Apps</h3>
                  <p className="text-xs text-slate-400">Manage third-party apps connected to your account</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-slate-400" />
                    <p className="text-sm text-white">Slack</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-slate-300 hover:text-red-400">
                    Revoke
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-white/5 bg-black/20 p-3">
                  <div className="flex items-center gap-2">
                    <Link2 className="h-4 w-4 text-slate-400" />
                    <p className="text-sm text-white">Notion</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-slate-300 hover:text-red-400">
                    Revoke
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-white/10 bg-transparent text-slate-300 hover:bg-white/5"
                >
                  Add Integration
                </Button>
              </div>
            </Card>

            {/* Account Recovery */}
            <Card className="border-white/10 bg-[#121212] p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-yellow-500/20 p-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Account Recovery</h3>
                  <p className="text-xs text-slate-400">Keep your account recoverable and secure</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button className="justify-start border-white/10 bg-black/20 text-white hover:bg-white/5">
                  <Key className="mr-2 h-4 w-4" />
                  Generate Backup Codes
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-white/10 bg-transparent text-slate-300 hover:bg-white/5"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Add Recovery Email
                </Button>
              </div>
              <p className="mt-3 text-xs text-slate-500">Store recovery codes in a safe place.</p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
