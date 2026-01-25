"use client";
import React from "react";
import { Shield, Lock, Award, RefreshCw, Headset, Truck } from "lucide-react";

export default function TrustBadges() {
    const badges = [
        {
            icon: Shield,
            title: "Secure Payments",
            description: "256-bit SSL Encryption",
            color: "text-green-600 bg-green-50"
        },
        {
            icon: Lock,
            title: "PCI-DSS Certified",
            description: "Payment Card Industry Compliant",
            color: "text-blue-600 bg-blue-50"
        },
        {
            icon: Award,
            title: "Verified Reviews",
            description: "100% Authentic Customer Feedback",
            color: "text-purple-600 bg-purple-50"
        },
        {
            icon: RefreshCw,
            title: "Easy Returns",
            description: "30-Day Money Back Guarantee",
            color: "text-orange-600 bg-orange-50"
        },
        {
            icon: Headset,
            title: "24/7 Support",
            description: "Always Here to Help",
            color: "text-indigo-600 bg-indigo-50"
        },
        {
            icon: Truck,
            title: "Free Shipping",
            description: "On Orders Above $150",
            color: "text-teal-600 bg-teal-50"
        }
    ];

    return (
        <section className="py-12 bg-white border-t border-b border-gray-100">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#33211D] mb-2">
                        Shop with Confidence
                    </h2>
                    <p className="text-gray-500 text-sm">Your security and satisfaction are our top priorities</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-4 rounded-xl hover:shadow-md transition-all duration-300 group"
                        >
                            <div className={`${badge.color} p-3 rounded-full mb-3 group-hover:scale-110 transition-transform`}>
                                <badge.icon size={24} />
                            </div>
                            <h3 className="font-bold text-sm text-[#33211D] mb-1">{badge.title}</h3>
                            <p className="text-xs text-gray-500 leading-tight">{badge.description}</p>
                        </div>
                    ))}
                </div>

                {/* Payment Methods */}
                <div className="mt-12 pt-8 border-t border-gray-100">
                    <p className="text-center text-xs text-gray-500 uppercase tracking-wider mb-4">Accepted Payment Methods</p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-sm font-bold text-gray-700">💳 Credit/Debit Cards</span>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-sm font-bold text-gray-700">📱 UPI</span>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-sm font-bold text-gray-700">👛 Digital Wallets</span>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-sm font-bold text-gray-700">💵 Cash on Delivery</span>
                        </div>
                        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-sm font-bold text-gray-700">🏦 Net Banking</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
