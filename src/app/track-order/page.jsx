"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Package, MapPin, Calendar } from "lucide-react";

export default function TrackOrder() {
    const [orderNumber, setOrderNumber] = useState("");
    const [email, setEmail] = useState("");
    const [tracking, setTracking] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setTracking({
                orderNumber: orderNumber,
                status: "In Transit",
                estimatedDelivery: "Jan 28, 2026",
                currentLocation: "Mumbai Distribution Center",
                timeline: [
                    { status: "Order Placed", date: "Jan 23, 2026 10:30 AM", completed: true },
                    { status: "Order Confirmed", date: "Jan 23, 2026 11:15 AM", completed: true },
                    { status: "Shipped", date: "Jan 24, 2026 2:00 PM", completed: true },
                    { status: "In Transit", date: "Jan 25, 2026 9:00 AM", completed: true, current: true },
                    { status: "Out for Delivery", date: "Jan 28, 2026", completed: false },
                    { status: "Delivered", date: "Jan 28, 2026", completed: false }
                ]
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#FDFBF7] py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Breadcrumb */}
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#33211D] mb-8 transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Package className="text-blue-600" size={32} />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-[#33211D] mb-4">Track Your Order</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Enter your order number and email to track your shipment in real-time
                    </p>
                </div>

                {/* Tracking Form */}
                <div className="bg-white p-8 rounded-2xl shadow-sm mb-8">
                    <form onSubmit={handleTrack} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Order Number</label>
                            <input
                                type="text"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none"
                                placeholder="e.g., ORD-123456789"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none"
                                placeholder="your@email.com"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#33211D] text-white py-4 rounded-lg font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <Search size={20} />
                            {loading ? "Tracking..." : "Track Order"}
                        </button>
                    </form>
                </div>

                {/* Tracking Results */}
                {tracking && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        {/* Order Summary */}
                        <div className="border-b border-gray-100 pb-6 mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Order Number</p>
                                    <p className="text-xl font-bold text-[#33211D]">{tracking.orderNumber}</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                                    <Package size={16} />
                                    <span className="font-bold text-sm">{tracking.status}</span>
                                </div>
                            </div>
                        </div>

                        {/* Current Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-[#D4A373] mt-1" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Current Location</p>
                                    <p className="font-bold text-[#33211D]">{tracking.currentLocation}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="text-[#D4A373] mt-1" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                                    <p className="font-bold text-[#33211D]">{tracking.estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            <div className="space-y-6">
                                {tracking.timeline.map((item, index) => (
                                    <div key={index} className="relative flex items-start gap-4">
                                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${item.completed
                                                ? item.current
                                                    ? 'bg-blue-600 ring-4 ring-blue-100'
                                                    : 'bg-green-600'
                                                : 'bg-gray-200'
                                            }`}>
                                            {item.completed && (
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <p className={`font-bold ${item.current ? 'text-blue-600' : item.completed ? 'text-[#33211D]' : 'text-gray-400'}`}>
                                                {item.status}
                                            </p>
                                            <p className="text-sm text-gray-500">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="flex-1 px-6 py-3 border-2 border-[#33211D] text-[#33211D] font-bold rounded-lg text-center hover:bg-[#33211D] hover:text-white transition-colors">
                                Contact Support
                            </Link>
                            <Link href="/returns" className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg text-center hover:bg-gray-200 transition-colors">
                                Return Item
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
