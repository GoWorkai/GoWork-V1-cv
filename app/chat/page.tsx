"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Star,
  CheckCircle2,
  Circle,
} from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "provider",
      text: "¡Hola! Vi tu solicitud para instalación eléctrica. ¿Podrías contarme más detalles sobre el trabajo?",
      time: "14:30",
      read: true,
    },
    {
      id: 2,
      sender: "client",
      text: "Hola Juan! Necesito instalar 6 enchufes nuevos en mi cocina y cambiar el tablero eléctrico principal.",
      time: "14:32",
      read: true,
    },
    {
      id: 3,
      sender: "provider",
      text: "Perfecto. ¿Cuándo te vendría bien que vaya a revisar? Puedo ir mañana en la mañana para hacer una cotización.",
      time: "14:35",
      read: true,
    },
    {
      id: 4,
      sender: "client",
      text: "Mañana a las 10:00 AM me viene perfecto. ¿Cuánto cobras por la visita?",
      time: "14:37",
      read: true,
    },
    {
      id: 5,
      sender: "provider",
      text: "La visita es gratuita si decides trabajar conmigo. Te envío mi ubicación actual y llegada estimada.",
      time: "14:40",
      read: false,
    },
  ])

  const chats = [
    {
      id: 1,
      name: "Juan Martínez",
      role: "Electricista",
      avatar: "JM",
      lastMessage: "La visita es gratuita si decides...",
      time: "14:40",
      unread: 1,
      online: true,
      rating: 4.9,
      service: "Instalación eléctrica",
    },
    {
      id: 2,
      name: "Ana López",
      role: "Diseñadora",
      avatar: "AL",
      lastMessage: "Te envío las primeras propuestas",
      time: "13:15",
      unread: 0,
      online: false,
      rating: 5.0,
      service: "Diseño de logo",
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      role: "Plomero",
      avatar: "CR",
      lastMessage: "Trabajo completado ✅",
      time: "12:30",
      unread: 0,
      online: false,
      rating: 4.8,
      service: "Reparación de cañería",
    },
  ]

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "client",
        text: message,
        time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        read: false,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const selectedChatData = chats.find((chat) => chat.id === selectedChat)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="text-2xl font-bold">
              <span className="text-[#0066FF]">Go</span>
              <span className="text-[#00E5B4]">Work</span>
            </div>
          </div>
          <h1 className="text-lg font-semibold">Mensajes</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Chat List Sidebar */}
        <aside className="w-80 bg-black border-r border-gray-800 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar conversaciones..."
                className="bg-gray-900 border-gray-700 text-white pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors ${
                  selectedChat === chat.id ? "bg-gray-900 border-l-4 border-l-[#00E5B4]" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                        {chat.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00E5B4] rounded-full border-2 border-black"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm text-gray-400">{chat.role}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-400">{chat.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                      {chat.unread > 0 && (
                        <Badge className="bg-[#00E5B4] text-black text-xs min-w-[20px] h-5 flex items-center justify-center">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                    <Badge className="mt-2 text-xs bg-gray-800 text-gray-300">{chat.service}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          {selectedChatData ? (
            <>
              {/* Chat Header */}
              <div className="bg-gray-900 border-b border-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                          {selectedChatData.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {selectedChatData.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00E5B4] rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedChatData.name}</h3>
                      <p className="text-sm text-gray-400">
                        {selectedChatData.online ? "En línea" : "Desconectado"} • {selectedChatData.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Service Info Banner */}
              <div className="bg-gradient-to-r from-[#0066FF]/20 to-[#00E5B4]/20 border-b border-gray-800 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#00E5B4]/20 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-[#00E5B4]" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedChatData.service}</p>
                      <p className="text-sm text-gray-400">Mañana, 10:00 AM • Las Condes</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
                    Ver detalles
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.sender === "client"
                          ? "bg-[#0066FF] text-white"
                          : "bg-gray-800 text-white border border-gray-700"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <span className="text-xs opacity-70">{msg.time}</span>
                        {msg.sender === "client" && (
                          <div className="text-xs">
                            {msg.read ? (
                              <CheckCircle2 className="h-3 w-3 text-[#00E5B4]" />
                            ) : (
                              <Circle className="h-3 w-3 opacity-50" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="border-t border-gray-800 p-3">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <MapPin className="h-4 w-4 mr-2" />
                    Ubicación
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Clock className="h-4 w-4 mr-2" />
                    Disponibilidad
                  </Button>
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-800 p-4">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Escribe un mensaje..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="bg-gray-900 border-gray-700 text-white pr-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-400">Selecciona una conversación</h3>
                <p className="text-sm text-gray-500">Elige un chat para comenzar a conversar</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
