"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Mic, Send, Search, ImageIcon, Loader2, Bot, Paperclip, User, Menu } from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
}

export default function HomePage() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    const currentInput = chatInput
    setChatInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/gow-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "demo-user",
          role: "client",
          message: currentInput,
          context: {
            location: "Santiago, Chile",
            currentPage: "dashboard",
            chatHistory: chatMessages.slice(-3),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error en la respuesta del servidor")
      }

      let responseText = "Lo siento, no pude procesar tu consulta."

      if (data.success && data.data) {
        responseText = data.data.text || data.data.content || responseText
      } else if (data.fallback) {
        responseText = data.fallback.text || responseText
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error calling Gemini API:", error)

      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "¡Hola! Soy Gow, tu asistente de GoWork. ¿En qué puedo ayudarte con servicios, proveedores o tu perfil?",
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    "Buscar diseñadores gráficos",
    "Desarrolladores web en Santiago",
    "¿Cómo crear mi perfil?",
    "Precios de marketing digital",
    "Servicios de redacción",
    "Consultores freelance",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Top Navigation */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-semibold text-gray-900">GoWork</h1>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Red Social & Marketplace</span>
        </div>
        <button onClick={() => setShowLogin(true)} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <User className="h-5 w-5" />
        </button>
      </div>

      {/* Main Content - Perplexity Style */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-2xl">
          {chatMessages.length === 0 ? (
            // Initial State - Clean Perplexity Style
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-8">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mr-3">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-semibold text-gray-900">Gow</h1>
              </div>
              <p className="text-gray-600 text-lg mb-2">Tu asistente inteligente de GoWork</p>
              <p className="text-gray-500 text-sm">Encuentra servicios, conecta con talento, haz crecer tu negocio</p>
            </div>
          ) : (
            // Chat Messages - Clean Container
            <div ref={chatContainerRef} className="mb-8 relative" style={{ maxHeight: "400px" }}>
              {/* Subtle fade effect at the top */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

              {/* Chat messages container */}
              <div className="max-h-96 overflow-y-auto flex flex-col-reverse">
                <div className="space-y-6 py-4">
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
                          <span className="text-sm text-gray-600">Gow está pensando...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {[...chatMessages].reverse().map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 ${
                          message.role === "user"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-50 text-gray-900 border border-gray-100"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex items-center mb-2">
                            <Bot className="h-4 w-4 text-gray-600 mr-2" />
                            <span className="text-xs font-medium text-gray-600">Gow</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <div className="text-xs opacity-60 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>
            </div>
          )}

          {/* Search Bar - Perplexity Style */}
          <div className="relative">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden focus-within:border-gray-300 focus-within:shadow-md transition-all">
              <div className="flex items-center p-4">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Busca servicios, proveedores, proyectos..."
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 resize-none outline-none text-sm leading-relaxed"
                  rows={1}
                  style={{ minHeight: "20px", maxHeight: "120px" }}
                />
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Search className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <ImageIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-2 transition-colors ${
                      isRecording ? "text-red-500" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isLoading}
                    className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Only show when no chat */}
          {chatMessages.length === 0 && (
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setChatInput(action)}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm text-gray-700 transition-colors text-left border border-gray-100"
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Iniciar Sesión</h2>
            <form className="space-y-4">
              <input
                type="email"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Email"
              />
              <input
                type="password"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Contraseña"
              />
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Entrar
              </button>
            </form>
            <button onClick={() => setShowLogin(false)} className="w-full mt-4 text-gray-500 hover:text-gray-700">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
