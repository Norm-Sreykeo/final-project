import React from 'react'
import ProductCard from '../components/ProductCard'
import drinks from '../data/product'
// import Footer from '../components/Footer'
const HomePage = () => {
    const [currentPage, setCurrentPage] = useState (1);
    const itemsPerPage = 6;
    const paginated = drinks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(drinks.length / itemsPerPage);

  return (
      <div className="container">
          <div className="product-grid">
              {paginated.map((product) => (
                  <ProductCard key={product.id} {...product} />
              ))}
          </div>
          <Footer />
      </div>
  )
}

export default HomePage