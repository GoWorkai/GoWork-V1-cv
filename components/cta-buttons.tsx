"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CTAButtonsProps {
  onCreateAccount: () => void
  onExploreServices: () => void
  variant?: "primary" | "secondary"
}

export function CTAButtons({ onCreateAccount, onExploreServices, variant = "primary" }: CTAButtonsProps) {
  if (variant === "secondary") {
    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          onClick={onCreateAccount}
          className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-xl"
        >
          Crear Cuenta Gratis
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={onExploreServices}
          className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-xl"
        >
          Explorar Servicios
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
      <Button
        size="lg"
        onClick={onCreateAccount}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8 py-4 rounded-xl hover:shadow-lg transition-all"
      >
        Crear Cuenta Gratis
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={onExploreServices}
        className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-4 rounded-xl"
      >
        Explorar Servicios
      </Button>
    </div>
  )
}
