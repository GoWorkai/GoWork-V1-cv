"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  MapPin,
  Star,
  Shield,
  Zap,
  TrendingUp,
  Heart,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Brain,
  Rocket,
  Camera,
  Wrench,
  Laptop,
  Briefcase,
  Music,
  PaintBucket,
} from "lucide-react"

export function BentoGrid() {
  const bentoItems = [
    // Tarjeta principal - ¿Qué es GoWork?
    {
      id: "main",
      title: "🚀 ¿Qué es GoWork?",
      description: "La red social del talento que transforma habilidades en ingresos reales",
      content:
        "GoWork es más que una aplicación; es una comunidad digital que combina lo mejor de una red social y un marketplace inteligente de servicios.",
      className: "md:col-span-2 md:row-span-2",
      gradient: "from-[#007bff] to-[#0056b3]",
      icon: Rocket,
      cta: "Descubre Más",
    },

    // Estadísticas
    {
      id: "stats",
      title: "📈 Comunidad Activa",
      description: "Miles de talentos conectados",
      content: "15K+ profesionales • 8K+ proyectos • 95% satisfacción",
      className: "md:col-span-1",
      gradient: "from-[#FFA500] to-[#FF8C00]",
      icon: TrendingUp,
      stats: [
        { number: "15K+", label: "Talentos" },
        { number: "8K+", label: "Proyectos" },
        { number: "95%", label: "Satisfacción" },
      ],
    },

    // Gow IA
    {
      id: "ai",
      title: "🤖 Gow IA",
      description: "Tu asistente inteligente",
      content: "Ayuda personalizada para publicar, cotizar, optimizar y coordinar",
      className: "md:col-span-1",
      gradient: "from-[#6610f2] to-[#007bff]",
      icon: Brain,
      features: ["Búsqueda inteligente", "Optimización de precios", "Recomendaciones"],
    },

    // Funcionalidades clave
    {
      id: "features",
      title: "⚡ Funcionalidades",
      description: "Todo lo que necesitas",
      content: "Registro simple, geolocalización, perfil dual, pagos seguros",
      className: "md:col-span-2",
      gradient: "from-[#007bff] to-[#6610f2]",
      icon: Zap,
      keyFeatures: [
        { icon: Users, text: "Registro Simple" },
        { icon: MapPin, text: "Geolocalización" },
        { icon: Shield, text: "Pagos Seguros" },
        { icon: Star, text: "Reputación" },
      ],
    },

    // Categorías de servicios
    {
      id: "services",
      title: "🛠️ Servicios",
      description: "Todas las categorías",
      content: "Desde reparaciones hasta consultoría profesional",
      className: "md:col-span-1",
      gradient: "from-[#FFA500] to-[#007bff]",
      icon: Wrench,
      serviceIcons: [Camera, Wrench, Laptop, Briefcase, Music, PaintBucket],
    },

    // Beneficios
    {
      id: "benefits",
      title: "🌟 Beneficios",
      description: "¿Por qué elegir GoWork?",
      content: "Libertad, autonomía, comunidad e impacto real",
      className: "md:col-span-1",
      gradient: "from-[#007bff] to-[#FFA500]",
      icon: Heart,
      benefits: ["Libertad total", "Comunidad activa", "Crecimiento", "Impacto local"],
    },

    // Testimonios
    {
      id: "testimonials",
      title: "💬 Testimonios",
      description: "Lo que dicen nuestros usuarios",
      content: '"GoWork me ha permitido conectar con clientes increíbles" - María G.',
      className: "md:col-span-2",
      gradient: "from-[#6610f2] to-[#FFA500]",
      icon: MessageCircle,
      testimonial: {
        text: "GoWork me ha permitido conectar con clientes increíbles en mi barrio",
        author: "María González",
        role: "Diseñadora Gráfica",
        rating: 5,
      },
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {bentoItems.map((item) => {
          const IconComponent = item.icon

          return (
            <Card
              key={item.id}
              className={`${item.className} bg-white/10 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-[1.02] group overflow-hidden relative`}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
              />

              <CardContent className="p-6 h-full flex flex-col relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      <p className="text-white/80 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-white/90 mb-4 leading-relaxed">{item.content}</p>

                  {/* Stats */}
                  {item.stats && (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {item.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-white">{stat.number}</div>
                          <div className="text-xs text-white/70">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Features */}
                  {item.features && (
                    <div className="space-y-2 mb-4">
                      {item.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-white/90 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Features */}
                  {item.keyFeatures && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {item.keyFeatures.map((feature, index) => {
                        const FeatureIcon = feature.icon
                        return (
                          <div key={index} className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
                            <FeatureIcon className="h-4 w-4 text-white/80" />
                            <span className="text-white/90 text-xs">{feature.text}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Service Icons */}
                  {item.serviceIcons && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.serviceIcons.map((ServiceIcon, index) => (
                        <div key={index} className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <ServiceIcon className="h-4 w-4 text-white/80" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Benefits */}
                  {item.benefits && (
                    <div className="space-y-1 mb-4">
                      {item.benefits.map((benefit, index) => (
                        <div key={index} className="text-white/90 text-sm">
                          • {benefit}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Testimonial */}
                  {item.testimonial && (
                    <div className="mb-4">
                      <div className="flex mb-2">
                        {[...Array(item.testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-white/90 italic text-sm mb-2">"{item.testimonial.text}"</p>
                      <div className="text-white/80 text-xs">
                        <strong>{item.testimonial.author}</strong> - {item.testimonial.role}
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                {item.cta && (
                  <Button
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/20 group-hover:border-white/50 transition-all"
                  >
                    {item.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
