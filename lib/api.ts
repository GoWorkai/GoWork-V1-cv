"use client"

// Configuración de la API base
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://v0-image-analysis-one-psi-82.vercel.app"

// Tipos para la API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  phone: string
  location?: string
  userType: "client" | "provider" | "both"
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  userType: "client" | "provider" | "both"
  avatar?: string
  location?: string
  verified: boolean
  rating?: number
  completedJobs?: number
  skills?: string[]
  services?: string[]
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  price: {
    min: number
    max: number
    type: "fixed" | "hourly" | "project"
  }
  provider: {
    id: string
    name: string
    avatar?: string
    rating: number
    completedJobs: number
    verified: boolean
  }
  location: {
    city: string
    region: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  images: string[]
  tags: string[]
  availability: string
  responseTime: string
  createdAt: string
  updatedAt: string
}

export interface Job {
  id: string
  title: string
  description: string
  client: {
    id: string
    name: string
    avatar?: string
    rating: number
  }
  provider?: {
    id: string
    name: string
    avatar?: string
    rating: number
  }
  service: {
    id: string
    title: string
    category: string
  }
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled"
  budget: {
    amount: number
    type: "fixed" | "hourly"
  }
  deadline?: string
  location: string
  createdAt: string
  updatedAt: string
}

// Clase para manejar las llamadas a la API
class ApiService {
  private baseUrl: string
  private token: string | null = null

  constructor() {
    this.baseUrl = API_BASE_URL
    // Recuperar token del localStorage si existe
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("gowork_token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP error! status: ${response.status}`,
        }
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error) {
      console.error("API request failed:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  // Métodos de autenticación
  async login(credentials: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.success && response.data) {
      this.token = response.data.token
      localStorage.setItem("gowork_token", response.data.token)
      localStorage.setItem("gowork_user", JSON.stringify(response.data.user))
    }

    return response
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })

    if (response.success && response.data) {
      this.token = response.data.token
      localStorage.setItem("gowork_token", response.data.token)
      localStorage.setItem("gowork_user", JSON.stringify(response.data.user))
    }

    return response
  }

  async logout(): Promise<void> {
    try {
      await this.request("/auth/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      this.token = null
      localStorage.removeItem("gowork_token")
      localStorage.removeItem("gowork_user")
    }
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.request<{ token: string }>("/auth/refresh", {
      method: "POST",
    })
  }

  // Métodos de usuario
  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>("/user/profile")
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>("/user/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  // Métodos de servicios
  async getServices(params?: {
    category?: string
    location?: string
    search?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ services: Service[]; total: number; page: number; totalPages: number }>> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const queryString = searchParams.toString()
    const endpoint = `/servicios${queryString ? `?${queryString}` : ""}`

    return this.request<{ services: Service[]; total: number; page: number; totalPages: number }>(endpoint)
  }

  async getService(id: string): Promise<ApiResponse<Service>> {
    return this.request<Service>(`/servicios/${id}`)
  }

  async createService(
    serviceData: Omit<Service, "id" | "provider" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<Service>> {
    return this.request<Service>("/servicios", {
      method: "POST",
      body: JSON.stringify(serviceData),
    })
  }

  async updateService(id: string, serviceData: Partial<Service>): Promise<ApiResponse<Service>> {
    return this.request<Service>(`/servicios/${id}`, {
      method: "PUT",
      body: JSON.stringify(serviceData),
    })
  }

  async deleteService(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/servicios/${id}`, {
      method: "DELETE",
    })
  }

  // Métodos de trabajos
  async getJobs(params?: {
    status?: string
    type?: "client" | "provider"
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ jobs: Job[]; total: number; page: number; totalPages: number }>> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const queryString = searchParams.toString()
    const endpoint = `/jobs${queryString ? `?${queryString}` : ""}`

    return this.request<{ jobs: Job[]; total: number; page: number; totalPages: number }>(endpoint)
  }

  async getJob(id: string): Promise<ApiResponse<Job>> {
    return this.request<Job>(`/jobs/${id}`)
  }

  async createJob(jobData: Omit<Job, "id" | "client" | "createdAt" | "updatedAt">): Promise<ApiResponse<Job>> {
    return this.request<Job>("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    })
  }

  async updateJobStatus(id: string, status: Job["status"]): Promise<ApiResponse<Job>> {
    return this.request<Job>(`/jobs/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  }

  // Métodos de búsqueda y recomendaciones
  async searchServices(
    query: string,
    filters?: {
      category?: string
      location?: string
      priceRange?: { min: number; max: number }
    },
  ): Promise<ApiResponse<{ services: Service[]; suggestions: string[] }>> {
    return this.request<{ services: Service[]; suggestions: string[] }>("/search/services", {
      method: "POST",
      body: JSON.stringify({ query, filters }),
    })
  }

  async getRecommendations(type: "services" | "jobs"): Promise<ApiResponse<Service[] | Job[]>> {
    return this.request<Service[] | Job[]>(`/recommendations/${type}`)
  }

  // Métodos de mensajería
  async getConversations(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>("/messages/conversations")
  }

  async getMessages(conversationId: string): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/messages/conversations/${conversationId}`)
  }

  async sendMessage(conversationId: string, content: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/messages/conversations/${conversationId}`, {
      method: "POST",
      body: JSON.stringify({ content }),
    })
  }

  // Métodos de estadísticas
  async getDashboardStats(): Promise<
    ApiResponse<{
      earnings: { current: number; previous: number; change: number }
      jobs: { completed: number; pending: number; total: number }
      rating: { average: number; total: number }
      views: { profile: number; services: number }
    }>
  > {
    return this.request("/dashboard/stats")
  }
}

// Instancia singleton de la API
export const apiService = new ApiService()

// Hooks personalizados para usar con React Query o SWR
export const useApi = () => {
  return {
    // Auth
    login: (credentials: LoginRequest) => apiService.login(credentials),
    register: (userData: RegisterRequest) => apiService.register(userData),
    logout: () => apiService.logout(),

    // User
    getProfile: () => apiService.getProfile(),
    updateProfile: (userData: Partial<User>) => apiService.updateProfile(userData),

    // Services
    getServices: (params?: Parameters<typeof apiService.getServices>[0]) => apiService.getServices(params),
    getService: (id: string) => apiService.getService(id),
    createService: (serviceData: Parameters<typeof apiService.createService>[0]) =>
      apiService.createService(serviceData),

    // Jobs
    getJobs: (params?: Parameters<typeof apiService.getJobs>[0]) => apiService.getJobs(params),
    getJob: (id: string) => apiService.getJob(id),

    // Dashboard
    getDashboardStats: () => apiService.getDashboardStats(),
  }
}
