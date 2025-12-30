"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Shield, Eye, EyeOff, AlertCircle, Lock, CheckCircle2 } from "lucide-react"
import { ADMIN_EMAILS } from "@/lib/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [securityLevel, setSecurityLevel] = useState(0)
  const { signIn, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] Login page - checking user status:", !!user)
    if (user) {
      console.log("[v0] User authenticated, redirecting to dashboard")
      router.push("/")
    }
  }, [user, router])

  useEffect(() => {
    if (!password) {
      setSecurityLevel(0)
      return
    }

    let level = 0
    if (password.length >= 8) level++
    if (password.length >= 12) level++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) level++
    if (/\d/.test(password)) level++
    if (/[^a-zA-Z0-9]/.test(password)) level++

    setSecurityLevel(Math.min(level, 4))
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    console.log("[v0] Login attempt for:", email)

    if (!email || !password) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    if (!ADMIN_EMAILS.includes(email)) {
      setError("Access Denied: Admin credentials required")
      setLoading(false)
      return
    }

    try {
      await signIn(email, password)
      console.log("[v0] Sign in successful, redirecting...")
      // Navigation will be handled by the useEffect above
    } catch (err: any) {
      console.log("[v0] Sign in error:", err)

      let errorMessage = "Authentication failed"

      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        errorMessage = "Invalid email or password"
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "Admin account not found"
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later"
      } else if (err.message.includes("Unauthorized")) {
        errorMessage = err.message
      } else if (err.message) {
        errorMessage = err.message
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const getSecurityColor = () => {
    if (securityLevel === 0) return "bg-muted"
    if (securityLevel <= 2) return "bg-destructive"
    if (securityLevel === 3) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getSecurityLabel = () => {
    if (securityLevel === 0) return ""
    if (securityLevel <= 2) return "Weak"
    if (securityLevel === 3) return "Medium"
    return "Strong"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 mb-4 shadow-lg shadow-primary/20">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-balance mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Chaukidar
          </h1>
          <p className="text-muted-foreground text-sm font-medium">Admin Security Portal</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>Enterprise-Grade IoT Protection</span>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Administrator Access</CardTitle>
            <CardDescription>Secure authentication required for network operations</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Authentication Error</p>
                    <p className="text-xs opacity-90">{error}</p>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@chaukidar.local"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-11"
                  autoComplete="email"
                />
                <p className="text-xs text-muted-foreground">Only authorized admin accounts can access</p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="pr-10 h-11"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={loading}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {password && (
                  <div className="space-y-1.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            level <= securityLevel ? getSecurityColor() : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    {securityLevel > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Security: <span className="font-medium">{getSecurityLabel()}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Security Features Notice */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Protected by Firebase Security</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>End-to-End Encrypted Communication</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-primary">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Admin Whitelist Verification</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full h-11 text-base font-medium" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Secure Sign In</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-muted-foreground">Powered by Agentic AI & Firebase Authentication</p>
          <p className="text-xs text-muted-foreground/60">Protected access for network administrators only</p>
        </div>
      </div>
    </div>
  )
}
