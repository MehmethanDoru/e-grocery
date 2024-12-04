"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    console.log(searchTerm);
  };

  return (
    <>
        <div className="md:hidden absolute top-0 left-0 right-0 items-center gap-2 bg-[#064c4f] w-full h-64 z-[-5] rounded-edge">
        </div>
    <nav className="w-[94%] mx-auto mt-3 bg-[#064c4f] px-6 py-4 flex items-center justify-between rounded-xl z-5">
      <div className="hidden md:flex items-center gap-2 ">
        <button className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <Image
          src="/images/logo.svg"
          alt="Gromuse Logo"
          width={100}
          height={24}
          className="h-6 w-auto dark:invert ml-2"
        />
      </div>

      <div
        className={`flex-1 ${
          isSearchFocused ? "md:max-w-2xl max-w-full" : "max-w-2xl"
        } mx-4`}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search for Grocery, Snacks..."
            className="w-full px-4 py-2 rounded-full bg-white text-gray-800 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={handleSearch}
          >
            <svg
              className="w-5 h-5 text-[#064c4f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`flex items-center gap-3 ${
          isSearchFocused ? "md:flex hidden" : "flex"
        }`}
      >
        <div className="items-center text-white text-sm hidden md:flex">
          <svg
            viewBox="0 0 1024 1024"
            width="24"
            height="24"
            className="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M704 469.333333h-200.533333L640 106.666667H405.333333l-128 448h183.466667L362.666667 960z"
                fill="#FFC107"
              ></path>
            </g>
          </svg>
          <span>Order now and get it within </span>
          <span className="font-semibold ml-1 text-[#ffc107]">15 min!</span>
        </div>
        <div className="flex gap-4">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
          <button className="text-white">
            <div className="avatar">
              <div className="w-10 rounded-lg">
                <img
                  className="rounded-full border-2 border-[#FFC107] shadow-[0_0_10px_#FFC107]"
                  src="https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg="
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </nav>
</>
  );
};
export default Navbar;
