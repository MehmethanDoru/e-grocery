import Image from 'next/image';
import ProductRating from './ProductRating';
import { toast } from 'react-toastify';
import AddCartButton from '@/components/Add-Cart-Button';

const ProductDetailComponent = ({ product, quantity, category, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="w-[94%] mx-auto py-8 mb-0 md:mb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product Image */}
        <div className="relative h-[400px] overflow-hidden 
          md:h-[400px] md:border md:border-[#064d4f]/20 md:rounded-xl
          md:bg-gradient-to-br md:from-white md:to-[#eae8e8]
          md:shadow-[0_0_15px_rgba(6,77,79,0.1)]
          md:hover:shadow-[0_0_25px_rgba(6,77,79,0.2)]
          md:transition-all md:duration-300
          md:backdrop-blur-sm
          md:w-5/6 mt-[-4%] md:mt-0 ml-[2%] md:mx-auto
          group">
          {category && product && (
            <Image
              src={`/images/products/${product.image}.webp`}
              alt={product.name}
              fill
              className="object-contain p-0
                md:group-hover:scale-110
                md:transition-transform md:duration-300"
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

          <AddCartButton 
            product={product}
            quantity={quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;  