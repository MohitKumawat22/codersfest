"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Top Notification Bar */}
            <div className="bg-[#33211D] text-white text-[10px] md:text-xs py-2 px-4 flex justify-between items-center w-full z-50 relative">
                <span className="hidden md:block">Support: (406) 555-0120</span>
                <span className="mx-auto md:mx-0">Sign up and <span className="font-bold text-[#D4A373]">GET 20% OFF</span> for your first order. <Link href="#" className="underline hover:text-[#D4A373]">Sign up now</Link></span>
                <span className="cursor-pointer hidden md:block">×</span>
            </div>

            <nav className="sticky top-0 z-40 bg-white border-b border-gray-100">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-4 md:py-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-[#33211D] text-white rounded-full p-1 w-8 h-8 flex items-center justify-center font-bold font-serif">A</div>
                        <span className="self-center text-2xl font-bold whitespace-nowrap text-[#33211D] font-serif tracking-tight">
                            Apna Store.
                        </span>
                    </Link>

                    {/* Icons (Mobile & Desktop) */}
                    <div className="flex items-center md:order-2 space-x-4 md:space-x-6">
                        <button className="text-gray-600 hover:text-[#33211D] transition-colors"><Search size={20} /></button>
                        <button className="hidden md:block text-gray-600 hover:text-[#33211D] transition-colors"><Heart size={20} /></button>
                        <button className="text-gray-600 hover:text-[#33211D] transition-colors relative">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-2 -right-2 bg-[#33211D] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
                        </button>
                        <button className="hidden md:block text-gray-600 hover:text-[#33211D] transition-colors"><User size={20} /></button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Main Menu */}
                    <div
                        className={`${isOpen ? "block" : "hidden"
                            } items-center justify-between w-full md:flex md:w-auto md:order-1`}
                    >
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white text-sm uppercase tracking-wide">
                            <li>
                                <Link href="/" className="block py-2 px-3 text-[#33211D] bg-gray-100 rounded md:bg-transparent md:p-0 font-bold" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="#" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#33211D] md:p-0">Shop</Link>
                            </li>
                            <li>
                                <Link href="#" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#33211D] md:p-0">Women</Link>
                            </li>
                            <li>
                                <Link href="#" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#33211D] md:p-0">Men</Link>
                            </li>
                            <li>
                                <Link href="#" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#33211D] md:p-0">Accessories</Link>
                            </li>
                            <li>
                                <Link href="#" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#33211D] md:p-0">About Us</Link>
                            </li>
                            <li>
                                <Link href="#" className="block py-2 px-3 text-gray-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#33211D] md:p-0">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
