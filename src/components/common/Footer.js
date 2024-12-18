"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from 'react-toastify';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }); 

      const data = await response.json();
      console.log('Server response:', { status: response.status, data });

      if (response.status === 409) {
        toast.warning(data.error);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Subscription failed');
      }

      setEmail('');
      toast.success(data.message || 'Successfully subscribed to newsletter!');
    } catch (error) {
      console.error('Subscription error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      toast.error(error.message || 'Failed to subscribe. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#064c4f] text-white">
      <div className="w-[94%] mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Image
              src="/images/logo.svg"
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
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/category/discounts"
                  className="text-gray-300 hover:text-white"
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@mehmethandoru.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Melly St, Food City</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white/10 text-white placeholder:text-gray-300 focus:outline-none w-full"
              />
              {loading ? (
                <div className="bg-white text-[#064c4f] px-4 py-2 rounded-lg font-medium w-fit self-start">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
              ) : (
                <button 
                  onClick={handleSubscribe}
                  className="bg-white text-[#064c4f] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium w-fit self-start"
                >
                  Subscribe
                </button>
              )}
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
