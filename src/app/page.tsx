"use client";
import { useState } from "react";
import MagicMirror from "@/components/MagicMirror";
import ChatInterface from "@/components/ChatInterface";
import { catalog, Product } from "@/lib/catalog";
import { FastBrainAction } from "@/lib/fastBrain";
import { useRouter } from "next/navigation";

export default function Home() {
    const [products, setProducts] = useState<Product[]>(catalog);
    const router = useRouter();

    const handleFastAction = (action: FastBrainAction) => {
        switch (action.type) {
            case 'REDIRECT':
                console.log("Redirecting to:", action.payload);
                router.push(action.payload);
                break;
            case 'FILTER_PRODUCT':
                console.log("Filtering by:", action.payload);
                const filtered = catalog.filter(p =>
                    p.tags.includes(action.payload) ||
                    p.name.toLowerCase().includes(action.payload)
                );
                setProducts(filtered);
                break;
            case 'SHOW_MODAL':
                alert(`[FAST BRAIN REFLEX] Opening Modal: ${action.payload}`);
                break;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12 pb-24">
            <div className="space-y-4 max-w-2xl text-center animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-purple-300 mb-4">
                    ✨ AI-Powered Styling Engine
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Mirror, Mirror.
                </h1>
                <p className="text-lg text-gray-400 max-w-lg mx-auto">
                    Experience the intent-first shopping interface.
                </p>
            </div>

            <MagicMirror products={products} />

            {/* Floating Chat Interface */}
            <ChatInterface onFastAction={handleFastAction} />
        </div>
    );
}
