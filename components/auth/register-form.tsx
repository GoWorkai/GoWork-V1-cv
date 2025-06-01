"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GoWorkLogo } from "@/components/gowork-logo"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Loader2, User, Mail, Phone, MapPin } from "lucide-react"

interface RegisterFormProps {
  onBack: () => void
  onSwitchToLogin: () => void
}

export function RegisterForm({ onBack, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    userType: "" as "client" | "provider" | "both" | "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { register, loginWithGoogle, loginWithFacebook } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (!formData.userType) {
      setError("Selecciona qué tipo de usuario eres")
      setIsLoading(false)
      return
    }

    try {
      const success = await register(formData)
      if (!success) {
        setError("Error al crear la cuenta. Intenta nuevamente.")
      }
    } catch (err) {
      setError("Error al registrarse. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGoogleLogin = () => {
    loginWithGoogle()
  }

  const handleFacebookLogin = () => {
    loginWithFacebook()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800/90 backdrop-blur-xl border border-gray-700">
        <CardHeader className="text-center pb-6">
          <button
            onClick={onBack}
            className="absolute top-6 left-6 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex justify-center mb-4">
            <GoWorkLogo size={60} showText={true} />
          </div>

          <CardTitle className="text-2xl font-bold text-white">Crear Cuenta</CardTitle>
          <p className="text-gray-300">Únete a la comunidad GoWork</p>
        </CardHeader>

        <CardContent>
          {/* Social Registration Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-center"
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Registrarse con Google
            </Button>

            <Button
              onClick={handleFacebookLogin}
              className="w-full bg-[#1877F2] text-white hover:bg-[#166FE5] flex items-center justify-center"
              disabled={isLoading}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
                />
              </svg>
              Registrarse con Facebook
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-800 px-2 text-gray-400">O regístrate con tu correo</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Tu nombre completo"
                  className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="tu@email.com"
                  className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+56 9 1234 5678"
                  className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Ubicación</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Santiago, Chile"
                  className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">¿Qué te interesa más?</label>
              <select
                value={formData.userType}
                onChange={(e) => handleInputChange("userType", e.target.value)}
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-[#007bff] focus:ring-[#007bff]"
                required
              >
                <option value="" className="bg-gray-800">
                  Selecciona una opción
                </option>
                <option value="client" className="bg-gray-800">
                  Contratar servicios
                </option>
                <option value="provider" className="bg-gray-800">
                  Ofrecer mis servicios
                </option>
                <option value="both" className="bg-gray-800">
                  Ambos (Perfil Dual)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Contraseña</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Confirmar contraseña</label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Repite tu contraseña"
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-lg text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#FFA500] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFA500] text-white py-3 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta Gratis"
              )}
            </Button>

            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-300">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-[#007bff] hover:text-[#0056b3] font-medium"
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
