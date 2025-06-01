"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Brain,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Sparkles,
  CheckCircle,
  Copy,
  Download,
  Send,
} from "lucide-react"

export function ProposalGenerator() {
  const [projectDescription, setProjectDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProposal, setGeneratedProposal] = useState("")
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [generationProgress, setGenerationProgress] = useState(0)

  const generateProposal = async () => {
    if (!projectDescription.trim()) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simular proceso de generación con IA
    const steps = [
      { progress: 20, message: "Analizando descripción del proyecto..." },
      { progress: 40, message: "Identificando habilidades requeridas..." },
      { progress: 60, message: "Calculando presupuesto competitivo..." },
      { progress: 80, message: "Generando propuesta personalizada..." },
      { progress: 100, message: "Optimizando para máximo impacto..." },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setGenerationProgress(step.progress)
    }

    // Simular datos de análisis
    setAnalysisData({
      complexity: "Media-Alta",
      estimatedHours: 120,
      suggestedRate: 45,
      marketAnalysis: {
        averageRate: 42,
        competitiveAdvantage: "7% por encima del promedio",
        successProbability: 87,
      },
      keySkills: ["React", "Node.js", "API Integration", "Database Design"],
      timeline: "6-8 semanas",
      riskLevel: "Bajo",
    })

    // Generar propuesta personalizada
    const proposal = `
**Propuesta para Desarrollo de Aplicación Web**

Estimado/a Cliente,

He analizado cuidadosamente los requisitos de su proyecto y estoy emocionado de presentarle mi propuesta para el desarrollo de su aplicación web.

**Comprensión del Proyecto:**
Basándome en su descripción, entiendo que necesita una solución robusta que incluya ${projectDescription.toLowerCase()}. Mi experiencia de 5+ años en desarrollo full-stack me posiciona perfectamente para entregar exactamente lo que busca.

**Mi Enfoque:**
• Desarrollo ágil con entregas incrementales cada 2 semanas
• Código limpio y bien documentado siguiendo mejores prácticas
• Testing exhaustivo para garantizar calidad
• Comunicación constante durante todo el proceso

**Tecnologías Propuestas:**
React.js para el frontend, Node.js para el backend, y base de datos optimizada para su caso de uso específico.

**Cronograma:**
Completaré el proyecto en 6-8 semanas, con hitos claros y demostraciones regulares.

**Inversión:**
$${(analysisData.estimatedHours * analysisData.suggestedRate).toLocaleString()} USD
(${analysisData.estimatedHours} horas × $${analysisData.suggestedRate}/hora)

**¿Por qué elegirme?**
• 98% de satisfacción del cliente
• Entrega siempre a tiempo
• Soporte post-lanzamiento incluido
• Comunicación en español/inglés

Estoy disponible para comenzar inmediatamente y responder cualquier pregunta.

¡Espero trabajar juntos en este emocionante proyecto!

Saludos cordiales,
[Tu nombre]`

    setGeneratedProposal(proposal)
    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedProposal)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-[#FF6D3A]" />
            <span>Generador de Propuestas con IA</span>
            <Badge className="bg-[#FF6D3A]/20 text-[#FF6D3A] border-[#FF6D3A]/30">
              <Brain className="h-3 w-3 mr-1" />
              IA Avanzada
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Descripción del Proyecto</label>
            <Textarea
              placeholder="Describe el proyecto para el cual necesitas generar una propuesta. Incluye detalles sobre funcionalidades, tecnologías preferidas, timeline, etc."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white min-h-[120px] focus:border-[#FF6D3A] focus:ring-[#FF6D3A]"
            />
          </div>

          <Button
            onClick={generateProposal}
            disabled={!projectDescription.trim() || isGenerating}
            className="bg-[#FF6D3A] hover:bg-[#E55A2B] text-white w-full"
          >
            {isGenerating ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                Generando Propuesta...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generar Propuesta con IA
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="space-y-3">
              <Progress value={generationProgress} className="h-2" />
              <p className="text-sm text-gray-400 text-center">IA analizando y generando propuesta personalizada...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisData && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-[#00E5B4]" />
              <span>Análisis Inteligente del Proyecto</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#00E5B4]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="h-6 w-6 text-[#00E5B4]" />
                </div>
                <p className="text-sm text-gray-400">Complejidad</p>
                <p className="font-semibold">{analysisData.complexity}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#0066FF]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-6 w-6 text-[#0066FF]" />
                </div>
                <p className="text-sm text-gray-400">Horas Estimadas</p>
                <p className="font-semibold">{analysisData.estimatedHours}h</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FF6D3A]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <DollarSign className="h-6 w-6 text-[#FF6D3A]" />
                </div>
                <p className="text-sm text-gray-400">Tarifa Sugerida</p>
                <p className="font-semibold">${analysisData.suggestedRate}/h</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#B297FF]/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-6 w-6 text-[#B297FF]" />
                </div>
                <p className="text-sm text-gray-400">Prob. Éxito</p>
                <p className="font-semibold">{analysisData.marketAnalysis.successProbability}%</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="font-medium mb-3 text-[#00E5B4]">Análisis de Mercado</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Tarifa Promedio del Mercado</p>
                  <p className="font-medium">${analysisData.marketAnalysis.averageRate}/hora</p>
                </div>
                <div>
                  <p className="text-gray-400">Tu Ventaja Competitiva</p>
                  <p className="font-medium text-[#00E5B4]">{analysisData.marketAnalysis.competitiveAdvantage}</p>
                </div>
                <div>
                  <p className="text-gray-400">Nivel de Riesgo</p>
                  <p className="font-medium text-[#B297FF]">{analysisData.riskLevel}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2">Habilidades clave identificadas:</p>
              <div className="flex flex-wrap gap-2">
                {analysisData.keySkills.map((skill: string, index: number) => (
                  <Badge key={index} className="text-xs bg-[#0066FF]/20 text-[#0066FF] border-[#0066FF]/30">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {generatedProposal && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-[#00E5B4]" />
                <span>Propuesta Generada</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard} className="border-gray-600 text-gray-300">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
                <Button size="sm" className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed">
                {generatedProposal}
              </pre>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-[#00E5B4]/20 to-[#0066FF]/20 rounded-lg border border-[#00E5B4]/30">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-[#00E5B4] mt-1" />
                <div>
                  <h4 className="font-medium text-[#00E5B4] mb-2">Optimización de IA</h4>
                  <p className="text-sm text-gray-300">
                    Esta propuesta ha sido optimizada usando análisis de mercado en tiempo real, patrones de propuestas
                    exitosas y tu historial profesional para maximizar las probabilidades de aceptación.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ProposalGenerator
