import Image from 'next/image';
import { Product } from '@/lib/catalog';

interface ProductCardProps {
    product: Product;
    onTryOn: (product: Product) => void;
}

export default function ProductCard({ product, onTryOn }: ProductCardProps) {
    return (
        <div className="glass-panel rounded-xl p-4 flex flex-col items-center gap-4 hover:bg-white/5 transition-colors group">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    unoptimized // using external placeholders
                />
            </div>
            <div className="text-center w-full">
                <h3 className="font-bold text-sm truncate">{product.name}</h3>
                <p className="text-xs text-gray-400">${product.price}</p>
            </div>
            <button
                onClick={() => onTryOn(product)}
                className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
            >
                Try On
            </button>
        </div>
    );
}
