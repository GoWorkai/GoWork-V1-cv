"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  userType: "client" | "provider" | "both"
  avatar?: string
  location?: string
  verified: boolean
  rating?: number
  completedJobs?: number
  skills?: string[]
  services?: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem("gowork_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulación de login - en producción sería una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Usuario de ejemplo
      const mockUser: User = {
        id: "1",
        name: "María González",
        email: email,
        phone: "+56 9 1234 5678",
        userType: "both",
        avatar: "/placeholder.svg?height=100&width=100&text=MG",
        location: "Santiago, Chile",
        verified: true,
        rating: 4.8,
        completedJobs: 24,
        skills: ["Diseño Gráfico", "Marketing Digital", "Fotografía"],
        services: ["Diseño de logos", "Gestión de redes sociales", "Fotografía de productos"],
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      localStorage.setItem("gowork_user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Error en login:", error)
      return false
    }
  }

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Simulación de registro
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        userType: userData.userType,
        verified: false,
        rating: 0,
        completedJobs: 0,
        skills: [],
        services: [],
      }

      setUser(newUser)
      setIsAuthenticated(true)
      localStorage.setItem("gowork_user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Error en registro:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("gowork_user")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("gowork_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
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
