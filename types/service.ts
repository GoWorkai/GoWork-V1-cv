export interface Service {
  id: string
  title: string
  description: string
  category: string
  subcategory?: string
  price_type: "fixed" | "hourly" | "negotiable"
  price_min?: number
  price_max?: number
  duration?: string
  location: string
  location_type: "remote" | "client_location" | "provider_location" | "flexible"
  images: string[]
  tags: string[]
  availability: {
    days: string[]
    hours: {
      start: string
      end: string
    }
  }
  requirements?: string
  provider_id: string
  provider_name: string
  provider_avatar?: string
  provider_rating?: number
  is_active: boolean
  created_at: string
  updated_at: string
  views_count: number
  favorites_count: number
}

export interface CreateServiceData {
  title: string
  description: string
  category: string
  subcategory?: string
  price_type: "fixed" | "hourly" | "negotiable"
  price_min?: number
  price_max?: number
  duration?: string
  location: string
  location_type: "remote" | "client_location" | "provider_location" | "flexible"
  images: File[]
  tags: string[]
  availability: {
    days: string[]
    hours: {
      start: string
      end: string
    }
  }
  requirements?: string
}

export interface ServiceFilters {
  category?: string
  subcategory?: string
  location?: string
  price_min?: number
  price_max?: number
  price_type?: string
  rating_min?: number
  availability?: string[]
  search_query?: string
}

export const SERVICE_CATEGORIES = {
  hogar: {
    name: "Hogar y Mantención",
    subcategories: ["Plomería", "Electricidad", "Carpintería", "Pintura", "Limpieza", "Jardinería"],
  },
  tecnologia: {
    name: "Tecnología",
    subcategories: ["Desarrollo Web", "Diseño Gráfico", "Soporte IT", "Marketing Digital", "Fotografía"],
  },
  educacion: {
    name: "Educación",
    subcategories: ["Clases Particulares", "Idiomas", "Música", "Deportes", "Coaching"],
  },
  salud: {
    name: "Salud y Bienestar",
    subcategories: ["Entrenamiento Personal", "Nutrición", "Masajes", "Terapias", "Cuidado Personal"],
  },
  eventos: {
    name: "Eventos",
    subcategories: ["Catering", "Fotografía", "Música", "Decoración", "Organización"],
  },
  transporte: {
    name: "Transporte",
    subcategories: ["Mudanzas", "Delivery", "Transporte Personal", "Logística"],
  },
}
