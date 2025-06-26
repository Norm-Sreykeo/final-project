"use client"

import { useState, useEffect } from "react"

const slides = [
  {
    id: 1,
    title: "Fresh Beverages",
    subtitle: "Quench Your Thirst",
    description: "Discover our premium collection of refreshing drinks",
    image: "/placeholder.svg?height=600&width=800",
    bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "Premium Coffee",
    subtitle: "Awaken Your Senses",
    description: "Experience the finest coffee blends from around the world",
    image: "/placeholder.svg?height=600&width=800",
    bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "Natural Juices",
    subtitle: "Pure & Healthy",
    description: "100% natural fruit juices packed with vitamins",
    image: "/placeholder.svg?height=600&width=800",
    bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="hero">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          style={{ background: slide.bgColor }}
        >
          <div className="hero-content">
            <div className="hero-text">
              <h2 className="hero-subtitle">{slide.subtitle}</h2>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-description">{slide.description}</p>
              <button className="hero-btn">Shop Now</button>
            </div>
            <div className="hero-image">
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} />
            </div>
          </div>
        </div>
      ))}

      <button className="hero-nav prev" onClick={prevSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>

      <button className="hero-nav next" onClick={nextSlide}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </button>

      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
