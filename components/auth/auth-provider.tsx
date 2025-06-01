"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase, type User } from "@/lib/supabase"
import type { Session, AuthError } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ data?: Session; error?: AuthError }>
  signUp: (
    email: string,
    password: string,
    userData: Partial<User>,
  ) => Promise<{ data?: { user: any; session: Session | null }; error?: AuthError }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<{ data?: User; error?: any }>
  resetPassword: (email: string) => Promise<{ data?: any; error?: AuthError }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

      if (error) throw error
      setUser(data as User)
    } catch (error) {
      console.error("Error fetching user profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          user_type: userData.user_type || "client",
        },
      },
    })

    if (error) return { error }

    if (data.user) {
      // Crear perfil de usuario
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email,
        full_name: userData.full_name || "",
        phone: userData.phone || null,
        user_type: userData.user_type || "client",
        location: userData.location || null,
        verified: false,
        rating: 0,
        total_reviews: 0,
      })

      if (profileError) return { error: profileError as AuthError }
    }

    return { data }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { error: new Error("No user logged in") }

    const { data, error } = await supabase.from("users").update(updates).eq("id", user.id).select().single()

    if (!error) {
      setUser({ ...user, ...updates })
      return { data: data as User }
    }

    return { error }
  }

  const resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
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
