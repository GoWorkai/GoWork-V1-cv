"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  Users,
  Briefcase,
  Home,
  Palette,
  Code,
  Camera,
  GraduationCap,
  Heart,
  Truck,
  User,
  Settings,
  HelpCircle,
  Bell,
  Plus,
  Zap,
  Music,
  CheckCircle,
} from "lucide-react"
import { AdvancedAISearch } from "@/components/advanced-ai-search"
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

const categories = [
  { icon: Home, name: "Hogar", color: "bg-blue-500", services: 1250 },
  { icon: Code, name: "Tecnología", color: "bg-purple-500", services: 890 },
  { icon: Palette, name: "Diseño", color: "bg-pink-500", services: 670 },
  { icon: Briefcase, name: "Negocios", color: "bg-green-500", services: 540 },
  { icon: GraduationCap, name: "Educación", color: "bg-orange-500", services: 430 },
  { icon: Heart, name: "Salud", color: "bg-red-500", services: 320 },
  { icon: Camera, name: "Eventos", color: "bg-indigo-500", services: 280 },
  { icon: Truck, name: "Transporte", color: "bg-yellow-500", services: 190 },
]

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
  const [searchQuery, setSearchQuery] = useState("")

  const handleOnboardingComplete = (userData: any) => {
    console.log("Onboarding completed:", userData)
    setShowOnboarding(false)
    // Aquí puedes manejar la lógica de registro/login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Elementos de fondo flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-cyan-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-200/30 rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-white/80 backdrop-blur-xl border-r border-gray-200 z-40 flex flex-col items-center py-4 space-y-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>

        <div className="flex flex-col space-y-3">
          <button className="p-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors">
            <Plus className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Home className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Briefcase className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <User className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Star className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Zap className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1"></div>

        <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <HelpCircle className="h-4 w-4" />
        </button>
      </div>

      {/* Banner superior */}
      <div className="h-12 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-medium relative z-30">
        <span>🎉 Prueba GoWork Pro por 30 días y descubre todos los beneficios de GoWork. </span>
        <button onClick={() => setShowOnboarding(true)} className="ml-2 underline hover:no-underline">
          Empezar
        </button>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-12 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between ml-16">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                GoWork
              </span>
            </Link>

            <nav className="hidden md:flex space-x-6">
              <button className="text-gray-700 hover:text-purple-600 transition-colors text-sm">Mis diseños</button>
              <button className="text-gray-700 hover:text-purple-600 transition-colors text-sm">Plantillas</button>
              <button className="text-gray-700 hover:text-purple-600 transition-colors text-sm flex items-center space-x-1">
                <span>GoWork IA</span>
                <Badge className="bg-blue-100 text-blue-600 text-xs">Nuevo</Badge>
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Bell className="h-4 w-4" />
            </Button>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Hola, {user.name}</span>
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{user.name[0]}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setShowOnboarding(true)}>
                  Iniciar sesión
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowOnboarding(true)}>
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6 ml-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ¿Qué{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              servicio
            </span>{" "}
            necesitas hoy?
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Con GoWork puedes encontrar, contratar y gestionar cualquier servicio que necesites.
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200">
              <button className="px-4 py-2 rounded-lg bg-purple-100 text-purple-600 text-sm font-medium">
                Mis servicios
              </button>
              <button className="px-4 py-2 rounded-lg text-gray-600 hover:text-purple-600 text-sm font-medium">
                Plantillas
              </button>
              <button className="px-4 py-2 rounded-lg text-gray-600 hover:text-purple-600 text-sm font-medium flex items-center space-x-1">
                <span>GoWork IA</span>
                <Badge className="bg-blue-100 text-blue-600 text-xs">Nuevo</Badge>
              </button>
            </div>
          </div>
        </div>

        {/* Chat de Gow IA - Componente principal */}
        <div className="mb-8">
          <AdvancedAISearch />
        </div>

        {/* Grid de categorías */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { icon: Home, name: "Hogar", color: "bg-red-500" },
              { icon: Code, name: "Desarrollo", color: "bg-teal-500" },
              { icon: Palette, name: "Diseño", color: "bg-orange-500" },
              { icon: Briefcase, name: "Negocios", color: "bg-blue-500" },
              { icon: Camera, name: "Fotografía", color: "bg-pink-500" },
              { icon: Music, name: "Música", color: "bg-purple-500" },
              { icon: GraduationCap, name: "Educación", color: "bg-green-500" },
              { icon: Heart, name: "Salud", color: "bg-indigo-500" },
            ].map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-gray-200"
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-sm text-gray-800">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ilustración central */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="w-48 h-48 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-3xl transform -rotate-6"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mx-auto flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hay un mundo de posibilidades</h2>
          <p className="text-gray-600 mb-6">Conecta con profesionales verificados en tu área</p>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
            onClick={() => setShowOnboarding(true)}
          >
            Comenzar ahora
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200">
              <CardContent className="p-4 text-center">
                <stat.icon className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Servicios destacados */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Servicios Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredServices.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-gray-200"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    {service.verified && (
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">por {service.provider}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{service.rating}</span>
                      </div>
                      <span className="text-sm font-semibold text-purple-600">{service.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  )
}
