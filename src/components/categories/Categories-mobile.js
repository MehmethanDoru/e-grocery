"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const CategoriesMobile = () => {
  const categories = [
    {
      id: 1,
      name: "Discounts",
      image: "https://www.svgrepo.com/show/227497/discount.svg",
      slug: "discounts"
    },
    {
      id: 2,
      name: "Vegetables",
      image: "https://www.svgrepo.com/show/395941/broccoli.svg",
      slug: "vegetables"
    },
    {
      id: 3,
      name: "Fruits",
      image: "https://www.svgrepo.com/show/398404/strawberry.svg",
      slug: "fruits"
    },
    {
      id: 4,
      name: "Bakery",
      image: "https://www.svgrepo.com/show/530223/bread.svg",
      slug: "bakery"
    },
    {
      id: 5,
      name: "Water & Beverages",
      image: "https://www.svgrepo.com/show/286022/drink-soda.svg",
      slug: "water-beverages"
    },
    {
      id: 6,
      name: "Snacks",
      image: "https://www.svgrepo.com/show/196465/chocolate-snack.svg",
      slug: "snacks"
    },
    {
      id: 7,
      name: "Milk & Breakfast",
      image: "https://www.svgrepo.com/show/486303/milk.svg",
      slug: "milk-breakfast"
    },
    {
      id: 8,
      name: "Staple Food",
      image: "https://www.svgrepo.com/show/267175/pasta.svg",
      slug: "staple-food"
    },
    {
      id: 9,
      name: "Ice Cream",
      image: "https://www.svgrepo.com/show/501883/ice-cream.svg",
      slug: "ice-cream"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;

    if (Math.abs(velocity.x) > 500 || Math.abs(swipe) > 100) {
      if (swipe < 0 && currentIndex < categories.length - 4) {
        setCurrentIndex(currentIndex + 1);
      } else if (swipe > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const calculateDragConstraints = () => {
    const itemWidth = 80;
    const gap = 12;
    const totalWidth = categories.length * (itemWidth + gap) - gap;
    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth - 32 : 0;
    const maxDrag = Math.max(0, totalWidth - viewportWidth);
    return { left: -maxDrag, right: 0 };
  };

  return (
    <>
      <div className="px-4 text-center">
        <p className="text-sm text-[#c1c2c2] mt-2">Current Location</p>
        <p className="text-[#d4ad35] flex items-center justify-center gap-1 text-xl mt-1 tracking-wide">
          California, USA
          <svg
            viewBox="0 0 16 16"
            width="16"
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
              {" "}
              <path
                d="M16 1L15 0L0 6V8L7 9L8 16H10L16 1Z"
                fill="#ffc107"
              ></path>{" "}
            </g>
          </svg>
        </p>
      </div>
      <div className="px-4 py-6">
        <motion.div
          className="overflow-hidden"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            className="flex gap-3 w-fit"
            drag="x"
            dragConstraints={calculateDragConstraints()}
            onDragEnd={handleDragEnd}
            animate={{
              x: `-${currentIndex * (80 + 12)}px`,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
            }}
          >
            {categories.map((category) => (
              <Link 
                href={`/category/${category.slug}`}
                key={category.id} 
                className="flex-shrink-0 w-20 mt-2"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 bg-[#eaeadef4] border border-[#064d4f89] rounded-full flex items-center justify-center p-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <p className="text-xs text-center font-medium text-[#064c4f]">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default CategoriesMobile;
