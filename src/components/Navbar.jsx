"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useAuth } from "../contexts/AuthContext"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">🥤</div>
          <span>DRINK SHOP</span>
        </Link>

        <nav className={`navbar-nav ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link">
            HOME
          </Link>
          <Link to="/beverages" className="nav-link">
            BEVERAGES
          </Link>
          <Link to="/coffee" className="nav-link">
            COFFEE
          </Link>
          <Link to="/tea" className="nav-link">
            TEA
          </Link>
          <Link to="/juice" className="nav-link">
            JUICE
          </Link>
          <Link to="/about" className="nav-link">
            ABOUT US
          </Link>
        </nav>

        <div className="navbar-actions">
          <button className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <Link to="/cart" className="nav-icon cart-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <span>Hi, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </div>
          )}

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
