"use client"

import { Navbar } from "@/components/navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Database, ShieldCheck, KeySquare } from "lucide-react"

export default function UserDatabaseLandingPage() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="flex pt-16">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl p-8">
            {/* Breadcrumb-like header */}
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
                <span>Dashboard</span>
                <span className="text-white">/ Database</span>
              </div>
              <h1 className="text-3xl font-bold text-white">Your Secure Database</h1>
              <p className="mt-2 text-slate-400">
                Manage your API keys, monitor usage, and protect your account with 2FA.
              </p>
            </div>

            {/* Quick intro cards */}
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="border-white/10 bg-[#121212] p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                  <KeySquare className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">API Keys</h3>
                <p className="text-sm text-slate-400">
                  Create, copy, and revoke keys. See masked keys until you reveal them.
                </p>
              </Card>
              <Card className="border-white/10 bg-[#121212] p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">Usage Analytics</h3>
                <p className="text-sm text-slate-400">
                  Track daily requests and understand distribution across your keys.
                </p>
              </Card>
              <Card className="border-white/10 bg-[#121212] p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-white">2FA Security</h3>
                <p className="text-sm text-slate-400">
                  Add an extra layer of protection to your account with two-factor authentication.
                </p>
              </Card>
            </div>

            {/* Primary path to full database page */}
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Manage Database</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Go to your Database page to manage keys, view usage, and enable 2FA.
                </p>
              </div>
              <Link href="/database">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700">
                  Open Database
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
