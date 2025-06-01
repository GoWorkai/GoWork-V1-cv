"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2, Send } from "lucide-react"
import { geminiService } from "@/lib/gemini"

export default function GeminiTestPage() {
  const [connectionStatus, setConnectionStatus] = useState<"loading" | "success" | "error" | null>(null)
  const [testQuery, setTestQuery] = useState("¿Cómo puedo encontrar un buen electricista?")
  const [testResponse, setTestResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState("AIzaSyAChwfahZWZJLRnqIu82qUXrQuMW9-CoyQ")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    setConnectionStatus("loading")
    try {
      const isConnected = await geminiService.testConnection()
      setConnectionStatus(isConnected ? "success" : "error")
    } catch (err) {
      console.error("Error testing connection:", err)
      setConnectionStatus("error")
    }
  }

  const handleSendTest = async () => {
    if (!testQuery.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await geminiService.chatWithGow([
        {
          role: "user",
          parts: [{ text: testQuery }],
        },
      ])
      setTestResponse(response)
    } catch (err: any) {
      console.error("Error sending test:", err)
      setError(err.message || "Error al comunicarse con Gemini")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Prueba de Conexión con Gemini</CardTitle>
          <CardDescription>Verifica que la API de Gemini esté configurada correctamente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="font-medium">Estado de conexión:</div>
            {connectionStatus === "loading" && (
              <div className="flex items-center text-yellow-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Verificando conexión...</span>
              </div>
            )}
            {connectionStatus === "success" && (
              <div className="flex items-center text-green-500">
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Conectado correctamente</span>
              </div>
            )}
            {connectionStatus === "error" && (
              <div className="flex items-center text-red-500">
                <XCircle className="mr-2 h-4 w-4" />
                <span>Error de conexión</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">API Key de Gemini</label>
            <Input value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="font-mono" />
            <p className="text-xs text-gray-500">
              Esta es la clave API que estás usando actualmente. Para cambiarla, actualiza el archivo lib/gemini.ts
            </p>
          </div>

          <Button onClick={testConnection} variant="outline" className="mt-4">
            Probar Conexión
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prueba de Chat con Gow</CardTitle>
          <CardDescription>Envía un mensaje a Gow para verificar que responde correctamente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tu mensaje</label>
            <Textarea
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder="Escribe un mensaje para Gow..."
              rows={3}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {testResponse && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Respuesta de Gow</label>
              <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">{testResponse}</div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSendTest} disabled={isLoading || !testQuery.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensaje
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
