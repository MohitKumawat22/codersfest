"use client";
import React, { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function Profile() {
    const { wishlist } = useWishlist();
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <main className="min-h-screen bg-[#FDFDFD] py-12 md:py-20">
            <div className="max-w-screen-xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#33211D] mb-8">My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-20 h-20 bg-[#33211D] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                                    JD
                                </div>
                                <h3 className="font-bold text-[#33211D]">John Doe</h3>
                                <p className="text-sm text-gray-500">john.doe@example.com</p>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "profile" ? "bg-[#33211D] text-white" : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <User size={18} />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "orders" ? "bg-[#33211D] text-white" : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    <Package size={18} />
                                    <span>Orders</span>
                                </button>
                                <Link
                                    href="/wishlist"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    <Heart size={18} />
                                    <span>Wishlist ({wishlist.length})</span>
                                </Link>
                            </nav>

                            <button className="w-full mt-6 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 px-4 py-3 rounded-lg transition-colors">
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        {activeTab === "profile" && (
                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-[#33211D] mb-6">Profile Information</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                defaultValue="John"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                defaultValue="Doe"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Mail className="inline mr-2" size={16} />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="john.doe@example.com"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Phone className="inline mr-2" size={16} />
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            defaultValue="+1 (406) 555-0120"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <MapPin className="inline mr-2" size={16} />
                                            Address
                                        </label>
                                        <textarea
                                            rows="3"
                                            defaultValue="123 Main Street, New York, NY 10001"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full md:w-auto bg-[#33211D] text-white px-8 py-3 rounded-lg hover:bg-[#D4A373] transition-colors font-medium"
                                    >
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-[#33211D] mb-6">Order History</h2>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((order) => (
                                        <div key={order} className="border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-bold text-[#33211D]">Order #{10000 + order}</h3>
                                                    <p className="text-sm text-gray-500">Placed on Jan {15 + order}, 2026</p>
                                                </div>
                                                <span className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">
                                                    Delivered
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">3 items • Total: $249.00</p>
                                            <button className="text-[#D4A373] font-medium text-sm hover:underline">
                                                View Details
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
