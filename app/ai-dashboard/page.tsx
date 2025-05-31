"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Bot,
  TrendingUp,
  MessageCircle,
  Zap,
  Shield,
  Eye,
  Settings,
  Activity,
  BarChart3,
  Clock,
  CheckCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import Link from "next/link"
import AIAssistant from "@/components/ai-agents/ai-assistant"

export default function AIDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const aiMetrics = {
    totalAgents: 5,
    activeAgents: 4,
    totalInteractions: 15420,
    successRate: 94.2,
    avgResponseTime: "0.8s",
    userSatisfaction: 4.8,
    automationLevel: 87,
    costSavings: 45000,
  }

  const agentPerformance = [
    {
      id: "onboarding",
      name: "Asistente de Incorporación",
      interactions: 3240,
      successRate: 96.5,
      avgResponseTime: "0.6s",
      status: "optimal",
      trend: "up",
    },
    {
      id: "recommendations",
      name: "Motor de Recomendaciones",
      interactions: 5680,
      successRate: 92.8,
      avgResponseTime: "1.2s",
      status: "optimal",
      trend: "up",
    },
    {
      id: "proposals",
      name: "Generador de Propuestas",
      interactions: 2150,
      successRate: 89.4,
      avgResponseTime: "2.1s",
      status: "warning",
      trend: "down",
    },
    {
      id: "support",
      name: "Soporte Inteligente",
      interactions: 4350,
      successRate: 97.2,
      avgResponseTime: "0.4s",
      status: "optimal",
      trend: "up",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      agent: "Soporte Inteligente",
      action: "Resolvió consulta sobre pagos",
      user: "María González",
      time: "Hace 2 min",
      status: "success",
    },
    {
      id: 2,
      agent: "Motor de Recomendaciones",
      action: "Sugirió 3 proyectos relevantes",
      user: "Carlos López",
      time: "Hace 5 min",
      status: "success",
    },
    {
      id: 3,
      agent: "Generador de Propuestas",
      action: "Creó propuesta personalizada",
      user: "Ana Martínez",
      time: "Hace 8 min",
      status: "processing",
    },
    {
      id: 4,
      agent: "Asistente de Incorporación",
      action: "Optimizó perfil profesional",
      user: "Luis Pérez",
      time: "Hace 12 min",
      status: "success",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-6">
            <Link href="/">
              <div className="text-2xl font-bold">
                <span className="text-[#0066FF]">Go</span>
                <span className="text-[#00E5B4]">Work</span>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-[#00E5B4]" />
              <h1 className="text-xl font-semibold">Centro de Inteligencia Artificial</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">
              <Activity className="h-3 w-3 mr-1" />
              {aiMetrics.activeAgents} Agentes Activos
            </Badge>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black border-r border-gray-800 h-screen sticky top-16 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Panel de IA</h4>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    activeTab === "overview"
                      ? "text-[#00E5B4] bg-[#00E5B4]/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Resumen General
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    activeTab === "agents"
                      ? "text-[#00E5B4] bg-[#00E5B4]/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("agents")}
                >
                  <Bot className="h-4 w-4 mr-3" />
                  Agentes Interactivos
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    activeTab === "performance"
                      ? "text-[#00E5B4] bg-[#00E5B4]/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("performance")}
                >
                  <TrendingUp className="h-4 w-4 mr-3" />
                  Rendimiento
                </Button>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    activeTab === "security"
                      ? "text-[#00E5B4] bg-[#00E5B4]/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <Shield className="h-4 w-4 mr-3" />
                  Seguridad y Ética
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="p-6 space-y-8">
            {activeTab === "overview" && (
              <>
                {/* Metrics Overview */}
                <section>
                  <h2 className="text-2xl font-bold mb-6">Métricas de IA en Tiempo Real</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Card className="bg-gray-900 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-400">Interacciones Totales</p>
                            <p className="text-2xl font-bold text-[#00E5B4]">
                              {aiMetrics.totalInteractions.toLocaleString()}
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                              <ArrowUp className="h-3 w-3 text-[#00E5B4]" />
                              <span className="text-xs text-[#00E5B4]">+12.5%</span>
                            </div>
                          </div>
                          <MessageCircle className="h-8 w-8 text-[#00E5B4]/60" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-400">Tasa de Éxito</p>
                            <p className="text-2xl font-bold text-[#0066FF]">{aiMetrics.successRate}%</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <ArrowUp className="h-3 w-3 text-[#0066FF]" />
                              <span className="text-xs text-[#0066FF]">+2.1%</span>
                            </div>
                          </div>
                          <CheckCircle className="h-8 w-8 text-[#0066FF]/60" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-400">Tiempo de Respuesta</p>
                            <p className="text-2xl font-bold text-[#FF6D3A]">{aiMetrics.avgResponseTime}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <ArrowDown className="h-3 w-3 text-[#FF6D3A]" />
                              <span className="text-xs text-[#FF6D3A]">-15ms</span>
                            </div>
                          </div>
                          <Clock className="h-8 w-8 text-[#FF6D3A]/60" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-400">Automatización</p>
                            <p className="text-2xl font-bold text-[#B297FF]">{aiMetrics.automationLevel}%</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <ArrowUp className="h-3 w-3 text-[#B297FF]" />
                              <span className="text-xs text-[#B297FF]">+5.2%</span>
                            </div>
                          </div>
                          <Zap className="h-8 w-8 text-[#B297FF]/60" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Agent Performance */}
                <section>
                  <h2 className="text-xl font-bold mb-6">Rendimiento por Agente</h2>
                  <div className="space-y-4">
                    {agentPerformance.map((agent) => (
                      <Card key={agent.id} className="bg-gray-900 border-gray-700">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  agent.status === "optimal"
                                    ? "bg-[#00E5B4]"
                                    : agent.status === "warning"
                                      ? "bg-[#FF6D3A]"
                                      : "bg-gray-500"
                                }`}
                              ></div>
                              <h3 className="font-semibold">{agent.name}</h3>
                              <Badge
                                className={`text-xs ${
                                  agent.status === "optimal"
                                    ? "bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30"
                                    : "bg-[#FF6D3A]/20 text-[#FF6D3A] border-[#FF6D3A]/30"
                                }`}
                              >
                                {agent.status === "optimal" ? "Óptimo" : "Atención"}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span>{agent.interactions.toLocaleString()} interacciones</span>
                              <span>{agent.successRate}% éxito</span>
                              <span>{agent.avgResponseTime} respuesta</span>
                              {agent.trend === "up" ? (
                                <ArrowUp className="h-4 w-4 text-[#00E5B4]" />
                              ) : (
                                <ArrowDown className="h-4 w-4 text-[#FF6D3A]" />
                              )}
                            </div>
                          </div>
                          <Progress value={agent.successRate} className="h-2" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* Recent Activities */}
                <section>
                  <h2 className="text-xl font-bold mb-6">Actividad Reciente de IA</h2>
                  <Card className="bg-gray-900 border-gray-700">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  activity.status === "success"
                                    ? "bg-[#00E5B4]"
                                    : activity.status === "processing"
                                      ? "bg-[#FF6D3A]"
                                      : "bg-gray-500"
                                }`}
                              ></div>
                              <div>
                                <p className="font-medium text-sm">{activity.action}</p>
                                <p className="text-xs text-gray-400">
                                  {activity.agent} • {activity.user}
                                </p>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </>
            )}

            {activeTab === "agents" && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Agentes de IA Interactivos</h2>
                <AIAssistant />
              </section>
            )}

            {activeTab === "performance" && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Análisis de Rendimiento Detallado</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle>Eficiencia Operativa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Automatización de Procesos</span>
                            <span>{aiMetrics.automationLevel}%</span>
                          </div>
                          <Progress value={aiMetrics.automationLevel} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Satisfacción del Usuario</span>
                            <span>{aiMetrics.userSatisfaction}/5.0</span>
                          </div>
                          <Progress value={(aiMetrics.userSatisfaction / 5) * 100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Reducción de Costos</span>
                            <span>${aiMetrics.costSavings.toLocaleString()}</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle>Predicciones y Tendencias</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-[#00E5B4]/20 to-[#0066FF]/20 rounded-lg border border-[#00E5B4]/30">
                          <h4 className="font-medium text-[#00E5B4] mb-2">Predicción Semanal</h4>
                          <p className="text-sm text-gray-300">
                            Se espera un aumento del 18% en interacciones de IA esta semana, principalmente en el agente
                            de recomendaciones.
                          </p>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-[#FF6D3A]/20 to-[#B297FF]/20 rounded-lg border border-[#FF6D3A]/30">
                          <h4 className="font-medium text-[#FF6D3A] mb-2">Optimización Sugerida</h4>
                          <p className="text-sm text-gray-300">
                            El agente de propuestas podría mejorar su tiempo de respuesta optimizando el algoritmo de
                            generación de texto.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

            {activeTab === "security" && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Seguridad y Consideraciones Éticas</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-[#00E5B4]" />
                        <span>Privacidad de Datos</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-sm">Cumplimiento GDPR</span>
                        <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Activo
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-sm">Encriptación de Datos</span>
                        <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          AES-256
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-sm">Auditoría de Accesos</span>
                        <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Continua
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-[#0066FF]" />
                        <span>Transparencia y Equidad</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-sm">Detección de Sesgos</span>
                        <Badge className="bg-[#0066FF]/20 text-[#0066FF] border-[#0066FF]/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Monitoreado
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-sm">Explicabilidad de IA</span>
                        <Badge className="bg-[#0066FF]/20 text-[#0066FF] border-[#0066FF]/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Implementado
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <span className="text-sm">Consentimiento del Usuario</span>
                        <Badge className="bg-[#0066FF]/20 text-[#0066FF] border-[#0066FF]/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Requerido
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-[#0066FF]/20 to-[#00E5B4]/20 border border-[#0066FF]/30 mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-6 w-6 text-[#00E5B4] mt-1" />
                      <div>
                        <h4 className="font-semibold text-[#00E5B4] mb-2">Compromiso Ético</h4>
                        <p className="text-gray-300 text-sm">
                          Nuestros agentes de IA operan bajo estrictos principios éticos, garantizando transparencia,
                          equidad y respeto por la privacidad del usuario. Todos los algoritmos son auditados
                          regularmente para prevenir sesgos y asegurar decisiones justas para todos los usuarios de la
                          plataforma.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
