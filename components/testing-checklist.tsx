"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Circle, Smartphone, Monitor, Tablet } from "lucide-react"

export function TestingChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const checklistItems = [
    {
      id: "content-update",
      title: "Actualizar el contenido textual según las nuevas directrices",
      description: "Verificar que el hero, secciones y CTAs coincidan exactamente con las especificaciones",
    },
    {
      id: "responsive-design",
      title: "Revisar y ajustar el diseño para todos los dispositivos",
      description: "Probar en móvil, tablet y desktop para asegurar visualización correcta",
    },
    {
      id: "cta-functionality",
      title: "Verificar que los botones de llamada a la acción funcionen correctamente",
      description: "Probar 'Crear Cuenta Gratis' y 'Explorar Servicios' en todas las secciones",
    },
    {
      id: "visual-coherence",
      title: "Asegurar coherencia visual con la identidad de marca",
      description: "Verificar que imágenes y elementos visuales complementen el nuevo contenido",
    },
    {
      id: "publish-test",
      title: "Publicar y probar la versión actualizada",
      description: "Realizar pruebas finales para garantizar experiencia de usuario óptima",
    },
  ]

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const completedItems = Object.values(checkedItems).filter(Boolean).length
  const totalItems = checklistItems.length
  const progress = (completedItems / totalItems) * 100

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-gray-200/50 max-w-4xl mx-auto">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">✅ Checklist para el Desarrollador</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {completedItems}/{totalItems} completado
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                checkedItems[item.id]
                  ? "border-green-200 bg-green-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-start space-x-3">
                {checkedItems[item.id] ? (
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3
                    className={`font-medium mb-1 ${
                      checkedItems[item.id] ? "text-green-900 line-through" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pruebas de Dispositivos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Smartphone className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">Móvil</div>
                <div className="text-sm text-gray-600">320px - 768px</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Tablet className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">Tablet</div>
                <div className="text-sm text-gray-600">768px - 1024px</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Monitor className="h-6 w-6 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900">Desktop</div>
                <div className="text-sm text-gray-600">1024px+</div>
              </div>
            </div>
          </div>
        </div>

        {progress === 100 && (
          <div className="mt-6 p-4 bg-green-100 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">¡Excelente! Todas las tareas han sido completadas.</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              El sitio web está listo para ser publicado con las nuevas actualizaciones de contenido.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
