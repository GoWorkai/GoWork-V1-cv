"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Sparkles,
  MessageCircle,
  Star,
  Brain,
  Lightbulb,
  ArrowRight,
  Target,
  Loader2,
  BrushIcon as Broom,
  Wrench,
  Code,
  GraduationCap,
  Heart,
  PawPrint,
  Truck,
  Music,
  Briefcase,
} from "lucide-react"
import Link from "next/link"

interface SearchSuggestion {
  id: string
  type: "service" | "provider" | "action" | "help" | "ai_insight"
  title: string
  description: string
  icon: any
  link?: string
  confidence: number
  category: string
}

interface AIInsight {
  id: string
  message: string
  type: "tip" | "recommendation" | "trend" | "optimization"
  confidence: number
}

interface SearchAnalysis {
  categoria: string
  subcategoria: string
  urgencia: "alta" | "media" | "baja"
  resumen: string
  sugerencias_IA: string[]
  ubicacion_sugerida?: string
  precio_estimado?: {
    min: number
    max: number
    moneda: string
  }
}

export function IntelligentSearch() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [searchAnalysis, setSearchAnalysis] = useState<SearchAnalysis | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const generateSearchResults = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsProcessing(true)
    try {
      // Llamar al nuevo endpoint de Gow
      const response = await fetch("/api/ai/gow-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "demo-user", // En producción, obtener del contexto de auth
          role: "client",
          message: searchQuery,
          context: {
            type: "search",
            location: "Santiago, Chile",
            currentPage: "home",
          },
        }),
      })

      if (!response.ok) throw new Error("Error en la búsqueda")

      const result = await response.json()

      if (result.success && result.data) {
        const analysis = result.data as SearchAnalysis
        setSearchAnalysis(analysis)

        // Convertir análisis a sugerencias visuales
        const formattedSuggestions: SearchSuggestion[] = [
          {
            id: "main-category",
            type: "service",
            title: analysis.categoria,
            description: analysis.resumen,
            icon: getIconForCategory(analysis.categoria),
            link: `/servicios?category=${analysis.categoria.toLowerCase()}`,
            confidence: 95,
            category: "Servicio Principal",
          },
          {
            id: "subcategory",
            type: "service",
            title: analysis.subcategoria,
            description: `Especialistas en ${analysis.subcategoria.toLowerCase()}`,
            icon: Target,
            link: `/servicios?subcategory=${analysis.subcategoria.toLowerCase()}`,
            confidence: 90,
            category: "Especialización",
          },
          {
            id: "location",
            type: "provider",
            title: `Proveedores en ${analysis.ubicacion_sugerida}`,
            description: "Profesionales cerca de ti",
            icon: Target,
            link: `/map?location=${analysis.ubicacion_sugerida}`,
            confidence: 88,
            category: "Ubicación",
          },
        ]

        setSuggestions(formattedSuggestions)

        // Convertir sugerencias de IA a insights
        const insights: AIInsight[] = analysis.sugerencias_IA.map((sugerencia, index) => ({
          id: `insight-${index}`,
          message: sugerencia,
          type: index === 0 ? "recommendation" : "tip",
          confidence: 90 - index * 5,
        }))

        // Agregar insight de precio si está disponible
        if (analysis.precio_estimado) {
          insights.push({
            id: "price-insight",
            message: `💰 Precio estimado: $${analysis.precio_estimado.min.toLocaleString()} - $${analysis.precio_estimado.max.toLocaleString()} ${analysis.precio_estimado.moneda}`,
            type: "recommendation",
            confidence: 85,
          })
        }

        // Agregar insight de urgencia
        const urgencyEmoji = analysis.urgencia === "alta" ? "🚨" : analysis.urgencia === "media" ? "⏰" : "📅"
        insights.push({
          id: "urgency-insight",
          message: `${urgencyEmoji} Urgencia ${analysis.urgencia}: ${getUrgencyMessage(analysis.urgencia)}`,
          type: "trend",
          confidence: 80,
        })

        setAiInsights(insights)
      }
    } catch (error) {
      console.error("Error generating search results:", error)
      // Usar resultados fallback
      setSuggestions(getFallbackSuggestions(query))
      setAiInsights(getFallbackInsights())
    } finally {
      setIsProcessing(false)
    }
  }

  const getIconForCategory = (category: string) => {
    const iconMap: { [key: string]: any } = {
      "Limpieza y Hogar": Broom,
      "Reparaciones y Mantención": Wrench,
      "Tecnología y Desarrollo": Code,
      "Diseño y Creatividad": Lightbulb,
      "Educación y Tutorías": GraduationCap,
      "Cuidado Personal y Salud": Heart,
      Mascotas: PawPrint,
      "Transporte y Delivery": Truck,
      "Eventos y Entretenimiento": Music,
      "Consultoría y Negocios": Briefcase,
    }
    return iconMap[category] || Star
  }

  const getUrgencyMessage = (urgencia: string) => {
    switch (urgencia) {
      case "alta":
        return "Respuesta rápida recomendada"
      case "media":
        return "Planifica con algunos días de anticipación"
      case "baja":
        return "Puedes tomarte tiempo para elegir"
      default:
        return "Evalúa según tus necesidades"
    }
  }

  const getFallbackSuggestions = (searchQuery: string): SearchSuggestion[] => {
    return [
      {
        id: "general-search",
        type: "service",
        title: "Búsqueda General",
        description: `Resultados para: ${searchQuery}`,
        icon: Search,
        link: `/servicios?q=${encodeURIComponent(searchQuery)}`,
        confidence: 75,
        category: "General",
      },
    ]
  }

  const getFallbackInsights = (): AIInsight[] => {
    return [
      {
        id: "general-tip",
        message: "💡 Tip: Sé específico en tu búsqueda para mejores resultados",
        type: "tip",
        confidence: 80,
      },
    ]
  }

  useEffect(() => {
    const handleSearch = async () => {
      if (isOpen && query.trim()) {
        await generateSearchResults(query)
      } else if (!query.trim()) {
        setSuggestions([])
        setAiInsights([])
        setSearchAnalysis(null)
      }
    }

    const debounceTimer = setTimeout(handleSearch, 800)
    return () => clearTimeout(debounceTimer)
  }, [query, isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getCategoryColor = (category: string) => {
    const colors = {
      "Servicio Principal": "#0A84FF",
      Especialización: "#3EDDD9",
      Ubicación: "#FF6E40",
      General: "#6B7280",
    }
    return colors[category as keyof typeof colors] || "#0A84FF"
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "tip":
        return "💡"
      case "recommendation":
        return "🎯"
      case "trend":
        return "📈"
      case "optimization":
        return "⚡"
      default:
        return "🤖"
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="¿Qué servicio necesitas? Pregúntame cualquier cosa..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-12 py-3 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#3EDDD9] focus:ring-[#3EDDD9] rounded-xl"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <div className="flex items-center space-x-2">
            {isProcessing ? (
              <Loader2 className="h-4 w-4 text-[#3EDDD9] animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 text-[#3EDDD9] animate-pulse" />
            )}
            <Badge className="bg-[#3EDDD9]/20 text-[#3EDDD9] border-[#3EDDD9]/30 text-xs">Gow IA</Badge>
          </div>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || suggestions.length > 0) && (
        <Card className="absolute top-full mt-2 w-full bg-gray-900 border-gray-700 shadow-2xl z-50 max-h-96 overflow-hidden">
          <CardContent className="p-0">
            {isProcessing ? (
              <div className="p-6 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <Loader2 className="h-5 w-5 text-[#3EDDD9] animate-spin" />
                  <span className="text-sm text-gray-300">Gow analizando tu solicitud...</span>
                </div>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {/* Análisis principal */}
                {searchAnalysis && (
                  <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-[#0A84FF]/10 to-[#3EDDD9]/10">
                    <div className="flex items-center space-x-3 mb-3">
                      <Brain className="h-5 w-5 text-[#3EDDD9]" />
                      <h4 className="text-sm font-medium text-[#3EDDD9]">Análisis de Gow</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400">Categoría:</span>
                        <p className="text-white font-medium">{searchAnalysis.categoria}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Urgencia:</span>
                        <p className="text-white font-medium capitalize">{searchAnalysis.urgencia}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Insights */}
                {aiInsights.length > 0 && (
                  <div className="p-4 border-b border-gray-700">
                    <h4 className="text-sm font-medium text-[#3EDDD9] mb-3 flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      Insights de Gow
                    </h4>
                    <div className="space-y-2">
                      {aiInsights.map((insight) => (
                        <div key={insight.id} className="flex items-start space-x-3 p-2 rounded-lg bg-gray-800/50">
                          <span className="text-lg">{getInsightIcon(insight.type)}</span>
                          <div className="flex-1">
                            <p className="text-sm text-gray-300">{insight.message}</p>
                            <Badge className="mt-1 text-xs bg-gray-700 text-gray-400">
                              {insight.confidence}% confianza
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Suggestions */}
                <div className="p-2">
                  {suggestions.length > 0 ? (
                    <div className="space-y-1">
                      {suggestions.map((suggestion) => {
                        const IconComponent = suggestion.icon
                        const categoryColor = getCategoryColor(suggestion.category)

                        return (
                          <Link key={suggestion.id} href={suggestion.link || "#"}>
                            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${categoryColor}20` }}
                              >
                                <IconComponent className="h-4 w-4" style={{ color: categoryColor }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <h4 className="text-sm font-medium text-white group-hover:text-[#3EDDD9] transition-colors">
                                    {suggestion.title}
                                  </h4>
                                  <Badge
                                    className="text-xs border"
                                    style={{
                                      backgroundColor: `${categoryColor}20`,
                                      color: categoryColor,
                                      borderColor: `${categoryColor}30`,
                                    }}
                                  >
                                    {suggestion.category}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-400 truncate">{suggestion.description}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className="text-xs bg-gray-700 text-gray-400">{suggestion.confidence}%</Badge>
                                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-[#3EDDD9] transition-colors" />
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  ) : query.trim() && !isProcessing ? (
                    <div className="p-6 text-center text-gray-400">
                      <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No se encontraron resultados</p>
                      <p className="text-xs mt-1">Intenta con otros términos de búsqueda</p>
                    </div>
                  ) : null}
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t border-gray-700 bg-gray-800/30">
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Acciones rápidas</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/ai-dashboard">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:bg-gray-700"
                      >
                        <Brain className="h-3 w-3 mr-2" />
                        Centro de IA
                      </Button>
                    </Link>
                    <Link href="/chat">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full justify-start text-gray-300 hover:bg-gray-700"
                      >
                        <MessageCircle className="h-3 w-3 mr-2" />
                        Chat con Gow
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default IntelligentSearch
