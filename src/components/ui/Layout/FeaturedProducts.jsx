"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../../contexts/CartContext"
import api from "../../../services/api"

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true)
      // Use the new getFeaturedProducts method
      const data = await api.getFeaturedProducts(6)
      setProducts(data)
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  fetchProducts()
}, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/featured")
      setProducts(response.data.data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      // Fallback to mock data
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  if (loading) {
    return (
      <section className="featured-products">
        <div className="container">
          <div className="loading">Loading products...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-header">
          <h2>Featured Drinks</h2>
          <Link to="/products" className="view-all">
            View All Products
          </Link>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image || "/placeholder.svg?height=300&width=300"} alt={product.name} />
                </Link>
                {product.is_new && <span className="badge new">New</span>}
                {product.discount && <span className="badge sale">Sale</span>}
                <button className="wishlist-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              <div className="product-info">
                <div className="product-category">{product.category?.name}</div>
                <Link to={`/product/${product.id}`} className="product-name">
                  {product.name}
                </Link>
                <div className="product-price">
                  {product.discount ? (
                    <>
                      <span className="current-price">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="original-price">${product.price}</span>
                    </>
                  ) : (
                    <span className="current-price">${product.price}</span>
                  )}
                </div>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Mock data for fallback
const mockProducts = [
  {
    id: 1,
    name: "Fresh Orange Juice",
    price: 4.99,
    image: "/placeholder.svg?height=300&width=300",
    category: { name: "Juice" },
    is_new: true,
  },
  {
    id: 2,
    name: "Premium Coffee Blend",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    category: { name: "Coffee" },
    discount: 15,
  },
  {
    id: 3,
    name: "Green Tea",
    price: 6.99,
    image: "/placeholder.svg?height=300&width=300",
    category: { name: "Tea" },
  },
  {
    id: 4,
    name: "Energy Drink",
    price: 3.49,
    image: "/placeholder.svg?height=300&width=300",
    category: { name: "Energy" },
    is_new: true,
  },
]
