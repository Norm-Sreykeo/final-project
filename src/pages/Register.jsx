"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    const result = await register(formData.name, formData.email, formData.password, formData.password_confirmation)

    if (result.success) {
      navigate("/")
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h2>Register for Drink Shop</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_confirmation">Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
