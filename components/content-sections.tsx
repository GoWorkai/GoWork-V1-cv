import { Card, CardContent } from "@/components/ui/card"
import { Users, MapPin, Sparkles, Star, Shield, Zap, TrendingUp, Heart, CheckCircle, MessageCircle } from "lucide-react"

export function WhatIsGoWork() {
  return (
    <div className="mb-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">¿Qué es GoWork?</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          GoWork es una red social del talento que conecta personas con habilidades con quienes necesitan sus servicios.
          Nuestra plataforma combina tecnología avanzada con un enfoque humano para crear oportunidades reales de
          crecimiento profesional y económico en tu comunidad local.
        </p>
      </div>
    </div>
  )
}

export function KeyFeatures() {
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

  return (
    <div className="mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">Funcionalidades Clave</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export function WhyChooseGoWork() {
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

  return (
    <div className="mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">¿Por Qué Elegir GoWork?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon
          return (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export function CommunityStats() {
  const stats = [
    { number: "15K+", label: "Talentos activos", icon: Users },
    { number: "8K+", label: "Servicios completados", icon: CheckCircle },
    { number: "95%", label: "Satisfacción cliente", icon: Star },
    { number: "24/7", label: "Soporte disponible", icon: MessageCircle },
  ]

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-8">
        Estadísticas de Nuestra Comunidad
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-gray-200/50 text-center">
              <CardContent className="p-6">
                <IconComponent className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
