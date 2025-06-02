import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import QuickNav from "@/components/quick-nav"
import GlobalChatWidget from "@/components/chat-widget/global-chat-widget"
import IntelligentSearch from "@/components/ai-search/intelligent-search"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoWork - Conecta tu talento con oportunidades",
  description: "Plataforma que conecta talentos con necesidades reales de manera rápida, humana y confiable.",
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
        <AuthProvider>
          {/* Global Search Bar - Solo mostrar en páginas que no sean home */}
          <Suspense fallback={<div>Loading...</div>}>
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-2xl px-4">
              {/* Solo mostrar si no estamos en la página principal */}
              <div className="hidden">
                <IntelligentSearch />
              </div>
            </div>
          </Suspense>

          {children}

          {/* Global Navigation */}
          <Suspense fallback={<div>Loading...</div>}>
            <QuickNav />
          </Suspense>

          {/* Global Chat Widget */}
          <Suspense fallback={<div>Loading...</div>}>
            <GlobalChatWidget />
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  )
}
