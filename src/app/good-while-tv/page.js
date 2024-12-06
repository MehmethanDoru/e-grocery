"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/Product-Card";
import { productService } from "@/api/supabase/services/productService";

const GoodWhileTV = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.fetchGoodWhileTVProducts();
      setProducts(data);
    };  

    fetchProducts();
  }, []);

  return (
    <div className="w-[94%] mx-auto py-8 mb-40">
        <h1 className="text-3xl font-bold text-[#feffff] md:text-[#064c4f] mb-6">Good While TV <span className="text-[2.5rem]">📺</span></h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default GoodWhileTV;