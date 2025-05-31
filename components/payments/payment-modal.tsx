"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { paymentsAPI, paymentUtils } from "@/lib/payments"
import { CreditCard, Shield, CheckCircle, AlertCircle, Loader2, Lock, DollarSign, User } from "lucide-react"

interface PaymentModalProps {
  contract: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function PaymentModal({ contract, isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [step, setStep] = useState(1) // 1: Método, 2: Detalles, 3: Confirmación, 4: Procesando, 5: Completado
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen) return null

  const platformFee = paymentUtils.calculatePlatformFee(contract.total_amount)
  const totalWithFee = contract.total_amount

  const handlePayment = async () => {
    setProcessing(true)
    setError("")

    try {
      setStep(4) // Procesando

      // Simular procesamiento de pago
      await paymentsAPI.processPayment(contract.id, contract.client_id, paymentMethod)

      setTimeout(() => {
        setStep(5) // Completado
        setProcessing(false)
      }, 3000)
    } catch (err) {
      setError("Error procesando el pago. Intenta nuevamente.")
      setProcessing(false)
      setStep(2)
    }
  }

  const handleSuccess = () => {
    onSuccess()
    onClose()
    setStep(1)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border-gray-700 w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Procesar Pago</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400">
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resumen del contrato */}
          <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-white">{contract.title}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Monto del proyecto</span>
                <span className="text-white">{paymentUtils.formatCurrency(contract.total_amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Comisión GoWork (7%)</span>
                <span className="text-yellow-400">{paymentUtils.formatCurrency(platformFee)}</span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex justify-between font-semibold">
                <span className="text-white">Total a pagar</span>
                <span className="text-[#00E5B4]">{paymentUtils.formatCurrency(totalWithFee)}</span>
              </div>
            </div>
          </div>

          {/* Paso 1: Método de pago */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label className="text-white">Método de pago</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="bg-gray-800 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="credit_card">💳 Tarjeta de Crédito</SelectItem>
                    <SelectItem value="debit_card">💳 Tarjeta de Débito</SelectItem>
                    <SelectItem value="bank_transfer">🏦 Transferencia Bancaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-400 font-medium">Pago Seguro con Escrow</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Tus fondos se mantienen seguros hasta que el trabajo esté completado
                </p>
              </div>

              <Button onClick={() => setStep(2)} className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
                Continuar
              </Button>
            </div>
          )}

          {/* Paso 2: Detalles de pago */}
          {step === 2 && (
            <div className="space-y-4">
              {paymentMethod === "credit_card" && (
                <>
                  <div>
                    <Label htmlFor="cardNumber" className="text-white">
                      Número de tarjeta
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-white">
                        Vencimiento
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-white">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="bg-gray-800 border-gray-600"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName" className="text-white">
                      Nombre en la tarjeta
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="Juan Pérez"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      className="bg-gray-800 border-gray-600"
                    />
                  </div>
                </>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-400">{error}</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-gray-600">
                  Atrás
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
                  Revisar
                </Button>
              </div>
            </div>
          )}

          {/* Paso 3: Confirmación */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-white">Confirmar Pago</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">
                      {paymentMethod === "credit_card" ? "Tarjeta de Crédito" : "Método de pago"}
                    </span>
                  </div>
                  {paymentMethod === "credit_card" && (
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{cardData.name}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-[#00E5B4] font-semibold">{paymentUtils.formatCurrency(totalWithFee)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">Protección Escrow Activada</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Los fondos se liberarán al freelancer solo cuando marques el trabajo como completado
                </p>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 border-gray-600">
                  Atrás
                </Button>
                <Button onClick={handlePayment} className="flex-1 bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
                  <Lock className="h-4 w-4 mr-2" />
                  Pagar Ahora
                </Button>
              </div>
            </div>
          )}

          {/* Paso 4: Procesando */}
          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 text-[#00E5B4] animate-spin" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Procesando Pago</h4>
                <p className="text-sm text-gray-400 mt-1">Estamos procesando tu pago de forma segura...</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-xs text-blue-400">No cierres esta ventana. El proceso puede tomar unos segundos.</p>
              </div>
            </div>
          )}

          {/* Paso 5: Completado */}
          {step === 5 && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white">¡Pago Exitoso!</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Tu pago ha sido procesado y los fondos están seguros en escrow
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Monto pagado</span>
                  <span className="text-green-400 font-semibold">{paymentUtils.formatCurrency(totalWithFee)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Estado</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completado
                  </Badge>
                </div>
              </div>
              <Button onClick={handleSuccess} className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
                Continuar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
