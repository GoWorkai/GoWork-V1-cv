"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, X, MessageCircle, Calendar, Star, DollarSign, AlertCircle, Clock } from "lucide-react"

interface Notification {
  id: number
  type: "message" | "booking" | "payment" | "review" | "system"
  title: string
  message: string
  time: string
  read: boolean
  avatar?: string
  action?: {
    label: string
    href: string
  }
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "message",
      title: "Nuevo mensaje de Juan Martínez",
      message: "La visita es gratuita si decides trabajar conmigo...",
      time: "Hace 5 min",
      read: false,
      avatar: "JM",
      action: { label: "Responder", href: "/chat" },
    },
    {
      id: 2,
      type: "booking",
      title: "Reserva confirmada",
      message: "Tu servicio de instalación eléctrica ha sido confirmado para mañana a las 10:00 AM",
      time: "Hace 15 min",
      read: false,
      action: { label: "Ver detalles", href: "/dashboard" },
    },
    {
      id: 3,
      type: "payment",
      title: "Pago procesado",
      message: "Se ha procesado tu pago de $160.000 para el servicio de Juan Martínez",
      time: "Hace 1 hora",
      read: true,
    },
    {
      id: 4,
      type: "review",
      title: "Nueva reseña recibida",
      message: "Carlos López te ha dejado una reseña de 5 estrellas",
      time: "Hace 2 horas",
      read: false,
      avatar: "CL",
      action: { label: "Ver reseña", href: "/provider-dashboard" },
    },
    {
      id: 5,
      type: "system",
      title: "Perfil verificado",
      message: "Tu perfil ha sido verificado exitosamente. Ahora puedes recibir más solicitudes",
      time: "Hace 1 día",
      read: true,
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-4 w-4 text-[#0066FF]" />
      case "booking":
        return <Calendar className="h-4 w-4 text-[#00E5B4]" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-[#FF6D3A]" />
      case "review":
        return <Star className="h-4 w-4 text-yellow-400" />
      case "system":
        return <AlertCircle className="h-4 w-4 text-[#B297FF]" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="text-gray-400 hover:text-white relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-[#00E5B4] text-black text-xs flex items-center justify-center">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-12 w-96 bg-gray-900 border-gray-700 z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notificaciones</h3>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-[#00E5B4] hover:text-[#00CC9F]"
                    >
                      Marcar todas como leídas
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400">No tienes notificaciones</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors ${
                      !notification.read ? "bg-gray-800/50" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white text-xs">
                              {notification.avatar}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white mb-1">{notification.title}</h4>
                            <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{notification.time}</span>
                              </div>
                              {!notification.read && <div className="w-2 h-2 bg-[#00E5B4] rounded-full"></div>}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                            className="text-gray-400 hover:text-white ml-2"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>

                        {notification.action && (
                          <div className="mt-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                markAsRead(notification.id)
                                setIsOpen(false)
                              }}
                              className="bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs"
                            >
                              {notification.action.label}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

export default NotificationCenter
