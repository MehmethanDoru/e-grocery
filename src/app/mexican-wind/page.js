"use client";

import { useState } from "react";
import ProductCard from "@/components/Product-Card";

const MexicanWind = () => {
  const [products] = useState([
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
    // Diğer ürünleri buraya ekleyin
  ]);

  return (
    <div className="w-[94%] mx-auto py-8 mb-40">
        <h1 className="text-3xl font-bold text-[#feffff] md:text-[#064c4f] mb-6">Mexican Wind <span className="text-[2.5rem]">🌮</span></h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MexicanWind;