import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/ui/Layout/Hero"
import FeaturedProducts from "./components/ui/Layout/FeaturedProducts"
import Footer from "./components/ui/Layout/Footer"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./contexts/AuthContext"
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <FeaturedProducts />
                  </>
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
