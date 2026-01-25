"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import QuickViewModal from "@/components/QuickViewModal";

export default function ProductGrid({ products }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                        <Link href={`/product/${product.id}`}>
                            <div className="relative overflow-hidden rounded-xl bg-[#F0F0F0] mb-4 aspect-[3/4]">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                {product.tag && (
                                    <div className={`absolute top-3 left-3 ${product.color} text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide`}>
                                        {product.tag}
                                    </div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(product);
                                    }}
                                    className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 z-10 ${isInWishlist(product.id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                                        }`}
                                    aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                                >
                                    <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                                </button>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-10">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                        }}
                                        className="p-3 bg-white hover:bg-[#33211D] hover:text-white rounded-lg shadow-lg transition-colors"
                                        aria-label="Add to cart"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setQuickViewProduct(product);
                                        }}
                                        className="p-3 bg-white hover:bg-[#33211D] hover:text-white rounded-lg shadow-lg transition-colors"
                                        aria-label="Quick view"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </div>
                            </div>
                        </Link>
                        <div>
                            <Link href={`/product/${product.id}`}>
                                <h3 className="font-bold text-[#171717] group-hover:text-[#D4A373] transition-colors mb-2">
                                    {product.name}
                                </h3>
                            </Link>
                            <div className="flex items-center space-x-2">
                                <span className="font-bold text-[#171717]">${product.price.toFixed(2)}</span>
                                {product.oldPrice && (
                                    <span className="text-gray-400 text-sm line-through">${product.oldPrice.toFixed(2)}</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <QuickViewModal
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
                product={quickViewProduct}
            />
        </>
    );
}
