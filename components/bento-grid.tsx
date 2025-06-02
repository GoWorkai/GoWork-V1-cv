"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Rocket } from "lucide-react"
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

  // Colores de Brightwing Capital
  const darkGreen = "bg-[#1a3a1a]" // Verde oscuro
  const lightGreen = "bg-[#2a4a2a]" // Verde un poco más claro
  const white = "text-white" // Texto blanco

  return (
    <div className="w-full max-w-full mx-auto px-4 py-8 bg-[#f5f5f5]">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-fr">
        {/* Tarjeta Principal - Bienvenida a GoWork (como la imagen de bosque) */}
        <Card
          className={`md:col-span-3 md:row-span-2 ${darkGreen} border-none hover:scale-[1.01] transition-all duration-500 overflow-hidden relative cursor-pointer shadow-xl`}
          onClick={() => setShowOnboarding(true)}
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-40" />
          <CardContent className="p-8 h-full flex flex-col justify-center items-center relative z-10">
            <div className="mb-4 text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <Rocket className="h-16 w-16 text-white" />
              </div>
              <h1 className="text-5xl font-bold mb-2 text-white tracking-wider">GOWORK</h1>
              <h2 className="text-3xl font-light text-white tracking-wide">TALENTO HUMANO</h2>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta "We Are On Our Way" */}
        <Card
          className={`md:col-span-3 md:row-span-2 ${darkGreen} border-none hover:scale-[1.01] transition-all duration-500 overflow-hidden relative cursor-pointer shadow-xl`}
          onClick={() => handleCardClick("dashboard")}
        >
          <div className="absolute inset-0 bg-[#1a3a1a] opacity-90" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 top-10 w-80 h-80 border border-[#ffffff20] rounded-full"></div>
            <div className="absolute -left-40 bottom-10 w-96 h-96 border border-[#ffffff20] rounded-full"></div>
          </div>
          <CardContent className="p-8 h-full flex flex-col justify-center items-center relative z-10">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-6 text-white tracking-wider">TRANSFORMA</h2>
              <h3 className="text-4xl font-light text-white tracking-wide mb-12">TU TALENTO.</h3>
              <p className="text-xl text-white/80 mt-8">GOWORK.COM</p>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Letrero (como la imagen del letrero) */}
        <Card
          className={`md:col-span-3 md:row-span-2 bg-white border-none hover:scale-[1.01] transition-all duration-500 overflow-hidden relative cursor-pointer shadow-xl`}
          onClick={() => handleCardClick("services")}
        >
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-20" />
          <CardContent className="p-8 h-full flex flex-col justify-center items-center relative z-10">
            <div className="w-24 h-24 mb-6">
              <Zap className="h-24 w-24 text-[#1a3a1a]" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-[#1a3a1a] tracking-wide text-center">GOWORK</h2>
            <h3 className="text-xl font-light text-[#1a3a1a] tracking-wide text-center">SERVICIOS PROFESIONALES</h3>
          </CardContent>
        </Card>

        {/* Tarjeta de Teléfono (como la imagen del teléfono) */}
        <Card
          className={`md:col-span-2 md:row-span-2 ${darkGreen} border-none hover:scale-[1.01] transition-all duration-500 overflow-hidden relative cursor-pointer shadow-xl`}
          onClick={() => handleCardClick("search")}
        >
          <CardContent className="p-0 h-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[220px] h-[440px] bg-black rounded-[36px] border-4 border-gray-800 overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-[#1a3a1a] p-6 flex flex-col">
                  <div className="flex justify-center mb-4">
                    <Rocket className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-white text-center text-sm font-bold mb-2">ESTRATEGIAS PARA</h3>
                  <h3 className="text-white text-center text-sm font-bold mb-4">NEGOCIOS EN CRECIMIENTO</h3>
                  <p className="text-white/80 text-xs text-center mb-6">
                    Conecta tu talento con quienes lo necesitan y transforma tus habilidades en ingresos reales.
                  </p>
                  <div className="mt-auto">
                    <Button className="w-full bg-white text-[#1a3a1a] hover:bg-gray-100 rounded-full" size="sm">
                      Explorar Ahora
                    </Button>
                  </div>
                  <div className="flex justify-center mt-6">
                    <div className="w-16 h-8 border border-white/30 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Logo (como la imagen del logo) */}
        <Card
          className={`md:col-span-1 md:row-span-1 bg-white border-none hover:scale-[1.01] transition-all duration-500 overflow-hidden relative cursor-pointer shadow-xl`}
          onClick={() => handleCardClick("profile")}
        >
          <CardContent className="p-4 h-full flex items-center justify-center relative">
            <div className="w-16 h-16">
              <Rocket className="h-16 w-16 text-[#1a3a1a]" />
            </div>
          </CardContent>
        </Card>

        {/* Tarjeta de Tarjetas de Visita (como la imagen de las tarjetas) */}
        <Card
          className={`md:col-span-1 md:row-span-1 ${darkGreen} border-none hover:scale-[1.01] transition-all duration-500 overflow-hidden relative cursor-pointer shadow-xl`}
          onClick={() => handleDemoLogin()}
        >
          <CardContent className="p-4 h-full flex flex-col items-center justify-center relative">
            <div className="flex space-x-1 -rotate-12">
              <div className="w-12 h-8 bg-white rounded-sm flex items-center justify-center">
                <Rocket className="h-4 w-4 text-[#1a3a1a]" />
              </div>
              <div className="w-12 h-8 bg-gray-100 rounded-sm"></div>
            </div>
            <p className="text-white text-xs mt-4 font-light">DEMO LOGIN</p>
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
