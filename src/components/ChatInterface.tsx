"use client";
import { useState, useRef, useEffect } from "react";
import { processFastBrain, FastBrainAction } from "@/lib/fastBrain";
import { ArrowUp, Sparkles } from "lucide-react";

interface ChatInterfaceProps {
    onFastAction: (action: FastBrainAction) => void;
}

export default function ChatInterface({ onFastAction }: ChatInterfaceProps) {
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    // Auto-focus on mount
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        // 1. Fast Brain Check (The Reflex)
        const fastResult = processFastBrain(input);
        if (fastResult) {
            onFastAction(fastResult);
            setInput(""); // Clear immediately for "snappy" feel
            return;
        }

        // 2. Smart Brain Fallback (The Intelligence)
        setIsThinking(true);

        try {
            const res = await fetch('/api/aura', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input }),
            });

            const data = await res.json();

            // Basic parsing for action codes (Client-side extraction)
            const rawResponse = data.response;
            const actionMatch = rawResponse.match(/\[(FILTER|REDIRECT):(.+?)\]/);

            let cleanResponse = rawResponse;
            if (actionMatch) {
                const [fullCode, type, payload] = actionMatch;
                cleanResponse = rawResponse.replace(fullCode, '').trim();

                // Trigger the extracted action
                // note: mapping 'FILTER' to 'FILTER_PRODUCT' to match FastBrainAction type
                const actionType = type === 'FILTER' ? 'FILTER_PRODUCT' : type as any;
                onFastAction({ type: actionType, payload });
            }

            // For now, just alert/log the Smart Brain's text (In a real app, display in a chat bubble)
            // But since we want a "Reflex" demo, we'll extract the action and maybe show a toast
            alert(`Aura says: "${cleanResponse}"`);

        } catch (err) {
            console.error("Brain Freeze:", err);
            alert("Aura is offline. Ensure Ollama is running.");
        } finally {
            setIsThinking(false);
            setInput("");
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
            <div className="relative group">
                {/* Glowing Border Idea */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center bg-black/80 backdrop-blur-xl rounded-full p-2 border border-white/10 shadow-2xl"
                >
                    <div className="pl-4 pr-2 text-purple-400">
                        {isThinking ? (
                            <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                        ) : (
                            <Sparkles className="w-5 h-5" />
                        )}
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Aura... (e.g. 'Show me red jackets')"
                        className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none px-2 py-3 text-sm md:text-base font-medium"
                    />

                    <button
                        type="submit"
                        className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-transform active:scale-95 disabled:opacity-50"
                        disabled={!input.trim()}
                    >
                        <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </form>
            </div>

            {/* Disclaimer / Hint */}
            <div className="text-center mt-4">
                <p className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">
                    Aura v1.0 • Intent-First Commerce
                </p>
            </div>
        </div>
    );
}
