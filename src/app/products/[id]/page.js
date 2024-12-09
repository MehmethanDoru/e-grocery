"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductDetailComponent from "@/components/product-detail/ProductDetail";
import { productService } from "@/api/supabase/services/productService";
import { categoryService } from "@/api/supabase/services/categoryService";
import Loader from "@/components/common/Loader";

const ProductDetail = () => {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const productData = await productService.fetchProductById(id);
      if (productData && productData[0]) {
        setProduct(productData[0]);
        const categoryData = await categoryService.getCategoryById(
          productData[0].categoryId
        );
        if (categoryData && categoryData[0]) {
          setCategory(categoryData[0]);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  
  if (isLoading || !product || !category) {
    return <Loader />;
  }

  return (
    <ProductDetailComponent
      product={product}
      quantity={quantity}
      category={category}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
    />
  );
};

export default ProductDetail;
