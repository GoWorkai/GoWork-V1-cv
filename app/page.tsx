import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  MapPin,
  User,
  Brain,
  ArrowRight,
  TrendingUp,
  Palette,
  Code,
  Camera,
  Music,
  Briefcase,
  Heart,
  Globe,
  Smartphone,
  Headphones,
  Video,
  Edit,
  Target,
  Sparkles,
} from "lucide-react"
import IntelligentSearch from "@/components/ai-search/intelligent-search"

export default function Page() {
  const gridItems = [
    {
      id: 1,
      title: "Desarrollo Web",
      description: "Crea sitios web increíbles",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      size: "col-span-2 row-span-2",
      link: "/servicios?category=desarrollo",
    },
    {
      id: 2,
      title: "Diseño UI/UX",
      description: "Interfaces que enamoran",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      size: "col-span-1 row-span-1",
      link: "/servicios?category=diseno",
    },
    {
      id: 3,
      title: "Fotografía",
      description: "Captura momentos únicos",
      icon: Camera,
      color: "from-orange-500 to-red-500",
      size: "col-span-1 row-span-1",
      link: "/servicios?category=fotografia",
    },
    {
      id: 4,
      title: "Marketing Digital",
      description: "Haz crecer tu negocio",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      size: "col-span-2 row-span-1",
      link: "/servicios?category=marketing",
    },
    {
      id: 5,
      title: "Música & Audio",
      description: "Sonidos profesionales",
      icon: Music,
      color: "from-indigo-500 to-purple-500",
      size: "col-span-1 row-span-2",
      link: "/servicios?category=audio",
    },
    {
      id: 6,
      title: "Consultoría",
      description: "Expertos a tu alcance",
      icon: Briefcase,
      color: "from-gray-600 to-gray-800",
      size: "col-span-1 row-span-1",
      link: "/servicios?category=consultoria",
    },
    {
      id: 7,
      title: "Bienestar",
      description: "Cuida tu salud mental",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      size: "col-span-1 row-span-1",
      link: "/servicios?category=bienestar",
    },
    {
      id: 8,
      title: "Traducción",
      description: "Conecta con el mundo",
      icon: Globe,
      color: "from-teal-500 to-cyan-500",
      size: "col-span-2 row-span-1",
      link: "/servicios?category=traduccion",
    },
    {
      id: 9,
      title: "Apps Móviles",
      description: "Ideas que se mueven",
      icon: Smartphone,
      color: "from-violet-500 to-purple-500",
      size: "col-span-1 row-span-1",
      link: "/servicios?category=mobile",
    },
    {
      id: 10,
      title: "Podcasting",
      description: "Tu voz al mundo",
      icon: Headphones,
      color: "from-amber-500 to-orange-500",
      size: "col-span-1 row-span-1",
      link: "/servicios?category=podcast",
    },
    {
      id: 11,
      title: "Video & Animación",
      description: "Historias en movimiento",
      icon: Video,
      color: "from-red-500 to-pink-500",
      size: "col-span-2 row-span-1",
      link: "/servicios?category=video",
    },
    {
      id: 12,
      title: "Copywriting",
      description: "Palabras que venden",
      icon: Edit,
      color: "from-emerald-500 to-teal-500",
      size: "col-span-1 row-span-1",
      link: "/servicios?category=copywriting",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section con búsqueda central potenciada */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E5B4]/5 to-[#0066FF]/5"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#00E5B4]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo y Badge */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#00E5B4] to-[#0066FF] rounded-2xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-gray-900">GoWork</h1>
                  <Badge className="bg-[#00E5B4]/20 text-[#00E5B4] border-[#00E5B4]/30 text-xs">
                    Powered by Gemini AI
                  </Badge>
                </div>
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Encuentra el{" "}
              <span className="bg-gradient-to-r from-[#00E5B4] to-[#0066FF] bg-clip-text text-transparent">
                talento perfecto
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              La plataforma inteligente que conecta freelancers y clientes usando IA. Descubre servicios increíbles o
              monetiza tus habilidades.
            </p>

            {/* Barra de Búsqueda Central Potenciada */}
            <div className="mb-16 max-w-4xl mx-auto">
              <div className="relative">
                <IntelligentSearch />
              </div>

              {/* Sugerencias rápidas debajo de la búsqueda */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  🎨 Diseño web
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  💻 Desarrollo
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  📱 Marketing
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  🎵 Audio
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  📝 Copywriting
                </Badge>
              </div>
            </div>

            {/* Stats rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00E5B4] mb-2">15K+</div>
                <div className="text-gray-600 text-sm">Freelancers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0066FF] mb-2">8K+</div>
                <div className="text-gray-600 text-sm">Proyectos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#00E5B4] mb-2">95%</div>
                <div className="text-gray-600 text-sm">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0066FF] mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Soporte IA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vento Grid Section - Estilo Canva */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explora por categorías</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre miles de servicios organizados para que encuentres exactamente lo que necesitas
            </p>
          </div>

          {/* Grid estilo Canva/Vento */}
          <div className="grid grid-cols-4 gap-4 auto-rows-[120px]">
            {gridItems.map((item) => {
              const IconComponent = item.icon
              return (
                <Link key={item.id} href={item.link}>
                  <Card
                    className={`${item.size} group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden`}
                  >
                    <CardContent className={`h-full p-0 bg-gradient-to-br ${item.color} relative`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <div className="relative h-full flex flex-col justify-between p-6 text-white">
                        <div className="flex justify-between items-start">
                          <IconComponent className="h-8 w-8 text-white/90" />
                          <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                          <p className="text-white/80 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Potenciado por Inteligencia Artificial
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra IA hace que encontrar y ofrecer servicios sea más inteligente y eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#00E5B4] to-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-900">Matching Inteligente</CardTitle>
                <CardDescription className="text-gray-600">
                  IA que conecta automáticamente freelancers con proyectos perfectos según habilidades y experiencia
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0066FF] to-[#B297FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-900">Asistente Gemini</CardTitle>
                <CardDescription className="text-gray-600">
                  Chat inteligente que ayuda en negociaciones, propuestas y resolución de dudas 24/7
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF6D3A] to-[#FF9500] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-gray-900">Búsqueda Avanzada</CardTitle>
                <CardDescription className="text-gray-600">
                  Encuentra exactamente lo que buscas con filtros inteligentes y recomendaciones personalizadas
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#00E5B4]/10 to-[#0066FF]/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">¿Listo para empezar?</h3>
          <p className="text-xl text-gray-600 mb-8">Únete a miles de freelancers y empresas que ya confían en GoWork</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding">
              <Button size="lg" className="bg-[#00E5B4] hover:bg-[#00E5B4]/90 text-gray-900 font-semibold px-8">
                Crear cuenta gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8">
                Explorar servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Footer */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/chat">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-4 h-auto"
              >
                <MessageCircle className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Chat con Gemini</div>
                  <div className="text-sm text-gray-500">Asistente IA 24/7</div>
                </div>
              </Button>
            </Link>

            <Link href="/map">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-4 h-auto"
              >
                <MapPin className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Mapa de talentos</div>
                  <div className="text-sm text-gray-500">Encuentra cerca de ti</div>
                </div>
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-4 h-auto"
              >
                <User className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Mi dashboard</div>
                  <div className="text-sm text-gray-500">Gestiona proyectos</div>
                </div>
              </Button>
            </Link>

            <Link href="/ai-dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-4 h-auto"
              >
                <Brain className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Centro de IA</div>
                  <div className="text-sm text-gray-500">Herramientas inteligentes</div>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
