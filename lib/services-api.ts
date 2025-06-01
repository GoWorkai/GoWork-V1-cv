import { supabase } from "./supabase"
import type { Service, CreateServiceData, ServiceFilters } from "@/types/service"

export class ServicesAPI {
  // Crear un nuevo servicio
  async createService(data: CreateServiceData, userId: string): Promise<Service> {
    try {
      // Primero subir las imágenes
      const imageUrls = await this.uploadImages(data.images, userId)

      const serviceData = {
        title: data.title,
        description: data.description,
        category: data.category,
        subcategory: data.subcategory,
        price_type: data.price_type,
        price_min: data.price_min,
        price_max: data.price_max,
        duration: data.duration,
        location: data.location,
        location_type: data.location_type,
        images: imageUrls,
        tags: data.tags,
        availability: data.availability,
        requirements: data.requirements,
        provider_id: userId,
        is_active: true,
        views_count: 0,
        favorites_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data: service, error } = await supabase
        .from("services")
        .insert(serviceData)
        .select(`
          *,
          profiles:provider_id (
            full_name,
            avatar_url,
            rating
          )
        `)
        .single()

      if (error) throw error

      return this.formatService(service)
    } catch (error) {
      console.error("Error creating service:", error)
      throw new Error("Error al crear el servicio")
    }
  }

  // Obtener servicios con filtros
  async getServices(
    filters: ServiceFilters = {},
    page = 1,
    limit = 20,
  ): Promise<{
    services: Service[]
    total: number
    hasMore: boolean
  }> {
    try {
      let query = supabase
        .from("services")
        .select(
          `
          *,
          profiles:provider_id (
            full_name,
            avatar_url,
            rating
          )
        `,
          { count: "exact" },
        )
        .eq("is_active", true)

      // Aplicar filtros
      if (filters.category) {
        query = query.eq("category", filters.category)
      }

      if (filters.subcategory) {
        query = query.eq("subcategory", filters.subcategory)
      }

      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`)
      }

      if (filters.price_min) {
        query = query.gte("price_min", filters.price_min)
      }

      if (filters.price_max) {
        query = query.lte("price_max", filters.price_max)
      }

      if (filters.price_type) {
        query = query.eq("price_type", filters.price_type)
      }

      if (filters.search_query) {
        query = query.or(
          `title.ilike.%${filters.search_query}%,description.ilike.%${filters.search_query}%,tags.cs.{${filters.search_query}}`,
        )
      }

      // Paginación
      const from = (page - 1) * limit
      const to = from + limit - 1

      query = query.range(from, to).order("created_at", { ascending: false })

      const { data, error, count } = await query

      if (error) throw error

      const services = data?.map(this.formatService) || []
      const total = count || 0
      const hasMore = total > page * limit

      return { services, total, hasMore }
    } catch (error) {
      console.error("Error fetching services:", error)
      throw new Error("Error al obtener los servicios")
    }
  }

  // Obtener un servicio por ID
  async getServiceById(id: string): Promise<Service | null> {
    try {
      const { data, error } = await supabase
        .from("services")
        .select(`
          *,
          profiles:provider_id (
            full_name,
            avatar_url,
            rating,
            phone,
            email
          )
        `)
        .eq("id", id)
        .eq("is_active", true)
        .single()

      if (error) {
        if (error.code === "PGRST116") return null
        throw error
      }

      // Incrementar contador de vistas
      await this.incrementViews(id)

      return this.formatService(data)
    } catch (error) {
      console.error("Error fetching service:", error)
      return null
    }
  }

  // Obtener servicios del usuario
  async getUserServices(userId: string): Promise<Service[]> {
    try {
      const { data, error } = await supabase
        .from("services")
        .select(`
          *,
          profiles:provider_id (
            full_name,
            avatar_url,
            rating
          )
        `)
        .eq("provider_id", userId)
        .order("created_at", { ascending: false })

      if (error) throw error

      return data?.map(this.formatService) || []
    } catch (error) {
      console.error("Error fetching user services:", error)
      throw new Error("Error al obtener tus servicios")
    }
  }

  // Actualizar un servicio
  async updateService(id: string, data: Partial<CreateServiceData>, userId: string): Promise<Service> {
    try {
      // Verificar que el usuario es el propietario
      const { data: existingService, error: checkError } = await supabase
        .from("services")
        .select("provider_id")
        .eq("id", id)
        .single()

      if (checkError) throw checkError
      if (existingService.provider_id !== userId) {
        throw new Error("No tienes permisos para editar este servicio")
      }

      // Subir nuevas imágenes si las hay
      let imageUrls = undefined
      if (data.images && data.images.length > 0) {
        imageUrls = await this.uploadImages(data.images, userId)
      }

      const updateData = {
        ...data,
        ...(imageUrls && { images: imageUrls }),
        updated_at: new Date().toISOString(),
      }

      const { data: service, error } = await supabase
        .from("services")
        .update(updateData)
        .eq("id", id)
        .select(`
          *,
          profiles:provider_id (
            full_name,
            avatar_url,
            rating
          )
        `)
        .single()

      if (error) throw error

      return this.formatService(service)
    } catch (error) {
      console.error("Error updating service:", error)
      throw new Error("Error al actualizar el servicio")
    }
  }

  // Eliminar un servicio (soft delete)
  async deleteService(id: string, userId: string): Promise<void> {
    try {
      // Verificar que el usuario es el propietario
      const { data: existingService, error: checkError } = await supabase
        .from("services")
        .select("provider_id")
        .eq("id", id)
        .single()

      if (checkError) throw checkError
      if (existingService.provider_id !== userId) {
        throw new Error("No tienes permisos para eliminar este servicio")
      }

      const { error } = await supabase
        .from("services")
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq("id", id)

      if (error) throw error
    } catch (error) {
      console.error("Error deleting service:", error)
      throw new Error("Error al eliminar el servicio")
    }
  }

  // Subir imágenes
  private async uploadImages(files: File[], userId: string): Promise<string[]> {
    const uploadPromises = files.map(async (file, index) => {
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}/${Date.now()}_${index}.${fileExt}`

      const { data, error } = await supabase.storage.from("service-images").upload(fileName, file)

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from("service-images").getPublicUrl(fileName)

      return publicUrl
    })

    return Promise.all(uploadPromises)
  }

  // Incrementar vistas
  private async incrementViews(serviceId: string): Promise<void> {
    try {
      await supabase.rpc("increment_service_views", { service_id: serviceId })
    } catch (error) {
      console.error("Error incrementing views:", error)
    }
  }

  // Formatear servicio
  private formatService(data: any): Service {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      category: data.category,
      subcategory: data.subcategory,
      price_type: data.price_type,
      price_min: data.price_min,
      price_max: data.price_max,
      duration: data.duration,
      location: data.location,
      location_type: data.location_type,
      images: data.images || [],
      tags: data.tags || [],
      availability: data.availability || { days: [], hours: { start: "", end: "" } },
      requirements: data.requirements,
      provider_id: data.provider_id,
      provider_name: data.profiles?.full_name || "Usuario",
      provider_avatar: data.profiles?.avatar_url,
      provider_rating: data.profiles?.rating,
      is_active: data.is_active,
      created_at: data.created_at,
      updated_at: data.updated_at,
      views_count: data.views_count || 0,
      favorites_count: data.favorites_count || 0,
    }
  }
}

export const servicesAPI = new ServicesAPI()
