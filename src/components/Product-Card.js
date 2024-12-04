"use client";

import Image from 'next/image';
import AddCartButton from "@/components/Add-Cart-Button";

const ProductCard = ({ product }) => {
  return (
    <div 
      className="bg-white p-2 md:p-4 rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-700"
    >
      <div className="relative h-24 md:h-32 w-full mb-2 md:mb-3">
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
      <div className="text-sm md:text-md text-[#064c4f]">{product.name}</div>
      <div className="text-xs md:text-sm text-[#c1c2c2]">{product.weight}</div>
      <div className="flex flex-col md:flex-row items-end md:justify-between mt-2">
        <div className="w-full md:w-auto mb-2 md:mb-0">
          {product.discount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#064c4f] text-2xl">
                ${(parseFloat(product.price) * (1 - product.discount / 100)).toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="font-semibold text-[#064c4f] text-2xl">
              ${product.price}
            </span>
          )}
        </div>
        <AddCartButton />
      </div>
    </div>
  );
};

export default ProductCard;