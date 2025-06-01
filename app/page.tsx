"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { AdvancedAISearch } from "@/components/advanced-ai-search"
import { BentoGrid } from "@/components/bento-grid"
import { FloatingBackground } from "@/components/floating-background"
import { GeminiChat } from "@/components/gemini-chat"
import { ArrowRight, X, Crown, Sparkles, Users, Star, CheckCircle, MessageCircle, Globe } from "lucide-react"

export default function GoWorkAdvanced() {
  const [activeTab, setActiveTab] = useState("inicio")
  const [showBanner, setShowBanner] = useState(true)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const communityStats = [
    { number: "15K+", label: "Talentos conectados", icon: Users },
    { number: "8K+", label: "Proyectos completados", icon: CheckCircle },
    { number: "95%", label: "Satisfacción cliente", icon: Star },
    { number: "24/7", label: "Soporte disponible", icon: MessageCircle },
  ]

  const testimonials = [
    {
      name: "María González",
      role: "Diseñadora Gráfica",
      content:
        "GoWork me ha permitido conectar con clientes increíbles en mi barrio y hacer crecer mi negocio freelance de manera local.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=MG",
    },
    {
      name: "Carlos Ruiz",
      role: "Técnico en Reparaciones",
      content:
        "La plataforma es intuitiva y el sistema de pagos es muy seguro. Ahora tengo trabajo constante cerca de casa.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=CR",
    },
    {
      name: "Ana Martín",
      role: "Consultora de Marketing",
      content: "Encontré proyectos que realmente se alinean con mis habilidades. El matching de IA es excelente.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=AM",
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      {/* Floating Background */}
      <FloatingBackground />

      {/* Top Banner */}
      {showBanner && (
        <div className="relative z-50 bg-gradient-to-r from-[#007bff] via-[#6610f2] to-[#6f42c1] text-white px-6 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5" />
              <span className="text-sm font-medium">
                🔥 Prueba GoWork Pro por 30 días y descubre todos los lanzamientos de GoWork Create.
                <button className="underline ml-1 hover:no-underline">Empezar</button>
              </span>
            </div>
            <button onClick={() => setShowBanner(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar Navigation */}
        <SidebarNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 relative z-30 lg:ml-0">
          {activeTab === "inicio" && (
            <main>
              {/* Hero Section */}
              <section id="inicio" className="pt-12 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                  {/* Main Title */}
                  <div className="mb-12">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-12 leading-tight">
                      🌟 GoWork: La{" "}
                      <span className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent">
                        Libertad
                      </span>{" "}
                      de Tu Talento
                    </h1>

                    {/* Gow IA Section - Inmediatamente después del título */}
                    <div className="mb-12">
                      <AdvancedAISearch />
                    </div>

                    <p className="text-xl lg:text-2xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto">
                      Descubre GoWork, la plataforma que transforma tus habilidades en ingresos reales. Conecta con
                      personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti, todo en un solo
                      lugar.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <Button
                        size="lg"
                        onClick={() => setShowRegisterForm(true)}
                        className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFA500] text-white text-xl px-10 py-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        Crear Cuenta Gratis
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-gray-600 text-white hover:bg-gray-800 text-xl px-10 py-6 rounded-2xl backdrop-blur-sm"
                      >
                        Explorar Servicios
                        <Globe className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* BentoGrid Section */}
              <section id="servicios" className="py-20 px-6">
                <div className="max-w-7xl mx-auto text-center mb-16">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Descubre el Ecosistema GoWork</h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Una plataforma completa diseñada para empoderar tu talento y conectarte con oportunidades reales
                  </p>
                </div>

                <BentoGrid />
              </section>

              {/* Community Stats */}
              <section id="comunidad" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-16">
                    📈 Nuestra Comunidad en Crecimiento
                  </h2>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {communityStats.map((stat, index) => {
                      const IconComponent = stat.icon
                      return (
                        <Card
                          key={index}
                          className="bg-gray-800/80 backdrop-blur-xl border border-gray-700 text-center hover:scale-105 transition-all duration-300"
                        >
                          <CardContent className="p-8">
                            <IconComponent className="h-12 w-12 text-[#FFA500] mx-auto mb-4" />
                            <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                            <div className="text-gray-300">{stat.label}</div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  {/* Testimonials */}
                  <div className="text-center mb-12">
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Lo que dicen nuestros usuarios</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                      <Card
                        key={index}
                        className="bg-gray-800/80 backdrop-blur-xl border border-gray-700 hover:scale-105 transition-all duration-300"
                      >
                        <CardContent className="p-8">
                          <div className="flex items-center mb-6">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-16 h-16 rounded-full mr-4 border-2 border-gray-600"
                            />
                            <div>
                              <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                              <p className="text-gray-300">{testimonial.role}</p>
                            </div>
                          </div>
                          <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-[#FFA500] fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-200 italic leading-relaxed">"{testimonial.content}"</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>

              {/* Final CTA */}
              <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                  <Card className="bg-gradient-to-r from-[#007bff]/20 to-[#6610f2]/20 backdrop-blur-xl border border-gray-700">
                    <CardContent className="p-12">
                      <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                        🎯 Únete a GoWork Hoy y Libera Tu Talento
                      </h2>
                      <p className="text-xl text-gray-200 mb-10 leading-relaxed">
                        No esperes más. Empieza a transformar tu talento en oportunidades reales. Regístrate gratis y
                        forma parte de una comunidad que valora y necesita lo que sabes hacer.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                          size="lg"
                          onClick={() => setShowRegisterForm(true)}
                          className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFA500] text-white text-xl px-10 py-6 rounded-2xl hover:shadow-2xl transition-all duration-300"
                        >
                          Regístrate Ahora
                          <ArrowRight className="ml-3 h-6 w-6" />
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-2 border-gray-600 text-white hover:bg-gray-800 text-xl px-10 py-6 rounded-2xl"
                        >
                          Descubre Cómo Funciona
                          <Sparkles className="ml-3 h-6 w-6" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </main>
          )}

          {/* Other tabs content */}
          {activeTab !== "inicio" && (
            <div className="p-8 text-center min-h-screen flex items-center justify-center">
              <Card className="bg-gray-800/80 backdrop-blur-xl border border-gray-700 max-w-md">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </h2>
                  <p className="text-gray-300">Esta sección está en desarrollo. ¡Pronto estará disponible!</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Gemini Chat Widget */}
      <GeminiChat />

      {/* Register Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-gray-800/90 backdrop-blur-xl border border-gray-700">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Libera Tu Talento</h2>
                <button onClick={() => setShowRegisterForm(false)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Nombre completo</label>
                  <Input
                    type="text"
                    placeholder="Tu nombre completo"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Número de teléfono</label>
                  <Input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#007bff] focus:ring-[#007bff]"
                  />
                  <p className="text-xs text-gray-400 mt-1">Recibirás un código OTP para verificar tu cuenta</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">¿Qué te interesa más?</label>
                  <select className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-[#007bff] focus:ring-[#007bff]">
                    <option value="" className="bg-gray-800">
                      Selecciona una opción
                    </option>
                    <option value="offer" className="bg-gray-800">
                      Ofrecer mis servicios
                    </option>
                    <option value="hire" className="bg-gray-800">
                      Contratar servicios
                    </option>
                    <option value="both" className="bg-gray-800">
                      Ambos (Perfil Dual)
                    </option>
                  </select>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#FFA500] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFA500] text-white py-3 text-lg">
                  Crear Cuenta Gratis
                </Button>

                <div className="text-center pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-300">
                    ¿Ya tienes cuenta?{" "}
                    <button className="text-[#FFA500] hover:text-[#FF8C00] font-medium">Iniciar sesión</button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
