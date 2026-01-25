import { Product } from "./catalog";

export type FastBrainAction =
    | { type: 'REDIRECT'; payload: string }
    | { type: 'ADD_TO_CART'; payload: string }
    | { type: 'SHOW_WISHLIST' }
    | { type: 'SHOW_CART' }
    | { type: 'SEARCH'; payload: string }
    | { type: 'INFO'; payload: string }
    | { type: 'FILTER_PRODUCT'; payload: string }
    | { type: 'NONE' };

interface IntentRule {
    keywords: string[];
    action: FastBrainAction['type'];
    payload: string;
    response?: string;
}

const RULES: IntentRule[] = [
    // Navigation - Category Pages
    { keywords: ['fashion', 'clothes', 'apparel', 'wear'], action: 'REDIRECT', payload: '/fashion', response: '👗 Taking you to our Fashion collection!' },
    { keywords: ['beauty', 'makeup', 'cosmetic', 'skincare'], action: 'REDIRECT', payload: '/beauty', response: '💄 Showing you our Beauty products!' },
    { keywords: ['electronics', 'gadget', 'tech', 'device'], action: 'REDIRECT', payload: '/electronics', response: '📱 Navigating to Electronics!' },
    { keywords: ['home', 'living', 'furniture', 'decor'], action: 'REDIRECT', payload: '/home-living', response: '🏠 Opening Home & Living section!' },
    { keywords: ['deals', 'sale', 'discount', 'offer'], action: 'REDIRECT', payload: '/deals', response: '🔥 Showing you our Hot Deals!' },

    // Specific Products
    { keywords: ['shoes', 'footwear', 'sneakers', 'boots'], action: 'SEARCH', payload: 'sneakers', response: '👟 Searching for shoes...' },
    { keywords: ['dress', 'gown', 'frock'], action: 'SEARCH', payload: 'dress', response: '👗 Finding dresses for you...' },
    { keywords: ['jacket', 'coat', 'blazer'], action: 'SEARCH', payload: 'jacket', response: '🧥 Looking for jackets...' },
    { keywords: ['bag', 'purse', 'handbag'], action: 'SEARCH', payload: 'bag', response: '👜 Searching for bags...' },
    { keywords: ['headphone', 'earphone', 'earbud', 'airpod'], action: 'SEARCH', payload: 'headphones', response: '🎧 Finding headphones...' },
    { keywords: ['watch', 'smartwatch'], action: 'SEARCH', payload: 'watch', response: '⌚ Searching for watches...' },

    // Color Filters
    { keywords: ['red', 'crimson', 'maroon'], action: 'FILTER_PRODUCT', payload: 'red', response: '🔴 Filtering for red items!' },
    { keywords: ['blue', 'navy', 'azure'], action: 'FILTER_PRODUCT', payload: 'blue', response: '🔵 Showing blue products!' },
    { keywords: ['black', 'dark'], action: 'FILTER_PRODUCT', payload: 'black', response: '⚫ Filtering for black items!' },
    { keywords: ['white', 'cream'], action: 'FILTER_PRODUCT', payload: 'white', response: '⚪ Showing white products!' },
    { keywords: ['green', 'emerald'], action: 'FILTER_PRODUCT', payload: 'green', response: '🟢 Filtering for green items!' },

    // Cart & Wishlist
    { keywords: ['cart', 'shopping cart', 'basket'], action: 'SHOW_CART', payload: '', response: '🛒 Opening your shopping cart!' },
    { keywords: ['wishlist', 'saved', 'favorites', 'wish list'], action: 'SHOW_WISHLIST', payload: '', response: '❤️ Here\'s your wishlist!' },

    // Information Queries
    { keywords: ['return', 'refund', 'exchange'], action: 'INFO', payload: 'return_policy', response: '📋 Our return policy: You can return items within 30 days of purchase. Items must be unused and in original packaging. Refunds are processed within 5-7 business days.' },
    { keywords: ['shipping', 'delivery', 'courier'], action: 'INFO', payload: 'shipping', response: '📦 We offer free standard shipping on orders over $50. Express shipping is available for $10. Delivery takes 3-5 business days.' },
    { keywords: ['payment', 'pay', 'card', 'checkout'], action: 'INFO', payload: 'payment', response: '💳 We accept all major credit/debit cards, PayPal, and UPI. All transactions are secure and encrypted.' },
    { keywords: ['contact', 'support', 'help', 'customer service'], action: 'REDIRECT', payload: '/contact', response: '📞 Taking you to our contact page!' },
    { keywords: ['profile', 'account', 'my account'], action: 'REDIRECT', payload: '/profile', response: '👤 Opening your profile!' },
    { keywords: ['track', 'order', 'status'], action: 'INFO', payload: 'order_tracking', response: '📍 To track your order, please visit your profile page. You can view all order statuses there!' },
    { keywords: ['hours', 'open', 'timing'], action: 'INFO', payload: 'hours', response: '🕐 Our customer service is available Monday-Friday: 9am-6pm, Saturday: 10am-4pm. Shop online 24/7!' },
    { keywords: ['price', 'cost', 'expensive', 'cheap', 'budget'], action: 'INFO', payload: 'pricing', response: '💰 We have products for every budget! Check out our Deals section for great discounts!' },
];

export const processFastBrain = (input: string): FastBrainAction | null => {
    const lowerInput = input.toLowerCase();

    // Find the first matching rule
    for (const rule of RULES) {
        if (rule.keywords.some(k => lowerInput.includes(k))) {
            return {
                type: rule.action,
                payload: rule.payload
            };
        }
    }

    return null; // Fallback to Smart Brain (Ollama)
};

// Get contextual response for a fast action
export const getFastBrainResponse = (input: string): string | null => {
    const lowerInput = input.toLowerCase();

    for (const rule of RULES) {
        if (rule.keywords.some(k => lowerInput.includes(k))) {
            return rule.response || "Let me help you with that!";
        }
    }

    return null;
};
