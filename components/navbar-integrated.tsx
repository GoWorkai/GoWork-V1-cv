"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, MessageCircle, Bell, Menu, X, Home, Briefcase, MapPin, Settings, LogOut } from "lucide-react"
import { useState } from "react"

export function NavbarIntegrated() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simular estado de login

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-[#0066FF]">Go</span>
              <span className="text-[#00E5B4]">Work</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/servicios" className="text-gray-300 hover:text-white transition-colors">
              Servicios
            </Link>
            <Link href="/map" className="text-gray-300 hover:text-white transition-colors">
              Mapa
            </Link>
            <Link href="/chat" className="text-gray-300 hover:text-white transition-colors">
              Chat
            </Link>
            {isLoggedIn && (
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-[#00E5B4] text-black text-xs">3</Badge>
                </Button>

                {/* Messages */}
                <Link href="/chat">
                  <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
                    <MessageCircle className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-[#0066FF] text-white text-xs">2</Badge>
                  </Button>
                </Link>

                {/* Profile Menu */}
                <div className="relative">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/onboarding">
                  <Button className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium">Registrarse</Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/servicios"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Briefcase className="h-5 w-5" />
                <span>Servicios</span>
              </Link>
              <Link
                href="/map"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin className="h-5 w-5" />
                <span>Mapa</span>
              </Link>
              <Link
                href="/chat"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat</span>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Configuración</span>
                  </Link>
                  <button
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                    onClick={() => {
                      setIsLoggedIn(false)
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar sesión</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-800">
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white">
                      Iniciar sesión
                    </Button>
                  </Link>
                  <Link href="/onboarding" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium">
                      Registrarse
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
