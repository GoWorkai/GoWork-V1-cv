"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Camera,
  Award,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",

    // Professional Info
    category: "",
    skills: [],
    experience: "",
    description: "",
    hourlyRate: "",

    // Availability
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    timeSlots: [],

    // Verification
    documents: [],
    portfolio: [],
  })

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const categories = [
    { id: "electricista", name: "Electricista", icon: "⚡" },
    { id: "plomero", name: "Plomero", icon: "🔧" },
    { id: "diseñador", name: "Diseñador", icon: "🎨" },
    { id: "programador", name: "Programador", icon: "💻" },
    { id: "chef", name: "Chef", icon: "👨‍🍳" },
    { id: "fotografo", name: "Fotógrafo", icon: "📸" },
    { id: "jardinero", name: "Jardinero", icon: "🌱" },
    { id: "tutor", name: "Tutor", icon: "📚" },
  ]

  const skillsOptions = {
    electricista: ["Instalación", "Reparación", "Emergencias", "Iluminación", "Tableros"],
    plomero: ["Reparación", "Instalación", "Emergencias", "Mantención", "Cañerías"],
    diseñador: ["Logo", "Branding", "Web Design", "UI/UX", "Packaging"],
    programador: ["React", "Node.js", "Python", "Mobile", "E-commerce"],
    chef: ["Cocina casera", "Repostería", "Catering", "Clases", "Eventos"],
    fotografo: ["Retrato", "Eventos", "Comercial", "Paisaje", "Producto"],
    jardinero: ["Mantención", "Diseño", "Poda", "Riego", "Paisajismo"],
    tutor: ["Matemáticas", "Idiomas", "Ciencias", "Historia", "Música"],
  }

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Información personal</h2>
              <p className="text-gray-400">Cuéntanos sobre ti para crear tu perfil profesional</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    placeholder="Juan"
                    value={formData.firstName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="bg-gray-800 border-gray-600 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    placeholder="Martínez"
                    value={formData.lastName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="bg-gray-800 border-gray-600 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-gray-800 border-gray-600 pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="bg-gray-800 border-gray-600 pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Las Condes, Santiago"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="bg-gray-800 border-gray-600 pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">¿Cuál es tu especialidad?</h2>
              <p className="text-gray-400">Selecciona la categoría principal de tus servicios</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all hover:scale-105 ${
                    formData.category === category.id
                      ? "bg-[#00E5B4]/20 border-[#00E5B4] ring-2 ring-[#00E5B4]/50"
                      : "bg-gray-900 border-gray-700 hover:border-gray-600"
                  }`}
                  onClick={() => setFormData((prev) => ({ ...prev, category: category.id, skills: [] }))}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-medium">{category.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            {formData.category && (
              <div className="space-y-4">
                <div>
                  <Label>Habilidades específicas</Label>
                  <p className="text-sm text-gray-400 mb-3">Selecciona las habilidades que dominas</p>
                  <div className="flex flex-wrap gap-2">
                    {skillsOptions[formData.category]?.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className={`cursor-pointer transition-colors ${
                          formData.skills.includes(skill)
                            ? "bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]"
                            : "border-gray-600 text-gray-400 hover:bg-gray-800"
                        }`}
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Años de experiencia</Label>
                  <Input
                    id="experience"
                    type="number"
                    placeholder="5"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    className="bg-gray-800 border-gray-600 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  />
                </div>
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Cuéntanos sobre tu trabajo</h2>
              <p className="text-gray-400">Describe tus servicios y define tu tarifa</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Descripción de tus servicios</Label>
                <Textarea
                  id="description"
                  placeholder="Describe qué servicios ofreces, tu experiencia y qué te hace especial..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-600 focus:border-[#00E5B4] focus:ring-[#00E5B4] min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Tarifa por hora (CLP)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="15000"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                    className="bg-gray-800 border-gray-600 pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  />
                </div>
                <p className="text-sm text-gray-400">Esta será tu tarifa base. Podrás ajustarla para cada servicio.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium mb-2">Vista previa de tu perfil</h4>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0066FF] to-[#00E5B4] rounded-full flex items-center justify-center text-2xl">
                    {categories.find((c) => c.id === formData.category)?.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {formData.firstName} {formData.lastName}
                    </h3>
                    <p className="text-gray-400">{categories.find((c) => c.id === formData.category)?.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-400">Nuevo proveedor</span>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      {formData.description || "Descripción de servicios..."}
                    </p>
                    <p className="text-[#00E5B4] font-medium mt-2">
                      Desde ${Number.parseInt(formData.hourlyRate || "0").toLocaleString()}/hora
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Define tu disponibilidad</h2>
              <p className="text-gray-400">Cuéntanos cuándo puedes trabajar</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Días disponibles</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: "monday", label: "Lunes" },
                    { key: "tuesday", label: "Martes" },
                    { key: "wednesday", label: "Miércoles" },
                    { key: "thursday", label: "Jueves" },
                    { key: "friday", label: "Viernes" },
                    { key: "saturday", label: "Sábado" },
                    { key: "sunday", label: "Domingo" },
                  ].map((day) => (
                    <div key={day.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={day.key}
                        checked={formData.availability[day.key]}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            availability: { ...prev.availability, [day.key]: checked },
                          }))
                        }
                      />
                      <Label htmlFor={day.key} className="text-sm">
                        {day.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Hora de inicio</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="startTime"
                      type="time"
                      className="bg-gray-800 border-gray-600 pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Hora de término</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="endTime"
                      type="time"
                      className="bg-gray-800 border-gray-600 pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h4 className="font-medium mb-3">Configuración de disponibilidad</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="emergencies" />
                    <Label htmlFor="emergencies" className="text-sm">
                      Disponible para emergencias
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="weekends" />
                    <Label htmlFor="weekends" className="text-sm">
                      Trabajar fines de semana
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="travel" />
                    <Label htmlFor="travel" className="text-sm">
                      Dispuesto a viajar
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Verificación y documentos</h2>
              <p className="text-gray-400">Sube tus documentos para verificar tu perfil</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Documento de identidad</Label>
                  <p className="text-sm text-gray-400 mb-3">Cédula de identidad o pasaporte</p>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Haz clic para subir o arrastra aquí</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG hasta 5MB</p>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Certificaciones (opcional)</Label>
                  <p className="text-sm text-gray-400 mb-3">Títulos, certificados o credenciales profesionales</p>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
                    <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Sube tus certificaciones</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG hasta 10MB</p>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Portafolio (opcional)</Label>
                  <p className="text-sm text-gray-400 mb-3">Fotos de trabajos anteriores</p>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Muestra tu trabajo</p>
                    <p className="text-xs text-gray-500 mt-1">Hasta 10 imágenes, 5MB cada una</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#0066FF]/20 to-[#00E5B4]/20 rounded-lg p-4 border border-[#0066FF]/30">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-[#00E5B4] mt-0.5" />
                  <div>
                    <h4 className="font-medium text-[#00E5B4]">¿Por qué verificamos tu perfil?</h4>
                    <p className="text-sm text-gray-300 mt-1">
                      La verificación nos ayuda a mantener la confianza en la plataforma y te da mayor credibilidad ante
                      los clientes. Los proveedores verificados reciben un 40% más de solicitudes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="text-3xl font-bold">
            <span className="text-[#0066FF]">Go</span>
            <span className="text-[#00E5B4]">Work</span>
          </div>
          <p className="text-gray-400">Configura tu perfil de proveedor</p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>
              Paso {step} de {totalSteps}
            </span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form */}
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          {step === totalSteps ? (
            <Link href="/provider-dashboard">
              <Button className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium">
                <Check className="h-4 w-4 mr-2" />
                Completar registro
              </Button>
            </Link>
          ) : (
            <Button onClick={nextStep} className="bg-[#0066FF] hover:bg-[#0052CC] text-white">
              Siguiente
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
