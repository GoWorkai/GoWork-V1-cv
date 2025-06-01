"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { GoWorkLogo } from "@/components/gowork-logo"

export default function FacebookCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { handleOAuthCallback } = useAuth()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")
      const error = searchParams.get("error")

      if (error) {
        setStatus("error")
        setMessage("Autenticación cancelada o falló")
        setTimeout(() => router.push("/"), 3000)
        return
      }

      if (!code) {
        setStatus("error")
        setMessage("Código de autorización no encontrado")
        setTimeout(() => router.push("/"), 3000)
        return
      }

      try {
        const result = await handleOAuthCallback("facebook", code)

        if (result.success) {
          setStatus("success")
          setMessage("¡Autenticación exitosa! Redirigiendo...")
          setTimeout(() => router.push("/dashboard"), 2000)
        } else {
          setStatus("error")
          setMessage(result.message || "Error en la autenticación")
          setTimeout(() => router.push("/"), 3000)
        }
      } catch (error) {
        setStatus("error")
        setMessage("Error inesperado durante la autenticación")
        setTimeout(() => router.push("/"), 3000)
      }
    }

    handleCallback()
  }, [searchParams, handleOAuthCallback, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <GoWorkLogo size={60} showText={true} />
          </div>

          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Completando autenticación...</h2>
              <p className="text-gray-600">Estamos verificando tu cuenta de Facebook</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">¡Bienvenido a GoWork!</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Error de autenticación</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
