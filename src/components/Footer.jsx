"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Shield } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#33211D] text-white">
            {/* Main Footer */}
            <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-white text-[#33211D] rounded-full p-1 w-10 h-10 flex items-center justify-center font-bold font-serif">A</div>
                            <span className="text-2xl font-bold font-serif">Apna Store.</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-6 max-w-sm leading-relaxed">
                            Your trusted destination for premium electronics, fashion, and home essentials. Shop with confidence, backed by our 30-day return guarantee.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/electronics" className="text-gray-300 hover:text-[#D4A373] transition-colors">Electronics</Link></li>
                            <li><Link href="/fashion" className="text-gray-300 hover:text-[#D4A373] transition-colors">Fashion</Link></li>
                            <li><Link href="/home-living" className="text-gray-300 hover:text-[#D4A373] transition-colors">Home & Living</Link></li>
                            <li><Link href="/beauty" className="text-gray-300 hover:text-[#D4A373] transition-colors">Beauty</Link></li>
                            <li><Link href="/deals" className="text-gray-300 hover:text-[#D4A373] transition-colors">Deals</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="text-gray-300 hover:text-[#D4A373] transition-colors">Contact Us</Link></li>
                            <li><Link href="/track-order" className="text-gray-300 hover:text-[#D4A373] transition-colors">Track Order</Link></li>
                            <li><Link href="/returns" className="text-gray-300 hover:text-[#D4A373] transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/shipping" className="text-gray-300 hover:text-[#D4A373] transition-colors">Shipping Info</Link></li>
                            <li><Link href="/faq" className="text-gray-300 hover:text-[#D4A373] transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy-policy" className="text-gray-300 hover:text-[#D4A373] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-300 hover:text-[#D4A373] transition-colors">Terms of Service</Link></li>
                            <li><Link href="/cookie-policy" className="text-gray-300 hover:text-[#D4A373] transition-colors">Cookie Policy</Link></li>
                            <li><Link href="/accessibility" className="text-gray-300 hover:text-[#D4A373] transition-colors">Accessibility</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="border-t border-white/10 pt-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-[#D4A373]" />
                            <div>
                                <p className="text-gray-400 text-xs">Call Us</p>
                                <p className="font-medium">(406) 555-0120</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-[#D4A373]" />
                            <div>
                                <p className="text-gray-400 text-xs">Email</p>
                                <p className="font-medium">support@apnastore.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-[#D4A373]" />
                            <div>
                                <p className="text-gray-400 text-xs">Address</p>
                                <p className="font-medium">123 Commerce St, Mumbai</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Badges */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                            <Shield size={16} className="text-green-400" />
                            <span className="text-xs font-medium">SSL Secured</span>
                        </div>
                        <div className="px-4 py-2 bg-white/10 rounded-lg">
                            <span className="text-xs font-medium">PCI-DSS Certified</span>
                        </div>
                        <div className="px-4 py-2 bg-white/10 rounded-lg">
                            <span className="text-xs font-medium">ISO 27001</span>
                        </div>
                        <div className="px-4 py-2 bg-white/10 rounded-lg">
                            <span className="text-xs font-medium">GDPR Compliant</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-screen-xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>© 2026 Apna Store. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/sitemap" className="hover:text-[#D4A373] transition-colors">Sitemap</Link>
                            <Link href="/careers" className="hover:text-[#D4A373] transition-colors">Careers</Link>
                            <Link href="/press" className="hover:text-[#D4A373] transition-colors">Press</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
