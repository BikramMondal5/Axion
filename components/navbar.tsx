"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"

export function Navbar() {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "signin" | "signup" }>({
    isOpen: false,
    mode: "signin",
  })

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                  <span className="font-mono text-lg font-bold text-white">A</span>
                </div>
                <span className="text-xl font-semibold text-purple-500">Axion</span>
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="#marketplace"
                className="text-sm font-medium text-slate-300 transition-colors hover:text-purple-500 active:text-purple-500"
              >
                Marketplace
              </Link>
              <Link
                href="#docs"
                className="text-sm font-medium text-slate-300 transition-colors hover:text-purple-500 active:text-purple-500"
              >
                Docs
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-slate-300 transition-colors hover:text-purple-500 active:text-purple-500"
              >
                Pricing
              </Link>
              <Link
                href="#community"
                className="text-sm font-medium text-slate-300 transition-colors hover:text-purple-500 active:text-purple-500"
              >
                Community
              </Link>
            </div>

            {/* Right: Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="hidden text-slate-300 hover:bg-white/5 hover:text-white sm:inline-flex"
                onClick={() => setAuthModal({ isOpen: true, mode: "signin" })}
              >
                Sign In
              </Button>
              <Button
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => setAuthModal({ isOpen: true, mode: "signup" })}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
        mode={authModal.mode}
      />
    </>
  )
}
