"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search, Bell, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isLoggedIn = true // Simulación de estado de autenticación

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">GoWork</span>
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-6">
              <Link href="/servicios" className="text-gray-700 hover:text-blue-600">
                Servicios
              </Link>
              <Link href="/categorias" className="text-gray-700 hover:text-blue-600">
                Categorías
              </Link>
              <Link href="/como-funciona" className="text-gray-700 hover:text-blue-600">
                Cómo Funciona
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon">
                  <Search size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageSquare size={20} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuario" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/perfil" className="flex w-full">
                        Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/mis-servicios" className="flex w-full">
                        Mis Servicios
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/mensajes" className="flex w-full">
                        Mensajes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/iniciar-sesion">
                  <Button variant="ghost">Iniciar Sesión</Button>
                </Link>
                <Link href="/registro">
                  <Button>Registrarse</Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/servicios"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Servicios
            </Link>
            <Link
              href="/categorias"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Categorías
            </Link>
            <Link
              href="/como-funciona"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Cómo Funciona
            </Link>
          </div>

          {isLoggedIn ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Usuario" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Usuario Demo</div>
                  <div className="text-sm font-medium text-gray-500">usuario@gowork.com</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  href="/perfil"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Perfil
                </Link>
                <Link
                  href="/mis-servicios"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Mis Servicios
                </Link>
                <Link
                  href="/mensajes"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Mensajes
                </Link>
                <button className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 px-5 flex flex-col space-y-2">
              <Link href="/iniciar-sesion" className="w-full">
                <Button variant="outline" className="w-full">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/registro" className="w-full">
                <Button className="w-full">Registrarse</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
