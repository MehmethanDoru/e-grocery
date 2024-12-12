"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/Product-Card";
import { productService } from "@/api/supabase/services/productService";

const SearchContent = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  useEffect(() => {
    const searchProducts = async () => {
      setIsLoading(true);
      if (searchQuery) {
        const data = await productService.searchProducts(searchQuery);
        setProducts(data);
      }
      setIsLoading(false);
    };

    searchProducts();
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="w-[94%] mx-auto py-8 min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#064d4f63] rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="bg-[#064d4f63] rounded-lg h-36"></div>
                <div className="h-4 bg-[#064d4f63] rounded w-3/4"></div>
                <div className="h-4 bg-[#064d4f63] rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[94%] mx-auto py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-[#feffff] md:text-[#064c4f] mb-8">
        Search Results for "{searchQuery}" 🔍
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-[#064c4f] mb-4">
            No products found 😔
          </h2>
          <p className="text-gray-600">
            Try searching with different keywords.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchContent;
