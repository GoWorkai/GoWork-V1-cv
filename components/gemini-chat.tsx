"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Bot, Sparkles, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy Gow, tu asistente de IA en GoWork. ¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])

  const sendMessage = async () => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulación de respuesta de IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Entiendo que necesitas ayuda con "${message}". Te puedo ayudar a encontrar los mejores profesionales en tu área, optimizar tu perfil, o cualquier otra consulta sobre GoWork. ¿Qué te gustaría hacer específicamente?`,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
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
              <p className="text-xs opacity-80">Asistente GoWork</p>
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
                      {msg.sender === "ai" && <Sparkles className="h-4 w-4 text-[#6610f2] mt-0.5 flex-shrink-0" />}
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <p className="text-xs opacity-60 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#D3D3D3]">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 border-[#D3D3D3] focus:border-[#007bff] focus:ring-[#007bff]"
                />
                <Button onClick={sendMessage} size="sm" className="bg-[#007bff] hover:bg-[#0056b3] text-white px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="text-xs text-[#333333]/60 flex items-center space-x-1">
                  <Sparkles className="h-3 w-3 text-[#6610f2]" />
                  <span>Potenciado por Gemini AI</span>
                </span>
              </div>
            </div>
          </>
        )}

        {isMinimized && (
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#FFA500] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#333333]">Gow está listo para ayudarte</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
