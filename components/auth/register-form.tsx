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

  const { register } = useAuth()

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
