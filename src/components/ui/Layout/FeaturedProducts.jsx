"use client"

import { useState, useEffect } from "react"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "../Button"
import { Card, CardContent } from "../Card"
import { Badge } from "../Badge"// Mock API and Auth context for demonstration
const mockApi = {
  getProducts: async ({ limit }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return Array.from({ length: limit }, (_, i) => ({
      id: i + 1,
      name: `Premium Beverage ${i + 1}`,
      price: (Math.random() * 50 + 10).toFixed(2),
      original_price: Math.random() > 0.7 ? (Math.random() * 60 + 15).toFixed(2) : null,
      image: `/placeholder.svg?height=300&width=300&text=Product${i + 1}`,
      rating: Math.random() * 2 + 3,
      reviews_count: Math.floor(Math.random() * 100) + 10,
      category: { name: ["Coffee", "Tea", "Juice", "Smoothie"][Math.floor(Math.random() * 4)] },
      description: `Delicious and refreshing beverage perfect for any time of day. Made with premium ingredients.`,
      stock: Math.floor(Math.random() * 50) + 1,
      is_new: Math.random() > 0.8,
      is_on_sale: Math.random() > 0.7,
    }))
  },
  addToCart: async (productId, quantity) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { success: true }
  },
}

const mockAuth = {
  user: { id: 1, name: "John Doe" }, // Set to null to test login prompt
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = mockAuth

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await mockApi.getProducts({ limit: 6 })
        setProducts(data)
      } catch (err) {
        // Fixed: Added the missing || operator
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert("Please login to add items to cart")
      return
    }

    try {
      await mockApi.addToCart(productId, 1)
      alert("Product added to cart!")
    } catch (error) {
      alert("Failed to add product to cart")
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Loading our best beverages...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-t-lg"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Error loading products: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular beverages loved by customers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image || `/placeholder.svg?height=300&width=300&text=${product.name}`}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.is_new && <Badge className="bg-green-500 hover:bg-green-600 text-white">New</Badge>}
                    {product.is_on_sale && <Badge className="bg-red-500 hover:bg-red-600 text-white">Sale</Badge>}
                    {product.stock < 10 && <Badge variant="destructive">Low Stock</Badge>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({product.reviews_count})</span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      {product.original_price && (
                        <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={product.stock === 0}
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {product.stock === 0 ? "Out of Stock" : "Add"}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Stock: {product.stock}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
