"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../lib/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await api.getMe()
        setUser(userData)
      } catch (error) {
        api.removeToken()
      } finally {
        setIsLoading(false)
      }
    }

    const token = localStorage.getItem("auth_token")
    if (token) {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password)
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const register = async (name, email, password, confirmPassword) => {
    try {
      const response = await api.register(name, email, password, confirmPassword)
      setUser(response.user)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.logout()
    } finally {
      setUser(null)
    }
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
