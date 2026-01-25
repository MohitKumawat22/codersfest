"use client";
import React, { useEffect } from 'react';
import { X, ShoppingCart, Star, Maximize2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    rating?: number;
    image: string;
    tag?: string;
    description?: string;
    color?: string;
}

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export default function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
    const { addToCart } = useCart();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        addToCart(product);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white hover:bg-gray-100 rounded-full shadow-md transition-colors"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    {/* Image */}
                    <div className="relative">
                        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {product.tag && (
                            <div className={`absolute top-4 left-4 ${product.color || 'bg-blue-100 text-blue-600'} text-xs font-bold px-3 py-1 rounded-full uppercase`}>
                                {product.tag}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-serif font-bold text-[#33211D] mb-4">
                            {product.name}
                        </h2>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-[#33211D]">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.oldPrice && (
                                <span className="text-xl text-gray-400 line-through">
                                    ${product.oldPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {product.rating && (
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill={i < Math.floor(product.rating!) ? "currentColor" : "none"}
                                            className={i < Math.floor(product.rating!) ? "" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">{product.rating} / 5</span>
                            </div>
                        )}

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {product.description || "High-quality product designed to meet your needs. Experience excellence with every use."}
                        </p>

                        <div className="flex gap-3 mt-auto">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#33211D] text-white py-4 rounded-xl font-bold hover:bg-[#D4A373] transition-all transform active:scale-95"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <Link
                                href={`/product/${product.id}`}
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 border-2 border-[#33211D] text-[#33211D] px-6 py-4 rounded-xl font-bold hover:bg-[#33211D] hover:text-white transition-all"
                                aria-label="View full details"
                            >
                                <Maximize2 size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
