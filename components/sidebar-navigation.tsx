"use client"

import { useState } from "react"
import { GoWorkLogo } from "@/components/gowork-logo"
import {
  Home,
  Search,
  Plus,
  FolderOpen,
  Layout,
  Palette,
  Sparkles,
  Grid3X3,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react"

interface SidebarNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function SidebarNavigation({ activeTab, setActiveTab }: SidebarNavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const sidebarItems = [
    { icon: Home, label: "Inicio", id: "inicio" },
    { icon: Search, label: "Explorar", id: "explorar" },
    { icon: Plus, label: "Crear", id: "crear" },
    { icon: FolderOpen, label: "Mis Servicios", id: "servicios" },
    { icon: Layout, label: "Plantillas", id: "plantillas" },
    { icon: Palette, label: "Mi Marca", id: "marca" },
    { icon: Sparkles, label: "Gow IA", id: "ia", highlight: true },
    { icon: Grid3X3, label: "Apps", id: "apps" },
  ]

  const bottomItems = [
    { icon: Settings, label: "Configuración", id: "settings" },
    { icon: HelpCircle, label: "Ayuda", id: "help" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gray-800/90 backdrop-blur-sm text-white rounded-xl border border-gray-700"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${isCollapsed ? "w-20" : "w-72"} ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:relative h-screen bg-gray-900/95 backdrop-blur-xl border-r border-gray-700 flex flex-col transition-all duration-300 z-50`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className={`${isCollapsed ? "hidden" : "block"}`}>
              <GoWorkLogo size={40} className="text-white" showText={true} />
            </div>
            <div className={`${isCollapsed ? "mx-auto" : "hidden"}`}>
              <GoWorkLogo size={32} className="text-white" showText={false} />
            </div>

            {/* Mobile Close Button */}
            <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>

            {/* Desktop Collapse Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileOpen(false)
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 relative group ${
                  activeTab === item.id
                    ? "bg-[#007bff] text-white shadow-lg"
                    : "hover:bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                <IconComponent className="h-5 w-5 flex-shrink-0" />
                <span className={`${isCollapsed ? "hidden" : "block"} text-sm font-medium`}>{item.label}</span>
                {item.highlight && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#FFA500] rounded-full animate-pulse"></div>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </div>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 space-y-2 border-t border-gray-700">
          {bottomItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileOpen(false)
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 relative group ${
                  activeTab === item.id ? "bg-[#007bff] text-white" : "hover:bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <IconComponent className="h-5 w-5 flex-shrink-0" />
                <span className={`${isCollapsed ? "hidden" : "block"} text-sm font-medium`}>{item.label}</span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-xl transition-colors group">
            <div className="w-8 h-8 bg-gradient-to-br from-[#007bff] to-[#0056b3] rounded-full flex items-center justify-center text-white text-sm font-bold">
              G
            </div>
            <div className={`${isCollapsed ? "hidden" : "block"} text-left`}>
              <div className="text-sm font-medium text-white">Invitado</div>
              <div className="text-xs text-gray-400">Crear cuenta</div>
            </div>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Invitado - Crear cuenta
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
