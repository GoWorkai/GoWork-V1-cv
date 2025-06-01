"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MapPin, Star, Eye, MoreVertical } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Service } from "@/types/service"

interface SearchResultsProps {
  services: Service[]
  loading: boolean
  hasMore: boolean
  onLoadMore: () => void
  viewMode?: "grid" | "list"
}

export function SearchResults({ services, loading, hasMore, onLoadMore, viewMode = "grid" }: SearchResultsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (serviceId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(serviceId)) {
        newFavorites.delete(serviceId)
      } else {
        newFavorites.add(serviceId)
      }
      return newFavorites
    })
  }

  const formatPrice = (service: Service) => {
    if (service.price_type === "negotiable") {
      return "Precio a convenir"
    }

    if (service.price_type === "hourly") {
      return `$${service.price_min?.toLocaleString() || "0"}/hora`
    }

    if (service.price_min && service.price_max && service.price_min !== service.price_max) {
      return `$${service.price_min.toLocaleString()} - $${service.price_max.toLocaleString()}`
    }

    return `$${(service.price_min || service.price_max || 0).toLocaleString()}`
  }

  const getLocationTypeLabel = (type: string) => {
    const labels = {
      remote: "Remoto",
      client_location: "A domicilio",
      provider_location: "En mi ubicación",
      flexible: "Flexible",
    }
    return labels[type as keyof typeof labels] || type
  }

  if (loading && services.length === 0) {
    return <SearchResultsSkeleton viewMode={viewMode} />
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <MapPin className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron servicios</h3>
        <p className="text-gray-600 mb-4">Intenta ajustar tus filtros de búsqueda o buscar algo diferente.</p>
        <Button variant="outline">Limpiar filtros</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isFavorite={favorites.has(service.id)}
            onToggleFavorite={() => toggleFavorite(service.id)}
            formatPrice={formatPrice}
            getLocationTypeLabel={getLocationTypeLabel}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Cargar más */}
      {hasMore && (
        <div className="text-center">
          <Button onClick={onLoadMore} disabled={loading} variant="outline" size="lg">
            {loading ? "Cargando..." : "Cargar más servicios"}
          </Button>
        </div>
      )}

      {/* Loading adicional */}
      {loading && services.length > 0 && (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceCardSkeleton key={i} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}

interface ServiceCardProps {
  service: Service
  isFavorite: boolean
  onToggleFavorite: () => void
  formatPrice: (service: Service) => string
  getLocationTypeLabel: (type: string) => string
  viewMode: "grid" | "list"
}

function ServiceCard({
  service,
  isFavorite,
  onToggleFavorite,
  formatPrice,
  getLocationTypeLabel,
  viewMode,
}: ServiceCardProps) {
  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="flex">
            {/* Imagen */}
            <div className="w-48 h-32 flex-shrink-0">
              <img
                src={service.images[0] || "/placeholder.svg?height=128&width=192"}
                alt={service.title}
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>

            {/* Contenido */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                    {service.subcategory && (
                      <Badge variant="outline" className="text-xs">
                        {service.subcategory}
                      </Badge>
                    )}
                  </div>
                  <Link href={`/servicio/${service.id}`}>
                    <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors line-clamp-1">
                      {service.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{service.description}</p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleFavorite}
                    className={isFavorite ? "text-red-500" : "text-gray-400"}
                  >
                    <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Compartir</DropdownMenuItem>
                      <DropdownMenuItem>Reportar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <img
                      src={service.provider_avatar || "/placeholder.svg?height=20&width=20"}
                      alt={service.provider_name}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{service.provider_name}</span>
                  </div>
                  {service.provider_rating && (
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" fill="currentColor" />
                      <span>{service.provider_rating}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{getLocationTypeLabel(service.location_type)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600">{formatPrice(service)}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow group">
      <CardContent className="p-0">
        {/* Imagen */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={service.images[0] || "/placeholder.svg?height=200&width=300"}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onToggleFavorite}
              className={`h-8 w-8 p-0 ${isFavorite ? "text-red-500" : "text-gray-600"}`}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="text-xs">
              {service.category}
            </Badge>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-1">
              {service.provider_rating && (
                <>
                  <Star size={14} className="text-yellow-500" fill="currentColor" />
                  <span className="text-sm">{service.provider_rating}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Eye size={12} />
              <span>{service.views_count}</span>
            </div>
          </div>

          <Link href={`/servicio/${service.id}`}>
            <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors line-clamp-2">
              {service.title}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>

          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
            <img
              src={service.provider_avatar || "/placeholder.svg?height=20&width=20"}
              alt={service.provider_name}
              className="w-5 h-5 rounded-full"
            />
            <span>{service.provider_name}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin size={14} />
              <span>{getLocationTypeLabel(service.location_type)}</span>
            </div>
            <p className="font-bold text-lg text-blue-600">{formatPrice(service)}</p>
          </div>

          {service.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {service.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {service.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{service.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function ServiceCardSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card>
        <CardContent className="p-0">
          <div className="flex">
            <Skeleton className="w-48 h-32 rounded-l-lg" />
            <div className="flex-1 p-4">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardContent className="p-0">
        <Skeleton className="aspect-video w-full" />
        <div className="p-4">
          <Skeleton className="h-4 w-16 mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4 mb-3" />
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SearchResultsSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {Array.from({ length: 6 }).map((_, i) => (
        <ServiceCardSkeleton key={i} viewMode={viewMode} />
      ))}
    </div>
  )
}
