"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Send,
  Bot,
  Minimize2,
  Maximize2,
  Sparkles,
  Brain,
  Info,
  Lightbulb,
  Zap,
  Star,
  Target,
  FileText,
} from "lucide-react"
import { gowAgent, type GowResponse, type UserContext } from "@/lib/gow-agent"
import { usePathname } from "next/navigation"

interface ChatMessage {
  id: string
  sender: "user" | "gow"
  message: string
  timestamp: string
  type: "text" | "suggestion" | "action" | "info" | "profile" | "proposal" | "recommendations"
  confidence?: number
  actions?: Array<{
    id: string
    label: string
    type: "link" | "action" | "template"
    url?: string
    template?: string
  }>
  suggestions?: string[]
  profileOptimizations?: Array<{
    field: string
    suggestion: string
    priority: "high" | "medium" | "low"
  }>
  proposalTemplate?: string
  recommendations?: Array<{
    id: string
    title: string
    type: "project" | "freelancer"
    match: number
    reason: string
  }>
}

export function GlobalChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Simular contexto del usuario (en producción vendría de la base de datos)
  const userContext: UserContext = {
    userType: pathname.includes("provider") ? "freelancer" : pathname.includes("dashboard") ? "client" : "new",
    currentPage: pathname,
    profileCompleteness: 75,
    skills: ["React", "TypeScript", "Node.js", "Diseño UX"],
    experience: "Desarrollador full-stack con 3 años de experiencia en proyectos web",
    location: "Santiago, Chile",
  }

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      message: inputValue,
      timestamp: new Date().toLocaleTimeString(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      const gowResponse: GowResponse = await gowAgent.processUserInteraction(currentInput, userContext)

      const gowMessage: ChatMessage = {
        id: `gow-${Date.now()}`,
        sender: "gow",
        message: gowResponse.text,
        timestamp: new Date().toLocaleTimeString(),
        type: gowResponse.profileOptimizations
          ? "profile"
          : gowResponse.proposalTemplate
            ? "proposal"
            : gowResponse.recommendations
              ? "recommendations"
              : "text",
        confidence: gowResponse.confidence,
        actions: gowResponse.actions,
        suggestions: gowResponse.suggestions,
        profileOptimizations: gowResponse.profileOptimizations,
        proposalTemplate: gowResponse.proposalTemplate,
        recommendations: gowResponse.recommendations,
      }

      setMessages((prev) => [...prev, gowMessage])
    } catch (error) {
      console.error("Error sending message to Gow:", error)
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: "gow",
        message:
          "¡Hola! Soy Gow 👋 Estoy teniendo algunos problemas técnicos, pero estoy aquí para ayudarte. ¿Qué necesitas específicamente?",
        timestamp: new Date().toLocaleTimeString(),
        type: "text",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleActionClick = (action: any) => {
    if (action.type === "link" && action.url) {
      window.open(action.url, "_blank")
    } else if (action.type === "template" && action.template) {
      setCurrentTemplate(action.template)
      setShowTemplateModal(true)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.sender === "gow") {
        setUnreadCount((prev) => prev + 1)
      }
    } else if (isOpen) {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  // Mensaje de bienvenida de Gow
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        sender: "gow",
        message:
          userContext.userType === "new"
            ? "¡Hola! Soy Gow, tu asistente personal en GoWork 👋 Estoy aquí para ayudarte a crear un perfil que destaque tus habilidades únicas. ¿Te gustaría comenzar ahora?"
            : userContext.userType === "freelancer"
              ? "¡Hola! Soy Gow 👋 He analizado tu perfil y puedo ayudarte a optimizarlo o encontrar proyectos perfectos para ti. ¿En qué te ayudo hoy?"
              : "¡Hola! Soy Gow, tu asistente en GoWork 👋 Puedo ayudarte a encontrar los mejores freelancers para tu proyecto. ¿Qué necesitas?",
        timestamp: new Date().toLocaleTimeString(),
        type: "action",
        confidence: 100,
        actions:
          userContext.userType === "new"
            ? [
                { id: "create-profile", label: "🚀 Crear mi perfil", type: "link", url: "/onboarding" },
                { id: "explore", label: "🔍 Explorar servicios", type: "link", url: "/servicios" },
                { id: "learn-more", label: "📚 Cómo funciona", type: "action" },
              ]
            : userContext.userType === "freelancer"
              ? [
                  { id: "optimize-profile", label: "⚡ Optimizar perfil", type: "action" },
                  { id: "find-projects", label: "🎯 Buscar proyectos", type: "link", url: "/servicios" },
                  { id: "proposal-help", label: "📝 Ayuda con propuestas", type: "action" },
                ]
              : [
                  { id: "find-freelancers", label: "👥 Buscar freelancers", type: "link", url: "/map" },
                  { id: "post-project", label: "📋 Publicar proyecto", type: "action" },
                  { id: "ai-matching", label: "🤖 Matching con IA", type: "link", url: "/ai-dashboard" },
                ],
        suggestions: [
          "¿Cómo optimizo mi perfil?",
          "¿Qué servicios puedo ofrecer?",
          "¿Cómo encuentro buenos proyectos?",
        ],
      }
      setMessages([welcomeMessage])
    }
  }, [])

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "profile":
        return <Target className="h-4 w-4 text-[#00E5B4]" />
      case "proposal":
        return <FileText className="h-4 w-4 text-blue-400" />
      case "recommendations":
        return <Star className="h-4 w-4 text-yellow-400" />
      case "suggestion":
        return <Lightbulb className="h-4 w-4 text-yellow-400" />
      case "action":
        return <Zap className="h-4 w-4 text-[#00E5B4]" />
      case "info":
        return <Info className="h-4 w-4 text-blue-400" />
      default:
        return <Bot className="h-4 w-4 text-[#00E5B4]" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00E5B4] to-[#0066FF] hover:from-[#00CC9F] hover:to-[#0052CC] text-white shadow-2xl relative group"
        >
          <Brain className="h-6 w-6" />
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -left-2 h-6 w-6 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <div className="absolute -top-16 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <div className="font-semibold">Gow - Asistente IA</div>
            <div className="text-gray-300">Tu guía personal en GoWork</div>
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`bg-gray-900 border-gray-700 shadow-2xl transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
      >
        {/* Header */}
        <CardHeader className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00E5B4] to-[#0066FF] flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">Gow - Asistente IA</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Especialista en GoWork • Siempre disponible</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-white"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-0 h-96 overflow-y-auto">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-xs ${message.sender === "user" ? "order-2" : "order-1"}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-[#0066FF] text-white"
                            : "bg-gray-800 text-white border border-gray-700"
                        }`}
                      >
                        {message.sender === "gow" && (
                          <div className="flex items-center space-x-2 mb-2">
                            {getMessageIcon(message.type)}
                            <span className="text-xs font-medium text-[#00E5B4]">Gow</span>
                            {message.confidence && (
                              <Badge className="text-xs bg-gray-700 text-gray-300">{message.confidence}%</Badge>
                            )}
                          </div>
                        )}
                        <p className="text-sm">{message.message}</p>
                        <div className="flex items-center justify-end mt-2">
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                        </div>
                      </div>

                      {/* Profile Optimizations */}
                      {message.profileOptimizations && message.profileOptimizations.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-[#00E5B4] font-medium px-2">🎯 Optimizaciones recomendadas:</p>
                          {message.profileOptimizations.map((opt, index) => (
                            <div key={index} className="bg-gray-800 border border-gray-600 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-white">{opt.field}</span>
                                <Badge className={`text-xs ${getPriorityColor(opt.priority)} text-white`}>
                                  {opt.priority}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-300">{opt.suggestion}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Proposal Template */}
                      {message.proposalTemplate && (
                        <div className="mt-3">
                          <p className="text-xs text-[#00E5B4] font-medium px-2 mb-2">📝 Plantilla de propuesta:</p>
                          <div className="bg-gray-800 border border-gray-600 rounded-lg p-3">
                            <pre className="text-xs text-gray-300 whitespace-pre-wrap">{message.proposalTemplate}</pre>
                            <Button
                              size="sm"
                              className="mt-2 w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black"
                              onClick={() => {
                                navigator.clipboard.writeText(message.proposalTemplate || "")
                              }}
                            >
                              📋 Copiar plantilla
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      {message.recommendations && message.recommendations.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-[#00E5B4] font-medium px-2">⭐ Recomendaciones personalizadas:</p>
                          {message.recommendations.map((rec, index) => (
                            <div key={index} className="bg-gray-800 border border-gray-600 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-white">{rec.title}</span>
                                <Badge className="text-xs bg-[#00E5B4] text-black">{rec.match}% match</Badge>
                              </div>
                              <p className="text-xs text-gray-300">{rec.reason}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-gray-400 px-2">💡 Sugerencias:</p>
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              className="w-full text-xs border-gray-600 text-gray-300 hover:bg-gray-800 justify-start"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      {message.actions && message.actions.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.actions.map((action) => (
                            <Button
                              key={action.id}
                              size="sm"
                              variant="outline"
                              className="w-full text-xs border-gray-600 text-gray-300 hover:bg-gray-800"
                              onClick={() => handleActionClick(action)}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 text-white border border-gray-700 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
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
                        <span className="text-xs text-gray-300">Gow analizando...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Pregúntale a Gow lo que necesites..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="bg-gray-800 border-gray-600 text-white pr-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  />
                  <Brain className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00E5B4] animate-pulse" />
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-[#00E5B4] to-[#0066FF] hover:from-[#00CC9F] hover:to-[#0052CC] text-white disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-gray-500">Gow - Tu asistente especializado en GoWork</span>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}

export default GlobalChatWidget
