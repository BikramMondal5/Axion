"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export function Navbar() {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: "signin" | "signup" }>({
    isOpen: false,
    mode: "signin",
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

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
                <span className="text-lg sm:text-xl font-semibold text-purple-500">Axion</span>
              </Link>
            </div>

            {/* Center: Navigation Links - Desktop */}
            <div className="hidden items-center gap-6 lg:gap-8 md:flex">
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
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-300 transition-colors hover:text-purple-500 active:text-purple-500"
              >
                Dashboard
              </Link>
            </div>

            {/* Right: Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-3">
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

            {/* Mobile menu button */}
            <div className="flex items-center gap-3 md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:bg-white/5 hover:text-white"
                onClick={() => setAuthModal({ isOpen: true, mode: "signin" })}
              >
                Sign In
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:bg-white/5 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/5 bg-black/40 backdrop-blur-md">
              <div className="px-4 py-6 space-y-4">
                <Link
                  href="#marketplace"
                  className="block text-base font-medium text-slate-300 transition-colors hover:text-purple-500 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Marketplace
                </Link>
                <Link
                  href="#docs"
                  className="block text-base font-medium text-slate-300 transition-colors hover:text-purple-500 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Docs
                </Link>
                <Link
                  href="#pricing"
                  className="block text-base font-medium text-slate-300 transition-colors hover:text-purple-500 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#community"
                  className="block text-base font-medium text-slate-300 transition-colors hover:text-purple-500 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Community
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-base font-medium text-slate-300 transition-colors hover:text-purple-500 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="pt-4 border-t border-white/10">
                  <Button
                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={() => {
                      setAuthModal({ isOpen: true, mode: "signup" })
                      setMobileMenuOpen(false)
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
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
