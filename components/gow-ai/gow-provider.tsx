"use client"

import { createContext, useState, type ReactNode } from "react"
import { GowChatWidget } from "./gow-chat-widget"

interface GowContextType {
  openChat: () => void
  closeChat: () => void
  sendMessage: (message: string) => void
}

export const GowContext = createContext<GowContextType | undefined>(undefined)

interface GowProviderProps {
  children: ReactNode
}

export function GowProvider({ children }: GowProviderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatRef, setChatRef] = useState<any>(null)

  const openChat = () => {
    setIsChatOpen(true)
  }

  const closeChat = () => {
    setIsChatOpen(false)
  }

  const sendMessage = (message: string) => {
    if (chatRef && chatRef.sendMessage) {
      chatRef.sendMessage(message)
    }
  }

  const handleChatRef = (ref: any) => {
    setChatRef(ref)
  }

  const value = {
    openChat,
    closeChat,
    sendMessage,
  }

  return (
    <GowContext.Provider value={value}>
      {children}
      <GowChatWidget />
    </GowContext.Provider>
  )
}
