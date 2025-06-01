"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Upload, X, Plus } from "lucide-react"
import { type CreateServiceData, type Service, SERVICE_CATEGORIES } from "@/types/service"
import { servicesAPI } from "@/lib/services-api"
import { useAuth } from "@/hooks/use-auth"

interface ServiceFormProps {
  service?: Service
  onSuccess?: (service: Service) => void
}

export function ServiceForm({ service, onSuccess }: ServiceFormProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newTag, setNewTag] = useState("")

  const [formData, setFormData] = useState<CreateServiceData>({
    title: service?.title || "",
    description: service?.description || "",
    category: service?.category || "",
    subcategory: service?.subcategory || "",
    price_type: service?.price_type || "fixed",
    price_min: service?.price_min || undefined,
    price_max: service?.price_max || undefined,
    duration: service?.duration || "",
    location: service?.location || "",
    location_type: service?.location_type || "flexible",
    images: [],
    tags: service?.tags || [],
    availability: service?.availability || {
      days: [],
      hours: { start: "09:00", end: "18:00" },
    },
    requirements: service?.requirements || "",
  })

  const [imagePreview, setImagePreview] = useState<string[]>(service?.images || [])

  const handleInputChange = (field: keyof CreateServiceData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Validar tamaño y tipo
    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setError("Las imágenes deben ser menores a 5MB")
        return false
      }
      if (!file.type.startsWith("image/")) {
        setError("Solo se permiten archivos de imagen")
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    // Crear previews
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file))
    setImagePreview((prev) => [...prev, ...newPreviews])

    // Añadir archivos al formulario
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }))
  }

  const removeImage = (index: number) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index))
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter((d) => d !== day)
          : [...prev.availability.days, day],
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)
    setError(null)

    try {
      let result: Service

      if (service) {
        // Actualizar servicio existente
        result = await servicesAPI.updateService(service.id, formData, user.id)
      } else {
        // Crear nuevo servicio
        result = await servicesAPI.createService(formData, user.id)
      }

      if (onSuccess) {
        onSuccess(result)
      } else {
        router.push(`/dashboard/my-services`)
      }
    } catch (err: any) {
      setError(err.message || "Error al guardar el servicio")
    } finally {
      setIsLoading(false)
    }
  }

  const subcategories = formData.category
    ? SERVICE_CATEGORIES[formData.category as keyof typeof SERVICE_CATEGORIES]?.subcategories || []
    : []

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{service ? "Editar Servicio" : "Crear Nuevo Servicio"}</CardTitle>
          <CardDescription>
            Completa la información de tu servicio para que los clientes puedan encontrarte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del servicio *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ej: Reparación de grifería a domicilio"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SERVICE_CATEGORIES).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {subcategories.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategoría</Label>
                <Select value={formData.subcategory} onValueChange={(value) => handleInputChange("subcategory", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una subcategoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Ej: Santiago, Las Condes"
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe tu servicio, experiencia y qué incluye..."
              rows={4}
              required
            />
          </div>

          {/* Precios */}
          <div className="space-y-4">
            <Label>Tipo de precio *</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Select
                  value={formData.price_type}
                  onValueChange={(value: any) => handleInputChange("price_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Precio fijo</SelectItem>
                    <SelectItem value="hourly">Por hora</SelectItem>
                    <SelectItem value="negotiable">Negociable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.price_type !== "negotiable" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="price_min">Precio mínimo (CLP)</Label>
                    <Input
                      id="price_min"
                      type="number"
                      value={formData.price_min || ""}
                      onChange={(e) => handleInputChange("price_min", Number.parseInt(e.target.value) || undefined)}
                      placeholder="15000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price_max">Precio máximo (CLP)</Label>
                    <Input
                      id="price_max"
                      type="number"
                      value={formData.price_max || ""}
                      onChange={(e) => handleInputChange("price_max", Number.parseInt(e.target.value) || undefined)}
                      placeholder="50000"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Modalidad y duración */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Modalidad del servicio</Label>
              <Select
                value={formData.location_type}
                onValueChange={(value: any) => handleInputChange("location_type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client_location">En domicilio del cliente</SelectItem>
                  <SelectItem value="provider_location">En mi ubicación</SelectItem>
                  <SelectItem value="remote">Remoto/Online</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duración estimada</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="Ej: 2-3 horas, 1 día, 1 semana"
              />
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="space-y-4">
            <Label>Disponibilidad</Label>
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Días disponibles</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={formData.availability.days.includes(day)}
                        onCheckedChange={() => toggleDay(day)}
                      />
                      <Label htmlFor={day} className="text-sm">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_time">Hora inicio</Label>
                  <Input
                    id="start_time"
                    type="time"
                    value={formData.availability.hours.start}
                    onChange={(e) =>
                      handleInputChange("availability", {
                        ...formData.availability,
                        hours: { ...formData.availability.hours, start: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time">Hora fin</Label>
                  <Input
                    id="end_time"
                    type="time"
                    value={formData.availability.hours.end}
                    onChange={(e) =>
                      handleInputChange("availability", {
                        ...formData.availability,
                        hours: { ...formData.availability.hours, end: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Imágenes */}
          <div className="space-y-4">
            <Label>Imágenes del servicio</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="images"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click para subir</span> o arrastra imágenes
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG hasta 5MB cada una</p>
                  </div>
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>

              {imagePreview.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <Label>Etiquetas (palabras clave)</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Añadir etiqueta..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Requisitos */}
          <div className="space-y-2">
            <Label htmlFor="requirements">Requisitos o materiales necesarios</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange("requirements", e.target.value)}
              placeholder="Ej: El cliente debe proporcionar las herramientas básicas..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {service ? "Actualizando..." : "Creando..."}
            </>
          ) : service ? (
            "Actualizar Servicio"
          ) : (
            "Crear Servicio"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
