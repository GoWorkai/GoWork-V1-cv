"use client"

import { useState, useEffect, useCallback } from "react"
import { servicesAPI } from "@/lib/services-api"
import type { Service, ServiceFilters } from "@/types/service"

interface UseSearchResult {
  services: Service[]
  loading: boolean
  error: string | null
  hasMore: boolean
  total: number
  page: number
  filters: ServiceFilters
  searchQuery: string
  setSearchQuery: (query: string) => void
  setFilters: (filters: ServiceFilters) => void
  loadMore: () => void
  refresh: () => void
  clearFilters: () => void
}

export function useSearch(initialFilters: ServiceFilters = {}): UseSearchResult {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<ServiceFilters>(initialFilters)
  const [searchQuery, setSearchQuery] = useState("")

  const searchServices = useCallback(
    async (currentPage: number, currentFilters: ServiceFilters, append = false) => {
      try {
        setLoading(true)
        setError(null)

        const searchFilters = {
          ...currentFilters,
          ...(searchQuery && { search_query: searchQuery }),
        }

        const result = await servicesAPI.getServices(searchFilters, currentPage, 20)

        if (append) {
          setServices((prev) => [...prev, ...result.services])
        } else {
          setServices(result.services)
        }

        setHasMore(result.hasMore)
        setTotal(result.total)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error en la búsqueda")
      } finally {
        setLoading(false)
      }
    },
    [searchQuery],
  )

  // Búsqueda inicial y cuando cambian los filtros
  useEffect(() => {
    setPage(1)
    searchServices(1, filters, false)
  }, [filters, searchQuery, searchServices])

  const handleSetFilters = useCallback((newFilters: ServiceFilters) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      searchServices(nextPage, filters, true)
    }
  }, [loading, hasMore, page, filters, searchServices])

  const refresh = useCallback(() => {
    setPage(1)
    searchServices(1, filters, false)
  }, [filters, searchServices])

  const clearFilters = useCallback(() => {
    setFilters({})
    setSearchQuery("")
    setPage(1)
  }, [])

  return {
    services,
    loading,
    error,
    hasMore,
    total,
    page,
    filters,
    searchQuery,
    setSearchQuery,
    setFilters: handleSetFilters,
    loadMore,
    refresh,
    clearFilters,
  }
}
