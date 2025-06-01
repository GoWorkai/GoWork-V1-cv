"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Send,
  Mic,
  Loader2,
  Sparkles,
  Brain,
  X,
  Minimize2,
  Maximize2,
  Paperclip,
  MapPin,
  Star,
  Zap,
} from "lucide-react"
import { geminiService } from "@/lib/gemini"
import { useAuth } from "@/contexts/auth-context"

interface Message {
  id: string
  content: string
  sender: "user" | "gow"
  timestamp: Date
  type: "text" | "suggestion" | "service_recommendation" | "quick_action"
  metadata?: any
}

interface EnhancedGowAssistantProps {
  isMinimized?: boolean
  onToggleMinimize?: () => void
  onClose?: () => void
  context?: "dashboard" | "search" | "booking" | "profile"
}

export function EnhancedGowAssistant({
  isMinimized = false,
  onToggleMinimize,
  onClose,
  context = "dashboard",
}: EnhancedGowAssistantProps) {
  const { user } = useAuth()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: getWelcomeMessage(),
      sender: "gow",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function getWelcomeMessage(): string {
    const hour = new Date().getHours()
    const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches"

    const contextMessages = {
      dashboard: `${greeting}, ${user?.name || "amigo"}! 👋 Soy Gow, tu asistente IA. ¿En qué te puedo ayudar hoy?`,
      search: "¡Hola! Te ayudo a encontrar el servicio perfecto. Dime qué necesitas y yo me encargo del resto 🔍",
      booking: "¡Bacán! Vamos a coordinar tu servicio. Te ayudo con horarios, precios y todo lo que necesites 📅",
      profile: "¡Hola! Veo que quieres mejorar tu perfil. Te doy tips pulentes para atraer más clientes 🌟",
    }

    return contextMessages[context]
  }

  useEffect(() => {
    scrollToBottom()
    generateContextualSuggestions()
  }, [messages, context])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const generateContextualSuggestions = () => {
    const contextSuggestions = {
      dashboard: [
        "¿Qué servicios están disponibles cerca de mí?",
        "Ayúdame a encontrar un plomero urgente",
        "¿Cuáles son los servicios más populares?",
        "Quiero mejorar mi perfil de proveedor",
      ],
      search: [
        "Busco diseñador gráfico bacán",
        "Necesito limpieza de hogar al tiro",
        "¿Hay electricistas disponibles hoy?",
        "Quiero clases de guitarra a domicilio",
      ],
      booking: [
        "¿Cuándo está disponible este proveedor?",
        "¿Cuál es el precio final del servicio?",
        "¿Qué incluye exactamente el servicio?",
        "¿Puedo cambiar la fecha después?",
      ],
      profile: [
        "¿Cómo mejoro mi descripción?",
        "¿Qué fotos debería subir?",
        "¿Cómo fijo mis precios?",
        "¿Cómo consigo más reseñas?",
      ],
    }

    setSuggestions(contextSuggestions[context])
  }

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || message
    if (!textToSend.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    try {
      // Generar respuesta contextual con Gemini
      const response = await geminiService.chatWithGow([
        {
          role: "user",
          parts: [{ text: `Contexto: ${context}. Usuario: ${textToSend}` }],
        },
      ])

      const gowMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "gow",
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, gowMessage])

      // Generar recomendaciones si es apropiado
      if (textToSend.toLowerCase().includes("busco") || textToSend.toLowerCase().includes("necesito")) {
        setTimeout(() => {
          const recommendationMessage: Message = {
            id: (Date.now() + 2).toString(),
            content: "Te encontré algunos servicios que podrían interesarte:",
            sender: "gow",
            timestamp: new Date(),
            type: "service_recommendation",
            metadata: {
              services: [
                {
                  title: "Limpieza profesional",
                  provider: "María González",
                  rating: 4.9,
                  price: "$25.000",
                  distance: "1.2 km",
                },
                {
                  title: "Plomería express",
                  provider: "Carlos Ruiz",
                  rating: 4.8,
                  price: "$35.000",
                  distance: "0.8 km",
                },
              ],
            },
          }
          setMessages((prev) => [...prev, recommendationMessage])
        }, 1000)
      }
    } catch (error) {
      console.error("Error en chat:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Ups, me mandé un condoro técnico. ¿Podrías intentar de nuevo? 😅",
        sender: "gow",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = "es-ES"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => setIsListening(true)
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
        setIsListening(false)
      }
      recognition.onerror = () => setIsListening(false)
      recognition.onend = () => setIsListening(false)

      recognition.start()
    }
  }

  const renderMessage = (msg: Message) => {
    if (msg.type === "service_recommendation" && msg.metadata?.services) {
      return (
        <div className="space-y-3">
          <p className="text-white">{msg.content}</p>
          <div className="space-y-2">
            {msg.metadata.services.map((service: any, index: number) => (
              <Card key={index} className="bg-white/10 border-white/20">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{service.title}</h4>
                      <p className="text-sm text-gray-200">{service.provider}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span className="text-xs text-gray-200">{service.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-gray-300" />
                          <span className="text-xs text-gray-200">{service.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-300">{service.price}</p>
                      <Button size="sm" className="mt-1 bg-white/20 hover:bg-white/30 text-white">
                        Ver más
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    }

    return <p className="text-white whitespace-pre-wrap">{msg.content}</p>
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="bg-gradient-to-br from-purple-600 to-blue-600 border-0 shadow-2xl w-80">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Gow IA</h3>
                  <p className="text-xs text-white/80">{isTyping ? "Pensando..." : `${messages.length} mensajes`}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {onToggleMinimize && (
                  <button
                    onClick={onToggleMinimize}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                )}
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white/80 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-4 z-50 flex">
      <Card className="flex-1 bg-gradient-to-br from-purple-600 via-blue-600 to-green-500 border-0 shadow-2xl flex flex-col max-h-full">
        {/* Header */}
        <CardHeader className="border-b border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white flex items-center space-x-2">
                  <span>Gow IA</span>
                  <Sparkles className="h-4 w-4" />
                </CardTitle>
                <p className="text-sm text-white/80">
                  {isTyping ? "Analizando tu consulta..." : "Tu asistente inteligente de GoWork"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-white/20 text-white border-white/30">
                {context === "dashboard"
                  ? "Dashboard"
                  : context === "search"
                    ? "Búsqueda"
                    : context === "booking"
                      ? "Reserva"
                      : "Perfil"}
              </Badge>
              {onToggleMinimize && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleMinimize}
                  className="text-white/80 hover:text-white hover:bg-white/20"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              )}
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white/80 hover:text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`max-w-[80%] ${msg.sender === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-white/20 backdrop-blur-sm text-white ml-4"
                      : "bg-black/20 backdrop-blur-sm text-white border border-white/20"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {msg.sender === "gow" && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs">
                          G
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1">
                      {renderMessage(msg)}
                      <p className="text-xs text-white/60 mt-2">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-black/20 backdrop-blur-sm text-white border border-white/20 p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs">
                      G
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Gow está pensando...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="px-6 pb-4">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSend(suggestion)}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="relative">
                <Input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Pregúntale a Gow lo que necesites..."
                  disabled={isTyping}
                  className="pr-20 border-white/30 bg-white/10 backdrop-blur-sm focus:border-white/50 focus:ring-white/50 text-white placeholder:text-white/60 min-h-[50px]"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <button
                    onClick={startVoiceRecognition}
                    disabled={isListening || isTyping}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <Mic className={`h-4 w-4 ${isListening ? "text-red-400 animate-pulse" : "text-white/60"}`} />
                  </button>
                  <button className="p-1 hover:bg-white/20 rounded transition-colors">
                    <Paperclip className="h-4 w-4 text-white/60" />
                  </button>
                </div>
              </div>
            </div>
            <Button
              onClick={() => handleSend()}
              disabled={!message.trim() || isTyping}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-6 py-3"
            >
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-xs text-white/60">
              <div className="flex items-center space-x-1">
                <Zap className="h-3 w-3" />
                <span>IA contextual</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="h-3 w-3" />
                <span>Respuestas inteligentes</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-white/60">Potenciado por</span>
              <Sparkles className="h-3 w-3 text-white/80" />
              <span className="text-xs text-white/80 font-medium">Google Gemini</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
