"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Users, Facebook, Instagram, Twitter, Brain, Zap, Shield } from "lucide-react"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const discoverCards = [
    {
      icon: Users,
      title: "PROFESIONALES VERIFICADOS",
      description: "Conecta con talentos certificados en tu área",
      onClick: () => router.push("/servicios"),
    },
    {
      icon: Brain,
      title: "GOW IA ASISTENTE",
      description: "Tu asistente inteligente para encontrar servicios",
      onClick: () => setShowOnboarding(true),
    },
    {
      icon: Zap,
      title: "SERVICIOS INSTANTÁNEOS",
      description: "Encuentra y contrata servicios en minutos",
      onClick: () => router.push("/buscar"),
    },
    {
      icon: Shield,
      title: "PAGOS SEGUROS",
      description: "Transacciones protegidas y garantizadas",
      onClick: () => handleDemoLogin,
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920&text=Paisaje+Profesional')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">GoWork</h1>
            <p className="text-white/70 text-xs">Talento Humano</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-blue-300 transition-colors">
            Inicio
          </a>
          <a href="#servicios" className="text-white hover:text-blue-300 transition-colors">
            Servicios
          </a>
          <a href="#nosotros" className="text-white hover:text-blue-300 transition-colors">
            Nosotros
          </a>
          <a href="#contacto" className="text-white hover:text-blue-300 transition-colors">
            Contacto
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <Facebook className="h-5 w-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="h-5 w-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="h-5 w-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
          </div>
          {user ? (
            <Button onClick={() => router.push("/dashboard")} className="bg-blue-600 hover:bg-blue-700 text-white">
              Dashboard
            </Button>
          ) : (
            <Button onClick={handleDemoLogin} className="bg-blue-600 hover:bg-blue-700 text-white">
              Demo Login
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-8xl md:text-9xl font-thin text-white mb-6 tracking-wider">GoWork</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            La red social del talento que transforma habilidades en ingresos reales
          </p>

          {/* Search Bar */}
          <div className="flex items-center max-w-md mx-auto mb-12">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="ej. diseño gráfico, plomería, desarrollo web..."
              className="flex-1 bg-white/90 border-none text-gray-800 placeholder:text-gray-500 rounded-l-lg h-12"
            />
            <Button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg rounded-l-none h-12 px-6"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Discover Section */}
        <div className="w-full max-w-6xl">
          <p className="text-center text-white/80 text-lg mb-8">Puedes descubrir:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoverCards.map((card, index) => {
              const IconComponent = card.icon
              return (
                <Card
                  key={index}
                  className="bg-white/95 backdrop-blur-sm border-none hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer group"
                  onClick={card.onClick}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-2 tracking-wide">{card.title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{card.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button
            onClick={() => setShowOnboarding(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Comenzar Ahora
          </Button>
          <p className="text-white/70 text-sm mt-4">Únete a miles de profesionales que ya confían en GoWork</p>
        </div>
      </main>

      {/* Stats Footer */}
      <footer className="relative z-10 mt-auto py-8">
        <div className="flex justify-center items-center space-x-12 text-white/80">
          <div className="text-center">
            <div className="text-2xl font-bold">15K+</div>
            <div className="text-sm">Profesionales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">8K+</div>
            <div className="text-sm">Proyectos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">95%</div>
            <div className="text-sm">Satisfacción</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm">Soporte</div>
          </div>
        </div>
      </footer>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  )
}
