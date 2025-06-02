"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Bot, X, Send, Brain, Loader2, Lightbulb, Zap, Maximize2, Minimize2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface GowMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
  actions?: Array<{
    id: string
    label: string
    type: "link" | "action"
    url?: string
  }>
}

export function GowChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<GowMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userId] = useState(`user-${Math.random().toString(36).substring(2, 9)}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Inicializar con mensaje de bienvenida
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "¡Hola! Soy Gow, tu asistente personal en GoWork 👋 Puedo ayudarte a encontrar servicios, optimizar tu perfil o resolver cualquier duda. ¿En qué te puedo ayudar hoy?",
          timestamp: new Date(),
          suggestions: ["¿Cómo funciona GoWork?", "Necesito un servicio", "Quiero ofrecer mis servicios"],
        },
      ])
    }
  }, [messages])

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: GowMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simular respuesta de Gow (mientras se implementa la API real)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const gowResponse: GowMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `Entiendo que necesitas ayuda con: "${input}". Te puedo ayudar a encontrar el servicio perfecto en GoWork. ¿Te gustaría que busque proveedores cerca de ti?`,
        timestamp: new Date(),
        suggestions: ["Sí, buscar cerca", "Ver categorías", "Más información"],
        actions: [
          {
            id: "search",
            label: "Buscar servicios",
            type: "link",
            url: "/servicios",
          },
          {
            id: "map",
            label: "Ver en mapa",
            type: "link",
            url: "/map",
          },
        ],
      }

      setMessages((prev) => [...prev, gowResponse])
    } catch (error) {
      console.error("Error al comunicarse con Gow:", error)

      const fallbackMessage: GowMessage = {
        id: `assistant-fallback-${Date.now()}`,
        role: "assistant",
        content: "Disculpa, estoy teniendo problemas para conectarme. ¿Puedes intentarlo de nuevo en un momento?",
        timestamp: new Date(),
        suggestions: ["¿Cómo funciona GoWork?", "Buscar servicios", "Contactar soporte"],
      }

      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    setTimeout(() => handleSendMessage(), 100)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsExpanded(false)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className={`mb-4 transition-all duration-200 ${isExpanded ? "w-[450px] h-[600px]" : "w-[350px]"}`}>
          <Card className="border border-gray-700 bg-gray-900 shadow-xl overflow-hidden flex flex-col h-full">
            <CardHeader className="bg-gradient-to-r from-[#0066FF] to-[#00E5B4] p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 bg-white">
                    <AvatarFallback className="text-[#0066FF] font-bold">G</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white text-lg">Gow</CardTitle>
                    <p className="text-xs text-white/80">Asistente IA de GoWork</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={toggleExpand}
                  >
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={toggleChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent
              className={`p-0 overflow-y-auto flex-grow ${isExpanded ? "max-h-[calc(600px-140px)]" : "max-h-[350px]"}`}
            >
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 ${
                        message.role === "user"
                          ? "bg-[#0066FF] text-white"
                          : "bg-gray-800 border border-gray-700 text-white"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="h-4 w-4 text-[#00E5B4]" />
                          <span className="text-xs font-medium text-[#00E5B4]">Gow</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="mt-1 text-xs opacity-70 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>

                      {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              size="sm"
                              variant="outline"
                              className="text-xs py-1 h-auto border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}

                      {message.role === "assistant" && message.actions && message.actions.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.actions.map((action) => (
                            <Button
                              key={action.id}
                              size="sm"
                              variant="default"
                              className={`w-full justify-start text-xs py-1 h-auto ${
                                action.type === "link"
                                  ? "bg-[#00E5B4] hover:bg-[#00E5B4]/80 text-gray-900"
                                  : "bg-gray-700 hover:bg-gray-600 text-white"
                              }`}
                              onClick={() => {
                                if (action.type === "link" && action.url) {
                                  window.location.href = action.url
                                } else {
                                  handleSuggestionClick(`Quiero ${action.label.toLowerCase()}`)
                                }
                              }}
                            >
                              {action.type === "link" ? (
                                <Zap className="h-3 w-3 mr-2" />
                              ) : (
                                <Lightbulb className="h-3 w-3 mr-2" />
                              )}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 border border-gray-700 text-white rounded-2xl p-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 text-[#00E5B4] animate-spin" />
                        <span className="text-sm">Gow está escribiendo...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="p-3 border-t border-gray-800 bg-gray-900">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex w-full space-x-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-gray-800 border-gray-700 text-white focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="bg-[#00E5B4] hover:bg-[#00E5B4]/80 text-gray-900"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}

      <Button
        onClick={toggleChat}
        className={`rounded-full w-14 h-14 shadow-lg transition-all duration-200 ${
          isOpen ? "bg-gray-700 hover:bg-gray-600" : "bg-gradient-to-r from-[#0066FF] to-[#00E5B4] hover:opacity-90"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <Bot className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#00E5B4] rounded-full animate-pulse"></span>
          </div>
        )}
      </Button>
    </div>
  )
}
