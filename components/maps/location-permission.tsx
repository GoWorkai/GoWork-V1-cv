"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Shield, Zap, Users } from "lucide-react"

interface LocationPermissionProps {
  onPermissionGranted: () => void
  onPermissionDenied: () => void
}

export default function LocationPermission({ onPermissionGranted, onPermissionDenied }: LocationPermissionProps) {
  const [permissionState, setPermissionState] = useState<"prompt" | "granted" | "denied" | "checking">("checking")

  useEffect(() => {
    checkLocationPermission()
  }, [])

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setPermissionState("denied")
      return
    }

    try {
      const permission = await navigator.permissions.query({ name: "geolocation" })
      setPermissionState(permission.state as "prompt" | "granted" | "denied")

      if (permission.state === "granted") {
        onPermissionGranted()
      }
    } catch (error) {
      setPermissionState("prompt")
    }
  }

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setPermissionState("granted")
        onPermissionGranted()
      },
      () => {
        setPermissionState("denied")
        onPermissionDenied()
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  if (permissionState === "checking") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00E5B4] mx-auto mb-4"></div>
          <p className="text-white">Verificando permisos de ubicación...</p>
        </div>
      </div>
    )
  }

  if (permissionState === "granted") {
    return null // Component will be unmounted when permission is granted
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-white">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-[#00E5B4]/20 rounded-full w-fit">
            <MapPin className="h-8 w-8 text-[#00E5B4]" />
          </div>
          <CardTitle className="text-2xl">Activar Ubicación</CardTitle>
          <CardDescription className="text-gray-400">
            Para encontrar los mejores proveedores cerca de ti, necesitamos acceso a tu ubicación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-[#0066FF]/20 rounded-lg">
                <Zap className="h-4 w-4 text-[#0066FF]" />
              </div>
              <div>
                <h4 className="font-medium">Búsqueda instantánea</h4>
                <p className="text-sm text-gray-400">Encuentra proveedores disponibles en tiempo real</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-[#00E5B4]/20 rounded-lg">
                <Users className="h-4 w-4 text-[#00E5B4]" />
              </div>
              <div>
                <h4 className="font-medium">Mejores coincidencias</h4>
                <p className="text-sm text-gray-400">Conecta con talentos cerca de tu ubicación</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Shield className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h4 className="font-medium">Privacidad protegida</h4>
                <p className="text-sm text-gray-400">Tu ubicación se usa solo para mejorar tu experiencia</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={requestLocation} className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
              Permitir Ubicación
            </Button>

            <Button
              onClick={onPermissionDenied}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Continuar sin ubicación
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Puedes cambiar estos permisos en cualquier momento desde la configuración de tu navegador
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
