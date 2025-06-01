"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BentoGrid } from "@/components/bento-grid"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function HomePage() {
  const { user, login } = useAuth()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const router = useRouter()

  const handleOnboardingComplete = (userData: any) => {
    console.log("Onboarding completed:", userData)
    setShowOnboarding(false)
  }

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

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Botón Demo temporal - solo para testing */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleDemoLogin}
          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
          size="sm"
        >
          Demo Login
        </Button>
      </div>

      {/* Header minimalista */}
      <header className="bg-gray-800/80 backdrop-blur-xl border-b border-gray-700 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#007bff] to-[#0056b3] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#007bff] to-[#FFA500] bg-clip-text text-transparent">
              GoWork
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-300">Hola, {user.name}</span>
                <Link href="/dashboard">
                  <Button size="sm" className="bg-[#007bff] hover:bg-[#0056b3]">
                    Dashboard
                  </Button>
                </Link>
                <div className="w-8 h-8 bg-[#FFA500] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user.name?.[0] || "U"}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                  onClick={() => setShowOnboarding(true)}
                >
                  Iniciar sesión
                </Button>
                <Button size="sm" className="bg-[#007bff] hover:bg-[#0056b3]" onClick={() => setShowOnboarding(true)}>
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#007bff] via-[#FFA500] to-[#007bff] bg-clip-text text-transparent">
              GoWork
            </span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            La Red Social del Talento y las Oportunidades Humanas
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Descubre GoWork, la plataforma que transforma tus habilidades en ingresos reales. Conecta con personas que
            necesitan lo que sabes hacer y encuentra oportunidades cerca de ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0056b3] hover:to-[#007bff] text-white px-8 py-3 text-lg"
              onClick={() => setShowOnboarding(true)}
            >
              Comenzar Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-white px-8 py-3 text-lg"
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* BentoGrid Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Qué hace especial a GoWork?</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Más que una aplicación, es una comunidad digital que combina lo mejor de una red social y un marketplace
            inteligente de servicios.
          </p>
        </div>

        {/* Aquí está nuestro hermoso BentoGrid */}
        <BentoGrid />
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tus habilidades en ingresos?
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de profesionales que ya confían en GoWork para hacer crecer sus negocios.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#FFA500] to-[#007bff] hover:from-[#007bff] hover:to-[#FFA500] text-white px-12 py-4 text-xl"
            onClick={() => setShowOnboarding(true)}
          >
            Únete a GoWork
          </Button>
        </div>
      </section>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  )
}
