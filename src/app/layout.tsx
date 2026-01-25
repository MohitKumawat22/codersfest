import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Aura | Intelligent Fashion",
    description: "Your AI-powered personal stylist.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen flex flex-col relative selection:bg-purple-500/30">
                {/* Background Ambient Glow */}
                <div className="fixed inset-0 z-[-1] pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
                </div>

                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
