"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  MapPin,
  Star,
  Filter,
  Clock,
  ChevronDown,
  Grid,
  List,
  Briefcase,
  Home,
  Palette,
  Code,
  Camera,
  Wrench,
  Heart,
  GraduationCap,
  Car,
} from "lucide-react"

const categories = [
  { name: "Hogar", icon: Home, color: "bg-blue-500" },
  { name: "Tecnología", icon: Code, color: "bg-purple-500" },
  { name: "Diseño", icon: Palette, color: "bg-pink-500" },
  { name: "Eventos", icon: Camera, color: "bg-orange-500" },
  { name: "Reparaciones", icon: Wrench, color: "bg-green-500" },
  { name: "Bienestar", icon: Heart, color: "bg-red-500" },
  { name: "Educación", icon: GraduationCap, color: "bg-indigo-500" },
  { name: "Transporte", icon: Car, color: "bg-yellow-500" },
]

const services = [
  {
    id: 1,
    title: "Diseño de logotipos profesionales",
    category: "Diseño",
    price: { min: 25000, max: 75000 },
    rating: 4.9,
    reviews: 124,
    provider: {
      name: "Ana Martínez",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      verified: true,
    },
    location: "Santiago Centro",
    distance: 2.4,
    description:
      "Diseño de logotipos modernos y profesionales para tu empresa o proyecto. Incluye 3 propuestas y 2 rondas de revisiones.",
    tags: ["Branding", "Identidad visual", "Diseño gráfico"],
  },
  {
    id: 2,
    title: "Desarrollo web full stack",
    category: "Tecnología",
    price: { min: 150000, max: 500000 },
    rating: 4.8,
    reviews: 87,
    provider: {
      name: "Carlos Rojas",
      avatar: "/placeholder.svg?height=40&width=40&text=CR",
      verified: true,
    },
    location: "Providencia",
    distance: 3.8,
    description:
      "Desarrollo de sitios web y aplicaciones a medida. Especialista en React, Node.js y bases de datos SQL/NoSQL.",
    tags: ["Desarrollo web", "React", "Node.js", "Bases de datos"],
  },
  {
    id: 3,
    title: "Limpieza de hogar profesional",
    category: "Hogar",
    price: { min: 20000, max: 45000 },
    rating: 4.7,
    reviews: 215,
    provider: {
      name: "María González",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
      verified: true,
    },
    location: "Las Condes",
    distance: 5.1,
    description:
      "Servicio de limpieza profesional para hogares y oficinas. Incluye limpieza profunda, desinfección y organización.",
    tags: ["Limpieza", "Desinfección", "Organización"],
  },
  {
    id: 4,
    title: "Clases de guitarra para principiantes",
    category: "Educación",
    price: { min: 15000, max: 25000 },
    rating: 4.9,
    reviews: 56,
    provider: {
      name: "Pedro Sánchez",
      avatar: "/placeholder.svg?height=40&width=40&text=PS",
      verified: false,
    },
    location: "Ñuñoa",
    distance: 4.2,
    description:
      "Clases personalizadas de guitarra para todos los niveles. Aprende a tocar tus canciones favoritas desde la primera clase.",
    tags: ["Música", "Guitarra", "Clases particulares"],
  },
]

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Explorar servicios</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="¿Qué servicio estás buscando?"
              className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="hidden sm:inline">Ubicación</span>
              <ChevronDown size={16} />
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span className="hidden sm:inline">Filtros</span>
              <ChevronDown size={16} />
            </Button>
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "bg-white"}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "bg-white"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="nearby">Cercanos</TabsTrigger>
          <TabsTrigger value="popular">Populares</TabsTrigger>
          <TabsTrigger value="recent">Recientes</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Categorías</h3>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                          <category.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{category.name}</span>
                      </button>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <h3 className="font-medium text-gray-900 mb-4">Filtros</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Rango de precio</h4>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="Mín" className="w-full" />
                        <span>-</span>
                        <Input placeholder="Máx" className="w-full" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Calificación</h4>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100"
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Distancia máxima</h4>
                      <div className="flex items-center space-x-2">
                        <Input placeholder="5" className="w-20" />
                        <span className="text-sm text-gray-500">km</span>
                      </div>
                    </div>

                    <Button className="w-full">Aplicar filtros</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                        <Briefcase className="h-12 w-12 text-gray-400" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
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
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{service.rating}</span>
                            <span className="text-xs text-gray-500 ml-1">({service.reviews})</span>
                          </div>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{service.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>
                            {service.location} ({service.distance} km)
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-gray-900">
                            {formatPrice(service.price.min)} - {formatPrice(service.price.max)}
                          </div>
                          <Button size="sm">Ver detalles</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service) => (
                    <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-48 h-40 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-12 w-12 text-gray-400" />
                          </div>
                          <div className="p-4 flex-1">
                            <div className="flex items-start justify-between mb-2">
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
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm font-medium">{service.rating}</span>
                                <span className="text-xs text-gray-500 ml-1">({service.reviews})</span>
                              </div>
                            </div>
                            <h3 className="font-medium text-gray-900 mb-1">{service.title}</h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{service.description}</p>
                            <div className="flex flex-wrap gap-1 mb-3">
                              {service.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={service.provider.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{service.provider.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 flex items-center">
                                    {service.provider.name}
                                    {service.provider.verified && (
                                      <Badge className="ml-1 bg-blue-100 text-blue-800 h-5">Verificado</Badge>
                                    )}
                                  </p>
                                  <p className="text-xs text-gray-500 flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {service.location} ({service.distance} km)
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">
                                  {formatPrice(service.price.min)} - {formatPrice(service.price.max)}
                                </div>
                                <Button size="sm" className="mt-1">
                                  Ver detalles
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="nearby" className="mt-4">
          <div className="text-center p-8">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Servicios cercanos a tu ubicación</h3>
            <p className="text-gray-600 mb-4">Mostrando servicios en un radio de 5 km</p>
            <Button>Permitir acceso a ubicación</Button>
          </div>
        </TabsContent>
        <TabsContent value="popular" className="mt-4">
          <div className="text-center p-8">
            <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Servicios más populares</h3>
            <p className="text-gray-600">Basado en calificaciones y número de contrataciones</p>
          </div>
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          <div className="text-center p-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Servicios recientes</h3>
            <p className="text-gray-600">Últimas publicaciones en la plataforma</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
