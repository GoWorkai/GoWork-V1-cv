"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Briefcase,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Trash,
  Users,
  DollarSign,
  Clock,
  ImageIcon,
  MapPin,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const services = [
  {
    id: 1,
    title: "Diseño de logotipos profesionales",
    category: "Diseño",
    subcategory: "Identidad visual",
    status: "active",
    price: { min: 25000, max: 75000, type: "fixed" },
    views: 342,
    inquiries: 24,
    rating: 4.9,
    reviews: 18,
    image: "/placeholder.svg?height=200&width=300&text=Logo+Design",
    description:
      "Diseño de logotipos modernos y profesionales para tu empresa o proyecto. Incluye 3 propuestas y 2 rondas de revisiones.",
    tags: ["Branding", "Identidad visual", "Diseño gráfico"],
    location: "Santiago Centro",
  },
  {
    id: 2,
    title: "Desarrollo web full stack",
    category: "Tecnología",
    subcategory: "Desarrollo web",
    status: "active",
    price: { min: 150000, max: 500000, type: "project" },
    views: 187,
    inquiries: 12,
    rating: 4.8,
    reviews: 9,
    image: "/placeholder.svg?height=200&width=300&text=Web+Development",
    description:
      "Desarrollo de sitios web y aplicaciones a medida. Especialista en React, Node.js y bases de datos SQL/NoSQL.",
    tags: ["Desarrollo web", "React", "Node.js", "Bases de datos"],
    location: "Providencia",
  },
  {
    id: 3,
    title: "Clases de guitarra para principiantes",
    category: "Educación",
    subcategory: "Música",
    status: "paused",
    price: { min: 15000, max: 25000, type: "hourly" },
    views: 98,
    inquiries: 5,
    rating: 5.0,
    reviews: 7,
    image: "/placeholder.svg?height=200&width=300&text=Guitar+Lessons",
    description:
      "Clases personalizadas de guitarra para todos los niveles. Aprende a tocar tus canciones favoritas desde la primera clase.",
    tags: ["Música", "Guitarra", "Clases particulares"],
    location: "Ñuñoa",
  },
]

export default function MyServicesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mis servicios</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo servicio
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear nuevo servicio</DialogTitle>
              <DialogDescription>
                Completa la información de tu servicio para publicarlo en la plataforma.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Título del servicio</Label>
                  <Input id="title" placeholder="Ej: Diseño de logotipos profesionales" />
                </div>
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Diseño</SelectItem>
                      <SelectItem value="tech">Tecnología</SelectItem>
                      <SelectItem value="home">Hogar</SelectItem>
                      <SelectItem value="education">Educación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategoría</Label>
                  <Select>
                    <SelectTrigger id="subcategory">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="logo">Logotipos</SelectItem>
                      <SelectItem value="web">Sitios web</SelectItem>
                      <SelectItem value="app">Aplicaciones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price-min">Precio mínimo</Label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={16}
                    />
                    <Input id="price-min" className="pl-9" placeholder="25000" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="price-max">Precio máximo</Label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={16}
                    />
                    <Input id="price-max" className="pl-9" placeholder="75000" />
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="price-type">Tipo de precio</Label>
                  <Select>
                    <SelectTrigger id="price-type">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Precio fijo</SelectItem>
                      <SelectItem value="hourly">Por hora</SelectItem>
                      <SelectItem value="project">Por proyecto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu servicio en detalle..."
                    className="resize-none"
                    rows={4}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="tags">Etiquetas (separadas por coma)</Label>
                  <Input id="tags" placeholder="Ej: diseño, logo, branding" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                    <Input id="location" className="pl-9" placeholder="Ej: Santiago Centro" />
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="image">Imágenes</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Subir imágenes</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              >
                Publicar servicio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="active">Activos</TabsTrigger>
          <TabsTrigger value="paused">Pausados</TabsTrigger>
          <TabsTrigger value="draft">Borradores</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services
              .filter((service) => service.status === "active")
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="paused" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services
              .filter((service) => service.status === "paused")
              .map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="mt-4">
          <div className="text-center p-8">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes borradores</h3>
            <p className="text-gray-600 mb-4">Comienza a crear un nuevo servicio para guardar como borrador</p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear servicio
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {activeTab === "active" && services.filter((service) => service.status === "active").length === 0 && (
        <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes servicios activos</h3>
          <p className="text-gray-600 mb-4">Comienza a ofrecer tus servicios en la plataforma</p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            Crear servicio
          </Button>
        </div>
      )}

      {activeTab === "paused" && services.filter((service) => service.status === "paused").length === 0 && (
        <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes servicios pausados</h3>
          <p className="text-gray-600">Los servicios pausados no aparecen en las búsquedas</p>
        </div>
      )}
    </div>
  )
}

interface ServiceCardProps {
  service: any
}

function ServiceCard({ service }: ServiceCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }}></div>
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start justify-between">
          <Badge
            className={`${
              service.category === "Diseño"
                ? "bg-pink-100 text-pink-800"
                : service.category === "Tecnología"
                  ? "bg-purple-100 text-purple-800"
                  : service.category === "Hogar"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-indigo-100 text-indigo-800"
            }`}
          >
            {service.category}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Editar</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                <span>Ver publicación</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                <span>{service.status === "active" ? "Pausar" : "Activar"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-base font-medium mt-2 line-clamp-2">{service.title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-1">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{service.location}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {service.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-gray-50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-900">
          {formatPrice(service.price.min)} - {formatPrice(service.price.max)}
          <span className="text-xs text-gray-500 ml-1">
            {service.price.type === "hourly" ? "/hora" : service.price.type === "project" ? "/proyecto" : ""}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            {service.views}
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            {service.inquiries}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
