"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MapPin, Star, Filter, ArrowLeft, Phone, MessageCircle, Clock, Navigation } from "lucide-react"
import Link from "next/link"
import RealGoogleMap from "@/components/maps/real-google-map"

interface Provider {
  id: number
  name: string
  service: string
  rating: number
  reviews: number
  price: string
  available: boolean
  responseTime: string
  avatar: string
  position: { lat: number; lng: number }
  specialties: string[]
  phone: string
  description: string
}

export default function MapPage() {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock providers for sidebar (in real app, these would be fetched from API)
  const providers = [
    {
      id: 1,
      name: "Juan Martínez",
      service: "Electricista",
      rating: 4.9,
      reviews: 127,
      distance: "0.8 km",
      price: "$80/hora",
      available: true,
      responseTime: "15 min",
      avatar: "JM",
      position: { lat: -33.4172, lng: -70.6036 },
      specialties: ["Instalación", "Reparación", "Emergencias"],
      phone: "+56 9 1234 5678",
      description: "Electricista certificado con 10 años de experiencia",
    },
    {
      id: 2,
      name: "Ana López",
      service: "Diseñadora UX/UI",
      rating: 5.0,
      reviews: 89,
      distance: "1.2 km",
      price: "$150/proyecto",
      available: true,
      responseTime: "30 min",
      avatar: "AL",
      position: { lat: -33.4184, lng: -70.6042 },
      specialties: ["Logo", "Branding", "Web Design"],
      phone: "+56 9 8765 4321",
      description: "Diseñadora especializada en experiencia de usuario",
    },
    {
      id: 3,
      name: "Carlos Ruiz",
      service: "Plomero",
      rating: 4.8,
      reviews: 203,
      distance: "2.1 km",
      price: "$60/hora",
      available: false,
      responseTime: "10 min",
      avatar: "CR",
      position: { lat: -33.4156, lng: -70.6028 },
      specialties: ["Reparación", "Mantención", "Emergencias"],
      phone: "+56 9 5555 1234",
      description: "Plomero profesional disponible 24/7",
    },
    {
      id: 4,
      name: "María García",
      service: "Chef Personal",
      rating: 5.0,
      reviews: 94,
      distance: "1.8 km",
      price: "$90/sesión",
      available: true,
      responseTime: "20 min",
      avatar: "MG",
      position: { lat: -33.4198, lng: -70.6051 },
      specialties: ["Cocina casera", "Repostería", "Clases"],
      phone: "+56 9 9999 8888",
      description: "Chef profesional con especialidad en cocina saludable",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="text-2xl font-bold">
              <span className="text-[#0066FF]">Go</span>
              <span className="text-[#00E5B4]">Work</span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar servicios cerca de ti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Real Google Map */}
        <div className="flex-1 relative">
          <RealGoogleMap onProviderSelect={setSelectedProvider} selectedProvider={selectedProvider} />
        </div>

        {/* Sidebar */}
        <aside className="w-96 bg-black border-l border-gray-800 flex flex-col">
          {/* Filters */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Proveedores cercanos</h2>
              <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">
                {providers.filter((p) => p.available).length} disponibles
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Todos
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Disponibles
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Cerca
              </Button>
            </div>
          </div>

          {/* Provider List */}
          <div className="flex-1 overflow-y-auto">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors ${
                  selectedProvider?.id === provider.id ? "bg-gray-900 border-l-4 border-l-[#00E5B4]" : ""
                }`}
                onClick={() => setSelectedProvider(provider)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                        {provider.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
                        provider.available ? "bg-[#00E5B4]" : "bg-gray-500"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{provider.name}</h3>
                      <span className="text-xs text-gray-400">{provider.distance}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{provider.service}</p>
                    <div className="flex items-center space-x-3 text-sm text-gray-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{provider.rating}</span>
                        <span>({provider.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{provider.responseTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#00E5B4] font-medium text-sm">{provider.price}</span>
                      <Badge
                        className={`text-xs ${
                          provider.available
                            ? "bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30"
                            : "bg-gray-700 text-gray-400 border-gray-600"
                        }`}
                      >
                        {provider.available ? "Disponible" : "Ocupado"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {provider.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Provider Details */}
          {selectedProvider && (
            <div className="border-t border-gray-800 p-4 bg-gray-900">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                      {selectedProvider.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedProvider.name}</h3>
                    <p className="text-sm text-gray-400">{selectedProvider.service}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/booking/${selectedProvider.id}`} className="flex-1">
                    <Button className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black">Reservar</Button>
                  </Link>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-xs text-gray-400 text-center">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  Ubicación real calculada por GPS
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
