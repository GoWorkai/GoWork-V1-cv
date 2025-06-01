"use client"

import {
  Plus,
  Home,
  FolderOpen,
  Layout,
  Palette,
  Sparkles,
  Grid3X3,
  Bell,
  Mic,
  ArrowRight,
  ImageIcon,
  FileText,
  Code,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function GoWorkDashboard() {
  const [activeTab, setActiveTab] = useState("ia")
  const [showBanner, setShowBanner] = useState(true)

  const sidebarItems = [
    { icon: Plus, label: "Crear", active: true },
    { icon: Home, label: "Inicio" },
    { icon: FolderOpen, label: "Proyectos" },
    { icon: Layout, label: "Plantillas" },
    { icon: Palette, label: "Marca" },
    { icon: Sparkles, label: "GoWork IA", highlight: true },
    { icon: Grid3X3, label: "Apps" },
  ]

  const aiCapabilities = [
    {
      title: "Generar servicios",
      description: "Un fontanero que repara tuberías sobre el fondo de un ambiente moderno",
      image: "/placeholder.svg?height=120&width=200&text=Fontanero",
      color: "bg-gradient-to-br from-orange-400 to-red-500",
    },
    {
      title: "Programar",
      description: "Una calculadora de precios interactiva que pueda compartir con...",
      image: "/placeholder.svg?height=120&width=200&text=Calculadora",
      color: "bg-gradient-to-br from-blue-400 to-purple-500",
    },
    {
      title: "Escribir",
      description: "Un post para un blog sobre el cuidado de las plantas de interior",
      image: "/placeholder.svg?height=120&width=200&text=Blog",
      color: "bg-gradient-to-br from-cyan-400 to-blue-500",
    },
    {
      title: "Generar imágenes",
      description: "Un envase simple para el cuidado de la piel sobre un fondo de...",
      image: "/placeholder.svg?height=120&width=200&text=Producto",
      color: "bg-gradient-to-br from-gray-300 to-gray-400",
    },
    {
      title: "Escribir",
      description: "Un blog sobre tendencias de moda sostenible",
      image: "/placeholder.svg?height=120&width=200&text=Moda",
      color: "bg-gradient-to-br from-cyan-400 to-purple-500",
    },
    {
      title: "Programar",
      description: "Una línea de tiempo histórica interactiva.",
      image: "/placeholder.svg?height=120&width=200&text=Timeline",
      color: "bg-gradient-to-br from-blue-400 to-cyan-400",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-yellow-200/30 to-orange-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-20 w-20 h-20 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-full blur-xl"></div>
      </div>

      {/* Top Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white px-6 py-3 relative z-10">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">
                🔥 Prueba GoWork Pro por 30 días y descubre todos los lanzamientos de GoWork Create.
                <button className="underline ml-1 hover:no-underline">Empezar</button>
              </span>
            </div>
            <button onClick={() => setShowBanner(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="w-20 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 min-h-screen flex flex-col items-center py-6 relative z-10">
          <div className="mb-8">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18m-9 9V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 space-y-4">
            {sidebarItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div key={index} className="relative">
                  <button
                    className={`p-3 rounded-xl transition-all duration-200 relative group ${
                      item.active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                    {item.highlight && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                    )}
                  </button>
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </div>
                </div>
              )
            })}
          </nav>

          <div className="space-y-4">
            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors text-gray-600">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                G
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 relative z-10">
          {/* Header Actions */}
          <div className="flex justify-end mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-gray-200">
                <Sparkles className="h-4 w-4 mr-2" />
                Iniciar mi prueba gratis
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Grid3X3 className="h-4 w-4 mr-2" />
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              ¿Qué{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                crearemos
              </span>{" "}
              hoy?
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-6 bg-white/60 backdrop-blur-sm rounded-full p-2 border border-gray-200/50">
              <button
                onClick={() => setActiveTab("diseños")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "diseños" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                📁 Mis servicios
              </button>
              <button
                onClick={() => setActiveTab("plantillas")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "plantillas" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                📋 Plantillas
              </button>
              <button
                onClick={() => setActiveTab("ia")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
                  activeTab === "ia" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                ✨ GoWork IA
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  Nuevo
                </span>
              </button>
            </div>
          </div>

          {/* AI Search Box */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
              <CardContent className="p-8">
                <div className="relative">
                  <Input
                    placeholder="Describe tu idea, y yo la haré realidad"
                    className="text-lg py-6 pl-6 pr-20 border-0 bg-transparent focus:ring-0 placeholder:text-gray-400"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Mic className="h-5 w-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-200/50">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg transition-colors">
                    <ImageIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Crear un servicio</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg transition-colors">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Escribir un perfil</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg transition-colors">
                    <Code className="h-4 w-4" />
                    <span className="text-sm font-medium">Programar por mí</span>
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500 mt-4">
                  GoWork IA no es una herramienta perfecta. Corrobora la precisión de sus resultados.{" "}
                  <button className="text-blue-600 hover:underline">Ver las condiciones</button> •{" "}
                  <button className="text-blue-600 hover:underline">Agregar un comentario</button>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Capabilities Section */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Descubre lo que puedes hacer con la IA</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiCapabilities.map((capability, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-gray-200/50 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm font-semibold text-gray-700">{capability.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{capability.description}</p>
                    </div>
                    <div className={`h-24 ${capability.color} relative overflow-hidden`}>
                      <img
                        src={capability.image || "/placeholder.svg"}
                        alt={capability.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
