"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { GoWorkLogo } from "@/components/gowork-logo"
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  User,
  CheckCircle,
  Clock,
  RefreshCw,
  Loader2,
  Star,
  Home,
  Code,
  Palette,
  Camera,
  Wrench,
  Heart,
  GraduationCap,
  Briefcase,
  Car,
  Zap,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import type { OTPRequest, OTPVerification } from "@/lib/auth-service"

type OnboardingStep =
  | "modal"
  | "phone-register"
  | "otp-register"
  | "basic-data"
  | "location"
  | "skills"
  | "needs"
  | "activate-gow"
  | "welcome"
  | "phone-login"
  | "otp-login"

interface OnboardingFlowProps {
  onComplete: (userData: any) => void
  onClose: () => void
}

const skillCategories = [
  { icon: Home, name: "Hogar", color: "bg-blue-500", skills: ["Limpieza", "Jardinería", "Plomería", "Electricidad"] },
  {
    icon: Code,
    name: "Tecnología",
    color: "bg-purple-500",
    skills: ["Desarrollo Web", "Apps", "Soporte IT", "Diseño UX"],
  },
  { icon: Palette, name: "Diseño", color: "bg-pink-500", skills: ["Logos", "Branding", "Ilustración", "Fotografía"] },
  { icon: Camera, name: "Eventos", color: "bg-orange-500", skills: ["Fotografía", "Video", "DJ", "Catering"] },
  {
    icon: Wrench,
    name: "Reparaciones",
    color: "bg-green-500",
    skills: ["Electrodomésticos", "Celulares", "Computadores"],
  },
  {
    icon: Heart,
    name: "Bienestar",
    color: "bg-red-500",
    skills: ["Masajes", "Entrenamiento", "Nutrición", "Terapias"],
  },
  {
    icon: GraduationCap,
    name: "Educación",
    color: "bg-indigo-500",
    skills: ["Clases", "Tutorías", "Idiomas", "Música"],
  },
  {
    icon: Car,
    name: "Transporte",
    color: "bg-yellow-500",
    skills: ["Conductor", "Delivery", "Mudanzas", "Mensajería"],
  },
]

const clientNeeds = [
  "Buscar servicios para mi hogar",
  "Contratar para mi familia",
  "Servicios para mi negocio",
  "Proyectos personales",
  "Eventos especiales",
  "Reparaciones urgentes",
  "Clases y aprendizaje",
  "Bienestar y salud",
]

