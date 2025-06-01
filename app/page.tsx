"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHome } from "@/components/dashboard/dashboard-home"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GeminiChat } from "@/components/gemini-chat"
import {
  MapPin,
  User,
  Star,
  Brain,
  ArrowRight,
  Users,
  Briefcase,
  Home,
  Palette,
  Code,
  Camera,
  Wrench,
  Heart,
  BookOpen,
  Loader2,
  Bell,
  Settings,
  Plus,
  Sparkles,
} from "lucide-react"

export default function GoWorkApp() {
  const { isAuthenticated, isLoading } = useAuth()
  const [authMode, setAuthMode] = useState<"landing" | "login" | "register">("landing")

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Cargando GoWork...</p>
        </div>
      </div>
    )
  }

  // Si el usuario está autenticado, mostrar el dashboard
  if (isAuthenticated) {
    return (
      <DashboardLayout>
        <DashboardHome />
      </DashboardLayout>
    )
  }

  // Si está en modo login, mostrar formulario de login
  if (authMode === "login") {
    return <LoginForm onBack={() => setAuthMode("landing")} onSwitchToRegister={() => setAuthMode("register")} />
  }

  // Si está en modo register, mostrar formulario de registro
  if (authMode === "register") {
    return <RegisterForm onBack={() => setAuthMode("landing")} onSwitchToLogin={() => setAuthMode("login")} />
  }

  const serviceCategories = [
    {
      title: "Desarrollo",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      description: "Apps, webs y software",
      href: "/servicios?category=desarrollo",
    },
    {
      title: "Diseño",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      description: "Gráfico, UI/UX, branding",
      href: "/servicios?category=diseño",
    },
    {
      title: "Marketing",
      icon: Briefcase,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-orange-50",
      description: "Digital, contenido, SEO",
      href: "/servicios?category=marketing",
    },
    {
      title: "Fotografía",
      icon: Camera,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      description: "Eventos, productos, retratos",
      href: "/servicios?category=fotografía",
    },
    {
      title: "Hogar",
      icon: Home,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      description: "Limpieza, reparaciones, jardín",
      href: "/servicios?category=hogar",
    },
    {
      title: "Reparaciones",
      icon: Wrench,
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-50",
      description: "Electrónica, electrodomésticos",
      href: "/servicios?category=reparaciones",
    },
    {
      title: "Bienestar",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      description: "Salud, fitness, terapias",
      href: "/servicios?category=bienestar",
    },
    {
      title: "Educación",
      icon: BookOpen,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      description: "Clases, tutorías, cursos",
      href: "/servicios?category=educación",
    },
  ]

  const quickActions = [
    {
      title: "Chat con Gow IA",
      description: "Asistente inteligente",
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
      href: "/chat",
    },
    {
      title: "Mapa de Talentos",
      description: "Encuentra cerca de ti",
      icon: MapPin,
      color: "from-green-500 to-teal-500",
      href: "/map",
    },
    {
      title: "Dashboard",
      description: "Gestiona tus proyectos",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      href: "/dashboard",
    },
  ]

  // Landing page con diseño inspirado en Canva
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">
              🔥 Prueba GoWork Pro por 30 días y descubre todos los talentos cerca de ti.{" "}
              <button
                onClick={() => setAuthMode("register")}
                className="underline ml-1 hover:no-underline font-semibold"
              >
                Empezar
              </button>
            </span>
          </div>
          <button className="hover:bg-white/20 p-1 rounded">
            <span className="text-xl">×</span>
          </button>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-20 bg-white/80 backdrop-blur-sm border-r border-purple-100 flex flex-col items-center py-6 space-y-8">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>

          <div className="flex flex-col space-y-6">
            <button className="w-12 h-12 bg-purple-100 rounded-xl flex flex-col items-center justify-center text-purple-600 hover:bg-purple-200 transition-colors">
              <Plus className="h-5 w-5" />
              <span className="text-xs mt-1">Crear</span>
            </button>

            <button className="w-12 h-12 rounded-xl flex flex-col items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Inicio</span>
            </button>

            <button className="w-12 h-12 rounded-xl flex flex-col items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <Briefcase className="h-5 w-5" />
              <span className="text-xs mt-1">Proyectos</span>
            </button>

            <button className="w-12 h-12 rounded-xl flex flex-col items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <Star className="h-5 w-5" />
              <span className="text-xs mt-1">Favoritos</span>
            </button>

            <button className="w-12 h-12 rounded-xl flex flex-col items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <Brain className="h-5 w-5" />
              <span className="text-xs mt-1">GoWork IA</span>
            </button>

            <button className="w-12 h-12 rounded-xl flex flex-col items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Comunidad</span>
            </button>
          </div>

          <div className="flex-1"></div>

          <div className="flex flex-col space-y-4">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">GoWork</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setAuthMode("login")}>
                Iniciar Sesión
              </Button>
              <Button
                onClick={() => setAuthMode("register")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Iniciar mi prueba gratis
              </Button>
            </div>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              ¿Qué{" "}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                talento
              </span>{" "}
              necesitas hoy?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Con GoWork puedes encontrar, contratar y trabajar con los mejores talentos cerca de ti.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Describe tu proyecto, y yo encontraré el talento perfecto"
                  className="w-full px-6 py-4 text-lg border-2 border-purple-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
                <Button className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl px-6">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Action Tabs */}
            <div className="flex justify-center space-x-4 mb-12">
              <Badge className="bg-purple-100 text-purple-700 px-4 py-2 text-sm">
                <Briefcase className="h-4 w-4 mr-2" />
                Mis proyectos
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm">
                <Star className="h-4 w-4 mr-2" />
                Plantillas
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm">
                <Brain className="h-4 w-4 mr-2" />
                GoWork IA
              </Badge>
            </div>
          </div>

          {/* Service Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link key={index} href={category.href}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-md">
                    <div className={`w-12 h-12 rounded-2xl ${category.bgColor} flex items-center justify-center mb-4`}>
                      <IconComponent
                        className={`h-6 w-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Bento Grid - Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Link key={index} href={action.href}>
                  <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-md">
                    <div
                      className={`w-16 h-16 rounded-3xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-6`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-gray-600">{action.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Illustration and CTA */}
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Hay un mundo de posibilidades</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Únete a miles de freelancers y empresas que ya confían en GoWork para conectar talento con oportunidades
                reales.
              </p>
              <Button
                size="lg"
                onClick={() => setAuthMode("register")}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-2xl"
              >
                Empezar a diseñar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gemini Chat Widget */}
      <GeminiChat />
    </div>
  )
}
