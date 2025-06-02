"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Search, User, DollarSign, Lightbulb, Mic, Send, Loader2, Sparkles } from "lucide-react"
import { geminiService } from "@/lib/gemini"

export function GowChatWidget() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")

  const quickActions = [
    {
      icon: Search,
      label: "Buscar servicios",
      color: "bg-blue-500",
      action: () => handleQuickAction("Ayúdame a buscar servicios disponibles en mi área"),
    },
    {
      icon: User,
      label: "Optimizar perfil",
      color: "bg-purple-500",
      action: () => handleQuickAction("¿Cómo puedo optimizar mi perfil para atraer más clientes?"),
    },
    {
      icon: DollarSign,
      label: "Analizar precios",
      color: "bg-green-500",
      action: () => handleQuickAction("Ayúdame a analizar precios competitivos para mis servicios"),
    },
    {
      icon: Lightbulb,
      label: "Ideas de negocio",
      color: "bg-orange-500",
      action: () => handleQuickAction("Dame ideas de servicios que puedo ofrecer en GoWork"),
    },
  ]

  const handleQuickAction = async (actionMessage: string) => {
    setMessage(actionMessage)
    await sendMessage(actionMessage)
  }

  const sendMessage = async (messageToSend?: string) => {
    const textToSend = messageToSend || message
    if (!textToSend.trim() || isLoading) return

    setIsLoading(true)
    try {
      const response = await geminiService.chatWithGow([
        {
          role: "user",
          parts: [{ text: `Como Gow, el asistente IA de GoWork: ${textToSend}` }],
        },
      ])
      setResponse(response)
    } catch (error) {
      console.error("Error al comunicarse con Gow:", error)
      setResponse("Lo siento, tengo problemas técnicos. ¿Podrías intentar de nuevo?")
    } finally {
      setIsLoading(false)
      if (!messageToSend) setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Gow IA</h3>
          <p className="text-sm text-gray-300">Asistente Inteligente de GoWork</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-6 leading-relaxed">
        Conversa conmigo para encontrar servicios, analizar precios, optimizar tu perfil y descubrir oportunidades
      </p>

      {/* Chat Input */}
      <div className="relative mb-6">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="¿Qué servicio necesitas? Pregúntame cualquier cosa sobre GoWork..."
          className="w-full bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 pr-20 py-3 rounded-xl focus:border-purple-500 focus:ring-purple-500"
          disabled={isLoading}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
            <Mic className="h-4 w-4 text-gray-400" />
          </button>
          <Button
            onClick={() => sendMessage()}
            disabled={!message.trim() || isLoading}
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 p-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <button
              key={index}
              onClick={action.action}
              disabled={isLoading}
              className="flex flex-col items-center space-y-2 p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs text-gray-300 text-center font-medium">{action.label}</span>
            </button>
          )
        })}
      </div>

      {/* Response Area */}
      {(response || isLoading) && (
        <div className="bg-gray-700/30 rounded-xl p-4 mb-4">
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
              <span className="text-sm text-gray-300">Gow está pensando...</span>
            </div>
          ) : (
            <p className="text-sm text-gray-200 leading-relaxed">{response}</p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
        <Sparkles className="h-3 w-3 text-purple-400" />
        <span>Potenciado por Google Gemini + Base de Conocimiento GoWork</span>
      </div>
    </div>
  )
}
