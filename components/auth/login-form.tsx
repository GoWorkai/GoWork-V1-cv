"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GoWorkLogo } from "@/components/gowork-logo"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowLeft } from "lucide-react"

interface LoginFormProps {
  onBack: () => void
  onSwitchToRegister: () => void
}

export function LoginForm({ onBack, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (!success) {
        setError("Credenciales incorrectas. Intenta nuevamente.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
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

          <CardTitle className="text-2xl font-bold text-white">Iniciar Sesión</CardTitle>
          <p className="text-gray-300">Accede a tu cuenta de GoWork</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-lg text-sm">{error}</div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0056b3] hover:to-[#007bff] text-white py-3 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>

            <div className="text-center">
              <button type="button" className="text-[#007bff] hover:text-[#0056b3] text-sm font-medium">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-300">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-[#FFA500] hover:text-[#FF8C00] font-medium"
                >
                  Regístrate gratis
                </button>
              </p>
            </div>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
            <p className="text-blue-300 text-sm font-medium mb-2">Demo - Credenciales de prueba:</p>
            <p className="text-blue-200 text-xs">Email: demo@gowork.com</p>
            <p className="text-blue-200 text-xs">Contraseña: cualquier cosa</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
