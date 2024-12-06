"use client";

import Image from 'next/image';
import AddCartButton from "@/components/Add-Cart-Button";
import Link from 'next/link';

const ProductCard = ({ product, slug }) => {
  const handleProductClick = () => {
    // Son görüntülenen ürünleri localStorage'dan al
    const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
    
    // Eğer ürün zaten listede varsa, onu çıkar
    const filteredProducts = viewedProducts.filter(p => p.id !== product.id);
    
    // Yeni ürünü listenin sonuna ekle
    const updatedProducts = [...filteredProducts, product];
    
    // Eğer liste 5'ten uzunsa, en baştaki (en eski) ürünü çıkar
    if (updatedProducts.length > 5) {
      updatedProducts.shift(); // İlk elemanı (en eski ürünü) kaldır
    }
    
    // Güncellenmiş listeyi localStorage'a kaydet
    localStorage.setItem('viewedProducts', JSON.stringify(updatedProducts));
  };

  return (
    <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-700">
      <Link href={`/products/${product.id}`} onClick={handleProductClick}>
        <div className="relative h-24 md:h-32 w-full mb-2 md:mb-3">
          {product.discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm z-10">
              -{product.discount}%
            </span>
          )}
          <Image
            src={`/images/products/${product.image}.webp`}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      </Link>
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