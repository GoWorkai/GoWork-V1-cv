import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GoWork - La Red Social del Talento y las Oportunidades Humanas",
  description:
    "Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti en GoWork.",
  keywords:
    "trabajo freelance, servicios locales, red social profesional, habilidades, ingresos, oportunidades, talento, comunidad, GoWork, freelancer, servicios bajo demanda",
  authors: [{ name: "GoWork" }],
  creator: "GoWork",
  publisher: "GoWork",
  robots: "index, follow",
  openGraph: {
    title: "GoWork - La Red Social del Talento y las Oportunidades Humanas",
    description:
      "Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer y encuentra oportunidades cerca de ti.",
    type: "website",
    locale: "es_ES",
    siteName: "GoWork",
    images: [
      {
        url: "/images/gowork-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GoWork - Red Social del Talento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoWork - La Red Social del Talento y las Oportunidades Humanas",
    description:
      "Transforma tus habilidades en ingresos reales. Conecta con personas que necesitan lo que sabes hacer.",
    images: ["/images/gowork-og-image.jpg"],
  },
  alternates: {
    canonical: "https://gowork.com",
  },
  verification: {
    google: "google-site-verification-code",
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

        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4A90E2" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
