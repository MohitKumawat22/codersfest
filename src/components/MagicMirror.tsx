"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/catalog';
import ProductCard from './ProductCard';

interface MagicMirrorProps {
    products: Product[];
}

export default function MagicMirror({ products }: MagicMirrorProps) {
    const [wearing, setWearing] = useState<{ top?: Product; bottom?: Product; full?: Product }>({});

    const handleTryOn = (product: Product) => {
        if (product.category === 'full') {
            setWearing({ full: product });
        } else if (product.category === 'top') {
            setWearing(prev => ({ ...prev, top: product, full: undefined }));
        } else if (product.category === 'bottom') {
            setWearing(prev => ({ ...prev, bottom: product, full: undefined }));
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-6xl mx-auto">
            {/* The Mirror (Avatar Display) */}
            <div className="md:col-span-5 flex justify-center">
                <div className="relative w-[300px] h-[500px] rounded-3xl overflow-hidden glass-panel border-2 border-white/20 shadow-2xl">
                    {/* Background / Environment */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-80" />

                    {/* Base Avatar */}
                    <Image
                        src="https://placehold.co/400x600/222/FFF/png?text=Base+Avatar"
                        alt="Avatar"
                        fill
                        className="object-cover z-10"
                        unoptimized
                    />

                    {/* Clothing Layers */}
                    {wearing.full ? (
                        <div className="absolute inset-0 z-30">
                            <Image src={wearing.full.overlayImage} alt="Dress" fill className="object-cover" unoptimized />
                        </div>
                    ) : (
                        <>
                            {wearing.bottom && (
                                <div className="absolute inset-0 z-20">
                                    <Image src={wearing.bottom.overlayImage} alt="Bottom" fill className="object-cover" unoptimized />
                                </div>
                            )}
                            {wearing.top && (
                                <div className="absolute inset-0 z-30">
                                    <Image src={wearing.top.overlayImage} alt="Top" fill className="object-cover" unoptimized />
                                </div>
                            )}
                        </>
                    )}

                    {/* UI Overlay on Mirror */}
                    <div className="absolute bottom-4 left-0 right-0 text-center z-40">
                        <span className="bg-black/50 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-white/70">
                            Virtual Fitting Room
                        </span>
                    </div>
                </div>
            </div>

            {/* The Wardrobe (Catalog) */}
            <div className="md:col-span-7 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold">The Wardrobe</h2>
                    <p className="text-gray-400 text-sm">Select items to instantly visualize them on your avatar.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} onTryOn={handleTryOn} />
                    ))}
                </div>

                {/* Trust Badges - Visual Polish */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>Ollama Neural Core: <strong>Active</strong></span>
                    </div>
                    <div className="flex gap-4">
                        <span>Encrypted Privacy</span>
                        <span>•</span>
                        <span>Instant Reflex</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
