"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Heart, Eye } from "lucide-react";

const products = [
    { id: 1, name: "Wireless Headphones", price: 199.00, oldPrice: 250.00, rating: 4.8, image: "/p1.jpg", tag: "20% off", color: "bg-blue-100 text-blue-600" },
    { id: 2, name: "Smart Watch Series 5", price: 299.00, oldPrice: 350.00, rating: 4.9, image: "/p2.jpg", tag: "New", color: "bg-green-100 text-green-600" },
    { id: 5, name: "Bluetooth Speaker", price: 59.00, oldPrice: 80.00, rating: 4.5, image: "/p5.jpg", tag: "Sale", color: "bg-purple-100 text-purple-600" },
    { id: 6, name: "Noise Cancelling Earbuds", price: 149.00, oldPrice: 199.00, rating: 4.7, image: "/p6.jpg", tag: "Hot", color: "bg-red-100 text-red-600" },
];

export default function Electronics() {
    return (
        <main className="min-h-screen bg-white">
            <div className="bg-[#FAF9F6] py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-4">Electronics & Gadgets</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Discover the latest technology, from smartphones to smart home devices.</p>
            </div>

            <section className="py-16 max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl bg-[#F0F0F0] mb-4 aspect-[3/4]">
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
                                    <button className="p-3 bg-white hover:bg-[#33211D] hover:text-white rounded-lg shadow-lg transition-colors">
                                        <Eye size={18} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#171717] group-hover:text-[#D4A373] transition-colors mb-2">{product.name}</h3>
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
