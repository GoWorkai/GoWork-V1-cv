import { Suspense } from "react"
import Link from "next/link"
import { Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Simulación de datos de servicios
const servicios = [
  {
    id: 1,
    titulo: "Diseño de Logotipos Profesionales",
    categoria: "diseño",
    proveedor: "María González",
    calificacion: 4.8,
    precio: 45000,
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    titulo: "Desarrollo Web Full Stack",
    categoria: "desarrollo",
    proveedor: "Carlos Ruiz",
    calificacion: 4.9,
    precio: 85000,
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    titulo: "Consultoría en Marketing Digital",
    categoria: "marketing",
    proveedor: "Ana Martín",
    calificacion: 4.7,
    precio: 65000,
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    titulo: "Reparación de Plomería",
    categoria: "hogar",
    proveedor: "Roberto Sánchez",
    calificacion: 4.6,
    precio: 35000,
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    titulo: "Clases de Programación en Python",
    categoria: "desarrollo",
    proveedor: "Laura Pérez",
    calificacion: 4.9,
    precio: 40000,
    imagen: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    titulo: "Diseño de Interfaces UI/UX",
    categoria: "diseño",
    proveedor: "Daniel Torres",
    calificacion: 4.8,
    precio: 55000,
    imagen: "/placeholder.svg?height=200&width=300",
  },
]

export default function ServiciosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Servicios Disponibles</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Buscar servicios..." className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={18} />
          Filtrar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<ServiciosSkeleton />}>
          {servicios.map((servicio) => (
            <Link href={`/servicios/${servicio.id}`} key={servicio.id}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={servicio.imagen || "/placeholder.svg"}
                    alt={servicio.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {servicio.categoria}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm">{servicio.calificacion}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{servicio.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-2">Por {servicio.proveedor}</p>
                  <p className="font-bold text-lg">${servicio.precio.toLocaleString("es-CL")}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Suspense>
      </div>
    </div>
  )
}

function ServiciosSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="h-full">
          <Skeleton className="aspect-video w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-6 w-24" />
          </CardContent>
        </Card>
      ))}
    </>
  )
}
