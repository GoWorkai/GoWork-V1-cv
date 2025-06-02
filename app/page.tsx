import Link from "next/link"
import { IntelligentSearchBento } from "@/components/ai-search/intelligent-search-bento"
import { VersionIndicator } from "@/components/version-indicator"

export default function Page() {
  return (
    <div className="min-h-screen bg-tertiary p-4 md:p-8">
      {/* Indicador de versión para verificar deployment */}
      <VersionIndicator />

      <div className="max-w-7xl mx-auto">
        {/* Logo y navegación */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-2">
              <span className="font-bold text-secondary">G</span>
            </div>
            <span className="font-bold text-secondary text-xl">GoWork</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#" className="text-secondary hover:text-primary-dark">
              Servicios
            </Link>
            <Link href="#" className="text-secondary hover:text-primary-dark">
              Profesionales
            </Link>
            <Link href="#" className="text-secondary hover:text-primary-dark">
              Cómo funciona
            </Link>
            <Link href="#" className="text-secondary hover:text-primary-dark">
              Contacto
            </Link>
          </nav>
          <div className="flex space-x-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/onboarding"
              className="px-4 py-2 bg-primary text-secondary rounded-lg hover:bg-primary-dark transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* Bloque principal con la búsqueda inteligente */}
          <div className="md:col-span-6 md:row-span-2 bg-secondary rounded-3xl p-6">
            <IntelligentSearchBento />
          </div>

          {/* Bloque de logo grande */}
          <div className="md:col-span-6 md:row-span-2 bg-primary rounded-3xl p-6 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="#1A1C1B" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="30" stroke="#1A1C1B" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="20" stroke="#1A1C1B" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <h1 className="text-6xl md:text-8xl font-bold text-secondary">GoWork</h1>
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mx-auto mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <p className="mt-4 text-secondary font-medium">La Red Social del Talento</p>
            </div>
          </div>

          {/* Bloque de estadísticas */}
          <div className="md:col-span-3 bg-accent-blue rounded-3xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Estadísticas</h3>
            <div className="text-3xl font-bold mb-1">15K+</div>
            <p className="text-white/80 text-sm">Usuarios activos</p>
          </div>

          {/* Bloque de categorías populares */}
          <div className="md:col-span-3 bg-accent-yellow rounded-3xl p-6">
            <h3 className="text-xl font-bold text-secondary mb-2">Categorías</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/20 p-2 rounded-lg text-center">
                <span className="text-xs font-medium text-secondary">Diseño</span>
              </div>
              <div className="bg-white/20 p-2 rounded-lg text-center">
                <span className="text-xs font-medium text-secondary">Desarrollo</span>
              </div>
              <div className="bg-white/20 p-2 rounded-lg text-center">
                <span className="text-xs font-medium text-secondary">Marketing</span>
              </div>
              <div className="bg-white/20 p-2 rounded-lg text-center">
                <span className="text-xs font-medium text-secondary">Educación</span>
              </div>
            </div>
          </div>

          {/* Bloque de color hexadecimal */}
          <div className="md:col-span-2 bg-tertiary rounded-3xl p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-secondary/60 uppercase tracking-wider mb-1">Color principal</div>
              <div className="text-lg font-mono font-bold text-secondary">#1EE2AA</div>
            </div>
          </div>

          {/* Bloque de color hexadecimal secundario */}
          <div className="md:col-span-2 bg-secondary rounded-3xl p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">Color secundario</div>
              <div className="text-lg font-mono font-bold text-white">#1A1C1B</div>
            </div>
          </div>

          {/* Bloque de color hexadecimal terciario */}
          <div className="md:col-span-2 bg-white rounded-3xl p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs text-secondary/60 uppercase tracking-wider mb-1">Color terciario</div>
              <div className="text-lg font-mono font-bold text-secondary">#D1E5D9</div>
            </div>
          </div>
        </div>

        {/* Sección de características */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-secondary"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">Experiencia intuitiva</h3>
            <p className="text-secondary/70">Interfaz moderna y fácil de usar para encontrar servicios rápidamente.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-secondary"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">Perfiles verificados</h3>
            <p className="text-secondary/70">
              Todos los profesionales pasan por un proceso de verificación de identidad.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-secondary"
              >
                <path d="M12 2v4"></path>
                <path d="M12 18v4"></path>
                <path d="m4.93 4.93 2.83 2.83"></path>
                <path d="m16.24 16.24 2.83 2.83"></path>
                <path d="M2 12h4"></path>
                <path d="M18 12h4"></path>
                <path d="m4.93 19.07 2.83-2.83"></path>
                <path d="m16.24 7.76 2.83-2.83"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-secondary mb-2">IA avanzada</h3>
            <p className="text-secondary/70">
              Nuestro asistente Gow te ayuda a encontrar exactamente lo que necesitas.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-secondary/10 pt-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
                  <span className="font-bold text-secondary text-sm">G</span>
                </div>
                <span className="font-bold text-secondary">GoWork</span>
              </div>
              <p className="text-secondary/70 text-sm">
                La plataforma que conecta talento con oportunidades usando inteligencia artificial.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-secondary mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Cómo funciona
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Testimonios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-secondary mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Guías
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Eventos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Comunidad
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-secondary mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Términos de servicio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-secondary/70 hover:text-primary">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary/70 text-sm">© 2025 GoWork. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-secondary/70 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-secondary/70 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="text-secondary/70 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="text-secondary/70 hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
