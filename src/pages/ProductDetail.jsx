"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import api from "../services/api"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data.data)
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading product...</div>
  }

  if (!product) {
    return <div className="error">Product not found</div>
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-content">
          <div className="product-images">
            <img src={product.image || "/placeholder.svg?height=500&width=500"} alt={product.name} />
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="product-price">
              <span className="current-price">${product.price}</span>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
