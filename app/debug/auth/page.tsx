"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AuthDebugPage() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth()

  const handleDemoLogin = async () => {
    const success = await login({
      email: "demo@gowork.com",
      password: "demo123",
    })
    console.log("Login result:", success)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Debug de Autenticación</h1>

        <Card>
          <CardHeader>
            <CardTitle>Estado Actual</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Estado de carga:</span>
              <Badge variant={isLoading ? "default" : "secondary"}>{isLoading ? "Cargando..." : "Listo"}</Badge>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-medium">Autenticado:</span>
              <Badge variant={isAuthenticated ? "default" : "destructive"}>{isAuthenticated ? "Sí" : "No"}</Badge>
            </div>

            <div className="space-y-2">
              <span className="font-medium">Usuario:</span>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                {user ? JSON.stringify(user, null, 2) : "null"}
              </pre>
            </div>

            <div className="space-y-2">
              <span className="font-medium">LocalStorage:</span>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                Token: {typeof window !== "undefined" ? localStorage.getItem("gowork_token") : "N/A"}
                {"\n"}
                User: {typeof window !== "undefined" ? localStorage.getItem("gowork_user") : "N/A"}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones de Prueba</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleDemoLogin} className="w-full">
              Login Demo (demo@gowork.com)
            </Button>

            <Button onClick={logout} variant="outline" className="w-full">
              Logout
            </Button>

            <Button onClick={() => (window.location.href = "/dashboard")} variant="secondary" className="w-full">
              Ir al Dashboard
            </Button>

            <Button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              variant="destructive"
              className="w-full"
            >
              Limpiar Todo y Recargar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
