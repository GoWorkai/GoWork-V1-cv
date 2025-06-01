import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoWork - Conecta tu talento con quienes lo necesitan",
  description:
    "GoWork es una plataforma que conecta talentos con necesidades reales de manera rápida, humana y confiable.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <main>{children}</main>
            <footer className="bg-gray-100 py-8 mt-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">GoWork</h3>
                    <p className="text-gray-600">Conecta tu talento con quienes lo necesitan.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Servicios</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-gray-600 hover:text-blue-600">
                          Desarrollo
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-blue-600">
                          Diseño
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-blue-600">
                          Marketing
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-blue-600">
                          Hogar
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Acerca de</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-gray-600 hover:text-blue-600">
                          Cómo funciona
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-blue-600">
                          Términos
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-blue-600">
                          Privacidad
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-gray-600 hover:text-blue-600">
                          Contacto
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4">Síguenos</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-600 hover:text-blue-600">
                        FB
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-600">
                        IG
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-600">
                        TW
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-600">
                        LI
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
                  <p>&copy; 2025 GoWork. Todos los derechos reservados.</p>
                </div>
              </div>
            </footer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
