"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from "@/components/Product-Card";
import Link from "next/link";

const ProductsHome = () => {
  const products = [
    {
      id: 1,
      name: "Strawberry",
      image: "/images/products/strawberry.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 10,
    },
    {
      id: 2,
      name: "Sunflower Oil",
      image: "/images/products/oil.webp",
      weight: "1L",
      price: "12.29",
      discount: 0,
    },
    {
      id: 3,
      name: "Fresh Tomatoes",
      image: "/images/products/Tomato.webp",
      weight: "500 gm",
      price: "15.99",
      discount: 5,
    },
    {
      id: 4,
      name: "CocaCola",
      image: "/images/products/coke.webp",
      weight: "2.5L",
      price: "22.99",
      discount: 10,
    },
    {
      id: 5,
      name: "Eti Karam",
      image: "/images/products/karam.webp",
      weight: "1 adt",
      price: "3.99",
      discount: 0,
    }
  ];

  return (
    <div className="w-[94%] mx-auto mt-8 mb-16">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#064c4f]">You might need</h2>
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
