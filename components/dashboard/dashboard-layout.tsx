"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { GoWorkLogo } from "@/components/gowork-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Home,
  Search,
  Plus,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Star,
  Briefcase,
  DollarSign,
  Calendar,
  Shield,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "explore", label: "Explorar", icon: Search },
    { id: "my-services", label: "Mis Servicios", icon: Briefcase },
    { id: "create", label: "Crear", icon: Plus },
    { id: "messages", label: "Mensajes", icon: MessageCircle, badge: 3 },
    { id: "calendar", label: "Calendario", icon: Calendar },
    { id: "earnings", label: "Ganancias", icon: DollarSign },
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <GoWorkLogo size={40} showText={true} />
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servicios, profesionales..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007bff] focus:border-transparent"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>

            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || "/placeholder.svg?height=40&width=40&text=U"}
                alt={user?.name}
                className="w-10 h-10 rounded-full border-2 border-gray-200"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.userType}</p>
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-50 w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300`}
        >
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-end p-4">
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600 hover:text-gray-900">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-4">
            <Card className="bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={user?.avatar || "/placeholder.svg?height=50&width=50&text=U"}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm opacity-90 capitalize">{user?.userType}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-300 fill-current" />
                    <span>{user?.rating || "0.0"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{user?.completedJobs || 0} trabajos</span>
                  </div>
                  {user?.verified && (
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4 text-green-300" />
                      <span>Verificado</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <nav className="px-4 pb-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id ? "bg-[#007bff] text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "settings" ? "bg-[#007bff] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Configuración</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
