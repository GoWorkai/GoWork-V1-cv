import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Star,
  MapPin,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Clock,
  Verified,
  Heart,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

export default function ServiciosPage() {
  const services = [
    {
      id: 1,
      title: "Instalación eléctrica completa",
      provider: "Juan Martínez",
      category: "Electricista",
      rating: 4.9,
      reviews: 127,
      price: "Desde $80/hora",
      location: "Las Condes, Santiago",
      distance: "2.3 km",
      verified: true,
      available: "Disponible hoy",
      image: "⚡",
      tags: ["Instalación", "Reparación", "Emergencias"],
      responseTime: "< 15 min",
    },
    {
      id: 2,
      title: "Diseño de identidad corporativa",
      provider: "Ana López",
      category: "Diseñadora Gráfica",
      rating: 5.0,
      reviews: 89,
      price: "Desde $150/proyecto",
      location: "Providencia, Santiago",
      distance: "1.8 km",
      verified: true,
      available: "Disponible mañana",
      image: "🎨",
      tags: ["Logo", "Branding", "Identidad"],
      responseTime: "< 30 min",
    },
    {
      id: 3,
      title: "Reparación y mantención de cañerías",
      provider: "Carlos Ruiz",
      category: "Plomero",
      rating: 4.8,
      reviews: 203,
      price: "Desde $60/hora",
      location: "Ñuñoa, Santiago",
      distance: "3.1 km",
      verified: true,
      available: "Disponible ahora",
      image: "🔧",
      tags: ["Reparación", "Mantención", "Emergencias"],
      responseTime: "< 10 min",
    },
    {
      id: 4,
      title: "Desarrollo de aplicaciones web",
      provider: "Luis Pérez",
      category: "Desarrollador",
      rating: 4.9,
      reviews: 156,
      price: "Desde $120/hora",
      location: "Las Condes, Santiago",
      distance: "2.7 km",
      verified: true,
      available: "Disponible esta semana",
      image: "💻",
      tags: ["React", "Node.js", "Full Stack"],
      responseTime: "< 45 min",
    },
    {
      id: 5,
      title: "Clases de cocina personalizadas",
      provider: "María García",
      category: "Chef",
      rating: 5.0,
      reviews: 94,
      price: "Desde $90/sesión",
      location: "Vitacura, Santiago",
      distance: "4.2 km",
      verified: true,
      available: "Disponible fines de semana",
      image: "👨‍🍳",
      tags: ["Cocina", "Clases", "Personalizado"],
      responseTime: "< 20 min",
    },
    {
      id: 6,
      title: "Sesión fotográfica profesional",
      provider: "David Silva",
      category: "Fotógrafo",
      rating: 4.7,
      reviews: 78,
      price: "Desde $200/sesión",
      location: "Centro, Santiago",
      distance: "5.1 km",
      verified: true,
      available: "Disponible próxima semana",
      image: "📸",
      tags: ["Retrato", "Evento", "Comercial"],
      responseTime: "< 25 min",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="text-2xl font-bold">
                <span className="text-[#0066FF]">Go</span>
                <span className="text-[#00E5B4]">Work</span>
              </div>
            </div>
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar servicios..."
                  className="bg-gray-900 border-gray-700 text-white pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                />
              </div>
            </div>
            <Button size="sm" className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium">
              Contactar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explorar servicios</h1>
          <p className="text-gray-400 text-lg">Encuentra el servicio perfecto para tus necesidades</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filtros:</span>
          </div>

          <Select>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="electricista">Electricista</SelectItem>
              <SelectItem value="plomero">Plomero</SelectItem>
              <SelectItem value="diseñador">Diseñador</SelectItem>
              <SelectItem value="programador">Programador</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Ubicación" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="las-condes">Las Condes</SelectItem>
              <SelectItem value="providencia">Providencia</SelectItem>
              <SelectItem value="nunoa">Ñuñoa</SelectItem>
              <SelectItem value="vitacura">Vitacura</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Precio" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="0-50">$0 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-200">$100 - $200</SelectItem>
              <SelectItem value="200+">$200+</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Disponibilidad" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="ahora">Disponible ahora</SelectItem>
              <SelectItem value="hoy">Disponible hoy</SelectItem>
              <SelectItem value="semana">Esta semana</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Más filtros
          </Button>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400">
            Mostrando <span className="text-white font-medium">127 servicios</span> disponibles
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Ordenar por:</span>
            <Select>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
                <SelectValue placeholder="Relevancia" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="relevancia">Relevancia</SelectItem>
                <SelectItem value="precio-menor">Precio: menor a mayor</SelectItem>
                <SelectItem value="precio-mayor">Precio: mayor a menor</SelectItem>
                <SelectItem value="calificacion">Mejor calificación</SelectItem>
                <SelectItem value="distancia">Más cercano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-200 cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0066FF] to-[#00E5B4] rounded-full flex items-center justify-center text-2xl">
                      {service.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-lg group-hover:text-[#00E5B4] transition-colors">
                          {service.title}
                        </h3>
                        {service.verified && (
                          <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30 text-xs">
                            <Verified className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-1">
                        {service.provider} • {service.category}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white font-medium">{service.rating}</span>
                          <span>({service.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{service.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{service.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#00E5B4] font-medium">{service.price}</span>
                    <Badge
                      className="text-xs"
                      variant={service.available.includes("ahora") ? "default" : "secondary"}
                      style={{
                        backgroundColor: service.available.includes("ahora") ? "#00E5B420" : "#FF6D3A20",
                        color: service.available.includes("ahora") ? "#00E5B4" : "#FF6D3A",
                        border: `1px solid ${service.available.includes("ahora") ? "#00E5B430" : "#FF6D3A30"}`,
                      }}
                    >
                      {service.available}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{service.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-3 pt-3">
                    <Link href={`/servicios/${service.id}`} className="flex-1">
                      <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white">Ver detalles</Button>
                    </Link>
                    <Link href={`/proveedor/${service.provider.toLowerCase().replace(" ", "-")}`}>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        Ver perfil
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
            Cargar más servicios
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
