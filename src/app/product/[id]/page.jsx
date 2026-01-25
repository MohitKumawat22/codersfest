"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { products, reviews as initialReviews } from "../../../lib/data";
import { useCart } from "../../../context/CartContext";
import { Star, ShoppingCart, ArrowLeft, User } from "lucide-react";
import Link from "next/link";

export default function ProductDetails() {
    const params = useParams();
    const id = parseInt(params.id);
    const product = products.find((p) => p.id === id);
    const { addToCart } = useCart();
    const [reviews, setReviews] = useState(initialReviews.filter(r => r.productId === id));

    // Form state
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");

    // Start with shared reviews, but ability to add more locally
    useEffect(() => {
        setReviews(initialReviews.filter(r => r.productId === id));
    }, [id]);

    const handleSubmitReview = (e) => {
        e.preventDefault();
        const newReview = {
            id: Date.now(),
            productId: id,
            user: name || "Anonymous",
            rating,
            comment,
            date: new Date().toISOString().split('T')[0]
        };
        setReviews([...reviews, newReview]);
        setComment("");
        setName("");
        setRating(5);
    };

    if (!product) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                <Link href="/" className="text-blue-600 underline">Return Home</Link>
            </main>
        );
    }

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : product.rating;

    return (
        <main className="min-h-screen bg-[#FDFDFD] py-12 md:py-20">
            <div className="max-w-screen-xl mx-auto px-4">
                <Link href="/beauty" className="inline-flex items-center text-gray-500 hover:text-[#33211D] mb-8 transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Back to Beauty
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {/* Product Image */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm aspect-square md:aspect-auto">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <span className={`inline-block ${product.color} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide w-fit mb-4`}>
                            {product.tag}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#33211D] mb-4">{product.name}</h1>

                        <div className="flex items-center space-x-4 mb-6">
                            <span className="text-3xl font-bold text-[#33211D]">${product.price.toFixed(2)}</span>
                            {product.oldPrice && (
                                <span className="text-xl text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                            )}
                            <div className="flex items-center text-yellow-500 ml-4">
                                <Star fill="currentColor" size={18} />
                                <span className="ml-1 text-gray-700 font-medium">{averageRating}</span>
                                <span className="ml-1 text-gray-400">({reviews.length} reviews)</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {product.description || "Experience the finest quality with this curated product. Designed to enhance your daily routine with premium ingredients and exceptional craftsmanship."}
                        </p>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-[#33211D] text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-[#D4A373] transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                            >
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#33211D] hover:text-[#33211D] text-gray-400 transition-colors">
                                <Star size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="bg-white rounded-2xl p-6 md:p-12 shadow-sm">
                    <h2 className="text-3xl font-serif font-bold text-[#33211D] mb-8">Customer Reviews</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Review List */}
                        <div className="space-y-8">
                            {reviews.length === 0 ? (
                                <p className="text-gray-500 italic">No reviews yet. Be the first to write one!</p>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                                    <User size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#33211D]">{review.user}</h4>
                                                    <p className="text-xs text-gray-400">{review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Leave a Review Form */}
                        <div className="bg-[#FAF9F6] p-6 md:p-8 rounded-xl h-fit">
                            <h3 className="text-xl font-bold text-[#33211D] mb-6">Write a Review</h3>
                            <form onSubmit={handleSubmitReview} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none bg-white"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`p-1 focus:outline-none transition-colors ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                                            >
                                                <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                                    <textarea
                                        rows="4"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#D4A373] focus:border-transparent outline-none bg-white resize-none"
                                        placeholder="Tell us what you liked..."
                                    />
                                </div>
                                <button type="submit" className="w-full bg-[#33211D] text-white py-3 rounded-lg font-bold hover:bg-[#D4A373] transition-colors shadow-md">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
