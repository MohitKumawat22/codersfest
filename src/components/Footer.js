"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ShieldCheck, Lock } from "lucide-react";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email && email.includes("@")) {
            setSubscribed(true);
            setEmail("");
            setTimeout(() => setSubscribed(false), 3000);
        }
    };
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand & Trust */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-[#33211D] text-white rounded-full p-1 w-8 h-8 flex items-center justify-center font-bold font-serif">A</div>
                            <span className="self-center text-2xl font-bold whitespace-nowrap text-[#33211D] font-serif tracking-tight">
                                Apna Store.
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Your ultimate destination for all your needs. Quality products, best prices, and exceptional service.
                        </p>
                        <div className="flex items-center space-x-4 text-gray-400">
                            <Link href="#" className="hover:text-[#33211D] transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-[#33211D] transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-[#33211D] transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-[#33211D] transition-colors"><Linkedin size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links - Workflows */}
                    <div>
                        <h4 className="font-bold text-[#33211D] mb-6">Customer Care</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">Track Your Order</Link></li>
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">Cancellation Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">Shipping Info</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-[#33211D] mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="#" className="hover:text-[#33211D] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Security & Newsletter */}
                    <div>
                        <h4 className="font-bold text-[#33211D] mb-6">Secure Shopping</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                            <ShieldCheck size={18} className="text-green-600" />
                            <span>SSL Encrypted Connection</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                            <Lock size={18} className="text-green-600" />
                            <span>PCI-DSS Compliant Payment</span>
                        </div>

                        <h4 className="font-bold text-[#33211D] mb-4">Stay in loop</h4>
                        {subscribed && (
                            <p className="text-green-600 text-sm mb-2">✓ Subscribed successfully!</p>
                        )}
                        <form onSubmit={handleSubscribe} className="flex">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-l-md focus:ring-[#33211D] focus:border-[#33211D] block w-full p-2.5 outline-none"
                                required
                            />
                            <button type="submit" className="bg-[#33211D] text-white px-4 rounded-r-md text-sm font-medium hover:bg-black transition-colors">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center bg-[#FAF9F6] p-4 rounded-lg">
                    <p className="text-xs text-gray-400 mb-4 md:mb-0">
                        &copy; 2026 Apna Store. All rights reserved.
                    </p>
                    {/* Payment Badges (Simulated with text/divs for minimalism) */}
                    <div className="flex items-center space-x-3">
                        <div className="h-8 w-12 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">VISA</div>
                        <div className="h-8 w-12 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">MC</div>
                        <div className="h-8 w-12 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">AMEX</div>
                        <div className="h-8 w-12 bg-white border border-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">PAYPAL</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
