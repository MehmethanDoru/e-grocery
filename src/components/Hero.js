"use client";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-[94%] mx-auto mt-6 border-none outline-none hidden md:block">
      <div className="relative bg-[#064c4f] rounded-2xls border-none rounded-t-xl">
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10">
          {/* Text Content */}
          <div className="z-10 max-w-[36rem] space-y-6 ml-[4rem] mt-[-3.75rem]">
            <h1 className="text-4xl md:text-[3.125rem] font-extrabold text-white mb-4 leading-tight">
              All Groceries, <br/>
              <div className="text-[#4ade80] mt-[0.5rem]">Delivered in Minutes!</div>
            </h1>
            <p className="text-gray-200 text-base md:text-lg mb-[2rem]">
              🌟 Get <span className="font-bold text-[#4ade80]">5% OFF</span> on organic produce and sustainably sourced groceries delivered right to your doorstep!
            </p>
            <Link href="/category/discounts" className="inline-block">
              <button className="bg-[#4ade80] hover:bg-[#22c55e] text-[#064c4f] font-bold px-[2rem] py-[0.75rem] rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                Start Shopping Now →
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[520px] mt-8 md:mt-[-135px] md:translate-y-32 z-50">
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
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="#eae8e8"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
