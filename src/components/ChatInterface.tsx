"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FastBrainAction, getFastBrainResponse } from "@/lib/fastBrain";
import { ArrowUp, Sparkles, X, MessageCircle } from "lucide-react";

interface ChatInterfaceProps {
    onFastAction?: (action: FastBrainAction) => void;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatInterface({ onFastAction = () => { } }: ChatInterfaceProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm Apna Sarthi, your personal shopping assistant! 🛍️\n\nI can help you:\n• Find products (try 'shoes', 'dress', 'headphones')\n• Navigate categories ('fashion', 'electronics')\n• Answer questions ('shipping', 'returns')\n• Show your cart or wishlist\n\nWhat are you looking for today?" }
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const router = useRouter();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleFastAction = (action: FastBrainAction, userInput: string) => {
        const response = getFastBrainResponse(userInput) || "Processing your request...";

        switch (action.type) {
            case 'REDIRECT':
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                setTimeout(() => {
                    router.push(action.payload);
                    setIsOpen(false); // Close chat after redirect
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
                // Trigger search modal if parent component handles it
                onFastAction(action);
                break;

            case 'FILTER_PRODUCT':
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                onFastAction(action);
                break;

            case 'INFO':
                // Direct information response
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                break;

            default:
                setMessages(prev => [...prev, { role: 'assistant', content: "I'm here to help! What would you like to know?" }]);
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

            // Fallback to Smart Brain (Ollama) for complex queries
            const res = await fetch('/api/aura', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMsg }),
            });

            const data = await res.json();
            const rawResponse = data.response;

            // Extract Action Code
            const actionMatch = rawResponse.match(/\\[(FILTER|REDIRECT):(.+?)\\]/);
            let cleanResponse = rawResponse;

            if (actionMatch) {
                const [fullCode, type, payload] = actionMatch;
                cleanResponse = rawResponse.replace(fullCode, '').trim();

                // Trigger the extracted action - map FILTER to FILTER_PRODUCT
                const actionType = type === 'FILTER' ? 'FILTER_PRODUCT' : type as 'REDIRECT';
                const ollamaAction: FastBrainAction = {
                    type: actionType,
                    payload: payload.trim(),
                };
                onFastAction(ollamaAction);
            }

            setMessages(prev => [...prev, { role: 'assistant', content: cleanResponse || "I'm here to help! What would you like to explore?" }]);
            setIsThinking(false);

        } catch (err) {
            console.error("Chat API Error:", err);
            const errorMessage = err instanceof Error
                ? `Connection error: ${err.message}. Please ensure Ollama is running.`
                : "My connection is hazy. Please check if Ollama is running and try again.";
            setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
            setIsThinking(false);
        }
    };

    // Quick action buttons
    const quickActions = [
        { label: "🔥 Deals", action: "Show me hot deals" },
        { label: "👗 Fashion", action: "Take me to fashion" },
        { label: "🛒 Cart", action: "Show my cart" },
        { label: "❤️ Wishlist", action: "Show wishlist" },
    ];

    const handleQuickAction = (actionText: string) => {
        setInput(actionText);
        // Auto-submit
        const fakeEvent = { preventDefault: () => { } } as React.FormEvent;
        setInput(actionText);
        setTimeout(() => {
            handleSubmit(fakeEvent);
        }, 100);
    };

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
                    <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#33211D] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Chat with Apna Sarthi
                    </div>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-0 right-0 z-50 w-full md:w-96 h-[600px] md:bottom-6 md:right-6 md:rounded-2xl shadow-2xl flex flex-col bg-gradient-to-br from-[#33211D] via-[#4a3228] to-[#33211D] border border-[#D4A373]/30">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#D4A373]" />
                            <span className="font-bold text-sm text-white">Apna Sarthi</span>
                            <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full">Online</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                    ? 'bg-gradient-to-r from-[#33211D] to-[#D4A373] text-white'
                                    : 'bg-white/10 text-gray-100 border border-white/10'
                                    }`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
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
                    {messages.length === 1 && (
                        <div className="px-4 py-2 flex gap-2 overflow-x-auto bg-black/20">
                            {quickActions.map((qa, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleQuickAction(qa.action)}
                                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-full border border-white/10 whitespace-nowrap transition-colors"
                                >
                                    {qa.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/20">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-white/10 text-white placeholder-gray-400 px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isThinking}
                                className="bg-gradient-to-r from-[#33211D] to-[#D4A373] text-white p-2 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ArrowUp className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 text-center">Powered by AI • Instant responses</p>
                    </form>
                </div>
            )}
        </>
    );
}
