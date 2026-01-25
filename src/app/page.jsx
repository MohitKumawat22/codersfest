"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, CreditCard, Headset, Heart, Eye, ShoppingCart, Star } from "lucide-react";

import { useCart } from "../context/CartContext";
import { products } from "../lib/data";

export default function Home() {
  const { addToCart } = useCart();

  const categories = [
    { title: "For Women's", count: "2500+ items", image: "/placeholder-women.jpg", desc: "Lorem ipsum dolor sit amet." },
    { title: "For Men's", count: "1500+ items", image: "/placeholder-men.jpg", desc: "Blazers, T-Shirts and Shirts, Jackets & Coats" },
    { title: "Accessories", count: "800+ items", image: "/placeholder-accessories.jpg", desc: "Handbags, Watches, Sunglasses" },
  ];

  // Select top 4 products for "Top Picks", mixed categories
  const topPicks = [
    products.find(p => p.id === 1) || products[0],
    products.find(p => p.id === 20) || products[1],
    products.find(p => p.id === 3) || products[2],
    products.find(p => p.id === 4) || products[3],
  ].filter(Boolean);


  return (
    <main className="min-h-screen bg-white text-[#171717]">
      {/* Hero Section */}
      <section className="relative bg-[#FAF9F6] pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-[#D4A373]/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-[#33211D]/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-screen-xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-white border border-gray-100 text-[#D4A373] text-xs font-bold uppercase tracking-widest shadow-sm mb-6 animate-fade-in-up">
                New Summer Collection
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#33211D] leading-[1.1] mb-8">
                Elevate Your <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Lifestyle.</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4A373]/20 -rotate-1 z-0"></span>
                </span>
              </h1>
              <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
                Discover a curated selection of premium electronics, fashion, and home essentials designed for the modern you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Link href="/fashion" className="w-full sm:w-auto px-8 py-4 bg-[#33211D] text-white text-sm font-bold uppercase tracking-wide rounded-full shadow-xl hover:shadow-2xl hover:bg-black transition-all transform hover:-translate-y-1 text-center">
                  Shop Fashion
                </Link>
                <Link href="/electronics" className="w-full sm:w-auto px-8 py-4 bg-white text-[#33211D] border border-gray-100 text-sm font-bold uppercase tracking-wide rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all text-center">
                  Explore Tech
                </Link>
              </div>

              {/* Stats / Social Proof */}
              <div className="mt-12 flex items-center justify-center md:justify-start space-x-8 border-t border-gray-200/60 pt-8">
                <div>
                  <p className="text-3xl font-serif font-bold text-[#33211D]">50k+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Happy Customers</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div>
                  <p className="text-3xl font-serif font-bold text-[#33211D]">4.8</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Right Image Composition */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-xl">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 ease-out border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
                  alt="Hero Showcase"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
                />

                {/* Floating Card */}
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 max-w-[200px] animate-bounce-slow hidden md:block">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                      <img src="/p4.jpg" className="w-full h-full object-cover" alt="Product" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#33211D]">Leather Bag</p>
                      <p className="text-[10px] text-gray-500">$85.00</p>
                    </div>
                  </div>
                  <button className="w-full py-1.5 bg-[#33211D] text-white text-[10px] uppercase font-bold rounded-lg hover:bg-black transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Decorative Circle Behind */}
              <div className="absolute -inset-4 border-2 border-[#D4A373]/30 rounded-[3.5rem] -z-10 -rotate-2"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Bar - Trust & Workflows */}
      <section className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-none md:divide-x divide-gray-100">
            <div className="flex items-start space-x-4 px-4">
              <div className="p-3 bg-orange-50 rounded-full text-orange-500">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#33211D] text-lg">Fast Delivery</h3>
                <p className="text-gray-500 text-sm mt-1">Delivery across all pincodes</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 px-4">
              <div className="p-3 bg-yellow-50 rounded-full text-yellow-500">
                <CreditCard size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#33211D] text-lg">Secure Payments</h3>
                <p className="text-gray-500 text-sm mt-1">100% Protected UPS/Cards</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 px-4">
              <div className="p-3 bg-green-50 rounded-full text-green-600">
                <ArrowRight size={24} className="transform rotate-180" /> {/* Simulate Return Icon */}
              </div>
              <div>
                <h3 className="font-bold text-[#33211D] text-lg">Easy Returns</h3>
                <p className="text-gray-500 text-sm mt-1">Hassle-free 30 day returns</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 px-4">
              <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                <Headset size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#33211D] text-lg">24x7 Support</h3>
                <p className="text-gray-500 text-sm mt-1">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - General */}
      <section className="py-12 bg-[#FAF9F6]">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-[#33211D] mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Large Item - Electronics */}
            <Link href="/electronics" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[400px] relative overflow-hidden group cursor-pointer">
              <div className="relative z-10 w-2/3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white/80 py-1 px-2 rounded mb-2 inline-block">Top Rated</span>
                <h3 className="text-3xl font-serif font-bold text-[#33211D] mb-4">Electronics & Gadgets</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3">Upgrade your life with the latest tech. Smartphones, Laptops, Audio & more.</p>
                <ul className="text-sm text-gray-400 space-y-1 mb-6">
                  <li>Smartphones</li>
                  <li>Laptops & Tablets</li>
                  <li>Smart Watches</li>
                </ul>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1498049381529-8903485d6bf4?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Electronics" />
              </div>
            </Link>

            <div className="grid grid-cols-1 gap-6">
              {/* Medium Item - Fashion */}
              <Link href="/fashion" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-[190px] flex items-center cursor-pointer">
                <div className="relative z-10 w-2/3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 py-1 px-2 rounded mb-1 inline-block">New Season</span>
                  <h3 className="text-2xl font-serif font-bold text-[#33211D] mb-2">Fashion & Apparel</h3>
                  <p className="text-gray-400 text-xs">Men, Women, Kids Clothing</p>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Fashion" />
                </div>
              </Link>

              {/* Medium Item - Home & Living */}
              <Link href="/home-living" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-[190px] flex items-center cursor-pointer">
                <div className="relative z-10 w-2/3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 py-1 px-2 rounded mb-1 inline-block">Best Sellers</span>
                  <h3 className="text-2xl font-serif font-bold text-[#33211D] mb-2">Home & Living</h3>
                  <p className="text-gray-400 text-xs">Decor, Furniture, Kitchenware</p>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Home" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Seller Products - AI Curated */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-[#33211D] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">AI Curated</span>
                <span className="text-[#33211D] font-semibold text-sm uppercase tracking-widest">Trending Now</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#33211D] mt-2">Top Picks for You</h2>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Link href="/" className="px-4 py-2 bg-[#33211D] text-white text-sm font-medium rounded-md">All</Link>
              <Link href="/electronics" className="px-4 py-2 text-gray-500 hover:text-[#33211D] text-sm font-medium">Electronics</Link>
              <Link href="/fashion" className="px-4 py-2 text-gray-500 hover:text-[#33211D] text-sm font-medium">Fashion</Link>
              <Link href="/home-living" className="px-4 py-2 text-gray-500 hover:text-[#33211D] text-sm font-medium">Home</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {topPicks.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <Link href={`/product/${product.id}`}>
                  <div className="relative overflow-hidden rounded-xl bg-[#F0F0F0] mb-4 aspect-[3/4]">
                    {/* Product Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    <div className={`absolute top-3 left-3 ${product.color} text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide`}>
                      {product.tag}
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 z-10">
                      <Heart size={16} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="p-3 bg-white hover:bg-[#33211D] hover:text-white rounded-lg shadow-lg transition-colors"
                      >
                        <ShoppingCart size={18} />
                      </button>
                      <Link href={`/product/${product.id}`} className="p-3 bg-white hover:bg-[#33211D] hover:text-white rounded-lg shadow-lg transition-colors">
                        <Eye size={18} />
                      </Link>
                    </div>

                    {/* Timer overlay for first item (example) */}
                    {product.id === 1 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-[#D4A373]/90 text-[#33211D] p-3 flex justify-evenly text-center text-xs font-bold font-mono">
                        <div>05<span className="block text-[8px] font-normal">Days</span></div>
                        <div>12<span className="block text-[8px] font-normal">Hours</span></div>
                        <div>30<span className="block text-[8px] font-normal">Mins</span></div>
                        <div>25<span className="block text-[8px] font-normal">Sec</span></div>
                      </div>
                    )}
                  </div>
                </Link>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-gray-400 text-xs capitalize">{product.category}</span>
                    <div className="flex items-center text-yellow-500 text-xs font-bold">
                      <Star size={12} fill="currentColor" className="mr-1" />
                      {product.rating}
                    </div>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-[#171717] group-hover:text-[#D4A373] transition-colors mb-2">{product.name}</h3>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#171717]">${product.price.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm line-through">${product.oldPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="text-[#33211D] font-semibold text-sm uppercase tracking-widest block mb-2">By the numbers</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-6 leading-tight">
                We've built something <br /> worth trusting
              </h2>
              <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
                Our platform serves millions of shoppers with verified reviews, secure payments, and reliable delivery across the country.
              </p>
              <div className="flex items-center space-x-6">
                <button className="px-6 py-3 border border-[#33211D] text-[#33211D] font-semibold hover:bg-[#33211D] hover:text-white transition-colors">
                  View all
                </button>
                <Link href="#" className="flex items-center text-[#33211D] font-semibold hover:underline">
                  Learn more <span className="ml-1">&gt;</span>
                </Link>
              </div>
            </div>

            {/* Right Stats Grid */}
            <div className="grid grid-cols-2 gap-8 border-l border-gray-200 pl-8 md:pl-12">
              <div className="py-4">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-2">50K+</h3>
                <p className="text-[#33211D] font-bold text-sm">Products available</p>
              </div>
              <div className="py-4 border-l border-gray-200 pl-8">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-2">98%</h3>
                <p className="text-[#33211D] font-bold text-sm">Customer satisfaction</p>
              </div>
              <div className="py-4">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-2">24hrs</h3>
                <p className="text-[#33211D] font-bold text-sm">Average delivery time</p>
              </div>
              <div className="py-4 border-l border-gray-200 pl-8">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-2">15+</h3>
                <p className="text-[#33211D] font-bold text-sm">Languages supported</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
