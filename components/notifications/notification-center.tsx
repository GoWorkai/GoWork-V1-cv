"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth/auth-provider"
import { notificationsAPI } from "@/lib/notifications"
import {
  Bell,
  X,
  MessageCircle,
  Calendar,
  Star,
  DollarSign,
  AlertCircle,
  Clock,
  Settings,
  BookMarkedIcon as MarkAsRead,
} from "lucide-react"

export function NotificationCenter() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 })

  useEffect(() => {
    if (user && isOpen) {
      loadNotifications()
      loadStats()
    }
  }, [user, isOpen])

  useEffect(() => {
    if (user) {
      // Suscribirse a notificaciones en tiempo real
      const subscription = notificationsAPI.subscribeToNotifications(user.id, (payload) => {
        console.log("Nueva notificación:", payload.new)
        setNotifications((prev) => [payload.new, ...prev])
        setStats((prev) => ({ ...prev, unread: prev.unread + 1, total: prev.total + 1 }))
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [user])

  const loadNotifications = async () => {
    if (!user) return

    setLoading(true)
    try {
      const data = await notificationsAPI.getByUserId(user.id, 20)
      setNotifications(data || [])
    } catch (error) {
      console.error("Error loading notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    if (!user) return

    try {
      const statsData = await notificationsAPI.getStats(user.id)
      setStats(statsData)
    } catch (error) {
      console.error("Error loading notification stats:", error)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)))
      setStats((prev) => ({ ...prev, unread: Math.max(0, prev.unread - 1), read: prev.read + 1 }))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllAsRead = async () => {
    if (!user) return

    try {
      await notificationsAPI.markAllAsRead(user.id)
      setNotifications((prev) => prev.map((n) => ({ ...n, read_at: new Date().toISOString() })))
      setStats((prev) => ({ ...prev, unread: 0, read: prev.total }))
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === "high" || priority === "urgent" ? "text-red-400" : "text-[#0066FF]"

    switch (type) {
      case "payment_received":
      case "payment_sent":
      case "escrow_released":
        return <DollarSign className={`h-4 w-4 ${iconClass}`} />
      case "new_message":
        return <MessageCircle className={`h-4 w-4 ${iconClass}`} />
      case "new_proposal":
      case "proposal_accepted":
      case "project_completed":
        return <Calendar className={`h-4 w-4 ${iconClass}`} />
      case "profile_verified":
        return <Star className={`h-4 w-4 ${iconClass}`} />
      default:
        return <AlertCircle className={`h-4 w-4 ${iconClass}`} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-[#0066FF]/20 text-[#0066FF] border-[#0066FF]/30"
      case "low":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Ahora"
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} h`
    return `Hace ${Math.floor(diffInMinutes / 1440)} días`
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
        {stats.unread > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-[#00E5B4] text-black text-xs flex items-center justify-center">
            {stats.unread > 99 ? "99+" : stats.unread}
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
                  {stats.unread > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-[#00E5B4] hover:text-[#00CC9F]"
                    >
                      <MarkAsRead className="h-3 w-3 mr-1" />
                      Marcar todas
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                  </Button>
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
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                <span>{stats.total} total</span>
                <span>{stats.unread} sin leer</span>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00E5B4] mx-auto"></div>
                  <p className="text-gray-400 mt-2">Cargando...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-400">No tienes notificaciones</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer ${
                      !notification.read_at ? "bg-gray-800/50" : ""
                    }`}
                    onClick={() => !notification.read_at && markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                          {getNotificationIcon(notification.type, notification.priority)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                              {notification.priority && notification.priority !== "medium" && (
                                <Badge className={getPriorityColor(notification.priority)} size="sm">
                                  {notification.priority}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimeAgo(notification.created_at)}</span>
                              </div>
                              {!notification.read_at && <div className="w-2 h-2 bg-[#00E5B4] rounded-full"></div>}
                            </div>
                          </div>
                        </div>

                        {notification.action_url && (
                          <div className="mt-2">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (!notification.read_at) markAsRead(notification.id)
                                // Aquí podrías navegar a la URL
                              }}
                              className="bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs"
                            >
                              Ver Detalles
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
