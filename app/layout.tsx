import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { GlobalChatWidget } from "@/components/chat-widget/global-chat-widget"
import { validateEnvironmentVariables } from "@/lib/database-config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoWork - La Red Social del Talento",
  description: "Conecta con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti",
    generator: 'v0.dev'
}

// Validar variables de entorno al iniciar la aplicación
if (process.env.NODE_ENV !== "production") {
  try {
    validateEnvironmentVariables()
  } catch (error) {
    console.error("Error de configuración:", error)
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <GlobalChatWidget />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
