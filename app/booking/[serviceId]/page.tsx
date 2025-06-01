"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  MapPin,
  Star,
  Shield,
  CreditCard,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Phone,
} from "lucide-react"
import Link from "next/link"

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [step, setStep] = useState(1) // 1: Details, 2: Schedule, 3: Payment, 4: Confirmation

  const service = {
    id: 1,
    title: "Instalación eléctrica completa",
    provider: "Juan Martínez",
    category: "Electricista Certificado",
    rating: 4.9,
    reviews: 127,
    price: 80,
    location: "Las Condes, Santiago",
    avatar: "JM",
    verified: true,
    responseTime: "15 minutos",
  }

  const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

  const [bookingDetails, setBookingDetails] = useState({
    description: "",
    address: "",
    phone: "",
    estimatedHours: 2,
    urgency: "normal",
    additionalNotes: "",
  })

  const calculateTotal = () => {
    const basePrice = service.price * bookingDetails.estimatedHours
    const urgencyFee = bookingDetails.urgency === "urgent" ? basePrice * 0.2 : 0
    const serviceFee = basePrice * 0.1
    return {
      basePrice,
      urgencyFee,
      serviceFee,
      total: basePrice + urgencyFee + serviceFee,
    }
  }

  const pricing = calculateTotal()

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Detalles del servicio</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Describe qué necesitas</Label>
                  <Textarea
                    id="description"
                    placeholder="Explica en detalle el trabajo que necesitas..."
                    value={bookingDetails.description}
                    onChange={(e) => setBookingDetails((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white min-h-[100px] focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección del servicio</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="address"
                      placeholder="Av. Las Condes 123, Las Condes"
                      value={bookingDetails.address}
                      onChange={(e) => setBookingDetails((prev) => ({ ...prev, address: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono de contacto</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+56 9 1234 5678"
                      value={bookingDetails.phone}
                      onChange={(e) => setBookingDetails((prev) => ({ ...prev, phone: e.target.value }))}
                      className="bg-gray-800 border-gray-600 text-white pl-10 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Horas estimadas</Label>
                    <Input
                      id="hours"
                      type="number"
                      min="1"
                      max="8"
                      value={bookingDetails.estimatedHours}
                      onChange={(e) =>
                        setBookingDetails((prev) => ({ ...prev, estimatedHours: Number.parseInt(e.target.value) || 1 }))
                      }
                      className="bg-gray-800 border-gray-600 text-white focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Urgencia</Label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={bookingDetails.urgency === "normal" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBookingDetails((prev) => ({ ...prev, urgency: "normal" }))}
                        className={
                          bookingDetails.urgency === "normal"
                            ? "bg-[#0066FF] text-white"
                            : "border-gray-600 text-gray-300"
                        }
                      >
                        Normal
                      </Button>
                      <Button
                        type="button"
                        variant={bookingDetails.urgency === "urgent" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBookingDetails((prev) => ({ ...prev, urgency: "urgent" }))}
                        className={
                          bookingDetails.urgency === "urgent"
                            ? "bg-[#FF6D3A] text-white"
                            : "border-gray-600 text-gray-300"
                        }
                      >
                        Urgente (+20%)
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Información adicional que pueda ser útil..."
                    value={bookingDetails.additionalNotes}
                    onChange={(e) => setBookingDetails((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Selecciona fecha y hora</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Fecha</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border border-gray-700 bg-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-base font-medium mb-3 block">Hora disponible</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className={
                          selectedTime === time
                            ? "bg-[#00E5B4] text-black hover:bg-[#00CC9F]"
                            : "border-gray-600 text-gray-300 hover:bg-gray-800"
                        }
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-[#00E5B4]" />
                      <span className="text-gray-300">Juan responde en promedio en {service.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Resumen y pago</h2>

              {/* Booking Summary */}
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Resumen de la reserva</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Servicio:</span>
                      <span>{service.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fecha:</span>
                      <span>{selectedDate?.toLocaleDateString("es-ES")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hora:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duración estimada:</span>
                      <span>{bookingDetails.estimatedHours} horas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dirección:</span>
                      <span className="text-right">{bookingDetails.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Breakdown */}
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Desglose de precios</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        ${service.price}/hora × {bookingDetails.estimatedHours} horas
                      </span>
                      <span>${pricing.basePrice.toLocaleString()}</span>
                    </div>
                    {pricing.urgencyFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Tarifa urgente (20%)</span>
                        <span>${pricing.urgencyFee.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tarifa de servicio GoWork (10%)</span>
                      <span>${pricing.serviceFee.toLocaleString()}</span>
                    </div>
                    <Separator className="my-2 bg-gray-600" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-[#00E5B4]">${pricing.total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Método de pago</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border border-gray-600 rounded-lg cursor-pointer hover:border-[#00E5B4] transition-colors">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium">Tarjeta de crédito/débito</p>
                        <p className="text-sm text-gray-400">Visa, Mastercard, American Express</p>
                      </div>
                      <div className="w-4 h-4 border-2 border-[#00E5B4] rounded-full bg-[#00E5B4]"></div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <Input
                      placeholder="Número de tarjeta"
                      className="bg-gray-900 border-gray-600 text-white focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="MM/AA"
                        className="bg-gray-900 border-gray-600 text-white focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                      />
                      <Input
                        placeholder="CVV"
                        className="bg-gray-900 border-gray-600 text-white focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                      />
                    </div>
                    <Input
                      placeholder="Nombre en la tarjeta"
                      className="bg-gray-900 border-gray-600 text-white focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-[#00E5B4]/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-[#00E5B4]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">¡Reserva confirmada!</h2>
              <p className="text-gray-400">Tu solicitud ha sido enviada a {service.provider}</p>
            </div>

            <Card className="bg-gray-800 border-gray-700 text-left">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Detalles de tu reserva</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="h-5 w-5 text-[#00E5B4]" />
                    <div>
                      <p className="font-medium">{selectedDate?.toLocaleDateString("es-ES")}</p>
                      <p className="text-sm text-gray-400">{selectedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-[#00E5B4]" />
                    <div>
                      <p className="font-medium">{bookingDetails.address}</p>
                      <p className="text-sm text-gray-400">Dirección del servicio</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-[#00E5B4]" />
                    <div>
                      <p className="font-medium">${pricing.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">Total a pagar</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-[#0066FF]/20 to-[#00E5B4]/20 rounded-lg p-4 border border-[#0066FF]/30">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-[#00E5B4] mt-0.5" />
                <div className="text-left">
                  <h4 className="font-medium text-[#00E5B4]">¿Qué sigue?</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    {service.provider} recibirá tu solicitud y te contactará en los próximos {service.responseTime} para
                    confirmar los detalles.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Link href="/chat" className="flex-1">
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Ir a mensajes
                </Button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800">
                  Ir al dashboard
                </Button>
              </Link>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/servicios/1">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="text-2xl font-bold">
                <span className="text-[#0066FF]">Go</span>
                <span className="text-[#00E5B4]">Work</span>
              </div>
            </div>
            <h1 className="text-lg font-semibold">Reservar servicio</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[
                  { step: 1, title: "Detalles" },
                  { step: 2, title: "Fecha y hora" },
                  { step: 3, title: "Pago" },
                  { step: 4, title: "Confirmación" },
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= item.step ? "bg-[#00E5B4] text-black" : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {step > item.step ? <CheckCircle className="h-4 w-4" /> : item.step}
                    </div>
                    <span className={`ml-2 text-sm ${step >= item.step ? "text-white" : "text-gray-400"}`}>
                      {item.title}
                    </span>
                    {index < 3 && (
                      <div className={`w-12 h-0.5 mx-4 ${step > item.step ? "bg-[#00E5B4]" : "bg-gray-700"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">{renderStep()}</CardContent>
            </Card>

            {/* Navigation */}
            {step < 4 && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
                >
                  Anterior
                </Button>
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && (!bookingDetails.description || !bookingDetails.address)) ||
                    (step === 2 && (!selectedDate || !selectedTime))
                  }
                  className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black disabled:opacity-50"
                >
                  {step === 3 ? "Confirmar y pagar" : "Siguiente"}
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Info */}
            <Card className="bg-gray-900 border-gray-700 sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white">
                      {service.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-gray-400 text-sm">{service.provider}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-400">
                        {service.rating} ({service.reviews})
                      </span>
                      {service.verified && (
                        <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30 text-xs">Verificado</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Tarifa base:</span>
                    <span className="font-medium">${service.price}/hora</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Ubicación:</span>
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Respuesta:</span>
                    <span>{service.responseTime}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Shield className="h-4 w-4" />
                    <span>Pago seguro • Garantía incluida</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
