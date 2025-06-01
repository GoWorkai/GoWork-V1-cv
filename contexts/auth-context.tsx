"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { authService, type AuthUser, type AuthResponse } from "../services/auth.service"

interface AuthContextProps {
  isAuthenticated: boolean
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthResponse>
  loginDemo: () => Promise<AuthResponse>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  login: async () => ({ success: false }),
  loginDemo: async () => ({ success: false }),
  logout: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true)
      const response = await authService.login(email, password)

      if (response.success && response.token && response.user) {
        localStorage.setItem("gowork_token", response.token)
        setUser(response.user)
        setIsAuthenticated(true)
      }

      return response
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Error inesperado" }
    } finally {
      setIsLoading(false)
    }
  }

  const loginDemo = async (): Promise<AuthResponse> => {
    try {
      setIsLoading(true)
      const response = await authService.loginDemo()

      if (response.success && response.token && response.user) {
        localStorage.setItem("gowork_token", response.token)
        setUser(response.user)
        setIsAuthenticated(true)
      }

      return response
    } catch (error) {
      console.error("Demo login error:", error)
      return { success: false, message: "Error inesperado" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("gowork_token")
      setIsAuthenticated(false)
      setUser(null)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("gowork_token")

        if (token) {
          const userData = await authService.validateToken(token)
          if (userData.success && userData.user) {
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
        loginDemo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
