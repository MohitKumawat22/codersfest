"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Heart, Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { products } from "../../lib/data";

export default function Deals() {
    const { addToCart } = useCart();
    const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    clearInterval(timer);
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Filter for deals (items with 'off', 'Sale', or 'Hot' in tag)
    const dealProducts = products.filter(p =>
        p.tag && (p.tag.includes("off") || p.tag.includes("Sale") || p.tag.includes("Hot"))
    );

    return (
        <main className="min-h-screen bg-white">
            <div className="bg-[#FAF9F6] py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-4">Hot Deals</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Unbeatable prices on your favorite products. Shop now before they're gone!</p>
            </div>

            <section className="py-16 max-w-screen-xl mx-auto px-4">
                {/* Timer / Banner */}
                <div className="bg-[#33211D] text-white p-6 rounded-lg mb-12 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold">Flash Sale Ends In:</h2>
                        <p className="opacity-80">Grab the best discounts on Electronics, Fashion and more.</p>
                    </div>
                    <div className="flex space-x-4 font-mono text-xl font-bold">
                        <div className="bg-white text-[#33211D] px-3 py-2 rounded min-w-[60px] text-center">
                            {String(timeLeft.hours).padStart(2, '0')}h
                        </div>
                        <div className="bg-white text-[#33211D] px-3 py-2 rounded min-w-[60px] text-center">
                            {String(timeLeft.minutes).padStart(2, '0')}m
                        </div>
                        <div className="bg-white text-[#33211D] px-3 py-2 rounded min-w-[60px] text-center">
                            {String(timeLeft.seconds).padStart(2, '0')}s
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {dealProducts.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <Link href={`/product/${product.id}`}>
                                <div className="relative overflow-hidden rounded-xl bg-[#F0F0F0] mb-4 aspect-[3/4]">
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
                                </div>
                            </Link>
                            <div>
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
            </section>
        </main>
    );
}
