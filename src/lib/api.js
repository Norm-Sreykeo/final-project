const API_BASE_URL = "http://localhost:8000/api"

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.token = localStorage.getItem("auth_token")
  }

  setToken(token) {
    this.token = token
    localStorage.setItem("auth_token", token)
  }

  removeToken() {
    this.token = null
    localStorage.removeItem("auth_token")
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }))
      throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Auth methods
  async login(email, password) {
    const data = await this.request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (data.token) {
      this.setToken(data.token)
    }

    return data
  }

  async register(name, email, password, password_confirmation) {
    const data = await this.request("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, password_confirmation }),
    })

    if (data.token) {
      this.setToken(data.token)
    }

    return data
  }

  async logout() {
    try {
      await this.request("/logout", { method: "POST" })
    } finally {
      this.removeToken()
    }
  }

  async getMe() {
    return this.request("/me")
  }

  // Products
  async getProducts(params = {}) {
    const searchParams = new URLSearchParams()
    if (params.category) searchParams.append("category", params.category)
    if (params.search) searchParams.append("search", params.search)
    if (params.limit) searchParams.append("limit", params.limit.toString())

    const query = searchParams.toString()
    return this.request(`/products${query ? `?${query}` : ""}`)
  }

  async createProduct(product) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(product),
    })
  }

  async updateProduct(id, product) {
    return this.request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    })
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: "DELETE",
    })
  }

  // Categories
  async getCategories() {
    return this.request("/categories")
  }

  // Cart
  async addToCart(productId, quantity = 1) {
    return this.request("/cart", {
      method: "POST",
      body: JSON.stringify({ product_id: productId, quantity }),
    })
  }

  async getCart() {
    return this.request("/cart")
  }
}

export const api = new ApiClient(API_BASE_URL)
