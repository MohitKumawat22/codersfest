"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, CreditCard, Headset, Heart, Eye, ShoppingCart, Shirt } from "lucide-react";
import VirtualMannequin from "@/components/VirtualMannequin";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { title: "For Women's", count: "2500+ items", image: "/placeholder-women.jpg", desc: "Lorem ipsum dolor sit amet." },
    { title: "For Men's", count: "1500+ items", image: "/placeholder-men.jpg", desc: "Blazers, T-Shirts and Shirts, Jackets & Coats" },
    { title: "Accessories", count: "800+ items", image: "/placeholder-accessories.jpg", desc: "Handbags, Watches, Sunglasses" },
  ];

  const products = [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 199.00, oldPrice: 250.00, rating: 4.8, image: "/p1.jpg", tag: "20% off", color: "bg-blue-100 text-blue-600" },
    { id: 2, name: "Smart Watch Series 5", category: "Gadgets", price: 299.00, oldPrice: 350.00, rating: 4.9, image: "/p2.jpg", tag: "New", color: "bg-green-100 text-green-600" },
    { id: 3, name: "Premium Coffee Maker", category: "Home", price: 120.00, oldPrice: 150.00, rating: 4.7, image: "/p3.jpg", tag: "Best Seller", color: "bg-orange-100 text-orange-600" },
    { id: 4, name: "Leather Travel Bag", category: "Fashion", price: 85.00, oldPrice: 130.00, rating: 4.6, image: "/p4.jpg", tag: "35% off", color: "bg-red-100 text-red-600" },
  ];

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <VirtualMannequin
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Hero Section */}
      <section className="bg-[#FAF9F6] pt-8 md:pt-16 pb-16 md:pb-24 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="z-10 order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold uppercase tracking-wider text-[#33211D] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#33211D]"></span>
              Big Sale: Up to 50% OFF
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-[#33211D] mb-6">
              Shop Everything <br />
              You Need in One Place
            </h1>
            <p className="text-gray-500 mb-8 max-w-lg leading-relaxed">
              From latest gadgets to trendy fashion and home essentials. Experience the best of online shopping with Apna Store.
            </p>
            <Link href="#" className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-all bg-[#33211D] hover:bg-black rounded-sm shadow-lg hover:shadow-xl group">
              Start Shopping
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Hero Image Group */}
          <div className="relative order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative z-10 w-full max-w-md h-[400px] md:h-[500px] bg-[#E5E5E5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl">
              {/* Placeholder for the main model image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <span className="text-gray-400 font-semibold px-4 text-center">Lifestyle / Mixed Product Showcase</span>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 bg-white p-3 rounded-full shadow-lg z-20 animate-bounce">
              <span className="text-[#33211D] font-bold text-xs">Best Prices</span>
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
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-[400px] relative overflow-hidden group">
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
              <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gray-100 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                <span className="text-gray-300">Electronics IMG</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Medium Item - Fashion */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-[190px] flex items-center">
                <div className="relative z-10 w-2/3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 py-1 px-2 rounded mb-1 inline-block">New Season</span>
                  <h3 className="text-2xl font-serif font-bold text-[#33211D] mb-2">Fashion & Apparel</h3>
                  <p className="text-gray-400 text-xs">Men, Women, Kids Clothing</p>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gray-100 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                  <span className="text-gray-300">Fashion IMG</span>
                </div>
              </div>

              {/* Medium Item - Home & Living */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group h-[190px] flex items-center">
                <div className="relative z-10 w-2/3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 py-1 px-2 rounded mb-1 inline-block">Best Sellers</span>
                  <h3 className="text-2xl font-serif font-bold text-[#33211D] mb-2">Home & Living</h3>
                  <p className="text-gray-400 text-xs">Decor, Furniture, Kitchenware</p>
                </div>
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gray-100 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                  <span className="text-gray-300">Home IMG</span>
                </div>
              </div>
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
              <button className="px-4 py-2 bg-[#33211D] text-white text-sm font-medium rounded-md">All</button>
              <button className="px-4 py-2 text-gray-500 hover:text-[#33211D] text-sm font-medium">Electronics</button>
              <button className="px-4 py-2 text-gray-500 hover:text-[#33211D] text-sm font-medium">Fashion</button>
              <button className="px-4 py-2 text-gray-500 hover:text-[#33211D] text-sm font-medium">Home</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl bg-[#F0F0F0] mb-4 aspect-[3/4]">
                  {/* Product Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    Product {product.id}
                  </div>

                  <div className={`absolute top-3 left-3 ${product.color} text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide`}>
                    {product.tag}
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <Heart size={16} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <button className="p-3 bg-white hover:bg-[#33211D] hover:text-white rounded-lg shadow-lg transition-colors">
                      <ShoppingCart size={18} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                      className="p-3 bg-white hover:bg-purple-600 hover:text-white rounded-lg shadow-lg transition-colors group/try"
                      title="Virtual Try-On"
                    >
                      <Shirt size={18} className="group-hover/try:animate-pulse" />
                    </button>
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
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-gray-400 text-xs">{product.category}</span>
                    <div className="flex items-center text-yellow-500 text-xs font-bold">
                      <svg className="w-3 h-3 fill-current mr-1" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      {product.rating}
                    </div>
                  </div>
                  <h3 className="font-bold text-[#171717] group-hover:text-[#D4A373] transition-colors mb-2">{product.name}</h3>
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
