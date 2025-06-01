"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import {
  Home,
  Search,
  Calendar,
  MessageSquare,
  History,
  Heart,
  MapPin,
  Brain,
  Settings,
  HelpCircle,
  CreditCard,
  Briefcase,
  Users,
  BarChart3,
  Shield,
  Bell,
  Plus,
  Star,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface EnhancedSidebarProps {
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function EnhancedSidebar({ isCollapsed = false, onToggleCollapse }: EnhancedSidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Navegación según el rol del usuario
  const getNavigationItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: Home,
        badge: null,
      },
    ]

    if (user?.userType === "admin") {
      return [
        ...baseItems,
        {
          title: "Usuarios",
          href: "/dashboard/users",
          icon: Users,
          badge: "2.5k",
        },
        {
          title: "Servicios",
          href: "/dashboard/services",
          icon: Briefcase,
          badge: "1.1k",
        },
        {
          title: "Métricas",
          href: "/dashboard/analytics",
          icon: BarChart3,
          badge: null,
        },
        {
          title: "Moderación",
          href: "/dashboard/moderation",
          icon: Shield,
          badge: "12",
        },
        {
          title: "Zonas",
          href: "/dashboard/zones",
          icon: MapPin,
          badge: null,
        },
        {
          title: "Reportes",
          href: "/dashboard/reports",
          icon: Activity,
          badge: null,
        },
      ]
    } else if (user?.userType === "provider" || user?.userType === "both") {
      return [
        ...baseItems,
        {
          title: "Mis servicios",
          href: "/dashboard/my-services",
          icon: Briefcase,
          badge: "8",
        },
        {
          title: "Solicitudes",
          href: "/dashboard/requests",
          icon: Bell,
          badge: "5",
        },
        {
          title: "Calendario",
          href: "/dashboard/calendar",
          icon: Calendar,
          badge: null,
        },
        {
          title: "Mensajes",
          href: "/dashboard/messages",
          icon: MessageSquare,
          badge: "3",
        },
        {
          title: "Mi perfil",
          href: "/dashboard/profile",
          icon: Star,
          badge: null,
        },
        {
          title: "Herramientas IA",
          href: "/dashboard/ai-tools",
          icon: Brain,
          badge: "Nuevo",
        },
      ]
    } else {
      // Cliente
      return [
        ...baseItems,
        {
          title: "Explorar",
          href: "/dashboard/explore",
          icon: Search,
          badge: "24",
        },
        {
          title: "Mis reservas",
          href: "/dashboard/bookings",
          icon: Calendar,
          badge: "2",
        },
        {
          title: "Mensajes",
          href: "/dashboard/messages",
          icon: MessageSquare,
          badge: "1",
        },
        {
          title: "Historial",
          href: "/dashboard/history",
          icon: History,
          badge: null,
        },
        {
          title: "Favoritos",
          href: "/dashboard/favorites",
          icon: Heart,
          badge: "8",
        },
        {
          title: "Mapa",
          href: "/dashboard/map",
          icon: MapPin,
          badge: null,
        },
        {
          title: "Asistente IA",
          href: "/dashboard/ai-assistant",
          icon: Brain,
          badge: "Gow",
        },
      ]
    }
  }

  const quickActions = [
    {
      title: "Pagos",
      href: "/dashboard/payments",
      icon: CreditCard,
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Ayuda",
      href: "/dashboard/help",
      icon: HelpCircle,
    },
  ]

  const navigationItems = getNavigationItems()

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
  }

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">GoWork</h2>
                <p className="text-xs text-gray-500">
                  {user?.userType === "admin"
                    ? "Admin Panel"
                    : user?.userType === "provider"
                      ? "Panel Proveedor"
                      : "Mi Dashboard"}
                </p>
              </div>
            </div>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="p-1 h-8 w-8 text-gray-400 hover:text-gray-600"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-green-500 text-white">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{user?.name || "Usuario"}</h3>
              <p className="text-sm text-gray-500 truncate">
                {user?.userType === "admin"
                  ? "Administrador"
                  : user?.userType === "provider"
                    ? "Proveedor"
                    : user?.userType === "both"
                      ? "Cliente & Proveedor"
                      : "Cliente"}
              </p>
              {user?.verified && (
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Verificado</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive(item.href)
                    ? "bg-gradient-to-r from-blue-600 to-green-500 text-white"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                } ${isCollapsed ? "px-2" : "px-3"}`}
              >
                <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge
                        className={`ml-2 ${
                          isActive(item.href)
                            ? "bg-white/20 text-white"
                            : item.badge === "Nuevo"
                              ? "bg-green-100 text-green-800"
                              : item.badge === "Gow"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="pt-4 mt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Acceso rápido</h4>
            <div className="space-y-1">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <action.icon className="h-4 w-4 mr-3" />
                    {action.title}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        {!isCollapsed && (
          <div className="pt-4">
            {user?.userType === "provider" || user?.userType === "both" ? (
              <Button className="w-full bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo servicio
              </Button>
            ) : user?.userType === "admin" ? (
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver métricas
              </Button>
            ) : (
              <Button className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white">
                <Search className="h-4 w-4 mr-2" />
                Buscar servicios
              </Button>
            )}
          </div>
        )}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            Cerrar sesión
          </Button>
        </div>
      )}
    </aside>
  )
}
