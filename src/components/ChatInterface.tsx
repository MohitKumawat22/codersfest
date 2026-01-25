"use client";
import { useState, useRef, useEffect } from "react";
import { FastBrainAction } from "@/lib/fastBrain";
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
        { role: 'assistant', content: "Hi! I'm Aura. I can help you find specific styles instantly. Try typing 'red' or 'shoes'." }
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput("");
        setIsThinking(true);

        try {
            const res = await fetch('/api/aura', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMsg }),
            });

            const data = await res.json();
            const rawResponse = data.response;

            // Extract Action Code
            const actionMatch = rawResponse.match(/\[(FILTER|REDIRECT):(.+?)\]/);
            let cleanResponse = rawResponse;

            if (actionMatch) {
                const [fullCode, type, payload] = actionMatch;
                cleanResponse = rawResponse.replace(fullCode, '').trim();

                // Trigger Action
                const actionType = type === 'FILTER' ? 'FILTER_PRODUCT' : type as any;
                onFastAction({ type: actionType, payload });
            }

            setMessages(prev => [...prev, { role: 'assistant', content: cleanResponse }]);

        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: "My connection is hazy. Is Ollama running?" }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[350px] h-[500px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            <span className="font-bold text-sm text-white">Aura Host</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-purple-600 text-white rounded-br-none'
                                        : 'bg-white/10 text-gray-200 rounded-bl-none'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about style..."
                                className="w-full bg-black/50 border border-white/10 rounded-full pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isThinking}
                                className="absolute right-1.5 top-1.5 p-1.5 bg-purple-600 hover:bg-purple-500 rounded-full text-white transition-colors disabled:opacity-50"
                            >
                                <ArrowUp className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Avatar Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-[2px] shadow-lg hover:scale-105 transition-transform group"
            >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                    <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                    {!isOpen && (
                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse" />
                    )}
                </div>
            </button>
        </div>
    );
}
