import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, User, Briefcase, Search, MessageCircle, MapPin } from "lucide-react"

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¡Bienvenido a{" "}
            <span className="bg-gradient-to-r from-[#00E5B4] to-[#0066FF] bg-clip-text text-transparent">GoWork</span>!
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Estás a un paso de conectar con el talento perfecto o encontrar tu próximo proyecto. ¿Cómo quieres comenzar?
          </p>
        </div>

        {/* Opciones principales */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-800 border-gray-700 hover:border-[#00E5B4]/50 transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#00E5B4]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Search className="h-8 w-8 text-[#00E5B4]" />
              </div>
              <CardTitle className="text-white text-2xl">Busco un servicio</CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Encuentra profesionales para tu proyecto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#00E5B4] rounded-full"></div>
                  <span>Explora miles de servicios disponibles</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#00E5B4] rounded-full"></div>
                  <span>Compara precios y reseñas</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#00E5B4] rounded-full"></div>
                  <span>Contrata con confianza</span>
                </div>
              </div>
              <Link href="/servicios" className="block">
                <Button className="w-full bg-[#00E5B4] hover:bg-[#00CC9F] text-black font-medium text-lg py-6">
                  Explorar servicios
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:border-[#0066FF]/50 transition-all duration-300 group">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#0066FF]/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="h-8 w-8 text-[#0066FF]" />
              </div>
              <CardTitle className="text-white text-2xl">Ofrezco servicios</CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Monetiza tus habilidades y encuentra clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#0066FF] rounded-full"></div>
                  <span>Crea tu perfil profesional</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#0066FF] rounded-full"></div>
                  <span>Recibe propuestas automáticas</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#0066FF] rounded-full"></div>
                  <span>Gestiona tus proyectos</span>
                </div>
              </div>
              <Link href="/provider-dashboard" className="block">
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-medium text-lg py-6">
                  Comenzar como proveedor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Funcionalidades destacadas */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Explora todas las funcionalidades</h2>
          <p className="text-gray-400">Descubre todo lo que GoWork tiene para ofrecerte</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/map">
            <Card className="bg-gray-800 border-gray-700 hover:border-[#FF6D3A]/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#FF6D3A]/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6 text-[#FF6D3A]" />
                </div>
                <h3 className="font-semibold text-white mb-2">Mapa interactivo</h3>
                <p className="text-gray-400 text-sm">Encuentra servicios cerca de ti</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat">
            <Card className="bg-gray-800 border-gray-700 hover:border-[#B297FF]/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#B297FF]/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-6 w-6 text-[#B297FF]" />
                </div>
                <h3 className="font-semibold text-white mb-2">Chat inteligente</h3>
                <p className="text-gray-400 text-sm">Comunícate con Gow, nuestro asistente IA</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard">
            <Card className="bg-gray-800 border-gray-700 hover:border-[#00E5B4]/50 transition-colors cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#00E5B4]/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <User className="h-6 w-6 text-[#00E5B4]" />
                </div>
                <h3 className="font-semibold text-white mb-2">Dashboard personal</h3>
                <p className="text-gray-400 text-sm">Gestiona tus proyectos y servicios</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* CTA final */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-[#00E5B4]/10 to-[#0066FF]/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">¿Necesitas ayuda para comenzar?</h3>
            <p className="text-gray-300 mb-6">Nuestro asistente IA está aquí para guiarte en cada paso</p>
            <Link href="/chat">
              <Button className="bg-gradient-to-r from-[#00E5B4] to-[#0066FF] hover:from-[#00CC9F] hover:to-[#0052CC] text-white font-medium px-8 py-3">
                Hablar con Gow
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
