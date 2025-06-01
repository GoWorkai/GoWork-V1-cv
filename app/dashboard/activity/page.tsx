"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
  DollarSign,
  AlertCircle,
  ChevronRight,
} from "lucide-react"

const activities = [
  {
    id: 1,
    type: "service_hired",
    title: "Diseño de logotipo para mi startup",
    provider: {
      name: "Ana Martínez",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
    },
    status: "completed",
    date: "2023-05-15T14:30:00",
    price: 45000,
    rating: 5,
    hasReview: true,
  },
  {
    id: 2,
    type: "service_hired",
    title: "Reparación de computadora",
    provider: {
      name: "Carlos Rojas",
      avatar: "/placeholder.svg?height=40&width=40&text=CR",
    },
    status: "in_progress",
    date: "2023-05-20T10:00:00",
    price: 35000,
    rating: null,
    hasReview: false,
  },
  {
    id: 3,
    type: "service_hired",
    title: "Clases de guitarra",
    provider: {
      name: "Pedro Sánchez",
      avatar: "/placeholder.svg?height=40&width=40&text=PS",
    },
    status: "scheduled",
    date: "2023-05-25T16:00:00",
    price: 20000,
    rating: null,
    hasReview: false,
  },
  {
    id: 4,
    type: "service_hired",
    title: "Limpieza de hogar",
    provider: {
      name: "María González",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
    },
    status: "cancelled",
    date: "2023-05-10T09:00:00",
    price: 30000,
    rating: null,
    hasReview: false,
  },
]

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completado
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="mr-1 h-3 w-3" />
            En progreso
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <Calendar className="mr-1 h-3 w-3" />
            Agendado
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Cancelado
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            Desconocido
          </Badge>
        )
    }
  }

  const filteredActivities = activities.filter((activity) => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return activity.status === "completed"
    if (activeTab === "in_progress") return activity.status === "in_progress" || activity.status === "scheduled"
    if (activeTab === "cancelled") return activity.status === "cancelled"
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mi actividad</h1>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
          <TabsTrigger value="in_progress">En progreso</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <ActivityList
            activities={filteredActivities}
            formatDate={formatDate}
            formatPrice={formatPrice}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <ActivityList
            activities={filteredActivities}
            formatDate={formatDate}
            formatPrice={formatPrice}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>
        <TabsContent value="in_progress" className="mt-4">
          <ActivityList
            activities={filteredActivities}
            formatDate={formatDate}
            formatPrice={formatPrice}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          <ActivityList
            activities={filteredActivities}
            formatDate={formatDate}
            formatPrice={formatPrice}
            getStatusBadge={getStatusBadge}
          />
        </TabsContent>
      </Tabs>

      {filteredActivities.length === 0 && (
        <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay actividad en esta categoría</h3>
          <p className="text-gray-600 mb-4">Explora servicios para comenzar a contratar profesionales</p>
          <Button
            onClick={() => {}}
            className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
          >
            Explorar servicios
          </Button>
        </div>
      )}
    </div>
  )
}

interface ActivityListProps {
  activities: any[]
  formatDate: (date: string) => string
  formatPrice: (price: number) => string
  getStatusBadge: (status: string) => React.ReactNode
}

function ActivityList({ activities, formatDate, formatPrice, getStatusBadge }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-4 flex items-start space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.provider.avatar || "/placeholder.svg"} />
                <AvatarFallback>{activity.provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">{activity.title}</h3>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-sm text-gray-500 mb-2">Proveedor: {activity.provider.name}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(activity.date)}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 p-4 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm font-medium">{formatPrice(activity.price)}</span>
                </div>
                {activity.rating && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{activity.rating}</span>
                  </div>
                )}
              </div>
              <div className="flex space-x-2">
                {activity.status === "completed" && !activity.hasReview && (
                  <Button size="sm" variant="outline">
                    <Star className="mr-1 h-3 w-3" />
                    Calificar
                  </Button>
                )}
                {activity.status === "in_progress" && (
                  <Button size="sm" variant="outline">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    Contactar
                  </Button>
                )}
                <Button size="sm">
                  Detalles
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
