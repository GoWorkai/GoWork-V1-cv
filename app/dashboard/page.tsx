"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Star,
  MessageCircle,
  Clock,
  MapPin,
  Calendar,
  User,
  Settings,
  Heart,
  History,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Pause,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
  Brain,
} from "lucide-react"
import Link from "next/link"
import NotificationCenter from "@/components/notifications"

export default function ClientDashboard() {
  const activeBookings = [
    {
      id: 1,
      service: "Instalación eléctrica",
      provider: "Juan Martínez",
      date: "Hoy, 15:00",
      status: "confirmed",
      avatar: "JM",
      rating: 4.9,
      progress: 75,
    },
    {
      id: 2,
      service: "Diseño de logo",
      provider: "Ana López",
      date: "Mañana, 10:00",
      status: "pending",
      avatar: "AL",
      rating: 5.0,
      progress: 25,
    },
  ]

  const recentServices = [
    {
      id: 1,
      service: "Reparación de plomería",
      provider: "Carlos Ruiz",
      date: "15 Ene",
      rating: 4.8,
      avatar: "CR",
      status: "completed",
    },
    {
      id: 2,
      service: "Clases de guitarra",
      provider: "María García",
      date: "12 Ene",
      rating: 5.0,
      avatar: "MG",
      status: "completed",
    },
    {
      id: 3,
      service: "Desarrollo web",
      provider: "Luis Pérez",
      date: "8 Ene",
      rating: 4.9,
      avatar: "LP",
      status: "completed",
    },
  ]

  const recommendations = [
    {
      id: 1,
      title: "Mantención de jardín",
      provider: "Verde Jardines",
      rating: 4.8,
      price: "$45/hora",
      image: "🌱",
      tags: ["Disponible hoy"],
    },
    {
      id: 2,
      title: "Clases de cocina",
      provider: "Chef Patricia",
      rating: 5.0,
      price: "$80/sesión",
      image: "👩‍🍳",
      tags: ["Nuevo"],
    },
    {
      id: 3,
      title: "Fotografía profesional",
      provider: "David Silva",
      rating: 4.7,
      price: "$150/sesión",
      image: "📸",
      tags: ["Popular"],
    },
  ]

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

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar servicios, proveedores..."
                className="bg-gray-900 border-gray-700 text-white pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">JD</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black border-r border-gray-800 h-screen sticky top-16 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* User Profile */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Juan Domínguez</h3>
                  <p className="text-sm text-gray-400">Cliente Premium</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Menú</h4>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-[#00E5B4] bg-[#00E5B4]/10 hover:bg-[#00E5B4]/20"
                >
                  <User className="h-4 w-4 mr-3" />
                  Dashboard
                </Button>
                <Link href="/servicios">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <Search className="h-4 w-4 mr-3" />
                    Buscar servicios
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Calendar className="h-4 w-4 mr-3" />
                  Mis reservas
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
                  <History className="h-4 w-4 mr-3" />
                  Historial
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Heart className="h-4 w-4 mr-3" />
                  Favoritos
                </Button>
                <Link href="/map">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    <MapPin className="h-4 w-4 mr-3" />
                    Mapa
                  </Button>
                </Link>
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

            {/* Quick Actions */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Acceso rápido</h4>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <CreditCard className="h-4 w-4 mr-3" />
                  Pagos
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Configuración
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <HelpCircle className="h-4 w-4 mr-3" />
                  Ayuda
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
                  <p className="text-gray-300">Tienes 2 servicios activos y 3 nuevas recomendaciones</p>
                </div>
                <div className="flex space-x-3">
                  <Link href="/servicios">
                    <Button className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black">Buscar servicios</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Active Bookings */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Servicios activos</h2>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Ver todos
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-4">
                {activeBookings.map((booking) => (
                  <Card key={booking.id} className="bg-gray-900 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                              {booking.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{booking.service}</h3>
                            <p className="text-gray-400">{booking.provider}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-400">{booking.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{booking.date}</p>
                          <Badge
                            className={`mt-1 ${
                              booking.status === "confirmed"
                                ? "bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30"
                                : "bg-[#FF6D3A]/20 text-[#FF6D3A] border-[#FF6D3A]/30"
                            }`}
                          >
                            {booking.status === "confirmed" ? "Confirmado" : "Pendiente"}
                          </Badge>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                          <span>Progreso del servicio</span>
                          <span>{booking.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-[#00E5B4] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${booking.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button size="sm" className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Mensaje
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          Ver detalles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Music-like Player for Service Tracking */}
            <section>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Servicio en progreso</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>2:30 / 4:00 hrs</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white text-lg">
                        JM
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">Instalación eléctrica completa</h4>
                      <p className="text-gray-400">Juan Martínez • Electricista</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-400">Mi Casa, Las Condes</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div className="bg-[#00E5B4] h-1 rounded-full w-[62%]"></div>
                    </div>

                    {/* Player Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Shuffle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <SkipForward className="h-4 w-4 rotate-180" />
                        </Button>
                        <Button size="sm" className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black rounded-full w-10 h-10">
                          <Pause className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <SkipForward className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Repeat className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <div className="w-20 bg-gray-700 rounded-full h-1">
                          <div className="bg-white h-1 rounded-full w-[70%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Recent Services & Recommendations */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Services */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Servicios recientes</h2>
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    Ver todos
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {recentServices.map((service) => (
                    <Card
                      key={service.id}
                      className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white text-sm">
                              {service.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{service.service}</h4>
                            <p className="text-xs text-gray-400">{service.provider}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">{service.date}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{service.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recommendations */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Recomendado para ti</h2>
                  <Button variant="ghost" className="text-gray-400 hover:text-white">
                    Ver más
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <Card
                      key={rec.id}
                      className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0066FF] to-[#00E5B4] rounded-lg flex items-center justify-center text-lg">
                            {rec.image}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{rec.title}</h4>
                            <p className="text-xs text-gray-400">{rec.provider}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{rec.rating}</span>
                              <Badge className="text-xs bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">
                                {rec.tags[0]}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-[#00E5B4]">{rec.price}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
