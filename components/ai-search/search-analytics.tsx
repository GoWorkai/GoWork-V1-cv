"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Search, Brain, Clock, Target, Star } from "lucide-react"

interface SearchMetric {
  id: string
  label: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  icon: any
}

export function SearchAnalytics() {
  const [metrics, setMetrics] = useState<SearchMetric[]>([])
  const [topQueries, setTopQueries] = useState<Array<{ query: string; count: number; success: number }>>([])

  useEffect(() => {
    // Simular métricas de búsqueda inteligente
    setMetrics([
      {
        id: "total-searches",
        label: "Búsquedas totales",
        value: "12,847",
        change: "+23%",
        trend: "up",
        icon: Search,
      },
      {
        id: "ai-assisted",
        label: "Asistidas por IA",
        value: "11,205",
        change: "+31%",
        trend: "up",
        icon: Brain,
      },
      {
        id: "success-rate",
        label: "Tasa de éxito",
        value: "87.3%",
        change: "+5.2%",
        trend: "up",
        icon: Target,
      },
      {
        id: "avg-response",
        label: "Tiempo respuesta",
        value: "0.8s",
        change: "-0.2s",
        trend: "up",
        icon: Clock,
      },
    ])

    setTopQueries([
      { query: "desarrollador web", count: 1247, success: 92 },
      { query: "diseñador ui/ux", count: 983, success: 89 },
      { query: "marketing digital", count: 756, success: 85 },
      { query: "precio desarrollo app", count: 634, success: 91 },
      { query: "freelancer cerca de mi", count: 521, success: 88 },
    ])
  }, [])

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const IconComponent = metric.icon
          return (
            <Card key={metric.id} className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">{metric.label}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className={`h-3 w-3 ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`} />
                      <span className={`text-xs ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#00E5B4]/20 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-[#00E5B4]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Top búsquedas */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-[#00E5B4]" />
            <span>Búsquedas más populares</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topQueries.map((query, index) => (
              <div key={query.query} className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#0066FF]">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{query.query}</span>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gray-700 text-gray-300 text-xs">{query.count} búsquedas</Badge>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        {query.success}% éxito
                      </Badge>
                    </div>
                  </div>
                  <Progress value={query.success} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SearchAnalytics
