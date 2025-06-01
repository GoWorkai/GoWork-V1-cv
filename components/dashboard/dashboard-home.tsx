"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  TrendingUp,
  DollarSign,
  Star,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  MessageCircle,
  Briefcase,
  Eye,
  Heart,
} from "lucide-react"

export function DashboardHome() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Ganancias del Mes",
      value: "$485.000",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Trabajos Completados",
      value: user?.completedJobs || "0",
      change: "+3 esta semana",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Calificación Promedio",
      value: user?.rating || "0.0",
      change: "Excelente",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Vistas del Perfil",
      value: "127",
      change: "+8% esta semana",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const recentJobs = [
    {
      id: 1,
      title: "Diseño de logo para startup",
      client: "TechStart SpA",
      amount: "$75.000",
      status: "En progreso",
      deadline: "2 días",
      avatar: "/placeholder.svg?height=40&width=40&text=TS",
    },
    {
      id: 2,
      title: "Fotografía de productos",
      client: "Boutique Luna",
      amount: "$120.000",
      status: "Completado",
      deadline: "Entregado",
      avatar: "/placeholder.svg?height=40&width=40&text=BL",
    },
    {
      id: 3,
      title: "Gestión de redes sociales",
      client: "Café Central",
      amount: "$200.000",
      status: "Pendiente",
      deadline: "5 días",
      avatar: "/placeholder.svg?height=40&width=40&text=CC",
    },
  ]

  const nearbyOpportunities = [
    {
      id: 1,
      title: "Diseñador para evento corporativo",
      location: "Las Condes, Santiago",
      budget: "$150.000 - $300.000",
      distance: "2.5 km",
      urgency: "Urgente",
      skills: ["Diseño Gráfico", "Branding"],
    },
    {
      id: 2,
      title: "Fotógrafo para matrimonio",
      location: "Providencia, Santiago",
      budget: "$400.000 - $600.000",
      distance: "4.1 km",
      urgency: "Esta semana",
      skills: ["Fotografía", "Edición"],
    },
    {
      id: 3,
      title: "Community Manager freelance",
      location: "Ñuñoa, Santiago",
      budget: "$250.000/mes",
      distance: "6.8 km",
      urgency: "Flexible",
      skills: ["Marketing Digital", "Redes Sociales"],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#007bff] to-[#0056b3] rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">¡Hola, {user?.name?.split(" ")[0]}! 👋</h1>
        <p className="text-blue-100 mb-4">Tienes 3 nuevas oportunidades cerca de ti y 2 mensajes sin leer.</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Crear Servicio
          </Button>
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            <MessageCircle className="h-4 w-4 mr-2" />
            Ver Mensajes
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Trabajos Recientes</span>
              <Button variant="ghost" size="sm">
                Ver todos
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img src={job.avatar || "/placeholder.svg"} alt={job.client} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.client}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm font-medium text-green-600">{job.amount}</span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {job.deadline}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === "Completado"
                        ? "bg-green-100 text-green-800"
                        : job.status === "En progreso"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {job.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Oportunidades Cercanas</span>
              <Button variant="ghost" size="sm">
                Ver más
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#007bff] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        opportunity.urgency === "Urgente"
                          ? "bg-red-100 text-red-800"
                          : opportunity.urgency === "Esta semana"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {opportunity.urgency}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {opportunity.location} • {opportunity.distance}
                    </div>
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {opportunity.budget}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {opportunity.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                    <Button size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      Interesado
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Plus className="h-6 w-6" />
              <span>Crear Nuevo Servicio</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Programar Cita</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Ver Estadísticas</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
