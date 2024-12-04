"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import AddCartButton from "@/components/Add-Cart-Button";
const LastViewedProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Milk",
      image: "/images/products/milk.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 0,
    },
    {
      id: 2,
      name: "Bread",
      image: "/images/products/bread.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 0,
    },
    {
      id: 3,
      name: "Strawberry",
      image: "/images/products/strawberry.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 10,
    },
    {
      id: 4,
      name: "Potato",
      image: "/images/products/potato.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 7,
    },
    {
      id: 5,
      name: "Banana",
      image: "/images/products/banana.webp",
      weight: "200 gm",
      price: "17.29",
      discount: 0,
    },
  ]);
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
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white p-4 rounded-lg shadow-sm md:hover:shadow-2xl hover:shadow-lg hover:shadow-black transition-shadow duration-700 hover:cursor-pointer ">
              <div className="relative h-32 w-full mb-3">
                {product.discount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm z-10">
                    -{product.discount}%
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-md text-[#064c4f]">{product.name}</div>
              <div className="text-sm text-[#c1c2c2]">{product.weight}</div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
                {product.discount > 0 ? (
                  <div className="flex items-center gap-2 mb-2 md:mb-0">
                    <span className="font-semibold text-[#064c4f] text-2xl">
                      $
                      {(
                        parseFloat(product.price) *
                        (1 - product.discount / 100)
                      ).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price}
                    </span>
                  </div>
                ) : (
                  <span className="font-semibold text-[#064c4f] text-2xl mb-2 md:mb-0">
                    ${product.price}
                  </span>
                )}
                <div className="flex items-center gap-1">
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

export default LastViewedProducts;
