"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Heart, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { products } from "../../lib/data";

export default function Electronics() {
    const { addToCart } = useCart();
    const electronicsProducts = products.filter(p => p.category === "electronics");

    return (
        <main className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[500px] w-full bg-[#f3f4f6] overflow-hidden">
                <div className="absolute inset-0">
                    {/* Aesthetic Tech Hero Image - Minimalist Setup */}
                    <img
                        src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2000&auto=format&fit=crop"
                        alt="Aesthetic Electronics"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 md:px-20 max-w-screen-xl mx-auto">
                    <span className="bg-[#171717] text-white px-4 py-1.5 uppercase tracking-widest text-xs font-bold mb-4 rounded-sm">Future Ready</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#171717] mb-6 leading-tight">
                        Seamless <br /> <span className="opacity-70">Integration.</span>
                    </h1>
                    <p className="text-gray-700 text-lg md:text-xl max-w-lg mb-8 font-light">
                        Elevate your workspace and lifestyle with our curated collection of minimalist technology.
                    </p>
                    <div className="flex space-x-4">
                        <button className="bg-[#171717] text-white px-8 py-3.5 rounded-sm text-sm font-bold hover:bg-black transition-all shadow-lg">
                            Shop Collection
                        </button>
                        <button className="bg-white/50 backdrop-blur-md text-[#171717] border border-gray-300 px-8 py-3.5 rounded-sm text-sm font-bold hover:bg-white transition-all">
                            Explore
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Categories Bar */}
            <div className="sticky top-[73px] z-30 bg-white border-b border-gray-100 shadow-sm py-4">
                <div className="max-w-screen-xl mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-center space-x-2 md:space-x-4 min-w-max">
                        <button className="px-5 py-2 bg-[#111827] text-white rounded-full text-sm font-medium shadow-md">All Tech</button>
                        <button className="px-5 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Smartphones</button>
                        <button className="px-5 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Laptops</button>
                        <button className="px-5 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Audio</button>
                        <button className="px-5 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Cameras</button>
                        <button className="px-5 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">TV & Home</button>
                        <button className="px-5 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Accessories</button>
                    </div>
                </div>
            </div>

            <section className="py-16 max-w-screen-xl mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-bold text-[#111827]">Trending Gadgets</h2>
                    <span className="text-sm text-gray-500">{electronicsProducts.length} Products Found</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {electronicsProducts.map((product) => (
                        <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-[#3B82F6]/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden">
                            <Link href={`/product/${product.id}`}>
                                <div className="relative bg-gray-100 aspect-[4/5] overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    <div className={`absolute top-3 left-3 ${product.color} text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide shadow-sm`}>
                                        {product.tag}
                                    </div>

                                    {/* Quick Action Overlay */}
                                    <div className="absolute inset-x-4 bottom-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(product);
                                            }}
                                            className="flex-1 bg-[#3B82F6] text-white py-2.5 rounded-lg text-sm font-bold shadow-lg hover:bg-[#2563EB] mr-2 flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart size={16} /> Add
                                        </button>
                                        <button className="bg-white text-gray-700 p-2.5 rounded-lg shadow-lg hover:text-[#3B82F6] hover:bg-gray-50 transition-colors">
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </div>
                            </Link>

                            <div className="p-5">
                                <div className="text-xs text-blue-500 font-bold mb-1 uppercase tracking-wider">{product.category}</div>
                                <Link href={`/product/${product.id}`}>
                                    <h3 className="font-bold text-[#111827] text-lg mb-2 group-hover:text-[#3B82F6] transition-colors line-clamp-1">{product.name}</h3>
                                </Link>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 text-xs line-through font-medium">${product.oldPrice.toFixed(2)}</span>
                                        <span className="font-bold text-[#111827] text-xl">${product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                        <span className="text-yellow-500 mr-1">★</span>
                                        <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
