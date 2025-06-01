"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Sparkles, Send, Mic, Loader2, Bot, MapPin, DollarSign, Clock, Star } from "lucide-react"
import { geminiService, type SearchResult } from "@/lib/gemini"

interface AISearchWidgetProps {
  onClose: () => void
}

export function AISearchWidget({ onClose }: AISearchWidgetProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [suggestions, setSuggestions] = useState([
    "Necesito un plomero para reparar una tubería",
    "Busco diseñador gráfico para logo",
    "Quiero clases de guitarra a domicilio",
    "Necesito ayuda con mudanza",
  ])
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      const result = await geminiService.searchServices(query)
      setSearchResult(result)
    } catch (err) {
      setError("Error al procesar la búsqueda. Intenta nuevamente.")
      console.error("Error en búsqueda:", err)
    } finally {
      setIsSearching(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80">
      <Card className="bg-white border-[#007bff] shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6610f2] to-[#007bff] rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#333333]">Gow IA</h3>
                <p className="text-xs text-[#333333]/60">Búsqueda inteligente</p>
              </div>
            </div>
            <button onClick={onClose} className="text-[#333333]/60 hover:text-[#333333]">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                placeholder="¿Qué servicio necesitas?"
                className="pr-20 border-[#D3D3D3] focus:border-[#007bff] focus:ring-[#007bff]"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                <button className="p-1 hover:bg-[#D3D3D3]/20 rounded">
                  <Mic className="h-4 w-4 text-[#333333]/60" />
                </button>
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !query.trim()}
                  className="p-1 bg-[#007bff] text-white rounded hover:bg-[#0056b3] disabled:opacity-50"
                >
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Resultados de búsqueda */}
            {searchResult && (
              <Card className="bg-gradient-to-r from-[#6610f2]/5 to-[#007bff]/5 border-[#6610f2]/20">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="h-4 w-4 text-[#6610f2]" />
                    <span className="font-medium text-[#6610f2] text-sm">Resultados de Gow IA</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Bot className="h-4 w-4 text-[#007bff]" />
                      <span className="text-[#333333]">
                        Encontré <strong>{searchResult.professionals}</strong> profesionales disponibles
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign className="h-4 w-4 text-[#FFA500]" />
                      <span className="text-[#333333]">
                        Precios: {formatPrice(searchResult.priceRange.min)} - {formatPrice(searchResult.priceRange.max)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-[#007bff]" />
                      <span className="text-[#333333]">{searchResult.availability}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-[#007bff]" />
                      <span className="text-[#333333]">{searchResult.location}</span>
                    </div>
                  </div>

                  {searchResult.recommendations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#D3D3D3]/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <Star className="h-4 w-4 text-[#FFA500]" />
                        <span className="text-xs font-medium text-[#333333]">Recomendaciones:</span>
                      </div>
                      <div className="space-y-1">
                        {searchResult.recommendations.map((rec, index) => (
                          <p key={index} className="text-xs text-[#333333]/80 bg-white/50 p-2 rounded">
                            • {rec}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-[#FFA500] hover:bg-[#FF8C00] text-white text-xs py-2 px-3 rounded-lg transition-colors">
                      Ver Proveedores
                    </button>
                    <button className="flex-1 border border-[#007bff] text-[#007bff] hover:bg-[#007bff]/10 text-xs py-2 px-3 rounded-lg transition-colors">
                      Refinar
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">{error}</div>
            )}

            {/* Sugerencias */}
            {!searchResult && !error && (
              <div className="space-y-2">
                <p className="text-xs text-[#333333]/60 font-medium">Sugerencias populares:</p>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(suggestion)}
                    className="w-full text-left text-xs p-2 bg-[#D3D3D3]/20 hover:bg-[#007bff]/10 rounded-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2 border-t border-[#D3D3D3]">
              <Sparkles className="h-4 w-4 text-[#6610f2]" />
              <span className="text-xs text-[#333333]/60">Potenciado por Google Gemini</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
