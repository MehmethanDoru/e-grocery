import Image from "next/image";
import Hero from "@/components/Hero";
import ResponsiveCategories from "@/app/responsive-components/responsiveCategories";
import ProductsHome from "@/components/products/Products-home";
import LastViewedProducts from "@/components/products/Last-Viewed-Products";
import SpecialProducts from "@/components/products/Special-Products";

export default function Home() {
  return (
    <div>
     <Hero />
     <ResponsiveCategories />
     <ProductsHome />
     <SpecialProducts />
     <LastViewedProducts />
    </div>
  );
}
