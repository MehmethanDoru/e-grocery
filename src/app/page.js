"use client";

import Image from "next/image";
import Hero from "@/components/Hero";
import ResponsiveCategories from "@/app/responsive-components/responsiveCategories";
import MexicanWind from "@/components/products/Mexican-Wind";
import MightNeed from "@/components/products/Might-Need";
import LastViewedProducts from "@/components/products/Last-Viewed-Products";
import OrderTracking from "../components/OrderTracking";
import { useState, useEffect } from "react";

export default function Home() {
  const [showTracking, setShowTracking] = useState(false);

  useEffect(() => {
    setShowTracking(localStorage.getItem("trackingHidden") === "false");
  }, []);

  return (
    <div>
      <Hero />
      <ResponsiveCategories />
      {showTracking && (
        <div className="mt-2 mx-auto w-[94%] order-tracking-container">
          <h2 className="text-2xl font-bold mb-4 text-[#064c4f]">
            Order Tracking
          </h2>
          <OrderTracking />
        </div>
      )}
      <MightNeed />
      <MexicanWind />
      <LastViewedProducts />
    </div>
  );
}
