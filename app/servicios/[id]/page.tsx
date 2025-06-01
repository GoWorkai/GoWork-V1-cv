import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Star,
  MapPin,
  Clock,
  Shield,
  Verified,
  Heart,
  ArrowLeft,
  MessageCircle,
  Phone,
  Calendar,
  CheckCircle,
  User,
  Camera,
  Share2,
} from "lucide-react"
import Link from "next/link"

export default function ServiceDetailPage() {
  const service = {
    id: 1,
    title: "Instalación eléctrica completa",
    provider: "Juan Martínez",
    category: "Electricista Certificado",
    rating: 4.9,
    reviews: 127,
    completedJobs: 234,
    price: "Desde $80/hora",
    location: "Las Condes, Santiago",
    distance: "2.3 km",
    verified: true,
    available: "Disponible hoy",
    responseTime: "Responde en menos de 15 minutos",
    joinedDate: "Miembro desde 2019",
    languages: ["Español", "Inglés"],
  }

  const reviews = [
    {
      id: 1,
      user: "María Rodríguez",
      rating: 5,
      date: "Hace 2 días",
      text: "Excelente trabajo, muy profesional y rápido. Solucionó todos los problemas eléctricos de mi casa.",
      service: "Instalación de enchufes",
    },
    {
      id: 2,
      user: "Carlos López",
      rating: 5,
      date: "Hace 1 semana",
      text: "Juan es muy confiable y conoce mucho del tema. Lo recomiendo 100%.",
      service: "Reparación de tablero eléctrico",
    },
    {
      id: 3,
      user: "Ana García",
      rating: 4,
      date: "Hace 2 semanas",
      text: "Buen servicio, llegó puntual y el trabajo quedó perfecto. Precios justos.",
      service: "Instalación de luces",
    },
  ]

  const gallery = [
    { id: 1, type: "Instalación residencial", image: "🏠" },
    { id: 2, type: "Tablero eléctrico", image: "⚡" },
    { id: 3, type: "Instalación comercial", image: "🏢" },
    { id: 4, type: "Iluminación LED", image: "💡" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/servicios">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="text-2xl font-bold">
                <span className="text-[#0066FF]">Go</span>
                <span className="text-[#00E5B4]">Work</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium">
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0066FF] to-[#00E5B4] rounded-full flex items-center justify-center text-3xl">
                  ⚡
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold">{service.title}</h1>
                    {service.verified && (
                      <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">
                        <Verified className="h-4 w-4 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                  <Link
                    href={`/proveedor/${service.provider.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-[#00E5B4] transition-colors"
                  >
                    <p className="text-xl text-gray-300 mb-2">
                      {service.provider} • {service.category}
                    </p>
                  </Link>
                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-medium">{service.rating}</span>
                      <span>({service.reviews} reseñas)</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-[#00E5B4]" />
                      <span>{service.completedJobs} trabajos completados</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {service.location} • {service.distance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge
                  className="text-sm"
                  style={{
                    backgroundColor: "#00E5B420",
                    color: "#00E5B4",
                    border: "1px solid #00E5B430",
                  }}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  {service.available}
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  {service.responseTime}
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  {service.joinedDate}
                </Badge>
              </div>
            </div>

            {/* Service Description */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Descripción del servicio</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Ofrezco servicios de instalación eléctrica completa para hogares y oficinas. Con más de 10 años de
                    experiencia en el rubro, garantizo trabajos de calidad y total seguridad.
                  </p>
                  <p>Mis servicios incluyen:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Instalación de enchufes y interruptores</li>
                    <li>Instalación y reparación de tableros eléctricos</li>
                    <li>Cableado estructural para casas y oficinas</li>
                    <li>Instalación de iluminación LED</li>
                    <li>Revisión y mantención de instalaciones</li>
                    <li>Servicios de emergencia 24/7</li>
                  </ul>
                  <p>
                    Trabajo con materiales de primera calidad y todos mis trabajos incluyen garantía de 1 año. Tengo
                    seguro de responsabilidad civil y todas las certificaciones necesarias.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio/Gallery */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Trabajos realizados</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gallery.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="aspect-square bg-gray-800 rounded-lg border border-gray-700 hover:border-[#00E5B4] transition-colors flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                        {item.image}
                      </div>
                      <p className="text-sm text-gray-400 mt-2 text-center">{item.type}</p>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-gray-400 hover:text-white">
                  <Camera className="h-4 w-4 mr-2" />
                  Ver más trabajos
                </Button>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Reseñas ({service.reviews})</h2>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium">{service.rating}</span>
                    <span className="text-gray-400">de 5</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-700 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#0066FF] to-[#00E5B4] rounded-full flex items-center justify-center text-sm font-medium">
                          {review.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{review.user}</h4>
                              <p className="text-sm text-gray-400">
                                {review.service} • {review.date}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300">{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-800">
                  Ver todas las reseñas
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="bg-gray-900 border-gray-700 sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00E5B4] mb-1">{service.price}</div>
                    <p className="text-sm text-gray-400">Precio base por hora</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Describe tu proyecto</label>
                      <Textarea
                        placeholder="Cuéntanos qué necesitas..."
                        className="bg-gray-800 border-gray-600 text-white resize-none"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Fecha preferida</label>
                      <Input type="date" className="bg-gray-800 border-gray-600 text-white" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Hora preferida</label>
                      <Input type="time" className="bg-gray-800 border-gray-600 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href={`/booking/${service.id}`}>
                      <Button className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium">
                        <Calendar className="h-4 w-4 mr-2" />
                        Solicitar servicio
                      </Button>
                    </Link>
                    <Link href="/chat">
                      <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Enviar mensaje
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                      <Phone className="h-4 w-4 mr-2" />
                      Llamar ahora
                    </Button>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                      <Shield className="h-4 w-4" />
                      <span>Pago seguro • Garantía incluida</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Información del proveedor</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Respuesta promedio</span>
                    <span>{service.responseTime.replace("Responde en ", "")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Trabajos completados</span>
                    <span>{service.completedJobs}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Idiomas</span>
                    <span>{service.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Miembro desde</span>
                    <span>2019</span>
                  </div>
                </div>
                <Link href={`/proveedor/${service.provider.toLowerCase().replace(" ", "-")}`}>
                  <Button variant="outline" className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-800">
                    <User className="h-4 w-4 mr-2" />
                    Ver perfil completo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
