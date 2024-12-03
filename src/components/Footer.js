"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#064c4f] text-white">
      <div className="w-[94%] mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Image
              src="/images/next.svg"
              alt="Gromuse Logo"
              width={120}
              height={30}
              className="dark:invert"
            />
            <p className="text-sm text-gray-300">
              Your one-stop shop for groceries and everyday essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white">Products</Link></li>
              <li><Link href="/categories" className="text-gray-300 hover:text-white">Categories</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@mehmethandoru.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Grocery St, Food City</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded-lg bg-white/10 text-white placeholder:text-gray-300 focus:outline-none"
              />
              <button className="bg-white text-[#064c4f] px-4 py-2 rounded-lg hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© 2024 Mehmethan Doru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
