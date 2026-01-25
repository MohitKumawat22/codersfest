"use client";
import React from "react";
import ProductGrid from "@/components/ProductGrid";

const products = [
    { id: 3, name: "Premium Coffee Maker", price: 120.00, oldPrice: 150.00, rating: 4.7, image: "/p3.jpg", tag: "Best Seller", color: "bg-orange-100 text-orange-600", category: "home-living" },
    { id: 10, name: "Ceramic Vase Set", price: 40.00, oldPrice: 55.00, rating: 4.9, image: "/p10.jpg", tag: "New", color: "bg-green-100 text-green-600", category: "home-living" },
    { id: 11, name: "Soft Throw Blanket", price: 35.00, oldPrice: 50.00, rating: 4.6, image: "/p11.jpg", tag: "Cozy", color: "bg-blue-100 text-blue-600", category: "home-living" },
    { id: 12, name: "Modern Desk Lamp", price: 65.00, oldPrice: 90.00, rating: 4.5, image: "/p12.jpg", tag: "20% off", color: "bg-red-100 text-red-600", category: "home-living" },
];

export default function HomeLiving() {
    return (
        <main className="min-h-screen bg-white">
            <div className="bg-[#FAF9F6] py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-4">Home & Living</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Create your dream home with our collection of furniture, decor, and essentials.</p>
            </div>

            <section className="py-16 max-w-screen-xl mx-auto px-4">
                <ProductGrid products={products} />
            </section>
        </main>
    );
}
