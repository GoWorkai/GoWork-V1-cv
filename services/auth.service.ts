// Servicio de autenticación simplificado
export interface AuthUser {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

export interface AuthResponse {
  success: boolean
  user?: AuthUser
  token?: string
  message?: string
}

class AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.gowork.cl"

  // Validar token existente
  async validateToken(token: string): Promise<AuthResponse> {
    try {
      // Simulación para demo - en producción sería una llamada real a la API
      if (token === "demo_token_123") {
        return {
          success: true,
          user: {
            id: "demo_user_1",
            name: "Usuario Demo",
            email: "demo@gowork.com",
            phone: "+56912345678",
            avatar: "/placeholder.svg?height=40&width=40",
          },
        }
      }

      // Llamada real a la API
      const response = await fetch(`${this.baseUrl}/auth/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        return {
          success: true,
          user: data.user,
        }
      }

      return {
        success: false,
        message: "Token inválido",
      }
    } catch (error) {
      console.error("Error validating token:", error)
      return {
        success: false,
        message: "Error de conexión",
      }
    }
  }

  // Login demo para testing
  async loginDemo(): Promise<AuthResponse> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      token: "demo_token_123",
      user: {
        id: "demo_user_1",
        name: "Usuario Demo",
        email: "demo@gowork.com",
        phone: "+56912345678",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    }
  }

  // Login con credenciales
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // Credenciales demo
      if (email === "demo@gowork.com" && password === "demo123") {
        return this.loginDemo()
      }

      // Llamada real a la API
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        return {
          success: true,
          token: data.token,
          user: data.user,
        }
      }

      return {
        success: false,
        message: "Credenciales inválidas",
      }
    } catch (error) {
      console.error("Error during login:", error)
      return {
        success: false,
        message: "Error de conexión",
      }
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem("gowork_token")
      if (token) {
        await fetch(`${this.baseUrl}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }
}

export const authService = new AuthService()
