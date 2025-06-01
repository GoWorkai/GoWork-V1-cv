"use client"

import { useState, useEffect, useCallback } from "react"
import { authService, type AuthUser, type OTPRequest, type OTPVerification } from "@/lib/auth-service"

interface UseAuthReturn {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean

  // Métodos OTP
  sendOTP: (request: OTPRequest) => Promise<{ success: boolean; message: string; sessionId?: string }>
  verifyOTP: (verification: OTPVerification) => Promise<{
    success: boolean
    message: string
    user?: AuthUser
    token?: string
    isNewUser?: boolean
  }>

  // Métodos OAuth
  loginWithGoogle: () => void
  loginWithFacebook: () => void
  handleOAuthCallback: (
    provider: string,
    code: string,
  ) => Promise<{
    success: boolean
    message: string
    user?: AuthUser
    token?: string
  }>

  // Métodos generales
  updateProfile: (updates: Partial<AuthUser>) => Promise<{
    success: boolean
    message: string
    user?: AuthUser
  }>
  logout: () => Promise<void>
  refreshUser: () => void
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Inicializar autenticación
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error initializing auth:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  // Enviar OTP
  const sendOTP = useCallback(async (request: OTPRequest) => {
    setIsLoading(true)
    try {
      const result = await authService.sendOTP(request)
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Verificar OTP
  const verifyOTP = useCallback(async (verification: OTPVerification) => {
    setIsLoading(true)
    try {
      const result = await authService.verifyOTP(verification)
      if (result.success && result.user) {
        setUser(result.user)
      }
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Login con Google
  const loginWithGoogle = useCallback(() => {
    authService.initiateGoogleAuth()
  }, [])

  // Login con Facebook
  const loginWithFacebook = useCallback(() => {
    authService.initiateFacebookAuth()
  }, [])

  // Manejar callback OAuth
  const handleOAuthCallback = useCallback(async (provider: string, code: string) => {
    setIsLoading(true)
    try {
      const result = await authService.handleOAuthCallback(provider, code)
      if (result.success && result.user) {
        setUser(result.user)
      }
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Actualizar perfil
  const updateProfile = useCallback(async (updates: Partial<AuthUser>) => {
    setIsLoading(true)
    try {
      const result = await authService.updateProfile(updates)
      if (result.success && result.user) {
        setUser(result.user)
      }
      return result
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Cerrar sesión
  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Refrescar usuario
  const refreshUser = useCallback(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }, [])

  return {
    user,
    isAuthenticated: authService.isAuthenticated(),
    isLoading,
    sendOTP,
    verifyOTP,
    loginWithGoogle,
    loginWithFacebook,
    handleOAuthCallback,
    updateProfile,
    logout,
    refreshUser,
  }
}
