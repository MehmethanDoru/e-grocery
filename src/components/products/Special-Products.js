"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/Product-Card";

const SpecialProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Tortilla",
      image: "/images/products/tortilla.png",
      weight: "200 gm",
      price: "17.29",
      discount: 0,
    },
    {
      id: 2,
      name: "Mexican Beans",
      image: "/images/products/mexicanBeans.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 3,
    },
    {
      id: 3,
      name: "Hot Chili Sauce",
      image: "/images/products/hotChiliSauce.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 10,
    },
    {
      id: 4,
      name: "Avocado",
      image: "/images/products/avocado.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 7,
    },
    {
      id: 5,
      name: "Tortilla Pockets",
      image: "/images/products/tortillaPockets.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 0,
    },
  ]);
  return (
    <div className="w-[94%] mx-auto mt-8 mb-16 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#064c4f]">Mexican Wind <span className="text-3xl">🌮</span></h2>
        <button className="text-[#064c4f] font-semibold">See more →</button>
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
