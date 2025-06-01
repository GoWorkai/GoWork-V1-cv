"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  Star,
  MapPin,
  Activity,
  Target,
  Eye,
  Heart,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Bell,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
    period: string
  }
  icon: React.ElementType
  color: "blue" | "green" | "purple" | "orange" | "red" | "yellow"
  description?: string
}

function MetricCard({ title, value, change, icon: Icon, color, description }: MetricCardProps) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
    green: "from-green-50 to-green-100 border-green-200 text-green-700",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-700",
    orange: "from-orange-50 to-orange-100 border-orange-200 text-orange-700",
    red: "from-red-50 to-red-100 border-red-200 text-red-700",
    yellow: "from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700",
  }

  const iconColorClasses = {
    blue: "text-blue-900",
    green: "text-green-900",
    purple: "text-purple-900",
    orange: "text-orange-900",
    red: "text-red-900",
    yellow: "text-yellow-900",
  }

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-sm font-medium ${colorClasses[color].split(" ")[2]}`}>{title}</CardTitle>
          <Icon className={`h-5 w-5 ${iconColorClasses[color]}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <div className={`text-3xl font-bold ${iconColorClasses[color]}`}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </div>
            {change && (
              <div
                className={`text-sm flex items-center ${
                  change.type === "increase" ? "text-green-600" : "text-red-600"
                }`}
              >
                {change.type === "increase" ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                {change.value > 0 ? "+" : ""}
                {change.value}% {change.period}
              </div>
            )}
          </div>
          {description && <p className={`text-xs ${colorClasses[color].split(" ")[2]} opacity-80`}>{description}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

interface EnhancedMetricsProps {
  userType: "client" | "provider" | "admin" | "both"
  data?: any
}

export function EnhancedMetrics({ userType, data }: EnhancedMetricsProps) {
  // Datos de ejemplo para los gráficos
  const weeklyData = [
    { name: "Lun", servicios: 4, ingresos: 45000, usuarios: 120 },
    { name: "Mar", servicios: 3, ingresos: 32000, usuarios: 98 },
    { name: "Mié", servicios: 2, ingresos: 28000, usuarios: 87 },
    { name: "Jue", servicios: 6, ingresos: 67000, usuarios: 145 },
    { name: "Vie", servicios: 8, ingresos: 89000, usuarios: 167 },
    { name: "Sáb", servicios: 9, ingresos: 95000, usuarios: 189 },
    { name: "Dom", servicios: 5, ingresos: 52000, usuarios: 134 },
  ]

  const categoryData = [
    { name: "Hogar", value: 35, color: "#0088FE" },
    { name: "Tecnología", value: 25, color: "#00C49F" },
    { name: "Diseño", value: 20, color: "#FFBB28" },
    { name: "Eventos", value: 12, color: "#FF8042" },
    { name: "Otros", value: 8, color: "#8884D8" },
  ]

  const renderClientMetrics = () => (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Servicios contratados"
          value={12}
          change={{ value: 25, type: "increase", period: "este mes" }}
          icon={Briefcase}
          color="blue"
          description="3 servicios activos"
        />
        <MetricCard
          title="Proveedores favoritos"
          value={8}
          change={{ value: 12, type: "increase", period: "este mes" }}
          icon={Heart}
          color="green"
          description="4.8 rating promedio"
        />
        <MetricCard title="Servicios cercanos" value={24} icon={MapPin} color="purple" description="Dentro de 5 km" />
        <MetricCard
          title="Ahorro total"
          value="$125k"
          change={{ value: 18, type: "increase", period: "vs empresas" }}
          icon={DollarSign}
          color="orange"
          description="Comparado con precios tradicionales"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Mi actividad</span>
            </CardTitle>
            <CardDescription>Servicios contratados en los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="servicios" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                </AreaChart>
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderProviderMetrics = () => (
    <div className="space-y-6">
      {/* Métricas de proveedor */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Ingresos del mes"
          value="$245k"
          change={{ value: 15, type: "increase", period: "vs mes anterior" }}
          icon={DollarSign}
          color="green"
          description="8 servicios completados"
        />
        <MetricCard
          title="Servicios activos"
          value={8}
          change={{ value: 2, type: "increase", period: "esta semana" }}
          icon={Briefcase}
          color="blue"
          description="3 destacados"
        />
        <MetricCard title="Solicitudes nuevas" value={5} icon={Bell} color="orange" description="2 urgentes" />
        <MetricCard
          title="Calificación"
          value="4.8"
          change={{ value: 0.2, type: "increase", period: "este mes" }}
          icon={Star}
          color="yellow"
          description="32 reseñas"
        />
      </div>

      {/* Gráficos de proveedor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Ingresos semanales</span>
            </CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Ingresos"]} />
                  <Bar dataKey="ingresos" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <span>Rendimiento del perfil</span>
            </CardTitle>
            <CardDescription>Métricas de visibilidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Vistas del perfil</p>
                    <p className="text-sm text-gray-500">Esta semana</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-900">156</p>
                  <p className="text-sm text-green-600">+23%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Contactos recibidos</p>
                    <p className="text-sm text-gray-500">Esta semana</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-900">12</p>
                  <p className="text-sm text-green-600">+8%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Tasa de conversión</p>
                    <p className="text-sm text-gray-500">Contacto → Contrato</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-900">67%</p>
                  <p className="text-sm text-green-600">+5%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAdminMetrics = () => (
    <div className="space-y-6">
      {/* Métricas de administrador */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Usuarios totales"
          value={2543}
          change={{ value: 12, type: "increase", period: "este mes" }}
          icon={Users}
          color="blue"
          description="156 nuevos esta semana"
        />
        <MetricCard
          title="Servicios activos"
          value={1128}
          change={{ value: 8, type: "increase", period: "este mes" }}
          icon={Briefcase}
          color="green"
          description="89 publicados hoy"
        />
        <MetricCard
          title="Transacciones"
          value="$4.2M"
          change={{ value: 15, type: "increase", period: "este mes" }}
          icon={DollarSign}
          color="purple"
          description="Volumen total procesado"
        />
        <MetricCard
          title="Alertas"
          value={12}
          icon={AlertTriangle}
          color="red"
          description="Requieren atención inmediata"
        />
      </div>

      {/* Gráficos de administrador */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Crecimiento de usuarios</span>
            </CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="usuarios" stroke="#6366f1" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Distribución de servicios</span>
            </CardTitle>
            <CardDescription>Por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Renderizar métricas según el tipo de usuario
  switch (userType) {
    case "admin":
      return renderAdminMetrics()
    case "provider":
    case "both":
      return renderProviderMetrics()
    default:
      return renderClientMetrics()
  }
}
