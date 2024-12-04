"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const ProductDetail = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Mock product data - in real app would fetch from API
    const mockProduct = {
      id: parseInt(id),
      name: "Strawberry",
      image: "/images/products/strawberry.webp", 
      weight: "1 kg",
      price: "29.12",
      discount: 8,
      description: "Organic whole wheat flour perfect for baking bread, muffins and other baked goods.",
      rating: 4.2,
      reviews: 17
    };

    setProduct(mockProduct);
  }, [id]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#064c4f]"></div>
      </div>
    );
  }

  return (
    <div className="w-[94%] mx-auto py-8 mb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product Image */}
        <div className="relative h-[400px] overflow-hidden md:border-2 md:border-[#064d4f] border-solid md:shadow-lg p-4 md:bg-[#fffefec2] md:w-5/6 mt-[-4%] md:mt-0 ml-[2%] md:ml-auto md:mr-auto">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-0"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#064c4f] mt-[-4%] md:mt-0">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
          </div>

          <div className="text-2xl font-bold text-[#064c4f]">
            {product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-red-500">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                <span className="text-sm line-through text-gray-500">${product.price}</span>
                <span className="text-sm text-red-500">{product.discount}% OFF</span>
              </div>
            ) : (
              <span>${product.price}</span>
            )}
          </div>

          {/* Product Weight */}
          <div className="text-gray-600">
            Weight: {product.weight}
          </div>

          {/* Product Description */}
          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Add Quantity Selector */}
          <div className="flex items-center space-x-4 mt-4 text-[#064c4f]">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-1 border-r border-gray-300 hover:bg-[#e0dfdf]"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="px-3 py-1 border-l border-gray-300 hover:bg-[#e0dfdf]"
              >
                +
              </button>
            </div>
          </div>

          {/* Update Add to Cart Button */}
          <button className="w-full md:w-auto px-6 py-3 bg-[#064c4f] text-white rounded-lg hover:bg-[#053c3e] transition-colors">
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
