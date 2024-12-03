"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AddCartButton from "@/components/Add-Cart-Button";

const ProductsHome = () => {
  const products = [
    {
      id: 1,
      name: "Strawberry",
      image: "/images/products/strawberry.webp",
      weight: "200 gm",
      price: "17.29",
    },
    {
      id: 2,
      name: "Sunflower Oil",
      image: "/images/products/oil.webp",
      weight: "1L",
      price: "12.29",
    },
    {
      id: 3,
      name: "Fresh Tomatoes",
      image: "/images/products/Tomato.webp",
      weight: "500 gm",
      price: "15.99",
    },
    {
      id: 4,
      name: "CocaCola",
      image: "/images/products/coke.webp",
      weight: "2.5L",
      price: "22.99",
    },
    {
      id: 5,
      name: "Eti Karam",
      image: "/images/products/karam.webp",
      weight: "1 adt",
      price: "3.99",
    }
  ];

  return (
    <div className="w-[94%] mx-auto mt-8 mb-16 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#064c4f]">You might need</h2>
        <button className="text-[#064c4f] font-semibold">See more →</button>
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
            <div className="bg-white p-4 rounded-lg shadow-sm md:hover:shadow-2xl hover:shadow-lg hover:shadow-black transition-shadow duration-700 hover:cursor-pointer ">
              <div className="relative h-32 w-full mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-md text-[#064c4f]">{product.name}</div>
              <div className="text-sm text-[#c1c2c2]">{product.weight}</div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-[#064c4f] text-2xl">{product.price}$</span>
                <div className="flex items-center gap-1 ml-1">
                  <AddCartButton /> 
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsHome;
