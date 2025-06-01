"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardHome } from "@/components/dashboard/dashboard-home"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GeminiChat } from "@/components/gemini-chat"
import {
  MessageCircle,
  MapPin,
  Calendar,
  User,
  Star,
  Brain,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Search,
  CheckCircle,
  Users,
  Globe,
  Smartphone,
  Loader2,
} from "lucide-react"

export default function GoWorkApp() {
  const { isAuthenticated, isLoading } = useAuth()
  const [authMode, setAuthMode] = useState<"landing" | "login" | "register">("landing")

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
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

  // Landing page con el nuevo diseño
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">GoWork</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/servicios" className="text-gray-600 hover:text-gray-900">
                Servicios
              </Link>
              <Link href="/chat" className="text-gray-600 hover:text-gray-900">
                Chat
              </Link>
              <Link href="/map" className="text-gray-600 hover:text-gray-900">
                Mapa
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setAuthMode("login")}>
                Iniciar Sesión
              </Button>
              <Button onClick={() => setAuthMode("register")}>Registrarse</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                <Brain className="h-4 w-4 mr-2" />
                La Red Social del Talento
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              🌟 GoWork: La Red Social del <span className="text-blue-600">Talento y las Oportunidades Humanas</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              <strong>Descubre GoWork</strong>, la plataforma que transforma tus habilidades en ingresos reales. Conecta
              con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti, todo en un solo
              lugar.
            </p>

            {/* Search Bar */}
            <div className="mb-12">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="¿Qué servicio necesitas hoy?"
                    className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setAuthMode("register")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8"
              >
                🚀 Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/servicios">
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8">
                  Explorar servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué es GoWork? Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🚀 ¿Qué es GoWork?</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              GoWork es más que una aplicación; es una <strong>comunidad digital</strong> que combina lo mejor de una
              red social y un marketplace inteligente de servicios. Diseñada para empoderar a quienes ofrecen y buscan
              servicios, desde tareas puntuales hasta proyectos profesionales.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15K+</div>
              <div className="text-gray-600">Freelancers activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">8K+</div>
              <div className="text-gray-600">Proyectos completados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfacción cliente</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Soporte IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Clave Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🔍 Funcionalidades Clave</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre las herramientas que hacen de GoWork la plataforma perfecta para conectar talento con
              oportunidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-gray-900">Registro Simple y Seguro</CardTitle>
                <CardDescription className="text-gray-600">
                  Únete con tu número de teléfono y verifica tu identidad fácilmente.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-gray-900">Geolocalización Inteligente</CardTitle>
                <CardDescription className="text-gray-600">
                  Encuentra y ofrece servicios en tu área, conectando con personas cercanas.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">Asistente IA "Gow"</CardTitle>
                <CardDescription className="text-gray-600">
                  Recibe ayuda personalizada para publicar, cotizar y gestionar tus servicios.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-gray-900">Perfil Dual</CardTitle>
                <CardDescription className="text-gray-600">
                  Actúa como cliente y proveedor simultáneamente, adaptándote a tus necesidades.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle className="text-gray-900">Sistema de Reputación</CardTitle>
                <CardDescription className="text-gray-600">
                  Construye tu reputación con calificaciones y comentarios de la comunidad.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-gray-900">Pagos Seguros</CardTitle>
                <CardDescription className="text-gray-600">
                  Transacciones protegidas para tu tranquilidad.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* ¿Por Qué Elegir GoWork? Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">🌐 ¿Por Qué Elegir GoWork?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexibilidad Total</h3>
              <p className="text-gray-600">Tú decides cuándo y cómo trabajar.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comunidad Activa</h3>
              <p className="text-gray-600">Únete a miles de usuarios que ya confían en GoWork.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Crecimiento Profesional</h3>
              <p className="text-gray-600">Mejora tus habilidades y amplía tu red de contactos.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Impacto Real</h3>
              <p className="text-gray-600">Contribuye al desarrollo de una economía más inclusiva y colaborativa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Functions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Prueba las funciones</h3>
            <p className="text-gray-600">Explora todas las funcionalidades de GoWork</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/chat">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-6 h-auto border border-gray-200"
              >
                <MessageCircle className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Chat con Gow IA</div>
                  <div className="text-sm text-gray-500">Comunícate con nuestro asistente inteligente</div>
                </div>
              </Button>
            </Link>

            <Link href="/servicios">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-6 h-auto border border-gray-200"
              >
                <Search className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Explorar servicios</div>
                  <div className="text-sm text-gray-500">Encuentra el servicio perfecto para ti</div>
                </div>
              </Button>
            </Link>

            <Link href="/map">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-6 h-auto border border-gray-200"
              >
                <MapPin className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Mapa interactivo</div>
                  <div className="text-sm text-gray-500">Encuentra talento cerca de ti</div>
                </div>
              </Button>
            </Link>

            <Link href="/booking/1">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-6 h-auto border border-gray-200"
              >
                <Calendar className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Flujo de reservas</div>
                  <div className="text-sm text-gray-500">Reserva servicios fácilmente</div>
                </div>
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-6 h-auto border border-gray-200"
              >
                <User className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Dashboard cliente</div>
                  <div className="text-sm text-gray-500">Gestiona tus proyectos</div>
                </div>
              </Button>
            </Link>

            <Link href="/provider-dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-6 h-auto border border-gray-200"
              >
                <Star className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Dashboard proveedor</div>
                  <div className="text-sm text-gray-500">Administra tus servicios</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para revolucionar tu trabajo?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de freelancers y empresas que ya confían en GoWork para conectar talento con oportunidades
            reales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setAuthMode("register")}
              className="bg-white hover:bg-gray-100 text-blue-600 font-semibold px-8"
            >
              Crear cuenta gratis
              <Smartphone className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/servicios">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 px-8">
                Ver servicios disponibles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">GoWork</div>
              <p className="text-gray-400">La red social del talento y las oportunidades humanas.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/servicios">Servicios</Link>
                </li>
                <li>
                  <Link href="/chat">Chat IA</Link>
                </li>
                <li>
                  <Link href="/map">Mapa</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about">Acerca de</Link>
                </li>
                <li>
                  <Link href="/contact">Contacto</Link>
                </li>
                <li>
                  <Link href="/careers">Carreras</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help">Ayuda</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacidad</Link>
                </li>
                <li>
                  <Link href="/terms">Términos</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GoWork. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Gemini Chat Widget - Mantenemos el widget de chat */}
      <GeminiChat />
    </div>
  )
}
