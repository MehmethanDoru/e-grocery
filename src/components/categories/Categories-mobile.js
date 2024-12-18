"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { categoryService } from "@/api/supabase/services/categoryService";
import LocationDisplay from "../location/LocationDisplay";

const CategoriesMobile = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      if (data && data.length > 0) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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
      <div className="px-4">
        <LocationDisplay />
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
                      alt={category.category_name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <p className="text-xs text-center font-medium text-[#064c4f]">
                    {category.category_name}
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
