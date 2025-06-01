"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { servicesAPI } from "@/lib/services-api"
import { useAuth } from "@/contexts/auth-context"
import type { Service } from "@/types/service"
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  Shield,
  Eye,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function ServiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactMessage, setContactMessage] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadService(params.id as string)
    }
  }, [params.id])

  const loadService = async (serviceId: string) => {
    try {
      setIsLoading(true)
      const serviceData = await servicesAPI.getServiceById(serviceId)
      if (serviceData) {
        setService(serviceData)
      } else {
        router.push("/buscar")
      }
    } catch (error) {
      console.error("Error loading service:", error)
      router.push("/buscar")
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

  const handleContact = async () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    try {
      // Aquí implementarías la lógica para enviar el mensaje
      console.log("Enviando mensaje:", contactMessage)
      setShowContactModal(false)
      setContactMessage("")
      // Mostrar notificación de éxito
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleFavorite = () => {
    if (!user) {
      router.push("/auth/login")
      return
    }
    setIsFavorite(!isFavorite)
    // Aquí implementarías la lógica para guardar/quitar de favoritos
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: service?.title,
          text: service?.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const nextImage = () => {
    if (service && service.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % service.images.length)
    }
  }

  const prevImage = () => {
    if (service && service.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-[#007bff]" />
          <span className="ml-2 text-gray-600">Cargando servicio...</span>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Servicio no encontrado</h2>
          <p className="text-gray-600 mb-6">El servicio que buscas no existe o ha sido eliminado.</p>
          <Button onClick={() => router.push("/buscar")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a búsqueda
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center space-x-2">
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
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images Gallery */}
          <Card>
            <CardContent className="p-0">
              {service.images.length > 0 ? (
                <div className="relative">
                  <div
                    className="h-96 bg-cover bg-center rounded-t-lg cursor-pointer"
                    style={{
                      backgroundImage: `url(${service.images[currentImageIndex] || "/placeholder.svg?height=400&width=600"})`,
                    }}
                    onClick={() => setIsImageModalOpen(true)}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {service.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {service.images.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? "bg-white" : "bg-white/50"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="h-96 bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Sin imágenes disponibles</p>
                  </div>
                </div>
              )}

              {service.images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {service.images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg?height=100&width=100"}
                      alt={`${service.title} - ${index + 1}`}
                      className={`w-full h-20 object-cover rounded cursor-pointer border-2 ${
                        index === currentImageIndex ? "border-[#007bff]" : "border-transparent"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Service Info */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{service.views_count} vistas</span>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {service.location_type.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                <Badge variant="outline" className="ml-4">
                  {service.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="descripcion">
                <TabsList className="mb-4">
                  <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                  <TabsTrigger value="disponibilidad">Disponibilidad</TabsTrigger>
                  <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
                </TabsList>

                <TabsContent value="descripcion" className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Acerca del servicio</h3>
                    <p className="text-gray-700 leading-relaxed">{service.description}</p>
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
                </TabsContent>

                <TabsContent value="disponibilidad">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Días disponibles</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.availability.days.map((day, index) => (
                          <Badge key={index} variant="secondary">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {service.availability.hours.start && service.availability.hours.end && (
                      <div>
                        <h3 className="font-semibold mb-2">Horarios</h3>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>
                            {service.availability.hours.start} - {service.availability.hours.end}
                          </span>
                        </div>
                      </div>
                    )}
                    {service.duration && (
                      <div>
                        <h3 className="font-semibold mb-2">Duración estimada</h3>
                        <p className="text-gray-700">{service.duration}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="requisitos">
                  <div>
                    <h3 className="font-semibold mb-2">Requisitos y consideraciones</h3>
                    <p className="text-gray-700">
                      {service.requirements || "No se especifican requisitos adicionales."}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardHeader>
              <CardTitle>Reseñas del Proveedor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Las reseñas se mostrarán aquí cuando estén disponibles</p>
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
                    {service.price_min && service.price_max ? (
                      service.price_min === service.price_max ? (
                        formatPrice(service.price_min)
                      ) : (
                        <>
                          {formatPrice(service.price_min)} - {formatPrice(service.price_max)}
                        </>
                      )
                    ) : service.price_type === "negotiable" ? (
                      "A convenir"
                    ) : (
                      "Consultar"
                    )}
                  </div>
                  <p className="text-sm text-gray-600 capitalize">
                    {service.price_type === "hourly"
                      ? "Por hora"
                      : service.price_type === "fixed"
                        ? "Precio fijo"
                        : "Negociable"}
                  </p>
                </div>

                <div className="space-y-3">
                  <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-[#007bff] hover:bg-[#0056b3]">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contactar Proveedor
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contactar a {service.provider_name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="message">Mensaje</Label>
                          <Textarea
                            id="message"
                            placeholder="Describe tu proyecto y cuándo necesitas el servicio..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <div className="flex space-x-3">
                          <Button onClick={handleContact} className="flex-1 bg-[#007bff] hover:bg-[#0056b3]">
                            Enviar Mensaje
                          </Button>
                          <Button variant="outline" onClick={() => setShowContactModal(false)}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

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
                <Shield className="h-5 w-5" />
                <span>Proveedor</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={service.provider_avatar || "/placeholder.svg"} alt={service.provider_name} />
                    <AvatarFallback>{service.provider_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold flex items-center space-x-2">
                      <span>{service.provider_name}</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {service.provider_rating || "5.0"} (Nuevo proveedor)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Identidad verificada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Proveedor confiable</span>
                  </div>
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

      {/* Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-4xl">
          <div className="relative">
            <img
              src={service.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${service.title} - Imagen ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            {service.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
