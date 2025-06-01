"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { servicesAPI } from "@/lib/services-api"
import { useAuth } from "@/contexts/auth-context"
import type { Service } from "@/types/service"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  Trash,
  Copy,
  BarChart3,
  MapPin,
  Heart,
  Loader2,
  CheckCircle,
  Pause,
  Play,
} from "lucide-react"

export default function MyServicesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (user) {
      loadServices()
    }
  }, [user])

  useEffect(() => {
    filterServices()
  }, [services, searchQuery, selectedCategory, selectedStatus, activeTab])

  const loadServices = async () => {
    if (!user) return

    try {
      setIsLoading(true)
      const userServices = await servicesAPI.getUserServices(user.id)
      setServices(userServices)
    } catch (error) {
      console.error("Error loading services:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterServices = () => {
    let filtered = services

    // Filtrar por tab activo
    if (activeTab === "active") {
      filtered = filtered.filter((service) => service.is_active)
    } else if (activeTab === "inactive") {
      filtered = filtered.filter((service) => !service.is_active)
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter((service) => service.category === selectedCategory)
    }

    setFilteredServices(filtered)
  }

  const handleDeleteService = async (serviceId: string) => {
    if (!user) return

    try {
      await servicesAPI.deleteService(serviceId, user.id)
      setServices(services.filter((service) => service.id !== serviceId))
      setShowDeleteDialog(false)
      setServiceToDelete(null)
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  const handleToggleStatus = async (serviceId: string, currentStatus: boolean) => {
    if (!user) return

    try {
      await servicesAPI.updateService(serviceId, { is_active: !currentStatus } as any, user.id)
      setServices(
        services.map((service) => (service.id === serviceId ? { ...service, is_active: !currentStatus } : service)),
      )
    } catch (error) {
      console.error("Error updating service status:", error)
    }
  }

  const handleSelectService = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId])
    } else {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedServices(filteredServices.map((service) => service.id))
    } else {
      setSelectedServices([])
    }
  }

  const formatPrice = (service: Service) => {
    if (service.price_type === "negotiable") return "A convenir"
    if (!service.price_min && !service.price_max) return "Consultar"

    const formatAmount = (amount: number) =>
      new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
      }).format(amount)

    if (service.price_min === service.price_max) {
      return formatAmount(service.price_min!)
    }

    return `${formatAmount(service.price_min!)} - ${formatAmount(service.price_max!)}`
  }

  const getServiceStats = () => {
    const active = services.filter((s) => s.is_active).length
    const inactive = services.filter((s) => !s.is_active).length
    const totalViews = services.reduce((sum, s) => sum + s.views_count, 0)
    const totalFavorites = services.reduce((sum, s) => sum + s.favorites_count, 0)

    return { active, inactive, totalViews, totalFavorites }
  }

  const stats = getServiceStats()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#007bff]" />
        <span className="ml-2 text-gray-600">Cargando servicios...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Servicios</h1>
          <p className="text-gray-600">Gestiona y optimiza tus servicios en GoWork</p>
        </div>
        <Button
          onClick={() => router.push("/dashboard/my-services/create")}
          className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Servicio
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Servicios Activos</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Vistas</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favoritos</p>
                <p className="text-2xl font-bold text-red-600">{stats.totalFavorites}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Servicios</p>
                <p className="text-2xl font-bold text-purple-600">{services.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar servicios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="hogar">Hogar</SelectItem>
                <SelectItem value="tecnologia">Tecnología</SelectItem>
                <SelectItem value="educacion">Educación</SelectItem>
                <SelectItem value="salud">Salud</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="all">Todos ({services.length})</TabsTrigger>
            <TabsTrigger value="active">Activos ({stats.active})</TabsTrigger>
            <TabsTrigger value="inactive">Inactivos ({stats.inactive})</TabsTrigger>
          </TabsList>

          {selectedServices.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedServices.length} seleccionados</span>
              <Button variant="outline" size="sm">
                Activar
              </Button>
              <Button variant="outline" size="sm">
                Desactivar
              </Button>
              <Button variant="destructive" size="sm">
                Eliminar
              </Button>
            </div>
          )}
        </div>

        <TabsContent value={activeTab} className="mt-4">
          {filteredServices.length > 0 ? (
            <div className="space-y-4">
              {/* Select All */}
              <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  checked={selectedServices.length === filteredServices.length && filteredServices.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-600">Seleccionar todos</span>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isSelected={selectedServices.includes(service.id)}
                    onSelect={(checked) => handleSelectService(service.id, checked)}
                    onEdit={() => router.push(`/dashboard/my-services/edit/${service.id}`)}
                    onView={() => router.push(`/servicio/${service.id}`)}
                    onDelete={() => {
                      setServiceToDelete(service.id)
                      setShowDeleteDialog(true)
                    }}
                    onToggleStatus={() => handleToggleStatus(service.id, service.is_active)}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              activeTab={activeTab}
              hasServices={services.length > 0}
              onCreateService={() => router.push("/dashboard/my-services/create")}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Servicio</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este servicio? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => serviceToDelete && handleDeleteService(serviceToDelete)}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface ServiceCardProps {
  service: Service
  isSelected: boolean
  onSelect: (checked: boolean) => void
  onEdit: () => void
  onView: () => void
  onDelete: () => void
  onToggleStatus: () => void
  formatPrice: (service: Service) => string
}

function ServiceCard({
  service,
  isSelected,
  onSelect,
  onEdit,
  onView,
  onDelete,
  onToggleStatus,
  formatPrice,
}: ServiceCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${isSelected ? "ring-2 ring-blue-500" : ""}`}>
      <div className="relative">
        <div
          className="h-40 bg-cover bg-center"
          style={{
            backgroundImage: `url(${service.images[0] || "/placeholder.svg?height=160&width=300&text=Sin+imagen"})`,
          }}
        >
          <div className="absolute top-2 left-2">
            <Checkbox checked={isSelected} onCheckedChange={onSelect} className="bg-white" />
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant={service.is_active ? "default" : "secondary"}>
              {service.is_active ? "Activo" : "Inactivo"}
            </Badge>
          </div>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-base font-medium line-clamp-2">{service.title}</CardTitle>
            <Badge variant="outline" className="mt-1">
              {service.category}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onView}>
                <Eye className="mr-2 h-4 w-4" />
                Ver publicación
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleStatus}>
                {service.is_active ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Activar
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="truncate">{service.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-green-600">{formatPrice(service)}</div>
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {service.views_count}
              </div>
              <div className="flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                {service.favorites_count}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface EmptyStateProps {
  activeTab: string
  hasServices: boolean
  onCreateService: () => void
}

function EmptyState({ activeTab, hasServices, onCreateService }: EmptyStateProps) {
  const getEmptyMessage = () => {
    if (!hasServices) {
      return {
        title: "No tienes servicios",
        description: "Comienza a ofrecer tus servicios en GoWork",
        action: "Crear primer servicio",
      }
    }

    switch (activeTab) {
      case "active":
        return {
          title: "No tienes servicios activos",
          description: "Activa algunos servicios para que aparezcan en las búsquedas",
          action: "Ver todos los servicios",
        }
      case "inactive":
        return {
          title: "No tienes servicios inactivos",
          description: "Todos tus servicios están activos y visibles",
          action: "Ver servicios activos",
        }
      default:
        return {
          title: "No se encontraron servicios",
          description: "Intenta cambiar los filtros de búsqueda",
          action: "Limpiar filtros",
        }
    }
  }

  const message = getEmptyMessage()

  return (
    <div className="text-center p-12 bg-white rounded-lg border border-gray-200">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Plus className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message.title}</h3>
      <p className="text-gray-600 mb-6">{message.description}</p>
      <Button onClick={onCreateService} className="bg-gradient-to-r from-blue-600 to-green-500">
        <Plus className="mr-2 h-4 w-4" />
        {message.action}
      </Button>
    </div>
  )
}
