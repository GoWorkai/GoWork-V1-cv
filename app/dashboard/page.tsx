"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Search,
  MessageSquare,
  Briefcase,
  Bell,
  AlertTriangle,
  Users,
  DollarSign,
  Activity,
  CheckCircle,
  Brain,
  Plus,
  ArrowRight,
  BarChart3,
  Target,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Download } from "lucide-react"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007bff] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Datos mejorados para los gráficos
  const activityData = [
    { name: "Lun", servicios: 4, ingresos: 45000 },
    { name: "Mar", servicios: 3, ingresos: 32000 },
    { name: "Mié", servicios: 2, ingresos: 28000 },
    { name: "Jue", servicios: 6, ingresos: 67000 },
    { name: "Vie", servicios: 8, ingresos: 89000 },
    { name: "Sáb", servicios: 9, ingresos: 95000 },
    { name: "Dom", servicios: 5, ingresos: 52000 },
  ]

  const categoryData = [
    { name: "Hogar", value: 35, color: "#0088FE" },
    { name: "Tecnología", value: 25, color: "#00C49F" },
    { name: "Diseño", value: 20, color: "#FFBB28" },
    { name: "Otros", value: 20, color: "#FF8042" },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  // Dashboard para clientes
  const renderClientDashboard = () => (
    <div className="space-y-6">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Hola, {user?.name || "Usuario"}! 👋</h1>
            <p className="text-gray-600 text-lg">Descubre servicios increíbles cerca de ti</p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Santiago Centro</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>24 servicios disponibles ahora</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link href="/servicios">
              <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white px-6 py-3">
                <Search className="mr-2 h-5 w-5" />
                Explorar servicios
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3">
              <Brain className="mr-2 h-5 w-5" />
              Hablar con Gow
            </Button>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Servicios contratados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-blue-900">12</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +3 este mes
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Proveedores favoritos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-green-900">8</div>
              <div className="text-sm text-yellow-600 flex items-center">
                <Star className="mr-1 h-4 w-4" />
                4.8 promedio
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Servicios cercanos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-purple-900">24</div>
              <div className="text-sm text-gray-600 flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                &lt; 5 km
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Ahorro total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-orange-900">$125k</div>
              <div className="text-sm text-green-600 flex items-center">
                <DollarSign className="mr-1 h-4 w-4" />
                vs. empresas
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sección principal con gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Mi actividad reciente</span>
            </CardTitle>
            <CardDescription>Servicios contratados en los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="servicios" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Categorías favoritas</span>
            </CardTitle>
            <CardDescription>Tus servicios más buscados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Servicios pendientes y recomendaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Servicios pendientes</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">2 activos</Badge>
            </CardTitle>
            <CardDescription>Próximos servicios agendados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Limpieza de hogar completa",
                  provider: "María González",
                  time: "Mañana, 10:00 AM",
                  status: "confirmed",
                  avatar: "MG",
                },
                {
                  title: "Reparación de computadora",
                  provider: "Carlos Tech",
                  time: "Viernes, 15:00 PM",
                  status: "pending",
                  avatar: "CT",
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white">
                      {service.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{service.title}</p>
                    <p className="text-sm text-gray-500">{service.provider}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{service.time}</span>
                      <Badge
                        className={
                          service.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {service.status === "confirmed" ? "Confirmado" : "Pendiente"}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todos los servicios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span>Recomendaciones de Gow</span>
            </CardTitle>
            <CardDescription>Servicios perfectos para ti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Diseño de logotipo profesional",
                  provider: "Ana Diseñadora",
                  rating: 4.9,
                  price: "$45.000",
                  tag: "Nuevo",
                  avatar: "AD",
                },
                {
                  title: "Clases de guitarra a domicilio",
                  provider: "Profesor Juan",
                  rating: 4.8,
                  price: "$25.000/clase",
                  tag: "Popular",
                  avatar: "PJ",
                },
              ].map((rec, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                      {rec.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{rec.title}</p>
                    <p className="text-sm text-gray-500">{rec.provider}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{rec.rating}</span>
                      <Badge className="bg-purple-100 text-purple-800 text-xs">{rec.tag}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{rec.price}</p>
                    <Button size="sm" className="mt-1 bg-gradient-to-r from-purple-600 to-blue-600">
                      Ver más
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA de Gow IA */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 p-4 rounded-2xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">¿Necesitas ayuda para encontrar algo específico?</h3>
              <p className="text-gray-600 mb-4">
                Gow, tu asistente IA, puede ayudarte a encontrar el servicio perfecto, comparar precios y coordinar todo
                por ti.
              </p>
              <div className="flex space-x-3">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Hablar con Gow
                </Button>
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  Ver ejemplos
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Dashboard para proveedores (mejorado)
  const renderProviderDashboard = () => (
    <div className="space-y-6">
      {/* Header para proveedores */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Proveedor</h1>
            <p className="text-gray-600 text-lg">Gestiona tus servicios y haz crecer tu negocio</p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.8 estrellas</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>32 trabajos completados</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button className="bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white px-6 py-3">
              <Plus className="mr-2 h-5 w-5" />
              Nuevo servicio
            </Button>
            <Button variant="outline" className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-6 py-3">
              <Brain className="mr-2 h-5 w-5" />
              Optimizar con IA
            </Button>
          </div>
        </div>
      </div>

      {/* Métricas de proveedor */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Ingresos del mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-green-900">$245.000</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +15%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Servicios activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-blue-900">8</div>
              <div className="text-sm text-blue-600 flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />3 destacados
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Solicitudes nuevas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-orange-900">5</div>
              <div className="text-sm text-red-600 flex items-center">
                <Bell className="mr-1 h-4 w-4" />2 urgentes
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Calificación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-yellow-900">4.8</div>
              <div className="text-sm text-yellow-600 flex items-center">
                <Star className="mr-1 h-4 w-4" />
                32 reseñas
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resto del dashboard de proveedor... */}
      {/* (Mantener el contenido existente pero con mejores estilos) */}
    </div>
  )

  // Dashboard para administradores (mejorado)
  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Header para admin */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600 text-lg">Monitorea y gestiona toda la plataforma GoWork</p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>2,543 usuarios activos</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Activity className="h-4 w-4" />
                <span>1,128 servicios publicados</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50">
              <BarChart3 className="mr-2 h-5 w-5" />
              Últimos 30 días
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
              <Download className="mr-2 h-5 w-5" />
              Generar reporte
            </Button>
          </div>
        </div>
      </div>

      {/* Métricas de admin */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Usuarios totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-blue-900">2,543</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +12%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Servicios activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-green-900">1,128</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +8%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-purple-900">$4.2M</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +15%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-red-900">12</div>
              <div className="text-sm text-red-600 flex items-center">
                <AlertTriangle className="mr-1 h-4 w-4" />
                Requieren atención
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resto del dashboard de admin... */}
      {/* (Mantener el contenido existente pero con mejores estilos) */}
    </div>
  )

  // Determinar qué dashboard mostrar según el rol
  const renderDashboard = () => {
    if (user?.userType === "admin") {
      return renderAdminDashboard()
    } else if (user?.userType === "provider" || user?.userType === "both") {
      return renderProviderDashboard()
    } else {
      return renderClientDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">{renderDashboard()}</div>
    </div>
  )
}
