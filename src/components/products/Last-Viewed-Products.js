"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/Product-Card";
const LastViewedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Local storage'dan son görüntülenen ürünleri al
    const lastViewed = JSON.parse(localStorage.getItem('lastViewedProducts') || '[]');
    setProducts(lastViewed);
  }, []); // Component mount olduğunda çalışır

  // Skeleton ürün sayısını hesapla (toplam 5 olacak şekilde)
  const skeletonCount = Math.max(0, 5 - products.length);
  
  return (
    <div className="w-[94%] mx-auto mt-8 mb-16 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#064c4f]">Recently Viewed</h2>
      </div>

      <Swiper
        modules={[]}
        spaceBetween={24}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
        className="product-swiper"
      >
        {/* Skeleton kartlar */}
        {[...Array(skeletonCount)].map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`}>
            <div className="animate-pulse relative">
              <div className="bg-[#064d4f63] rounded-lg h-36 mb-4 flex items-center justify-center">
                <span className="text-[#064c4f] text-sm font-medium">Not viewed yet</span>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-[#064d4f63] rounded w-3/4"></div>
                <div className="h-4 bg-[#064d4f63] rounded w-1/2"></div>
                <div className="h-4 bg-[#064d4f63] rounded w-1/4"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Sonra ürünler */}
        {products.slice().reverse().map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LastViewedProducts;
