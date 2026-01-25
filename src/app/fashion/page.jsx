"use client";
import React from "react";
import ProductGrid from "@/components/ProductGrid";

const products = [
    { id: 4, name: "Leather Travel Bag", price: 85.00, oldPrice: 130.00, rating: 4.6, image: "/p4.jpg", tag: "35% off", color: "bg-red-100 text-red-600", category: "fashion" },
    { id: 7, name: "Summer Floral Dress", price: 45.00, oldPrice: 60.00, rating: 4.8, image: "/p7.jpg", tag: "New", color: "bg-green-100 text-green-600", category: "fashion" },
    { id: 8, name: "Classic Denim Jacket", price: 75.00, oldPrice: 95.00, rating: 4.7, image: "/p8.jpg", tag: "Trending", color: "bg-blue-100 text-blue-600", category: "fashion" },
    { id: 9, name: "Running Sneakers", price: 110.00, oldPrice: 150.00, rating: 4.5, image: "/p9.jpg", tag: "Sale", color: "bg-orange-100 text-orange-600", category: "fashion" },
];

export default function Fashion() {
    return (
        <main className="min-h-screen bg-white">
            <div className="bg-[#FAF9F6] py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-4">Fashion & Apparel</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Upgrade your wardrobe with the latest trends for men, women, and kids.</p>
            </div>

            <section className="py-16 max-w-screen-xl mx-auto px-4">
                <ProductGrid products={products} />
            </section>
        </main>
    );
}
