"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  MapPin,
  Star,
  Shield,
  Zap,
  TrendingUp,
  Heart,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Brain,
  Rocket,
  Camera,
  Wrench,
  Laptop,
  Briefcase,
  Music,
  PaintBucket,
  Plus,
  Search,
  Phone,
  Video,
} from "lucide-react"
import { useState } from "react"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function BentoGrid() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const { user, login } = useAuth()
  const router = useRouter()

  const handleDemoLogin = async () => {
    try {
      const success = await login({
        email: "demo@gowork.com",
        password: "demo123",
      })
      if (success) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Demo login error:", error)
    }
  }

  const handleOnboardingComplete = (userData: any) => {
    console.log("Onboarding completed:", userData)
    setShowOnboarding(false)
  }

  return (
    <div className="w-full max-w-full mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-fr">
        {/* Tarjeta Principal - Bienvenida a GoWork */}
        <Card className="md:col-span-2 lg:col-span-3 md:row-span-2 bg-gradient-to-br from-[#007bff] to-[#0056b3] text-white overflow-hidden relative group hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-8 h-full flex flex-col relative z-10">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Bienvenido a</h1>
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[#FFA500]">GoWork</h2>
              <p className="text-xl opacity-90 leading-relaxed">
                La Red Social del Talento y las Oportunidades Humanas
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                <Rocket className="h-16 w-16 text-white" />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-lg mb-4 opacity-90">Transforma tus habilidades en ingresos reales</p>
              <Button
                onClick={() => setShowOnboarding(true)}
                className="bg-[#FFA500] hover:bg-[#FF8C00] text-white font-semibold px-6 py-3"
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas de la Comunidad */}
        <Card className="md:col-span-1 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] text-white hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-6 h-full flex flex-col justify-center text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">15K+</div>
            <div className="text-sm opacity-90">Profesionales</div>
            <div className="text-2xl font-bold mt-2">8K+</div>
            <div className="text-sm opacity-90">Proyectos</div>
          </CardContent>
        </Card>

        {/* Gow IA Assistant */}
        <Card className="md:col-span-1 bg-gradient-to-br from-[#6610f2] to-[#007bff] text-white hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-6 h-full flex flex-col justify-center text-center">
            <Brain className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Gow IA</h3>
            <p className="text-sm opacity-90 mb-4">Tu asistente inteligente</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span>Búsqueda inteligente</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span>Optimización</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Búsqueda Rápida */}
        <Card className="md:col-span-2 bg-white border-2 border-gray-200 hover:border-[#007bff] hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-6 h-full flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="h-6 w-6 text-[#007bff]" />
              <h3 className="font-bold text-lg text-gray-800">Encuentra Servicios</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <input
                type="text"
                placeholder="¿Qué servicio necesitas?"
                className="w-full bg-transparent border-none outline-none text-gray-700"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Desarrollo", "Diseño", "Hogar", "Educación"].map((tag) => (
                <span key={tag} className="bg-[#007bff]/10 text-[#007bff] px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categorías de Servicios */}
        <Card className="md:col-span-1 bg-gradient-to-br from-[#007bff] to-[#FFA500] text-white hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-6 h-full flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-4 text-center">Servicios</h3>
            <div className="grid grid-cols-3 gap-2">
              {[Camera, Wrench, Laptop, Briefcase, Music, PaintBucket].map((Icon, index) => (
                <div key={index} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>
            <p className="text-sm text-center mt-4 opacity-90">Todas las categorías disponibles</p>
          </CardContent>
        </Card>

        {/* Funcionalidades Clave */}
        <Card className="md:col-span-2 bg-gradient-to-br from-[#007bff] to-[#6610f2] text-white hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6" />
              <h3 className="font-bold text-lg">Funcionalidades</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {[
                { icon: Users, text: "Registro Simple" },
                { icon: MapPin, text: "Geolocalización" },
                { icon: Shield, text: "Pagos Seguros" },
                { icon: Star, text: "Reputación" },
              ].map((feature, index) => {
                const FeatureIcon = feature.icon
                return (
                  <div key={index} className="flex items-center space-x-2 bg-white/10 rounded-lg p-3">
                    <FeatureIcon className="h-5 w-5" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Testimonios */}
        <Card className="md:col-span-2 bg-gradient-to-br from-[#6610f2] to-[#FFA500] text-white hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-6 h-full flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-4">
              <MessageCircle className="h-6 w-6" />
              <h3 className="font-bold text-lg">Testimonios</h3>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-300 fill-current" />
              ))}
            </div>
            <p className="text-lg italic mb-4">
              "GoWork me ha permitido conectar con clientes increíbles en mi barrio"
            </p>
            <div className="text-sm">
              <strong>María González</strong> - Diseñadora Gráfica
            </div>
          </CardContent>
        </Card>

        {/* Acceso Rápido */}
        <Card className="md:col-span-1 bg-white border-2 border-gray-200 hover:border-[#FFA500] hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-6 h-full flex flex-col justify-center text-center">
            {user ? (
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">{user.name?.[0] || "U"}</span>
                </div>
                <p className="text-sm text-gray-600">Hola, {user.name}</p>
                <Button
                  onClick={() => router.push("/dashboard")}
                  size="sm"
                  className="bg-[#007bff] hover:bg-[#0056b3] w-full"
                >
                  Dashboard
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Plus className="h-12 w-12 text-[#007bff] mx-auto" />
                <h3 className="font-bold text-gray-800">Únete</h3>
                <Button onClick={handleDemoLogin} size="sm" className="bg-[#FFA500] hover:bg-[#FF8C00] w-full">
                  Demo Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contacto y Soporte */}
        <Card className="md:col-span-1 bg-gradient-to-br from-[#FFA500] to-[#007bff] text-white hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-6 h-full flex flex-col justify-center text-center">
            <Heart className="h-8 w-8 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Soporte 24/7</h3>
            <p className="text-sm opacity-90 mb-4">Estamos aquí para ayudarte</p>
            <div className="flex justify-center space-x-2">
              <button className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Phone className="h-4 w-4" />
              </button>
              <button className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Video className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  )
}
