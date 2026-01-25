import { Product } from "./catalog";

export type FastBrainAction =
    | { type: 'REDIRECT'; payload: string }
    | { type: 'SHOW_MODAL'; payload: string }
    | { type: 'FILTER_PRODUCT'; payload: string }
    | { type: 'NONE' };

interface IntentRule {
    keywords: string[];
    action: FastBrainAction['type'];
    payload: string;
}

const RULES: IntentRule[] = [
    // Navigation / Redirection
    { keywords: ['shoes', 'footwear', 'sneakers'], action: 'REDIRECT', payload: '/shop?category=shoes' },
    { keywords: ['return', 'refund', 'policy'], action: 'SHOW_MODAL', payload: 'policy_refund' },

    // Product Filtering (Visual Reflex)
    { keywords: ['red', 'crimson'], action: 'FILTER_PRODUCT', payload: 'red' },
    { keywords: ['blue', 'denim'], action: 'FILTER_PRODUCT', payload: 'blue' },
    { keywords: ['dress', 'gown'], action: 'FILTER_PRODUCT', payload: 'dress' },
    { keywords: ['jacket', 'coat'], action: 'FILTER_PRODUCT', payload: 'jacket' },
];

export const processFastBrain = (input: string): FastBrainAction | null => {
    const lowerInput = input.toLowerCase();

    for (const rule of RULES) {
        if (rule.keywords.some(k => lowerInput.includes(k))) {
            return { type: rule.action, payload: rule.payload };
        }
    }

    return null; // Fallback to Smart Brain (Ollama)
};
