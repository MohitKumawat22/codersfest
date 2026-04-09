"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Eye, ArrowUpRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { products } from "../../lib/data";

export default function HomeLiving() {
    const { addToCart } = useCart();
    const homeProducts = products.filter(p => p.category === "home-living");

    return (
        <main className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#33211D] selection:text-white">
            {/* Hero Section - Full Width Cinematic */}
            <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
                <img
                    src="/images/hero-home-living.png"
                    alt="Modern Living Room"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <span className="text-white/90 text-sm md:text-base uppercase tracking-[0.2em] mb-4">Interior Collection</span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 drop-shadow-lg">
                        Sanctuary <span className="italic font-light">&</span> Style
                    </h1>
                    <button className="bg-white/90 backdrop-blur text-[#33211D] px-8 py-3 rounded-full uppercase text-xs font-bold tracking-widest hover:bg-white transition-colors cursor-pointer">
                        Explore Collection
                    </button>
                </div>
            </div>

            {/* Editorial / Bento Grid Section */}
            <section className="max-w-screen-xl mx-auto px-4 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div className="max-w-md">
                        <h2 className="text-4xl font-serif text-[#33211D] mb-4">Curated Living</h2>
                        <p className="text-gray-500 font-light">
                            Discover pieces that blend functionality with timeless aesthetics.
                            From handcrafted ceramics to ergonomic furniture.
                        </p>
                    </div>
                    <Link href="#" className="hidden md:flex items-center text-[#33211D] font-bold border-b border-[#33211D] pb-1 hover:opacity-70 transition-opacity">
                        View Lookbook <ArrowUpRight size={16} className="ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {/* Item 1: Large Feature */}
                    <div className="md:col-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
                        <img
                            src="/images/minimalist-decor.png"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt="Minimalist Decor"
                        />
                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-4 rounded-xl">
                            <h3 className="font-serif text-xl text-[#33211D]">Minimalist Decor</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">Shop Now</p>
                        </div>
                    </div>

                    {/* Item 2: Vertical */}
                    <div className="md:row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
                        <img
                            src="/images/coffee-maker.png"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt="Lighting"
                        />
                        <div className="absolute bottom-6 left-6 right-6 text-center">
                            <div className="bg-white/90 backdrop-blur py-3 rounded-xl">
                                <h3 className="font-serif text-xl text-[#33211D]">Statement Lighting</h3>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative group overflow-hidden rounded-2xl cursor-pointer bg-[#E8E6E1] flex items-center justify-center p-8">
                        <div className="text-center">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">New Arrival</p>
                            <h3 className="text-3xl font-serif text-[#33211D] mb-4">Ceramics <br /> & Clay</h3>
                            <span className="inline-block border border-[#33211D] rounded-full p-2 hover:bg-[#33211D] hover:text-white transition-colors">
                                <ArrowUpRight size={20} />
                            </span>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
                        <img
                            src="/images/hero-home-living.png"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt="Chair"
                        />
                        <div className="absolute top-6 right-6 bg-[#33211D] text-white text-xs font-bold px-3 py-1 rounded-full">
                            Bestsellers
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Product Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex items-center space-x-4 mb-10 pb-4 border-b border-gray-100 overflow-x-auto">
                        <button className="px-6 py-2 bg-[#33211D] text-white rounded-full text-sm font-medium whitespace-nowrap">All Items</button>
                        <button className="px-6 py-2 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Furniture</button>
                        <button className="px-6 py-2 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Kitchen</button>
                        <button className="px-6 py-2 bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-full text-sm font-medium whitespace-nowrap transition-colors">Bedding</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {homeProducts.map((product) => (
                            <div key={product.id} className="group cursor-pointer">
                                <Link href={`/product/${product.id}`}>
                                    <div className="relative overflow-hidden rounded-none mb-4 aspect-[4/5] bg-[#F5F5F5]">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <div className={`absolute top-0 left-0 ${product.color} text-[10px] font-bold px-3 py-1 uppercase tracking-wider m-0`}>
                                            {product.tag}
                                        </div>

                                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 px-4">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(product);
                                                }}
                                                className="bg-white text-[#33211D] px-4 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#33211D] hover:text-white transition-colors flex-1 flex items-center justify-center gap-2"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                                <div className="text-center">
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="font-serif text-lg text-[#111827] group-hover:text-[#D4A373] transition-colors mb-1">{product.name}</h3>
                                    </Link>
                                    <p className="text-xs text-gray-400 mb-2 line-clamp-1 max-w-[200px] mx-auto">{product.description}</p>
                                    <div className="flex items-center justify-center space-x-3">
                                        <span className="font-medium text-[#33211D]">${product.price.toFixed(2)}</span>
                                        {product.oldPrice && (
                                            <span className="text-gray-300 text-sm line-through">${product.oldPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
