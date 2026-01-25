"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, CreditCard, Headset, Heart, Eye, ShoppingCart, Star, Shirt } from "lucide-react";
import VirtualMannequin from "@/components/VirtualMannequin";
import TrustBadges from "@/components/TrustBadges";
import CustomerReviews from "@/components/CustomerReviews";

import { useCart } from "../context/CartContext";
import { products } from "../lib/data";

export default function Home() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      <VirtualMannequin
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

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

      {/* Categories Grid - Aesthetic Bento */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-[#D4A373] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">Curated Collections</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D]">Shop by Category</h2>
            </div>
            <Link href="/" className="hidden md:flex items-center gap-2 text-[#33211D] font-bold border-b-2 border-[#D4A373] pb-1 hover:text-[#D4A373] transition-colors">
              View All Categories <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[550px]">
            {/* Large Item - Electronics (Left) - Span 6 */}
            <Link href="/electronics" className="md:col-span-6 relative rounded-[2rem] overflow-hidden group hover-card cursor-pointer shadow-lg">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1498049381529-8903485d6bf4?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Electronics" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] uppercase font-bold tracking-widest mb-4">
                  Tech & Gadgets
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">The Future is Now</h3>
                <div className="flex items-center text-white/90 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-sm font-medium">Explore Collection</span>
                  <div className="bg-white text-black rounded-full p-1">
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Right Column - Spans 6 */}
            <div className="md:col-span-6 grid grid-rows-2 gap-6">
              {/* Top - Fashion */}
              <Link href="/fashion" className="relative rounded-[2rem] overflow-hidden group hover-card cursor-pointer shadow-lg">
                <div className="absolute inset-0">
                  <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fashion" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                </div>
                <div className="absolute top-0 left-0 h-full flex flex-col justify-center p-8 md:p-12">
                  <span className="text-[#D4A373] text-xs font-bold uppercase tracking-widest mb-2">New Season</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Modern Fashion</h3>
                  <p className="text-gray-200 text-sm max-w-[200px] mb-4">Discover the latest trends in men's and women's fashion.</p>
                </div>
              </Link>

              {/* Bottom - Split - Home Living & Beauty? Or Deals? Let's do Home Living */}
              <div className="grid grid-cols-2 gap-6">
                <Link href="/home-living" className="relative rounded-[2rem] overflow-hidden group hover-card cursor-pointer shadow-lg bg-[#E8E6E1]">
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#33211D] shadow-sm">
                        <Star size={14} />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#33211D] leading-tight">Home &<br />Living</h3>
                      <p className="text-[#33211D]/60 text-xs mt-1">Decor & Furniture</p>
                    </div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400"
                    className="absolute bottom-0 right-0 w-2/3 h-2/3 object-contain translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" alt="Chair" />
                </Link>

                <Link href="/beauty" className="relative rounded-[2rem] overflow-hidden group hover-card cursor-pointer shadow-lg bg-[#F8E1E7]">
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#d64a75] shadow-sm">
                        <Heart size={14} />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#8a2f4c] leading-tight">Beauty &<br />Care</h3>
                      <p className="text-[#8a2f4c]/60 text-xs mt-1">Skincare & More</p>
                    </div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=400"
                    className="absolute bottom-0 right-0 w-2/3 h-2/3 object-cover rounded-tl-[2rem] group-hover:scale-105 transition-transform duration-500" alt="Beauty" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Seller Products - AI Curated */}
      <section className="py-16 bg-[#FDFBF7]"> {/* Subtle background change */}
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="glass px-3 py-1 rounded-full text-[#33211D] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Star size={10} className="fill-[#D4A373] text-[#D4A373]" /> AI Curated
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#33211D] mt-4">Top Picks for You</h2>
            </div>

            {/* Aesthetic Filter Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 md:mt-0 p-1 bg-white/50 backdrop-blur-sm rounded-full border border-gray-100">
              <Link href="/" className="px-5 py-2.5 bg-[#33211D] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all hover:shadow-lg">
                All
              </Link>
              <Link href="/electronics" className="px-5 py-2.5 text-gray-500 hover:text-[#33211D] hover:bg-white text-xs font-bold uppercase tracking-wider rounded-full transition-all">
                Electronics
              </Link>
              <Link href="/fashion" className="px-5 py-2.5 text-gray-500 hover:text-[#33211D] hover:bg-white text-xs font-bold uppercase tracking-wider rounded-full transition-all">
                Fashion
              </Link>
              <Link href="/home-living" className="px-5 py-2.5 text-gray-500 hover:text-[#33211D] hover:bg-white text-xs font-bold uppercase tracking-wider rounded-full transition-all">
                Home
              </Link>
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

                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedProduct(product); }}
                        className="p-3 bg-white hover:bg-purple-600 hover:text-white rounded-lg shadow-lg transition-colors group/try"
                        title="Virtual Try-On"
                      >
                        <Shirt size={18} className="group-hover/try:animate-pulse" />
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

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Customer Reviews Section */}
      <CustomerReviews />

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
