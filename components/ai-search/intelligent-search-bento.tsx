"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Sparkles, Mic, Send } from "lucide-react"

export function IntelligentSearchBento() {
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim()) {
        setIsProcessing(true)
        // Simulamos una llamada a la API de Gemini
        setTimeout(() => {
          const demoSuggestions = [
            "Desarrollo web en Santiago",
            "Diseñadores UX/UI disponibles",
            "Servicios de marketing digital",
            "Asistentes virtuales freelance",
          ]
          setSuggestions(demoSuggestions)
          setIsProcessing(false)
        }, 800)
      } else {
        setSuggestions([])
      }
    }

    const debounceTimer = setTimeout(handleSearch, 500)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la consulta a Gemini
    console.log("Enviando consulta:", query)
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3">
          <Sparkles className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Gow IA</h3>
          <p className="text-sm text-white/70">Asistente Inteligente de GoWork</p>
        </div>
      </div>

      <p className="text-white/80 text-sm mb-4">
        Conversa conmigo para encontrar servicios, analizar precios, optimizar tu perfil y descubrir oportunidades
      </p>

      <form onSubmit={handleSubmit} className="relative mb-4">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué servicio necesitas? Pregúntame cualquier cosa sobre GoWork..."
          className="search-input"
        />
        <Search className="search-icon" size={18} />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button type="button" className="p-2 text-white/70 hover:text-white">
            <Mic size={18} />
          </button>
          <button type="submit" className="bg-primary p-2 rounded-full text-secondary hover:bg-primary-dark">
            <Send size={18} />
          </button>
        </div>
      </form>

      {isProcessing && (
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((suggestion, index) => (
            <button key={index} className="bg-white/10 hover:bg-white/20 text-white text-xs py-1 px-3 rounded-full">
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-3 mt-auto">
        <div className="action-button">
          <div className="action-icon">
            <Search size={18} className="text-secondary" />
          </div>
          <span className="text-xs text-white">Buscar servicios</span>
        </div>
        <div className="action-button">
          <div className="action-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-secondary"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span className="text-xs text-white">Optimizar perfil</span>
        </div>
        <div className="action-button">
          <div className="action-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-secondary"
            >
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <span className="text-xs text-white">Analizar precios</span>
        </div>
        <div className="action-button">
          <div className="action-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-secondary"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <span className="text-xs text-white">Ideas de negocio</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-3 w-3 text-primary mr-2" />
          <span className="text-xs text-white/50">Potenciado por Google Gemini</span>
        </div>
      </div>
    </div>
  )
}
