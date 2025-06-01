"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiService, type User, type LoginRequest, type RegisterRequest } from "@/lib/api"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<boolean>
  register: (userData: RegisterRequest) => Promise<boolean>
  loginWithGoogle: () => void
  loginWithFacebook: () => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      // Verificar si hay un token guardado
      const savedToken = localStorage.getItem("gowork_token")
      const savedUser = localStorage.getItem("gowork_user")

      if (savedToken && savedUser) {
        // Verificar que el token siga siendo válido
        const profileResponse = await apiService.getProfile()

        if (profileResponse.success && profileResponse.data) {
          setUser(profileResponse.data)
          setIsAuthenticated(true)
        } else {
          // Token inválido, limpiar datos
          localStorage.removeItem("gowork_token")
          localStorage.removeItem("gowork_user")
        }
      }
    } catch (error) {
      console.error("Error initializing auth:", error)
      // En caso de error, limpiar datos
      localStorage.removeItem("gowork_token")
      localStorage.removeItem("gowork_user")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await apiService.login(credentials)

      if (response.success && response.data) {
        setUser(response.data.user)
        setIsAuthenticated(true)

        // Redirigir a la aplicación antigua
        window.location.href =
          process.env.NEXT_PUBLIC_REDIRECT_URL || "https://v0-image-analysis-one-psi-82.vercel.app/chat"
        return true
      } else {
        console.error("Login failed:", response.error)
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await apiService.register(userData)

      if (response.success && response.data) {
        setUser(response.data.user)
        setIsAuthenticated(true)

        // Redirigir a la aplicación antigua
        window.location.href =
          process.env.NEXT_PUBLIC_REDIRECT_URL || "https://v0-image-analysis-one-psi-82.vercel.app/chat"
        return true
      } else {
        console.error("Registration failed:", response.error)
        return false
      }
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = () => {
    apiService.initiateGoogleAuth()
  }

  const loginWithFacebook = () => {
    apiService.initiateFacebookAuth()
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("gowork_user", JSON.stringify(updatedUser))
    }
  }

  const refreshProfile = async () => {
    try {
      const response = await apiService.getProfile()
      if (response.success && response.data) {
        setUser(response.data)
        localStorage.setItem("gowork_user", JSON.stringify(response.data))
      }
    } catch (error) {
      console.error("Error refreshing profile:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        updateUser,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
