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

      {/* Sidebar - Más angosto y estilizado */}
      <div
        className={`${isCollapsed ? "w-16" : "w-20"} ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:relative h-screen bg-gray-900/98 backdrop-blur-xl border-r border-gray-700/50 flex flex-col transition-all duration-300 z-50 shadow-2xl`}
      >
        {/* Header - Más compacto */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-center">
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Logo siempre centrado y compacto */}
            <div className="flex flex-col items-center space-y-2">
              <GoWorkLogo size={28} className="text-white" showText={false} />
              {!isCollapsed && (
                <div className="text-center">
                  <span className="text-xs font-bold text-white block">
                    <span className="text-[#007bff]">Go</span>
                    <span className="text-[#FFA500]">Work</span>
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Button - Más pequeño */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block absolute bottom-2 right-2 p-1 text-gray-500 hover:text-white rounded-md hover:bg-gray-800/50 transition-colors"
            >
              <Menu className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Navigation - Más compacta */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileOpen(false)
                }}
                className={`w-full flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 relative group ${
                  activeTab === item.id
                    ? "bg-gradient-to-br from-[#007bff] to-[#0056b3] text-white shadow-lg scale-105"
                    : "hover:bg-gray-800/60 text-gray-400 hover:text-white hover:scale-105"
                }`}
                title={item.label}
              >
                <IconComponent className="h-5 w-5 flex-shrink-0 mb-1" />
                <span className="text-[10px] font-medium leading-tight text-center">{item.label}</span>

                {item.highlight && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-[#FFA500] rounded-full animate-pulse"></div>
                )}

                {/* Tooltip para estado colapsado */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom Navigation - Más compacta */}
        <div className="p-2 space-y-1 border-t border-gray-700/50">
          {bottomItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsMobileOpen(false)
                }}
                className={`w-full flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 relative group ${
                  activeTab === item.id
                    ? "bg-gradient-to-br from-[#007bff] to-[#0056b3] text-white shadow-lg"
                    : "hover:bg-gray-800/60 text-gray-500 hover:text-white hover:scale-105"
                }`}
                title={item.label}
              >
                <IconComponent className="h-4 w-4 flex-shrink-0 mb-1" />
                <span className="text-[9px] font-medium leading-tight text-center">{item.label}</span>

                {/* Tooltip para estado colapsado */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* User Profile - Más compacto */}
        <div className="p-2 border-t border-gray-700/50">
          <button className="w-full flex flex-col items-center justify-center p-3 hover:bg-gray-800/60 rounded-xl transition-all duration-200 group hover:scale-105">
            <div className="w-6 h-6 bg-gradient-to-br from-[#007bff] to-[#0056b3] rounded-full flex items-center justify-center text-white text-xs font-bold mb-1">
              G
            </div>
            <div className="text-center">
              <div className="text-[9px] font-medium text-white leading-tight">Invitado</div>
              <div className="text-[8px] text-gray-500 leading-tight">Crear cuenta</div>
            </div>

            {/* Tooltip para estado colapsado */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Invitado - Crear cuenta
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
