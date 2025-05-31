import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Award,
  Share2,
} from "lucide-react"
import Link from "next/link"

export default function ProviderProfilePage() {
  const provider = {
    name: "Juan Martínez",
    title: "Electricista Certificado",
    rating: 4.9,
    reviews: 127,
    completedJobs: 234,
    location: "Las Condes, Santiago",
    joinedDate: "2019",
    verified: true,
    responseTime: "15 minutos",
    languages: ["Español", "Inglés"],
    hourlyRate: "$80/hora",
    availability: "Disponible hoy",
  }

  const services = [
    {
      id: 1,
      title: "Instalación eléctrica completa",
      price: "Desde $80/hora",
      rating: 4.9,
      reviews: 45,
      image: "⚡",
    },
    {
      id: 2,
      title: "Reparación de tableros eléctricos",
      price: "Desde $100/hora",
      rating: 5.0,
      reviews: 32,
      image: "🔌",
    },
    {
      id: 3,
      title: "Instalación de iluminación LED",
      price: "Desde $60/hora",
      rating: 4.8,
      reviews: 28,
      image: "💡",
    },
    {
      id: 4,
      title: "Servicios de emergencia",
      price: "Desde $120/hora",
      rating: 4.9,
      reviews: 22,
      image: "🚨",
    },
  ]

  const reviews = [
    {
      id: 1,
      user: "María Rodríguez",
      rating: 5,
      date: "Hace 2 días",
      text: "Excelente trabajo, muy profesional y rápido. Solucionó todos los problemas eléctricos de mi casa sin ningún inconveniente.",
      service: "Instalación de enchufes",
      images: ["🏠", "⚡"],
    },
    {
      id: 2,
      user: "Carlos López",
      rating: 5,
      date: "Hace 1 semana",
      text: "Juan es muy confiable y conoce mucho del tema. Lo recomiendo 100%. El trabajo quedó perfecto y dio garantía.",
      service: "Reparación de tablero eléctrico",
      images: ["🔌"],
    },
    {
      id: 3,
      user: "Ana García",
      rating: 4,
      date: "Hace 2 semanas",
      text: "Buen servicio, llegó puntual y el trabajo quedó perfecto. Precios justos y muy ordenado en su trabajo.",
      service: "Instalación de luces",
      images: ["💡", "🏠"],
    },
  ]

  const portfolio = [
    { id: 1, title: "Instalación residencial completa", type: "Residencial", image: "🏠" },
    { id: 2, title: "Tablero eléctrico comercial", type: "Comercial", image: "🏢" },
    { id: 3, title: "Sistema de iluminación LED", type: "Iluminación", image: "💡" },
    { id: 4, title: "Instalación industrial", type: "Industrial", image: "🏭" },
    { id: 5, title: "Sistema de emergencia", type: "Emergencia", image: "🚨" },
    { id: 6, title: "Automatización residencial", type: "Domótica", image: "🏠" },
  ]

  const certifications = [
    { name: "Certificación SEC Clase A", year: "2023", issuer: "SEC Chile" },
    { name: "Instalador Autorizado", year: "2022", issuer: "MINVU" },
    { name: "Curso de Seguridad Eléctrica", year: "2023", issuer: "ACHS" },
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
        {/* Provider Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#0066FF] to-[#00E5B4] rounded-full flex items-center justify-center text-4xl font-bold">
                {provider.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{provider.name}</h1>
                  {provider.verified && (
                    <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">
                      <Verified className="h-4 w-4 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-gray-300 mb-3">{provider.title}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-medium">{provider.rating}</span>
                    <span>({provider.reviews} reseñas)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-[#00E5B4]" />
                    <span>{provider.completedJobs} trabajos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{provider.location}</span>
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
                    {provider.availability}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    Responde en {provider.responseTime}
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    Miembro desde {provider.joinedDate}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#00E5B4] mb-1">{provider.rating}</div>
                  <div className="text-xs text-gray-400">Calificación</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#0066FF] mb-1">{provider.completedJobs}</div>
                  <div className="text-xs text-gray-400">Trabajos</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#FF6D3A] mb-1">{provider.responseTime}</div>
                  <div className="text-xs text-gray-400">Respuesta</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-[#B297FF] mb-1">100%</div>
                  <div className="text-xs text-gray-400">Confiabilidad</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Card */}
          <div>
            <Card className="bg-gray-900 border-gray-700 sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-[#00E5B4] mb-1">{provider.hourlyRate}</div>
                  <p className="text-sm text-gray-400">Tarifa base por hora</p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Enviar mensaje
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Phone className="h-4 w-4 mr-2" />
                    Llamar ahora
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar cita
                  </Button>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Idiomas</span>
                    <span>{provider.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Zona de trabajo</span>
                    <span>Santiago, RM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Disponibilidad</span>
                    <span className="text-[#00E5B4]">Hoy</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <Shield className="h-4 w-4" />
                    <span>Proveedor verificado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="servicios" className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-700">
            <TabsTrigger value="servicios" className="data-[state=active]:bg-[#0066FF] data-[state=active]:text-white">
              Servicios
            </TabsTrigger>
            <TabsTrigger value="resenas" className="data-[state=active]:bg-[#0066FF] data-[state=active]:text-white">
              Reseñas
            </TabsTrigger>
            <TabsTrigger value="portafolio" className="data-[state=active]:bg-[#0066FF] data-[state=active]:text-white">
              Portafolio
            </TabsTrigger>
            <TabsTrigger
              value="certificaciones"
              className="data-[state=active]:bg-[#0066FF] data-[state=active]:text-white"
            >
              Certificaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="servicios" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0066FF] to-[#00E5B4] rounded-lg flex items-center justify-center text-xl">
                        {service.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{service.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{service.rating}</span>
                            <span>({service.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#00E5B4] font-medium">{service.price}</span>
                          <Link href={`/servicios/${service.id}`}>
                            <Button size="sm" className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
                              Ver detalles
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resenas" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Reseñas de clientes</h2>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium">{provider.rating}</span>
                    <span className="text-gray-400">({provider.reviews} reseñas)</span>
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
                          <p className="text-gray-300 mb-3">{review.text}</p>
                          {review.images && (
                            <div className="flex space-x-2">
                              {review.images.map((img, index) => (
                                <div
                                  key={index}
                                  className="w-12 h-12 bg-gray-800 rounded border border-gray-600 flex items-center justify-center text-lg"
                                >
                                  {img}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portafolio" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Trabajos realizados</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {portfolio.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="aspect-square bg-gray-800 rounded-lg border border-gray-700 hover:border-[#00E5B4] transition-colors flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                        {item.image}
                      </div>
                      <div className="mt-3">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificaciones" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Certificaciones y títulos</h2>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg border border-gray-700"
                    >
                      <div className="w-12 h-12 bg-[#00E5B4]/20 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-[#00E5B4]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{cert.name}</h3>
                        <p className="text-sm text-gray-400">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                      <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">Verificado</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
