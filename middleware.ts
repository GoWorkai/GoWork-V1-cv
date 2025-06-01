import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  // Crear cliente de Supabase para el middleware
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Verificar si hay una sesión activa
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ["/dashboard", "/provider-dashboard", "/chat", "/payments", "/onboarding", "/ai-dashboard"]

  // Rutas de autenticación (redirigir si ya está autenticado)
  const authRoutes = ["/auth/login", "/auth/signup", "/auth/reset-password"]

  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Redirigir a login si intenta acceder a ruta protegida sin sesión
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/auth/login", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirigir a dashboard si intenta acceder a rutas de auth estando autenticado
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

// Configurar para que el middleware se ejecute en las rutas especificadas
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/provider-dashboard/:path*",
    "/chat/:path*",
    "/payments/:path*",
    "/onboarding/:path*",
    "/ai-dashboard/:path*",
    "/auth/:path*",
  ],
}
