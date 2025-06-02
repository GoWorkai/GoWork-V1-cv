"use client"
import { useState } from "react"
import { Search, Sparkles, Mic, Send } from "lucide-react"

export function BentoGridStable() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-[#D1E5D9] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#1EE2AA] rounded-lg flex items-center justify-center mr-2">
              <span className="font-bold text-[#1A1C1B]">G</span>
            </div>
            <span className="font-bold text-[#1A1C1B] text-xl">GoWork</span>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-[#1A1C1B] text-[#1A1C1B] rounded-lg hover:bg-[#1A1C1B] hover:text-white transition-colors">
              Iniciar sesión
            </button>
            <button className="px-4 py-2 bg-[#1EE2AA] text-[#1A1C1B] rounded-lg hover:bg-[#0cb386] transition-colors">
              Registrarse
            </button>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* Bloque de búsqueda IA */}
          <div className="md:col-span-6 md:row-span-2 bg-[#1A1C1B] rounded-3xl p-6 text-white">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#1EE2AA] rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="h-5 w-5 text-[#1A1C1B]" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Gow IA</h3>
                <p className="text-sm text-white/70">Asistente Inteligente de GoWork</p>
              </div>
            </div>

            <p className="text-white/80 text-sm mb-4">
              Conversa conmigo para encontrar servicios, analizar precios, optimizar tu perfil y descubrir oportunidades
            </p>

            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué servicio necesitas? Pregúntame cualquier cosa sobre GoWork..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-3 px-4 pr-20 text-white placeholder-white/70 focus:bg-white/15 focus:border-[#1EE2AA] focus:outline-none"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button className="p-2 text-white/70 hover:text-white">
                  <Mic size={18} />
                </button>
                <button className="bg-[#1EE2AA] p-2 rounded-full text-[#1A1C1B] hover:bg-[#0cb386]">
                  <Send size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: Search, label: "Buscar servicios" },
                { icon: "👤", label: "Optimizar perfil" },
                { icon: "💰", label: "Analizar precios" },
                { icon: "💡", label: "Ideas de negocio" },
              ].map((item, index) => (
                <button
                  key={index}
                  className="bg-white/10 hover:bg-white/20 rounded-xl p-3 flex flex-col items-center space-y-2 transition-colors"
                >
                  <div className="bg-[#1EE2AA] w-8 h-8 rounded-lg flex items-center justify-center">
                    {typeof item.icon === "string" ? (
                      <span className="text-sm">{item.icon}</span>
                    ) : (
                      <item.icon size={16} className="text-[#1A1C1B]" />
                    )}
                  </div>
                  <span className="text-xs text-white text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bloque de logo principal */}
          <div className="md:col-span-6 md:row-span-2 bg-[#1EE2AA] rounded-3xl p-6 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#1A1C1B" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="#1A1C1B" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="20" stroke="#1A1C1B" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-[#1A1C1B]">GoWork</h1>
              <div className="w-16 h-16 bg-[#1A1C1B] rounded-lg flex items-center justify-center mx-auto mt-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[#1EE2AA]"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <p className="mt-4 text-[#1A1C1B] font-medium">La Red Social del Talento</p>
            </div>
          </div>

          {/* Bloque de estadísticas */}
          <div className="md:col-span-3 bg-[#2260DD] rounded-3xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Estadísticas</h3>
            <div className="text-3xl font-bold mb-1">15K+</div>
            <p className="text-white/80 text-sm">Usuarios activos</p>
          </div>

          {/* Bloque de categorías */}
          <div className="md:col-span-3 bg-[#E0E020] rounded-3xl p-6">
            <h3 className="text-xl font-bold text-[#1A1C1B] mb-2">Categorías</h3>
            <div className="grid grid-cols-2 gap-2">
              {["Diseño", "Desarrollo", "Marketing", "Educación"].map((category) => (
                <div key={category} className="bg-white/20 p-2 rounded-lg text-center">
                  <span className="text-xs font-medium text-[#1A1C1B]">{category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bloques de colores */}
          <div className="md:col-span-2 bg-[#D1E5D9] rounded-3xl p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-[#1A1C1B]/60 uppercase tracking-wider mb-1">Principal</div>
              <div className="text-lg font-mono font-bold text-[#1A1C1B]">#1EE2AA</div>
            </div>
          </div>

          <div className="md:col-span-2 bg-[#1A1C1B] rounded-3xl p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Secundario</div>
              <div className="text-lg font-mono font-bold text-white">#1A1C1B</div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-3xl p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-[#1A1C1B]/60 uppercase tracking-wider mb-1">Terciario</div>
              <div className="text-lg font-mono font-bold text-[#1A1C1B]">#D1E5D9</div>
            </div>
          </div>
        </div>

        {/* Indicador de prototipo */}
        <div className="fixed bottom-4 right-4 bg-[#1EE2AA] text-[#1A1C1B] px-3 py-1 rounded-full text-xs font-mono z-50">
          Prototipo Bento Grid v1.0
        </div>
      </div>
    </div>
  )
}
