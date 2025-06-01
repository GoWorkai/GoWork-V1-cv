"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { apiService, type Service, type Job } from "@/lib/api"
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
  Loader2,
} from "lucide-react"

export function DashboardHome() {
  const { user } = useAuth()
  const [stats, setStats] = useState<any>(null)
  const [recentJobs, setRecentJobs] = useState<Job[]>([])
  const [nearbyServices, setNearbyServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)

      // Cargar estadísticas del dashboard
      const statsResponse = await apiService.getDashboardStats()
      if (statsResponse.success) {
        setStats(statsResponse.data)
      }

      // Cargar trabajos recientes
      const jobsResponse = await apiService.getJobs({ limit: 5 })
      if (jobsResponse.success && jobsResponse.data) {
        setRecentJobs(jobsResponse.data.jobs)
      }

      // Cargar servicios cercanos
      const servicesResponse = await apiService.getServices({
        location: user?.location,
        limit: 5,
      })
      if (servicesResponse.success && servicesResponse.data) {
        setNearbyServices(servicesResponse.data.services)
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "in_progress":
        return "En progreso"
      case "pending":
        return "Pendiente"
      case "accepted":
        return "Aceptado"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#007bff]" />
        <span className="ml-2 text-gray-600">Cargando dashboard...</span>
      </div>
    )
  }

  const dashboardStats = [
    {
      title: "Ganancias del Mes",
      value: stats?.earnings ? formatPrice(stats.earnings.current) : "$0",
      change: stats?.earnings ? `${stats.earnings.change > 0 ? "+" : ""}${stats.earnings.change}%` : "0%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Trabajos Completados",
      value: stats?.jobs?.completed || user?.completedJobs || "0",
      change: stats?.jobs ? `${stats.jobs.pending} pendientes` : "Sin trabajos",
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Calificación Promedio",
      value: stats?.rating?.average || user?.rating || "0.0",
      change: stats?.rating ? `${stats.rating.total} reseñas` : "Sin reseñas",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Vistas del Perfil",
      value: stats?.views?.profile || "0",
      change: stats?.views ? `${stats.views.services} en servicios` : "Sin vistas",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#007bff] to-[#0056b3] rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">¡Hola, {user?.name?.split(" ")[0]}! 👋</h1>
        <p className="text-blue-100 mb-4">
          {recentJobs.length > 0
            ? `Tienes ${recentJobs.filter((job) => job.status === "pending").length} trabajos pendientes y ${nearbyServices.length} servicios cerca de ti.`
            : "Explora nuevas oportunidades y comienza a ofrecer tus servicios."}
        </p>
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
        {dashboardStats.map((stat, index) => {
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
              {recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={job.client.avatar || "/placeholder.svg?height=40&width=40&text=C"}
                      alt={job.client.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.client.name}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm font-medium text-green-600">{formatPrice(job.budget.amount)}</span>
                        {job.deadline && (
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(job.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {getStatusText(job.status)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No tienes trabajos recientes</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Explorar oportunidades
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Servicios Cercanos</span>
              <Button variant="ghost" size="sm">
                Ver más
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyServices.length > 0 ? (
                nearbyServices.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-[#007bff] transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{service.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{service.provider.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {service.location.city}, {service.location.region}
                      </div>
                      <div className="flex items-center text-sm font-medium text-green-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatPrice(service.price.min)} - {formatPrice(service.price.max)}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {tag}
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
                        Contactar
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No hay servicios cercanos disponibles</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Explorar servicios
                  </Button>
                </div>
              )}
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
