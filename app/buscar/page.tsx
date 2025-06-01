"use client"

import { useState } from "react"
import { Grid, List, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdvancedSearch } from "@/components/search/advanced-search"
import { SearchResults } from "@/components/search/search-results"
import { useSearch } from "@/hooks/use-search"

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")

  const {
    services,
    loading,
    error,
    hasMore,
    total,
    filters,
    searchQuery,
    setSearchQuery,
    setFilters,
    loadMore,
    refresh,
    clearFilters,
  } = useSearch()

  const sortOptions = [
    { value: "relevance", label: "Más relevantes" },
    { value: "price_asc", label: "Precio: menor a mayor" },
    { value: "price_desc", label: "Precio: mayor a menor" },
    { value: "rating", label: "Mejor calificados" },
    { value: "newest", label: "Más recientes" },
    { value: "popular", label: "Más populares" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Título */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buscar Servicios</h1>
          <p className="text-gray-600">Encuentra el servicio perfecto para tus necesidades</p>
        </div>

        {/* Búsqueda avanzada */}
        <AdvancedSearch
          filters={filters}
          onFiltersChange={setFilters}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearFilters={clearFilters}
          totalResults={total}
          loading={loading}
        />

        {/* Controles de vista y ordenamiento */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Vista:</span>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List size={16} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SortAsc size={16} className="text-gray-600" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <p>{error}</p>
            <Button variant="outline" size="sm" onClick={refresh} className="mt-2">
              Intentar nuevamente
            </Button>
          </div>
        )}

        {/* Resultados */}
        <SearchResults
          services={services}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMore}
          viewMode={viewMode}
        />
      </div>
    </div>
  )
}
