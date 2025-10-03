"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "signin" | "signup"
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  if (!isOpen) return null

  const isSignUp = mode === "signup"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 py-4 sm:py-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl ${
          isSignUp
            ? "max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-purple-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-purple-500"
            : "max-h-fit"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 right-4 float-right mt-4 mr-4 z-10 rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white bg-black/40 backdrop-blur-sm"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-8 pt-2">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
              <span className="font-mono text-2xl font-bold text-white">A</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{isSignUp ? "Create your account" : "Welcome back"}</h2>
            <p className="mt-2 text-sm text-slate-400">
              {isSignUp ? "Start building AI agents in minutes" : "Sign in to continue to Axion"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-slate-500 backdrop-blur-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-slate-500 backdrop-blur-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-12 text-white placeholder-slate-500 backdrop-blur-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-slate-500 backdrop-blur-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            {/* Forgot Password (Sign In Only) */}
            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-purple-400 transition-colors hover:text-purple-300">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-6 text-white transition-all hover:from-indigo-700 hover:to-purple-700"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-slate-400">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
            >
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </Button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                /* Toggle between sign in and sign up */
              }}
              className="text-purple-400 transition-colors hover:text-purple-300"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
