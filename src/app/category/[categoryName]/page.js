"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { categoryService } from "@/api/supabase/services/categoryService";
import { productService } from "@/api/supabase/services/productService";
import ProductCard from "@/components/Product-Card";
import ResponsiveCategories from "@/app/responsive-components/responsiveCategories";

const CategoryPage = () => {
  const { categoryName: slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const category = await categoryService.getCategoryBySlug(slug);
        const productsData = await productService.fetchProductsByCategory(
          category.id
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, [slug]);

  return (
    <div className="w-[94%] mx-auto md:mt-[-3%]">
      <ResponsiveCategories />
      <h1 className="text-3xl font-bold text-[#064c4f] mb-8 capitalize">
        {slug.replace("-", " ")}
      </h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-80 text-[#064c4f]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} slug={slug} />
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
