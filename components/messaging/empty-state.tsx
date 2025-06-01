import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export function EmptyState() {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <MessageSquare className="h-10 w-10 text-blue-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tus mensajes</h2>
        <p className="text-gray-500 max-w-md mb-6">
          Selecciona una conversación para ver los mensajes o inicia una nueva conversación con un proveedor de
          servicios.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-1">Comunicación segura</h3>
            <p className="text-sm text-gray-500">
              Todos los mensajes están protegidos y solo son visibles para ti y tu contacto.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-1">Respuesta rápida</h3>
            <p className="text-sm text-gray-500">Los proveedores suelen responder en menos de 24 horas.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
