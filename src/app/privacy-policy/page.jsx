"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white py-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Breadcrumb */}
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#33211D] mb-8 transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Shield className="text-blue-600" size={32} />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-[#33211D] mb-4">Privacy Policy</h1>
                    <p className="text-gray-500">Last updated: January 25, 2026</p>
                </div>

                {/* Quick Links */}
                <div className="bg-[#FAF9F6] p-6 rounded-xl mb-12">
                    <h3 className="font-bold text-[#33211D] mb-4">Quick Navigation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <a href="#collection" className="text-[#D4A373] hover:underline">Information We Collect</a>
                        <a href="#usage" className="text-[#D4A373] hover:underline">How We Use Your Data</a>
                        <a href="#sharing" className="text-[#D4A373] hover:underline">Data Sharing</a>
                        <a href="#security" className="text-[#D4A373] hover:underline">Security Measures</a>
                        <a href="#rights" className="text-[#D4A373] hover:underline">Your Rights</a>
                        <a href="#cookies" className="text-[#D4A373] hover:underline">Cookie Policy</a>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none space-y-8">
                    <section id="introduction">
                        <p className="text-gray-600 leading-relaxed">
                            At Apna Store, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully.
                        </p>
                    </section>

                    <section id="collection">
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="text-[#D4A373]" size={24} />
                            <h2 className="text-2xl font-serif font-bold text-[#33211D] m-0">Information We Collect</h2>
                        </div>
                        <h3 className="text-xl font-bold text-[#33211D] mt-6 mb-3">Personal Information</h3>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Name, email address, and phone number</li>
                            <li>Billing and shipping addresses</li>
                            <li>Payment information (processed securely through our payment partners)</li>
                            <li>Order history and preferences</li>
                        </ul>

                        <h3 className="text-xl font-bold text-[#33211D] mt-6 mb-3">Automatically Collected Information</h3>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>IP address and browser type</li>
                            <li>Device information and operating system</li>
                            <li>Pages visited and time spent on site</li>
                            <li>Referring website addresses</li>
                        </ul>
                    </section>

                    <section id="usage">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="text-[#D4A373]" size={24} />
                            <h2 className="text-2xl font-serif font-bold text-[#33211D] m-0">How We Use Your Information</h2>
                        </div>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Process and fulfill your orders</li>
                            <li>Send order confirmations and shipping updates</li>
                            <li>Provide customer support</li>
                            <li>Personalize your shopping experience</li>
                            <li>Send promotional emails (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Prevent fraud and enhance security</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section id="sharing">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="text-[#D4A373]" size={24} />
                            <h2 className="text-2xl font-serif font-bold text-[#33211D] m-0">Information Sharing</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Service Providers:</strong> Payment processors, shipping companies, and email service providers</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
                        </ul>
                    </section>

                    <section id="security">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Security Measures</h2>
                        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
                            <p className="text-gray-700">
                                We implement industry-standard security measures including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
                                <li>256-bit SSL encryption for all transactions</li>
                                <li>PCI-DSS compliance for payment processing</li>
                                <li>Regular security audits and penetration testing</li>
                                <li>Secure data centers with 24/7 monitoring</li>
                                <li>Employee training on data protection</li>
                            </ul>
                        </div>
                    </section>

                    <section id="rights">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Your Rights (GDPR Compliance)</h2>
                        <p className="text-gray-600 mb-4">You have the right to:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                            <li><strong>Erasure:</strong> Request deletion of your data</li>
                            <li><strong>Portability:</strong> Receive your data in a structured format</li>
                            <li><strong>Objection:</strong> Object to processing of your data</li>
                            <li><strong>Withdraw Consent:</strong> Opt-out of marketing communications</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                            To exercise these rights, contact us at <a href="mailto:privacy@apnastore.com" className="text-[#D4A373] hover:underline">privacy@apnastore.com</a>
                        </p>
                    </section>

                    <section id="cookies">
                        <div className="flex items-center gap-3 mb-4">
                            <Cookie className="text-[#D4A373]" size={24} />
                            <h2 className="text-2xl font-serif font-bold text-[#33211D] m-0">Cookie Policy</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            We use cookies and similar technologies to enhance your experience. Types of cookies we use:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
                            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                            You can manage cookie preferences through your browser settings.
                        </p>
                    </section>

                    <section id="children">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Children's Privacy</h2>
                        <p className="text-gray-600">
                            Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                        </p>
                    </section>

                    <section id="changes">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Changes to This Policy</h2>
                        <p className="text-gray-600">
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section id="contact">
                        <h2 className="text-2xl font-serif font-bold text-[#33211D] mb-4">Contact Us</h2>
                        <p className="text-gray-600 mb-4">
                            If you have questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="bg-[#FAF9F6] p-6 rounded-xl">
                            <p className="text-gray-700"><strong>Email:</strong> privacy@apnastore.com</p>
                            <p className="text-gray-700 mt-2"><strong>Phone:</strong> (406) 555-0120</p>
                            <p className="text-gray-700 mt-2"><strong>Address:</strong> 123 Commerce Street, Mumbai, India</p>
                        </div>
                    </section>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link href="/" className="inline-block px-8 py-3 bg-[#33211D] text-white font-bold rounded-full hover:bg-black transition-colors">
                        Return to Shopping
                    </Link>
                </div>
            </div>
        </main>
    );
}
