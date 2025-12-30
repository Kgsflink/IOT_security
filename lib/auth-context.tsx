"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth"
import { auth } from "./firebase"

const ADMIN_EMAILS = [
  "kgopalsahani8@gmail.com",
  "admin@chaukidar.local",
  "security@chaukidar.local",
  // Add more admin emails here
]

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, pass: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("[v0] Auth state changed:", user?.email)

      // Verify user is in admin whitelist
      if (user && user.email) {
        const adminStatus = ADMIN_EMAILS.includes(user.email)
        setIsAdmin(adminStatus)

        if (!adminStatus) {
          console.log("[v0] User not in admin whitelist, signing out")
          firebaseSignOut(auth)
          setUser(null)
        } else {
          console.log("[v0] Admin access granted")
          setUser(user)
        }
      } else {
        setUser(null)
        setIsAdmin(false)
      }

      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, pass: string) => {
    console.log("[v0] Attempting sign in for:", email)

    // Pre-validate admin email
    if (!ADMIN_EMAILS.includes(email)) {
      throw new Error("Unauthorized: Admin access required")
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, pass)
      console.log("[v0] Sign in successful:", result.user.email)
    } catch (error: any) {
      console.log("[v0] Sign in failed:", error.message)
      throw error
    }
  }

  const signOut = async () => {
    console.log("[v0] Signing out")
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Export admin whitelist for other components
export { ADMIN_EMAILS }
