"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Bot, Sparkles, Minimize2, Maximize2, Loader2 } from "lucide-react"
import { geminiService, type ChatMessage } from "@/lib/gemini"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  isLoading?: boolean
}

export function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "¡Hola! Soy Gow, tu asistente de IA en GoWork. Estoy aquí para ayudarte con servicios, precios, optimización de perfil y todo lo relacionado con la plataforma. ¿En qué puedo ayudarte hoy? 🚀",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
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

    // Añadir mensaje de "escribiendo..."
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "Gow está escribiendo...",
      sender: "ai",
      timestamp: new Date(),
      isLoading: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    try {
      // Preparar historial para Gemini
      const chatHistory: ChatMessage[] = messages
        .filter((msg) => !msg.isLoading)
        .map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        }))

      // Añadir el mensaje actual del usuario
      chatHistory.push({
        role: "user",
        parts: [{ text: userMessage.content }],
      })

      const aiResponse = await geminiService.chatWithGow(chatHistory)

      // Remover mensaje de "escribiendo..." y añadir respuesta real
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading)
        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            content: aiResponse,
            sender: "ai",
            timestamp: new Date(),
          },
        ]
      })
    } catch (error) {
      console.error("Error en chat:", error)

      // Remover mensaje de "escribiendo..." y mostrar error
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading)
        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            content: "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta nuevamente. 😔",
            sender: "ai",
            timestamp: new Date(),
          },
        ]
      })
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-[#6610f2] to-[#007bff] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#FFA500] rounded-full animate-pulse"></div>
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 ${isMinimized ? "w-80" : "w-96 h-[500px]"} transition-all duration-300`}
    >
      <Card className="bg-white border-[#007bff] shadow-2xl h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D3D3D3] bg-gradient-to-r from-[#6610f2] to-[#007bff] text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold">Gow IA</h3>
              <p className="text-xs opacity-80">{isTyping ? "Escribiendo..." : "Asistente GoWork"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-[#007bff] text-white"
                        : "bg-[#D3D3D3]/20 text-[#333333] border border-[#D3D3D3]"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {msg.sender === "ai" && (
                        <div className="flex-shrink-0 mt-0.5">
                          {msg.isLoading ? (
                            <Loader2 className="h-4 w-4 text-[#6610f2] animate-spin" />
                          ) : (
                            <Sparkles className="h-4 w-4 text-[#6610f2]" />
                          )}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#D3D3D3]">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  disabled={isTyping}
                  className="flex-1 border-[#D3D3D3] focus:border-[#007bff] focus:ring-[#007bff]"
                />
                <Button
                  onClick={sendMessage}
                  size="sm"
                  disabled={!message.trim() || isTyping}
                  className="bg-[#007bff] hover:bg-[#0056b3] text-white px-3"
                >
                  {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="text-xs text-[#333333]/60 flex items-center space-x-1">
                  <Sparkles className="h-3 w-3 text-[#6610f2]" />
                  <span>Potenciado por Google Gemini</span>
                </span>
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#FFA500] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#333333]">
                {isTyping ? "Gow está escribiendo..." : "Gow está listo para ayudarte"}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
