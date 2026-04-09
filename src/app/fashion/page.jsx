"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Heart, Eye, Truck, CreditCard, Headset, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { products } from "../../lib/data";

export default function FashionPage() {
    const { addToCart } = useCart();
    // Filter for fashion category
    const fashionProducts = products.filter(p => p.category === "fashion");

    return (
        <main className="min-h-screen bg-white font-sans text-[#171717]">
            {/* Hero Section */}
            <section className="bg-[#FAF9F6] relative overflow-hidden pt-12 md:pt-0">
                <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[600px]">
                    {/* Left Content */}
                    <div className="z-10 order-2 md:order-1 pb-12 md:pb-0">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6 w-fit">
                            <span className="w-6 h-6 rounded-full bg-[#33211D] text-white flex items-center justify-center text-xs font-bold">%</span>
                            <span className="text-sm font-bold text-[#33211D]">50% OFF Summer Super Sale</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] text-[#33211D] mb-6">
                            Step into Style: <br />
                            Your Ultimate <br />
                            Fashion Destination
                        </h1>
                        <p className="text-gray-500 text-lg mb-8 max-w-md leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
                        </p>
                        <button className="px-8 py-4 bg-[#33211D] text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-black transition-all flex items-center gap-2">
                            Shop Now <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Right Image with Decorative Elements */}
                    <div className="relative order-1 md:order-2 h-[400px] md:h-full flex items-end justify-center">
                        {/* Abstract background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#E5E5E5]/50 rounded-full blur-3xl -z-10"></div>

                        <img
                            src="/images/fashion-model.png"
                            alt="Fashion Model"
                            className="h-full object-contain md:scale-110 origin-bottom"
                        />

                        {/* Floating Tooltips (Decorative) */}
                        <div className="absolute top-1/4 right-10 bg-white/80 backdrop-blur p-2 rounded-full border border-white shadow-lg animate-bounce-slow hidden md:block">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src="/images/hero-fashion.png" className="w-full h-full object-cover" alt="Sunglasses" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Icons */}
            <div className="py-12 border-b border-gray-100">
                <div className="max-w-screen-xl mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-24">
                    <div className="flex items-center gap-4">
                        <div className="text-orange-500"><Truck size={32} /></div>
                        <div>
                            <h3 className="font-bold text-[#33211D]">Free Shipping</h3>
                            <p className="text-xs text-gray-500">Free shipping for orders above $150</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-orange-500"><CreditCard size={32} /></div>
                        <div>
                            <h3 className="font-bold text-[#33211D]">Flexible Payment</h3>
                            <p className="text-xs text-gray-500">Multiple secure payment options</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-orange-500"><Headset size={32} /></div>
                        <div>
                            <h3 className="font-bold text-[#33211D]">24x7 Support</h3>
                            <p className="text-xs text-gray-500">We support online all days</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Grid (Bento Style) */}
            <section className="py-20 max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 h-auto md:h-[600px]">
                    {/* Large Item - Women */}
                    <div className="relative bg-[#F5F5F7] rounded-sm overflow-hidden group cursor-pointer h-full">
                        <div className="absolute top-10 left-10 z-10 max-w-xs">
                            <span className="bg-white px-3 py-1 text-xs font-bold rounded-full mb-4 inline-block shadow-sm">2500+ Items</span>
                            <h2 className="text-4xl font-serif font-bold text-[#33211D] mb-4">For Women's</h2>
                            <p className="text-gray-500 text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <ul className="text-xs font-medium text-gray-400 space-y-1">
                                <li>Blazers</li>
                                <li>T-Shirts & Blouses</li>
                                <li>Dresses</li>
                            </ul>
                        </div>
                        <img
                            src="/images/hero-fashion.png"
                            className="absolute bottom-0 right-0 w-3/4 h-3/4 object-cover object-left-top group-hover:scale-105 transition-transform duration-700"
                            alt="Women's Fashion"
                        />
                    </div>

                    <div className="flex flex-col gap-6 h-full">
                        {/* Medium Item - Men */}
                        <div className="relative bg-[#F5F5F7] rounded-sm overflow-hidden group cursor-pointer flex-1 min-h-[250px]">
                            <div className="absolute top-8 left-8 z-20">
                                <span className="bg-white px-3 py-1 text-xs font-bold rounded-full mb-3 inline-block shadow-sm">1500+ Items</span>
                                <h2 className="text-3xl font-serif font-bold text-[#33211D] mb-2">For Men's</h2>
                                <p className="text-gray-400 text-xs text-sm">Blazers, Jackets & Coats</p>
                            </div>
                            <img
                                src="/images/fashion-model.png"
                                className="absolute bottom-0 right-0 w-1/2 h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Men's Fashion"
                            />
                        </div>
                        {/* Medium Item - Accessories */}
                        <div className="relative bg-[#F5F5F7] rounded-sm overflow-hidden group cursor-pointer flex-1 min-h-[250px]">
                            <div className="absolute top-8 left-8 z-10">
                                <span className="bg-white px-3 py-1 text-xs font-bold rounded-full mb-3 inline-block shadow-sm">800+ Items</span>
                                <h2 className="text-3xl font-serif font-bold text-[#33211D] mb-2">Accessories</h2>
                                <p className="text-gray-400 text-xs text-sm">Handbags, Watches, Sunglasses</p>
                            </div>
                            <img
                                src="/images/leather-bag.png"
                                className="absolute bottom-0 right-0 w-2/3 h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                alt="Accessories"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Seller Products */}
            <section className="pb-20 max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <p className="text-gray-500 font-bold text-xs uppercase mb-2 tracking-widest pl-1">Our Products</p>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#33211D]">Our Top Seller Products</h2>
                    </div>
                    <div className="flex gap-8 mt-6 md:mt-0 border-b border-gray-100 pb-1">
                        <button className="bg-[#33211D] text-white px-6 py-2 text-xs font-bold rounded-sm shadow-md">All</button>
                        <button className="text-gray-500 hover:text-[#33211D] px-2 py-2 text-xs font-bold transition-colors uppercase tracking-wide">Women</button>
                        <button className="text-gray-500 hover:text-[#33211D] px-2 py-2 text-xs font-bold transition-colors uppercase tracking-wide">Men</button>
                        <button className="text-gray-500 hover:text-[#33211D] px-2 py-2 text-xs font-bold transition-colors uppercase tracking-wide">Accessories</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {fashionProducts.slice(0, 4).map((product, idx) => (
                        <div key={product.id} className="group cursor-pointer">
                            <div className="relative overflow-hidden bg-[#F0F0F0] mb-4 aspect-[3/4]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Discount Tag */}
                                <div className={`absolute top-0 left-0 bg-[#E0F2F1] text-[#00695C] text-[10px] uppercase font-bold px-3 py-1 tracking-wider m-3 rounded-sm`}>
                                    {product.tag || '50% off'}
                                </div>

                                {/* Vertical Icon Stack on Right */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                    <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-500 hover:bg-[#33211D] hover:text-white shadow-md transition-colors delay-75">
                                        <Heart size={14} />
                                    </button>
                                    <Link href={`/product/${product.id}`} className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-500 hover:bg-[#33211D] hover:text-white shadow-md transition-colors delay-100">
                                        <Eye size={14} />
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                        }}
                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-500 hover:bg-[#33211D] hover:text-white shadow-md transition-colors delay-150"
                                    >
                                        <ShoppingCart size={14} />
                                    </button>
                                </div>

                                {/* Timer on first item */}
                                {idx === 0 && (
                                    <div className="absolute inset-x-0 bottom-0 bg-[#EAB308] p-2 flex justify-between text-[#33211D] text-center">
                                        <div className="flex-1 border-r border-[#33211D]/10">
                                            <span className="block font-bold text-sm leading-none">05</span><span className="text-[9px] uppercase opacity-80">Days</span>
                                        </div>
                                        <div className="flex-1 border-r border-[#33211D]/10">
                                            <span className="block font-bold text-sm leading-none">12</span><span className="text-[9px] uppercase opacity-80">Hours</span>
                                        </div>
                                        <div className="flex-1 border-r border-[#33211D]/10">
                                            <span className="block font-bold text-sm leading-none">30</span><span className="text-[9px] uppercase opacity-80">Mins</span>
                                        </div>
                                        <div className="flex-1">
                                            <span className="block font-bold text-sm leading-none">25</span><span className="text-[9px] uppercase opacity-80">Sec</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">{product.category}</span>
                                    <div className="flex items-center gap-1">
                                        <Star size={10} fill="#EAB308" className="text-[#EAB308]" />
                                        <span className="text-xs font-bold text-[#33211D]">{product.rating}</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-[#171717] text-sm group-hover:text-[#D4A373] transition-colors mb-2 truncate">{product.name}</h3>
                                <div className="flex items-center space-x-3">
                                    <span className="font-bold text-[#33211D]">$ {product.price.toFixed(2)}</span>
                                    {product.oldPrice && (
                                        <span className="text-gray-400 text-xs line-through decoration-gray-300">$ {product.oldPrice.toFixed(2)}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
