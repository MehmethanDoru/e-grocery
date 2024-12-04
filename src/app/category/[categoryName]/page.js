"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import AddCartButton from "@/components/Add-Cart-Button";
import ResponsiveCategories from "@/app/responsive-components/responsiveCategories";
import ProductCard from "@/components/Product-Card";

const CategoryPage = () => {
  const params = useParams();
  const { categoryName } = params;
  const [products, setProducts] = useState([]);

  // This is a mock product data - in a real app, you'd fetch this from an API
  useEffect(() => {
    // Simulate fetching products for the category
    const mockProducts = [
      {
        id: 1,
        name: "Strawberry",
        image: "/images/products/strawberry.webp",
        weight: "200 gm",
        price: "17.29",
        discount: 10,
        category: "fruits"
      },
      // Add more mock products
    ];

    // Filter products based on category
    const filteredProducts = mockProducts.filter(
      product => product.category === categoryName
    );
    setProducts(filteredProducts);
  }, [categoryName]);

  return (
    <div className="w-[94%] mx-auto md:mt-[-3%]">
        <ResponsiveCategories />    
      <h1 className="text-3xl font-bold text-[#064c4f] mb-8 capitalize">
        {categoryName.replace('-', ' ')}
      </h1>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-80">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center mt-[-3%]">
          <div className="animate-bounce mb-3">
            <svg 
              className="w-24 h-24 text-[#064c4f]"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#064c4f] mb-2 animate-pulse">
            We're Sorry!
          </h2>
          <p className="text-gray-600 text-lg animate-fade-in">
            There are currently no products available in this category.
          </p>
          <p className="text-[#064c4f] mt-4 font-medium animate-fade-in">
            Please check back again soon.
          </p>

        </div>
      )}
    </div>
  );
};

export default CategoryPage;