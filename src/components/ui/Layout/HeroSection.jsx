"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "../Button"

const heroSlides = [
  {
    id: 1,
    title: "Premium Beverages Collection",
    subtitle: "Discover the finest drinks from around the world",
    cta: "Shop Drinks",
  },
  {
    id: 2,
    title: "Fresh Juices & Smoothies",
    subtitle: "Healthy and delicious natural beverages",
    cta: "Explore Juices",
  },
  {
    id: 3,
    title: "Craft Sodas & Energy Drinks",
    subtitle: "Boost your energy with our premium selection",
    cta: "View Collection",
  },
]

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-[600px] bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          <div className="flex-1 text-white z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{heroSlides[currentSlide].title}</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">{heroSlides[currentSlide].subtitle}</p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {heroSlides[currentSlide].cta}
            </Button>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=400&text=Person+with+drinks"
                alt="Person with drinks"
                className="object-cover rounded-lg"
              />
              <div className="absolute -bottom-4 -right-4 flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-16 bg-gradient-to-b from-green-400 to-green-600 rounded-lg shadow-lg"
                    style={{ transform: `rotate(${i * 5}deg)` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection