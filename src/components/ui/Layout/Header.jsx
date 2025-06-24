"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Search, User } from "lucide-react"
import { Button } from "../Button"
import { useAuth } from "../../../contexts/AuthContext"
import LoginDialog from "../Layout/LoginDialog"

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const { user, logout } = useAuth()

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "BEVERAGES", href: "/beverages" },
    { name: "NEW ARRIVALS", href: "/new-arrivals" },
    { name: "DEALS", href: "/deals" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT", href: "/contact" },
    ...(user?.role === "admin" ? [{ name: "ADMIN", href: "/admin" }] : []),
  ]

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DRINK NOW</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700 hidden sm:block">
                    {user.name} ({user.role})
                  </span>
                  <Button variant="ghost" size="icon" onClick={logout}>
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsLoginOpen(true)}>
                  <User className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginDialog open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  )
}

export default Header