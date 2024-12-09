"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/Product-Card";
import Pagination from "@/components/common/Pagination";
import { productService } from "@/api/supabase/services/productService";

const GoodWhileTV = () => {
  const [products, setProducts] = useState([]);
  // Add new state variables
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = window.innerWidth < 640 ? 6 : window.innerWidth < 768 ? 8 : 10; // Responsive products per page

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.fetchGoodWhileTVProducts();
      setProducts(data);
    };  

    fetchProducts();
  }, []);

  // Add pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-[94%] mx-auto py-8 mb-8">
      <h1 className="text-3xl font-bold text-[#feffff] md:text-[#064c4f] mb-8">Good While TV <span className="text-[2.5rem]">📺</span></h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Add Pagination component */}
      {products.length > productsPerPage && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GoodWhileTV;