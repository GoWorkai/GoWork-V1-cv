"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, MoreVertical, Trash2, BellOff } from "lucide-react"
import { MessagingService } from "@/lib/messaging-service"
import type { Conversation } from "@/types/message"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface InboxProps {
  onSelectConversation: (conversation: Conversation) => void
  selectedConversationId?: string
}

export function Inbox({ onSelectConversation, selectedConversationId }: InboxProps) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await MessagingService.getConversations()
        setConversations(data)
      } catch (error) {
        console.error("Error al cargar conversaciones:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadConversations()
  }, [])

  const filteredConversations = conversations.filter((conversation) => {
    const participantName = conversation.participants[0]?.name.toLowerCase() || ""
    const serviceName = conversation.serviceName?.toLowerCase() || ""
    const lastMessage = conversation.lastMessage?.content.toLowerCase() || ""
    const query = searchQuery.toLowerCase()

    return participantName.includes(query) || serviceName.includes(query) || lastMessage.includes(query)
  })

  const handleDeleteConversation = async (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await MessagingService.deleteConversation(conversationId)
      setConversations((prev) => prev.filter((conv) => conv.id !== conversationId))
    } catch (error) {
      console.error("Error al eliminar conversación:", error)
    }
  }

  const formatLastSeen = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es })
  }

  return (
    <Card className="h-full border-r border-gray-200">
      <CardHeader className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Mensajes</CardTitle>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar conversaciones..."
            className="pl-9 bg-gray-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-y-auto max-h-[calc(100vh-13rem)]">
        {isLoading ? (
          <div className="flex flex-col space-y-2 p-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900">No hay conversaciones</h3>
            <p className="text-sm text-gray-500 mt-1">
              {searchQuery
                ? "No se encontraron resultados para tu búsqueda"
                : "Comienza a chatear con proveedores de servicios"}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredConversations.map((conversation) => {
              const participant = conversation.participants[0]
              return (
                <li
                  key={conversation.id}
                  className={`relative hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedConversationId === conversation.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => onSelectConversation(conversation)}
                >
                  <div className="flex items-start px-4 py-3">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={participant?.avatar || "/placeholder.svg"} alt={participant?.name} />
                        <AvatarFallback>{participant?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {participant?.isOnline && (
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{participant?.name}</p>
                        <p className="text-xs text-gray-500">
                          {conversation.lastMessage?.createdAt &&
                            formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
                              addSuffix: false,
                              locale: es,
                            })}
                        </p>
                      </div>
                      {conversation.serviceName && (
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          Servicio: <span className="font-medium">{conversation.serviceName}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-500 truncate mt-0.5">
                        {conversation.lastMessage?.senderId === "current-user" ? "Tú: " : ""}
                        {conversation.lastMessage?.content}
                      </p>
                    </div>
                    <div className="ml-2 flex flex-col items-end">
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">{conversation.unreadCount}</Badge>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-gray-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center">
                            <BellOff className="mr-2 h-4 w-4" />
                            <span>Silenciar</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center text-red-600"
                            onClick={(e) => handleDeleteConversation(conversation.id, e)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
