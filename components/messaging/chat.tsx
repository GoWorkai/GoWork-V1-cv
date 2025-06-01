"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, ImageIcon, Paperclip, MoreVertical, Phone, Video, Info, Check, CheckCheck, Clock } from "lucide-react"
import { MessagingService } from "@/lib/messaging-service"
import type { Conversation, Message } from "@/types/message"
import { formatDistanceToNow, format } from "date-fns"
import { es } from "date-fns/locale"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ChatProps {
  conversation: Conversation
}

export function Chat({ conversation }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const participant = conversation.participants[0]

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setIsLoading(true)
        const data = await MessagingService.getMessages(conversation.id)
        setMessages(data)

        // Marcar como leídos
        if (conversation.unreadCount > 0) {
          await MessagingService.markAsRead(conversation.id)
        }
      } catch (error) {
        console.error("Error al cargar mensajes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [conversation.id, conversation.unreadCount])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || isSending) return

    try {
      setIsSending(true)
      const sentMessage = await MessagingService.sendMessage({
        conversationId: conversation.id,
        content: newMessage,
      })

      setMessages((prev) => [...prev, sentMessage])
      setNewMessage("")
    } catch (error) {
      console.error("Error al enviar mensaje:", error)
    } finally {
      setIsSending(false)
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const formatMessageDate = (date: string) => {
    const messageDate = new Date(date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (messageDate.toDateString() === today.toDateString()) {
      return format(messageDate, "HH:mm")
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Ayer " + format(messageDate, "HH:mm")
    } else {
      return format(messageDate, "dd/MM/yyyy HH:mm")
    }
  }

  const renderMessageStatus = (message: Message) => {
    if (message.senderId !== "current-user") return null

    if (message.readAt) {
      return <CheckCheck className="h-4 w-4 text-blue-500" />
    } else {
      return <Check className="h-4 w-4 text-gray-400" />
    }
  }

  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = []
    let currentDate = ""
    let currentGroup: Message[] = []

    messages.forEach((message) => {
      const messageDate = new Date(message.createdAt).toDateString()

      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: currentGroup })
        }
        currentDate = messageDate
        currentGroup = [message]
      } else {
        currentGroup.push(message)
      }
    })

    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup })
    }

    return groups
  }

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Hoy"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer"
    } else {
      return format(date, "EEEE, d 'de' MMMM", { locale: es })
    }
  }

  const messageGroups = groupMessagesByDate()

  return (
    <Card className="flex flex-col h-full">
      {/* Header */}
      <CardHeader className="px-4 py-3 border-b border-gray-200 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={participant?.avatar || "/placeholder.svg"} alt={participant?.name} />
              <AvatarFallback>{participant?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {participant?.isOnline && (
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">{participant?.name}</h3>
            <p className="text-xs text-gray-500">
              {participant?.isOnline
                ? "En línea"
                : participant?.lastSeen
                  ? `Última vez ${formatDistanceToNow(new Date(participant.lastSeen), {
                      addSuffix: true,
                      locale: es,
                    })}`
                  : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Info className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver perfil</DropdownMenuItem>
              <DropdownMenuItem>Buscar en la conversación</DropdownMenuItem>
              <DropdownMenuItem>Silenciar notificaciones</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Bloquear usuario</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <div
                  className={`rounded-lg p-3 max-w-[80%] animate-pulse ${i % 2 === 0 ? "bg-gray-200" : "bg-blue-200"}`}
                  style={{ width: `${Math.floor(Math.random() * 40) + 40}%`, height: "40px" }}
                />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Send className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900">No hay mensajes</h3>
            <p className="text-sm text-gray-500 mt-1">Comienza la conversación enviando un mensaje</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messageGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-4">
                <div className="flex justify-center">
                  <Badge variant="outline" className="bg-white text-gray-500">
                    {formatDateHeader(group.date)}
                  </Badge>
                </div>
                {group.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.senderId !== "current-user" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src={participant?.avatar || "/placeholder.svg"} alt={participant?.name} />
                        <AvatarFallback>{participant?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.senderId === "current-user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
                          message.senderId === "current-user" ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        <span>{formatMessageDate(message.createdAt)}</span>
                        {renderMessageStatus(message)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <div className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="min-h-[50px]"
              disabled={isLoading || isSending}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleFileUpload}
              disabled={isLoading || isSending}
            >
              <ImageIcon className="h-5 w-5 text-gray-500" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleFileUpload}
              disabled={isLoading || isSending}
            >
              <Paperclip className="h-5 w-5 text-gray-500" />
            </Button>
            <Button type="submit" disabled={!newMessage.trim() || isLoading || isSending}>
              {isSending ? <Clock className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
        </form>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
          onChange={(e) => {
            // Manejar la subida de archivos
            console.log("Archivo seleccionado:", e.target.files?.[0])
          }}
        />
      </div>
    </Card>
  )
}
