"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/Product-Card";
import Pagination from "@/components/common/Pagination";
import { productService } from "@/api/supabase/services/productService";
import ResponsiveCategories from "@/components/responsive-components/responsiveCategories";

const MightNeed = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10); // Default değer

  useEffect(() => {
    // Ekran genişliğine göre ürün sayısını ayarla
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setProductsPerPage(6);
      } else if (width < 768) {
        setProductsPerPage(8);
      } else {
        setProductsPerPage(10);
      }
    };

    // İlk yüklenmede çalıştır
    handleResize();

    // Ekran boyutu değiştiğinde güncelle
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.fetchMightNeedProducts(); 
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
    <div className="w-[94%] mx-auto py-8 mb-8 mt-[-6%]">
      <ResponsiveCategories />
      <h1 className="text-3xl font-bold text-[#064c4f] md:text-[#064c4f] mb-8">
        You Might Need <span className="text-[2rem]">🛒</span>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Add Pagination component */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MightNeed;