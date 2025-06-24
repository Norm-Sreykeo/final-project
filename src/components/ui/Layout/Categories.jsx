"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../Card"

// Mock API for demonstration
const mockApi = {
  getCategories: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return [
      {
        id: 1,
        name: "Coffee",
        slug: "coffee",
        description: "Premium coffee blends",
        products_count: 25,
        image: "/placeholder.svg?height=200&width=200&text=Coffee",
      },
      {
        id: 2,
        name: "Tea",
        slug: "tea",
        description: "Herbal and green teas",
        products_count: 18,
        image: "/placeholder.svg?height=200&width=200&text=Tea",
      },
      {
        id: 3,
        name: "Juices",
        slug: "juices",
        description: "Fresh fruit juices",
        products_count: 32,
        image: "/placeholder.svg?height=200&width=200&text=Juices",
      },
      {
        id: 4,
        name: "Smoothies",
        slug: "smoothies",
        description: "Healthy smoothie blends",
        products_count: 15,
        image: "/placeholder.svg?height=200&width=200&text=Smoothies",
      },
      {
        id: 5,
        name: "Energy Drinks",
        slug: "energy-drinks",
        description: "Boost your energy",
        products_count: 12,
        image: "/placeholder.svg?height=200&width=200&text=Energy",
      },
      {
        id: 6,
        name: "Water",
        slug: "water",
        description: "Pure and flavored water",
        products_count: 8,
        image: "/placeholder.svg?height=200&width=200&text=Water",
      },
    ]
  },
}

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await mockApi.getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (categorySlug) => {
    // Handle navigation - you can customize this based on your routing setup
    console.log(`Navigate to category: ${categorySlug}`)
    // For example: window.location.href = `/category/${categorySlug}`
    // Or if using React Router: navigate(`/category/${categorySlug}`)
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Loading categories...</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-32 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of beverages from refreshing juices to energizing drinks
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              onClick={() => handleCategoryClick(category.slug)}
              className="cursor-pointer"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="relative w-full h-32 mb-4">
                    <img
                      src={category.image || `/placeholder.svg?height=200&width=200&text=${category.name}`}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{category.products_count} items</p>
                  <p className="text-xs text-gray-400">{category.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories