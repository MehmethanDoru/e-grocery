"use client";

import { useState, useEffect } from 'react';
import CartItems from '@/components/Cart-Items';
import Loader from '@/components/Loader';

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

  return (
    <div className="w-[95%] mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold md:text-[#064c4f] text-[#fff] mb-8">Shopping Cart</h1>
      
      {isLoading ? (
        <Loader />  
      ) : cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <CartItems 
            items={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
          
          <div className="bg-white p-6 rounded-lg shadow-md md:w-[14.33%] md:ml-auto ">
            <div className="flex justify-between items-center text-xl">
              <span className="font-semibold text-[#064c4f] ">Total:</span>
              <span className="font-bold text-[#064c4f]">${total.toFixed(2)}</span>
            </div>
            <a href={`/checkout`}>
              <button className="w-full mt-4 bg-[#064c4f] text-white py-3 rounded-lg hover:bg-[#053c3e] transition-colors">
                To Checkout
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
