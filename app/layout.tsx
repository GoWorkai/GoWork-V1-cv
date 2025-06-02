import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { GowProvider } from "@/components/gow-ai/gow-provider"
import { GowChatWidget } from "@/components/gow-ai/gow-chat-widget"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoWork - La Red Social del Talento",
  description: "Conecta con el talento perfecto usando IA. Encuentra freelancers o monetiza tus habilidades.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <GowProvider>
            {children}
            <GowChatWidget />
          </GowProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
