import { supabase } from "./supabase"

// ==================== TIPOS ====================
export interface SystemMetric {
  id: string
  metric_name: string
  metric_value: number
  metric_type: string
  period_start: string
  period_end: string
  metadata?: any
  created_at: string
}

export interface AnalyticsData {
  revenue: {
    total: number
    monthly: number
    growth: number
  }
  users: {
    total: number
    freelancers: number
    clients: number
    growth: number
  }
  projects: {
    total: number
    active: number
    completed: number
    success_rate: number
  }
  payments: {
    total_volume: number
    platform_fees: number
    average_project_value: number
    payment_success_rate: number
  }
}

// ==================== API DE ANALYTICS ====================
export const analyticsAPI = {
  // Obtener métricas del dashboard
  async getDashboardMetrics(): Promise<AnalyticsData> {
    try {
      // Obtener datos de usuarios
      const { data: users, error: usersError } = await supabase.from("users").select("user_type, created_at")

      // Obtener datos de proyectos
      const { data: projects, error: projectsError } = await supabase.from("projects").select("status, created_at")

      // Obtener datos de contratos
      const { data: contracts, error: contractsError } = await supabase
        .from("contracts")
        .select("total_amount, platform_fee, status, created_at")

      // Obtener datos de pagos
      const { data: payments, error: paymentsError } = await supabase
        .from("payments")
        .select("amount, status, created_at")

      if (usersError || projectsError || contractsError || paymentsError) {
        throw usersError || projectsError || contractsError || paymentsError
      }

      // Calcular métricas
      const now = new Date()
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

      // Usuarios
      const totalUsers = users?.length || 0
      const freelancers = users?.filter((u) => u.user_type === "freelancer").length || 0
      const clients = users?.filter((u) => u.user_type === "client").length || 0
      const newUsersThisMonth = users?.filter((u) => new Date(u.created_at) > lastMonth).length || 0
      const userGrowth = totalUsers > 0 ? (newUsersThisMonth / totalUsers) * 100 : 0

      // Proyectos
      const totalProjects = projects?.length || 0
      const activeProjects = projects?.filter((p) => p.status === "in_progress").length || 0
      const completedProjects = projects?.filter((p) => p.status === "completed").length || 0
      const successRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0

      // Revenue
      const totalRevenue = contracts?.reduce((sum, c) => sum + (c.platform_fee || 0), 0) || 0
      const monthlyRevenue =
        contracts
          ?.filter((c) => new Date(c.created_at) > lastMonth)
          .reduce((sum, c) => sum + (c.platform_fee || 0), 0) || 0
      const revenueGrowth = totalRevenue > 0 ? (monthlyRevenue / totalRevenue) * 100 : 0

      // Pagos
      const totalPaymentVolume = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0
      const totalPlatformFees = contracts?.reduce((sum, c) => sum + (c.platform_fee || 0), 0) || 0
      const averageProjectValue = totalProjects > 0 ? totalPaymentVolume / totalProjects : 0
      const successfulPayments = payments?.filter((p) => p.status === "completed").length || 0
      const paymentSuccessRate = payments?.length > 0 ? (successfulPayments / payments.length) * 100 : 0

      return {
        revenue: {
          total: totalRevenue,
          monthly: monthlyRevenue,
          growth: revenueGrowth,
        },
        users: {
          total: totalUsers,
          freelancers,
          clients,
          growth: userGrowth,
        },
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects,
          success_rate: successRate,
        },
        payments: {
          total_volume: totalPaymentVolume,
          platform_fees: totalPlatformFees,
          average_project_value: averageProjectValue,
          payment_success_rate: paymentSuccessRate,
        },
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
      // Retornar datos por defecto en caso de error
      return {
        revenue: { total: 0, monthly: 0, growth: 0 },
        users: { total: 0, freelancers: 0, clients: 0, growth: 0 },
        projects: { total: 0, active: 0, completed: 0, success_rate: 0 },
        payments: { total_volume: 0, platform_fees: 0, average_project_value: 0, payment_success_rate: 0 },
      }
    }
  },

  // Obtener datos para gráficos de tiempo
  async getTimeSeriesData(metric: string, days = 30) {
    const endDate = new Date()
    const startDate = new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000)

    const { data, error } = await supabase
      .from("system_metrics")
      .select("*")
      .eq("metric_name", metric)
      .gte("period_start", startDate.toISOString())
      .lte("period_end", endDate.toISOString())
      .order("period_start", { ascending: true })

    if (error) throw error
    return data
  },

  // Registrar métrica del sistema
  async recordMetric(name: string, value: number, type: string, metadata?: any) {
    const now = new Date()
    const periodStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const periodEnd = new Date(periodStart.getTime() + 24 * 60 * 60 * 1000)

    const metricData = {
      metric_name: name,
      metric_value: value,
      metric_type: type,
      period_start: periodStart.toISOString(),
      period_end: periodEnd.toISOString(),
      metadata,
    }

    const { data, error } = await supabase.from("system_metrics").insert([metricData]).select().single()

    if (error) throw error
    return data
  },

  // Obtener top freelancers
  async getTopFreelancers(limit = 10) {
    const { data, error } = await supabase
      .from("users")
      .select(`
        id,
        full_name,
        avatar_url,
        rating,
        total_reviews,
        freelancer_profiles(title, skills)
      `)
      .eq("user_type", "freelancer")
      .order("rating", { ascending: false })
      .order("total_reviews", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Obtener proyectos más activos
  async getActiveProjects(limit = 10) {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        title,
        status,
        budget_min,
        budget_max,
        created_at,
        client:users!projects_client_id_fkey(full_name)
      `)
      .eq("status", "in_progress")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  // Obtener estadísticas de categorías
  async getCategoryStats() {
    const { data, error } = await supabase.from("projects").select("category").not("category", "is", null)

    if (error) throw error

    const categoryCount = data?.reduce(
      (acc, project) => {
        const category = project.category || "Sin categoría"
        acc[category] = (acc[category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(categoryCount || {}).map(([name, count]) => ({
      name,
      count,
      percentage: ((count / (data?.length || 1)) * 100).toFixed(1),
    }))
  },
}

// ==================== UTILIDADES ====================
export const analyticsUtils = {
  // Formatear moneda
  formatCurrency(amount: number) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(amount)
  },

  // Formatear porcentaje
  formatPercentage(value: number) {
    return `${value.toFixed(1)}%`
  },

  // Calcular crecimiento
  calculateGrowth(current: number, previous: number) {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  },

  // Generar colores para gráficos
  generateColors(count: number) {
    const colors = [
      "#00E5B4", // Verde GoWork
      "#0066FF", // Azul GoWork
      "#FF6D3A", // Naranja
      "#B297FF", // Púrpura
      "#FFD93D", // Amarillo
      "#FF6B9D", // Rosa
      "#4ECDC4", // Turquesa
      "#45B7D1", // Azul claro
    ]

    return Array.from({ length: count }, (_, i) => colors[i % colors.length])
  },
}
