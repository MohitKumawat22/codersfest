"use client";
import React, { useState, useEffect } from "react";
import ProductGrid from "@/components/ProductGrid";

const products = [
    { id: 1, name: "Wireless Headphones", price: 199.00, oldPrice: 250.00, rating: 4.8, image: "/p1.jpg", tag: "20% off", color: "bg-blue-100 text-blue-600", category: "electronics" },
    { id: 4, name: "Leather Travel Bag", price: 85.00, oldPrice: 130.00, rating: 4.6, image: "/p4.jpg", tag: "35% off", color: "bg-red-100 text-red-600", category: "fashion" },
    { id: 5, name: "Bluetooth Speaker", price: 59.00, oldPrice: 80.00, rating: 4.5, image: "/p5.jpg", tag: "Sale", color: "bg-purple-100 text-purple-600", category: "electronics" },
    { id: 12, name: "Modern Desk Lamp", price: 65.00, oldPrice: 90.00, rating: 4.5, image: "/p12.jpg", tag: "20% off", color: "bg-red-100 text-red-600", category: "home-living" },
];

export default function Deals() {
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

                <ProductGrid products={products} />
            </section>
        </main>
    );
}
