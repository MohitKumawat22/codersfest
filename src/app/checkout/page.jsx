"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CheckCircle, CreditCard, Truck, ShieldCheck, ArrowLeft } from "lucide-react";

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setIsOrderPlaced(true);
            clearCart();
        }, 2000);
    };

    if (isOrderPlaced) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4">
                <div className="text-center max-w-md mx-auto">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#33211D] mb-4">Order Placed Successfully!</h2>
                    <p className="text-gray-500 mb-8">Thank you for your purchase. We have sent a confirmation email to your inbox.</p>
                    <Link href="/" className="inline-flex items-center justify-center bg-[#33211D] text-white px-8 py-3 rounded-lg hover:bg-[#D4A373] transition-colors font-medium">
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4">
                <p className="text-gray-500 mb-4">Your cart is empty.</p>
                <Link href="/" className="text-[#D4A373] font-bold hover:underline">Go back to shop</Link>
            </main>
        );
    }

    const total = (cartTotal * 1.08).toFixed(2);

    return (
        <main className="min-h-screen bg-[#FDFDFD] py-12 md:py-20">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center space-x-2 mb-8 text-sm text-gray-500">
                    <Link href="/cart" className="hover:text-[#33211D] flex items-center"><ArrowLeft size={14} className="mr-1" /> Back to Cart</Link>
                    <span>/</span>
                    <span className="text-[#33211D] font-medium">Checkout</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Forms */}
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-[#33211D] mb-8">Checkout</h1>

                        <form onSubmit={handlePlaceOrder} className="space-y-8">
                            {/* Contact Information */}
                            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-[#33211D] mb-4 flex items-center gap-2">
                                    <div className="w-2 h-6 bg-[#D4A373] rounded-full"></div>
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-[#33211D] mb-4 flex items-center gap-2">
                                    <div className="w-2 h-6 bg-[#D4A373] rounded-full"></div>
                                    Shipping Address
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all" placeholder="John" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all" placeholder="Doe" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all" placeholder="123 Main St" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all" placeholder="New York" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all" placeholder="10001" />
                                    </div>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-[#33211D] mb-4 flex items-center gap-2">
                                    <div className="w-2 h-6 bg-[#D4A373] rounded-full"></div>
                                    Payment
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-4 border border-[#D4A373] bg-[#fffaf5] rounded-lg cursor-pointer">
                                        <div className="w-4 h-4 rounded-full border-4 border-[#D4A373]"></div>
                                        <CreditCard size={20} className="text-[#33211D]" />
                                        <span className="font-medium text-[#33211D]">Credit or Debit Card</span>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                        <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                                            <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all" placeholder="MM/YY" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                            <input type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all" placeholder="123" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-lg bg-[#33211D] text-white font-bold text-lg hover:bg-[#D4A373] transition-all transform hover:translate-y-[-2px] hover:shadow-lg ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Processing..." : `Pay $${total}`}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="hidden lg:block">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-bold text-[#33211D] mb-6">Your Order</h3>
                            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-50 last:border-0">
                                        <div className="relative">
                                            <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-gray-50" />
                                            <span className="absolute -top-2 -right-2 bg-[#D4A373] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-[#33211D]">{item.name}</h4>
                                            <p className="text-xs text-gray-500">{item.tag}</p>
                                        </div>
                                        <p className="text-sm font-bold text-[#33211D]">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tax</span>
                                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xl font-bold text-[#33211D] mt-6 pt-6 border-t border-gray-100">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>

                            <div className="mt-8 flex items-center gap-3 text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
                                <ShieldCheck size={16} />
                                <p>Secure SSL Encryption. 100% Safe Transaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
