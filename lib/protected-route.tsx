"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-context"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] ProtectedRoute check - loading:", loading, "user:", !!user, "isAdmin:", isAdmin)
    
    if (!loading) {
      // <CHANGE> Redirect to login if not authenticated or not admin
      if (!user || !isAdmin) {
        console.log("[v0] Redirecting to login - unauthorized access")
        router.push("/login")
      } else {
        console.log("[v0] Access granted to protected route")
      }
    }
  }, [user, loading, isAdmin, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Verifying credentials...</p>
        </div>
      </div>
    )
  }

  // <CHANGE> Show loading if not admin
  if (!user || !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
