"use client";
import React from "react";
import ProductGrid from "@/components/ProductGrid";

export default function Beauty() {
    const products = [
        { id: 13, name: "Organic Face Serum", price: 35.00, oldPrice: 50.00, rating: 4.9, image: "/images/face-serum.png", tag: "Natural", color: "bg-green-100 text-green-600", category: "beauty", description: "Revitalize your skin with our Organic Face Serum, crafted with 100% natural ingredients to boost hydration and reduce signs of aging." },
        { id: 14, name: "Matte Lipstick Set", price: 25.00, oldPrice: 40.00, rating: 4.8, image: "/images/lipstick-set.png", tag: "Hot", color: "bg-red-100 text-red-600", category: "beauty", description: "A collection of long-lasting, highly pigmented matte lipsticks in everyday shades." },
        { id: 15, name: "Perfume Collection", price: 80.00, oldPrice: 120.00, rating: 4.7, image: "/images/perfume-collection.png", tag: "Luxury", color: "bg-purple-100 text-purple-600", category: "beauty", description: "Experience luxury with our curated perfume collection, featuring exotic and timeless scents." },
        { id: 16, name: "Hydrating Moisturizer", price: 28.00, oldPrice: 35.00, rating: 4.6, image: "/images/moisturizer.png", tag: "Daily Use", color: "bg-blue-100 text-blue-600", category: "beauty", description: "Keep your skin soft and supple all day long with this lightweight, non-greasy hydrating moisturizer." },
    ];

    return (
        <main className="min-h-screen bg-white">
            <div className="bg-[#FAF9F6] py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-4">Beauty & Personal Care</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Explore top-rated skincare, makeup, and fragrances.</p>
            </div>

            <section className="py-16 max-w-screen-xl mx-auto px-4">
                <ProductGrid products={products} />
            </section>
        </main>
    );
}
