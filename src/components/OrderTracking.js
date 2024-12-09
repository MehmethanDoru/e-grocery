"use client";

import { useState, useEffect } from 'react';

export default function OrderTracking() {
    // localStorage'dan başlangıç değerlerini al
    const [remainingTime, setRemainingTime] = useState(() => {
        const saved = localStorage.getItem('remainingTime');
        return saved ? parseInt(saved) : 15;
    });
    const [orderStatus, setOrderStatus] = useState(() => {
        return localStorage.getItem('orderStatus') || 'Preparing';
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prev => {
                const newTime = prev <= 0 ? 0 : prev - 1;
                localStorage.setItem('remainingTime', newTime.toString());
                
                // Durumu güncelle
                if (newTime === 7) {
                    setOrderStatus('On The Way');
                    localStorage.setItem('orderStatus', 'On The Way');
                } else if (newTime === 0) {
                    setOrderStatus('Delivered');
                    localStorage.setItem('orderStatus', 'Delivered');
                }
                
                return newTime;
            });
        }, 1500);

        return () => clearInterval(timer);
    }, []);

    // Renk sınıflarını duruma göre belirle
    const statusColorClass = 
        orderStatus === 'Delivered' ? 'text-green-600' :
        orderStatus === 'On The Way' ? 'text-blue-600' :
        'text-orange-600';

    return (
        <div className="bg-white rounded-xl p-4 shadow-lg relative">
            {remainingTime === 0 && (
                <button 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                        const element = document.querySelector('.order-tracking-container');
                        if (element) {
                            element.style.display = 'none';
                            localStorage.setItem('trackingHidden', 'true');
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Delivery Status</h2>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-700 font-medium mb-1">Status:</p>
                    <p className={`font-semibold text-lg ${statusColorClass}`}>{orderStatus}</p>
                </div>
                <div>
                    <p className="text-gray-700 font-medium mb-1">Remaining Time:</p>
                    <p className="font-semibold text-lg text-gray-800">{remainingTime} minutes</p>
                </div>
            </div>
        </div>
    );
} 