"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { products } from '@/lib/data';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialQuery?: string;
}

export default function SearchModal({ isOpen, onClose, initialQuery = '' }: SearchModalProps) {
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState(products);
    const inputRef = useRef<HTMLInputElement>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
            // Set initial query when modal opens
            if (initialQuery) {
                setQuery(initialQuery);
            }
        } else {
            document.body.style.overflow = 'unset';
            setQuery('');
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, initialQuery]);

    useEffect(() => {
        if (query.trim()) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                (p.category && p.category.toLowerCase().includes(query.toLowerCase()))
            );
            setResults(filtered);
        } else {
            setResults(products);
        }
    }, [query]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 pt-20">
            <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-top-10 duration-300">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <SearchIcon className="text-gray-400" size={24} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="flex-1 text-lg outline-none placeholder-gray-400"
                        />
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Close search"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto p-6">
                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {results.slice(0, 9).map((product) => (
                                <div key={product.id} className="group border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <Link href={`/product/${product.id}`} onClick={onClose}>
                                        <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center text-gray-300">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                        <h3 className="font-bold text-sm text-[#33211D] group-hover:text-[#D4A373] transition-colors mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-lg font-bold text-[#33211D]">${product.price.toFixed(2)}</p>
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                        }}
                                        className="w-full mt-3 bg-[#33211D] text-white py-2 rounded-lg hover:bg-[#D4A373] transition-colors text-sm font-medium"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">No products found for "{query}"</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {results.length > 0 && (
                    <div className="p-4 border-t border-gray-100 text-center text-sm text-gray-500">
                        Showing {Math.min(9, results.length)} of {results.length} results
                    </div>
                )}
            </div>
        </div>
    );
}
