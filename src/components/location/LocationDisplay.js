"use client";

import { useState, useEffect } from "react";

const LocationDisplay = () => {
  const [location, setLocation] = useState("Location not available");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      // Konum hassasiyetini artırmak için options
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // OpenStreetMap Nominatim API'si ile daha detaylı sorgu
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?` + 
              `format=json&` +
              `lat=${position.coords.latitude}&` +
              `lon=${position.coords.longitude}&` +
              `zoom=18&` + // Daha yüksek zoom seviyesi
              `addressdetails=1&` + // Detaylı adres bilgisi
              `accept-language=tr` // Türkçe sonuçlar için
            );
            
            const data = await response.json();
            
            // İlçe ve şehir bilgisini daha doğru almak için
            const district = data.address.suburb || 
                           data.address.district || 
                           data.address.neighbourhood;
            const city = data.address.city || 
                        data.address.town || 
                        data.address.province;
            
            if (district && city) {
              setLocation(`${district}, ${city}`);
            } else if (city) {
              setLocation(city);
            } else {
              setLocation("Location not available");
            }
          } catch (error) {
            console.error("Error getting location details:", error);
            setLocation("Location not available");
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Location not available");
          setLoading(false);
        },
        options
      );
    } else {
      setLocation("Geolocation is not supported");
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <p className="text-sm md:hidden text-[#c1c2c2] mt-2 md:mt-0">Current Location</p>
      <p className="text-[#d4ad35] flex items-center justify-center gap-1 text-xl md:text-sm mt-1 md:mt-[-12px] tracking-wide">
        {loading ? "Getting location..." : location}
        <svg
          viewBox="0 0 16 16"
          width='16'
          className="w-4 h-4 ml-1 md:w-3 md:h-3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M16 1L15 0L0 6V8L7 9L8 16H10L16 1Z"
              fill="#ffc107"
            ></path>
          </g>
        </svg>
      </p>
    </div>
  );
};

export default LocationDisplay; 