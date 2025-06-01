"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, MapPin, Search, Home } from "lucide-react"
import Link from "next/link"

export function QuickNav() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-3 shadow-2xl">
        <div className="grid grid-cols-2 gap-2">
          <Link href="/chat">
            <Button
              size="sm"
              variant="ghost"
              className="w-full flex flex-col items-center space-y-1 h-16 text-gray-300 hover:text-white hover:bg-gray-800 relative"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs">Chat</span>
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 bg-[#00E5B4] text-black text-xs flex items-center justify-center">
                2
              </Badge>
            </Button>
          </Link>

          <Link href="/map">
            <Button
              size="sm"
              variant="ghost"
              className="w-full flex flex-col items-center space-y-1 h-16 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <MapPin className="h-5 w-5" />
              <span className="text-xs">Mapa</span>
            </Button>
          </Link>

          <Link href="/servicios">
            <Button
              size="sm"
              variant="ghost"
              className="w-full flex flex-col items-center space-y-1 h-16 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
              <span className="text-xs">Buscar</span>
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              size="sm"
              variant="ghost"
              className="w-full flex flex-col items-center space-y-1 h-16 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs">Inicio</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuickNav
