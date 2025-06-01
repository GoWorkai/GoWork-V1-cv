"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { authService } from "../services/auth.service"

interface AuthContextProps {
  isAuthenticated: boolean
  user: any
  isLoading: boolean
  login: (token: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  login: async () => {},
  logout: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = async (token: string) => {
    localStorage.setItem("gowork_token", token)
    const userData = await authService.validateToken(token)
    if (userData.success) {
      setUser(userData.user)
      setIsAuthenticated(true)
    }
  }

  const logout = () => {
    localStorage.removeItem("gowork_token")
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("gowork_token")

        if (token) {
          // Validar token existente
          const userData = await authService.validateToken(token)
          if (userData.success) {
            setUser(userData.user)
            setIsAuthenticated(true)
          } else {
            localStorage.removeItem("gowork_token")
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        localStorage.removeItem("gowork_token")
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
