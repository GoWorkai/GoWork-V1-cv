"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { apiService, type Service } from "@/lib/api"
import { useAuth } from "@/contexts/auth-context"
import {
  Star,
  MapPin,
  Clock,
  DollarSign,
  User,
  Shield,
  MessageCircle,
  Heart,
  Share2,
  ArrowLeft,
  Loader2,
  Calendar,
  CheckCircle,
} from "lucide-react"

interface ServiceDetailProps {
  serviceId: string
  onBack?: () => void
}

export function ServiceDetail({ serviceId, onBack }: ServiceDetailProps) {
  const { user } = useAuth()
  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    loadService()
  }, [serviceId])

  const loadService = async () => {
    try {
      setIsLoading(true)
      const response = await apiService.getService(serviceId)

      if (response.success && response.data) {
        setService(response.data)
      } else {
        console.error("Error loading service:", response.error)
      }
    } catch (error) {
      console.error("Error loading service:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleContact = () => {
    setShowContactForm(true)
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    // Aquí implementarías la lógica para guardar/quitar de favoritos
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#007bff]" />
        <span className="ml-2 text-gray-600">Cargando servicio...</span>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Servicio no encontrado</h2>
        <p className="text-gray-600 mb-6">El servicio que buscas no existe o ha sido eliminado.</p>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFavorite}
            className={isFavorite ? "text-red-500 border-red-500" : ""}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Guardado" : "Guardar"}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </div>

      {/* Service Images */}
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {service.images.length > 0 ? (
              service.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${service.title} - Imagen ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-48 bg-gray-100 rounded-lg">
                <p className="text-gray-500">Sin imágenes disponibles</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {service.location.city}, {service.location.region}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.responseTime}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{service.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Disponibilidad</h3>
                  <p className="text-gray-700">{service.availability}</p>
                </div>

                {service.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Provider Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Reseñas del Proveedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Las reseñas se cargarán desde el backend</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Precio</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {formatPrice(service.price.min)}
                    {service.price.min !== service.price.max && <span> - {formatPrice(service.price.max)}</span>}
                  </div>
                  <p className="text-sm text-gray-600 capitalize">
                    Por{" "}
                    {service.price.type === "hourly"
                      ? "hora"
                      : service.price.type === "project"
                        ? "proyecto"
                        : "servicio"}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-[#007bff] hover:bg-[#0056b3]" onClick={handleContact}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contactar Proveedor
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Programar Cita
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Provider Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Proveedor</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={service.provider.avatar || "/placeholder.svg?height=60&width=60&text=P"}
                    alt={service.provider.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold flex items-center space-x-2">
                      <span>{service.provider.name}</span>
                      {service.provider.verified && <Shield className="h-4 w-4 text-green-500" />}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {service.provider.rating} ({service.provider.completedJobs} trabajos)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{service.provider.completedJobs} trabajos completados</span>
                  </div>
                  {service.provider.verified && (
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Identidad verificada</span>
                    </div>
                  )}
                </div>

                <Button variant="outline" className="w-full">
                  Ver Perfil Completo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Consejos de Seguridad</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Comunícate siempre a través de GoWork</p>
                <p>• Verifica la identidad del proveedor</p>
                <p>• Usa nuestro sistema de pagos seguro</p>
                <p>• Reporta cualquier comportamiento sospechoso</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Contactar a {service.provider.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Mensaje</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                    rows={4}
                    placeholder="Describe tu proyecto y cuándo necesitas el servicio..."
                  />
                </div>
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-[#007bff] hover:bg-[#0056b3]">Enviar Mensaje</Button>
                  <Button variant="outline" onClick={() => setShowContactForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
