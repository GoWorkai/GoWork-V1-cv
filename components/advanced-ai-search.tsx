"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Send,
  Mic,
  Loader2,
  Sparkles,
  Search,
  Zap,
  Brain,
  Target,
  Users,
  MapPin,
  DollarSign,
  Clock,
  Lightbulb,
  MessageCircle,
  X,
} from "lucide-react"
import { geminiService, type SearchResult } from "@/lib/gemini"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  searchResult?: SearchResult
  suggestions?: string[]
}

export function AdvancedAISearch() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "¡Hola! Soy Gow, tu asistente de IA en GoWork. Puedo ayudarte a encontrar servicios, analizar precios, conectar con profesionales y mucho más. ¿Qué necesitas hoy? 🚀",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "Buscar plomero cerca de mí",
        "¿Cuánto cuesta un diseño de logo?",
        "Necesito clases de guitarra",
        "Quiero ofrecer mis servicios de programación",
      ],
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detectar scroll para minimizar el chat
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > 200 && !isMinimized && !isExpanded) {
        setIsMinimized(true)
      } else if (scrollY <= 200 && isMinimized) {
        setIsMinimized(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMinimized, isExpanded])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const handleSend = async () => {
    if (!message.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    try {
      // Determinar si es una búsqueda de servicios o chat general
      const isServiceSearch =
        message.toLowerCase().includes("busco") ||
        message.toLowerCase().includes("necesito") ||
        message.toLowerCase().includes("quiero") ||
        message.toLowerCase().includes("precio") ||
        message.toLowerCase().includes("cuánto")

      let aiResponse = ""
      let searchResult: SearchResult | undefined
      let suggestions: string[] = []

      if (isServiceSearch) {
        // Búsqueda de servicios con resultados estructurados
        searchResult = await geminiService.searchServices(message)
        aiResponse = `Bacán hermano, encontré ${searchResult.professionals} profesionales para tu consulta. ¿Cachai cuál te tinca más?`
        suggestions = [
          "Ver perfiles de proveedores",
          "Comparar precios",
          "Solicitar cotizaciones",
          "Buscar en otra área",
        ]
      } else {
        // Chat conversacional general con personalidad chilena
        const chatHistory = messages
          .filter((msg) => msg.sender === "user" || msg.sender === "ai")
          .map((msg) => ({
            role: msg.sender === "user" ? "user" : ("model" as const),
            parts: [{ text: msg.content }],
          }))

        chatHistory.push({
          role: "user",
          parts: [{ text: message }],
        })

        aiResponse = await geminiService.chatWithGow(chatHistory)

        // Generar sugerencias contextuales
        if (message.toLowerCase().includes("perfil")) {
          suggestions = ["Optimizar mi perfil", "Añadir certificaciones", "Mejorar descripción", "Subir portfolio"]
        } else if (message.toLowerCase().includes("precio")) {
          suggestions = ["Calcular precios competitivos", "Ver tarifas del mercado", "Estrategias de pricing"]
        } else {
          suggestions = ["Explorar servicios", "Crear mi perfil", "Ver oportunidades", "Contactar soporte"]
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        searchResult,
        suggestions,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error en chat:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Ups, parece que me mandé un condoro. Pero tranqui, intentémoslo de nuevo po.",
        sender: "ai",
        timestamp: new Date(),
        suggestions: [
          "Intentar nuevamente",
          "Usar una consulta más simple",
          "Probar otra categoría",
          "Contactar soporte",
        ],
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
    handleSend()
  }

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = "es-ES"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Chat minimizado (botón flotante)
  if (isMinimized && !isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-500 ease-out">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-br from-[#6610f2] to-[#007bff] text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 ease-out group"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </button>
        <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Gow IA - ¡Pregúntame algo!
        </div>
      </div>
    )
  }

  // Chat normal (no expandido)
  if (!isExpanded) {
    return (
      <div
        className={`w-full max-w-4xl mx-auto transition-all duration-500 ease-out ${isMinimized ? "fixed bottom-6 right-6 z-50 max-w-sm" : ""}`}
      >
        <Card className="bg-gray-800/90 backdrop-blur-xl border border-gray-700 shadow-2xl transition-all duration-500 ease-out transform hover:scale-[1.01]">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6610f2] to-[#007bff] rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white">Gow IA</h3>
                  <p className="text-xs text-gray-300">Asistente Inteligente de GoWork</p>
                </div>
              </div>
              <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                Conversa conmigo para encontrar servicios, analizar precios, optimizar tu perfil y descubrir
                oportunidades
              </p>
            </div>

            <div className="relative mb-4">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (setIsExpanded(true), handleSend())}
                onFocus={() => setIsExpanded(true)}
                placeholder="¿Qué servicio necesitas? Pregúntame cualquier cosa sobre GoWork..."
                className="text-base py-4 pl-4 pr-20 border-2 border-gray-600 rounded-xl bg-gray-700/50 backdrop-blur-sm focus:border-[#007bff] focus:ring-[#007bff] placeholder:text-gray-400 text-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <button
                  onClick={startVoiceRecognition}
                  disabled={isListening}
                  className="p-1.5 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <Mic className={`h-4 w-4 ${isListening ? "text-red-400 animate-pulse" : "text-gray-400"}`} />
                </button>
                <button
                  onClick={() => {
                    setIsExpanded(true)
                    handleSend()
                  }}
                  disabled={!message.trim()}
                  className="bg-[#007bff] text-white p-1.5 rounded-lg hover:bg-[#0056b3] transition-colors disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { icon: Search, text: "Buscar servicios", color: "from-blue-500 to-blue-600" },
                { icon: Target, text: "Optimizar perfil", color: "from-purple-500 to-purple-600" },
                { icon: DollarSign, text: "Analizar precios", color: "from-green-500 to-green-600" },
                { icon: Lightbulb, text: "Ideas de negocio", color: "from-orange-500 to-orange-600" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setMessage(item.text)
                    setIsExpanded(true)
                  }}
                  className="flex flex-col items-center p-3 bg-gray-700/50 backdrop-blur-sm rounded-lg hover:bg-gray-600/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-1 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs text-gray-300 text-center">{item.text}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center mt-4 space-x-2">
              <Sparkles className="h-3 w-3 text-[#6610f2]" />
              <span className="text-xs text-gray-400">Potenciado por Google Gemini + Base de Conocimiento GoWork</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Chat expandido
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-5xl mx-auto mt-8 mb-8 h-[calc(100vh-4rem)] animate-in slide-in-from-top-4 duration-500 ease-out">
        <Card className="bg-gray-800/95 backdrop-blur-xl border border-gray-700 shadow-2xl h-full flex flex-col">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Header del Chat Expandido */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-[#6610f2]/20 to-[#007bff]/20">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#6610f2] to-[#007bff] rounded-lg flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Gow IA - Conversación Avanzada</h3>
                  <p className="text-xs text-gray-300">
                    {isTyping ? "Analizando tu consulta..." : "Listo para ayudarte"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-all duration-200 ease-out text-gray-400 hover:text-white transform hover:scale-105"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Área de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300 ease-out`}
                >
                  <div className={`max-w-[80%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                    <div
                      className={`p-3 rounded-xl text-sm ${
                        msg.sender === "user"
                          ? "bg-[#007bff] text-white ml-4"
                          : "bg-gray-700/80 backdrop-blur-sm text-white border border-gray-600"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {msg.sender === "ai" && <Sparkles className="h-3 w-3 text-[#6610f2] mt-0.5 flex-shrink-0" />}
                        <div className="flex-1">
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Resultados de Búsqueda */}
                    {msg.searchResult && (
                      <Card className="mt-2 bg-gray-700/60 backdrop-blur-sm border border-gray-600">
                        <CardContent className="p-3">
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-xs">
                                <Users className="h-3 w-3 text-[#007bff]" />
                                <span className="text-white">
                                  <strong>{msg.searchResult.professionals}</strong> profesionales
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs">
                                <DollarSign className="h-3 w-3 text-[#FFA500]" />
                                <span className="text-white">
                                  {formatPrice(msg.searchResult.priceRange.min)} -{" "}
                                  {formatPrice(msg.searchResult.priceRange.max)}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 text-xs">
                                <Clock className="h-3 w-3 text-[#007bff]" />
                                <span className="text-white">{msg.searchResult.availability}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs">
                                <MapPin className="h-3 w-3 text-[#007bff]" />
                                <span className="text-white">{msg.searchResult.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="bg-[#FFA500] hover:bg-[#FF8C00] text-white text-xs h-7">
                              Ver Proveedores
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-500 text-white hover:bg-gray-600 text-xs h-7"
                            >
                              Solicitar Cotización
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Sugerencias */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-400">Sugerencias:</p>
                        <div className="flex flex-wrap gap-1">
                          {msg.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors text-white border border-gray-600"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700/80 backdrop-blur-sm text-white border border-gray-600 p-3 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-3 w-3 animate-spin text-[#6610f2]" />
                      <span className="text-xs">Gow está analizando tu consulta...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de Mensaje */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Continúa la conversación con Gow..."
                    disabled={isTyping}
                    className="pr-10 border-gray-600 bg-gray-700/50 backdrop-blur-sm focus:border-[#007bff] focus:ring-[#007bff] text-white placeholder:text-gray-400 text-sm"
                  />
                  <button
                    onClick={startVoiceRecognition}
                    disabled={isListening || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-600 rounded transition-colors"
                  >
                    <Mic className={`h-3 w-3 ${isListening ? "text-red-400 animate-pulse" : "text-gray-400"}`} />
                  </button>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || isTyping}
                  className="bg-[#007bff] hover:bg-[#0056b3] text-white px-4 text-sm"
                >
                  {isTyping ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                </Button>
              </div>

              <div className="flex items-center justify-center mt-2 space-x-2">
                <Zap className="h-3 w-3 text-[#6610f2]" />
                <span className="text-xs text-gray-400">
                  IA Avanzada con Base de Conocimiento GoWork • Respuestas en tiempo real
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
