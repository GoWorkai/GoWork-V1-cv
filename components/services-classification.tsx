"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Hammer,
  Wrench,
  Zap,
  Scissors,
  Car,
  ShoppingCart,
  GraduationCap,
  Heart,
  Laptop,
  Calculator,
  Briefcase,
  Scale,
  Stethoscope,
  Users,
  Palette,
  ArrowRight,
  MapPin,
  Star,
  TrendingUp,
} from "lucide-react"

export function ServicesClassification() {
  const serviceCategories = [
    {
      id: "popular",
      title: "🔨 Oficios Populares",
      subtitle: "Barrios Populares y Periurbanos",
      description: "La esencia del trabajo comunitario y servicios fundamentales en la vida cotidiana",
      gradient: "from-orange-500 to-red-500",
      services: [
        {
          category: "Construcción y Reparaciones",
          icon: Hammer,
          items: [
            "Albañiles",
            "Maestros de obra",
            "Gasfiteros",
            "Electricistas",
            "Pintores",
            "Soldadores",
            "Carpinteros",
          ],
        },
        {
          category: "Servicios Generales",
          icon: Wrench,
          items: ["Jardineros", "Podadores", "Aseadores", "Recolectores de escombros", "Cuidadores de adultos mayores"],
        },
        {
          category: "Comercio y Gastronomía",
          icon: ShoppingCart,
          items: [
            "Vendedores ambulantes",
            "Cocineros de comida rápida",
            "Reposteros caseros",
            "Ferieros",
            "Emprendedores de ferias libres",
          ],
        },
        {
          category: "Transporte y Logística",
          icon: Car,
          items: [
            "Conductores de colectivos",
            "Choferes de camiones",
            "Repartidores en bicicleta o moto",
            "Ayudantes de carga y descarga",
          ],
        },
        {
          category: "Servicios Personales",
          icon: Scissors,
          items: ["Peluqueros a domicilio", "Manicuristas", "Costureras", "Modistas", "Zapateros"],
        },
      ],
    },
    {
      id: "middle",
      title: "🧰 Servicios de Clase Media",
      subtitle: "Profesionales y Técnicos",
      description: "Diversidad de servicios técnicos y profesionales que sustentan el desarrollo urbano y comunitario",
      gradient: "from-blue-500 to-purple-500",
      services: [
        {
          category: "Educación y Formación",
          icon: GraduationCap,
          items: ["Profesores particulares", "Tutores académicos", "Instructores de idiomas", "Monitores de talleres"],
        },
        {
          category: "Salud y Bienestar",
          icon: Heart,
          items: ["Enfermeros", "Técnicos en enfermería", "Kinesiólogos", "Nutricionistas", "Psicólogos"],
        },
        {
          category: "Tecnología y Creatividad",
          icon: Laptop,
          items: [
            "Diseñadores gráficos",
            "Desarrolladores web",
            "Community managers",
            "Fotógrafos",
            "Productores audiovisuales",
          ],
        },
        {
          category: "Servicios Administrativos",
          icon: Calculator,
          items: ["Contadores", "Asistentes administrativos", "Secretarias ejecutivas", "Gestores de trámites"],
        },
        {
          category: "Servicios Técnicos",
          icon: Zap,
          items: [
            "Técnicos en refrigeración",
            "Instaladores de sistemas de seguridad",
            "Mecánicos automotrices",
            "Técnicos en telecomunicaciones",
          ],
        },
      ],
    },
    {
      id: "high",
      title: "🏛️ Profesionales de Clase Alta",
      subtitle: "Alta Especialización y Consultoría",
      description: "Servicios de alta especialización, consultoría estratégica y liderazgo en diversos sectores",
      gradient: "from-purple-500 to-pink-500",
      services: [
        {
          category: "Consultoría y Estrategia",
          icon: Briefcase,
          items: [
            "Consultores de negocios",
            "Asesores financieros",
            "Consultores en transformación digital",
            "Especialistas en recursos humanos",
          ],
        },
        {
          category: "Servicios Jurídicos y Legales",
          icon: Scale,
          items: ["Abogados corporativos", "Notarios", "Mediadores legales", "Especialistas en propiedad intelectual"],
        },
        {
          category: "Salud Especializada",
          icon: Stethoscope,
          items: ["Médicos especialistas", "Cirujanos plásticos", "Psiquiatras", "Dermatólogos"],
        },
        {
          category: "Educación y Coaching",
          icon: Users,
          items: [
            "Coaches ejecutivos",
            "Mentores de liderazgo",
            "Formadores en habilidades blandas",
            "Conferencistas motivacionales",
          ],
        },
        {
          category: "Arte y Cultura",
          icon: Palette,
          items: [
            "Curadores de arte",
            "Productores culturales",
            "Directores de cine y teatro",
            "Escritores y editores",
          ],
        },
      ],
    },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">🌟 Clasificación de Servicios GoWork</h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Una economía colaborativa que valora el conocimiento y la experiencia en todas sus formas, promoviendo la
          inclusión, equidad y desarrollo local
        </p>
      </div>

      <div className="space-y-12">
        {serviceCategories.map((category, categoryIndex) => (
          <Card
            key={category.id}
            className="bg-gray-800/80 backdrop-blur-xl border border-gray-700 hover:border-gray-600 transition-all duration-500 overflow-hidden"
          >
            <CardHeader className="pb-6">
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5`} />
              <div className="relative z-10">
                <CardTitle className="text-2xl lg:text-3xl font-bold text-white mb-2">{category.title}</CardTitle>
                <p className="text-lg text-gray-300 font-medium mb-3">{category.subtitle}</p>
                <p className="text-gray-400 leading-relaxed">{category.description}</p>
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, serviceIndex) => {
                  const IconComponent = service.icon
                  return (
                    <Card
                      key={serviceIndex}
                      className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-105"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div
                            className={`w-10 h-10 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center`}
                          >
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-bold text-white text-sm">{service.category}</h4>
                        </div>

                        <div className="space-y-2">
                          {service.items.slice(0, 4).map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                              <span className="text-xs text-gray-300">{item}</span>
                            </div>
                          ))}
                          {service.items.length > 4 && (
                            <div className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                              <span className="text-xs text-gray-400 italic">
                                +{service.items.length - 4} servicios más
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700 group">
                  Explorar {category.title.replace(/🔨|🧰|🏛️/g, "").trim()}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Section */}
      <Card className="mt-16 bg-gradient-to-r from-[#6610f2]/20 to-[#007bff]/20 backdrop-blur-xl border border-[#6610f2]/30">
        <CardContent className="p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">🌱 Integración y Economía Colaborativa</h3>
          <p className="text-lg text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            GoWork es un puente entre estos diversos segmentos, promoviendo una economía colaborativa que valora el
            conocimiento, fomenta la inclusión, impulsa el desarrollo local y dignifica todos los oficios.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Star, text: "Valora el conocimiento en todas sus formas" },
              { icon: Users, text: "Fomenta la inclusión y la equidad" },
              { icon: MapPin, text: "Impulsa el desarrollo local" },
              { icon: TrendingUp, text: "Dignifica todos los oficios" },
            ].map((benefit, index) => (
              <div key={index} className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFA500] to-[#FF8C00] rounded-xl flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm text-gray-300 text-center leading-relaxed">{benefit.text}</p>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#FFA500] text-white text-lg px-8 py-4 rounded-xl"
          >
            Únete a la Economía Colaborativa
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
