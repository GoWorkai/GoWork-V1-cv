// Configuración de la base de datos usando las variables de entorno de GoWork
export const databaseConfig = {
  // URLs de conexión
  url: process.env.POSTGRES_URL!,
  prismaUrl: process.env.POSTGRES_PRISMA_URL!,
  nonPoolingUrl: process.env.POSTGRES_URL_NON_POOLING!,

  // Credenciales individuales
  host: process.env.POSTGRES_HOST!,
  user: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
  database: process.env.POSTGRES_DATABASE!,

  // Configuración de Supabase
  supabase: {
    url: process.env.SUPABASE_URL!,
    publicUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.SUPABASE_ANON_KEY!,
    publicAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    jwtSecret: process.env.SUPABASE_JWT_SECRET!,
  },
}

// Validar que todas las variables estén presentes
export function validateEnvironmentVariables() {
  const requiredVars = [
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "POSTGRES_URL_NON_POOLING",
    "POSTGRES_HOST",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_DATABASE",
    "SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_JWT_SECRET",
  ]

  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    throw new Error(`Variables de entorno faltantes: ${missing.join(", ")}`)
  }

  console.log("✅ Todas las variables de entorno de GoWork están configuradas correctamente")
  return true
}

// Función para obtener la configuración según el entorno
export function getDatabaseUrl(type: "default" | "prisma" | "non-pooling" = "default") {
  switch (type) {
    case "prisma":
      return databaseConfig.prismaUrl
    case "non-pooling":
      return databaseConfig.nonPoolingUrl
    default:
      return databaseConfig.url
  }
}
