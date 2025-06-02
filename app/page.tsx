"use client"

import { useState } from "react"
import { Sparkles, Mic, Send } from "lucide-react"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#D1E5D9" }}>
      {/* Indicador de versión NUEVO para verificar que carga */}
      <div
        className="fixed top-4 right-4 px-4 py-2 rounded-full text-sm font-bold z-50"
        style={{ backgroundColor: "#1EE2AA", color: "#1A1C1B" }}
      >
        ✅ NUEVA VERSIÓN BENTO GRID - {new Date().toLocaleTimeString()}
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header simplificado */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mr-2"
              style={{ backgroundColor: "#1EE2AA" }}
            >
              <span className="font-bold" style={{ color: "#1A1C1B" }}>
                G
              </span>
            </div>
            <span className="font-bold text-xl" style={{ color: "#1A1C1B" }}>
              GoWork
            </span>
          </div>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 border rounded-lg transition-colors"
              style={{
                borderColor: "#1A1C1B",
                color: "#1A1C1B",
              }}
            >
              Iniciar sesión
            </button>
            <button
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: "#1EE2AA",
                color: "#1A1C1B",
              }}
            >
              Registrarse
            </button>
          </div>
        </header>

        {/* Bento Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* BLOQUE 1: Búsqueda IA - Prioridad máxima */}
          <div
            className="md:col-span-6 md:row-span-2 rounded-3xl p-6 text-white"
            style={{ backgroundColor: "#1A1C1B" }}
          >
            <div className="flex items-center mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: "#1EE2AA" }}
              >
                <Sparkles className="h-5 w-5" style={{ color: "#1A1C1B" }} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Gow IA Assistant</h3>
                <p className="text-sm opacity-70">Asistente Inteligente de GoWork</p>
              </div>
            </div>

            <p className="opacity-80 text-sm mb-4">
              Conversa conmigo para encontrar servicios, analizar precios, optimizar tu perfil y descubrir oportunidades
            </p>

            {/* Barra de búsqueda principal */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué servicio necesitas? Pregúntame cualquier cosa sobre GoWork..."
                className="w-full rounded-2xl py-3 px-4 pr-20 text-white placeholder-white focus:outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button className="p-2 opacity-70 hover:opacity-100">
                  <Mic size={18} />
                </button>
                <button className="p-2 rounded-full" style={{ backgroundColor: "#1EE2AA", color: "#1A1C1B" }}>
                  <Send size={18} />
                </button>
              </div>
            </div>

            {/* Botones de acción rápida */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { emoji: "🔍", label: "Buscar servicios" },
                { emoji: "👤", label: "Optimizar perfil" },
                { emoji: "💰", label: "Analizar precios" },
                { emoji: "💡", label: "Ideas de negocio" },
              ].map((item, index) => (
                <button
                  key={index}
                  className="rounded-xl p-3 flex flex-col items-center space-y-2 transition-colors hover:bg-white hover:bg-opacity-20"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#1EE2AA" }}
                  >
                    <span className="text-sm">{item.emoji}</span>
                  </div>
                  <span className="text-xs text-center">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs opacity-60">
              <span>🤖 Potenciado por Google Gemini + Base de Conocimiento GoWork</span>
            </div>
          </div>

          {/* BLOQUE 2: Logo principal */}
          <div
            className="md:col-span-6 md:row-span-2 rounded-3xl p-6 flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: "#1EE2AA" }}
          >
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1A1C1B" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="#1A1C1B" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="20" stroke="#1A1C1B" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <h1 className="text-6xl md:text-8xl font-bold" style={{ color: "#1A1C1B" }}>
                GoWork
              </h1>
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mt-4"
                style={{ backgroundColor: "#1A1C1B" }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: "#1EE2AA" }}
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <p className="mt-4 font-medium" style={{ color: "#1A1C1B" }}>
                La Red Social del Talento
              </p>
            </div>
          </div>

          {/* BLOQUE 3: Estadísticas */}
          <div className="md:col-span-3 rounded-3xl p-6 text-white" style={{ backgroundColor: "#2260DD" }}>
            <h3 className="text-xl font-bold mb-2">Estadísticas</h3>
            <div className="text-3xl font-bold mb-1">15K+</div>
            <p className="opacity-80 text-sm">Usuarios activos</p>
          </div>

          {/* BLOQUE 4: Categorías */}
          <div className="md:col-span-3 rounded-3xl p-6" style={{ backgroundColor: "#E0E020" }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: "#1A1C1B" }}>
              Categorías
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {["Diseño", "Desarrollo", "Marketing", "Educación"].map((category) => (
                <div
                  key={category}
                  className="p-2 rounded-lg text-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  <span className="text-xs font-medium" style={{ color: "#1A1C1B" }}>
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BLOQUES DE COLORES */}
          <div
            className="md:col-span-2 rounded-3xl p-4 flex items-center justify-center"
            style={{ backgroundColor: "#D1E5D9" }}
          >
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider mb-1 opacity-60" style={{ color: "#1A1C1B" }}>
                Principal
              </div>
              <div className="text-lg font-mono font-bold" style={{ color: "#1A1C1B" }}>
                #1EE2AA
              </div>
            </div>
          </div>

          <div
            className="md:col-span-2 rounded-3xl p-4 flex items-center justify-center"
            style={{ backgroundColor: "#1A1C1B" }}
          >
            <div className="text-center">
              <div className="text-xs text-white uppercase tracking-wider mb-1 opacity-60">Secundario</div>
              <div className="text-lg font-mono font-bold text-white">#1A1C1B</div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider mb-1 opacity-60" style={{ color: "#1A1C1B" }}>
                Terciario
              </div>
              <div className="text-lg font-mono font-bold" style={{ color: "#1A1C1B" }}>
                #D1E5D9
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje de confirmación */}
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A1C1B" }}>
            🎉 ¡Nuevo Diseño Bento Grid Cargado Exitosamente!
          </h2>
          <p className="text-lg" style={{ color: "#1A1C1B" }}>
            Si ves este mensaje, la nueva versión se ha desplegado correctamente.
          </p>
        </div>
      </div>
    </div>
  )
}
