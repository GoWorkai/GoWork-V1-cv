"use client"

import { useContext } from "react"
import { GowContext } from "@/components/gow-ai/gow-provider"

export function useGow() {
  const context = useContext(GowContext)
  if (context === undefined) {
    throw new Error("useGow debe ser usado dentro de un GowProvider")
  }
  return context
}
