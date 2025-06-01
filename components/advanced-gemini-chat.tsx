"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Send,
  Mic,
  Loader2,
  Sparkles,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Heart,
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Paperclip,
  TrendingUp,
  Target,
  Zap,
  Brain,
  Eye,
  Download,
  Share2,
} from "lucide-react"
import { geminiService } from "@/lib/gemini"

interface ExtractedData {
  personalInfo: {
    name?: string
    phone?: string
    email?: string
    location?: string
    age?: string
  }
  professionalInfo: {
    skills: string[]
    experience: string[]
    services: string[]
    availability?: string
    priceRange?: string
  }
  preferences: {
    interests: string[]
    workStyle: string[]
    communication: string[]
  }
  socialData: {
    platforms: string[]
    references: string[]
  }
  keywords: string[]
  sentiment: "positive" | "neutral" | "negative"
  userType: "client" | "provider" | "both" | "unknown"
  priority: "high" | "medium" | "low"
}

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type: "text" | "audio" | "image" | "file"
  metadata?: any
  extractedData?: Partial<ExtractedData>
}

interface AdvancedGeminiChatProps {
  onClose: () => void
  isMinimized: boolean
  onToggleMinimize: () => void
}

export function AdvancedGeminiChat({ onClose, isMinimized, onToggleMinimize }: AdvancedGeminiChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "¡Hola! Soy Gow, tu asistente personal en GoWork. Estoy aquí para conocerte mejor y ayudarte a aprovechar al máximo nuestra plataforma. Cuéntame, ¿eres alguien que busca servicios o prefieres ofrecer tus talentos? 😊",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [extractedData, setExtractedData] = useState<ExtractedData>({
    personalInfo: {},
    professionalInfo: { skills: [], experience: [], services: [] },
    preferences: { interests: [], workStyle: [], communication: [] },
    socialData: { platforms: [], references: [] },
    keywords: [],
    sentiment: "neutral",
    userType: "unknown",
    priority: "medium",
  })
  const [showDataPanel, setShowDataPanel] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const extractDataFromMessage = async (userMessage: string): Promise<Partial<ExtractedData>> => {
    try {
      const extractionPrompt = `
        Analiza el siguiente mensaje del usuario y extrae información relevante en formato JSON:
        
        Mensaje: "${userMessage}"
        
        Extrae y devuelve SOLO un objeto JSON con esta estructura:
        {
          "personalInfo": {
            "name": "string o null",
            "phone": "string o null", 
            "email": "string o null",
            "location": "string o null"
          },
          "professionalInfo": {
            "skills": ["array de habilidades mencionadas"],
            "services": ["array de servicios mencionados"],
            "experience": ["array de experiencias mencionadas"]
          },
          "preferences": {
            "interests": ["array de intereses"],
            "workStyle": ["array de estilos de trabajo"]
          },
          "keywords": ["palabras clave importantes"],
          "userType": "client|provider|both|unknown",
          "sentiment": "positive|neutral|negative"
        }
      `

      const result = await geminiService.chatWithGow([
        {
          role: "user",
          parts: [{ text: extractionPrompt }],
        },
      ])

      // Intentar parsear la respuesta como JSON
      const jsonMatch = result.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (error) {
      console.error("Error extrayendo datos:", error)
    }

    return {}
  }

  const generateContextualResponse = async (userMessage: string, context: ExtractedData): Promise<string> => {
    const contextPrompt = `
      Eres Gow, el asistente de IA de GoWork. Responde de manera natural, amigable y útil.
      
      Contexto del usuario:
      - Tipo: ${context.userType}
      - Habilidades conocidas: ${context.professionalInfo.skills.join(", ")}
      - Servicios: ${context.professionalInfo.services.join(", ")}
      - Intereses: ${context.preferences.interests.join(", ")}
      - Ubicación: ${context.personalInfo.location || "No especificada"}
      - Sentimiento: ${context.sentiment}
      
      Mensaje del usuario: "${userMessage}"
      
      Instrucciones:
      1. Responde de manera conversacional y natural
      2. Si es cliente: ayúdalo a encontrar servicios, recomienda proveedores, sugiere precios
      3. Si es proveedor: ayúdalo a optimizar perfil, mejorar servicios, conseguir clientes
      4. Haz preguntas relevantes para conocerlo mejor
      5. Recomienda materiales, herramientas o recursos específicos cuando sea apropiado
      6. Usa emojis ocasionalmente para ser más amigable
      7. Si menciona problemas específicos, ofrece soluciones prácticas
      
      Responde en español chileno, máximo 150 palabras.
    `

    try {
      return await geminiService.chatWithGow([
        {
          role: "user",
          parts: [{ text: contextPrompt }],
        },
      ])
    } catch (error) {
      return "Lo siento, tengo problemas técnicos. ¿Podrías repetir tu consulta? 😔"
    }
  }

  const handleSend = async () => {
    if (!message.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsTyping(true)

    try {
      // Extraer datos del mensaje del usuario
      const newExtractedData = await extractDataFromMessage(message)

      // Actualizar datos extraídos
      setExtractedData((prev) => ({
        personalInfo: { ...prev.personalInfo, ...newExtractedData.personalInfo },
        professionalInfo: {
          skills: [...new Set([...prev.professionalInfo.skills, ...(newExtractedData.professionalInfo?.skills || [])])],
          experience: [
            ...new Set([...prev.professionalInfo.experience, ...(newExtractedData.professionalInfo?.experience || [])]),
          ],
          services: [
            ...new Set([...prev.professionalInfo.services, ...(newExtractedData.professionalInfo?.services || [])]),
          ],
        },
        preferences: {
          interests: [...new Set([...prev.preferences.interests, ...(newExtractedData.preferences?.interests || [])])],
          workStyle: [...new Set([...prev.preferences.workStyle, ...(newExtractedData.preferences?.workStyle || [])])],
          communication: prev.preferences.communication,
        },
        socialData: prev.socialData,
        keywords: [...new Set([...prev.keywords, ...(newExtractedData.keywords || [])])],
        sentiment: newExtractedData.sentiment || prev.sentiment,
        userType: newExtractedData.userType || prev.userType,
        priority: prev.priority,
      }))

      // Generar respuesta contextual
      const aiResponse = await generateContextualResponse(message, extractedData)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
        extractedData: newExtractedData,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error en chat:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Disculpa, tuve un problema procesando tu mensaje. ¿Podrías intentar nuevamente? 😔",
        sender: "ai",
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Aquí implementarías la lógica de subida de archivos
      console.log("Archivo seleccionado:", file.name)
    }
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "client":
        return "text-blue-400"
      case "provider":
        return "text-green-400"
      case "both":
        return "text-purple-400"
      default:
        return "text-gray-400"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-400"
      case "negative":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="bg-gray-800/90 backdrop-blur-xl border border-gray-700 w-80">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#6610f2] to-[#007bff] rounded-xl flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Gow IA Avanzado</h3>
                  <p className="text-xs text-gray-300">{isTyping ? "Analizando..." : `${messages.length} mensajes`}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={onToggleMinimize}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-4 z-50 flex">
      <Card className="flex-1 bg-gray-900/95 backdrop-blur-xl border border-gray-700 shadow-2xl flex flex-col max-h-full">
        {/* Header */}
        <CardHeader className="border-b border-gray-700 bg-gradient-to-r from-[#6610f2]/20 to-[#007bff]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6610f2] to-[#007bff] rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">Gow IA - Asistente Avanzado</CardTitle>
                <p className="text-sm text-gray-300">
                  {isTyping ? "Analizando y extrayendo datos..." : "Listo para ayudarte"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDataPanel(!showDataPanel)}
                className="text-gray-400 hover:text-white"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="text-gray-400 hover:text-white">
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat Column */}
          <div className={`${showDataPanel ? "w-2/3" : "w-full"} flex flex-col border-r border-gray-700`}>
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
                          ? "bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white ml-4"
                          : "bg-gray-800/80 backdrop-blur-sm text-white border border-gray-600"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {msg.sender === "ai" && (
                          <div className="flex-shrink-0 mt-1">
                            <Sparkles className="h-4 w-4 text-[#6610f2]" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap leading-relaxed text-white font-medium">
                            {msg.content}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs text-gray-300">
                              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                            {msg.sender === "user" && (
                              <div className="flex items-center space-x-2">
                                <MessageCircle className="h-3 w-3 opacity-60" />
                                <span className="text-xs text-gray-300">Analizado</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/80 backdrop-blur-sm text-white border border-gray-600 p-4 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-4 w-4 animate-spin text-[#6610f2]" />
                      <span className="text-sm text-white font-medium">Gow está analizando y extrayendo datos...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-700 bg-gray-800/50">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <div className="relative">
                    <Input
                      ref={inputRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                      placeholder="Escribe tu mensaje... Gow extraerá automáticamente información relevante"
                      disabled={isTyping}
                      className="pr-20 border-gray-600 bg-gray-700/50 backdrop-blur-sm focus:border-[#007bff] focus:ring-[#007bff] text-white font-medium placeholder:text-gray-300 min-h-[50px]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                      >
                        <Paperclip className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={startVoiceRecognition}
                        disabled={isListening || isTyping}
                        className="p-1 hover:bg-gray-600 rounded transition-colors"
                      >
                        <Mic className={`h-4 w-4 ${isListening ? "text-red-400 animate-pulse" : "text-gray-400"}`} />
                      </button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || isTyping}
                  className="bg-gradient-to-r from-[#007bff] to-[#0056b3] hover:from-[#0056b3] hover:to-[#007bff] text-white px-6 py-3"
                >
                  {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3 text-[#6610f2]" />
                    <span>Extracción automática de datos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Brain className="h-3 w-3 text-[#6610f2]" />
                    <span>Análisis contextual avanzado</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Potenciado por</span>
                  <Sparkles className="h-3 w-3 text-[#6610f2]" />
                  <span className="text-xs text-[#6610f2] font-medium">Google Gemini</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data Extraction Panel */}
          {showDataPanel && (
            <div className="w-1/3 bg-gray-800/50 backdrop-blur-sm overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* User Profile Summary */}
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-sm font-semibold flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Perfil del Usuario</span>
                      </CardTitle>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Download className="h-3 w-3 text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Share2 className="h-3 w-3 text-gray-400" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Tipo de Usuario:</span>
                      <span className={`text-xs font-medium ${getUserTypeColor(extractedData.userType)}`}>
                        {extractedData.userType === "client"
                          ? "Cliente"
                          : extractedData.userType === "provider"
                            ? "Proveedor"
                            : extractedData.userType === "both"
                              ? "Ambos"
                              : "Por determinar"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Sentimiento:</span>
                      <span className={`text-xs font-medium ${getSentimentColor(extractedData.sentiment)}`}>
                        {extractedData.sentiment === "positive"
                          ? "Positivo"
                          : extractedData.sentiment === "negative"
                            ? "Negativo"
                            : "Neutral"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Prioridad:</span>
                      <span
                        className={`text-xs font-medium ${
                          extractedData.priority === "high"
                            ? "text-red-400"
                            : extractedData.priority === "medium"
                              ? "text-yellow-400"
                              : "text-green-400"
                        }`}
                      >
                        {extractedData.priority === "high"
                          ? "Alta"
                          : extractedData.priority === "medium"
                            ? "Media"
                            : "Baja"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm font-semibold flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Información Personal</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {extractedData.personalInfo.name && (
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-white font-medium">{extractedData.personalInfo.name}</span>
                      </div>
                    )}
                    {extractedData.personalInfo.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-white font-medium">{extractedData.personalInfo.phone}</span>
                      </div>
                    )}
                    {extractedData.personalInfo.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-white font-medium">{extractedData.personalInfo.email}</span>
                      </div>
                    )}
                    {extractedData.personalInfo.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-white font-medium">{extractedData.personalInfo.location}</span>
                      </div>
                    )}
                    {Object.keys(extractedData.personalInfo).length === 0 && (
                      <p className="text-xs text-gray-500 italic">No hay información personal extraída aún</p>
                    )}
                  </CardContent>
                </Card>

                {/* Professional Information */}
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm font-semibold flex items-center space-x-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Información Profesional</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {extractedData.professionalInfo.skills.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Habilidades:</p>
                        <div className="flex flex-wrap gap-1">
                          {extractedData.professionalInfo.skills.map((skill, index) => (
                            <span key={index} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {extractedData.professionalInfo.services.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Servicios:</p>
                        <div className="flex flex-wrap gap-1">
                          {extractedData.professionalInfo.services.map((service, index) => (
                            <span key={index} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {extractedData.professionalInfo.experience.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Experiencia:</p>
                        <div className="space-y-1">
                          {extractedData.professionalInfo.experience.map((exp, index) => (
                            <p key={index} className="text-xs text-white font-medium">
                              • {exp}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Preferences & Interests */}
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm font-semibold flex items-center space-x-2">
                      <Heart className="h-4 w-4" />
                      <span>Preferencias e Intereses</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {extractedData.preferences.interests.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Intereses:</p>
                        <div className="flex flex-wrap gap-1">
                          {extractedData.preferences.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {extractedData.preferences.workStyle.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Estilo de Trabajo:</p>
                        <div className="flex flex-wrap gap-1">
                          {extractedData.preferences.workStyle.map((style, index) => (
                            <span
                              key={index}
                              className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full"
                            >
                              {style}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Keywords & Analytics */}
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm font-semibold flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Palabras Clave</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {extractedData.keywords.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {extractedData.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-600/50 text-gray-300 px-2 py-1 rounded-full border border-gray-500"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic">No hay palabras clave extraídas aún</p>
                    )}
                  </CardContent>
                </Card>

                {/* Action Recommendations */}
                <Card className="bg-gradient-to-r from-[#6610f2]/20 to-[#007bff]/20 border-[#6610f2]/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-sm font-semibold flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>Recomendaciones</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs text-gray-300 space-y-1">
                      <p>• Continúa la conversación para obtener más datos</p>
                      <p>• Pregunta sobre experiencia específica</p>
                      <p>• Solicita información de contacto</p>
                      <p>• Explora necesidades del usuario</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          accept="image/*,audio/*,.pdf,.doc,.docx"
        />
      </Card>
    </div>
  )
}
