import Image from 'next/image';
import ProductRating from './ProductRating';

const ProductDetailComponent = ({ product, quantity, category, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="w-[94%] mx-auto py-8 mb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product Image */}
        <div className="relative h-[400px] overflow-hidden md:border-2 md:border-[#064d4f] border-solid md:shadow-lg p-4 md:bg-[#fffefec2] md:w-5/6 mt-[-4%] md:mt-0 ml-[2%] md:ml-auto md:mr-auto">
          {category && product && (
            <Image
              src={`/images/products/${product.image}.webp`}
              alt={product.name}
              fill
              className="object-contain p-0"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#064c4f] mt-[-4%] md:mt-0">{product.name}</h1>
          
          <ProductRating rating={product.rating} reviews={product.reviews} />

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

          <div className="text-gray-600">
            Weight: {product.weight}
          </div>

          <p className="text-gray-700 leading-relaxed">
            {product.description}
          </p>

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

          <button className="w-full md:w-auto px-6 py-3 bg-[#064c4f] text-white rounded-lg hover:bg-[#053c3e] transition-colors">
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;  