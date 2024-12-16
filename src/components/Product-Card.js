"use client";

import Image from 'next/image';
import AddCartButton from "@/components/Add-Cart-Button";
import { useState, useEffect } from 'react';
import ProductDetailComponent from './product-detail/ProductDetail';
import Modal from './Modal';
import { categoryService } from '@/api/supabase/services/categoryService';



const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryName = async () => {
      setIsLoading(true);
      try {
        const categoryData = await categoryService.getCategoryById(product.categoryId);
        if (categoryData?.[0]?.category_name) {
          setCategory(categoryData[0].category_name);
        } else {
          setCategory("Uncategorized");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        setCategory("Uncategorized");
      } finally {
        setIsLoading(false);
      }
    };

    if (product.categoryId) {
      fetchCategoryName();
    } else {
      setCategory("Uncategorized");
    }
  }, [product.categoryId]);

  const handleProductClick = (e) => {
    e.preventDefault();
    setShowModal(true);

    const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts') || '[]');
    const filteredProducts = viewedProducts.filter(p => p.id !== product.id);
    const updatedProducts = [...filteredProducts, product];
    
    if (updatedProducts.length > 5) {
      updatedProducts.shift();
    }
    
    localStorage.setItem('viewedProducts', JSON.stringify(updatedProducts));
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <>
      <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm hover:shadow-2xl transition-shadow duration-700">
        <div>
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
              className="object-contain cursor-pointer"
              onClick={handleProductClick}
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
            <AddCartButton product={product} />
          </div>
        </div>
      </div>

      <Modal isOpen={showModal}>
        <div className="swiper-modal">
          <div className="bg-white rounded-2xl md:max-w-[70%] w-[95%] h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-[9999] bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#064c4f" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="max-w-[80%] mx-auto">
              <ProductDetailComponent
                product={product}
                quantity={quantity}
                category={category}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;