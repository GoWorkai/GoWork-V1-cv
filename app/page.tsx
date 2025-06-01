"use client"

import {
  Plus,
  Home,
  FolderOpen,
  Layout,
  Palette,
  Sparkles,
  Grid3X3,
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
  MoreHorizontal,
  Crown,
  Wrench,
  Car,
  Camera,
  Utensils,
  Laptop,
  Briefcase,
  GraduationCap,
  Music,
  Scissors,
  Hammer,
  PaintBucket,
  Mic,
  Send,
  Bot,
  Loader2,
  DollarSign,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GoWorkLogo } from "@/components/gowork-logo"
import { AISearchWidget } from "@/components/ai-search-widget"
import { GeminiChat } from "@/components/gemini-chat"
import { geminiService, type SearchResult } from "@/lib/gemini"
import { useState } from "react"

export default function GoWorkDashboard() {
  const [activeTab, setActiveTab] = useState("inicio")
  const [showBanner, setShowBanner] = useState(true)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [showAIWidget, setShowAIWidget] = useState(true)
  const [searchError, setSearchError] = useState<string | null>(null)

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

  const serviceCategories = [
    { icon: Wrench, label: "Reparaciones", id: "repairs", isNew: false },
    { icon: Car, label: "Transporte", id: "transport" },
    { icon: Camera, label: "Fotografía", id: "photography", isNew: true },
    { icon: Utensils, label: "Gastronomía", id: "food" },
    { icon: Laptop, label: "Tecnología", id: "tech" },
    { icon: Briefcase, label: "Consultoría", id: "consulting", isNew: false },
    { icon: GraduationCap, label: "Educación", id: "education" },
    { icon: Music, label: "Entretenimiento", id: "entertainment" },
    { icon: Scissors, label: "Belleza", id: "beauty" },
    { icon: Hammer, label: "Construcción", id: "construction" },
    { icon: PaintBucket, label: "Arte & Diseño", id: "design" },
    { icon: MoreHorizontal, label: "Más", id: "more" },
  ]

  const keyFeatures = [
    {
      icon: Users,
      title: "Registro Simple y Seguro",
      description: "Únete en segundos con tu número de teléfono y verificación OTP. Nada más.",
    },
    {
      icon: MapPin,
      title: "Geolocalización Inteligente",
      description:
        "Encuentra y ofrece servicios en tu área. Te mostramos quién está disponible cerca y qué sabe hacer.",
    },
    {
      icon: Sparkles,
      title: 'Asistente IA "Gow"',
      description:
        "Tu aliado inteligente. Gow te ayuda a publicar tareas, cotizar, mejorar tu perfil, coordinar entregas y mucho más.",
    },
    {
      icon: Users,
      title: "Perfil Dual Único",
      description:
        "Sé cliente y proveedor al mismo tiempo con un solo perfil. Flexibilidad total para tus necesidades.",
    },
    {
      icon: Star,
      title: "Sistema de Reputación",
      description:
        "Construye tu marca personal. Tu reputación crece con cada servicio completado y valoración recibida.",
    },
    {
      icon: Shield,
      title: "Pagos Seguros",
      description: "Transacciones protegidas y transparentes dentro de la plataforma para tu tranquilidad.",
    },
  ]

  const whyChooseGoWork = [
    {
      icon: Zap,
      title: "Libertad y Autonomía",
      description: "Tú decides cuándo, cuánto y cómo trabajar. Sin jefes, sin horarios, sin barreras.",
    },
    {
      icon: Users,
      title: "Conecta con tu Comunidad",
      description:
        "Forma parte de una red activa y creciente. Miles de personas ya confían en GoWork para encontrar y ofrecer servicios.",
    },
    {
      icon: TrendingUp,
      title: "Desarrolla tu Potencial",
      description: "Mejora tus habilidades, amplía tu red de contactos y transforma tu talento en ingresos.",
    },
    {
      icon: Heart,
      title: "Impacto Real y Cercano",
      description:
        "Contribuye a una economía local más inclusiva y colaborativa, activando el talento de tu propio barrio.",
    },
  ]

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
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
    },
    {
      name: "Carlos Ruiz",
      role: "Técnico en Reparaciones",
      content:
        "La plataforma es intuitiva y el sistema de pagos es muy seguro. Ahora tengo trabajo constante cerca de casa.",
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

  const gowCapabilities = [
    {
      title: "Crear perfil profesional",
      description: "Un perfil optimizado que destaque tus habilidades y experiencia única",
      image: "/placeholder.svg?height=120&width=200&text=Perfil+Pro",
      color: "bg-gradient-to-br from-[#007bff] to-[#0056b3]",
    },
    {
      title: "Publicar tareas inteligentes",
      description: "Gow te ayuda a describir y cotizar tus servicios de manera profesional",
      image: "/placeholder.svg?height=120&width=200&text=Tareas",
      color: "bg-gradient-to-br from-[#FFA500] to-[#FF8C00]",
    },
    {
      title: "Optimizar precios",
      description: "Calculadora inteligente para establecer precios competitivos en tu área",
      image: "/placeholder.svg?height=120&width=200&text=Precios",
      color: "bg-gradient-to-br from-[#007bff] to-[#0056b3]",
    },
    {
      title: "Coordinar entregas",
      description: "Gestión automática de tiempos, ubicaciones y seguimiento de proyectos",
      image: "/placeholder.svg?height=120&width=200&text=Entregas",
      color: "bg-gradient-to-br from-[#FFA500] to-[#FF8C00]",
    },
    {
      title: "Mejorar reputación",
      description: "Consejos personalizados para construir tu marca personal en la plataforma",
      image: "/placeholder.svg?height=120&width=200&text=Reputación",
      color: "bg-gradient-to-br from-[#007bff] to-[#0056b3]",
    },
    {
      title: "Analizar oportunidades",
      description: "Insights sobre demanda y tendencias de servicios en tu comunidad",
      image: "/placeholder.svg?height=120&width=200&text=Analytics",
      color: "bg-gradient-to-br from-[#FFA500] to-[#FF8C00]",
    },
  ]

  // Función para manejar búsqueda con IA real
  const handleAISearch = async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    setSearchError(null)
    setSearchQuery(query)

    try {
      const result = await geminiService.searchServices(query)
      setSearchResult(result)
    } catch (error) {
      console.error("Error en búsqueda IA:", error)
      setSearchError("Error al procesar la búsqueda. Intenta nuevamente.")
    } finally {
      setIsSearching(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* SEO Meta Tags - These would be in the head */}
      <div className="hidden">
        <h1>GoWork - La Red Social del Talento y las Oportunidades Humanas</h1>
        <meta
          name="description"
          content="Descubre GoWork, la plataforma que transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti."
        />
        <meta
          name="keywords"
          content="trabajo freelance, servicios locales, red social profesional, habilidades, ingresos, oportunidades, talento, comunidad, GoWork, libertad laboral"
        />
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#007bff]/10 to-[#0056b3]/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-[#FFA500]/10 to-[#FF8C00]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-[#007bff]/10 to-[#0056b3]/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-br from-[#FFA500]/10 to-[#FF8C00]/10 rounded-full blur-xl"></div>
      </div>

      {/* Top Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-[#007bff] via-[#6610f2] to-[#6f42c1] text-white px-6 py-3 relative z-10">
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
        {/* Sidebar */}
        <div className="w-20 lg:w-64 bg-white border-r border-[#D3D3D3] min-h-screen flex flex-col relative z-10">
          {/* Logo */}
          <div className="p-6 border-b border-[#D3D3D3]">
            <div className="lg:block hidden">
              <GoWorkLogo size={40} className="text-[#007bff]" showText={true} />
            </div>
            <div className="lg:hidden block flex justify-center">
              <GoWorkLogo size={32} className="text-[#007bff]" showText={false} />
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
                      ? "bg-[#007bff]/10 text-[#007bff]"
                      : "hover:bg-[#D3D3D3]/20 text-[#333333] hover:text-[#007bff]"
                  }`}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  <span className="hidden lg:block text-sm font-medium">{item.label}</span>
                  {item.highlight && <div className="absolute top-2 right-2 w-2 h-2 bg-[#FFA500] rounded-full"></div>}
                </button>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-[#D3D3D3]">
            <button className="w-full flex items-center space-x-3 p-3 hover:bg-[#D3D3D3]/20 rounded-xl transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-[#007bff] to-[#0056b3] rounded-full flex items-center justify-center text-white text-sm font-bold">
                G
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-sm font-medium text-[#333333]">Invitado</div>
                <div className="text-xs text-[#333333]/70">Crear cuenta</div>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative z-10">
          {activeTab === "inicio" && (
            <div className="p-4 lg:p-8">
              {/* Hero Section - GoWork Style */}
              <div className="text-center mb-16 max-w-5xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-[#333333] mb-6 leading-tight">
                  🌟 GoWork: La <span className="text-[#007bff]">Libertad</span> de Tu Talento
                </h1>

                <p className="text-lg lg:text-xl text-[#333333]/80 mb-8 leading-relaxed max-w-4xl mx-auto">
                  Descubre GoWork, la plataforma que transforma tus habilidades en ingresos reales. Conecta con personas
                  que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti, todo en un solo lugar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button
                    size="lg"
                    onClick={() => setShowRegisterForm(true)}
                    className="bg-[#FFA500] hover:bg-[#FF8C00] text-white text-lg px-8 py-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    Crear Cuenta Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setActiveTab("explorar")}
                    className="border-2 border-[#007bff] text-[#007bff] hover:bg-[#007bff]/10 text-lg px-8 py-4 rounded-xl"
                  >
                    Explorar Servicios
                  </Button>
                </div>

                {/* AI-Powered Search Box */}
                <div className="max-w-3xl mx-auto mb-8">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-[#6610f2]" />
                      <span className="text-sm font-medium text-[#6610f2] hidden sm:block">Gow IA</span>
                    </div>
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAISearch(searchQuery)}
                      placeholder="¿Qué servicio necesitas? Describe tu proyecto y Gow te ayudará..."
                      className="text-lg py-6 pl-20 pr-20 border-2 border-[#D3D3D3] rounded-full bg-white focus:border-[#007bff] focus:ring-[#007bff] placeholder:text-[#333333]/50 text-[#333333]"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <button className="p-2 hover:bg-[#D3D3D3]/20 rounded-lg transition-colors">
                        <Mic className="h-5 w-5 text-[#333333]/60" />
                      </button>
                      <button
                        onClick={() => handleAISearch(searchQuery)}
                        disabled={isSearching || !searchQuery.trim()}
                        className="bg-[#007bff] text-white p-2 rounded-full hover:bg-[#0056b3] transition-colors disabled:opacity-50"
                      >
                        {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* AI Search Results */}
                  {searchResult && (
                    <Card className="mt-4 bg-gradient-to-r from-[#6610f2]/5 to-[#007bff]/5 border-[#6610f2]/20">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <Sparkles className="h-5 w-5 text-[#6610f2]" />
                          <span className="font-medium text-[#6610f2]">Resultados de Gow IA</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Bot className="h-4 w-4 text-[#007bff]" />
                              <span className="text-[#333333]">
                                <strong>{searchResult.professionals}</strong> profesionales encontrados
                              </span>
                            </div>

                            <div className="flex items-center space-x-2 text-sm">
                              <DollarSign className="h-4 w-4 text-[#FFA500]" />
                              <span className="text-[#333333]">
                                {formatPrice(searchResult.priceRange.min)} - {formatPrice(searchResult.priceRange.max)}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Clock className="h-4 w-4 text-[#007bff]" />
                              <span className="text-[#333333]">{searchResult.availability}</span>
                            </div>

                            <div className="flex items-center space-x-2 text-sm">
                              <MapPin className="h-4 w-4 text-[#007bff]" />
                              <span className="text-[#333333]">{searchResult.location}</span>
                            </div>
                          </div>
                        </div>

                        {searchResult.recommendations.length > 0 && (
                          <div className="mb-4 p-3 bg-white/50 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="h-4 w-4 text-[#FFA500]" />
                              <span className="text-sm font-medium text-[#333333]">Recomendaciones de Gow:</span>
                            </div>
                            <div className="space-y-1">
                              {searchResult.recommendations.map((rec, index) => (
                                <p key={index} className="text-sm text-[#333333]/80">
                                  • {rec}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" className="bg-[#FFA500] hover:bg-[#FF8C00] text-white">
                            Ver Proveedores
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#007bff] text-[#007bff]">
                            Refinar Búsqueda
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSearchResult(null)}
                            className="text-[#333333]/60"
                          >
                            Cerrar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Search Error */}
                  {searchError && (
                    <Card className="mt-4 bg-red-50 border-red-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 text-red-700">
                          <X className="h-4 w-4" />
                          <span className="text-sm">{searchError}</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#D3D3D3] hover:border-[#007bff] rounded-full transition-colors">
                    <FileText className="h-4 w-4 text-[#333333]" />
                    <span className="text-sm font-medium text-[#333333]">Mis servicios</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#D3D3D3] hover:border-[#007bff] rounded-full transition-colors">
                    <Layout className="h-4 w-4 text-[#333333]" />
                    <span className="text-sm font-medium text-[#333333]">Plantillas</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#6610f2]/10 border border-[#6610f2]/20 hover:border-[#6610f2] rounded-full transition-colors relative">
                    <Sparkles className="h-4 w-4 text-[#6610f2]" />
                    <span className="text-sm font-medium text-[#6610f2]">Gow IA</span>
                    <span className="absolute -top-2 -right-2 bg-[#6610f2] text-white text-xs px-2 py-0.5 rounded-md">
                      Nuevo
                    </span>
                  </button>
                </div>

                {/* Service Categories - GoWork Network */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 max-w-6xl mx-auto mb-16">
                  {serviceCategories.map((service, index) => {
                    const IconComponent = service.icon
                    return (
                      <div key={index} className="flex flex-col items-center relative">
                        <button className="w-16 h-16 flex items-center justify-center bg-white border border-[#D3D3D3] rounded-xl hover:border-[#007bff] hover:shadow-md transition-all group">
                          <IconComponent className="h-6 w-6 text-[#333333] group-hover:text-[#007bff]" />
                        </button>
                        <span className="mt-2 text-xs text-[#333333] text-center">{service.label}</span>
                        {service.isNew && (
                          <span className="absolute -top-1 -right-1 bg-[#6610f2] text-white text-xs px-1.5 py-0.5 rounded-md">
                            Nuevo
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Illustration */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-64 h-64">
                    <img
                      src="/placeholder.svg?height=256&width=256&text=Mundo+de+Posibilidades"
                      alt="Ilustración GoWork"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[#333333] mb-8">
                  Hay un mundo de posibilidades en tu comunidad
                </h2>
              </div>

              {/* What is GoWork Section */}
              <div className="mb-16 bg-[#D3D3D3]/20 py-12 -mx-8 px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] mb-6">🚀 ¿Qué es GoWork?</h2>
                  <p className="text-lg text-[#333333] leading-relaxed mb-4">
                    GoWork es más que una aplicación; es una comunidad digital que combina lo mejor de una red social y
                    un marketplace inteligente de servicios. Diseñada para empoderar a quienes ofrecen y buscan
                    servicios, desde "peguitas" puntuales hasta proyectos profesionales completos.
                  </p>
                  <p className="text-lg text-[#333333] leading-relaxed">
                    <strong>Somos la nueva infraestructura digital del trabajo independiente.</strong> La evolución
                    digital de las antiguas "páginas amarillas", pero viva, móvil, inteligente y social.
                  </p>
                </div>
              </div>

              {/* Community Stats */}
              <div className="mb-16">
                <h2 className="text-2xl lg:text-3xl font-bold text-center text-[#333333] mb-8">
                  📈 Nuestra Comunidad en Crecimiento
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {communityStats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                      <Card key={index} className="bg-white border-[#D3D3D3] text-center">
                        <CardContent className="p-6">
                          <IconComponent className="h-8 w-8 text-[#007bff] mx-auto mb-3" />
                          <div className="text-2xl lg:text-3xl font-bold text-[#333333] mb-1">{stat.number}</div>
                          <div className="text-sm text-[#333333]/70">{stat.label}</div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Key Features Section */}
              <div className="mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#333333] mb-12">
                  🔍 Descubre el Poder de GoWork
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {keyFeatures.map((feature, index) => {
                    const IconComponent = feature.icon
                    return (
                      <Card
                        key={index}
                        className="bg-white border-[#D3D3D3] hover:shadow-lg transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <div className="w-12 h-12 bg-[#007bff]/10 rounded-xl flex items-center justify-center mb-4">
                            <IconComponent className="h-6 w-6 text-[#007bff]" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#333333] mb-3">{feature.title}</h3>
                          <p className="text-[#333333]/80 leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Why Choose GoWork Section */}
              <div className="mb-16 bg-[#D3D3D3]/20 py-12 -mx-8 px-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#333333] mb-12">
                  🌐 ¿Por Qué Elegir GoWork?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {whyChooseGoWork.map((benefit, index) => {
                    const IconComponent = benefit.icon
                    return (
                      <Card
                        key={index}
                        className="bg-white border-[#D3D3D3] hover:shadow-lg transition-all duration-300 text-center"
                      >
                        <CardContent className="p-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#007bff] to-[#0056b3] rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-[#333333] mb-3">{benefit.title}</h3>
                          <p className="text-[#333333]/80 leading-relaxed">{benefit.description}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Testimonials Section */}
              <div className="mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#333333] mb-12">
                  Lo que dicen nuestros usuarios
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-white border-[#D3D3D3] hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="font-semibold text-[#333333]">{testimonial.name}</h4>
                            <p className="text-sm text-[#333333]/70">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-[#FFA500] fill-current" />
                          ))}
                        </div>
                        <p className="text-[#333333]/80 italic">"{testimonial.content}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Gow IA Capabilities Section */}
              <div className="mb-16 bg-[#D3D3D3]/20 py-12 -mx-8 px-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#333333] mb-12">
                  Descubre lo que puedes hacer con Gow IA
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {gowCapabilities.map((capability, index) => (
                    <Card
                      key={index}
                      className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white border-[#D3D3D3] overflow-hidden"
                    >
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-sm font-semibold text-[#333333]">{capability.title}</span>
                          </div>
                          <p className="text-sm text-[#333333]/80 mb-4 line-clamp-2">{capability.description}</p>
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

              {/* Final CTA Section */}
              <div className="text-center">
                <Card className="bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white max-w-4xl mx-auto">
                  <CardContent className="p-8 lg:p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">🎯 Únete a GoWork Hoy y Libera Tu Talento</h2>
                    <p className="text-lg mb-8 opacity-90">
                      No esperes más. Empieza a transformar tu talento en oportunidades reales. Regístrate gratis y
                      forma parte de una comunidad que valora y necesita lo que sabes hacer.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        onClick={() => setShowRegisterForm(true)}
                        className="bg-[#FFA500] hover:bg-[#FF8C00] text-white text-lg px-8 py-4 rounded-xl"
                      >
                        Regístrate Ahora
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-xl"
                      >
                        Descubre Cómo Funciona
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
              <h2 className="text-2xl font-bold text-[#333333] mb-4">
                {sidebarItems.find((item) => item.id === activeTab)?.label}
              </h2>
              <p className="text-[#333333]/80">Esta sección está en desarrollo. ¡Pronto estará disponible!</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Search Widget - Floating */}
      {showAIWidget && <AISearchWidget onClose={() => setShowAIWidget(false)} />}

      {/* Gemini Chat Widget */}
      <GeminiChat />

      {/* Register Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border-[#D3D3D3]">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#333333]">Libera Tu Talento</h2>
                <button onClick={() => setShowRegisterForm(false)} className="text-[#333333]/70 hover:text-[#333333]">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Nombre completo</label>
                  <Input
                    type="text"
                    placeholder="Tu nombre completo"
                    className="border-[#D3D3D3] focus:border-[#007bff] focus:ring-[#007bff] text-[#333333]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Número de teléfono</label>
                  <Input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    className="border-[#D3D3D3] focus:border-[#007bff] focus:ring-[#007bff] text-[#333333]"
                  />
                  <p className="text-xs text-[#333333]/60 mt-1">Recibirás un código OTP para verificar tu cuenta</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">¿Qué te interesa más?</label>
                  <select className="w-full p-3 border border-[#D3D3D3] rounded-lg focus:border-[#007bff] focus:ring-[#007bff] text-[#333333]">
                    <option>Ofrecer mis servicios</option>
                    <option>Contratar servicios</option>
                    <option>Ambos (Perfil Dual)</option>
                  </select>
                </div>

                <Button className="w-full bg-[#FFA500] hover:bg-[#FF8C00] text-white">Crear Cuenta Gratis</Button>

                <div className="text-center pt-4 border-t border-[#D3D3D3]">
                  <p className="text-sm text-[#333333]/80">
                    ¿Ya tienes cuenta?{" "}
                    <button className="text-[#007bff] hover:text-[#0056b3] font-medium">Iniciar sesión</button>
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
