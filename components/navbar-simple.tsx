"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function NavbarSimple() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
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
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium">Registrarse</Button>
            </Link>

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
                className="text-gray-300 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="/map"
                className="text-gray-300 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Mapa
              </Link>
              <Link
                href="/chat"
                className="text-gray-300 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Chat
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
