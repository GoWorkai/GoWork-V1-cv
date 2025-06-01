"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ServiceForm } from "@/components/services/service-form"
import { servicesAPI } from "@/lib/services-api"
import type { Service } from "@/types/service"
import { Loader2 } from "lucide-react"

export default function EditServicePage() {
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadService = async () => {
      try {
        const serviceData = await servicesAPI.getServiceById(params.id as string)
        if (serviceData) {
          setService(serviceData)
        } else {
          setError("Servicio no encontrado")
        }
      } catch (err) {
        setError("Error al cargar el servicio")
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      loadService()
    }
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mt-2">{error || "Servicio no encontrado"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <ServiceForm service={service} />
    </div>
  )
}
