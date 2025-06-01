"use client"

import { useState } from "react"
import { MapPin, Star, Users, Briefcase } from "lucide-react"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useAuth } from "@/contexts/auth-context"
import { BentoGrid } from "@/components/bento-grid"

const featuredServices = [
  {
    title: "Desarrollo Web",
    provider: "Carlos M.",
    rating: 4.9,
    price: "Desde $45.000",
    image: "/placeholder.svg?height=120&width=200",
    category: "Tecnología",
    verified: true,
  },
  {
    title: "Diseño de Logos",
    provider: "Ana R.",
    rating: 4.8,
    price: "Desde $25.000",
    image: "/placeholder.svg?height=120&width=200",
    category: "Diseño",
    verified: true,
  },
  {
    title: "Clases de Guitarra",
    provider: "Miguel S.",
    rating: 5.0,
    price: "Desde $15.000",
    image: "/placeholder.svg?height=120&width=200",
    category: "Educación",
    verified: true,
  },
  {
    title: "Plomería",
    provider: "Roberto L.",
    rating: 4.7,
    price: "Desde $20.000",
    image: "/placeholder.svg?height=120&width=200",
    category: "Hogar",
    verified: true,
  },
]

const stats = [
  { label: "Servicios Activos", value: "4,580", icon: Briefcase },
  { label: "Profesionales", value: "2,340", icon: Users },
  { label: "Ciudades", value: "15", icon: MapPin },
  { label: "Satisfacción", value: "98%", icon: Star },
]

export default function HomePage() {
  const { user } = useAuth()
  const [showOnboarding, setShowOnboarding] = useState(false)

  const handleOnboardingComplete = (userData: any) => {
    console.log("Onboarding completed:", userData)
    setShowOnboarding(false)
    // Aquí puedes manejar la lógica de registro/login
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* BentoGrid Section */}
      <section className="container mx-auto px-4 py-16">
        <BentoGrid />
      </section>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  )
}
