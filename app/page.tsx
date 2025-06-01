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
  Image,
  Video,
  FileSpreadsheet,
  FileIcon as Document,
  Globe,
  Upload,
  MoreHorizontal,
  Crown,
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

  const quickAccessItems = [
    { icon: FileSpreadsheet, label: "Hoja de cálculo", id: "spreadsheet", isNew: true },
    { icon: Document, label: "Doc", id: "doc" },
    { icon: Grid3X3, label: "Pizarra online", id: "whiteboard" },
    { icon: Layout, label: "Presentación", id: "presentation" },
    { icon: Users, label: "Redes", id: "social" },
    { icon: Image, label: "Fotos", id: "photos", isNew: true },
    { icon: Video, label: "Video", id: "video" },
    { icon: FileText, label: "Imprimir", id: "print" },
    { icon: Globe, label: "Sitio web", id: "website" },
    { icon: Palette, label: "Personalizar", id: "customize" },
    { icon: Upload, label: "Subir", id: "upload" },
    { icon: MoreHorizontal, label: "Más", id: "more" },
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
      color: "bg-gradient-to-br from-[#007bff] to-[#0056b3]",
    },
    {
      title: "Generar propuestas",
      description: "Propuestas personalizadas que aumenten tus posibilidades de éxito",
      image: "/placeholder.svg?height=120&width=200&text=Propuestas",
      color: "bg-gradient-to-br from-[#FFA500] to-[#FF8C00]",
    },
    {
      title: "Optimizar precios",
      description: "Calculadora inteligente para establecer precios competitivos",
      image: "/placeholder.svg?height=120&width=200&text=Precios",
      color: "bg-gradient-to-br from-[#007bff] to-[#0056b3]",
    },
    {
      title: "Escribir descripciones",
      description: "Descripciones atractivas para tus servicios y proyectos",
      image: "/placeholder.svg?height=120&width=200&text=Descripciones",
      color: "bg-gradient-to-br from-[#FFA500] to-[#FF8C00]",
    },
    {
      title: "Gestionar comunicación",
      description: "Respuestas automáticas y seguimiento de clientes",
      image: "/placeholder.svg?height=120&width=200&text=Chat",
      color: "bg-gradient-to-br from-[#007bff] to-[#0056b3]",
    },
    {
      title: "Analizar mercado",
      description: "Insights sobre demanda y tendencias en tu área",
      image: "/placeholder.svg?height=120&width=200&text=Analytics",
      color: "bg-gradient-to-br from-[#FFA500] to-[#FF8C00]",
    },
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
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
              {/* Hero Section - Canva Style */}
              <div className="text-center mb-16 max-w-5xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-bold text-[#333333] mb-6 leading-tight">
                  ¿Qué <span className="text-[#007bff]">diseñaremos</span> hoy?
                </h1>

                <div className="max-w-3xl mx-auto mb-8">
                  <div className="relative">
                    <Input
                      placeholder="Describe tu idea, y yo la haré realidad"
                      className="text-lg py-6 pl-6 pr-16 border-2 border-[#D3D3D3] rounded-full bg-white focus:border-[#007bff] focus:ring-[#007bff] placeholder:text-[#333333]/50 text-[#333333]"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#007bff] text-white p-2 rounded-full hover:bg-[#0056b3] transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#D3D3D3] hover:border-[#007bff] rounded-full transition-colors">
                    <FileText className="h-4 w-4 text-[#333333]" />
                    <span className="text-sm font-medium text-[#333333]">Mis diseños</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-[#D3D3D3] hover:border-[#007bff] rounded-full transition-colors">
                    <Layout className="h-4 w-4 text-[#333333]" />
                    <span className="text-sm font-medium text-[#333333]">Plantillas</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-[#6610f2]/10 border border-[#6610f2]/20 hover:border-[#6610f2] rounded-full transition-colors relative">
                    <Sparkles className="h-4 w-4 text-[#6610f2]" />
                    <span className="text-sm font-medium text-[#6610f2]">GoWork IA</span>
                    <span className="absolute -top-2 -right-2 bg-[#6610f2] text-white text-xs px-2 py-0.5 rounded-full">
                      Nuevo
                    </span>
                  </button>
                </div>

                {/* Quick Access Icons - Canva Style */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 max-w-6xl mx-auto mb-16">
                  {quickAccessItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <div key={index} className="flex flex-col items-center relative">
                        <button className="w-16 h-16 flex items-center justify-center bg-white border border-[#D3D3D3] rounded-xl hover:border-[#007bff] hover:shadow-md transition-all group">
                          <IconComponent className="h-6 w-6 text-[#333333] group-hover:text-[#007bff]" />
                        </button>
                        <span className="mt-2 text-xs text-[#333333]">{item.label}</span>
                        {item.isNew && (
                          <span className="absolute -top-1 -right-1 bg-[#6610f2] text-white text-xs px-1.5 py-0.5 rounded-md">
                            Nuevo
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Illustration - Canva Style */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-64 h-64">
                    <Image
                      src="/placeholder.svg?height=256&width=256&text=Mundo+de+Posibilidades"
                      alt="Ilustración"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-[#333333] mb-8">Hay un mundo de posibilidades</h2>
              </div>

              {/* Stats Section */}
              <div className="mb-16">
                <h2 className="text-2xl lg:text-3xl font-bold text-center text-[#333333] mb-8">
                  Estadísticas de Nuestra Comunidad
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {stats.map((stat, index) => {
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

              {/* What is GoWork Section */}
              <div className="mb-16 bg-[#D3D3D3]/20 py-12 -mx-8 px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#333333] mb-6">¿Qué es GoWork?</h2>
                  <p className="text-lg text-[#333333] leading-relaxed mb-8">
                    GoWork es una red social del talento que conecta personas con habilidades con quienes necesitan sus
                    servicios. Nuestra plataforma combina tecnología avanzada con un enfoque humano para crear
                    oportunidades reales de crecimiento profesional y económico en tu comunidad local.
                  </p>
                </div>
              </div>

              {/* Features Section */}
              <div className="mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#333333] mb-12">
                  Funcionalidades Clave
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {features.map((feature, index) => {
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

              {/* Benefits Section */}
              <div className="mb-16 bg-[#D3D3D3]/20 py-12 -mx-8 px-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#333333] mb-12">
                  ¿Por Qué Elegir GoWork?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {benefits.map((benefit, index) => {
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

              {/* AI Capabilities Section */}
              <div className="mb-16 bg-[#D3D3D3]/20 py-12 -mx-8 px-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-center text-[#333333] mb-12">
                  Descubre lo que puedes hacer con Gow IA
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {aiCapabilities.map((capability, index) => (
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
                          <Image
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
                <Card className="bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white max-w-4xl mx-auto">
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
                        className="bg-[#FFA500] hover:bg-[#FF8C00] text-white text-lg px-8 py-4 rounded-xl"
                      >
                        Crear Cuenta Gratis
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-xl"
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
              <h2 className="text-2xl font-bold text-[#333333] mb-4">
                {sidebarItems.find((item) => item.id === activeTab)?.label}
              </h2>
              <p className="text-[#333333]/80">Esta sección está en desarrollo. ¡Pronto estará disponible!</p>
            </div>
          )}
        </div>
      </div>

      {/* Register Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white border-[#D3D3D3]">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#333333]">Crear Cuenta Gratis</h2>
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
                  <label className="block text-sm font-medium text-[#333333] mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    className="border-[#D3D3D3] focus:border-[#007bff] focus:ring-[#007bff] text-[#333333]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Teléfono</label>
                  <Input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    className="border-[#D3D3D3] focus:border-[#007bff] focus:ring-[#007bff] text-[#333333]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">¿Qué te interesa más?</label>
                  <select className="w-full p-3 border border-[#D3D3D3] rounded-lg focus:border-[#007bff] focus:ring-[#007bff] text-[#333333]">
                    <option>Ofrecer mis servicios</option>
                    <option>Contratar servicios</option>
                    <option>Ambos</option>
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
