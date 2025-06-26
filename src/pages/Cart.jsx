"use client"

import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart()
  const { user } = useAuth()

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some delicious drinks to get started!</p>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image || "/placeholder.svg"} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-line total">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>

            {user ? (
              <button className="checkout-btn">Proceed to Checkout</button>
            ) : (
              <div>
                <p>Please log in to checkout</p>
                <Link to="/login" className="login-btn">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
