import Header from "../components/ui/Layout/Header"
import HeroSection from "../components/ui/Layout/HeroSection"
import Categories from "../components/ui/Layout/Categories"
import FeaturedProducts from "../components/ui/Layout/FeaturedProducts"
import Footer from "../components/ui/Layout/Footer"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <Categories />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage