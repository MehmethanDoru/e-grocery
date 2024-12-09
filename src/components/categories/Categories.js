"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { categoryService } from "@/api/supabase/services/categoryService";
import LocationDisplay from "../location/LocationDisplay";

const Categories = () => {
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

  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 3 : prevIndex - 1
    );
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 mt-12">
      <div className="flex items-center justify-between">
        <button
          onClick={slideLeft}
          className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#064c4f"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div className="overflow-hidden mx-12">
          <motion.div
            className="flex gap-4"
            animate={{
              x: `-${currentIndex * 33.33}%`,
            }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                className="flex-shrink-0 w-1/3 p-4 cursor-pointer "
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 relative">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg text-[#064c4f] font-bold tracking-wide">
                      {category.category_name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        <button
          onClick={slideRight}
          className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#064c4f"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Categories;
