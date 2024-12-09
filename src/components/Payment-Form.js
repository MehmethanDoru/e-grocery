import { useState } from 'react';
import Link from 'next/link';

export default function PaymentForm({ cardDetails, handleInputChange, handleCardNumberChange, handleExpiryChange, handleCVVFocus, handleCVVBlur }) {
    const [showAlert, setShowAlert] = useState(false);

    const handlePayment = (e, paymentMethod) => {
        e.preventDefault();
        
        if (paymentMethod === 'card') {
            if (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
                return;
            }
        }

        // Reset localStorage for order tracking
        localStorage.setItem('remainingTime', '15');
        localStorage.setItem('orderStatus', 'Preparing');
        localStorage.setItem('trackingHidden', 'false');
        localStorage.removeItem('cart');

        // Dispatch a custom event to notify navbar about the cart update
        const updateNavbarEvent = new CustomEvent('cartUpdated');
        window.dispatchEvent(updateNavbarEvent);

        setShowAlert(true);
    };

    return (
        <div className="relative">
            {showAlert && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4 text-center">
                        <div className="mb-4 text-green-500">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-[#064c4f]">Payment Successful!</h3>
                        <p className="text-gray-600 mb-6">You can track your order from the home page.</p>
                        <Link href="/" className="inline-flex items-center justify-center gap-2 bg-[#064c4f] text-white px-6 py-3 rounded-xl hover:bg-[#0a5c60] transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>
            )}
            
            <div className="w-full md:w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl text-black border border-white/20">
            <form className="flex flex-col gap-6 p-8">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-600 font-medium">Card holder full name</label>
                      <input 
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        className="h-12 px-4 rounded-xl bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200"
                        value={cardDetails.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-600 font-medium">Card Number</label>
                      <input 
                        type="text"
                        name="number"
                        placeholder="0000 0000 0000 0000"
                        className="h-12 px-4 rounded-xl bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 font-mono"
                        value={cardDetails.number}
                        onChange={handleCardNumberChange}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-gray-600 font-medium">Card Details</label>
                      <div className="grid grid-cols-3 gap-4">
                        <input 
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          className="col-span-2 h-12 px-4 rounded-xl bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 font-mono"
                          value={cardDetails.expiry}
                          onChange={handleExpiryChange}
                        />
                        <input 
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          className="h-12 px-4 rounded-xl bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-200 font-mono"
                          value={cardDetails.cvv}
                          onChange={handleInputChange}
                          onFocus={handleCVVFocus}
                          onBlur={handleCVVBlur}
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => handlePayment(e, 'card')}
                    className="h-14 rounded-xl bg-gradient-to-r from-[#064c4f] via-[#0a5c60] to-[#045d61] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    Complete Payment
                  </button>

                  <div className="flex items-center gap-3 my-2">
                    <hr className="flex-1 border-gray-200" />
                    <p className="text-sm text-gray-500 font-medium">or pay using</p>
                    <hr className="flex-1 border-gray-200" />
                  </div>

                  <div className="grid grid-cols-3 gap-5 p-2.5">
                    <button type="button" onClick={(e) => handlePayment(e, 'paypal')} className="h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src="/images/paypal.svg" alt="PayPal" className="h-28" />
                    </button>
                    <button type="button" onClick={(e) => handlePayment(e, 'apple')} className="h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src="/images/apple-pay.svg" alt="Apple Pay" className="h-24" />
                    </button>
                    <button type="button" onClick={(e) => handlePayment(e, 'google')} className="h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src="/images/google-pay.svg" alt="Google Pay" className="h-24" />
                    </button>
                  </div>
                </form>
          </div>
        </div>
    );
  }