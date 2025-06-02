"use client"

import { useState } from "react"
import {
  Sparkles,
  Mic,
  Send,
  Menu,
  Bookmark,
  Grid3X3,
  Search,
  CheckCircle,
  Plus,
  X,
  MapPin,
  Droplets,
  Thermometer,
  Cloud,
  Youtube,
  Mail,
  MessageCircle,
  Phone,
  Twitter,
  Users,
  Zap,
  Target,
  TrendingUp,
  Settings,
  User,
} from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: "Reunión Matías Lunes", completed: true },
    { id: 2, text: "Revisar propuestas", completed: false },
  ])

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: "#7DD3FC" }}>
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Menu className="h-5 w-5 text-white" />
        </button>
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">GoWork</h1>
          <div className="flex space-x-3">
            <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Bookmark className="h-5 w-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Grid3X3 className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        {/* To Do List Widget */}
        <div className="md:col-span-3 bg-white/80 backdrop-blur-sm rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">To Do List</h3>
          <div className="space-y-3">
            {todoItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <button
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    item.completed ? "bg-teal-500" : "bg-gray-200"
                  }`}
                >
                  {item.completed && <CheckCircle className="h-4 w-4 text-white" />}
                </button>
                <span className={`text-sm ${item.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                  {item.text}
                </span>
                {item.completed && (
                  <button className="ml-auto">
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
            ))}
            <div className="flex items-center space-x-3 mt-4">
              <button className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                <Plus className="h-4 w-4 text-white" />
              </button>
              <input
                type="text"
                placeholder="Add task..."
                className="text-sm bg-transparent border-none outline-none text-gray-600 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* GoWork Status Widget */}
        <div className="md:col-span-5 bg-white/80 backdrop-blur-sm rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Estado GoWork</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-teal-500 rounded-2xl p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Droplets className="h-4 w-4" />
                <span className="text-sm font-medium">Actividad 85%</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="h-4 w-4 text-teal-500" />
                <span className="text-sm text-gray-600">15 - 25 proyectos</span>
              </div>
            </div>
            <div className="bg-teal-600 rounded-2xl p-4 text-white col-span-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Santiago, Chile</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Widget */}
        <div className="md:col-span-4 bg-white/60 backdrop-blur-sm rounded-full p-8 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">95%</div>
          <Cloud className="h-12 w-12 text-gray-400 mb-2" />
          <div className="text-sm text-gray-600 text-center">Satisfacción Cliente</div>
        </div>
      </div>

      {/* Gow IA Assistant - Posición Hero */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="md:col-span-8 bg-gray-900 rounded-3xl p-6 text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mr-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Gow IA Assistant</h3>
              <p className="text-sm opacity-70">Asistente Inteligente de GoWork</p>
            </div>
          </div>

          <p className="opacity-80 text-sm mb-6">
            Conversa conmigo para encontrar servicios, analizar precios, optimizar tu perfil y descubrir oportunidades
          </p>

          {/* Barra de búsqueda IA */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="¿Qué servicio necesitas? Pregúntame cualquier cosa sobre GoWork..."
              className="w-full rounded-2xl py-4 px-6 pr-24 text-white placeholder-white/70 focus:outline-none bg-white/10 border border-white/20"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button className="p-2 opacity-70 hover:opacity-100">
                <Mic size={20} />
              </button>
              <button className="p-3 bg-teal-500 rounded-full hover:bg-teal-600 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Botones de acción rápida */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { emoji: "🔍", label: "Buscar servicios", icon: Search },
              { emoji: "👤", label: "Optimizar perfil", icon: User },
              { emoji: "💰", label: "Analizar precios", icon: TrendingUp },
              { emoji: "💡", label: "Ideas de negocio", icon: Target },
            ].map((item, index) => (
              <button
                key={index}
                className="bg-white/10 rounded-2xl p-4 flex flex-col items-center space-y-3 transition-colors hover:bg-white/20"
              >
                <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-center">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs opacity-60">
            <span>🤖 Potenciado por Google Gemini + Base de Conocimiento GoWork</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center">
        {/* AI Tools */}
        <button className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center space-x-3">
          <Zap className="h-5 w-5 text-teal-500" />
          <span className="font-medium text-gray-800">AI Tools</span>
        </button>

        {/* App Icons */}
        <div className="flex space-x-4">
          {[
            { icon: Youtube, color: "bg-red-500" },
            { icon: Mail, color: "bg-blue-500" },
            { icon: MessageCircle, color: "bg-teal-500" },
            { icon: Phone, color: "bg-green-500" },
            { icon: Twitter, color: "bg-blue-400" },
            { icon: Users, color: "bg-purple-500" },
            { icon: Target, color: "bg-orange-500" },
            { icon: Settings, color: "bg-gray-500" },
          ].map((app, index) => (
            <button
              key={index}
              className={`w-12 h-12 ${app.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform`}
            >
              <app.icon className="h-6 w-6" />
            </button>
          ))}
        </div>

        {/* Profile/Settings */}
        <button className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
          <User className="h-8 w-8" />
        </button>
      </div>
    </div>
  )
}
