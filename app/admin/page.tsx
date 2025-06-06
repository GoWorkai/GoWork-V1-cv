"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import { analyticsAPI, analyticsUtils, type AnalyticsData } from "@/lib/analytics"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  FileText,
  CreditCard,
  Star,
  Activity,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
} from "lucide-react"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [topFreelancers, setTopFreelancers] = useState<any[]>([])
  const [activeProjects, setActiveProjects] = useState<any[]>([])
  const [categoryStats, setCategoryStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [analyticsData, freelancersData, projectsData, categoriesData] = await Promise.all([
        analyticsAPI.getDashboardMetrics(),
        analyticsAPI.getTopFreelancers(5),
        analyticsAPI.getActiveProjects(5),
        analyticsAPI.getCategoryStats(),
      ])

      setAnalytics(analyticsData)
      setTopFreelancers(freelancersData || [])
      setActiveProjects(projectsData || [])
      setCategoryStats(categoriesData || [])
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    color,
    format = "number",
  }: {
    title: string
    value: number
    change: number
    icon: any
    color: string
    format?: "number" | "currency" | "percentage"
  }) => {
    const formatValue = (val: number) => {
      switch (format) {
        case "currency":
          return analyticsUtils.formatCurrency(val)
        case "percentage":
          return analyticsUtils.formatPercentage(val)
        default:
          return val.toLocaleString("es-CL")
      }
    }

    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{title}</p>
              <p className={`text-2xl font-bold text-${color}`}>{formatValue(value)}</p>
              <div className="flex items-center mt-2">
                {change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                )}
                <span className={`text-sm ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {analyticsUtils.formatPercentage(Math.abs(change))}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
              </div>
            </div>
            <Icon className={`h-8 w-8 text-${color}`} />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-800 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard Administrativo</h1>
            <p className="text-gray-400 mt-2">Métricas y análisis de GoWork en tiempo real</p>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={refreshData}
              disabled={refreshing}
              variant="outline"
              className="border-gray-600 text-gray-300"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
            <Button className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
              <Download className="h-4 w-4 mr-2" />
              Exportar Reporte
            </Button>
          </div>
        </div>

        {/* Métricas principales */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard
              title="Revenue Total"
              value={analytics.revenue.total}
              change={analytics.revenue.growth}
              icon={DollarSign}
              color="[#00E5B4]"
              format="currency"
            />
            <MetricCard
              title="Usuarios Totales"
              value={analytics.users.total}
              change={analytics.users.growth}
              icon={Users}
              color="[#0066FF]"
            />
            <MetricCard
              title="Proyectos Activos"
              value={analytics.projects.active}
              change={analytics.projects.success_rate}
              icon={FileText}
              color="yellow-400"
            />
            <MetricCard
              title="Tasa de Éxito"
              value={analytics.projects.success_rate}
              change={5.2}
              icon={TrendingUp}
              color="green-400"
              format="percentage"
            />
          </div>
        )}

        {/* Contenido principal */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#00E5B4] data-[state=active]:text-black">
              <BarChart3 className="h-4 w-4 mr-2" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#00E5B4] data-[state=active]:text-black">
              <Users className="h-4 w-4 mr-2" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-[#00E5B4] data-[state=active]:text-black">
              <FileText className="h-4 w-4 mr-2" />
              Proyectos
            </TabsTrigger>
            <TabsTrigger value="finances" className="data-[state=active]:bg-[#00E5B4] data-[state=active]:text-black">
              <CreditCard className="h-4 w-4 mr-2" />
              Finanzas
            </TabsTrigger>
          </TabsList>

          {/* Resumen */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Freelancers */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span>Top Freelancers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topFreelancers.map((freelancer, index) => (
                      <div key={freelancer.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#0066FF] to-[#00E5B4] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-white">{freelancer.full_name}</p>
                          <p className="text-sm text-gray-400">{freelancer.freelancer_profiles?.[0]?.title || "N/A"}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{freelancer.rating.toFixed(1)}</span>
                          </div>
                          <p className="text-xs text-gray-500">{freelancer.total_reviews} reseñas</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Proyectos Activos */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-[#00E5B4]" />
                    <span>Proyectos Activos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeProjects.map((project) => (
                      <div key={project.id} className="border border-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white text-sm">{project.title}</h4>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">En Progreso</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Cliente: {project.client?.full_name}</span>
                          <span className="text-[#00E5B4] font-semibold">
                            {analyticsUtils.formatCurrency(project.budget_min)} -{" "}
                            {analyticsUtils.formatCurrency(project.budget_max)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Estadísticas por categoría */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-[#0066FF]" />
                  <span>Distribución por Categorías</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {categoryStats.map((category, index) => (
                    <div key={category.name} className="text-center">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                        style={{
                          backgroundColor: analyticsUtils.generateColors(categoryStats.length)[index],
                        }}
                      >
                        {category.count}
                      </div>
                      <p className="font-semibold text-white">{category.name}</p>
                      <p className="text-sm text-gray-400">{category.percentage}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usuarios */}
          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-[#0066FF] mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">{analytics?.users.total || 0}</p>
                  <p className="text-gray-400">Usuarios Totales</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-[#00E5B4] mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">{analytics?.users.freelancers || 0}</p>
                  <p className="text-gray-400">Freelancers</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">{analytics?.users.clients || 0}</p>
                  <p className="text-gray-400">Clientes</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Proyectos */}
          <TabsContent value="projects" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-[#0066FF] mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">{analytics?.projects.total || 0}</p>
                  <p className="text-gray-400">Proyectos Totales</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Activity className="h-12 w-12 text-[#00E5B4] mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">{analytics?.projects.active || 0}</p>
                  <p className="text-gray-400">Activos</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">
                    {analyticsUtils.formatPercentage(analytics?.projects.success_rate || 0)}
                  </p>
                  <p className="text-gray-400">Tasa de Éxito</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Finanzas */}
          <TabsContent value="finances" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-12 w-12 text-[#00E5B4] mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">
                    {analyticsUtils.formatCurrency(analytics?.revenue.total || 0)}
                  </p>
                  <p className="text-gray-400">Revenue Total</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-12 w-12 text-[#0066FF] mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">
                    {analyticsUtils.formatCurrency(analytics?.payments.platform_fees || 0)}
                  </p>
                  <p className="text-gray-400">Comisiones</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">
                    {analyticsUtils.formatCurrency(analytics?.payments.average_project_value || 0)}
                  </p>
                  <p className="text-gray-400">Valor Promedio</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white">
                    {analyticsUtils.formatPercentage(analytics?.payments.payment_success_rate || 0)}
                  </p>
                  <p className="text-gray-400">Tasa de Éxito</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
