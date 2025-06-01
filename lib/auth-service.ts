"use client"

// Servicio de autenticación mejorado
export interface OTPRequest {
  phone: string
  countryCode: string
}

export interface OTPVerification {
  phone: string
  code: string
  countryCode: string
}

export interface AuthUser {
  id: string
  phone: string
  email?: string
  name?: string
  avatar?: string
  verified: boolean
  createdAt: string
}

class AuthService {
  private baseUrl: string
  private token: string | null = null

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.gowork.cl"
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("gowork_auth_token")
    }
  }

  // Enviar código OTP
  async sendOTP(request: OTPRequest): Promise<{ success: boolean; message: string; sessionId?: string }> {
    try {
      // Simulación para demo - en producción usar Twilio
      if (request.phone.startsWith("9")) {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        // Guardar sesión temporal
        sessionStorage.setItem("otp_session", sessionId)
        sessionStorage.setItem("otp_phone", `${request.countryCode}${request.phone}`)

        return {
          success: true,
          message: "Código enviado exitosamente",
          sessionId,
        }
      }

      // Llamada real a la API
      const response = await fetch(`${this.baseUrl}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      const data = await response.json()

      if (response.ok) {
        sessionStorage.setItem("otp_session", data.sessionId)
        sessionStorage.setItem("otp_phone", `${request.countryCode}${request.phone}`)
        return data
      }

      return {
        success: false,
        message: data.message || "Error al enviar código",
      }
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión",
      }
    }
  }

  // Verificar código OTP
  async verifyOTP(verification: OTPVerification): Promise<{
    success: boolean
    message: string
    user?: AuthUser
    token?: string
    isNewUser?: boolean
  }> {
    try {
      const sessionId = sessionStorage.getItem("otp_session")
      const savedPhone = sessionStorage.getItem("otp_phone")

      if (!sessionId || savedPhone !== `${verification.countryCode}${verification.phone}`) {
        return {
          success: false,
          message: "Sesión inválida o expirada",
        }
      }

      // Simulación para demo - código válido: 123456
      if (verification.code === "123456") {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockUser: AuthUser = {
          id: `user_${Date.now()}`,
          phone: `${verification.countryCode}${verification.phone}`,
          verified: true,
          createdAt: new Date().toISOString(),
        }

        const mockToken = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        // Guardar autenticación
        this.token = mockToken
        localStorage.setItem("gowork_auth_token", mockToken)
        localStorage.setItem("gowork_user", JSON.stringify(mockUser))

        // Limpiar sesión OTP
        sessionStorage.removeItem("otp_session")
        sessionStorage.removeItem("otp_phone")

        return {
          success: true,
          message: "Verificación exitosa",
          user: mockUser,
          token: mockToken,
          isNewUser: true,
        }
      }

      // Llamada real a la API
      const response = await fetch(`${this.baseUrl}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...verification,
          sessionId,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        this.token = data.token
        localStorage.setItem("gowork_auth_token", data.token)
        localStorage.setItem("gowork_user", JSON.stringify(data.user))

        // Limpiar sesión OTP
        sessionStorage.removeItem("otp_session")
        sessionStorage.removeItem("otp_phone")
      }

      return data
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión",
      }
    }
  }

  // Autenticación con Google
  async initiateGoogleAuth(): Promise<void> {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    const redirectUri = `${window.location.origin}/auth/callback/google`

    const params = new URLSearchParams({
      client_id: clientId || "",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      state: Math.random().toString(36).substring(2, 15),
    })

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  // Autenticación con Facebook
  async initiateFacebookAuth(): Promise<void> {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
    const redirectUri = `${window.location.origin}/auth/callback/facebook`

    const params = new URLSearchParams({
      client_id: appId || "",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "email,public_profile",
      state: Math.random().toString(36).substring(2, 15),
    })

    window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?${params.toString()}`
  }

  // Manejar callback de OAuth
  async handleOAuthCallback(
    provider: string,
    code: string,
  ): Promise<{
    success: boolean
    message: string
    user?: AuthUser
    token?: string
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/oauth/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        this.token = data.token
        localStorage.setItem("gowork_auth_token", data.token)
        localStorage.setItem("gowork_user", JSON.stringify(data.user))
      }

      return data
    } catch (error) {
      return {
        success: false,
        message: "Error en autenticación social",
      }
    }
  }

  // Obtener usuario actual
  getCurrentUser(): AuthUser | null {
    if (typeof window === "undefined") return null

    const userStr = localStorage.getItem("gowork_user")
    return userStr ? JSON.parse(userStr) : null
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return !!this.token && !!this.getCurrentUser()
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      if (this.token) {
        await fetch(`${this.baseUrl}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
      }
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      this.token = null
      localStorage.removeItem("gowork_auth_token")
      localStorage.removeItem("gowork_user")
      sessionStorage.clear()
    }
  }

  // Actualizar perfil de usuario
  async updateProfile(updates: Partial<AuthUser>): Promise<{
    success: boolean
    message: string
    user?: AuthUser
  }> {
    try {
      const currentUser = this.getCurrentUser()
      if (!currentUser) {
        return {
          success: false,
          message: "Usuario no autenticado",
        }
      }

      const response = await fetch(`${this.baseUrl}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        const updatedUser = { ...currentUser, ...data.user }
        localStorage.setItem("gowork_user", JSON.stringify(updatedUser))
        return {
          success: true,
          message: "Perfil actualizado",
          user: updatedUser,
        }
      }

      return data
    } catch (error) {
      return {
        success: false,
        message: "Error al actualizar perfil",
      }
    }
  }
}

export const authService = new AuthService()
