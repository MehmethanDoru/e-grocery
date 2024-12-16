"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-[94%] mx-auto mt-6 border-none outline-none hidden md:block z-20">
      <div className="relative bg-[#064c4f] rounded-2xls border-none rounded-t-xl">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10">
          {/* Text Content */}
          <div className="z-10 max-w-[36rem] space-y-6 ml-[4rem] mt-[-3.75rem]">
            <h1 className="text-4xl md:text-[3.125rem] font-extrabold text-white mb-4 leading-tight">
              All Groceries, <br />
              <div className="text-[#4ade80] mt-[0.5rem]">
                Delivered in Minutes!
              </div>
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-[2rem]">
              🌟 Get <span className="font-bold text-[#4ade80]">5% OFF</span> on
              organic produce and sustainably sourced groceries delivered right
              to your doorstep!
            </p>
            <Link href="/category/discounts" className="inline-block">
              <button className="bg-[#4ade80] hover:bg-[#22c55e] text-[#064c4f] font-bold px-[2rem] py-[0.75rem] rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                Start Shopping Now →
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[520px] mt-8 md:mt-[-135px] md:translate-y-32 z-30">
            <Image
              src="/images/hero.png"
              alt="Hero image"
              fill
              className="object-contain object-bottom "
              priority
            />
          </div>
        </div>

        {/* Background Curve */}
          <div
            className="absolute bottom-0 left-[0%] right-[0%] h-24 bg-[#eae8e8]
                          before:absolute before:content-[''] before:w-[100%] before:h-28 
                          before:bg-[#064c4f] before:rounded-[0_0_70%_80%] before:bottom-[10%]"
          ></div>
      </div>
    </div>
  );
};

export default Hero;
