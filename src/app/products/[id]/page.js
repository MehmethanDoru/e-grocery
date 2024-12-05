"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductDetailComponent from '@/components/product-detail/ProductDetail';
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
    <ProductDetailComponent 
      product={product}
      quantity={quantity}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  );
};

export default ProductDetail;
