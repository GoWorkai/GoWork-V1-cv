"use client"

import { ArrowRight, Users, MapPin, MessageCircle, Menu, X, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GoWorkLogo, GoWorkIcon } from "@/components/gowork-logo"
import { useState } from "react"

export default function GoWorkLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header/Navigation */}
      <header className="bg-blue-900 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <GoWorkLogo size={45} className="text-white" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#que-es" className="text-white hover:text-blue-400 transition-colors">
              ¿Qué es?
            </a>
            <a href="#funcionalidades" className="text-white hover:text-blue-400 transition-colors">
              Funcionalidades
            </a>
            <a href="#por-que" className="text-white hover:text-blue-400 transition-colors">
              ¿Por qué?
            </a>
            <a href="#contacto" className="text-white hover:text-blue-400 transition-colors">
              Contacto
            </a>
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:block">
            <Button onClick={() => setShowLoginForm(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Iniciar Sesión
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-900 border-t border-white/30">
            <nav className="px-4 py-4 space-y-4">
              <a href="#que-es" className="block text-white hover:text-blue-400">
                ¿Qué es?
              </a>
              <a href="#funcionalidades" className="block text-white hover:text-blue-400">
                Funcionalidades
              </a>
              <a href="#por-que" className="block text-white hover:text-blue-400">
                ¿Por qué?
              </a>
              <a href="#contacto" className="block text-white hover:text-blue-400">
                Contacto
              </a>
              <Button
                onClick={() => setShowLoginForm(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Iniciar Sesión
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <GoWorkIcon size={32} />
                  <h2 className="text-2xl font-bold text-blue-900">Iniciar Sesión</h2>
                </div>
                <button onClick={() => setShowLoginForm(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Número de teléfono o email</label>
                  <Input
                    type="text"
                    placeholder="Ingresa tu teléfono o email"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-2">Contraseña</label>
                  <Input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>

                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Iniciar Sesión</Button>

                <div className="text-center">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <a href="#contacto" className="text-blue-600 hover:text-blue-800 font-medium">
                      Regístrate gratis
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Powered by AI Badge */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Powered by AI</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Conecta con el <span className="text-emerald-400">talento</span>{" "}
            <span className="text-blue-400">perfecto</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            GoWork usa inteligencia artificial para conectar freelancers y clientes de manera inteligente. Encuentra
            proyectos, contrata talento y haz crecer tu negocio.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Busca servicios, proveedores o pregunta lo que necesites..."
                className="pl-12 pr-24 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl backdrop-blur-sm"
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-4"
              >
                Gemini
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-4 rounded-xl">
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-xl backdrop-blur-sm"
            >
              Explorar servicios
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">15K+</div>
            <div className="text-gray-300">Freelancers activos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">8K+</div>
            <div className="text-gray-300">Proyectos completados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">95%</div>
            <div className="text-gray-300">Satisfacción cliente</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">24/7</div>
            <div className="text-gray-300">Soporte IA</div>
          </div>
        </div>

        {/* AI Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Funcionalidades potenciadas por IA</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Nuestra plataforma usa inteligencia artificial para hacer más eficiente la conexión entre talento y
            oportunidades
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Matching Inteligente</h3>
              <p className="text-gray-300 leading-relaxed">
                Algoritmos avanzados que conectan automáticamente el talento perfecto con cada proyecto específico.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Chat en Tiempo Real</h3>
              <p className="text-gray-300 leading-relaxed">
                Comunicación instantánea con asistencia de IA para resolver dudas y facilitar negociaciones.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Geolocalización</h3>
              <p className="text-gray-300 leading-relaxed">
                Encuentra servicios y profesionales cerca de ti con precisión geográfica inteligente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <GoWorkLogo size={45} className="text-white" />
              <p className="text-blue-200 mt-4">
                La red social del talento y las oportunidades humanas. Conectando personas, creando valor.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Plataforma</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Cómo funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Categorías
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Seguridad
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Soporte</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Términos
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Comunidad</h4>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Eventos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Afiliados
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Desarrolladores
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 GoWork. Todos los derechos reservados. Transformando habilidades en oportunidades.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
