"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Brain, Zap, Shield, Facebook, Twitter, Instagram, ArrowRight, Rocket } from "lucide-react"
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

  const handleCardClick = (destination: string) => {
    switch (destination) {
      case "professionals":
        router.push("/buscar?category=profesionales")
        break
      case "ai":
        router.push("/dashboard")
        break
      case "services":
        router.push("/servicios")
        break
      case "payments":
        router.push("/dashboard/pagos")
        break
      default:
        console.log(`Navegando a: ${destination}`)
    }
  }

  const handleOnboardingComplete = (userData: any) => {
    console.log("Onboarding completed:", userData)
    setShowOnboarding(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-slate-900/80" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="w-full px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">GoWork</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Inicio
              </a>
              <a href="/servicios" className="text-white/80 hover:text-white transition-colors">
                Servicios
              </a>
              <a href="/buscar" className="text-white/80 hover:text-white transition-colors">
                Buscar
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Contacto
              </a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Social Icons */}
              <div className="hidden md:flex items-center space-x-3">
                <Facebook className="h-5 w-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-white/60 hover:text-white cursor-pointer transition-colors" />
              </div>

              {/* Auth Button */}
              {user ? (
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={handleDemoLogin}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Demo Login
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center min-h-[80vh] px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-8xl md:text-9xl font-thin text-white mb-6 tracking-wider">GoWork</h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl">
              La red social del talento que transforma habilidades en ingresos reales
            </p>

            {/* Search Bar */}
            <div className="flex max-w-md mx-auto mb-12">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="ej. diseño gráfico, plomería, consultoría..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
              />
              <Button
                onClick={handleSearch}
                className="ml-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                Buscar
              </Button>
            </div>
          </div>

          {/* Discovery Section */}
          <div className="w-full max-w-6xl">
            <p className="text-center text-white/80 text-lg mb-8">Puedes descubrir:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Profesionales Verificados */}
              <div
                onClick={() => handleCardClick("professionals")}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">PROFESIONALES</h3>
                <h4 className="text-sm font-medium text-gray-600">VERIFICADOS</h4>
              </div>

              {/* Gow IA Asistente */}
              <div
                onClick={() => handleCardClick("ai")}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">GOW IA</h3>
                <h4 className="text-sm font-medium text-gray-600">ASISTENTE</h4>
              </div>

              {/* Servicios Instantáneos */}
              <div
                onClick={() => handleCardClick("services")}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">SERVICIOS</h3>
                <h4 className="text-sm font-medium text-gray-600">INSTANTÁNEOS</h4>
              </div>

              {/* Pagos Seguros */}
              <div
                onClick={() => handleCardClick("payments")}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">PAGOS</h3>
                <h4 className="text-sm font-medium text-gray-600">SEGUROS</h4>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Button
              onClick={() => setShowOnboarding(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">15K+</div>
              <div className="text-white/60">Profesionales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">8K+</div>
              <div className="text-white/60">Proyectos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-white/60">Satisfacción</div>
            </div>
          </div>
        </main>
      </div>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  )
}
