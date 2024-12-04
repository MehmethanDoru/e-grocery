import Image from "next/image";
import Hero from "@/components/Hero";
import ResponsiveCategories from "@/app/responsive-components/responsiveCategories";
import MexicanWind from "@/components/products/Mexican-Wind";
import MightNeed from "@/components/products/Might-Need";
import LastViewedProducts from "@/components/products/Last-Viewed-Products";

export default function Home() {
  return (
    <div>
     <Hero />
     <ResponsiveCategories />
     <MightNeed />
     <MexicanWind />
     <LastViewedProducts />
    </div>
  );
}
