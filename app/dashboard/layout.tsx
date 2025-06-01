import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute requireAuth={true}>{children}</ProtectedRoute>
}
