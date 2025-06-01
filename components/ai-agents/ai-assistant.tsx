"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Bot,
  MessageCircle,
  Lightbulb,
  TrendingUp,
  Users,
  FileText,
  Send,
  Sparkles,
  Brain,
  Target,
  Zap,
  CheckCircle,
  Star,
} from "lucide-react"

interface AIAgent {
  id: string
  name: string
  type: "onboarding" | "recommendations" | "proposals" | "support" | "analytics"
  status: "active" | "processing" | "idle"
  description: string
  icon: any
  color: string
}

interface AIMessage {
  id: string
  agent: string
  message: string
  type: "suggestion" | "action" | "analysis" | "support"
  timestamp: string
  confidence: number
}

export function AIAssistant() {
  const [activeAgent, setActiveAgent] = useState<string>("onboarding")
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [userInput, setUserInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const agents: AIAgent[] = [
    {
      id: "onboarding",
      name: "Asistente de Incorporación",
      type: "onboarding",
      status: "active",
      description: "Guía inteligente para optimizar tu perfil profesional",
      icon: Users,
      color: "#0066FF",
    },
    {
      id: "recommendations",
      name: "Motor de Recomendaciones",
      type: "recommendations",
      status: "active",
      description: "Encuentra oportunidades perfectas basadas en IA",
      icon: Target,
      color: "#00E5B4",
    },
    {
      id: "proposals",
      name: "Generador de Propuestas",
      type: "proposals",
      status: "processing",
      description: "Crea propuestas ganadoras automáticamente",
      icon: FileText,
      color: "#FF6D3A",
    },
    {
      id: "support",
      name: "Soporte Inteligente 24/7",
      type: "support",
      status: "active",
      description: "Asistencia instantánea con procesamiento de lenguaje natural",
      icon: MessageCircle,
      color: "#B297FF",
    },
    {
      id: "analytics",
      name: "Análisis Predictivo",
      type: "analytics",
      status: "active",
      description: "Insights y predicciones para optimizar tu rendimiento",
      icon: TrendingUp,
      color: "#FF6D3A",
    },
  ]

  const aiResponses = {
    onboarding: [
      {
        message:
          "He analizado tu perfil y detecté que puedes mejorar tu descripción profesional. ¿Te ayudo a optimizarla?",
        type: "suggestion" as const,
        confidence: 92,
      },
      {
        message:
          "Basándome en tu experiencia, te recomiendo agregar las habilidades: React, Node.js y TypeScript para aumentar tus oportunidades en un 40%.",
        type: "action" as const,
        confidence: 88,
      },
    ],
    recommendations: [
      {
        message:
          "Encontré 3 proyectos perfectos para ti basándome en tu historial y preferencias. Probabilidad de éxito: 85%",
        type: "analysis" as const,
        confidence: 85,
      },
      {
        message:
          "El proyecto 'Desarrollo de E-commerce' coincide 94% con tu perfil. ¿Quieres que genere una propuesta automática?",
        type: "suggestion" as const,
        confidence: 94,
      },
    ],
    proposals: [
      {
        message:
          "He generado una propuesta personalizada para el proyecto de desarrollo web. Incluye tu experiencia relevante y un presupuesto competitivo.",
        type: "action" as const,
        confidence: 91,
      },
      {
        message:
          "Análisis de mercado completado: tu propuesta tiene 78% más probabilidades de ser aceptada con estos ajustes.",
        type: "analysis" as const,
        confidence: 78,
      },
    ],
    support: [
      {
        message:
          "¡Hola! Soy tu asistente de IA. Puedo ayudarte con cualquier pregunta sobre la plataforma, proyectos o pagos. ¿En qué puedo asistirte?",
        type: "support" as const,
        confidence: 100,
      },
    ],
    analytics: [
      {
        message:
          "Predicción: Basándome en tu actividad, tendrás 3 nuevas oportunidades esta semana. Te notificaré cuando aparezcan.",
        type: "analysis" as const,
        confidence: 87,
      },
      {
        message:
          "Tu perfil ha mejorado 23% este mes. Los clientes valoran especialmente tu tiempo de respuesta rápido.",
        type: "analysis" as const,
        confidence: 95,
      },
    ],
  }

  useEffect(() => {
    // Simular mensajes iniciales del agente activo
    const initialMessages = aiResponses[activeAgent as keyof typeof aiResponses] || []
    setMessages(
      initialMessages.map((msg, index) => ({
        id: `${activeAgent}-${index}`,
        agent: activeAgent,
        message: msg.message,
        type: msg.type,
        timestamp: new Date().toLocaleTimeString(),
        confidence: msg.confidence,
      })),
    )
  }, [activeAgent])

  const sendMessage = async () => {
    if (!userInput.trim()) return

    setIsProcessing(true)

    // Agregar mensaje del usuario
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      agent: "user",
      message: userInput,
      type: "support",
      timestamp: new Date().toLocaleTimeString(),
      confidence: 100,
    }

    setMessages((prev) => [...prev, userMessage])
    setUserInput("")

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: `ai-${Date.now()}`,
        agent: activeAgent,
        message: generateAIResponse(userInput, activeAgent),
        type: "support",
        timestamp: new Date().toLocaleTimeString(),
        confidence: Math.floor(Math.random() * 20) + 80,
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsProcessing(false)
    }, 1500)
  }

  const generateAIResponse = (input: string, agentType: string): string => {
    const responses = {
      onboarding: [
        "Perfecto, he analizado tu consulta. Te recomiendo actualizar tu portafolio con proyectos más recientes.",
        "Basándome en tu pregunta, sugiero optimizar tu perfil con palabras clave específicas de tu industria.",
        "Excelente pregunta. Mi análisis indica que deberías destacar más tus certificaciones profesionales.",
      ],
      recommendations: [
        "He encontrado 5 oportunidades que coinciden con tu consulta. ¿Te interesa que las analice en detalle?",
        "Basándome en tu pregunta, estos proyectos tienen alta probabilidad de éxito para tu perfil.",
        "Mi algoritmo sugiere que explores estas áreas emergentes en tu campo profesional.",
      ],
      proposals: [
        "Puedo generar una propuesta optimizada para ese tipo de proyecto. ¿Quieres que la prepare?",
        "He analizado propuestas similares exitosas. Te ayudo a crear una competitiva.",
        "Mi análisis indica que deberías enfocar tu propuesta en estos puntos clave.",
      ],
      support: [
        "Entiendo tu consulta. Te ayudo a resolver esto paso a paso.",
        "He procesado tu pregunta. Aquí tienes la información que necesitas.",
        "Perfecto, puedo asistirte con eso. Te explico el proceso completo.",
      ],
      analytics: [
        "Mis datos predictivos sugieren que esta tendencia continuará. Te mantengo informado.",
        "He analizado los patrones y encontré insights valiosos para tu estrategia.",
        "Basándome en el análisis de datos, te recomiendo estas acciones específicas.",
      ],
    }

    const agentResponses = responses[agentType as keyof typeof responses] || responses.support
    return agentResponses[Math.floor(Math.random() * agentResponses.length)]
  }

  const currentAgent = agents.find((agent) => agent.id === activeAgent)

  return (
    <div className="space-y-6">
      {/* AI Agents Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {agents.map((agent) => {
          const IconComponent = agent.icon
          return (
            <Card
              key={agent.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                activeAgent === agent.id ? "bg-gray-800 border-2" : "bg-gray-900 border-gray-700 hover:border-gray-600"
              }`}
              style={{
                borderColor: activeAgent === agent.id ? agent.color : undefined,
              }}
              onClick={() => setActiveAgent(agent.id)}
            >
              <CardContent className="p-4 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${agent.color}20` }}
                >
                  <IconComponent className="h-6 w-6" style={{ color: agent.color }} />
                </div>
                <h3 className="font-medium text-sm mb-2">{agent.name}</h3>
                <Badge
                  className={`text-xs ${
                    agent.status === "active"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : agent.status === "processing"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  }`}
                >
                  {agent.status === "active" ? "Activo" : agent.status === "processing" ? "Procesando" : "Inactivo"}
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Active Agent Interface */}
      {currentAgent && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${currentAgent.color}20` }}
              >
                <currentAgent.icon className="h-5 w-5" style={{ color: currentAgent.color }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{currentAgent.name}</h3>
                <p className="text-sm text-gray-400">{currentAgent.description}</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <Brain className="h-4 w-4 text-[#00E5B4]" />
                <span className="text-sm text-[#00E5B4]">IA Activa</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <div className="max-h-96 overflow-y-auto space-y-3 p-4 bg-gray-800 rounded-lg">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.agent === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.agent === "user"
                        ? "bg-[#0066FF] text-white"
                        : "bg-gray-700 text-white border border-gray-600"
                    }`}
                  >
                    {message.agent !== "user" && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="h-4 w-4" style={{ color: currentAgent.color }} />
                        <span className="text-xs font-medium" style={{ color: currentAgent.color }}>
                          {currentAgent.name}
                        </span>
                        <Badge className="text-xs bg-gray-600 text-gray-300">{message.confidence}% confianza</Badge>
                      </div>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <div className="flex items-center justify-end space-x-2 mt-2">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                      {message.type === "suggestion" && <Lightbulb className="h-3 w-3 text-yellow-400" />}
                      {message.type === "action" && <Zap className="h-3 w-3 text-[#00E5B4]" />}
                      {message.type === "analysis" && <TrendingUp className="h-3 w-3 text-[#FF6D3A]" />}
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-white border border-gray-600 px-4 py-3 rounded-2xl">
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
                      <span className="text-sm text-gray-300">IA procesando...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Input
                  placeholder={`Pregunta al ${currentAgent.name}...`}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="bg-gray-800 border-gray-600 text-white pr-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                />
                <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00E5B4]" />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!userInput.trim() || isProcessing}
                className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              {currentAgent.type === "onboarding" && (
                <>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <CheckCircle className="h-3 w-3 mr-2" />
                    Optimizar perfil
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Star className="h-3 w-3 mr-2" />
                    Sugerir habilidades
                  </Button>
                </>
              )}
              {currentAgent.type === "recommendations" && (
                <>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Target className="h-3 w-3 mr-2" />
                    Buscar proyectos
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <TrendingUp className="h-3 w-3 mr-2" />
                    Analizar tendencias
                  </Button>
                </>
              )}
              {currentAgent.type === "proposals" && (
                <>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <FileText className="h-3 w-3 mr-2" />
                    Generar propuesta
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Zap className="h-3 w-3 mr-2" />
                    Optimizar precio
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AIAssistant
