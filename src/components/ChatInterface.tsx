"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/lib/data";
import { FastBrainAction, getFastBrainResponse } from "@/lib/fastBrain";
import { ArrowUp, Sparkles, X, MessageCircle, ShoppingCart, Heart, CreditCard, Search, Package } from "lucide-react";

interface ChatInterfaceProps {
    onFastAction?: (action: FastBrainAction) => void;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
    actions?: string[]; // Visual confirmation badges
}

// Parse ALL action codes from AI response
const parseActionCodes = (response: string): { cleanText: string; actions: Array<{ type: string; payload: string }> } => {
    const actions: Array<{ type: string; payload: string }> = [];
    let cleanText = response;

    // Match all action codes: [ACTION_TYPE:payload] or [ACTION_TYPE]
    const actionRegex = /\[(ADD_TO_CART|REMOVE_FROM_CART|ADD_TO_WISHLIST|REMOVE_FROM_WISHLIST|CLEAR_CART|CLEAR_WISHLIST|CHECKOUT|REDIRECT|SEARCH|FILTER|FILTER_PRODUCT|VIEW_PRODUCT|COMPARE_PRODUCTS):?([^\]]*)\]/g;
    let match;

    while ((match = actionRegex.exec(response)) !== null) {
        const [fullCode, type, payload] = match;
        actions.push({ type: type.trim(), payload: (payload || '').trim() });
        cleanText = cleanText.replace(fullCode, '');
    }

    return { cleanText: cleanText.trim(), actions };
};

// Find product by ID from the data
const findProductById = (id: string | number): any => {
    const numId = typeof id === 'string' ? parseInt(id) : id;
    return (products as any[]).find((p: any) => p.id === numId);
};

