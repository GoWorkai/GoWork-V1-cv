"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Mic,
  Send,
  Menu,
  Bookmark,
  Search,
  MapPin,
  Youtube,
  Mail,
  MessageCircle,
  Phone,
  Settings,
  User,
  ImageIcon,
  Loader2,
  Bot,
  Paperclip,
} from "lucide-react"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isTyping?: boolean
}

export default function HomePage() {
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: "Reunión Matías Lunes", completed: true },
    { id: 2, text: "Revisar propuestas", completed: false },
  ])

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
      // Llamada simplificada a la API
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
            chatHistory: chatMessages.slice(-3), // Últimos 3 mensajes para contexto
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error en la respuesta del servidor")
      }

      // Extraer el texto de la respuesta
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
          "¡Hola! Soy Gow, tu asistente de GoWork. Puedo ayudarte con:\n\n• Buscar servicios y proveedores\n• Optimizar tu perfil profesional\n• Analizar precios del mercado chileno\n• Encontrar oportunidades de trabajo\n• Crear y gestionar tus servicios\n\n¿En qué te gustaría que te ayude hoy?",
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
    "¿Cómo funciona GoWork?",
    "Buscar servicios de diseño",
    "Optimizar mi perfil",
    "Precios de desarrollo web",
    "Encontrar trabajo freelance",
    "Crear mi primer servicio",
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#7DD3FC" }}>
      {/* Compact Top Navigation */}
      <div className="flex justify-between items-center p-3">
        <button className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <Menu className="h-4 w-4 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">GoWork</h1>
        <div className="flex space-x-2">
          <button className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Bookmark className="h-4 w-4 text-white" />
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
          >
            <User className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      {/* Compact Dashboard Widgets */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-12 gap-3 max-w-7xl mx-auto">
          {/* Compact To Do List */}
          <div className="col-span-3 bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-sm font-semibold mb-3 text-gray-800">To Do</h3>
            <div className="space-y-2">
              {todoItems.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${item.completed ? "bg-teal-500" : "bg-gray-300"}`}></div>
                  <span className={`text-xs ${item.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Compact Status */}
          <div className="col-span-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-sm font-semibold mb-3 text-gray-800">Estado GoWork</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-teal-500 rounded-xl p-2 text-white text-center">
                <div className="text-lg font-bold">85%</div>
                <div className="text-xs">Actividad</div>
              </div>
              <div className="bg-blue-500 rounded-xl p-2 text-white text-center">
                <div className="text-lg font-bold">23</div>
                <div className="text-xs">Proyectos</div>
              </div>
              <div className="bg-green-500 rounded-xl p-2 text-white text-center">
                <div className="text-lg font-bold">95%</div>
                <div className="text-xs">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Compact Performance */}
          <div className="col-span-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="text-2xl font-bold text-gray-800">4.8★</div>
            <div className="text-xs text-gray-600 text-center">Rating</div>
          </div>
        </div>
      </div>

      {/* Gow AI Assistant - Perplexity Style */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-4xl mx-auto w-full">
        {chatMessages.length === 0 ? (
          // Initial State - Perplexity Style
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mr-4">
                <Bot className="h-8 w-8 text-teal-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Gow</h1>
            </div>
            <p className="text-gray-600 text-lg mb-8">Tu asistente inteligente de GoWork</p>
          </div>
        ) : (
          // Chat Messages - Fixed Height Container with Fade Effect
          <div ref={chatContainerRef} className="w-full max-w-3xl mb-6 relative" style={{ height: "320px" }}>
            {/* Fade effect at the top */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#7DD3FC] to-transparent z-10 pointer-events-none"></div>

            {/* Chat messages container with fixed height */}
            <div className="h-full overflow-y-auto flex flex-col-reverse p-4">
              <div className="space-y-4">
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 text-teal-500 animate-spin" />
                        <span className="text-sm text-gray-600">Gow está pensando...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reversed messages to show newest at bottom */}
                {[...chatMessages].reverse().map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === "user"
                          ? "bg-gray-900 text-white"
                          : "bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-center mb-2">
                          <Bot className="h-4 w-4 text-teal-500 mr-2" />
                          <span className="text-xs font-medium text-teal-500">Gow</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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

        {/* Perplexity-style Search Bar */}
        <div className="w-full max-w-3xl">
          <div className="relative">
            <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="flex items-center p-4">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pregunta algo sobre GoWork..."
                  className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none text-sm"
                  rows={1}
                  style={{ minHeight: "20px", maxHeight: "100px" }}
                />
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Search className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <ImageIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <MapPin className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-2 transition-colors ${
                      isRecording ? "text-red-400" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || isLoading}
                    className="p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {chatMessages.length === 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setChatInput(action)}
                  className="p-3 bg-white/80 backdrop-blur-sm rounded-xl text-sm text-gray-700 hover:bg-white/90 transition-colors text-left"
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Compact Bottom Navigation */}
      <div className="p-3 flex justify-center space-x-3">
        {[
          { icon: Youtube, color: "bg-red-500" },
          { icon: Mail, color: "bg-blue-500" },
          { icon: MessageCircle, color: "bg-teal-500" },
          { icon: Phone, color: "bg-green-500" },
          { icon: Settings, color: "bg-gray-500" },
        ].map((app, index) => (
          <button
            key={index}
            className={`w-10 h-10 ${app.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform`}
          >
            <app.icon className="h-5 w-5" />
          </button>
        ))}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Iniciar Sesión</h2>
            <form className="space-y-4">
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Email"
              />
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Contraseña"
              />
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-medium hover:bg-teal-600 transition-colors"
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
