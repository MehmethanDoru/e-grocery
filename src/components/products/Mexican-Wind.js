"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/Product-Card";
import Link from "next/link";
import { productService } from "@/api/supabase/services/productService";
import SkeletonCard from "@/components/common/Skeleton-Card";
const SpecialProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.fetchGoodWhileTVProducts();
      setProducts(data.sort(() => Math.random() - 0.5).slice(0, 5));
    };

    fetchProducts();
  }, []);

  const skeletonCount = Math.max(0, 5 - products.length);

  return (
    <div className="w-[94%] mx-auto mt-8 mb-16 ">
      <div className="flex items-center justify-between mb-4">
        <Link href="/good-while-tv" className="hover:opacity-80">
          <h2 className="text-2xl font-bold text-[#064c4f]">
            Good While TV <span className="text-3xl">📺</span>
          </h2>
        </Link>
        <Link
          href="/good-while-tv"
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
        {[...Array(skeletonCount)].map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`}>
            <SkeletonCard message="" />
          </SwiperSlide>
        ))}

        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SpecialProducts;
