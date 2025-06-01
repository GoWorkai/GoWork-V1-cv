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
  Zap,
  Search,
  MessageSquare,
  Briefcase,
  Bell,
  Camera,
  AlertTriangle,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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
    return null // El useEffect se encargará de la redirección
  }

  // Datos de ejemplo para los gráficos
  const activityData = [
    { name: "Lun", value: 4 },
    { name: "Mar", value: 3 },
    { name: "Mié", value: 2 },
    { name: "Jue", value: 6 },
    { name: "Vie", value: 8 },
    { name: "Sáb", value: 9 },
    { name: "Dom", value: 5 },
  ]

  const categoryData = [
    { name: "Hogar", value: 35 },
    { name: "Tecnología", value: 25 },
    { name: "Diseño", value: 20 },
    { name: "Otros", value: 20 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

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

  // Dashboard para clientes
  const renderClientDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido, {user?.name || "Usuario"}</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
          <Search className="mr-2 h-4 w-4" />
          Buscar servicios
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Servicios contratados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +3 este mes
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Proveedores favoritos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-blue-600 flex items-center">
                <Star className="mr-1 h-4 w-4" />
                4.8 promedio
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Servicios cercanos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-gray-600 flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                &lt; 5 km
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
            <CardDescription>Servicios contratados en los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorías populares</CardTitle>
            <CardDescription>Servicios más buscados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
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
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Servicios pendientes</CardTitle>
            <CardDescription>Próximos servicios agendados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Limpieza de hogar {i === 1 ? "completa" : "básica"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {i === 1 ? "Mañana" : "En 3 días"}, 10:00 AM
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver detalles
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recomendaciones para ti</CardTitle>
            <CardDescription>Basado en tus preferencias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-green-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {i === 1 ? "Diseño de logotipo" : "Reparación de computadoras"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Star className="mr-1 h-3 w-3" />
                      4.{i === 1 ? "9" : "8"} (120+ reseñas)
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver más
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">¿Necesitas ayuda para encontrar un servicio?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Gow, tu asistente IA, puede ayudarte a encontrar el servicio perfecto para tus necesidades.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Hablar con Gow
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Dashboard para proveedores
  const renderProviderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Proveedor</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
          <Briefcase className="mr-2 h-4 w-4" />
          Nuevo servicio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Ingresos del mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">$245.000</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +15%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Servicios activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-blue-600 flex items-center">
                <Briefcase className="mr-1 h-4 w-4" />3 destacados
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Solicitudes nuevas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-orange-600 flex items-center">
                <Bell className="mr-1 h-4 w-4" />2 urgentes
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Calificación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-yellow-600 flex items-center">
                <Star className="mr-1 h-4 w-4" />
                32 reseñas
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Ingresos recientes</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos servicios</CardTitle>
            <CardDescription>Calendario de la semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {i === 1 ? "Diseño web" : i === 2 ? "Consultoría" : "Mantenimiento"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {i === 1 ? "Hoy" : i === 2 ? "Mañana" : "Viernes"}, {10 + i}:00
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                Ver calendario completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Solicitudes pendientes</CardTitle>
            <CardDescription>Requieren tu atención</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {i === 1 ? "Diseño de logo para startup" : "Desarrollo de landing page"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      Hace {i} hora{i > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="h-8 px-2">
                      Rechazar
                    </Button>
                    <Button size="sm" className="h-8 px-2 bg-green-600 hover:bg-green-700">
                      Aceptar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Optimiza tu perfil</CardTitle>
            <CardDescription>Recomendaciones de Gow IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Añade más fotos de tus trabajos",
                  description: "Los perfiles con 5+ fotos reciben un 70% más de contactos",
                  icon: Camera,
                  color: "bg-purple-100 text-purple-700",
                },
                {
                  title: "Completa tus habilidades",
                  description: "Te faltan 3 habilidades por añadir a tu perfil",
                  icon: Zap,
                  color: "bg-yellow-100 text-yellow-700",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${item.color.split(" ")[0]}`}>
                    <item.icon className={`h-5 w-5 ${item.color.split(" ")[1]}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    Mejorar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Dashboard para administradores
  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            Últimos 30 días
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Generar reporte
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Usuarios totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">2,543</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +12%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Servicios activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">1,128</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +8%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Transacciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">$4.2M</div>
              <div className="text-sm text-green-600 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4" />
                +15%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-red-600 flex items-center">
                <AlertTriangle className="mr-1 h-4 w-4" />
                Requieren atención
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de usuarios</CardTitle>
            <CardDescription>Por tipo de cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Clientes", value: 60 },
                      { name: "Proveedores", value: 30 },
                      { name: "Dual", value: 10 },
                    ]}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios por categoría</CardTitle>
            <CardDescription>Distribución actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Hogar", value: 340 },
                    { name: "Tecnología", value: 230 },
                    { name: "Diseño", value: 180 },
                    { name: "Eventos", value: 120 },
                    { name: "Educación", value: 90 },
                  ]}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usuarios recientes</CardTitle>
            <CardDescription>Últimos registros en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">Usuario Ejemplo {i}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      Registrado hace {i} día{i > 1 ? "s" : ""}
                    </p>
                  </div>
                  <Badge className={i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                    {i % 2 === 0 ? "Proveedor" : "Cliente"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zonas más activas</CardTitle>
            <CardDescription>Por volumen de servicios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Santiago Centro", count: 342, growth: "+12%" },
                { name: "Las Condes", count: 256, growth: "+8%" },
                { name: "Providencia", count: 187, growth: "+5%" },
                { name: "Ñuñoa", count: 124, growth: "+15%" },
              ].map((zone, i) => (
                <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-indigo-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{zone.name}</p>
                    <p className="text-xs text-gray-500">{zone.count} servicios activos</p>
                  </div>
                  <div className="text-sm text-green-600">{zone.growth}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return renderDashboard()
}
