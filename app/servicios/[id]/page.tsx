import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Star, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Simulación de datos de servicios
const servicios = [
  {
    id: "1",
    titulo: "Diseño de Logotipos Profesionales",
    categoria: "diseño",
    proveedor: {
      nombre: "María González",
      avatar: "/placeholder.svg?height=50&width=50",
      calificacion: 4.8,
      proyectos: 124,
      ubicacion: "Santiago, Chile",
    },
    descripcion:
      "Diseño de logotipos profesionales y personalizados para tu marca o empresa. Incluye 3 propuestas iniciales, 2 rondas de revisiones y entrega de archivos en formatos editables y para web.",
    precio: 45000,
    duracion: "3-5 días",
    imagen: "/placeholder.svg?height=400&width=600",
    galeria: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
    reseñas: [
      {
        usuario: "Carlos Mendoza",
        avatar: "/placeholder.svg?height=40&width=40",
        calificacion: 5,
        fecha: "15/05/2023",
        comentario: "Excelente trabajo, muy profesional y entregado antes del plazo acordado. Totalmente recomendado.",
      },
      {
        usuario: "Laura Jiménez",
        avatar: "/placeholder.svg?height=40&width=40",
        calificacion: 4,
        fecha: "03/04/2023",
        comentario:
          "Muy buen servicio, captó perfectamente la esencia de mi marca. Solo una ronda de revisiones fue necesaria.",
      },
    ],
  },
]

export default function ServicioDetallePage({ params }: { params: { id: string } }) {
  const servicio = servicios.find((s) => s.id === params.id) || servicios[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/servicios" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-2" />
          Volver a servicios
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{servicio.titulo}</h1>

          <div className="mb-6">
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
              <img
                src={servicio.imagen || "/placeholder.svg"}
                alt={servicio.titulo}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {servicio.galeria.map((img, i) => (
                <div key={i} className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${servicio.titulo} - imagen ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <Tabs defaultValue="descripcion">
            <TabsList className="mb-4">
              <TabsTrigger value="descripcion">Descripción</TabsTrigger>
              <TabsTrigger value="resenas">Reseñas ({servicio.reseñas.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="descripcion" className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Acerca del servicio</h2>
                <p className="text-gray-700">{servicio.descripcion}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Lo que incluye</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>3 propuestas iniciales de diseño</li>
                  <li>2 rondas de revisiones</li>
                  <li>Archivos en formato AI, PSD, PNG, JPG y SVG</li>
                  <li>Derechos de uso comercial</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="resenas">
              <div className="space-y-6">
                {servicio.reseñas.map((reseña, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Avatar className="mr-4">
                          <AvatarImage src={reseña.avatar || "/placeholder.svg"} alt={reseña.usuario} />
                          <AvatarFallback>{reseña.usuario.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-semibold">{reseña.usuario}</h3>
                            <span className="text-sm text-gray-500">{reseña.fecha}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < reseña.calificacion ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{reseña.comentario}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">${servicio.precio.toLocaleString("es-CL")}</h2>
                <Badge>{servicio.categoria}</Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Clock size={18} className="mr-2 text-gray-500" />
                  <span>Tiempo de entrega: {servicio.duracion}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full">Contratar ahora</Button>
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <MessageCircle size={18} className="mr-2" />
                  Contactar al proveedor
                </Button>
                <Button variant="ghost" className="w-full flex items-center justify-center">
                  <Share2 size={18} className="mr-2" />
                  Compartir
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center mb-3">
                  <Avatar className="mr-3">
                    <AvatarImage
                      src={servicio.proveedor.avatar || "/placeholder.svg"}
                      alt={servicio.proveedor.nombre}
                    />
                    <AvatarFallback>{servicio.proveedor.nombre.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{servicio.proveedor.nombre}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                      <span>
                        {servicio.proveedor.calificacion} ({servicio.proveedor.proyectos} proyectos)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  <span>{servicio.proveedor.ubicacion}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
