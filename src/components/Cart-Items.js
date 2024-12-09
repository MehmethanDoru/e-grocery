"use client";

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

const CartItems = ({ items, updateQuantity, removeFromCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleRemoveClick = (id) => {
    setItemToRemove(id);
    setShowModal(true);
  };

  const confirmRemove = () => {
    removeFromCart(itemToRemove);
    setShowModal(false);
    
    window.dispatchEvent(new Event('itemRemoved'));
    toast.success('Product removed from cart successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md">
          <div className="relative w-24 h-24 mr-4">
            <Image
              src={`/images/products/${item.image}.webp`}
              alt={item.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-[#064c4f]">{item.name}</h3>
            <p className="text-[#00000088]">${item.price.toFixed(2)}</p>
            <div className="flex items-center mt-2 space-x-3">
              <span className="text-[#00000088]">QTY:</span>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#064c4f] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                  </svg>
                </button>
                <span className="w-7 text-center text-[#064c4f] font-medium">
                  {item.quantity}
                </span>
                <button 
                  onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#064c4f] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="font-bold text-lg text-[#064c4f]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => handleRemoveClick(item.id)}
              className="bg-[#f5374a] hover:bg-[#f5374a] mt-2 text-sm px-2 py-1 border border-[#f5374a] rounded-md flex items-center gap-1 h-7"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              
            </button>
          </div>
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-[#000000]">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>Are you sure you want to delete the product?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={confirmRemove} className="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
