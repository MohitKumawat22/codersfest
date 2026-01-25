"use client";
import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingCart, ArrowRight, Heart } from "lucide-react";

export default function Wishlist() {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    if (wishlist.length === 0) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart size={40} className="text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#33211D] mb-4">Your Wishlist is Empty</h2>
                    <p className="text-gray-500 mb-8">Save your favorite items for later!</p>
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
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#33211D]">My Wishlist</h1>
                    <button
                        onClick={clearWishlist}
                        className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                    >
                        Clear All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="group relative border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                            <Link href={`/product/${item.id}`}>
                                <div className="aspect-square bg-gray-50 overflow-hidden">
                                    <img src={item.image || "/placeholder.jpg"} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                            </Link>

                            <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="absolute top-3 right-3 p-2 bg-white rounded-full text-red-500 hover:bg-red-500 hover:text-white shadow-md transition-colors z-10"
                                aria-label="Remove from wishlist"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="p-4">
                                <h3 className="font-bold text-[#33211D] mb-2 hover:text-[#D4A373] transition-colors cursor-pointer">{item.name}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="font-bold text-lg text-[#33211D]">${item.price.toFixed(2)}</span>
                                    {item.oldPrice && (
                                        <span className="text-sm text-gray-400 line-through">${item.oldPrice.toFixed(2)}</span>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="w-full flex items-center justify-center gap-2 bg-[#33211D] text-white py-2 rounded-lg hover:bg-[#D4A373] transition-colors text-sm font-medium"
                                >
                                    <ShoppingCart size={16} />
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
