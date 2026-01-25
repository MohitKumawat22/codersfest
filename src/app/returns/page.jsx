"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Package, RefreshCw, Clock, Shield } from "lucide-react";

export default function Returns() {
    return (
        <main className="min-h-screen bg-white py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Breadcrumb */}
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#33211D] mb-8 transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <RefreshCw className="text-green-600" size={32} />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-[#33211D] mb-4">Returns & Refunds Policy</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#FAF9F6] p-6 rounded-xl text-center">
                        <Clock className="mx-auto mb-3 text-[#D4A373]" size={32} />
                        <h3 className="font-bold text-[#33211D] mb-1">30 Days</h3>
                        <p className="text-sm text-gray-500">Return Window</p>
                    </div>
                    <div className="bg-[#FAF9F6] p-6 rounded-xl text-center">
                        <Package className="mx-auto mb-3 text-[#D4A373]" size={32} />
                        <h3 className="font-bold text-[#33211D] mb-1">Free Returns</h3>
                        <p className="text-sm text-gray-500">No Questions Asked</p>
                    </div>
                    <div className="bg-[#FAF9F6] p-6 rounded-xl text-center">
                        <Shield className="mx-auto mb-3 text-[#D4A373]" size={32} />
                        <h3 className="font-bold text-[#33211D] mb-1">Full Refund</h3>
                        <p className="text-sm text-gray-500">Money Back Guarantee</p>
                    </div>
                </div>

                {/* Policy Content */}
                <div className="prose prose-lg max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Return Eligibility</h2>
                        <p className="text-gray-600 mb-4">
                            You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error.
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Items must be in original condition and packaging</li>
                            <li>All tags and labels must be attached</li>
                            <li>Include all accessories and documentation</li>
                            <li>Electronics must be in original sealed packaging</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">How to Return</h2>
                        <div className="bg-[#FAF9F6] p-6 rounded-xl">
                            <ol className="list-decimal pl-6 text-gray-600 space-y-3">
                                <li><strong>Initiate Return:</strong> Log into your account and go to "My Orders"</li>
                                <li><strong>Select Item:</strong> Choose the item you wish to return and select reason</li>
                                <li><strong>Print Label:</strong> Download and print the prepaid return shipping label</li>
                                <li><strong>Pack Securely:</strong> Pack the item securely in original packaging</li>
                                <li><strong>Ship It:</strong> Drop off at any authorized shipping location</li>
                            </ol>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Refund Process</h2>
                        <p className="text-gray-600 mb-4">
                            Once we receive your return, we'll inspect it and process your refund within 5-7 business days. The refund will be credited to your original payment method.
                        </p>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                            <p className="text-sm text-blue-900">
                                <strong>Note:</strong> Depending on your bank or card issuer, it may take an additional 3-5 business days for the refund to appear in your account.
                            </p>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Non-Returnable Items</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Personalized or custom-made items</li>
                            <li>Intimate apparel and swimwear</li>
                            <li>Beauty and personal care products (if opened)</li>
                            <li>Digital downloads and gift cards</li>
                            <li>Final sale items marked as non-returnable</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Exchanges</h2>
                        <p className="text-gray-600 mb-4">
                            We currently don't offer direct exchanges. If you need a different size or color, please return the original item and place a new order.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Damaged or Defective Items</h2>
                        <p className="text-gray-600 mb-4">
                            If you receive a damaged or defective item, please contact us immediately at <a href="mailto:support@apnastore.com" className="text-[#D4A373] hover:underline">support@apnastore.com</a> with photos of the damage. We'll arrange for a replacement or full refund at no cost to you.
                        </p>
                    </section>
                </div>

                {/* CTA */}
                <div className="bg-[#33211D] text-white p-8 rounded-2xl text-center mt-12">
                    <h3 className="text-2xl font-serif font-bold mb-4">Need Help?</h3>
                    <p className="mb-6">Our customer service team is here to assist you with any questions about returns or refunds.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="px-8 py-3 bg-white text-[#33211D] font-bold rounded-full hover:bg-gray-100 transition-colors">
                            Contact Support
                        </Link>
                        <Link href="/track-order" className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#33211D] transition-colors">
                            Track Your Return
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
