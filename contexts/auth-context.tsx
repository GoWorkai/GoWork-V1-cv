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
        try {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          setIsAuthenticated(true)
        } catch (error) {
          // Si hay error parseando, limpiar datos
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

      // Simulación de login exitoso para demo
      if (credentials.email === "demo@gowork.com" && credentials.password === "demo123") {
        const demoUser: User = {
          id: "demo-user-1",
          email: "demo@gowork.com",
          name: "Usuario Demo",
          phone: "+56912345678",
          avatar: "/placeholder.svg?height=40&width=40",
          isVerified: true,
          rating: 4.8,
          completedServices: 25,
          joinedDate: "2024-01-15",
          location: "Santiago, Chile",
        }

        setUser(demoUser)
        setIsAuthenticated(true)

        // Guardar en localStorage
        localStorage.setItem("gowork_token", "demo-token-123")
        localStorage.setItem("gowork_user", JSON.stringify(demoUser))

        return true
      }

      // Para otros casos, usar la API real
      const response = await apiService.login(credentials)

      if (response.success && response.data) {
        setUser(response.data.user)
        setIsAuthenticated(true)
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
    // Simulación de login con Google para demo
    const demoUser: User = {
      id: "google-user-1",
      email: "usuario@gmail.com",
      name: "Usuario Google",
      phone: "+56987654321",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      rating: 4.9,
      completedServices: 15,
      joinedDate: "2024-02-01",
      location: "Valparaíso, Chile",
    }

    setUser(demoUser)
    setIsAuthenticated(true)
    localStorage.setItem("gowork_token", "google-token-123")
    localStorage.setItem("gowork_user", JSON.stringify(demoUser))
  }

  const loginWithFacebook = () => {
    // Simulación de login con Facebook para demo
    const demoUser: User = {
      id: "facebook-user-1",
      email: "usuario@facebook.com",
      name: "Usuario Facebook",
      phone: "+56911111111",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
      rating: 4.7,
      completedServices: 30,
      joinedDate: "2024-01-01",
      location: "Concepción, Chile",
    }

    setUser(demoUser)
    setIsAuthenticated(true)
    localStorage.setItem("gowork_token", "facebook-token-123")
    localStorage.setItem("gowork_user", JSON.stringify(demoUser))
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setUser(null)
      setIsAuthenticated(false)
      localStorage.removeItem("gowork_token")
      localStorage.removeItem("gowork_user")
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