export default function ChatInterface({ onFastAction = () => { } }: ChatInterfaceProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant', content: "Hi! I'm Apna Sarthi, your personal shopping assistant! 🛍️\n\nI can do everything for you right here:\n• 🛒 Add products to your cart\n• ❤️ Manage your wishlist\n• 🔍 Search & browse products\n• 💳 Help you checkout\n• 📦 Track orders & answer questions\n\nJust tell me what you need!"
        }
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [actionFeedback, setActionFeedback] = useState<string | null>(null);
    const router = useRouter();

    const { cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal } = useCart();
    const { wishlist, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, wishlistCount } = useWishlist();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Show brief action feedback toast
    const showFeedback = (msg: string) => {
        setActionFeedback(msg);
        setTimeout(() => setActionFeedback(null), 2500);
    };

    // Build cart/wishlist summary for AI context
    const getCartSummary = (): string => {
        if (cart.length === 0) return "Cart is empty.";
        return cart.map((item: any) => `- ${item.name} (x${item.quantity}) $${(item.price * item.quantity).toFixed(2)}`).join('\n')
            + `\nTotal: $${cartTotal.toFixed(2)} (${cartCount} items)`;
    };

    const getWishlistSummary = (): string => {
        if (wishlist.length === 0) return "Wishlist is empty.";
        return wishlist.map((item: any) => `- ${item.name} $${item.price.toFixed(2)}`).join('\n')
            + `\n(${wishlistCount} items)`;
    };

    // Execute a parsed action code
    const executeAction = (actionType: string, payload: string) => {
        switch (actionType) {
            case 'ADD_TO_CART': {
                const product = findProductById(payload);
                if (product) {
                    addToCart(product);
                    showFeedback(`✅ ${product.name} added to cart!`);
                }
                break;
            }
            case 'REMOVE_FROM_CART': {
                const product = findProductById(payload);
                if (product) {
                    removeFromCart(product.id);
                    showFeedback(`🗑️ ${product.name} removed from cart`);
                }
                break;
            }
            case 'ADD_TO_WISHLIST': {
                const product = findProductById(payload);
                if (product) {
                    addToWishlist(product);
                    showFeedback(`❤️ ${product.name} added to wishlist!`);
                }
                break;
            }
            case 'REMOVE_FROM_WISHLIST': {
                const product = findProductById(payload);
                if (product) {
                    removeFromWishlist(product.id);
                    showFeedback(`💔 ${product.name} removed from wishlist`);
                }
                break;
            }
            case 'CLEAR_CART':
                clearCart();
                showFeedback('🧹 Cart cleared!');
                break;
            case 'CLEAR_WISHLIST':
                clearWishlist();
                showFeedback('🧹 Wishlist cleared!');
                break;
            case 'CHECKOUT':
                showFeedback('💳 Heading to checkout...');
                setTimeout(() => {
                    router.push('/checkout');
                    setIsOpen(false);
                }, 600);
                break;
            case 'REDIRECT':
                setTimeout(() => {
                    router.push(payload);
                    setIsOpen(false);
                }, 600);
                break;
            case 'SEARCH':
                onFastAction({ type: 'SEARCH', payload } as FastBrainAction);
                break;
            case 'FILTER':
            case 'FILTER_PRODUCT':
                onFastAction({ type: 'FILTER_PRODUCT', payload } as FastBrainAction);
                break;
            case 'VIEW_PRODUCT':
                setTimeout(() => {
                    router.push(`/product/${payload}`);
                    setIsOpen(false);
                }, 600);
                break;
        }
    };

    const handleFastAction = (action: FastBrainAction, userInput: string) => {
        const response = getFastBrainResponse(userInput) || "Processing your request...";
        const actionBadges: string[] = [];

        switch (action.type) {
            case 'ADD_TO_CART': {
                // FastBrain can't resolve product IDs, so we show a helpful message
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                break;
            }
            case 'ADD_TO_WISHLIST': {
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                break;
            }
            case 'CLEAR_CART':
                clearCart();
                showFeedback('🧹 Cart cleared!');
                setMessages(prev => [...prev, { role: 'assistant', content: response, actions: ['Cart Cleared'] }]);
                break;
            case 'CLEAR_WISHLIST':
                clearWishlist();
                showFeedback('🧹 Wishlist cleared!');
                setMessages(prev => [...prev, { role: 'assistant', content: response, actions: ['Wishlist Cleared'] }]);
                break;
            case 'CHECKOUT':
                setMessages(prev => [...prev, { role: 'assistant', content: response, actions: ['→ Checkout'] }]);
                setTimeout(() => {
                    router.push('/checkout');
                    setIsOpen(false);
                }, 800);
                break;
            case 'REDIRECT':
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                setTimeout(() => {
                    router.push(action.payload);
                    setIsOpen(false);
                }, 800);
                break;
            case 'SHOW_CART':
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                setTimeout(() => {
                    router.push('/cart');
                    setIsOpen(false);
                }, 800);
                break;
            case 'SHOW_WISHLIST':
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                setTimeout(() => {
                    router.push('/wishlist');
                    setIsOpen(false);
                }, 800);
                break;
            case 'SEARCH':
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                onFastAction(action);
                break;
            case 'FILTER_PRODUCT':
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                onFastAction(action);
                break;
            case 'INFO':
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                break;
            default:
                setMessages(prev => [...prev, { role: 'assistant', content: "I'm here to help! What would you like to do?" }]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput("");
        setIsThinking(true);

        try {
            // First, try FastBrain for instant responses  
            const { processFastBrain } = await import('@/lib/fastBrain');
            const fastAction = processFastBrain(userMsg);

            if (fastAction && fastAction.type !== 'NONE') {
                setIsThinking(false);
                handleFastAction(fastAction, userMsg);
                return;
            }

            // Fallback to Smart Brain (Groq) for complex queries
            const remoteUrl = process.env.NEXT_PUBLIC_REMOTE_AI_URL;
            const apiUrl = remoteUrl ? `${remoteUrl}/api/aura` : '/api/aura';

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({
                    prompt: userMsg,
                    cartSummary: getCartSummary(),
                    wishlistSummary: getWishlistSummary(),
                }),
            });

            const data = await res.json();
            const rawResponse = data.response;

            // Parse ALL action codes from the AI response
            const { cleanText, actions } = parseActionCodes(rawResponse);

            // Execute each action
            const actionBadges: string[] = [];
            for (const action of actions) {
                executeAction(action.type, action.payload);

                // Build visual badges
                switch (action.type) {
                    case 'ADD_TO_CART': {
                        const p = findProductById(action.payload);
                        if (p) actionBadges.push(`🛒 ${p.name}`);
                        break;
                    }
                    case 'ADD_TO_WISHLIST': {
                        const p = findProductById(action.payload);
                        if (p) actionBadges.push(`❤️ ${p.name}`);
                        break;
                    }
                    case 'REMOVE_FROM_CART': {
                        const p = findProductById(action.payload);
                        if (p) actionBadges.push(`🗑️ Removed ${p.name}`);
                        break;
                    }
                    case 'REMOVE_FROM_WISHLIST': {
                        const p = findProductById(action.payload);
                        if (p) actionBadges.push(`💔 Removed ${p.name}`);
                        break;
                    }
                    case 'CLEAR_CART': actionBadges.push('🧹 Cart cleared'); break;
                    case 'CLEAR_WISHLIST': actionBadges.push('🧹 Wishlist cleared'); break;
                    case 'CHECKOUT': actionBadges.push('💳 Checkout'); break;
                    case 'REDIRECT': actionBadges.push(`📍 ${action.payload}`); break;
                }

                // For non-redirect FILTER/SEARCH, trigger onFastAction
                if (action.type === 'FILTER' || action.type === 'FILTER_PRODUCT') {
                    onFastAction({ type: 'FILTER_PRODUCT', payload: action.payload } as FastBrainAction);
                }
                if (action.type === 'SEARCH') {
                    onFastAction({ type: 'SEARCH', payload: action.payload } as FastBrainAction);
                }
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: cleanText || "I'm here to help! What would you like to explore?",
                actions: actionBadges.length > 0 ? actionBadges : undefined,
            }]);
            setIsThinking(false);

        } catch (err) {
            console.error("Chat API Error:", err);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Oops! Let me try that again. Could you rephrase your request?"
            }]);
            setIsThinking(false);
        }
    };

    // Quick action buttons — now with more capabilities
    const quickActions = [
        { label: "🛒 My Cart", action: "Show my cart" },
        { label: "❤️ Wishlist", action: "Show wishlist" },
        { label: "🔥 Deals", action: "Show me hot deals" },
        { label: "👗 Fashion", action: "Take me to fashion" },
        { label: "📱 Electronics", action: "Show electronics" },
        { label: "💄 Beauty", action: "Show beauty products" },
    ];

    const handleQuickAction = (actionText: string) => {
        setInput(actionText);
        setTimeout(() => {
            const fakeEvent = { preventDefault: () => { } } as React.FormEvent;
            handleSubmit(fakeEvent);
        }, 100);
    };

    // Fix: need to set input properly for quick actions
    useEffect(() => {
        if (input && input.startsWith("Show") || input.startsWith("Take")) {
            // auto-submit handled by handleQuickAction
        }
    }, [input]);

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-[#33211D] to-[#D4A373] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group"
                    aria-label="Open chat"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                    {/* Cart badge if items exist */}
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#33211D] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Chat with Apna Sarthi
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-0 right-0 z-50 w-full md:w-[420px] h-[650px] md:bottom-6 md:right-6 md:rounded-2xl shadow-2xl flex flex-col bg-gradient-to-br from-[#33211D] via-[#4a3228] to-[#33211D] border border-[#D4A373]/30">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#D4A373]" />
                            <span className="font-bold text-sm text-white">Apna Sarthi</span>
                            <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full">AI</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Mini cart/wishlist status */}
                            {cartCount > 0 && (
                                <div className="flex items-center gap-1 text-[10px] text-[#D4A373] bg-white/10 px-2 py-1 rounded-full">
                                    <ShoppingCart className="w-3 h-3" />
                                    <span>{cartCount}</span>
                                </div>
                            )}
                            {wishlistCount > 0 && (
                                <div className="flex items-center gap-1 text-[10px] text-pink-400 bg-white/10 px-2 py-1 rounded-full">
                                    <Heart className="w-3 h-3" />
                                    <span>{wishlistCount}</span>
                                </div>
                            )}
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Action Feedback Toast */}
                    {actionFeedback && (
                        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-green-500/90 text-white text-xs font-bold rounded-full shadow-lg animate-bounce">
                            {actionFeedback}
                        </div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl ${msg.role === 'user'
                                    ? 'bg-gradient-to-r from-[#33211D] to-[#D4A373] text-white p-3'
                                    : 'bg-white/10 text-gray-100 border border-white/10 p-3'
                                    }`}>
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                                    {/* Action badges — visual confirmation of what was done */}
                                    {msg.actions && msg.actions.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                                            {msg.actions.map((badge, j) => (
                                                <span key={j} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-medium text-[#D4A373] border border-[#D4A373]/30">
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 text-gray-100 p-3 rounded-2xl border border-white/10">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-[#D4A373] rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-[#D4A373]/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-[#D4A373] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    {messages.length <= 2 && (
                        <div className="px-3 py-2 flex gap-1.5 overflow-x-auto bg-black/20 scrollbar-hide">
                            {quickActions.map((qa, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickAction(qa.action)}
                                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] rounded-full border border-white/10 whitespace-nowrap transition-colors"
                                >
                                    {qa.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black/20">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={`Try "Add headphones to cart"...`}
                                className="flex-1 bg-white/10 text-white placeholder-gray-400 px-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isThinking}
                                className="bg-gradient-to-r from-[#33211D] to-[#D4A373] text-white p-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ArrowUp className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                            Powered by AI • Shop, browse & manage everything through chat
                        </p>
                    </form>
                </div>
            )}
        </>
    );
}
