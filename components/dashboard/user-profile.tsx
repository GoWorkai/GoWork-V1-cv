"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth/auth-provider"
import { User, Mail, Phone, MapPin, Star, Edit, Save, X } from "lucide-react"

export default function UserProfile() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    location: user?.location || "",
  })

  const handleSave = async () => {
    setLoading(true)
    const { error } = await updateProfile(formData)

    if (!error) {
      setIsEditing(false)
    }

    setLoading(false)
  }

  const handleCancel = () => {
    setFormData({
      full_name: user?.full_name || "",
      phone: user?.phone || "",
      location: user?.location || "",
    })
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Mi Perfil</span>
          </CardTitle>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-gray-600 text-gray-300"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel} className="border-gray-600 text-gray-300">
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={loading}
                className="bg-[#00E5B4] hover:bg-[#00CC9F] text-black"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar y info básica */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-gradient-to-br from-[#0066FF] to-[#00E5B4] text-white text-xl">
              {user.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-semibold text-white">{user.full_name}</h3>
              {user.verified && (
                <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30">Verificado</Badge>
              )}
            </div>
            <Badge
              className={`${
                user.user_type === "freelancer"
                  ? "bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30"
                  : "bg-[#0066FF]/20 text-[#0066FF] border-[#0066FF]/30"
              }`}
            >
              {user.user_type === "freelancer" ? "Freelancer" : "Cliente"}
            </Badge>
            {user.total_reviews > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-400">
                  {user.rating.toFixed(1)} ({user.total_reviews} reseñas)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Información de contacto */}
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </Label>
            <Input id="email" value={user.email} disabled className="bg-gray-800 border-gray-600 text-gray-400" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Nombre completo</span>
            </Label>
            {isEditing ? (
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-gray-800 border-gray-600 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
              />
            ) : (
              <Input value={user.full_name} disabled className="bg-gray-800 border-gray-600 text-gray-300" />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Teléfono</span>
            </Label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-gray-800 border-gray-600 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                placeholder="+56 9 1234 5678"
              />
            ) : (
              <Input
                value={user.phone || "No especificado"}
                disabled
                className="bg-gray-800 border-gray-600 text-gray-300"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Ubicación</span>
            </Label>
            {isEditing ? (
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-gray-800 border-gray-600 focus:border-[#00E5B4] focus:ring-[#00E5B4]"
                placeholder="Santiago, Chile"
              />
            ) : (
              <Input
                value={user.location || "No especificado"}
                disabled
                className="bg-gray-800 border-gray-600 text-gray-300"
              />
            )}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00E5B4]">{user.user_type === "freelancer" ? "12" : "5"}</div>
            <div className="text-sm text-gray-400">
              {user.user_type === "freelancer" ? "Proyectos" : "Contrataciones"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#0066FF]">{user.total_reviews}</div>
            <div className="text-sm text-gray-400">Reseñas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#FF6D3A]">{user.rating > 0 ? user.rating.toFixed(1) : "N/A"}</div>
            <div className="text-sm text-gray-400">Calificación</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
