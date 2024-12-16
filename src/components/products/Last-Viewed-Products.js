"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/Product-Card";
import SkeletonCard from "@/components/common/Skeleton-Card";

const LastViewedProducts = () => {
  const [products, setProducts] = useState([]);

  const updateViewedProducts = () => {
    const savedProducts = localStorage.getItem('viewedProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  };

  useEffect(() => {
    // İlk yüklemede ürünleri getir
    updateViewedProducts();

    // Modal kapandığında ürünleri güncelle
    const handleModalClose = () => {
      updateViewedProducts();
    };

    window.addEventListener('modalClosed', handleModalClose);

    return () => {
      window.removeEventListener('modalClosed', handleModalClose);
    };
  }, []);

  const skeletonCount = Math.max(0, 5 - products.length);
  
  return (
    <div className="w-[94%] mx-auto mt-8 mb-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#064c4f]">Recently Viewed</h2>
      </div>

      <Swiper
        modules={[]}
        spaceBetween={24}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 16 },
        }}
        className="product-swiper"
      >
        {[...Array(skeletonCount)].map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`}>
            <SkeletonCard message="Not viewed yet" />
          </SwiperSlide>
        ))}
        
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
