"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <main className="min-h-screen bg-white py-12 md:py-20">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-4">Get in Touch</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Have a question or need assistance? We're here to help! Reach out to our team.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-[#FAF9F6] p-6 rounded-xl">
                            <div className="w-12 h-12 bg-[#33211D] rounded-lg flex items-center justify-center mb-4">
                                <Phone className="text-white" size={24} />
                            </div>
                            <h3 className="font-bold text-[#33211D] mb-2">Phone</h3>
                            <p className="text-gray-600">(406) 555-0120</p>
                            <p className="text-sm text-gray-500 mt-1">Mon-Fri 9am-6pm EST</p>
                        </div>

                        <div className="bg-[#FAF9F6] p-6 rounded-xl">
                            <div className="w-12 h-12 bg-[#33211D] rounded-lg flex items-center justify-center mb-4">
                                <Mail className="text-white" size={24} />
                            </div>
                            <h3 className="font-bold text-[#33211D] mb-2">Email</h3>
                            <p className="text-gray-600">support@apnastore.com</p>
                            <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                        </div>

                        <div className="bg-[#FAF9F6] p-6 rounded-xl">
                            <div className="w-12 h-12 bg-[#33211D] rounded-lg flex items-center justify-center mb-4">
                                <MapPin className="text-white" size={24} />
                            </div>
                            <h3 className="font-bold text-[#33211D] mb-2">Address</h3>
                            <p className="text-gray-600">123 Commerce Street<br />New York, NY 10001</p>
                        </div>

                        <div className="bg-[#FAF9F6] p-6 rounded-xl">
                            <div className="w-12 h-12 bg-[#33211D] rounded-lg flex items-center justify-center mb-4">
                                <Clock className="text-white" size={24} />
                            </div>
                            <h3 className="font-bold text-[#33211D] mb-2">Business Hours</h3>
                            <p className="text-gray-600">Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm<br />Sunday: Closed</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
                            <h2 className="text-2xl font-bold text-[#33211D] mb-6 flex items-center gap-2">
                                <MessageCircle size={28} />
                                Send us a Message
                            </h2>

                            {submitted && (
                                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none transition-all"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows="6"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none resize-none transition-all"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 bg-[#33211D] text-white py-4 rounded-lg hover:bg-[#D4A373] transition-all transform active:scale-95 font-medium text-lg shadow-md hover:shadow-lg"
                                >
                                    <Send size={20} />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* FAQ Section */}
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-[#33211D] mb-6">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                {[
                                    { q: "What are your shipping options?", a: "We offer free standard shipping on all orders over $50. Express shipping is available for an additional fee." },
                                    { q: "What is your return policy?", a: "We accept returns within 30 days of purchase. Items must be unused and in original packaging." },
                                    { q: "Do you ship internationally?", a: "Yes, we ship to over 100 countries worldwide. Shipping costs and times vary by location." },
                                ].map((faq, index) => (
                                    <details key={index} className="group border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                        <summary className="font-bold text-[#33211D] cursor-pointer">
                                            {faq.q}
                                        </summary>
                                        <p className="mt-3 text-gray-600 text-sm">{faq.a}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
