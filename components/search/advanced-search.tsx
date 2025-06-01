"use client"

import { useState } from "react"
import { Search, Filter, MapPin, DollarSign, Clock, X, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SERVICE_CATEGORIES } from "@/types/service"
import type { ServiceFilters } from "@/types/service"

interface AdvancedSearchProps {
  filters: ServiceFilters
  onFiltersChange: (filters: ServiceFilters) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onClearFilters: () => void
  totalResults: number
  loading: boolean
}

export function AdvancedSearch({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  onClearFilters,
  totalResults,
  loading,
}: AdvancedSearchProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [localFilters, setLocalFilters] = useState<ServiceFilters>(filters)

  const handleFilterChange = (key: keyof ServiceFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
  }

  const applyFilters = () => {
    onFiltersChange(localFilters)
    setShowFilters(false)
  }

  const resetFilters = () => {
    setLocalFilters({})
    onFiltersChange({})
    onClearFilters()
    setShowFilters(false)
  }

  const activeFiltersCount = Object.keys(filters).filter((key) => {
    const value = filters[key as keyof ServiceFilters]
    return value !== undefined && value !== "" && value !== null
  }).length

  const priceTypes = [
    { value: "fixed", label: "Precio Fijo" },
    { value: "hourly", label: "Por Hora" },
    { value: "negotiable", label: "Negociable" },
  ]

  const locationTypes = [
    { value: "remote", label: "Remoto" },
    { value: "client_location", label: "En domicilio del cliente" },
    { value: "provider_location", label: "En mi ubicación" },
    { value: "flexible", label: "Flexible" },
  ]

  const availabilityOptions = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda principal */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="¿Qué servicio necesitas? Ej: plomero, diseñador, clases de guitarra..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Botón de filtros para móvil */}
        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-12 px-6 relative">
              <SlidersHorizontal size={18} className="mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtros de Búsqueda</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Categoría */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center">
                  <Filter size={16} className="mr-2" />
                  Categoría
                </Label>
                <Select
                  value={localFilters.category || "all"}
                  onValueChange={(value) => handleFilterChange("category", value === "all" ? undefined : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {Object.entries(SERVICE_CATEGORIES).map(([key, category]) => (
                      <SelectItem key={key} value={key}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategoría */}
              {localFilters.category && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Subcategoría</Label>
                  <Select
                    value={localFilters.subcategory || "all"}
                    onValueChange={(value) => handleFilterChange("subcategory", value === "all" ? undefined : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las subcategorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las subcategorías</SelectItem>
                      {SERVICE_CATEGORIES[localFilters.category as keyof typeof SERVICE_CATEGORIES]?.subcategories.map(
                        (sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Ubicación */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Ubicación
                </Label>
                <Input
                  placeholder="Ciudad, comuna o región"
                  value={localFilters.location || ""}
                  onChange={(e) => handleFilterChange("location", e.target.value || undefined)}
                />
              </div>

              {/* Tipo de precio */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center">
                  <DollarSign size={16} className="mr-2" />
                  Tipo de Precio
                </Label>
                <Select
                  value={localFilters.price_type || "all"}
                  onValueChange={(value) => handleFilterChange("price_type", value === "all" ? undefined : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Cualquier tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Cualquier tipo</SelectItem>
                    {priceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rango de precios */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Rango de Precios (CLP)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Mínimo"
                    value={localFilters.price_min || ""}
                    onChange={(e) =>
                      handleFilterChange("price_min", e.target.value ? Number(e.target.value) : undefined)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Máximo"
                    value={localFilters.price_max || ""}
                    onChange={(e) =>
                      handleFilterChange("price_max", e.target.value ? Number(e.target.value) : undefined)
                    }
                  />
                </div>
              </div>

              {/* Modalidad */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Modalidad del Servicio</Label>
                <div className="space-y-2">
                  {locationTypes.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.value}
                        checked={localFilters.location_type === type.value}
                        onCheckedChange={(checked) =>
                          handleFilterChange("location_type", checked ? type.value : undefined)
                        }
                      />
                      <Label htmlFor={type.value} className="text-sm">
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disponibilidad */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center">
                  <Clock size={16} className="mr-2" />
                  Disponibilidad
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {availabilityOptions.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={localFilters.availability?.includes(day) || false}
                        onCheckedChange={(checked) => {
                          const current = localFilters.availability || []
                          const updated = checked ? [...current, day] : current.filter((d) => d !== day)
                          handleFilterChange("availability", updated.length > 0 ? updated : undefined)
                        }}
                      />
                      <Label htmlFor={day} className="text-sm">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={applyFilters} className="flex-1">
                  Aplicar Filtros
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  Limpiar
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Filtros activos */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Filtros activos:</span>
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {SERVICE_CATEGORIES[filters.category as keyof typeof SERVICE_CATEGORIES]?.name}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, category: undefined, subcategory: undefined })}
              />
            </Badge>
          )}
          {filters.subcategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.subcategory}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, subcategory: undefined })}
              />
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="flex items-center gap-1">
              📍 {filters.location}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, location: undefined })}
              />
            </Badge>
          )}
          {(filters.price_min || filters.price_max) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              💰 {filters.price_min ? `$${filters.price_min.toLocaleString()}` : "0"} -{" "}
              {filters.price_max ? `$${filters.price_max.toLocaleString()}` : "∞"}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, price_min: undefined, price_max: undefined })}
              />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-red-600">
            Limpiar todos
          </Button>
        </div>
      )}

      {/* Resultados */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{loading ? "Buscando..." : `${totalResults.toLocaleString()} servicios encontrados`}</span>
      </div>
    </div>
  )
}
