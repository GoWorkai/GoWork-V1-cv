"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface User {
  id: string
  email: string
  full_name: string
  user_type: "freelancer" | "client"
  phone?: string
  location?: string
  avatar_url?: string
  verified: boolean
  rating: number
  total_reviews: number
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  // Funciones simuladas para evitar errores
  const signIn = async (email: string, password: string) => {
    return { error: null }
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    return { error: null }
  }

  const signOut = async () => {
    setUser(null)
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