export function OnboardingFlow({ onComplete, onClose }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>("modal")
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    firstName: "",
    lastName: "",
    username: "",
    location: "",
    skills: [] as string[],
    needs: [] as string[],
    gowEnabled: true,
  })
  const [otpTimer, setOtpTimer] = useState(30)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { user, isLoading: authLoading, sendOTP, verifyOTP, loginWithGoogle, loginWithFacebook } = useAuth()

  // Timer para OTP
  useEffect(() => {
    if ((step === "otp-register" || step === "otp-login") && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [step, otpTimer])

  const handlePhoneSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      const otpRequest: OTPRequest = {
        phone: formData.phone,
        countryCode: "+56",
      }

      const result = await sendOTP(otpRequest)

      if (result.success) {
        setOtpTimer(30)
        setStep(isLogin ? "otp-login" : "otp-register")
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Error al enviar código. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async () => {
    if (formData.otp.length !== 6) {
      setError("Ingresa el código de 6 dígitos")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const verification: OTPVerification = {
        phone: formData.phone,
        code: formData.otp,
        countryCode: "+56",
      }

      const result = await verifyOTP(verification)

      if (result.success) {
        if (isLogin || result.isNewUser) {
          // Login exitoso o usuario nuevo - ir al dashboard o continuar registro
          if (isLogin) {
            onComplete(result.user)
          } else {
            setStep("basic-data")
          }
        }
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError("Error al verificar código. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsLoading(false)
    setOtpTimer(30)
  }

  const generateUsername = (firstName: string) => {
    return firstName.toLowerCase().replace(/\s+/g, "") + Math.floor(Math.random() * 1000)
  }

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleNeedToggle = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      needs: prev.needs.includes(need) ? prev.needs.filter((n) => n !== need) : [...prev.needs, need],
    }))
  }

  const canContinue = () => {
    switch (step) {
      case "phone-register":
      case "phone-login":
        return formData.phone.length >= 8
      case "otp-register":
      case "otp-login":
        return formData.otp.length === 6
      case "basic-data":
        return formData.firstName.trim().length > 0
      case "location":
        return formData.location.trim().length > 0
      case "skills":
        return formData.skills.length > 0
      case "needs":
        return formData.needs.length > 0
      default:
        return true
    }
  }

  const handleGoogleLogin = () => {
    loginWithGoogle()
  }

  const handleFacebookLogin = () => {
    loginWithFacebook()
  }

  const renderStep = () => {
    switch (step) {
      case "modal":
        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <GoWorkLogo size={60} showText={true} />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">¡Bienvenido a GoWork!</CardTitle>
                <p className="text-gray-600">La red social del talento y las oportunidades</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    setIsLogin(false)
                    setStep("phone-register")
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3 text-lg font-semibold"
                >
                  <User className="mr-2 h-5 w-5" />
                  Crear Cuenta Gratis
                </Button>

                <Button
                  onClick={() => {
                    setIsLogin(true)
                    setStep("phone-login")
                  }}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-blue-500 py-3 text-lg font-semibold"
                >
                  Iniciar Sesión
                </Button>

                <button onClick={onClose} className="w-full text-sm text-gray-500 hover:text-gray-700 mt-4">
                  Continuar sin cuenta
                </button>
              </CardContent>
            </Card>
          </div>
        )

      case "phone-register":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Dime tu número y empezamos!</h2>
              <p className="text-gray-600">Te enviaremos un código para verificar tu identidad</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de teléfono</label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="text-gray-600 font-medium">+56</span>
                  </div>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="9 1234 5678"
                    className="rounded-l-none border-l-0 focus:border-blue-500"
                    maxLength={9}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">{error}</div>
              )}

              <Button
                onClick={handlePhoneSubmit}
                disabled={!canContinue() || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando código...
                  </>
                ) : (
                  <>
                    <Phone className="mr-2 h-5 w-5" />
                    Recibir código
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Al continuar aceptas nuestros{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Términos y Condiciones
                </a>{" "}
                y{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Política de Privacidad
                </a>
              </p>
            </div>
          </div>
        )

      case "phone-login":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h2>
              <p className="text-gray-600">Elige cómo quieres iniciar sesión</p>
            </div>

            <div className="space-y-4">
              {/* OAuth Buttons */}
              <Button variant="outline" className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 py-3">
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Iniciar con Google
              </Button>

              <Button
                variant="outline"
                className="w-full bg-[#1877F2] border-[#1877F2] hover:bg-[#166FE5] text-white py-3"
              >
                <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
                Iniciar con Facebook
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">O inicia con tu teléfono</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Número de teléfono</label>
                <div className="flex">
                  <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                    <span className="text-gray-600 font-medium">+56</span>
                  </div>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="9 1234 5678"
                    className="rounded-l-none border-l-0 focus:border-blue-500"
                    maxLength={9}
                  />
                </div>
              </div>

              <Button
                onClick={handlePhoneSubmit}
                disabled={!canContinue() || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando código...
                  </>
                ) : (
                  "Enviar código"
                )}
              </Button>
            </div>
          </div>
        )

      case "otp-register":
      case "otp-login":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ingresa el código que te enviamos</h2>
              <p className="text-gray-600">Enviamos un código de 6 dígitos a +56 {formData.phone}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Código de verificación</label>
                <Input
                  type="text"
                  value={formData.otp}
                  onChange={(e) => setFormData((prev) => ({ ...prev, otp: e.target.value.replace(/\D/g, "") }))}
                  placeholder="123456"
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">{error}</div>
              )}

              <div className="text-center">
                {otpTimer > 0 ? (
                  <p className="text-sm text-gray-500 flex items-center justify-center">
                    <Clock className="mr-1 h-4 w-4" />
                    Reenviar en {otpTimer}s
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center"
                  >
                    <RefreshCw className="mr-1 h-4 w-4" />
                    Reenviar código
                  </button>
                )}
              </div>

              <Button
                onClick={handleOtpSubmit}
                disabled={!canContinue() || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verificando...
                  </>
                ) : step === "otp-login" ? (
                  "Confirmar y entrar"
                ) : (
                  "Confirmar"
                )}
              </Button>
            </div>
          </div>
        )

      case "basic-data":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Cómo te llamas?</h2>
              <p className="text-gray-600">Ayúdanos a personalizar tu experiencia</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => {
                    const firstName = e.target.value
                    setFormData((prev) => ({
                      ...prev,
                      firstName,
                      username: generateUsername(firstName),
                    }))
                  }}
                  placeholder="Tu nombre"
                  className="focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Apellido (opcional)</label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Tu apellido"
                  className="focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de usuario</label>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="usuario123"
                  className="focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Este será tu identificador único en GoWork</p>
              </div>

              <Button
                onClick={() => setStep("location")}
                disabled={!canContinue()}
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3"
              >
                Continuar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )

      case "location":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Dónde trabajas?</h2>
              <p className="text-gray-600">Esto nos ayuda a conectarte con oportunidades cercanas</p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => {
                  setFormData((prev) => ({ ...prev, location: "Ubicación actual detectada" }))
                }}
                variant="outline"
                className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-3"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Usar mi ubicación actual
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">O ingresa manualmente</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección o comuna</label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="Ej: Las Condes, Santiago"
                  className="focus:border-blue-500"
                />
              </div>

              <Button
                onClick={() => setStep("skills")}
                disabled={!canContinue()}
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3"
              >
                Continuar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )

      case "skills":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecciona tus oficios</h2>
              <p className="text-gray-600">¿En qué eres bueno? (Selecciona al menos uno)</p>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 ${category.color} rounded-lg flex items-center justify-center`}>
                      <category.icon className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 ml-8">
                    {category.skills.map((skill, skillIndex) => (
                      <button
                        key={skillIndex}
                        onClick={() => handleSkillToggle(skill)}
                        className={`p-2 rounded-lg text-sm border-2 transition-all ${
                          formData.skills.includes(skill)
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                <CheckCircle className="inline h-4 w-4 mr-1" />
                Seleccionados: {formData.skills.length} oficios
              </p>
            </div>

            <Button
              onClick={() => setStep("needs")}
              disabled={!canContinue()}
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3"
            >
              Continuar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )

      case "needs":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Qué buscas como cliente?</h2>
              <p className="text-gray-600">Esto nos ayuda a recomendarte los mejores servicios</p>
            </div>

            <div className="space-y-3">
              {clientNeeds.map((need, index) => (
                <button
                  key={index}
                  onClick={() => handleNeedToggle(need)}
                  className={`w-full p-3 rounded-lg text-left border-2 transition-all ${
                    formData.needs.includes(need)
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{need}</span>
                    {formData.needs.includes(need) && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep("activate-gow")}
              disabled={!canContinue()}
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3"
            >
              Continuar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )

      case "activate-gow":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Activa Gow, tu asistente IA</h2>
              <p className="text-gray-600">
                Gow te ayudará a encontrar servicios, optimizar tu perfil y conseguir más clientes
              </p>
            </div>

            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Asistente Gow IA</h3>
                    <p className="text-sm text-gray-600">Recomendado para nuevos usuarios</p>
                  </div>
                  <Switch
                    checked={formData.gowEnabled}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, gowEnabled: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Búsquedas inteligentes con IA</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Recomendaciones personalizadas</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Optimización automática de perfil</span>
              </div>
            </div>

            <Button
              onClick={() => setStep("welcome")}
              className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3"
            >
              Finalizar configuración
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )

      case "welcome":
        return (
          <div className="space-y-6 text-center">
            <div className="animate-bounce">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Listo, {formData.firstName}! 🎉</h2>
              <p className="text-gray-600">Tu cuenta ha sido creada exitosamente</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Ya puedes empezar a explorar servicios y conectar con profesionales cerca de ti
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => onComplete(formData)}
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white py-3"
              >
                <Star className="mr-2 h-5 w-5" />
                Explorar servicios
              </Button>

              <Button
                onClick={() => onComplete(formData)}
                variant="outline"
                className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-3"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Publicar mi primer servicio
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-0 shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
        <CardHeader className="relative">
          {step !== "modal" && step !== "welcome" && (
            <button
              onClick={() => {
                if (step === "phone-register") setStep("modal")
                else if (step === "phone-login") setStep("modal")
                else if (step === "otp-register") setStep("phone-register")
                else if (step === "otp-login") setStep("phone-login")
                else if (step === "basic-data") setStep("otp-register")
                else if (step === "location") setStep("basic-data")
                else if (step === "skills") setStep("location")
                else if (step === "needs") setStep("skills")
                else if (step === "activate-gow") setStep("needs")
              }}
              className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          {step !== "modal" && step !== "welcome" && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="text-xl">×</span>
            </button>
          )}

          <div className="flex justify-center mb-4">
            <GoWorkLogo size={40} showText={false} />
          </div>
        </CardHeader>

        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  )
}
