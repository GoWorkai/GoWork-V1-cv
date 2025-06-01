"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, MessageCircle, Star, Brain, Lightbulb, Zap, ArrowRight, Target } from "lucide-react"
import Link from "next/link"
import { geminiAI } from "@/lib/gemini-ai"

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

export function IntelligentSearch() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const generateSearchResults = async (searchQuery: string) => {
    setIsProcessing(true)
    try {
      const result = await geminiAI.generateSearchSuggestions(searchQuery)

      // Convertir las sugerencias al formato esperado
      const formattedSuggestions: SearchSuggestion[] = result.suggestions.map((suggestion) => ({
        ...suggestion,
        icon: getIconForType(suggestion.type),
        link: getLinkForSuggestion(suggestion),
      }))

      // Convertir insights
      const formattedInsights: AIInsight[] = result.insights.map((insight) => ({
        ...insight,
        type: insight.type as "tip" | "recommendation" | "trend" | "optimization",
      }))

      setSuggestions(formattedSuggestions)
      setAiInsights(formattedInsights)
    } catch (error) {
      console.error("Error generating search results:", error)
      // Usar resultados fallback
      setSuggestions(getFallbackSuggestions(searchQuery))
      setAiInsights(getFallbackInsights(searchQuery))
    } finally {
      setIsProcessing(false)
    }
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "service":
        return Star
      case "provider":
        return Target
      case "action":
        return Zap
      case "help":
        return Lightbulb
      default:
        return Brain
    }
  }

  const getLinkForSuggestion = (suggestion: any) => {
    switch (suggestion.type) {
      case "service":
        return "/servicios"
      case "provider":
        return "/map"
      case "action":
        return "/ai-dashboard"
      case "help":
        return "/onboarding"
      default:
        return "/servicios"
    }
  }

  const getFallbackSuggestions = (searchQuery: string): SearchSuggestion[] => {
    return [
      {
        id: "dev-web",
        type: "service",
        title: "Desarrollo Web",
        description: "Encuentra desarrolladores web especializados",
        icon: Brain,
        link: "/servicios?category=desarrollo",
        confidence: 95,
        category: "Servicios",
      },
      {
        id: "design-ui",
        type: "service",
        title: "Diseño UI/UX",
        description: "Diseñadores expertos en experiencia de usuario",
        icon: Star,
        link: "/servicios?category=diseno",
        confidence: 92,
        category: "Servicios",
      },
      {
        id: "ai-help",
        type: "action",
        title: "Asistente de IA",
        description: "Habla con nuestro asistente inteligente",
        icon: Brain,
        link: "/ai-dashboard",
        confidence: 100,
        category: "IA",
      },
    ]
  }

  const getFallbackInsights = (searchQuery: string): AIInsight[] => {
    return [
      {
        id: "general-tip",
        message: "🎯 Usuarios con perfil completo reciben 3x más oportunidades",
        type: "recommendation",
        confidence: 95,
      },
      {
        id: "trending",
        message: "🔥 Tendencia: Servicios de IA y automatización +150% esta semana",
        type: "trend",
        confidence: 91,
      },
    ]
  }

  useEffect(() => {
    const handleSearch = async () => {
      if (isOpen) {
        if (query.trim()) {
          await generateSearchResults(query)
        } else {
          // Mostrar sugerencias por defecto
          setSuggestions(getFallbackSuggestions(""))
          setAiInsights(getFallbackInsights(""))
        }
      }
    }

    const debounceTimer = setTimeout(handleSearch, 500)
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
      Servicios: "#0066FF",
      IA: "#00E5B4",
      Ayuda: "#FF6D3A",
      Optimización: "#B297FF",
      Comunicación: "#00E5B4",
      Ubicación: "#FF6D3A",
      Tecnología: "#0066FF",
      Diseño: "#B297FF",
      Marketing: "#FF6D3A",
    }
    return colors[category as keyof typeof colors] || "#0066FF"
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
          placeholder="Busca servicios, proveedores o pregunta lo que necesites..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-12 py-3 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#00E5B4] focus:ring-[#00E5B4] rounded-xl"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-[#00E5B4] animate-pulse" />
            <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30 text-xs">Gemini</Badge>
          </div>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full mt-2 w-full bg-gray-900 border-gray-700 shadow-2xl z-50 max-h-96 overflow-hidden">
          <CardContent className="p-0">
            {isProcessing ? (
              <div className="p-6 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#00E5B4] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#00E5B4] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#00E5B4] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-300">Gemini AI analizando...</span>
                </div>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {/* AI Insights */}
                {aiInsights.length > 0 && (
                  <div className="p-4 border-b border-gray-700">
                    <h4 className="text-sm font-medium text-[#00E5B4] mb-3 flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      Insights de Gemini AI
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
                                  <h4 className="text-sm font-medium text-white group-hover:text-[#00E5B4] transition-colors">
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
                                <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-[#00E5B4] transition-colors" />
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-400">
                      <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">No se encontraron resultados</p>
                      <p className="text-xs mt-1">Intenta con otros términos de búsqueda</p>
                    </div>
                  )}
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
                        Chat Gemini
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
