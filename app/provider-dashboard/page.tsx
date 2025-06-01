"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  MessageCircle,
  Clock,
  MapPin,
  Calendar,
  Settings,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  BarChart3,
  Plus,
  Eye,
  Edit,
  ChevronRight,
  ArrowUp,
  Brain,
} from "lucide-react"
import Link from "next/link"
import NotificationCenter from "@/components/notifications"

export default function ProviderDashboard() {
  const pendingRequests = [
    {
      id: 1,
      service: "Instalación de aire acondicionado",
      client: "María Rodríguez",
      date: "Hoy, 16:00",
      location: "Las Condes",
      budget: "$200",
      avatar: "MR",
      urgency: "Alta",
    },
    {
      id: 2,
      service: "Reparación de tablero eléctrico",
      client: "Carlos López",
      date: "Mañana, 09:00",
      location: "Providencia",
      budget: "$150",
      avatar: "CL",
      urgency: "Media",
    },
  ]

  const activeJobs = [
    {
      id: 1,
      service: "Instalación eléctrica residencial",
      client: "Ana García",
      startTime: "14:00",
      endTime: "18:00",
      location: "Ñuñoa",
      status: "En progreso",
      progress: 65,
      avatar: "AG",
    },
  ]

  const recentReviews = [
    {
      id: 1,
      client: "Juan Pérez",
      rating: 5,
      text: "Excelente trabajo, muy profesional y rápido.",
      service: "Instalación de enchufes",
      date: "Hace 2 días",
      avatar: "JP",
    },
    {
      id: 2,
      client: "Sofia Chen",
      rating: 4,
      text: "Buen servicio, llegó puntual y ordenado.",
      service: "Reparación eléctrica",
      date: "Hace 1 semana",
      avatar: "SC",
    },
  ]

  const stats = {
    totalEarnings: 2850,
    monthlyGrowth: 12.5,
    completedJobs: 234,
    rating: 4.9,
    responseTime: "15 min",
    clientSatisfaction: 98,
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-6">
            <Link href="/">
              <div className="text-2xl font-bold">
                <span className="text-[#0066FF]">Go</span>
                <span className="text-[#00E5B4]">Work</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">JM</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black border-r border-gray-800 h-screen sticky top-16 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Provider Profile */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                    JM
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Juan Martínez</h3>
                  <p className="text-sm text-gray-400">Electricista Certificado</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-400">{stats.rating}</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verificado
              </Badge>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Panel</h4>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-[#00E5B4] bg-[#00E5B4]/10 hover:bg-[#00E5B4]/20"
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Calendar className="h-4 w-4 mr-3" />
                  Agenda
                </Button>
                <Link href="/chat">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <MessageCircle className="h-4 w-4 mr-3" />
                    Mensajes
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Users className="h-4 w-4 mr-3" />
                  Clientes
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <TrendingUp className="h-4 w-4 mr-3" />
                  Estadísticas
                </Button>
                <Link href="/ai-dashboard">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <Brain className="h-4 w-4 mr-3" />
                    Centro de IA
                  </Button>
                </Link>
              </div>
            </div>

            {/* Services Management */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Servicios</h4>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Eye className="h-4 w-4 mr-3" />
                  Ver servicios
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Plus className="h-4 w-4 mr-3" />
                  Crear servicio
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Edit className="h-4 w-4 mr-3" />
                  Editar perfil
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Cuenta</h4>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <DollarSign className="h-4 w-4 mr-3" />
                  Pagos
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Configuración
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="p-6 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#0066FF]/20 to-[#00E5B4]/20 rounded-2xl p-6 border border-[#0066FF]/30">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">¡Hola Juan! 👋</h1>
                  <p className="text-gray-300">
                    Tienes {pendingRequests.length} solicitudes pendientes y {activeJobs.length} trabajo en progreso
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black">Ver solicitudes</Button>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <section>
              <h2 className="text-xl font-bold mb-6">Resumen de rendimiento</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Ganancias este mes</p>
                        <p className="text-2xl font-bold text-[#00E5B4]">${stats.totalEarnings.toLocaleString()}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <ArrowUp className="h-3 w-3 text-[#00E5B4]" />
                          <span className="text-xs text-[#00E5B4]">+{stats.monthlyGrowth}%</span>
                        </div>
                      </div>
                      <DollarSign className="h-8 w-8 text-[#00E5B4]/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Trabajos completados</p>
                        <p className="text-2xl font-bold text-[#0066FF]">{stats.completedJobs}</p>
                        <p className="text-xs text-gray-400 mt-1">Total histórico</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-[#0066FF]/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Calificación promedio</p>
                        <p className="text-2xl font-bold text-[#FF6D3A]">{stats.rating}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-400">Excelente</span>
                        </div>
                      </div>
                      <Star className="h-8 w-8 text-[#FF6D3A]/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Tiempo de respuesta</p>
                        <p className="text-2xl font-bold text-[#B297FF]">{stats.responseTime}</p>
                        <p className="text-xs text-gray-400 mt-1">Promedio</p>
                      </div>
                      <Clock className="h-8 w-8 text-[#B297FF]/60" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Active Job */}
            {activeJobs.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-6">Trabajo en progreso</h2>
                {activeJobs.map((job) => (
                  <Card key={job.id} className="bg-gray-900 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                              {job.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{job.service}</h3>
                            <p className="text-gray-400">{job.client}</p>
                            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-400">
                              <Clock className="h-3 w-3" />
                              <span>
                                {job.startTime} - {job.endTime}
                              </span>
                              <MapPin className="h-3 w-3 ml-2" />
                              <span>{job.location}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">{job.status}</Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Progreso del trabajo</span>
                          <span className="text-[#00E5B4]">{job.progress}%</span>
                        </div>
                        <Progress value={job.progress} className="h-2" />

                        <div className="flex space-x-3">
                          <Button size="sm" className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contactar cliente
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                            Actualizar progreso
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>
            )}

            {/* Pending Requests & Recent Reviews */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pending Requests */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Solicitudes pendientes</h2>
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    Ver todas
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <Card key={request.id} className="bg-gray-900 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white text-sm">
                                {request.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-sm">{request.service}</h4>
                              <p className="text-xs text-gray-400">{request.client}</p>
                              <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                                <Clock className="h-3 w-3" />
                                <span>{request.date}</span>
                                <MapPin className="h-3 w-3 ml-1" />
                                <span>{request.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-[#00E5B4]">{request.budget}</p>
                            <Badge
                              className={`text-xs mt-1 ${
                                request.urgency === "Alta"
                                  ? "bg-[#FF6D3A]/20 text-[#FF6D3A] border-[#FF6D3A]/30"
                                  : "bg-[#B297FF]/20 text-[#B297FF] border-[#B297FF]/30"
                              }`}
                            >
                              {request.urgency}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black flex-1">
                            Aceptar
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 flex-1">
                            Ver detalles
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recent Reviews */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Reseñas recientes</h2>
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    Ver todas
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <Card key={review.id} className="bg-gray-900 border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white text-sm">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-sm">{review.client}</h4>
                              <div className="flex items-center space-x-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-300 mb-2">{review.text}</p>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>{review.service}</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Performance Chart Placeholder */}
            <section>
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Rendimiento mensual</span>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <BarChart3 className="h-12 w-12 text-gray-600 mx-auto" />
                      <p className="text-gray-400">Gráfico de rendimiento</p>
                      <p className="text-sm text-gray-500">Próximamente disponible</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
