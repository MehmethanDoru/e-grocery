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
        <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sipariş Durumu</h2>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-700 font-medium mb-1">Durum:</p>
                    <p className={`font-semibold text-lg ${statusColorClass}`}>{orderStatus}</p>
                </div>
                <div>
                    <p className="text-gray-700 font-medium mb-1">Kalan Süre:</p>
                    <p className="font-semibold text-lg text-gray-800">{remainingTime} dakika</p>
                </div>
            </div>
        </div>
    );
} 