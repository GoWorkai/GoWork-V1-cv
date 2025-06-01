"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth/auth-provider"
import { contractsAPI, walletsAPI, invoicesAPI, paymentUtils } from "@/lib/payments"
import {
  CreditCard,
  Wallet,
  FileText,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
} from "lucide-react"

export default function PaymentsPage() {
  const { user } = useAuth()
  const [contracts, setContracts] = useState<any[]>([])
  const [wallet, setWallet] = useState<any>(null)
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadPaymentData()
    }
  }, [user])

  const loadPaymentData = async () => {
    try {
      const [contractsData, walletData, invoicesData] = await Promise.all([
        contractsAPI.getByUserId(user.id),
        walletsAPI.getByUserId(user.id),
        invoicesAPI.getByUserId(user.id),
      ])

      setContracts(contractsData || [])
      setWallet(walletData)
      setInvoices(invoicesData || [])
    } catch (error) {
      console.error("Error loading payment data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
      case "cancelled":
      case "overdue":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
      case "processing":
        return <Clock className="h-4 w-4" />
      case "failed":
      case "cancelled":
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-800 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const totalEarnings = wallet?.total_earned || 0
  const availableBalance = wallet?.available_balance || 0
  const pendingBalance = wallet?.pending_balance || 0
  const activeContracts = contracts.filter((c) => c.status === "active").length

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Centro de Pagos</h1>
            <p className="text-gray-400 mt-2">Gestiona tus contratos, pagos y finanzas</p>
          </div>
          <Button className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black">
            <Download className="h-4 w-4 mr-2" />
            Exportar Reportes
          </Button>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Balance Disponible</p>
                  <p className="text-2xl font-bold text-[#00E5B4]">{paymentUtils.formatCurrency(availableBalance)}</p>
                </div>
                <Wallet className="h-8 w-8 text-[#00E5B4]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Ganancias Totales</p>
                  <p className="text-2xl font-bold text-[#0066FF]">{paymentUtils.formatCurrency(totalEarnings)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#0066FF]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Fondos Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-400">{paymentUtils.formatCurrency(pendingBalance)}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Contratos Activos</p>
                  <p className="text-2xl font-bold text-white">{activeContracts}</p>
                </div>
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenido principal */}
        <Tabs defaultValue="contracts" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="contracts" className="data-[state=active]:bg-[#00E5B4] data-[state=active]:text-black">
              <FileText className="h-4 w-4 mr-2" />
              Contratos
            </TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-[#00E5B4] data-[state=active]:text-black">
              <CreditCard className="h-4 w-4 mr-2" />
              Facturas
            </TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-[#00E5B4] data-[state=active]:text-black">
              <Wallet className="h-4 w-4 mr-2" />
              Billetera
            </TabsTrigger>
          </TabsList>

          {/* Contratos */}
          <TabsContent value="contracts" className="space-y-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Mis Contratos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contracts.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No tienes contratos aún</p>
                    <Button className="mt-4 bg-[#00E5B4] hover:bg-[#00CC9F] text-black">Explorar Proyectos</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contracts.map((contract) => (
                      <div
                        key={contract.id}
                        className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-white">{contract.title}</h3>
                          <Badge className={getStatusColor(contract.status)}>
                            {getStatusIcon(contract.status)}
                            <span className="ml-1 capitalize">{contract.status}</span>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Monto Total</p>
                            <p className="font-semibold text-[#00E5B4]">
                              {paymentUtils.formatCurrency(contract.total_amount)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Comisión Plataforma</p>
                            <p className="font-semibold text-yellow-400">
                              {paymentUtils.formatCurrency(contract.platform_fee)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">{user.user_type === "freelancer" ? "Recibirás" : "Cliente"}</p>
                            <p className="font-semibold text-white">
                              {user.user_type === "freelancer"
                                ? contract.freelancer?.full_name
                                : contract.client?.full_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <p className="text-xs text-gray-500">
                            Creado: {new Date(contract.created_at).toLocaleDateString("es-CL")}
                          </p>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Facturas */}
          <TabsContent value="invoices" className="space-y-4">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Facturas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {invoices.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No tienes facturas aún</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-white">{invoice.invoice_number}</h3>
                            <p className="text-sm text-gray-400">{invoice.contract?.title}</p>
                          </div>
                          <Badge className={getStatusColor(invoice.status)}>
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1 capitalize">{invoice.status}</span>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Subtotal</p>
                            <p className="font-semibold text-white">{paymentUtils.formatCurrency(invoice.subtotal)}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">IVA (19%)</p>
                            <p className="font-semibold text-gray-300">
                              {paymentUtils.formatCurrency(invoice.tax_amount)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Total</p>
                            <p className="font-semibold text-[#00E5B4]">
                              {paymentUtils.formatCurrency(invoice.total_amount)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Vencimiento</p>
                            <p className="font-semibold text-white">
                              {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString("es-CL") : "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <p className="text-xs text-gray-500">
                            {invoice.paid_at
                              ? `Pagado: ${new Date(invoice.paid_at).toLocaleDateString("es-CL")}`
                              : `Creado: ${new Date(invoice.created_at).toLocaleDateString("es-CL")}`}
                          </p>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                              <Download className="h-4 w-4 mr-2" />
                              Descargar PDF
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalles
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billetera */}
          <TabsContent value="wallet" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5" />
                    <span>Mi Billetera</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Balance Disponible</span>
                      <span className="text-xl font-bold text-[#00E5B4]">
                        {paymentUtils.formatCurrency(availableBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Fondos Pendientes</span>
                      <span className="text-lg font-semibold text-yellow-400">
                        {paymentUtils.formatCurrency(pendingBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Ganado</span>
                      <span className="text-lg font-semibold text-white">
                        {paymentUtils.formatCurrency(totalEarnings)}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <Button
                      className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black"
                      disabled={availableBalance === 0}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Retirar Fondos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle>Historial de Transacciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No hay transacciones aún</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Las transacciones aparecerán aquí cuando completes tu primer proyecto
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
