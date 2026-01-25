"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold text-[#33211D] mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link href="/" className="inline-flex items-center justify-center bg-[#33211D] text-white px-8 py-3 rounded-lg hover:bg-[#D4A373] transition-colors font-medium">
                        Start Shopping <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white py-12 md:py-20">
            <div className="max-w-screen-xl mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#33211D] mb-12 text-center">Your Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 md:gap-6 p-4 md:p-6 bg-[#FAF9F6] rounded-xl relative group">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg flex-shrink-0 overflow-hidden">
                                    {/* Fallback image if product image is not real path or check logic later */}
                                    <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg text-[#33211D]">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1">{item.tag || "Product"}</p>
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center space-x-3 bg-white rounded-lg p-1 border border-gray-100">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#33211D] disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-[#33211D] font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#33211D]"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-[#33211D]">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#FAF9F6] p-6 md:p-8 rounded-xl sticky top-24">
                            <h2 className="text-xl font-bold text-[#33211D] mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax estimate</span>
                                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-8">
                                <div className="flex justify-between items-center text-lg font-bold text-[#33211D]">
                                    <span>Total</span>
                                    <span>${(cartTotal * 1.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="w-full flex items-center justify-center bg-[#33211D] text-white py-4 rounded-lg hover:bg-[#D4A373] transition-all transform active:scale-95 font-medium shadow-md hover:shadow-lg">
                                Proceed to Checkout
                            </Link>

                            <button onClick={clearCart} className="w-full mt-3 text-sm text-gray-500 hover:text-red-500 transition-colors">
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
