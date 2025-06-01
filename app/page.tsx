"use client"

import {
  Plus,
  Home,
  FolderOpen,
  Layout,
  Palette,
  Sparkles,
  Grid3X3,
  Mic,
  ArrowRight,
  FileText,
  X,
  MapPin,
  Users,
  Shield,
  Star,
  TrendingUp,
  Heart,
  Zap,
  CheckCircle,
  MessageCircle,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GoWorkLogo } from "@/components/gowork-logo"
import { useState } from "react"

export default function GoWorkDashboard() {
  const [activeTab, setActiveTab] = useState("inicio")
  const [showBanner, setShowBanner] = useState(true)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const sidebarItems = [
    { icon: Home, label: "Inicio", id: "inicio", active: true },
    { icon: Search, label: "Explorar", id: "explorar" },
    { icon: Plus, label: "Crear", id: "crear" },
    { icon: FolderOpen, label: "Mis Servicios", id: "servicios" },
    { icon: Layout, label: "Plantillas", id: "plantillas" },
    { icon: Palette, label: "Mi Marca", id: "marca" },
    { icon: Sparkles, label: "Gow IA", id: "ia", highlight: true },
    { icon: Grid3X3, label: "Apps", id: "apps" },
  ]

  const features = [
    {
      icon: Users,
      title: "Registro Simple y Seguro",
      description: "Únete con tu número de teléfono y verifica tu identidad fácilmente.",
    },
    {
      icon: MapPin,
      title: "Geolocalización Inteligente",
      description: "Encuentra y ofrece servicios en tu área, conectando con personas cercanas.",
    },
    {
      icon: Sparkles,
      title: 'Asistente IA "Gow"',
      description: "Recibe ayuda personalizada para publicar, cotizar y gestionar tus servicios.",
    },
    {
      icon: Users,
      title: "Perfil Dual",
      description: "Actúa como cliente y proveedor simultáneamente, adaptándote a tus necesidades.",
    },
    {
      icon: Star,
      title: "Sistema de Reputación",
      description: "Construye tu reputación con calificaciones y comentarios de la comunidad.",
    },
    {
      icon: Shield,
      title: "Pagos Seguros",
      description: "Transacciones protegidas para tu tranquilidad.",
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: "Flexibilidad Total",
      description: "Tú decides cuándo y cómo trabajar.",
    },
    {
      icon: Users,
      title: "Comunidad Activa",
      description: "Únete a miles de usuarios que ya confían en GoWork.",
    },
    {
      icon: TrendingUp,
      title: "Crecimiento Profesional",
      description: "Mejora tus habilidades y amplía tu red de contactos.",
    },
    {
      icon: Heart,
      title: "Impacto Real",
      description: "Contribuye al desarrollo de una economía más inclusiva y colaborativa.",
    },
  ]

  const stats = [
    { number: "15K+", label: "Talentos activos", icon: Users },
    { number: "8K+", label: "Servicios completados", icon: CheckCircle },
    { number: "95%", label: "Satisfacción cliente", icon: Star },
    { number: "24/7", label: "Soporte disponible", icon: MessageCircle },
  ]

  const testimonials = [
    {
      name: "María González",
      role: "Diseñadora Gráfica",
      content: "GoWork me ha permitido conectar con clientes increíbles y hacer crecer mi negocio freelance.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
    },
    {
      name: "Carlos Ruiz",
      role: "Desarrollador Web",
      content: "La plataforma es intuitiva y el sistema de pagos es muy seguro. Totalmente recomendado.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40&text=CR",
    },
    {
      name: "Ana Martín",
      role: "Consultora de Marketing",
      content: "Encontré proyectos que realmente se alinean con mis habilidades. El matching de IA es excelente.",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
    },
  ]

  const aiCapabilities = [
    {
      title: "Crear perfil profesional",
      description: "Un perfil optimizado que destaque tus habilidades y experiencia",
      image: "/placeholder.svg?height=120&width=200&text=Perfil+Pro",
      color: "bg-gradient-to-br from-[#A9746E] to-[#8A5D58]",
    },
    {
      title: "Generar propuestas",
      description: "Propuestas personalizadas que aumenten tus posibilidades de éxito",
      image: "/placeholder.svg?height=120&width=200&text=Propuestas",
      color: "bg-gradient-to-br from-[#A3C585] to-[#8AAD6C]",
    },
    {
      title: "Optimizar precios",
      description: "Calculadora inteligente para establecer precios competitivos",
      image: "/placeholder.svg?height=120&width=200&text=Precios",
      color: "bg-gradient-to-br from-[#A9746E] to-[#8A5D58]",
    },
    {
      title: "Escribir descripciones",
      description: "Descripciones atractivas para tus servicios y proyectos",
      image: "/placeholder.svg?height=120&width=200&text=Descripciones",
      color: "bg-gradient-to-br from-[#A3C585] to-[#8AAD6C]",
    },
    {
      title: "Gestionar comunicación",
      description: "Respuestas automáticas y seguimiento de clientes",
      image: "/placeholder.svg?height=120&width=200&text=Chat",
      color: "bg-gradient-to-br from-[#A9746E] to-[#8A5D58]",
    },
    {
      title: "Analizar mercado",
      description: "Insights sobre demanda y tendencias en tu área",
      image: "/placeholder.svg?height=120&width=200&text=Analytics",
      color: "bg-gradient-to-br from-[#A3C585] to-[#8AAD6C]",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5DC] relative overflow-hidden">
      {/* SEO Meta Tags - These would be in the head */}
      <div className="hidden">
        <h1>GoWork - La Red Social del Talento y las Oportunidades Humanas</h1>
        <meta
          name="description"
          content="Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti en GoWork."
        />
        <meta
          name="keywords"
          content="trabajo freelance, servicios locales, red social profesional, habilidades, ingresos, oportunidades, talento, comunidad, GoWork"
        />
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#A9746E]/20 to-[#8A5D58]/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-[#A3C585]/20 to-[#8AAD6C]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-[#A9746E]/20 to-[#8A5D58]/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-br from-[#A3C585]/20 to-[#8AAD6C]/20 rounded-full blur-xl"></div>
      </div>

      {/* Top Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-[#A9746E] via-[#A9746E] to-[#8A5D58] text-[#F5F5DC] px-6 py-3 relative z-10">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">
                🔥 Únete a GoWork gratis y descubre todas las oportunidades cerca de ti.
                <button className="underline ml-1 hover:no-underline">Empezar ahora</button>
              </span>
            </div>
            <button onClick={() => setShowBanner(false)} className="hover:bg-[#F5F5DC]/20 p-1 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-20 lg:w-64 bg-white/80 backdrop-blur-sm border-r border-[#D3D3D3] min-h-screen flex flex-col relative z-10">
          {/* Logo */}
          <div className="p-6 border-b border-[#D3D3D3]">
            <div className="lg:block hidden">
              <GoWorkLogo size={40} className="text-[#A9746E]" showText={true} />
            </div>
            <div className="lg:hidden block flex justify-center">
              <GoWorkLogo size={32} className="text-[#A9746E]" showText={false} />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 relative group ${
                    activeTab === item.id
                      ? "bg-[#A3C585]/20 text-[#A9746E]"
                      : "hover:bg-[#F5F5DC] text-[#D3D3D3] hover:text-[#A9746E]"
                  }`}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  <span className="hidden lg:block text-sm font-medium">{item.label}</span>
                  {item.highlight && <div className="absolute top-2 right-2 w-2 h-2 bg-[#A3C585] rounded-full"></div>}
                </button>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-[#D3D3D3]">
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-[#F5F5DC] rounded-xl transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-[#A9746E] to-[#8A5D58] rounded-full flex items-center justify-center text-[#F5F5DC] text-sm font-bold">
                G
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-medium text-[#A9746E]">Invitado</div>
                <div className="text-xs text-[#D3D3D3]">Crear cuenta</div>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative z-10">
          {activeTab === "inicio" && (
            <div className="p-4 lg:p-8">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-6xl font-bold text-[#A9746E] mb-6 leading-tight">
                  GoWork: La red social del{" "}
                  <span className="bg-gradient-to-r from-[#A9746E] via-[#A9746E] to-[#8A5D58] bg-clip-text text-transparent">
                    talento
                  </span>{" "}
                  y las oportunidades humanas
                </h1>

                <p className="text-lg lg:text-xl text-[#2F4F4F] mb-8 leading-relaxed max-w-4xl mx-auto">
                  Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer y
                  encuentra oportunidades cerca de ti.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button
                    size="lg"
                    onClick={() => setShowRegisterForm(true)}
                    className="bg-[#A3C585] hover:bg-[#8AAD6C] text-white text-lg px-8 py-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    Crear Cuenta Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setActiveTab("explorar")}
                    className="border-2 border-[#A3C585] text-[#A9746E] hover:bg-[#A3C585]/10 text-lg px-8 py-4 rounded-xl"
                  >
                    Explorar Servicios
                  </Button>
                </div>

                {/* AI Search Box */}
                <div className="max-w-4xl mx-auto mb-16">
                  <Card className="bg-white/80 backdrop-blur-sm border-[#D3D3D3] shadow-lg">
                    <CardContent className="p-6 lg:p-8">
                      <div className="relative">
                        <Input
                          placeholder="¿Qué servicio necesitas? Describe tu proyecto y Gow te ayudará..."
                          className="text-lg py-6 pl-6 pr-20 border-0 bg-transparent focus:ring-0 placeholder:text-[#D3D3D3] text-[#2F4F4F]"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                          <button className="p-2 hover:bg-[#F5F5DC] rounded-lg transition-colors">
                            <Mic className="h-5 w-5 text-[#D3D3D3]" />
                          </button>
                          <button className="p-2 hover:bg-[#F5F5DC] rounded-lg transition-colors">
                            <ArrowRight className="h-5 w-5 text-[#D3D3D3]" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-[#D3D3D3]">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-[#F5F5DC] hover:bg-[#F5F5DC]/80 rounded-lg transition-colors">
                          <Users className="h-4 w-4 text-[#A9746E]" />
                          <span className="text-sm font-medium text-[#A9746E]">Encontrar talento</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-[#F5F5DC] hover:bg-[#F5F5DC]/80 rounded-lg transition-colors">
                          <FileText className="h-4 w-4 text-[#A9746E]" />
                          <span className="text-sm font-medium text-[#A9746E]">Crear perfil</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-[#F5F5DC] hover:bg-[#F5F5DC]/80 rounded-lg transition-colors">
                          <Sparkles className="h-4 w-4 text-[#A9746E]" />
                          <span className="text-sm font-medium text-[#A9746E]">Optimizar con IA</span>
                        </button>
                      </div>

                      <p className="text-center text-xs text-[#D3D3D3] mt-4">
                        Gow IA te ayuda a encontrar las mejores oportunidades.{" "}
                        <button className="text-[#A3C585] hover:underline">Conoce más</button> •{" "}
                        <button className="text-[#A3C585] hover:underline">Enviar feedback</button>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mb-16">
                <h2 className="text-2xl lg:text-3xl font-bold text-center text-[#A9746E] mb-8">
                  Estadísticas de Nuestra Comunidad
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                      <Card key={index} className="bg-white/80 backdrop-blur-sm border-[#D3D3D3] text-center">
                        <CardContent className="p-6">
                          <IconComponent className="h-8 w-8 text-[#A3C585] mx-auto mb-3" />
                          <div className="text-2xl lg:text-3xl font-bold text-[#A9746E] mb-1">{stat.number}</div>
                          <div className="text-sm text-[#D3D3D3]">{stat.label}</div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* What is GoWork Section */}
              <div className="mb-16 bg-[#F5F5DC] py-12 -mx-8 px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#A9746E] mb-6">¿Qué es GoWork?</h2>
                  <p className="text-lg text-[#2F4F4F] leading-relaxed mb-8">
                    GoWork es una red social del talento que conecta personas con habilidades con quienes necesitan sus
                    servicios. Nuestra plataforma combina tecnología avanzada con un enfoque humano para crear
                    oportunidades reales de crecimiento profesional y económico en tu comunidad local.
                  </p>
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#A9746E] mb-12">
                  Funcionalidades Clave
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                      <Card
                        key={index}
                        className="bg-white/80 backdrop-blur-sm border-[#D3D3D3] hover:shadow-lg transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="w-12 h-12 bg-[#A3C585]/20 rounded-xl flex items-center justify-center mb-4">
                            <IconComponent className="h-6 w-6 text-[#A3C585]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#A9746E] mb-3">{feature.title}</h3>
                          <p className="text-[#2F4F4F] leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mb-16 bg-[#F5F5DC] py-12 -mx-8 px-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#A9746E] mb-12">
                  ¿Por Qué Elegir GoWork?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {benefits.map((benefit, index) => {
                    const IconComponent = benefit.icon
                    return (
                      <Card
                        key={index}
                        className="bg-white/80 backdrop-blur-sm border-[#D3D3D3] hover:shadow-lg transition-all duration-300 text-center"
                      >
                        <CardContent className="p-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#A9746E] to-[#8A5D58] rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="h-8 w-8 text-[#F5F5DC]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#A9746E] mb-3">{benefit.title}</h3>
                          <p className="text-[#2F4F4F] leading-relaxed">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Testimonials Section */}
              <div className="mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#A9746E] mb-12">
                  Lo que dicen nuestros usuarios
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <Card
                      key={index}
                      className="bg-white/80 backdrop-blur-sm border-[#D3D3D3] hover:shadow-lg transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="font-semibold text-[#A9746E]">{testimonial.name}</h4>
                            <p className="text-sm text-[#D3D3D3]">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-[#A3C585] fill-current" />
                          ))}
                        </div>
                        <p className="text-[#2F4F4F] italic">"{testimonial.content}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* AI Capabilities Section */}
              <div className="mb-16 bg-[#F5F5DC] py-12 -mx-8 px-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#A9746E] mb-12">
                  Descubre lo que puedes hacer con Gow IA
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {aiCapabilities.map((capability, index) => (
                    <Card
                      key={index}
                      className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-[#D3D3D3] overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-sm font-semibold text-[#A9746E]">{capability.title}</span>
                          </div>
                          <p className="text-sm text-[#2F4F4F] mb-4 line-clamp-2">{capability.description}</p>
                        </div>
                        <div className={`h-24 ${capability.color} relative overflow-hidden`}>
                          <img
                            src={capability.image || "/placeholder.svg"}
                            alt={capability.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <Card className="bg-gradient-to-r from-[#A9746E] to-[#8A5D58] text-[#F5F5DC] max-w-4xl mx-auto">
                  <CardContent className="p-8 lg:p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                      ¿Listo para transformar tus habilidades en ingresos?
                    </h2>
                    <p className="text-lg mb-8 opacity-90">
                      Únete a miles de profesionales que ya están creciendo con GoWork
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        onClick={() => setShowRegisterForm(true)}
                        className="bg-[#A3C585] hover:bg-[#8AAD6C] text-white text-lg px-8 py-4 rounded-xl"
                      >
                        Crear Cuenta Gratis
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-[#F5F5DC] text-[#F5F5DC] hover:bg-[#F5F5DC]/10 text-lg px-8 py-4 rounded-xl"
                      >
                        Conoce más
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
          {activeTab !== "inicio" && (
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-[#A9746E] mb-4">
                {sidebarItems.find((item) => item.id === activeTab)?.label}
              </h2>
              <p className="text-[#2F4F4F]">Esta sección está en desarrollo. ¡Pronto estará disponible!</p>
            </div>
          )}
        </div>
      </div>

      {/* Register Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#A9746E]">Crear Cuenta Gratis</h2>
                <button onClick={() => setShowRegisterForm(false)} className="text-[#D3D3D3] hover:text-[#A9746E]">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#A9746E] mb-2">Nombre completo</label>
                  <Input
                    type="text"
                    placeholder="Tu nombre completo"
                    className="border-[#D3D3D3] focus:border-[#A3C585] focus:ring-[#A3C585] text-[#2F4F4F]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#A9746E] mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    className="border-[#D3D3D3] focus:border-[#A3C585] focus:ring-[#A3C585] text-[#2F4F4F]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#A9746E] mb-2">Teléfono</label>
                  <Input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    className="border-[#D3D3D3] focus:border-[#A3C585] focus:ring-[#A3C585] text-[#2F4F4F]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#A9746E] mb-2">¿Qué te interesa más?</label>
                  <select className="w-full p-3 border border-[#D3D3D3] rounded-lg focus:border-[#A3C585] focus:ring-[#A3C585] text-[#2F4F4F]">
                    <option>Ofrecer mis servicios</option>
                    <option>Contratar servicios</option>
                    <option>Ambos</option>
                  </select>
                </div>

                <Button className="w-full bg-[#A3C585] hover:bg-[#8AAD6C] text-white">Crear Cuenta Gratis</Button>

                <div className="text-center pt-4 border-t border-[#D3D3D3]">
                  <p className="text-sm text-[#2F4F4F]">
                    ¿Ya tienes cuenta?{" "}
                    <button className="text-[#A3C585] hover:text-[#8AAD6C] font-medium">Iniciar sesión</button>
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
