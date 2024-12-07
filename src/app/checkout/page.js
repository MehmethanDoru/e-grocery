"use client";

import { useState } from 'react';
import PaymentForm from '@/components/Payment-Form';
import CreditCardPreview from '@/components/Credit-Card-Preview';

export default function Checkout() {
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    if (formattedValue.length <= 19) {
      setCardDetails(prev => ({
        ...prev,
        number: formattedValue
      }));
    }
  };

  const handleExpiryChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^0-9/]/g, '').replace(/(\d{2})(\d{1,2})/, '$1/$2');
    if (formattedValue.length <= 5) {
      setCardDetails(prev => ({
        ...prev,
        expiry: formattedValue
      }));
    }
  };

  const handleCVVFocus = () => setIsFlipped(true);
  const handleCVVBlur = () => setIsFlipped(false);

  return (
    <div className="w-[95%] mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold md:text-[#064c4f] text-[#fff] mb-8">Last Step <span className="text-3xl">🚀</span></h1>           
    <div className="min-h-screen py-12 mb-[-5%] mt-[-10%] md:mt-[-3%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row-reverse gap-8 items-center justify-center">
          
          {/* Credit Card Preview */}
          <CreditCardPreview 
            cardDetails={cardDetails}
            isFlipped={isFlipped}
          />

          {/* Payment Form */}
          <PaymentForm 
            cardDetails={cardDetails}
            handleInputChange={handleInputChange}
            handleCardNumberChange={handleCardNumberChange}
            handleExpiryChange={handleExpiryChange}
            handleCVVFocus={handleCVVFocus}
            handleCVVBlur={handleCVVBlur}
          />
          
        </div>
        </div>
      </div>
    </div>
  );
}
