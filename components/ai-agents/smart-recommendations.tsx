"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, TrendingUp, Star, Brain, Zap, CheckCircle, ArrowRight } from "lucide-react"

interface SmartRecommendation {
  id: string
  type: "project" | "skill" | "client" | "optimization"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
  category: string
  data: any
}

export function SmartRecommendations() {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga de recomendaciones de IA
    setTimeout(() => {
      setRecommendations([
        {
          id: "1",
          type: "project",
          title: "Proyecto de E-commerce Perfecto para Ti",
          description:
            "Basándome en tu experiencia en React y tu historial de proyectos similares, este proyecto tiene 94% de probabilidad de éxito.",
          confidence: 94,
          impact: "high",
          category: "Desarrollo Web",
          data: {
            client: "TechStart Solutions",
            budget: "$3,500",
            duration: "6 semanas",
            skills: ["React", "Node.js", "MongoDB"],
            location: "Remoto",
          },
        },
        {
          id: "2",
          type: "skill",
          title: "Aprende TypeScript para Aumentar tus Ingresos",
          description: "Los freelancers con TypeScript ganan 35% más. Tu perfil actual es ideal para esta transición.",
          confidence: 87,
          impact: "high",
          category: "Desarrollo de Habilidades",
          data: {
            currentSkills: ["JavaScript", "React"],
            potentialIncrease: "35%",
            timeToLearn: "4-6 semanas",
            demandGrowth: "+45%",
          },
        },
        {
          id: "3",
          type: "optimization",
          title: "Optimiza tu Perfil para Mejor Visibilidad",
          description:
            "Agregando estas palabras clave específicas, tu perfil aparecerá 60% más en búsquedas relevantes.",
          confidence: 78,
          impact: "medium",
          category: "Optimización de Perfil",
          data: {
            suggestedKeywords: ["Full-stack", "API REST", "Responsive Design"],
            visibilityIncrease: "60%",
            estimatedNewViews: "+120/mes",
          },
        },
        {
          id: "4",
          type: "client",
          title: "Cliente Recurrente Potencial Identificado",
          description:
            "TechCorp ha contratado servicios similares 3 veces este mes. Alta probabilidad de necesitar tus servicios.",
          confidence: 82,
          impact: "high",
          category: "Desarrollo de Clientes",
          data: {
            clientName: "TechCorp Industries",
            previousProjects: 3,
            avgBudget: "$2,800",
            preferredSkills: ["React", "Python"],
          },
        },
      ])
      setIsLoading(false)
    }, 1500)
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-[#00E5B4] bg-[#00E5B4]/20 border-[#00E5B4]/30"
      case "medium":
        return "text-[#FF6D3A] bg-[#FF6D3A]/20 border-[#FF6D3A]/30"
      case "low":
        return "text-[#B297FF] bg-[#B297FF]/20 border-[#B297FF]/30"
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Target className="h-5 w-5" />
      case "skill":
        return <TrendingUp className="h-5 w-5" />
      case "client":
        return <Star className="h-5 w-5" />
      case "optimization":
        return <Zap className="h-5 w-5" />
      default:
        return <Brain className="h-5 w-5" />
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-[#00E5B4]" />
            <span>Recomendaciones Inteligentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <Brain className="h-6 w-6 text-[#00E5B4]" />
          <span>Recomendaciones Inteligentes</span>
        </h2>
        <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">IA Activa</Badge>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-[#00E5B4]/20 rounded-full flex items-center justify-center">
                    {getTypeIcon(rec.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{rec.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{rec.description}</p>
                    <div className="flex items-center space-x-3">
                      <Badge className="text-xs bg-gray-800 text-gray-300">{rec.category}</Badge>
                      <Badge className={`text-xs ${getImpactColor(rec.impact)}`}>
                        Impacto {rec.impact === "high" ? "Alto" : rec.impact === "medium" ? "Medio" : "Bajo"}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Brain className="h-3 w-3 text-[#00E5B4]" />
                        <span className="text-xs text-[#00E5B4]">{rec.confidence}% confianza</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Datos específicos según el tipo */}
              {rec.type === "project" && (
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-3 text-[#00E5B4]">Detalles del Proyecto</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Cliente</p>
                      <p className="font-medium">{rec.data.client}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Presupuesto</p>
                      <p className="font-medium text-[#00E5B4]">{rec.data.budget}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Duración</p>
                      <p className="font-medium">{rec.data.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Modalidad</p>
                      <p className="font-medium">{rec.data.location}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-400 text-xs mb-2">Habilidades requeridas:</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.data.skills.map((skill: string, index: number) => (
                        <Badge key={index} className="text-xs bg-[#0066FF]/20 text-[#0066FF] border-[#0066FF]/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {rec.type === "skill" && (
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-3 text-[#00E5B4]">Análisis de Habilidad</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Aumento Salarial</p>
                      <p className="font-medium text-[#00E5B4]">{rec.data.potentialIncrease}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Tiempo de Aprendizaje</p>
                      <p className="font-medium">{rec.data.timeToLearn}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Crecimiento de Demanda</p>
                      <p className="font-medium text-[#FF6D3A]">{rec.data.demandGrowth}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Compatibilidad</p>
                      <p className="font-medium">Alta</p>
                    </div>
                  </div>
                </div>
              )}

              {rec.type === "optimization" && (
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-3 text-[#00E5B4]">Optimizaciones Sugeridas</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Palabras clave recomendadas:</p>
                      <div className="flex flex-wrap gap-2">
                        {rec.data.suggestedKeywords.map((keyword: string, index: number) => (
                          <Badge key={index} className="text-xs bg-[#FF6D3A]/20 text-[#FF6D3A] border-[#FF6D3A]/30">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Aumento de Visibilidad</p>
                        <p className="font-medium text-[#00E5B4]">{rec.data.visibilityIncrease}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Nuevas Visualizaciones</p>
                        <p className="font-medium">{rec.data.estimatedNewViews}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {rec.type === "client" && (
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-medium mb-3 text-[#00E5B4]">Información del Cliente</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Empresa</p>
                      <p className="font-medium">{rec.data.clientName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Proyectos Recientes</p>
                      <p className="font-medium">{rec.data.previousProjects}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Presupuesto Promedio</p>
                      <p className="font-medium text-[#00E5B4]">{rec.data.avgBudget}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-400 text-xs mb-2">Habilidades preferidas:</p>
                    <div className="flex flex-wrap gap-2">
                      {rec.data.preferredSkills.map((skill: string, index: number) => (
                        <Badge key={index} className="text-xs bg-[#B297FF]/20 text-[#B297FF] border-[#B297FF]/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aplicar Recomendación
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  Ver Detalles
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SmartRecommendations
