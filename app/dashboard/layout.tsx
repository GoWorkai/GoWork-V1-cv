"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { GoWorkLogo } from "@/components/gowork-logo"
import {
  Home,
  MessageSquare,
  Calendar,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Briefcase,
  Star,
  Clock,
  Users,
  Map,
  BarChart,
  AlertTriangle,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userRole, setUserRole] = useState<"client" | "provider" | "admin" | "both">("client")
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (user?.userType) {
      setUserRole(user.userType)
    }
  }, [user])

  // Determinar qué menú mostrar según el rol
  const getMenuItems = () => {
    if (userRole === "admin") {
      return [
        { id: "users", label: "Usuarios", icon: Users },
        { id: "services", label: "Servicios", icon: Briefcase },
        { id: "zones", label: "Zonas geográficas", icon: Map },
        { id: "reports", label: "Reportes y métricas", icon: BarChart },
        { id: "moderation", label: "Moderación & alertas", icon: AlertTriangle },
      ]
    } else if (userRole === "provider" || userRole === "both") {
      return [
        { id: "home", label: "Inicio", icon: Home },
        { id: "my-services", label: "Mis servicios", icon: Briefcase, badge: 2 },
        { id: "requests", label: "Solicitudes recibidas", icon: Bell, badge: 5 },
        { id: "calendar", label: "Calendario", icon: Calendar },
        { id: "profile", label: "Perfil y reputación", icon: Star },
        { id: "ai-tools", label: "Herramientas IA", icon: Zap },
      ]
    } else {
      // Cliente por defecto
      return [
        { id: "home", label: "Inicio", icon: Home },
        { id: "explore", label: "Explorar servicios", icon: Search },
        { id: "activity", label: "Mi actividad", icon: Clock, badge: 2 },
        { id: "chat", label: "Chat asistente", icon: MessageSquare },
        { id: "profile", label: "Perfil & configuración", icon: User },
      ]
    }
  }

  const menuItems = getMenuItems()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007bff] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // El useEffect se encargará de la redirección
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 mr-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <GoWorkLogo size={32} showText={true} />
          <Badge variant="outline" className="ml-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600">
            {userRole === "admin"
              ? "Admin"
              : userRole === "provider"
                ? "Proveedor"
                : userRole === "both"
                  ? "Dual"
                  : "Cliente"}
          </Badge>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          <div className="hidden md:flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.avatar || "/placeholder.svg?height=32&width=32&text=U"}
                alt={user?.name || "Usuario"}
              />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{user?.name || "Usuario"}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-white border-r border-gray-200 w-64 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            "lg:translate-x-0 fixed lg:static inset-y-0 z-50 pt-16 lg:pt-0",
          )}
        >
          <div className="p-4 flex-1 overflow-y-auto">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    router.push(`/dashboard/${item.id}`)
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeTab === item.id
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200">{item.badge}</Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user?.avatar || "/placeholder.svg?height=40&width=40&text=U"}
                  alt={user?.name || "Usuario"}
                />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "Usuario"}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || "usuario@gowork.com"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-gray-700"
                onClick={() => router.push("/dashboard/settings")}
              >
                <Settings size={16} className="mr-2" />
                Configuración
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-gray-700"
                onClick={() => logout()}
              >
                <LogOut size={16} className="mr-2" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
