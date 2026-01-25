import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full h-16 border-b border-white/10 glass-panel sticky top-0 z-50">
            <div className="container mx-auto h-full flex items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter aura-gradient-text">
                    AURA
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                    <Link href="/stylist" className="hover:text-white transition-colors text-white">AI Stylist</Link>
                    <Link href="/about" className="hover:text-white transition-colors">About</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="text-sm text-gray-400 hover:text-white transition-colors">
                        Search
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs">
                            JD
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
