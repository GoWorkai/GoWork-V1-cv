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
  MessageCircle,
  ArrowRight,
  Rocket,
  Camera,
  Wrench,
  Laptop,
  Briefcase,
  Music,
  PaintBucket,
  Plus,
} from "lucide-react"
import { useState } from "react"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { GowChatWidget } from "@/components/gow-chat-widget"

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

  const handleCardClick = (destination: string) => {
    switch (destination) {
      case "search":
        router.push("/buscar")
        break
      case "services":
        router.push("/servicios")
        break
      case "dashboard":
        router.push("/dashboard")
        break
      case "profile":
        router.push("/dashboard/perfil")
        break
      default:
        console.log(`Navegando a: ${destination}`)
    }
  }

  return (
    <div className="w-full max-w-full mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {/* Tarjeta Principal - ¿Qué es GoWork? */}
        <Card
          className="md:col-span-2 md:row-span-2 bg-gray-800/80 backdrop-blur-xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative cursor-pointer"
          onClick={() => setShowOnboarding(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#007bff] to-[#0056b3] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
          <CardContent className="p-6 h-full flex flex-col relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#007bff] to-[#0056b3] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">🚀 ¿Qué es GoWork?</h3>
                  <p className="text-gray-300 text-sm">
                    La red social del talento que transforma habilidades en ingresos reales
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-200 mb-4 leading-relaxed">
                GoWork es más que una aplicación; es una comunidad digital que combina lo mejor de una red social y un
                marketplace inteligente de servicios.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full border-gray-600 text-white hover:bg-gray-700 group-hover:border-gray-500 transition-all"
            >
              Descubre Más
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        {/* Estadísticas */}
        <Card
          className="md:col-span-1 bg-gray-800/80 backdrop-blur-xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative cursor-pointer"
          onClick={() => handleCardClick("dashboard")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
          <CardContent className="p-6 h-full flex flex-col relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">📈 Comunidad Activa</h3>
                <p className="text-gray-300 text-sm">Miles de talentos conectados</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">15K+</div>
                <div className="text-xs text-gray-400">Talentos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">8K+</div>
                <div className="text-xs text-gray-400">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-xs text-gray-400">Satisfacción</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gow IA Chat - Mantiene el nuevo diseño */}
        <Card className="md:col-span-2 bg-transparent border-none hover:scale-[1.02] transition-all duration-500">
          <CardContent className="p-0 h-full">
            <GowChatWidget />
          </CardContent>
        </Card>

        {/* Servicios */}
        <Card
          className="md:col-span-1 bg-gray-800/80 backdrop-blur-xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative cursor-pointer"
          onClick={() => handleCardClick("services")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFA500] to-[#007bff] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
          <CardContent className="p-6 h-full flex flex-col relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFA500] to-[#007bff] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">🛠️ Servicios</h3>
                <p className="text-gray-300 text-sm">Todas las categorías</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-200 mb-4 leading-relaxed">Desde reparaciones hasta consultoría profesional</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[Camera, Wrench, Laptop, Briefcase, Music, PaintBucket].map((ServiceIcon, index) => (
                  <div key={index} className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <ServiceIcon className="h-4 w-4 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Funcionalidades */}
        <Card
          className="md:col-span-2 bg-gray-800/80 backdrop-blur-xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative cursor-pointer"
          onClick={() => handleCardClick("search")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#007bff] to-[#6610f2] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
          <CardContent className="p-6 h-full flex flex-col relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#007bff] to-[#6610f2] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">⚡ Funcionalidades</h3>
                  <p className="text-gray-300 text-sm">Todo lo que necesitas</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-200 mb-4 leading-relaxed">
                Registro simple, geolocalización, perfil dual, pagos seguros
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { icon: Users, text: "Registro Simple" },
                  { icon: MapPin, text: "Geolocalización" },
                  { icon: Shield, text: "Pagos Seguros" },
                  { icon: Star, text: "Reputación" },
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon
                  return (
                    <div key={index} className="flex items-center space-x-2 bg-gray-700/50 rounded-lg p-2">
                      <FeatureIcon className="h-4 w-4 text-gray-300" />
                      <span className="text-gray-200 text-xs">{feature.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Beneficios */}
        <Card
          className="md:col-span-1 bg-gray-800/80 backdrop-blur-xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative cursor-pointer"
          onClick={() => handleCardClick("profile")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#007bff] to-[#FFA500] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
          <CardContent className="p-6 h-full flex flex-col relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#007bff] to-[#FFA500] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">🌟 Beneficios</h3>
                <p className="text-gray-300 text-sm">¿Por qué elegir GoWork?</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-gray-200 mb-4 leading-relaxed">Libertad, autonomía, comunidad e impacto real</p>
              <div className="space-y-1 mb-4">
                {["Libertad total", "Comunidad activa", "Crecimiento", "Impacto local"].map((benefit, index) => (
                  <div key={index} className="text-gray-200 text-sm">
                    • {benefit}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonios */}
        <Card
          className="md:col-span-2 bg-gray-800/80 backdrop-blur-xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative cursor-pointer"
          onClick={() => handleCardClick("testimonials")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#6610f2] to-[#FFA500] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
          <CardContent className="p-6 h-full flex flex-col relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6610f2] to-[#FFA500] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">💬 Testimonios</h3>
                  <p className="text-gray-300 text-sm">Lo que dicen nuestros usuarios</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-200 italic text-sm mb-2">
                "GoWork me ha permitido conectar con clientes increíbles en mi barrio"
              </p>
              <div className="text-gray-300 text-xs">
                <strong>María González</strong> - Diseñadora Gráfica
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acceso Rápido */}
        <Card className="md:col-span-1 bg-gray-800/80 backdrop-blur-xl border border-gray-700 hover:border-gray-600 transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative">
          <CardContent className="p-6 h-full flex flex-col justify-center text-center relative z-10">
            {user ? (
              <div className="space-y-3">
                <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">{user.name?.[0] || "U"}</span>
                </div>
                <p className="text-sm text-gray-300">Hola, {user.name}</p>
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
                <h3 className="font-bold text-white">Únete</h3>
                <Button onClick={handleDemoLogin} size="sm" className="bg-[#FFA500] hover:bg-[#FF8C00] w-full">
                  Demo Login
                </Button>
              </div>
            )}
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
