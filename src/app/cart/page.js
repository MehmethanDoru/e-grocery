"use client";

import { useState, useEffect } from 'react';
import CartItems from '@/components/Cart-Items';
import Loader from '@/components/common/Loader';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart items from localStorage
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
    calculateTotal(items);
    setIsLoading(false);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedItems = cartItems.map(item => 
      item.id === productId ? {...item, quantity: newQuantity} : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotal(updatedItems);
  };

  const calculateShipping = (subtotal) => {
    return subtotal >= 200 ? 0 : 8;
  };

  return (
    <div className="w-[95%] mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold md:text-[#064c4f] text-[#fff] mb-8">Shopping Cart</h1>
      
      {isLoading ? (
        <Loader />  
      ) : cartItems.length === 0 ? (
        <div className="text-center py-28">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#064c4f" className="w-16 h-16 mx-auto mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <p className="text-xl font-semibold text-[#064c4f] mb-2">Your cart is empty</p>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
          <a href="/category/discounts" className="inline-block bg-[#064c4f] text-white px-6 py-2 rounded-lg hover:bg-[#053c3e] transition-colors">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <CartItems 
              items={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          </div>
          
          <div className="md:col-span-4 mt-5 md:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
              <h2 className="text-xl font-semibold text-[#064c4f] mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Shipping</span>
                  <div className="text-right">
                    {total >= 150 ? (
                      <div>
                        <span className="line-through text-sm text-gray-400 mr-2">$8.00</span>
                        <span className="text-green-600">FREE</span>
                        <p className="text-xs text-green-600">150$ over free shipping!</p>
                      </div>
                    ) : (
                      <div>
                        <span>$8.00</span>
                        <p className="text-xs text-gray-500">
                          {`$${(150 - total).toFixed(2)} more to get free shipping!`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(total * 0.10).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-semibold text-[#064c4f]">
                    <span>Total</span>
                    {total >= 150 ? (
                      <span>
                        ${(total + (total * 0.10)).toFixed(2)}
                      </span>
                    ) : (
                      <span>
                        ${(total + calculateShipping(total) + (total * 0.10)).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <a href="/checkout">
                <button className="w-full mt-6 bg-[#064c4f] text-white py-3 rounded-lg hover:bg-[#053c3e] transition-colors">
                  Proceed to Checkout
                </button>
              </a>
              <div className="text-center mt-4">
                <a href="/category/discounts" className="text-[#064c4f] hover:underline">
                  or continue shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
