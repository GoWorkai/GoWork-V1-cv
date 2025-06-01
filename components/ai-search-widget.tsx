"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Sparkles, Send, Mic, Loader2, Bot } from "lucide-react"

interface AISearchWidgetProps {
  onClose: () => void
}

export function AISearchWidget({ onClose }: AISearchWidgetProps) {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState([
    "Necesito un plomero para reparar una tubería",
    "Busco diseñador gráfico para logo",
    "Quiero clases de guitarra a domicilio",
    "Necesito ayuda con mudanza",
  ])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    // Simulación de búsqueda con IA
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSearching(false)
    // Aquí iría la lógica real de búsqueda
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
                <p className="text-xs text-[#333333]/60">Tu asistente inteligente</p>
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
                placeholder="¿En qué puedo ayudarte?"
                className="pr-20 border-[#D3D3D3] focus:border-[#007bff] focus:ring-[#007bff]"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                <button className="p-1 hover:bg-[#D3D3D3]/20 rounded">
                  <Mic className="h-4 w-4 text-[#333333]/60" />
                </button>
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="p-1 bg-[#007bff] text-white rounded hover:bg-[#0056b3] disabled:opacity-50"
                >
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </div>

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

            <div className="flex items-center space-x-2 pt-2 border-t border-[#D3D3D3]">
              <Sparkles className="h-4 w-4 text-[#6610f2]" />
              <span className="text-xs text-[#333333]/60">Potenciado por Gemini AI</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
