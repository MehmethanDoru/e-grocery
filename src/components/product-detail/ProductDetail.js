import Image from "next/image";
import ProductRating from "./ProductRating";
import { toast } from "react-toastify";
import AddCartButton from "@/components/Add-Cart-Button";
import { motion } from "framer-motion";
import { useState } from "react";

const ProductDetailComponent = ({
  product,
  quantity,
  category,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const [productRating, setProductRating] = useState(product.rating);
  const [productReviews, setProductReviews] = useState(product.reviews);

  const handleRatingUpdate = (newRating, newReviews) => {
    setProductRating(newRating);
    setProductReviews(newReviews);
  };

  return (
    <div className="w-[100%] mx-auto py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-transparent p-8 rounded-3xl"
      >
        {/* Left Side - Product Image */}
        <div className="md:col-span-6 flex flex-col gap-6">
          <motion.div
            className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden
                bg-gradient-to-br from-white to-[#f5f5f5]
              shadow-md hover:shadow-xl
              transition-all duration-500
              group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {product && (
              <Image
                src={`/images/products/${product.image}.webp`}
                alt={product.name}
                fill
                className="object-contain p-8
                  group-hover:scale-105
                  transition-transform duration-500"
              />
            )}
            {product.discount > 0 && (
              <motion.div
                initial={{ rotate: -15, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="absolute top-6 right-6 bg-red-500 text-white px-6 py-3 rounded-full transform rotate-12 shadow-lg"
              >
                <span className="text-xl font-bold">%{product.discount}</span>
                <span className="block text-sm">SALE</span>
              </motion.div>
            )}
          </motion.div>

          <div className="hidden md:grid grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <span className="block text-base text-gray-600 mb-1">Weight</span>
              <span className="font-semibold text-lg text-[#064c4f]">
                {product.weight}
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <span className="block text-base text-gray-600 mb-1">Stock</span>
              <span className="font-semibold text-lg text-[#064c4f]">
                Available
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-sm text-center"
            >
              <span className="block text-base text-gray-600 mb-1">
                Category
              </span>
              <span className="font-semibold text-lg text-[#064c4f]">
                {category || "General"}
              </span>
            </motion.div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            <h1 className="text-3xl font-bold text-[#064c4f] tracking-tight">
              {product.name}
            </h1>
            {product.discount > 0 ? (
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-[#064c4f] mt-[-20px]">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-lg line-through text-gray-400 mt-[-18px]">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-[#064c4f]">
                ${product.price}
              </span>
            )}
            <div className="bg-white p-2 rounded-xl shadow-sm">
              <p className="text-gray-700 mt-[-10px] leading-relaxed text-lg">
                {product.description}
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <ProductRating
                productId={product.id}
                rating={productRating}
                reviews={productReviews}
                onRatingUpdate={handleRatingUpdate}
              />
              <span className="text-base text-gray-600"></span>
            </div>
            <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm ">
              <div className="flex items-center gap-4">
                <span className="text-lg text-gray-700 font-medium">Qty:</span>
                <div className="flex items-center bg-gray-50 rounded-lg overflow-hidden border border-[#064c4f]">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={decreaseQuantity}
                    className="px-5 py-1.5 hover:bg-gray-100 transition-colors text-lg border-r border-[#064c4f] text-[#064c4f]"
                  >
                    -
                  </motion.button>
                  <span className="px-8 py-1.5 font-medium text-lg text-[#064c4f]">
                    {quantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={increaseQuantity}
                    className="px-5 py-1.5 hover:bg-gray-100 transition-colors text-lg border-l border-[#064c4f] text-[#064c4f]"
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </div>

            <AddCartButton
              product={product}
              quantity={quantity}
              customClassName="w-full py-3 text-lg bg-[#064c4f] text-white rounded-xl shadow-md hover:bg-[#053a3c] transition-colors duration-300"
            />
          </div>
        </div>

        {/* Right Side - Product Details */}
        <motion.div
          className="md:col-span-6 space-y-6 md:pl-8 md:border-l border-gray-200"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6 hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-[#064c4f] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm">
                <ProductRating
                  productId={product.id}
                  rating={productRating}
                  reviews={productReviews}
                  onRatingUpdate={handleRatingUpdate}
                />
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-sm space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {product.discount > 0 ? (
                <div className="space-y-1 mt-[-10px] hidden md:block">
                  <div className="text-lg text-gray-600">Discounted Price</div>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-[#064c4f]">
                      $
                      {(product.price * (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                    <span className="text-2xl line-through text-gray-400">
                      ${product.price}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 hidden md:block">
                  <div className="text-lg text-gray-600">Price</div>
                  <span className="text-4xl font-bold text-[#064c4f]">
                    ${product.price}
                  </span>
                </div>
              )}
            </motion.div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#064c4f] mb-2 hidden md:block">
                Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Desktop Add to Cart Section */}
            <div className="hidden md:block space-y-6 pt-4">
              <div className="flex items-center gap-6 bg-white p-4 rounded-xl shadow-sm mt-[-14px]">
                <span className="text-lg text-gray-700 font-medium">Qty:</span>
                <div className="flex items-center bg-[#eae8e8] border border-[#064c4f] rounded-lg overflow-hidden">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={decreaseQuantity}
                    className="px-6 py-2 hover:bg-gray-100 transition-colors text-lg border-r border-[#064c4f] text-[#064c4f]"
                  >
                    -
                  </motion.button>
                  <span className="px-8 py-2 font-medium text-lg text-[#064c4f]">
                    {quantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={increaseQuantity}
                    className="px-6 py-2 hover:bg-gray-100 transition-colors text-lg border-l border-[#064c4f] text-[#064c4f]"
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full md:w-2/3 mx-auto"
              >
                <AddCartButton
                  product={product}
                  quantity={quantity}
                  customClassName="w-full py-4 text-lg bg-[#064c4f] text-white rounded-xl shadow-md hover:bg-[#053a3c] transition-colors duration-300"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductDetailComponent;
