"use client";
import React from "react";
import { Star, ThumbsUp, CheckCircle } from "lucide-react";

export default function CustomerReviews() {
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            date: "2 days ago",
            verified: true,
            comment: "Absolutely love the quality! Fast shipping and excellent customer service. Will definitely shop again.",
            helpful: 24,
            product: "Wireless Headphones"
        },
        {
            id: 2,
            name: "Michael Chen",
            rating: 5,
            date: "1 week ago",
            verified: true,
            comment: "Best online shopping experience I've had. The product matches the description perfectly and arrived in pristine condition.",
            helpful: 18,
            product: "Smart Watch"
        },
        {
            id: 3,
            name: "Priya Sharma",
            rating: 4,
            date: "2 weeks ago",
            verified: true,
            comment: "Great value for money. The checkout process was smooth and I received my order within 3 days!",
            helpful: 15,
            product: "Summer Dress"
        }
    ];

    const stats = {
        totalReviews: "50,000+",
        averageRating: "4.8",
        fiveStarPercent: 87,
        recommendPercent: 96
    };

    return (
        <section className="py-16 bg-[#FDFBF7]">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <CheckCircle className="text-green-600" size={24} />
                        <span className="text-[#D4A373] text-xs font-bold uppercase tracking-[0.2em]">Verified Reviews</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#33211D] mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Real feedback from real customers. All reviews are verified purchases.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                        <div className="flex items-center justify-center gap-1 mb-2">
                            <Star className="fill-yellow-400 text-yellow-400" size={20} />
                            <span className="text-3xl font-bold text-[#33211D]">{stats.averageRating}</span>
                        </div>
                        <p className="text-sm text-gray-500">Average Rating</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                        <p className="text-3xl font-bold text-[#33211D] mb-2">{stats.totalReviews}</p>
                        <p className="text-sm text-gray-500">Total Reviews</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                        <p className="text-3xl font-bold text-green-600 mb-2">{stats.fiveStarPercent}%</p>
                        <p className="text-sm text-gray-500">5-Star Reviews</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                        <p className="text-3xl font-bold text-blue-600 mb-2">{stats.recommendPercent}%</p>
                        <p className="text-sm text-gray-500">Would Recommend</p>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-[#33211D]">{review.name}</h4>
                                        {review.verified && (
                                            <CheckCircle className="text-green-600" size={14} />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400">{review.date}</p>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Product */}
                            <div className="mb-3">
                                <span className="text-xs text-gray-500">Purchased: </span>
                                <span className="text-xs font-medium text-[#33211D]">{review.product}</span>
                            </div>

                            {/* Comment */}
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                "{review.comment}"
                            </p>

                            {/* Helpful */}
                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#33211D] transition-colors">
                                    <ThumbsUp size={14} />
                                    <span>Helpful ({review.helpful})</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <button className="px-8 py-3 border-2 border-[#33211D] text-[#33211D] font-bold rounded-full hover:bg-[#33211D] hover:text-white transition-all">
                        Read All Reviews
                    </button>
                </div>
            </div>
        </section>
    );
}
