"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from "@/components/Product-Card";
import Link from "next/link";
import { productService } from "@/api/supabase/services/productService";

const ProductsHome = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.fetchMightNeedProducts();
      setProducts(data.sort(() => Math.random() - 0.5).slice(0, 5));
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-[94%] mx-auto mt-8 mb-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#064c4f]">You might need <span className="text-[1.5rem]">🛒</span></h2>
        <Link href="/might-need">
          <button className="text-[#064c4f] font-semibold"></button>
        </Link>
        <Link 
          href="/might-need" 
          className="text-[#064c4f] font-semibold hover:opacity-80"
        >
          See more →
        </Link>
      </div>

      <Swiper
        modules={[]}
        spaceBetween={24}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 16
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 16
          }
        }}
        className="product-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
           <ProductCard key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsHome;
