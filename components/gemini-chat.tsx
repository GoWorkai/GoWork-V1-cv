"use client"
import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { AdvancedGeminiChat } from "./advanced-gemini-chat"

export function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

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
    <AdvancedGeminiChat
      onClose={() => setIsOpen(false)}
      isMinimized={isMinimized}
      onToggleMinimize={() => setIsMinimized(!isMinimized)}
    />
  )
}
