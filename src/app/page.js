import Image from "next/image";
import Hero from "@/components/Hero";
import ResponsiveCategories from "@/app/responsive-components/responsiveCategories";
import MexicanWind from "@/components/products/Mexican-Wind";
import MightNeed from "@/components/products/Might-Need";
import LastViewedProducts from "@/components/products/Last-Viewed-Products";
import OrderTracking from '../components/OrderTracking';

export default function Home() {
  return (
    <div>
     <Hero />
     <ResponsiveCategories />
     <div className="mt-8 mx-auto w-[94%]">
        <h2 className="text-2xl font-bold mb-4 text-[#064c4f]">Sipariş Takip</h2>
        <OrderTracking />
     </div>
     <MightNeed />
     <MexicanWind />
     <LastViewedProducts />
    </div>
  );
}
