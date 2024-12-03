import Image from "next/image";
import Hero from "@/components/Hero";
import ResponsiveCategories from "@/app/responsive-components/responsiveCategories";
import ProductsHome from "@/components/Products-home";

export default function Home() {
  return (
    <div>
     <Hero />
     <ResponsiveCategories />
     <ProductsHome />
    </div>
  );
}
