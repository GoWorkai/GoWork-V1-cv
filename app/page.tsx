"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Mic,
  Send,
  Search,
  ImageIcon,
  Loader2,
  Bot,
  Paperclip,
  User,
  Plus,
  Home,
  Compass,
  Briefcase,
  Users,
  Settings,
  Download,
  HelpCircle,
} from "lucide-react"

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

  const sidebarItems = [
    { icon: Home, label: "Inicio", active: true },
    { icon: Compass, label: "Descubrir" },
    { icon: Briefcase, label: "Servicios" },
    { icon: Users, label: "Red Social" },
  ]

  const footerLinks = ["Pro", "Empresa", "API", "Blog", "Privacidad", "Carreras", "Tienda", "Finanzas"]

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar - Perplexity Style */}
      <div className="w-16 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 space-y-6">
        {/* Logo */}
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <span className="text-gray-900 font-bold text-sm">G</span>
        </div>

        {/* New Chat Button */}
        <button className="w-8 h-8 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
          <Plus className="h-4 w-4" />
        </button>

        {/* Navigation Items */}
        <div className="flex flex-col space-y-4">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                item.active ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              title={item.label}
            >
              <item.icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        {/* Bottom Items */}
        <div className="flex-1"></div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setShowLogin(true)}
            className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <User className="h-4 w-4" />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
            <Settings className="h-4 w-4" />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          {chatMessages.length === 0 ? (
            // Initial State - Perplexity Style
            <div className="w-full max-w-2xl">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-light text-white mb-8 tracking-wide">gowork</h1>
              </div>

              {/* Search Bar - Exact Perplexity Style */}
              <div className="relative mb-8">
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="flex items-center p-4">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Buscar servicios, proveedores, proyectos..."
                      className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none text-sm leading-relaxed"
                      rows={1}
                      style={{ minHeight: "20px", maxHeight: "120px" }}
                    />
                    <div className="flex items-center space-x-3 ml-4">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Search className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-2 transition-colors ${
                          isRecording ? "text-cyan-400" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <Mic className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!chatInput.trim() || isLoading}
                        className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Chat Messages
            <div className="w-full max-w-2xl mb-8">
              {/* Chat Container */}
              <div className="mb-8 relative" style={{ maxHeight: "400px" }}>
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-900 to-transparent z-10 pointer-events-none"></div>

                <div className="max-h-96 overflow-y-auto flex flex-col-reverse">
                  <div className="space-y-6 py-4">
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 text-cyan-400 animate-spin" />
                            <span className="text-sm text-gray-300">Gow está pensando...</span>
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
                              ? "bg-gray-700 text-white"
                              : "bg-gray-800 text-gray-100 border border-gray-700"
                          }`}
                        >
                          {message.role === "assistant" && (
                            <div className="flex items-center mb-2">
                              <Bot className="h-4 w-4 text-cyan-400 mr-2" />
                              <span className="text-xs font-medium text-cyan-400">Gow</span>
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

              {/* Search Bar for Chat Mode */}
              <div className="relative">
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="flex items-center p-4">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Continúa la conversación..."
                      className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none outline-none text-sm leading-relaxed"
                      rows={1}
                      style={{ minHeight: "20px", maxHeight: "120px" }}
                    />
                    <div className="flex items-center space-x-3 ml-4">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Search className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <ImageIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`p-2 transition-colors ${
                          isRecording ? "text-cyan-400" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <Mic className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!chatInput.trim() || isLoading}
                        className="p-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Perplexity Style */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
            {footerLinks.map((link, index) => (
              <button key={index} className="hover:text-white transition-colors">
                {link}
              </button>
            ))}
            <button className="hover:text-white transition-colors">español</button>
            <button className="hover:text-white transition-colors">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Iniciar Sesión</h2>
            <form className="space-y-4">
              <input
                type="email"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Email"
              />
              <input
                type="password"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400"
                placeholder="Contraseña"
              />
              <button
                type="submit"
                className="w-full bg-cyan-500 text-white py-3 rounded-xl font-medium hover:bg-cyan-600 transition-colors"
              >
                Entrar
              </button>
            </form>
            <button onClick={() => setShowLogin(false)} className="w-full mt-4 text-gray-400 hover:text-white">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
