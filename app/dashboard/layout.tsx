"use client"

import type React from "react"

import { useState } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { EnhancedSidebar } from "@/components/dashboard/enhanced-sidebar"
import { Button } from "@/components/ui/button"
import { Bell, Search, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <EnhancedSidebar isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar servicios, proveedores, o pregúntale a Gow..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4 ml-6">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
              </Button>

              {/* Messages */}
              <Link href="/dashboard/messages">
                <Button variant="ghost" size="sm" className="relative">
                  <MessageSquare className="h-5 w-5 text-gray-600" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-blue-500 text-white text-xs flex items-center justify-center">
                    2
                  </Badge>
                </Button>
              </Link>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name || "Usuario"}</p>
                  <p className="text-xs text-gray-500">
                    {user?.userType === "admin"
                      ? "Administrador"
                      : user?.userType === "provider"
                        ? "Proveedor"
                        : user?.userType === "both"
                          ? "Cliente & Proveedor"
                          : "Cliente"}
                  </p>
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-green-500 text-white">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AuthProvider>
  )
}
