"use client";
import React from "react";
import ProductGrid from "@/components/ProductGrid";

const products = [
    { id: 1, name: "Wireless Headphones", price: 199.00, oldPrice: 250.00, rating: 4.8, image: "/p1.jpg", tag: "20% off", color: "bg-blue-100 text-blue-600", category: "electronics" },
    { id: 2, name: "Smart Watch Series 5", price: 299.00, oldPrice: 350.00, rating: 4.9, image: "/p2.jpg", tag: "New", color: "bg-green-100 text-green-600", category: "electronics" },
    { id: 5, name: "Bluetooth Speaker", price: 59.00, oldPrice: 80.00, rating: 4.5, image: "/p5.jpg", tag: "Sale", color: "bg-purple-100 text-purple-600", category: "electronics" },
    { id: 6, name: "Noise Cancelling Earbuds", price: 149.00, oldPrice: 199.00, rating: 4.7, image: "/p6.jpg", tag: "Hot", color: "bg-red-100 text-red-600", category: "electronics" },
];

export default function Electronics() {
    return (
        <main className="min-h-screen bg-white">
            <div className="bg-[#FAF9F6] py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-4">Electronics & Gadgets</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Discover the latest technology, from smartphones to smart home devices.</p>
            </div>

            <section className="py-16 max-w-screen-xl mx-auto px-4">
                <ProductGrid products={products} />
            </section>
        </main>
    );
}
