import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoWork - La Red Social del Talento y las Oportunidades Humanas",
  description:
    "Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti en GoWork.",
  keywords:
    "trabajo freelance, servicios locales, red social profesional, habilidades, ingresos, oportunidades, talento, comunidad",
  authors: [{ name: "GoWork" }],
  creator: "GoWork",
  publisher: "GoWork",
  robots: "index, follow",
  openGraph: {
    title: "GoWork - La Red Social del Talento y las Oportunidades Humanas",
    description:
      "Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer.",
    type: "website",
    locale: "es_ES",
    siteName: "GoWork",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoWork - La Red Social del Talento y las Oportunidades Humanas",
    description:
      "Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
