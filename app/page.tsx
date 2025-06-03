import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, MapPin, Calendar, User, Star, Brain, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react"
import IntelligentSearch from "@/components/ai-search/intelligent-search"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E5B4]/10 to-[#0066FF]/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30 px-4 py-2">
                <Brain className="h-4 w-4 mr-2" />
                Powered by AI
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Conecta con el{" "}
              <span className="bg-gradient-to-r from-[#00E5B4] to-[#0066FF] bg-clip-text text-transparent">
                talento perfecto
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              GoWork usa inteligencia artificial para conectar freelancers y clientes de manera inteligente. Encuentra
              proyectos, contrata talento y haz crecer tu negocio.
            </p>

            {/* Barra de Búsqueda Inteligente Integrada */}
            <div className="mb-12">
              <IntelligentSearch />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/onboarding">
                <Button size="lg" className="bg-[#00E5B4] hover:bg-[#00E5B4]/90 text-gray-900 font-semibold px-8">
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/servicios">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8">
                  Explorar servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00E5B4] mb-2">15K+</div>
              <div className="text-gray-400">Freelancers activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00E5B4] mb-2">8K+</div>
              <div className="text-gray-400">Proyectos completados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00E5B4] mb-2">95%</div>
              <div className="text-gray-400">Satisfacción cliente</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#00E5B4] mb-2">24/7</div>
              <div className="text-gray-400">Soporte IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Funcionalidades potenciadas por IA</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Nuestra plataforma usa inteligencia artificial para hacer más eficiente la conexión entre talento y
              oportunidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 hover:border-[#00E5B4]/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-[#00E5B4]/20 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-[#00E5B4]" />
                </div>
                <CardTitle className="text-white">Matching Inteligente</CardTitle>
                <CardDescription className="text-gray-400">
                  IA que conecta automáticamente freelancers con proyectos perfectos según habilidades y experiencia
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-[#00E5B4]/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-[#0066FF]/20 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-[#0066FF]" />
                </div>
                <CardTitle className="text-white">Chat en Tiempo Real</CardTitle>
                <CardDescription className="text-gray-400">
                  Comunicación instantánea con asistente IA que ayuda en negociaciones y dudas
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-[#00E5B4]/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FF6D3A]/20 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#FF6D3A]" />
                </div>
                <CardTitle className="text-white">Geolocalización</CardTitle>
                <CardDescription className="text-gray-400">
                  Encuentra talento cerca de ti con mapas interactivos y filtros de ubicación
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-[#00E5B4]/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-[#B297FF]/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-[#B297FF]" />
                </div>
                <CardTitle className="text-white">Propuestas Automáticas</CardTitle>
                <CardDescription className="text-gray-400">
                  IA genera propuestas personalizadas y optimiza perfiles para mayor éxito
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-[#00E5B4]/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-[#00E5B4]/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-[#00E5B4]" />
                </div>
                <CardTitle className="text-white">Pagos Seguros</CardTitle>
                <CardDescription className="text-gray-400">
                  Sistema de pagos protegido con escrow y verificación de identidad
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700 hover:border-[#00E5B4]/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-[#FF6D3A]/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-[#FF6D3A]" />
                </div>
                <CardTitle className="text-white">Analytics Avanzados</CardTitle>
                <CardDescription className="text-gray-400">
                  Métricas detalladas de rendimiento y sugerencias de mejora por IA
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Test Functions Section */}
      <section className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Prueba las funciones</h3>
            <p className="text-gray-400">Explora todas las funcionalidades de GoWork</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/chat">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-6 h-auto"
              >
                <MessageCircle className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Chat en tiempo real</div>
                  <div className="text-sm text-gray-500">Comunícate con Gow, nuestro asistente IA</div>
                </div>
              </Button>
            </Link>

            <Link href="/map">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-6 h-auto"
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
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-6 h-auto"
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
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-6 h-auto"
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
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-6 h-auto"
              >
                <Star className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Dashboard proveedor</div>
                  <div className="text-sm text-gray-500">Administra tus servicios</div>
                </div>
              </Button>
            </Link>

            <Link href="/ai-dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 p-6 h-auto"
              >
                <Brain className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Centro de IA</div>
                  <div className="text-sm text-gray-500">Explora nuestros agentes inteligentes</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#00E5B4]/10 to-[#0066FF]/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para revolucionar tu trabajo?</h2>
          <p className="text-xl text-gray-300 mb-8">Únete a miles de freelancers y empresas que ya confían en GoWork</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-[#00E5B4] hover:bg-[#00E5B4]/90 text-gray-900 font-semibold px-8">
                Crear cuenta gratis
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-8">
                Ver servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
