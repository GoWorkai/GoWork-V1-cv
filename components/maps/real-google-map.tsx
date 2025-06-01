"use client"

import { useState, useEffect, useCallback } from "react"
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from "@react-google-maps/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, MapPin, Navigation, Phone, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const defaultCenter = {
  lat: -33.4489, // Santiago, Chile
  lng: -70.6693,
}

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [{ color: "#1a1a1a" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#000000" }, { lightness: 13 }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#2a2a2a" }],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#0066FF" }],
    },
  ],
}

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

interface RealGoogleMapProps {
  onProviderSelect?: (provider: Provider | null) => void
  selectedProvider?: Provider | null
}

export default function RealGoogleMap({ onProviderSelect, selectedProvider }: RealGoogleMapProps) {
  const [map, setMap] = useState<any>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulated providers data - in real app, this would come from your API
  const generateNearbyProviders = useCallback((userPos: { lat: number; lng: number }) => {
    const baseProviders = [
      {
        id: 1,
        name: "Juan Martínez",
        service: "Electricista",
        rating: 4.9,
        reviews: 127,
        price: "$80/hora",
        available: true,
        responseTime: "15 min",
        avatar: "JM",
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
        price: "$150/proyecto",
        available: true,
        responseTime: "30 min",
        avatar: "AL",
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
        price: "$60/hora",
        available: false,
        responseTime: "10 min",
        avatar: "CR",
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
        price: "$90/sesión",
        available: true,
        responseTime: "20 min",
        avatar: "MG",
        specialties: ["Cocina casera", "Repostería", "Clases"],
        phone: "+56 9 9999 8888",
        description: "Chef profesional con especialidad en cocina saludable",
      },
      {
        id: 5,
        name: "Roberto Silva",
        service: "Desarrollador Web",
        rating: 4.7,
        reviews: 156,
        price: "$120/hora",
        available: true,
        responseTime: "45 min",
        avatar: "RS",
        specialties: ["React", "Node.js", "E-commerce"],
        phone: "+56 9 7777 6666",
        description: "Full-stack developer especializado en React y Node.js",
      },
    ]

    // Generate random positions around user location (within ~5km radius)
    return baseProviders.map((provider) => ({
      ...provider,
      position: {
        lat: userPos.lat + (Math.random() - 0.5) * 0.05, // ~2.5km radius
        lng: userPos.lng + (Math.random() - 0.5) * 0.05,
      },
    }))
  }, [])

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(userPos)
          setProviders(generateNearbyProviders(userPos))
          setLocationError(null)
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationError("No se pudo obtener tu ubicación. Usando ubicación por defecto.")
          setUserLocation(defaultCenter)
          setProviders(generateNearbyProviders(defaultCenter))
          setIsLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        },
      )
    } else {
      setLocationError("Geolocalización no soportada en este navegador.")
      setUserLocation(defaultCenter)
      setProviders(generateNearbyProviders(defaultCenter))
      setIsLoading(false)
    }
  }, [generateNearbyProviders])

  const onLoad = useCallback((map: any) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleMarkerClick = (provider: Provider) => {
    setSelectedMarkerId(provider.id)
    onProviderSelect?.(provider)
  }

  const handleInfoWindowClose = () => {
    setSelectedMarkerId(null)
    onProviderSelect?.(null)
  }

  const centerOnUser = () => {
    if (map && userLocation) {
      map.panTo(userLocation)
      map.setZoom(15)
    }
  }

  const calculateDistance = (pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }) => {
    const R = 6371 // Earth's radius in km
    const dLat = (pos2.lat - pos1.lat) * (Math.PI / 180)
    const dLng = (pos2.lng - pos1.lng) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pos1.lat * (Math.PI / 180)) *
        Math.cos(pos2.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00E5B4] mx-auto mb-4"></div>
          <p className="text-white">Obteniendo tu ubicación...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <LoadScript googleMapsApiKey="AIzaSyAjNxVZ8MYdOFHJlczXgTZekZg0GpyQYis">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || defaultCenter}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {/* User Location Marker */}
          {userLocation && (
            <>
              <Marker
                position={userLocation}
                icon={{
                  url:
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="8" fill="#0066FF" stroke="#ffffff" strokeWidth="3"/>
                      <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                    </svg>
                  `),
                  scaledSize: { width: 24, height: 24 },
                  anchor: { x: 12, y: 12 },
                }}
                title="Tu ubicación"
              />

              {/* Accuracy Circle */}
              <Circle
                center={userLocation}
                radius={100} // 100 meters
                options={{
                  fillColor: "#0066FF",
                  fillOpacity: 0.1,
                  strokeColor: "#0066FF",
                  strokeOpacity: 0.3,
                  strokeWeight: 1,
                }}
              />
            </>
          )}

          {/* Provider Markers */}
          {providers.map((provider) => (
            <Marker
              key={provider.id}
              position={provider.position}
              onClick={() => handleMarkerClick(provider)}
              icon={{
                url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="${provider.available ? "#00E5B4" : "#6B7280"}" stroke="#ffffff" strokeWidth="2"/>
                    <text x="20" y="25" textAnchor="middle" fill="#000000" fontSize="12" fontWeight="bold">${provider.avatar}</text>
                    <circle cx="32" cy="8" r="6" fill="${provider.available ? "#00E5B4" : "#6B7280"}"/>
                  </svg>
                `),
                scaledSize: { width: 40, height: 40 },
                anchor: { x: 20, y: 20 },
              }}
              title={`${provider.name} - ${provider.service}`}
            />
          ))}

          {/* Info Window for selected provider */}
          {selectedMarkerId && (
            <InfoWindow
              position={providers.find((p) => p.id === selectedMarkerId)?.position}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="bg-white p-4 rounded-lg max-w-sm">
                {(() => {
                  const provider = providers.find((p) => p.id === selectedMarkerId)
                  if (!provider) return null

                  const distance = userLocation ? calculateDistance(userLocation, provider.position) : 0

                  return (
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                            {provider.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                          <p className="text-sm text-gray-600">{provider.service}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">{provider.rating}</span>
                              <span className="text-sm text-gray-500">({provider.reviews})</span>
                            </div>
                            <Badge
                              className={`text-xs ${
                                provider.available ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {provider.available ? "Disponible" : "Ocupado"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{distance.toFixed(1)} km de distancia</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Responde en {provider.responseTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-[#00E5B4]">{provider.price}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600">{provider.description}</p>

                      <div className="flex space-x-2">
                        <Link href={`/booking/${provider.id}`} className="flex-1">
                          <Button size="sm" className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
                            Reservar
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" className="border-gray-300">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-300">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <Button
          onClick={centerOnUser}
          size="sm"
          className="bg-white/90 text-gray-900 hover:bg-white shadow-lg"
          disabled={!userLocation}
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Location Error */}
      {locationError && (
        <div className="absolute bottom-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded-lg text-sm max-w-sm">
          {locationError}
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#0066FF] rounded-full"></div>
            <span>Tu ubicación</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#00E5B4] rounded-full"></div>
            <span>Disponible</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span>Ocupado</span>
          </div>
        </div>
      </div>
    </div>
  )
}
