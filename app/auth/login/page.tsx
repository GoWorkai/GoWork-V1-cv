"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"client" | "freelancer">("client")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { signIn, signUp } = useAuth()
  const router = useRouter()

  // Estados para formularios
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    location: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await signIn(loginForm.email, loginForm.password)

      if (error) {
        setError(error.message)
      } else if (data?.session) {
        setSuccess("¡Inicio de sesión exitoso!")
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await signUp(signupForm.email, signupForm.password, {
        full_name: signupForm.full_name,
        user_type: userType,
        phone: signupForm.phone,
        location: signupForm.location,
        verified: false,
        rating: 0,
        total_reviews: 0,
      })

      if (error) {
        setError(error.message)
      } else {
        setSuccess("¡Cuenta creada exitosamente! Por favor revisa tu correo electrónico para confirmar tu cuenta.")
        // No redirigimos automáticamente para que el usuario pueda ver el mensaje de éxito
      }
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="text-3xl font-bold">
            <span className="text-[#0066FF]">Go</span>
            <span className="text-[#00E5B4]">Work</span>
          </div>
          <p className="text-gray-400">Conecta tu talento con oportunidades</p>
        </div>

        {/* Alertas */}
        {error && (
          <Alert className="border-red-500 bg-red-500/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-500 bg-green-500/10">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-green-400">{success}</AlertDescription>
          </Alert>
        )}

        {/* Auth Tabs */}
        <Tabs defaultValue="login" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 border border-gray-700">
            <TabsTrigger value="login" className="data-[state=active]:bg-[#0066FF] data-[state=active]:text-white">
              Iniciar Sesión
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-[#0066FF] data-[state=active]:text-white">
              Registrarse
            </TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-center">Bienvenido de vuelta</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="bg-gray-800 border-gray-600 pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="bg-gray-800 border-gray-600 pl-10 pr-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm text-gray-400">
                        Recordarme
                      </Label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm text-[#00E5B4] hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium"
                    disabled={loading}
                  >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-center">Únete a GoWork</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  {/* User Type Selection */}
                  <div className="space-y-3">
                    <Label>¿Cómo quieres usar GoWork?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={userType === "client" ? "default" : "outline"}
                        className={`h-20 flex-col space-y-2 ${
                          userType === "client"
                            ? "bg-[#0066FF] text-white"
                            : "border-gray-600 text-gray-300 hover:bg-gray-800"
                        }`}
                        onClick={() => setUserType("client")}
                      >
                        <User className="h-6 w-6" />
                        <span>Buscar servicios</span>
                      </Button>
                      <Button
                        type="button"
                        variant={userType === "freelancer" ? "default" : "outline"}
                        className={`h-20 flex-col space-y-2 ${
                          userType === "freelancer"
                            ? "bg-[#00E5B4] hover:bg-[#00CC9F] text-black"
                            : "border-gray-600 text-gray-300 hover:bg-gray-800"
                        }`}
                        onClick={() => setUserType("freelancer")}
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                          />
                        </svg>
                        <span>Ofrecer servicios</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nombre completo</Label>
                    <Input
                      id="full_name"
                      placeholder="Juan Pérez"
                      value={signupForm.full_name}
                      onChange={(e) => setSignupForm({ ...signupForm, full_name: e.target.value })}
                      className="bg-gray-800 border-gray-600 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup_email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup_email"
                        type="email"
                        placeholder="tu@email.com"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        className="bg-gray-800 border-gray-600 pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                        className="bg-gray-800 border-gray-600 pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      placeholder="Santiago, Chile"
                      value={signupForm.location}
                      onChange={(e) => setSignupForm({ ...signupForm, location: e.target.value })}
                      className="bg-gray-800 border-gray-600 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup_password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup_password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                        className="bg-gray-800 border-gray-600 pl-10 pr-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-gray-400">
                      Acepto los{" "}
                      <Link href="/terms" className="text-[#00E5B4] hover:underline">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacy" className="text-[#00E5B4] hover:underline">
                        política de privacidad
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full font-medium ${
                      userType === "freelancer"
                        ? "bg-[#00E5B4] hover:bg-[#00CC9F] text-black"
                        : "bg-[#0066FF] hover:bg-[#0052CC] text-white"
                    }`}
                    disabled={loading}
                  >
                    {loading
                      ? "Creando cuenta..."
                      : userType === "freelancer"
                        ? "Crear perfil de proveedor"
                        : "Crear cuenta"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
